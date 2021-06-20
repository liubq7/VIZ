import txTestData from "../data/txTestData.json";

function seedRandom(seed) {
  return ((seed * 9301 + 49297) % 233280) / 233280.0;
}

export const filterData = (time) => {
  const dataset = txTestData.tx;
  // console.log(dataset);
  const newData = dataset.filter(function (d) {
    return d.timestamp <= time;
  });

  let nodes = [];
  let links = [];
  for (let i = 0; i < newData.length; i++) {
    nodes.push(i);
    if (i > 0) {
      const prevData = dataset.filter(function (d) {
        return d.timestamp < newData[i].timestamp;
      });
      const prevNode = Math.floor(seedRandom(i) * prevData.length);
      links.push({startPoint: prevNode, endPoint: i});
    }
  }
  if (links.length > 40) {
    links = links.slice(-40);
  }
  
  return [nodes, links];
}