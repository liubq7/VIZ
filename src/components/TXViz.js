import { Fragment, useState, useEffect, useRef } from "react";
import TXNodes from "./TXNodes";
import "../css/TXViz.css";

const TXViz = (props) => {
  const txVizHash = props.txVizHash;
  const txVizHashChanger = props.txVizHashChanger;

  const width = 670;
  const height = 380;

  const startTime = 1622463474248;
  const endTime = 1622463476577;
  const [rangeval, setRangeval] = useState(startTime);
  const [play, setPlay] = useState(false);
  const [btnSvg, setBtnSvg] = useState("./play.svg");

  const inputRef = useRef();
  const handleChange = (event) => {
    const value = Number(event.target.value);
    setRangeval(value);
    const progress = (value - startTime) / (endTime - startTime) * 100 + "%";
    inputRef.current.style.background = 'linear-gradient(90deg, #18EFB1 0%' + progress + ', #E6E6E6 ' + progress + '100%)';
  }

  useEffect(() => {
    if (rangeval == endTime) {
      setBtnSvg("./play.svg");
      setPlay(false);
    }
    if (play) {
      const timer = setInterval(() => setRangeval(rangeval + 1), 1);
      return () => clearInterval(timer);
    }
  }, [rangeval, play]);

  return (
    <Fragment>
      <div style={{ width: width, height: height }}>
        <svg id="bg" style={{ width: width, height: height }}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            style={{ fill: "#1F1F1F", opacity: 0.8 }}
          />
        </svg>

        <img id="corner1" src={"./corner.svg"} alt="" />
        <img id="corner2" src={"./corner.svg"} alt="" />
        <img id="corner3" src={"./corner.svg"} alt="" />
        <img id="corner4" src={"./corner.svg"} alt="" />

        <p id="tx-hash">{txVizHash}</p>

        <div id="tx-nodes">
          <TXNodes time={rangeval} width={width} height={height} />
        </div>

        <div id="timeline">
          <p className="timeline-time">{rangeval}</p>
          <input
            ref={inputRef}
            type="range"
            className="timeline-slider"
            min={startTime}
            max={endTime}
            value={rangeval}
            // onChange={(event) => setRangeval(Number(event.target.value))}
            onChange={handleChange}
          />
          <img
            id="play-button"
            onClick={() => {
              if (rangeval == endTime) {
                setRangeval(startTime);
              }
              if (play) {
                setBtnSvg("./play.svg");
              } else {
                setBtnSvg("./pause.svg");
              }
              setPlay(!play);
            }}
            src={btnSvg}
            alt="play button"
          />
        </div>

        <img
          id="cancel-button"
          onClick={() => {
            txVizHashChanger(null);
          }}
          src={"./cancel.svg"}
          alt="cancel button"
        />
      </div>
    </Fragment>
  );
};

export default TXViz;
