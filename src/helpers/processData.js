import txTestData from "../data/txTestData.json";
import seedrandom from "seedrandom";

export const generateLinks = () => {
  const dataset = txTestData.tx;
  const rng = seedrandom('TXTXTXTXTXTXTXT0'); // using tx's hash as seed
  let links = [];
  for (let i = 1; i < dataset.length; i++) {
    let prevNode = i;
    while (dataset[prevNode].timestamp == dataset[i].timestamp) {
      prevNode = Math.floor(Math.pow(rng(), 0.5) * i);
    }
    links.push({startPoint: prevNode, endPoint: i, timestamp: dataset[i].timestamp});
  }
  return links;
}

export const filterNodeData = (time) => {
  const dataset = txTestData.tx;
  let i = 0;
  let nodeData = [];
  while (i < dataset.length && dataset[i].timestamp <= time) {
    nodeData.push(i);
    i += 1;
  }
  return nodeData;
}

export const filterLinkData = (time, links) => {
  let i = 0;
  let linkData = [];
  while (i < links.length && links[i].timestamp <= time) {
    linkData.push(links[i]);
    i += 1;
  }
  if (linkData.length > 40) {
    linkData = linkData.slice(-40);
  }
  return linkData;
}
