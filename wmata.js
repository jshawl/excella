var env = require("./env.js");
var request = require("request");

function getClosestStation(lat, lon, radius, callback){
  request("https://api.wmata.com/Rail.svc/json/jStations?api_key=" + env.primary, function(err,res,body){
    var stations = JSON.parse(body).Stations
    stations.forEach(function(station){
      var diff = getDistanceFromLatLonInM(station.Lat,station.Lon, lat, lon)
      if(diff < radius){
        callback(station)
      }
    })
  })
}

// http://stackoverflow.com/a/27943/850825
function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d * 1000;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


module.exports = function(req, res){
  getClosestStation(38.900468, -77.038539, 150, function(station){
    res.json({
      name: station.Name,
      stationLat: station.Lat,
      stationLon: station.Lon
    })
  })
}