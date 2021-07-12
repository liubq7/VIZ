import { useState, useEffect, useRef } from "react";
import TXNodes from "./TXNodes";
import "../css/TXViz.scss";
import corner from "../images/corner.svg";
import cancel from "../images/cancel.svg";
import playSvg from "../images/play.svg";
import pauseSvg from "../images/pause.svg";

const TXViz = (props) => {
  const txVizHash = props.txVizHash;
  const txVizHashChanger = props.txVizHashChanger;

  const width = 670;
  const height = 380;

  const startTime = 1622463474248;
  const endTime = 1622463476577;
  const [rangeVal, setrangeVal] = useState(startTime);
  const [play, setPlay] = useState(false);
  const [btnSvg, setBtnSvg] = useState(playSvg);

  const inputRef = useRef();
  const activeRangeColor = "#18EFB1";
  const rangeBackgroundColor = "#E6E6E6";
  const setRangeColor = (value) => {
    const progress = ((value - startTime) / (endTime - startTime)) * 100 + "%";
    inputRef.current.style.background = `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackgroundColor} ${progress} 100%)`;
  };

  const handleChange = (event) => {
    const value = Number(event.target.value);
    setrangeVal(value);
    setRangeColor(value);
  };

  useEffect(() => {
    if (rangeVal == endTime) {
      setBtnSvg(playSvg);
      setPlay(false);
    }
    if (play) {
      const timer = setInterval(() => {
        setrangeVal(rangeVal + 1);
        setRangeColor(rangeVal);
      }, 1);
      return () => clearInterval(timer);
    }
  }, [rangeVal, play]);

  const cornerDecorations = [...Array(4)].map((e, i) => (
    <img id={"corner" + i} src={corner} alt="" key={i} />
  ));

  return (
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

      {cornerDecorations}

      <div id="tx-nodes">
        <TXNodes time={rangeVal} width={width} height={height} />
      </div>

      <p id="tx-hash">{txVizHash}</p>

      <div id="timeline">
        <p className="timeline-time">{rangeVal}</p>
        <input
          ref={inputRef}
          type="range"
          className="timeline-slider"
          min={startTime}
          max={endTime}
          value={rangeVal}
          onChange={handleChange}
        />
        <img
          id="play-button"
          onClick={() => {
            if (rangeVal == endTime) {
              setrangeVal(startTime);
            }
            if (play) {
              setBtnSvg(playSvg);
            } else {
              setBtnSvg(pauseSvg);
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
          txVizHashChanger("");
        }}
        src={cancel}
        alt="cancel button"
      />
    </div>
  );
};

export default TXViz;
