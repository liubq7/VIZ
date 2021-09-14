import React, { useState } from "react";
import "../css/SearchBox.scss";

const SearchBox = ({ setTxVizHash }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTX, setSearchTX] = useState("");

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

export default React.memo(SearchBox);
