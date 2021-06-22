import { Fragment, useState, useEffect } from "react";
import TXNodes from "./TXNodes";

const TXViz = () => {
  const [rangeval, setRangeval] = useState(null);

  return (
    <Fragment>
      <div>
        <TXNodes />
      </div>
      <div>
      <p style={{color:"red"}}>Time: {rangeval}</p>
      <input type="range" className="custom-range" min="199" max="3999" 
       onChange={(event) => setRangeval(event.target.value)} />
    </div>
    </Fragment>
  )
}

export default TXViz;
