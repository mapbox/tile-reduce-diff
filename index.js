var TileReduce = require('tile-reduce');
var turf = require('turf');
var argv = require('minimist')(process.argv.slice(2));

var bbox = argv.area || [-180, -90, 180, 90];

var opts = {
  zoom: 12,
  bbox: bbox,
  sources: [
    {
      name: 'latest',
      mbtiles: __dirname+'/../data/latest.planet.mbtiles',
    },
    {
      name: 'previous',
      mbtiles: __dirname+'/../data/previous.planet.mbtiles'
    }
  ],
  map: __dirname+'/diff.js'
};

var matched = turf.featurecollection([]);

var tilereduce = TileReduce(opts);

tilereduce.on('reduce', function(result) {
  matched.features = matched.features.concat(result);
});

tilereduce.on('end', function(error){
  console.log(JSON.stringify(matched));
});