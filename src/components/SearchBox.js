import React, { useState } from "react";
import "../css/SearchBox.scss";

const SearchBox = (props) => {
  // TODO: handle error, maxlength, etc.
  const [isOpen, setIsOpen] = useState(false);
  const [searchTX, setSearchTX] = useState();
  const txVizHashChanger = props.txVizHashChanger;

  const toggleClass = () => {
    if (isOpen) {
      txVizHashChanger(searchTX);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? "search open" : "search"}>
      <input type="search" className="search-input" value={searchTX} onChange={e => setSearchTX(e.target.value)} />
      <span className="search-button" onClick={toggleClass}>
        <span className="search-icon"></span>
      </span>
    </div>
  );
};

export default SearchBox;
