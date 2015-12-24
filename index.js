/**
 * Created by C5235715 on 12/24/2015.
 */

//var fs = require('fs');
//var csv = require('csv');
//var turf = require('turf');
var Pm25in = require('./pm25in');

var pm25Token = "5j1znBVAsnSf5xQyNQyq";

var pm25in = new Pm25in(pm25Token);

pm25in.cities().then(function(resp) {
    console.log(resp);
}, function(err) {
    console.log(err);
});




