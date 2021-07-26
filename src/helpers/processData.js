// import txTestData from "../data/txTestData.json";
import seedrandom from "seedrandom";

export const generateLinks = (txVizData, txVizHash) => {
  const dataset = txVizData;
  const rng = seedrandom(txVizHash); // using tx's hash as seed
  let links = [];
  for (let i = 1; i < dataset.length; i++) {
    let prevNode = i;
    while (dataset[prevNode].unix_timestamp == dataset[i].unix_timestamp) {
      prevNode = Math.floor(Math.pow(rng(), 0.5) * i);
    }
    links.push({startPoint: prevNode, endPoint: i, timestamp: dataset[i].unix_timestamp});
  }
  return links;
}

export const filterNodeData = (time, txVizData) => {
  const dataset = txVizData;
  let i = 0;
  let nodeData = [];
  while (i < dataset.length && dataset[i].unix_timestamp <= time) {
    nodeData.push(i);
    i += 1;
  }
  return nodeData;
}

export const filterLinkData = (time, links) => {
  let i = 0;
  let linkData = [];
  while (links && i < links.length && links[i].timestamp <= time) {
    linkData.push(links[i]);
    i += 1;
  }
  if (linkData.length > 40) {
    linkData = linkData.slice(-40);
  }
  return linkData;
}
