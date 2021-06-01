import React, { useState, useEffect, Fragment } from "react";
import WorldMap from './WorldMap'

function TXList(props) {
  const txs = props.txs; 
  let listItems = [];
  for (let txKey of txs.keys()) {
    const listItem = (
      <li key={txKey}>
        {new Date(txs.get(txKey)).toString()}:<br />
        {txKey}
      </li>
    )
    listItems.push(listItem);
  }

  return (     
    <ul>{listItems}</ul>
  );
}


const TX = () => {
  const [txs, setTxs] = useState(new Map());
  const [nodeTxs, setNodeTxs] = useState([]);

  const ws = new WebSocket("ws://localhost:8887");  //18115, 8887

  const initWebsocket = () => {
    ws.onopen = function () {
      console.log("CONNECTED");
      ws.send(
        '{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_transaction"]}'
      );
    };
    ws.onmessage = function (evt) {
      // console.log(evt.data);
      // console.log(Date.now());
      // if (JSON.parse(evt.data).params) {
      //   const txHash = JSON.parse(JSON.parse(evt.data).params.result)
      //     .transaction.hash;
      //   console.log(txHash);
      //   const time = Date.now();
      //   const txInfo = { time: time, hash: txHash };
      //   setTxs((txs) => [txInfo, ...txs].slice(0, 10));
      // }

      const nodeTx = JSON.parse(evt.data);
      const currTime = Date.now();
      setNodeTxs((nodeTxs) => {
        const temp = [...nodeTxs, nodeTx];
        return temp.filter(tx => currTime - tx.timestamp < 10000);
      })

      const txHash = JSON.parse(evt.data).hash;
      const timestamp = Number(JSON.parse(evt.data).timestamp);
      console.log(txHash);

      const newTx = new Map([[txHash, timestamp]]);
      setTxs((txs) => {
        if (!txs.has(txHash)) {
          return new Map([...newTx, ...txs].slice(0, 10))
        } else {
          return txs;
        }
      });


    };
    ws.onerror = function (evt) {
      console.log("ERROR:" + evt);
    };
    ws.onclose = function (evt) {
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

  return (
    <Fragment>
      <div id="tx-list">
        <TXList txs={txs} />
      </div>
      <div id="map">
        <WorldMap nodeTxs={nodeTxs} />
      </div>
    </Fragment>
  ) 
};

export default TX;
