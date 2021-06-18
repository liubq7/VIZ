import { Fragment } from "react";
import "./TXViz.css";

const TXViz = () => {
  const width = 800;
  const height = 500;

  return (
    <Fragment>
      <svg style={{height: height, width: width}}></svg>
      <div id="timeline">
        <button id="play-button">play</button>
      </div>
    </Fragment>
  )
}

export default TXViz;
