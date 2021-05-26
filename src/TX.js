import React, { useState, useEffect, Fragment } from "react";
import Map from './Map'

function TXList(props) {
  const txs = props.txs; 
  console.log(txs);

  const listItems = txs.map((tx) => (
    <li key={tx.hash}>
      {new Date(tx.time).toString()}:<br />
      {tx.hash}
    </li>
  ));
  return (     
    <ul>{listItems}</ul>
  );
}

function ShowDate(props) {
  const date = props.date;
  return (
    <h2>{new Date(date).toString()}</h2>
  )
}

const TX = () => {
  const [txs, setTxs] = useState([]);

  const ws = new WebSocket("ws://localhost:18115");

  const initWebsocket = () => {
    ws.onopen = function () {
      console.log("CONNECTED");
      ws.send(
        '{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_transaction"]}'
      );
    };
    ws.onmessage = function (data, flags) {
      console.log(data);
      // console.log(data.timeStamp);
      console.log(Date.now());
      if (JSON.parse(data.data).params) {
        const txHash = JSON.parse(JSON.parse(data.data).params.result)
          .transaction.hash;
        console.log(txHash);
        const time = Date.now();
        const txInfo = { time: time, hash: txHash };
        setTxs((txs) => [txInfo, ...txs].slice(0, 10));
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

  // const [date, setDate] = useState(Date.now());

  // useEffect(() => {
  //   const timerID = setInterval(() => tick(), 1000);
  //   return function cleanup() {
  //     clearInterval(timerID);
  //   };
  // });

  // function tick() {
  //   setDate(Date.now());
  //   // if (date - tx.slice(-1).time > 60*60*1000) {
  //   //   setTx(tx => tx.slice(0, -1));
  //   // }
  // }

  return (
    <Fragment>
      <div id="tx-list">
        <TXList txs={txs} />
      </div>
      <div id="map">
        <Map txs={txs} />
      </div>
    </Fragment>
  ) 
};

export default TX;
