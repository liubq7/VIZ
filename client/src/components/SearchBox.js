import React, { useContext, useState } from "react";
import { TXVizContext } from "../context/TXVizContext";
import "../css/SearchBox.scss";

const SearchBox = () => {
  // TODO: A component is changing an uncontrolled input to be controlled.
  const [isOpen, setIsOpen] = useState(false);
  const [searchTX, setSearchTX] = useState("");

  const { setTxVizHash } = useContext(TXVizContext);

  const toggleClass = () => {
    if (isOpen && searchTX !== "") {
      setTxVizHash(searchTX.toLowerCase());
      setSearchTX("");
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? "search open" : "search"}>
      <input
        type="search"
        className="search-input"
        value={searchTX}
        onChange={(e) => setSearchTX(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            toggleClass();
          }
        }}
      />
      <span className="search-button" onClick={toggleClass}>
        <span className="search-icon"></span>
      </span>
    </div>
  );
};

export default SearchBox;