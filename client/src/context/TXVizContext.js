import React, { useState, createContext } from "react";

export const TXVizContext = createContext();

export const TXVizContextProvider = (props) => {
  const [txVizHash, setTxVizHash] = useState("");
  const [txVizData, setTxVizData] = useState();

  return (
    <TXVizContext.Provider
      value={{
        txVizHash,
        setTxVizHash,
        txVizData,
        setTxVizData,
      }}
    >
      {props.children}
    </TXVizContext.Provider>
  )
}