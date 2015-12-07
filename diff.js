module.exports = function(data, tile, writeData, done) {
  var latest = data.latest.osm;
  var previous = data.previous.osm;

  // 1. generate array of osm_ids from latest
  // 2. loop through previous and if ^ osm_id is not in latest, output the feature.

  var latestIDs = {};
  var deletedFeatures = [];

  var latestLength = latest.features.length;
  for (var i = 0; i < latestLength; i++) {
    latestIDs[latest[i].properties.osm_id] = true;
  }

  var previousLength = previous.features.length;
  for (var j = 0; j < previousLength; j++) {
    if (!latestIDs.hasOwnProperty(previous[j].properties.osm_id)) {
      deletedFeatures.push(previous[j]);
    }
  }

  done(null, deletedFeatures);

};