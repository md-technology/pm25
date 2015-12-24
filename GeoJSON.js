/**
 * Created by C5235715 on 12/24/2015.
 */

var Q = require('q');
var turf = require('turf');
var fs = require('fs');

var GeoJSON = function() {

    this.featureCollection = {};
    this.isolined = {};

    this.from = function(citys) {
        var features = [];
        for(var i = 0; i<citys.length; i++) {
            var city = citys[i];
            features.push(turf.point([parseFloat(city.lon), parseFloat(city.lat)], {name: city.city, aqi: parseInt(city.aqi)}));
        }

        console.log(citys.length);
        console.log(features.length);
        this.featureCollection = turf.featurecollection(features);

        var breaks = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
        this.isolined = turf.isolines(this.featureCollection, 'aqi', 20, breaks);

        features = [];
        for(var i = 0; i<this.isolined.features.length; i++) {
            var feature = this.isolined.features[i];
            var lineString = feature.geometry.coordinates;
            lineString[lineString.length] = lineString[0];
            var polygon = turf.polygon([lineString], { aqi: feature.properties.aqi,
                'fill': "#808080",
                'fill-opacity': '0.3',
                'stroke':"#808080",
                'stroke-opacity': '0.4',
                'stroke-width': 2
            });

            features.push(polygon);
        }
        console.log(features.length);
        this.featureCollection = turf.featurecollection(features);
        console.log(this.featureCollection.features.length);
        return this;
    };

    this.into = function(fileName) {
        fs.writeFileSync(fileName, JSON.stringify(this.featureCollection));
    };
};

var geoJSON = new GeoJSON();
fs.readFile('./aqi_data.json', 'utf8', function (err, data) {
    geoJSON.from(JSON.parse(data)).into('./aqis.geojson');
});



