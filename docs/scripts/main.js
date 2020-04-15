console.log(geoJson);

async function loadMap(geoJson) {
d3.json(geoJson).then(mapData => renderMap(mapData))
}

function renderMap() {}


loadMap(europeJson)