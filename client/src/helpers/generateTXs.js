const nodeNum = 100;

function random(max) {
  return Math.floor(Math.random() * max);
}

function remove(array, target) {
  const index = array.indexOf(target);
  if (index > -1) {
    array.splice(index, 1);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const generateOneTX = async (txId, setCurrTx) => {
  const txHash =
    "0x365698b50ca0da75dca2c87f9e7b563811d3b5813736b8cc62cc3b106faceb" + txId;
  let nodes = [...Array(nodeNum)].map((e, i) => i);

  const firstNode = random(nodeNum);
  remove(nodes, firstNode);
  setCurrTx({ node: firstNode, hash: txHash, timestamp: Date.now() });

  let receiveSeed = 3;
  while(nodes.length > 0) {
    const receivedRandom = random(receiveSeed) + receiveSeed / 2;
    const receivedNum = Math.min(receivedRandom, nodes.length);
    let receivedNodes = [];
    for (let i = 0; i < receivedNum; i++) {
      const receivedNodeIndex = random(nodes.length);
      const receivedNode = nodes[receivedNodeIndex];
      receivedNodes.push(receivedNode);
      remove(nodes, receivedNode);
    }
    // console.log(nodes);

    const sleepTime = random(500);
    await sleep(sleepTime);
    receivedNodes.forEach(async (e) => {
      setCurrTx({node: e, hash: txHash, timestamp: Date.now()});
      await sleep(10);
    })

    receiveSeed += random(3) + 2;
  }
};

const generateTXs = (setCurrTx) => {
  let i = 0;
  setInterval(function() {
    generateOneTX(i, setCurrTx);
    i += 1;
  }, 2000);
}

export default generateTXs;
