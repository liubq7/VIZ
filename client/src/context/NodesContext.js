import React, { createContext, useState } from "react";

export const NodesContext = createContext();

export const NodesContextProvider = (props) => {
  const [nodesGeoData, setNodesGeoData] = useState(null);
  const [nodesGeoMap, setNodesGeoMap] = useState(new Map());

  return (
    <NodesContext.Provider
      value={{
        nodesGeoData,
        setNodesGeoData,
        nodesGeoMap,
        setNodesGeoMap,
      }}
    >
      {props.children}
    </NodesContext.Provider>
  );
};
