var fs = require("fs");

var env = fs.existsSync("./env.js") ? require("./env.js") : process.env;
var request = require("request");

function getClosestStation(lat, lon, radius, callback){
  var url = "https://api.wmata.com/Rail.svc/json/jStationEntrances?api_key=" + env.primary + "&Lat="+lat+"&Lon="+lon+"&Radius=" + radius;
  console.log(url)
  request(url , function(err,res,body){
    console.log("entrances:", body)
    var code = JSON.parse(body).Entrances[0].StationCode1;
    var url = "https://api.wmata.com/Rail.svc/json/jStationInfo?api_key="+env.primary+"&StationCode=" + code;
    request(url, function(err, res, body){
      callback(JSON.parse(body))
    })
  })
}

function getDepartures( code, callback ){
  request("https://excellathon.herokuapp.com/wmata/StationPrediction.svc/json/GetPrediction/" + code, function(err, res, body){
    callback(JSON.parse(body).Trains)
  })
}

module.exports = function(req, res, next){
  console.log("GOT", req.body)
  getClosestStation(req.body.latitude, req.body.longitude, req.body.radius, function(station){
        console.log("ST", station)
        res.json({
          station: station.Name,
          stationLat: station.Lat,
          stationLon: station.Lon
        })
  })
}