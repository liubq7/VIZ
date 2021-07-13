import React, { useState, useEffect } from "react";
import MapNodes from "./MapNodes";
import TXList from "./TXList";
import "../css/TXs.css";
import generateTXs from "../helpers/generateTXs";

const TXs = (props) => {
  const [txList, setTxList] = useState(new Map());
  const [txsInfo, setTxsInfo] = useState([]);
  const [currTx, setCurrTx] = useState();

  // console.log(currTx);

  useEffect(() => {
    if (currTx) {
      update();
    }
  }, [currTx]);

  function update() {
    const txInfo = currTx;
    const currTime = Date.now();
    setTxsInfo((txsInfo) => {
      const temp = [...txsInfo, txInfo];
      return temp.filter((tx) => currTime - tx.timestamp < 10000);
    });

    const txHash = currTx.hash;
    const timestamp = Number(currTx.timestamp);

    const newTx = new Map([[txHash, timestamp]]);
    setTxList((txList) => {
      // BUG: may show one tx repeatedly
      if (!txList.has(txHash)) {
        return new Map([...newTx, ...txList].slice(0, 6));
      } else {
        return txList;
      }
    });
  }

  useEffect(() => {
    generateTXs(setCurrTx);
  }, []);

  return (
    <div style={props.centerStyle}>
      <div>
        <MapNodes txsInfo={txsInfo} scaleInfo={props} />
      </div>
      <div id="tx-list">
        <TXList txList={txList} txVizHashChanger={props.txVizHashChanger} />
      </div>
    </div>
  );
};

export default TXs;
