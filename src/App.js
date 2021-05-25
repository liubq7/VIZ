import React, {Fragment} from "react";
import './App.css';
import TXList from './TXList'
import Map from './Map'



function App() {

  return (
    <Fragment>
      <div id="tx-list">
        <TXList />
      </div>
      <div id="map">
        <Map />
      </div>
    </Fragment>

    
  );
}

export default App;
