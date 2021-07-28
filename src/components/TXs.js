import React, { useState, useEffect, useContext } from "react";
import MapNodes from "./MapNodes";
import "../css/TXs.css";
import generateTXs from "../helpers/generateTXs";
import { TXVizContext } from "../context/TXVizContext";
import { formatTimestamp } from "../helpers/processData";

const TXs = (props) => {
  const { setTxVizHash } = useContext(TXVizContext);

  const [time, setTime] = useState(Date.now() - 5 * 60000);
  const [txStore, setTxStore] = useState([]);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time + 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const ws = new WebSocket("ws://localhost:8080");

  const initWebsocket = () => {
    ws.onopen = function () {
      console.log("CONNECTED");
      ws.send("get hash list");
    };
    ws.onmessage = function (evt) {
      const newTxs = JSON.parse(evt.data);
      setTxStore((txStore) => {
        return [...newTxs, ...txStore];
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

  useEffect(() => {
    updateList();
  }, [time]);

  function updateList() {
    while (txStore.length > 0 && txStore.slice(-1)[0].min_timestamp < time) {
      const tx = txStore.pop();
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
    }
  }




  // const [txsInfo, setTxsInfo] = useState([]);
  // const [currTx, setCurrTx] = useState();


  // const initWebsocket = () => {

  //   ws.onmessage = function (evt) {
  //     const newTxs = JSON.parse(evt.data);
  //     // console.log(newTxs);
  //     setTxStore((txStore) => {
  //       return [...newTxs, ...txStore];
  //     });

  //     // setTxsInfo((txsInfo) => {
  //     //   const temp = [...txsInfo, txInfo];
  //     //   return temp.filter((tx) => currTime - tx.timestamp < 10000);
  //     // });

  //     // const txHash = JSON.parse(evt.data).hash;
  //     // const timestamp = Number(JSON.parse(evt.data).timestamp);

  //     // const newTx = new Map([[txHash, timestamp]]);
  //     // setTxList((txList) => {
  //     //   if (!txList.has(txHash)) {
  //     //     return new Map([...newTx, ...txList].slice(0, 6));
  //     //   } else {
  //     //     return txList;
  //     //   }
  //     // });
  //   };

  // };


  // function update() {
  //   const txInfo = currTx;
  //   const currTime = Date.now();
  //   setTxsInfo((txsInfo) => {
  //     const temp = [...txsInfo, txInfo];
  //     return temp.filter((tx) => currTime - tx.timestamp < 10000);
  //   });
  // }

  

  return (
    <div style={props.centerStyle}>
      {/* <div>
        <MapNodes txsInfo={txsInfo} scaleInfo={props} />
      </div> */}
      <div id="tx-list">
        <ul>{listItems}</ul>
      </div>
    </div>
  );
};

export default TXs;
