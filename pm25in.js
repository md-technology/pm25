/**
 * Created by C5235715 on 12/24/2015.
 */

var request = require('request');
var Q = require('q');

function Pm25in(token) {
    var host = 'http://www.pm25.in/api';
    var proxyUrl = "http://bluecoat-proxy:8080/";

    var proxiedRequest = request.defaults({'proxy': proxyUrl});

    var options = {
        url: host + "/querys.json",
        qs: {
            token: token
        }
    };

    this.cities = function () {
        var deferred = Q.defer();
        var url = host + "/querys.json";
        options.url = url;
        proxiedRequest.get(options, function (err, response, body) {
            if (err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(body);
        });
        return deferred.promise;
    };

}

module.exports = Pm25in;