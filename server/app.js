if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const db = require("./db");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();

app.use(cors());
app.use(express.json());

const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    if (message === "get tx data") {
      let t = Date.now() - 5 * 60000;
      sendTxData(ws, t);
      setInterval(function () {
        t += 30000;
        sendTxData(ws, t);
      }, 30000);
    }
  });
});

const sendTxData = async (ws, t) => {
  const t1 = t;
  const t2 = t1 + 30000;
  try {
    const txList = await db.query(
      "SELECT tx_hash, min_timestamp FROM (SELECT tx_hash, MIN(unix_timestamp) AS min_timestamp FROM txs GROUP BY tx_hash) t WHERE min_timestamp >= $1 AND min_timestamp < $2 ORDER BY min_timestamp DESC",
      [t1, t2]
    );
    const txs = await db.query(
      "SELECT node_id, tx_hash, unix_timestamp FROM txs WHERE unix_timestamp >= $1 AND unix_timestamp < $2   ORDER BY unix_timestamp DESC",
      [t1, t2]
    );
    ws.send(JSON.stringify([txList.rows, txs.rows]));
  } catch (error) {
    console.log(error);
  }
}

// add received txs to db
app.post("/txs", async (req, res) => {
  console.log(req.body);
  const txs = JSON.stringify(req.body);

  try {
    await db.query(
      "INSERT INTO txs (node_id, tx_hash, unix_timestamp) SELECT node_id, tx_hash, unix_timestamp FROM jsonb_to_recordset($1::jsonb) AS t (node_id INT, tx_hash CHAR(66), unix_timestamp BIGINT)",
      [txs]
    );
  } catch (error) {
    console.log(error);
  }
  
  res.json("ok")
});

// get all nodes' recieved time about a tx requested by tx hash
app.get("/txs/:id", async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;

  try {
    const tx = await db.query(
      "SELECT node_id, unix_timestamp FROM txs WHERE tx_hash = $1 ORDER BY unix_timestamp",
      [id]
    );
    res.json(tx.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/nodes", async (req, res) => {
  try {
    const nodesGeoData = await db.query("SELECT * FROM nodes");
    res.json(nodesGeoData.rows);
  } catch (error) {
    console.log(error);
  }
})

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
