import seedrandom from "seedrandom";

export const mapNodesGeoData = (nodesGeoData) => {
  let m = new Map();
  for (let i in nodesGeoData) {
    const node = nodesGeoData[i];
    const nodeID = node.node_id;
    const lng = node.longitude;
    const lat = node.latitude;
    m.set(nodeID, convertDMS(lat, lng));
  }
  return m;
}

function toDegreesAndMinutes(coordinate) {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);

  return degrees + "°" + minutes;
}

function convertDMS(lat, lng) {
  const latitude = toDegreesAndMinutes(lat);
  const latitudeCardinal = lat >= 0 ? "N" : "S";

  const longitude = toDegreesAndMinutes(lng);
  const longitudeCardinal = lng >= 0 ? "E" : "W";

  return [latitude + " " + latitudeCardinal, longitude + " " + longitudeCardinal];
}

export const generateLinks = (txVizData, txVizHash) => {
  const rng = seedrandom(txVizHash); // using tx's hash as seed
  let links = [];

  let j = 0;
  while (j < txVizData.length && txVizData[j].unix_timestamp === txVizData[0].unix_timestamp) {
    j += 1;
  }
  if (j >= txVizData.length) {
    return links;
  }

  for (let i = j; i < txVizData.length; i++) {
    let prevNode = i;
    while (txVizData[prevNode].unix_timestamp === txVizData[i].unix_timestamp) {
      prevNode = Math.floor(Math.pow(rng(), 0.5) * i);
    }
    links.push({
      startPoint: prevNode,
      endPoint: i,
      timestamp: txVizData[i].unix_timestamp,
    });
  }
  return links;
};

export const filterNodeData = (time, txVizData) => {
  let i = 0;
  let nodeData = [];
  while (i < txVizData.length && txVizData[i].unix_timestamp <= time) {
    nodeData.push(i);
    i += 1;
  }
  return nodeData;
};

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
};

export const formatTimestamp = (timestamp) => {
  const unix_timestamp = Number(timestamp);

  const date = new Date(unix_timestamp);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  const formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return formattedTime;
};
