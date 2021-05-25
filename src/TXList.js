import React, { useState, useEffect } from "react";

const TXList = () => {
  const [tx, setTx] = useState();

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
      setTx(data.data.toString());
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

  // const showResult = () => {
  //   <p>{JSON.parse(tx.params.result).transaction.hash}</p>
  // };

  return <p>TX HERE: {tx}</p>;
};

export default TXList;
