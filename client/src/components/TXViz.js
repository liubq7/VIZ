import { useState, useEffect, useRef, useContext, Fragment } from "react";
import TXNodes from "./TXNodes";
import "../css/TXViz.scss";
import corner from "../images/corner.svg";
import cancel from "../images/cancel.svg";
import playSvg from "../images/play.svg";
import pauseSvg from "../images/pause.svg";
import { TXVizContext } from "../context/TXVizContext";
import DataFinder from "../apis/DataFinder";
import Loader from "./Loader";

const TXViz = () => {
  const width = 670;
  const height = 380;

  const { txVizHash, setTxVizHash } = useContext(TXVizContext);
  const { txVizData, setTxVizData } = useContext(TXVizContext);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const [rangeVal, setrangeVal] = useState(startTime);
  const [play, setPlay] = useState(false);
  const [btnSvg, setBtnSvg] = useState(playSvg);

  const [isValid, setIsValid] = useState(true);
  const re = /^0x[0-9a-f]{64}$/;

  useEffect(() => {
    setTxVizData(null);

    const fetchTxVizData = async () => {
      try {
        const response = await DataFinder.get(`/txs/${txVizHash}`);
        const resData = response.data;
        setTxVizData(resData);
        if (resData.length !== 0) {
          setStartTime(Number(resData[0].unix_timestamp));
          setEndTime(Number(resData.slice(-1)[0].unix_timestamp));
          setrangeVal(Number(resData[0].unix_timestamp));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (re.test(txVizHash)) {
      setIsValid(true);
      fetchTxVizData();
    } else {
      setIsValid(false);
    }
  }, [txVizHash]);

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

      <p id="tx-hash">{txVizHash}</p>

      {(() => {
        if (!isValid) {
          return (
            <p id="invalid">
              Invalid params: expected a 0x-prefixed hex string with 64 digits.
            </p>
          );
        } else if (txVizData == null) {
          return (
            <div id="loader">
              <Loader />
            </div>
          );
        } else if (txVizData.length === 0) {
          return <p id="not-found">No results found :(</p>;
        } else {
          return (
            <Fragment>
              <div id="tx-nodes">
                <TXNodes time={rangeVal} width={width} height={height} />
              </div>

              <div id="timeline">
                <p className="timeline-time">{rangeVal}</p>
                {startTime === endTime ? null : (
                  <Fragment>
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
                  </Fragment>
                )}
              </div>
            </Fragment>
          );
        }
      })()}

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
