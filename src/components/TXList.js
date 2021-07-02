const TXList = (props) => {
  const txs = props.txList;
  const txVizHashChanger = props.txVizHashChanger;

  let listItems = [];
  for (let txKey of txs.keys()) {
    const unix_timestamp = txs.get(txKey);
    const date = new Date(unix_timestamp);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    const formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    const listItem = (
      <li key={txKey} onClick={() => txVizHashChanger(txKey)}>
        <span style={{ color: "#18EFB1", fontSize: 12 + "px" }}>
          {/* {new Date(txs.get(txKey)).toString()} */}
          {formattedTime}
        </span>
        <br />
        {txKey}
      </li>
    );
    listItems.push(listItem);
  }

  return (
    <ul>
      <li key="test" onClick={() => txVizHashChanger("test")}>
        <span style={{ color: "#18EFB1", fontSize: 12 + "px" }}>
          THISISFORTEST
        </span>
        <br />
        0x365698b50ca0da75dca2c87f9e7b563811d3b5813736b8cc62cc3b106faceb
      </li>
      {listItems}
    </ul>
  );
};

export default TXList;
