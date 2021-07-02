import React, { Fragment, useState } from "react";
import "../css/SearchBox.scss";

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleClass = () => {
    setIsOpen(!isOpen);
  }

  return (
    // <Fragment>
      <div className={isOpen? "search open": "search"}>
        <input type="search" className="search-input" />
        <span className="search-button" onClick={toggleClass}>
          <span className="search-icon"></span>
        </span>
      </div>
    // </Fragment>
  );
};

export default SearchBox;