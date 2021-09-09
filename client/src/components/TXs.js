import React, { useState, useEffect, useContext } from "react";
import MapNodes from "./MapNodes";
import "../css/TXs.css";
import { TXVizContext } from "../context/TXVizContext";
import { formatTimestamp } from "../helpers/processData";

const wsURL = process.env.NODE_ENV === "production" ? "ws://54.254.68.135/ws" : "ws://localhost:8088/ws";

const TXs = (props) => {
  const { setTxVizHash } = useContext(TXVizContext);

  const { setIsLoading } = props;

  const [time, setTime] = useState(Date.now() - 5 * 60000);
  const [txHashStore, setTxHashStore] = useState([]);
  const [txStore, setTxStore] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [txHash, setTxHash] = useState([]);
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time + 300);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const initWebsocket = () => {
    const ws = new WebSocket(wsURL);

    ws.onopen = function () {
      console.log("CONNECTED");
      ws.send("get tx data");
    };
    ws.onmessage = function (evt) {
      const newTxList = JSON.parse(evt.data)[0];
      const newTxs = JSON.parse(evt.data)[1];
      setTxHashStore((txHashStore) => {
        return [...newTxList, ...txHashStore];
      });
      setTxStore((txStore) => {
        return [...newTxs, ...txStore];
      })
    };
    ws.onerror = function (evt) {
      console.log("ERROR:" + evt);
    };
    ws.onclose = function (evt) {
      console.log("DISCONNECTED");
      // initWebsocket();
    };
  };

  useEffect(() => {
    initWebsocket();
    // return () => {
    //   ws.close();
    // };
  }, []);

  useEffect(() => {
    updateList();
  }, [time]);

  function updateList() {
    while (txHashStore.length > 0 && txHashStore.slice(-1)[0].min_timestamp < time) {
      const tx = txHashStore.pop();
      const txHash = tx.tx_hash;
      const formattedTime = formatTimestamp(tx.min_timestamp);

      const listItem = (
        <li key={txHash} onClick={() => setTxVizHash(txHash)}>
          <span style={{ color: "#18EFB1", fontSize: "12px" }}>
            {formattedTime}
          </span>
          <br />
          {txHash}
        </li>
      );

      setListItems((listItems) => {
        return [listItem, ...listItems].slice(0, 6);
      });

      setTxHash((txHash) => {
        const temp = [tx, ...txHash];
        return temp.filter((tx) => time - tx.min_timestamp < 5000);
      });
    }

    while (txStore.length > 0 && txStore.slice(-1)[0].unix_timestamp < time) {
      const tx = txStore.pop();
      setTxs((txs) => {
        const temp = [tx, ...txs];
        return temp.filter((tx) => time - tx.unix_timestamp < 5000);
      });
    }
  }

  useEffect(() => {
    if (txHash.length > 0) {
      setIsLoading(false);
    }
  }, [txHash.length])

  return (
    <div style={props.centerStyle}>
      <div>
        {txs.length === 0 ? null : <MapNodes txNum={txHash.length} txs={txs} scaleInfo={props} />}
      </div>
      <div id="tx-list">
        <ul>{listItems}</ul>
      </div>
    </div>
  );
};

export default TXs;
