var mysql = require('mysql');
var https = require('https');
var express = require('express');
var fs = require('fs');

var app = express();

var con = mysql.createConnection({
        host: 'localhost',
        user: 'zelon',
        database: 'hw5'
    });

var gApiKey = '\&key=' + fs.readFileSync('./gmaps_key','utf8');
var GoogleMaps = require('@google/maps').createClient({key: gApiKey});
	
	
app.use(express.static("./Home"));

app.listen(8080, function() {
	console.log('Server is initialized...');
});

app.get('/', function (req, res){
        var data = fs.readFileSync('./index.html','utf8');
        res.end(data);
    });
	
	
app.get('/route', function(req, res){
	console.log("Received request for train directions.");
	var options = {
				host: 'maps.googleapis.com',
				path: '/maps/api/directions/json?origin=' + req.query.origin +'&destination=' + req.query.destination + '&mode=transit&transit_mode=rail&transit_routing_preference=less_walking' + gApiKey
	};
	
	https.request(options, function(resp) {
		var out = '';
		resp.on('data', function(chunk){out += chunk;});
		resp.on('end', function() {res.send(out);});
	}).end();
		
	
		
	
	
});