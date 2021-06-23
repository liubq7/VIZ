import { Fragment, useState, useEffect } from "react";
import TXNodes from "./TXNodes";
import "../css/TXViz.css";

const TXViz = () => {
  const startTime = 1622463474248;
  const endTime = 1622463476577;
  const [rangeval, setRangeval] = useState(startTime);
  const [play, setPlay] = useState(false);
  const [btnText, setBtnText] = useState("play");

  // console.log(rangeval);

  useEffect(() => {
    if (rangeval == endTime) {
      setBtnText("play");
      setPlay(false);
    }
    if (play) {
      const timer = setInterval(() => setRangeval(rangeval + 1), 1);
      return () => clearInterval(timer);
    }
  });

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
        <button
          id="play-button"
          onClick={() => {
            if (rangeval == endTime) {
              setRangeval(startTime);
            }
            if (play) {
              setBtnText("play");
            } else {
              setBtnText("pause");
            }
            setPlay(!play);
          }}
        >
          {btnText}
        </button>
      </div>
    </Fragment>
  );
};

export default TXViz;
