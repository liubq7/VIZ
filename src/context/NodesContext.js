import React, { createContext, useState } from "react";

export const NodesContext = createContext();

export const NodesContextProvider = (props) => {
  const [nodesGeoData, setNodesGeoData] = useState(null);

  return (
    <NodesContext.Provider
      value={{
        nodesGeoData,
        setNodesGeoData,
      }}
    >
      {props.children}
    </NodesContext.Provider>
  )
}