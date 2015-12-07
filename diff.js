module.exports = function(data, tile, writeData, done) {
  var latest = data.latest.osm;
  var previous = data.previous.osm;

  // 1. generate array of osm_ids from latest
  // 2. loop through previous and if ^ osm_id is not in latest, output the feature.

  var latestIDs = {};
  var deletedFeatures = [];

  var latestLength = latest.features.length;
  for (var i = 0; i < latestLength; i++) {
    latestIDs[getID(latest.features[i])] = true;
  }

  var previousLength = previous.features.length;
  for (var j = 0; j < previousLength; j++) {
    if (!latestIDs.hasOwnProperty(getID(previous.features[j]))) {
      deletedFeatures.push(previous.features[j]);
    }
  }

  done(null, deletedFeatures);

};

function getID(feature) {
    return feature.properties._osm_way_id || feature.properties._osm_node_id;
}
