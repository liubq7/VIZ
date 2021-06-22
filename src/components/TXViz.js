import { Fragment, useState, useEffect } from "react";
import TXNodes from "./TXNodes";
import "../css/TXViz.css"

const TXViz = () => {
  const [rangeval, setRangeval] = useState(null);

  return (
    <Fragment>
      <div>
        <TXNodes time={rangeval} />
      </div>
      <div id="timeline">
        <p style={{ color: "red" }}>Time: {rangeval}</p>
        <input
          type="range"
          className="timeline-slider"
          min="1622463474248"
          max="1622463476577"
          onChange={(event) => setRangeval(event.target.value)}
        />
      </div>
    </Fragment>
  );
};

export default TXViz;
