
var request = require('request');
var Q = require('q');

function Aqicn(token) {
    var host = 'http://sg1.aqicn.org/mapq/bounds/';
    var proxyUrl = "http://bluecoat-proxy:8080/";

    var proxiedRequest = request.defaults({'proxy': proxyUrl});

    var options = {
        url: host,
        qs: {
            key: token
        }
    };

    this.get = function (bounds) {
        var deferred = Q.defer();
        var url = host;
        options.url = url;
        var sw = "("+bounds.sw.lat+","+bounds.sw.lng+")";
        var ne = "("+bounds.ne.lat+","+bounds.ne.lng+")";
        var pBounds = "("+sw+","+ne+")";
        options.qs.bounds = pBounds;
        request.get(options, function (err, response, body) {
            if (err) {
                deferred.reject(err);
                return;
            }

            deferred.resolve(body);
        });
        return deferred.promise;
    };

}

module.exports = Aqicn;