/**
 * Created by C5235715 on 12/24/2015.
 */

var fs = require('fs');
//var csv = require('csv');
//var turf = require('turf');
var Aqicn = require('./aqicn');

var key = "_1ca%2BV%1FH%09Z%1F%1D%27%0BK%3B%1C%1B";

var aqicn = new Aqicn(key);

aqicn.get({
    sw: {
        lat: 20,
        lng:90
    },
    ne: {
        lat: 60,
        lng:135
    }
}).then(function(resp) {
    //console.log(resp);
    console.log(JSON.parse(resp).length);
    fs.writeFileSync('aqi_data.json', resp);
}, function(err) {
    console.log(err);
});

//var pm25Token = "5j1znBVAsnSf5xQyNQyq";
//
//var pm25in = new Pm25in(pm25Token);
//
//pm25in.cities().then(function(resp) {
//    console.log(resp);
//}, function(err) {
//    console.log(err);
//});




