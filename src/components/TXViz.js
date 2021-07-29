import { useState, useEffect, useRef, useContext } from "react";
import TXNodes from "./TXNodes";
import "../css/TXViz.scss";
import corner from "../images/corner.svg";
import cancel from "../images/cancel.svg";
import playSvg from "../images/play.svg";
import pauseSvg from "../images/pause.svg";
import { TXVizContext } from "../context/TXVizContext";
import DataFinder from "../apis/DataFinder";

const TXViz = () => {
  const width = 670;
  const height = 380;

  const { txVizHash, setTxVizHash } = useContext(TXVizContext);
  const { setTxVizData } = useContext(TXVizContext);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const [rangeVal, setrangeVal] = useState(startTime);
  const [play, setPlay] = useState(false);
  const [btnSvg, setBtnSvg] = useState(playSvg);

  useEffect(() => {
    const fetchTxVizData = async () => {
      try {
        const response = await DataFinder.get(`/txs/${txVizHash}`);
        setTxVizData(response.data);
        setStartTime(Number(response.data[0].unix_timestamp));
        setEndTime(Number(response.data.slice(-1)[0].unix_timestamp));
        setrangeVal(Number(response.data[0].unix_timestamp));
      } catch (error) {
        console.log(error);
      }
    };

    fetchTxVizData();
  }, [txVizHash]);

  // const startTime = txVizData[0].unix_timestamp;
  // const endTime = txVizData.slice(-1)[0].unix_timestamp;

  // const startTime = 1622463474248;
  // const endTime = 1622463476577;

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
    <div style={{ width, height }}>
      <svg id="bg" style={{ width, height }}>
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
          setTxVizHash("");
        }}
        src={cancel}
        alt="cancel button"
      />
    </div>
  );
};

export default TXViz;
