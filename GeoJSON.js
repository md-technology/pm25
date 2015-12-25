/**
 * Created by C5235715 on 12/24/2015.
 */

var Q = require('q');
var turf = require('turf');
var isobands = require('turf-isobands');
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

        this.tin(this.featureCollection);
        return this;

        var breaks = [10, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];
        //var breaks = [100, 200, 300, 400, 500, 600];
        //this.isolined = turf.isolines(this.featureCollection, 'aqi', 20, breaks);
        this.isolined = isobands(this.featureCollection, 'aqi', 80, breaks);

        //features = [];
        for(var i = 0; i<this.isolined.features.length; i++) {
            var feature = this.isolined.features[i];
            //var lineString = feature.geometry.coordinates;
            //lineString[lineString.length] = lineString[0];
            //var polygon = turf.polygon([lineString], { aqi: feature.properties.aqi,
            //    'fill': "#808080",
            //    'fill-opacity': '0.3',
            //    'stroke':"#808080",
            //    'stroke-opacity': '0.4',
            //    'stroke-width': 2
            //});

            feature.properties['fill'] = "#808080";
            feature.properties['fill-opacity'] = "0.3";
            feature.properties['stroke'] = "#808080";
            feature.properties['stroke-opacity'] = "0.3";
            feature.properties['stroke-width'] = "1";

            //features.push(polygon);
        }
        console.log(this.isolined.features.length);
        this.featureCollection = this.isolined;//turf.featurecollection(features);
        //console.log(this.featureCollection.features.length);
        return this;
    };

    this.tin = function(points) {
        var tin = turf.tin(points, 'aqi');
        for (var i = 0; i < tin.features.length; i++) {
            var properties  = tin.features[i].properties;
            // roughly turn the properties of each
            // triangle into a fill color
            // so we can visualize the result
            properties.aqi = (properties.a +
                properties.b + properties.c)/3;
            properties['fill'] = "#808080";
            properties['fill-opacity'] = (properties.a +
                properties.b + properties.c)/3/600;
            properties['stroke-width'] = 0;
            properties['stroke-opacity'] = 0;
        }
        this.featureCollection = tin;
    };

    this.into = function(fileName) {
        fs.writeFileSync(fileName, JSON.stringify(this.featureCollection));
    };
};

var geoJSON = new GeoJSON();
fs.readFile('./aqi_data.json', 'utf8', function (err, data) {
    geoJSON.from(JSON.parse(data)).into('./aqis_tin.geojson');
});



