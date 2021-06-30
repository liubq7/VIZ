import React, { useState, useEffect, Fragment } from "react";
import MapNodes from './MapNodes';
import TXList from "./TXList";
import "../css/TXs.css";

const TXs = (props) => {
  const [txList, setTxList] = useState(new Map());
  const [txsInfo, setTxsInfo] = useState([]);

  const ws = new WebSocket("ws://localhost:8887");  //18115, 8887

  const initWebsocket = () => {
    ws.onopen = function () {
      console.log("CONNECTED");
      ws.send(
        '{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_transaction"]}'
      );
    };
    ws.onmessage = function (evt) {
      // fetch data in regular time??
      const txInfo = JSON.parse(evt.data);
      const currTime = Date.now();
      setTxsInfo((txsInfo) => {
        const temp = [...txsInfo, txInfo];
        return temp.filter(tx => currTime - tx.timestamp < 10000);
      })

      const txHash = JSON.parse(evt.data).hash;
      const timestamp = Number(JSON.parse(evt.data).timestamp);

      const newTx = new Map([[txHash, timestamp]]);
      setTxList((txList) => {
        // BUG: may show one tx repeatedly
        if (!txList.has(txHash)) {
          return new Map([...newTx, ...txList].slice(0, 6))
        } else {
          return txList;
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
      <div>
        <MapNodes txsInfo={txsInfo} scaleInfo={props} />
      </div>
      <div id="tx-list">
        <TXList txList={txList} />
      </div>
    </Fragment>
  ) 
};

export default TXs;
