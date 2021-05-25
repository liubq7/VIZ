import React, { useState, useEffect } from "react";

function TXs(props) {
  const txs = props.txs;
  console.log(txs);
  const listItems = txs.map((tx) =>
    <li key={tx}>{tx}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const TXList = () => {
  const [tx, setTx] = useState([]);

  const ws = new WebSocket("ws://localhost:18115");

  const initWebsocket = () => {
    ws.onopen = function () {
      console.log("CONNECTED");
      ws.send(
        '{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_transaction"]}'
      );
    };
    ws.onmessage = function (data, flags) {
      if (JSON.parse(data.data).params) {
        const txHash = JSON.parse(JSON.parse(data.data).params.result).transaction.hash;
        console.log(txHash);
        setTx(tx => [txHash, ...tx].slice(0, 10));
      }
    };
    ws.onerror = function (derp) {
      console.log("ERROR:" + derp);
    };
    ws.onclose = function (data) {
      console.log("DISCONNECTED");
      initWebsocket();
    };
  };

  useEffect(() => {
    initWebsocket();
    return () => {
      ws.close();
    };
  }, []);

  return <TXs txs={tx} />;
};

export default TXList;
