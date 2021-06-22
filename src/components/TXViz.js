import { Fragment, useState } from "react";
import TXNodes from "./TXNodes";
import "../css/TXViz.css"

const TXViz = () => {
  const startTime = 1622463474248;
  const endTime = 1622463476577;
  const [rangeval, setRangeval] = useState(startTime);

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
          min={startTime}
          max={endTime}
          value={rangeval}
          onChange={(event) => setRangeval(Number(event.target.value))}
        />
        <button id="play-button" onClick={() => setRangeval(rangeval + 1)}>play</button>
      </div>
    </Fragment>
  );
};

export default TXViz;
