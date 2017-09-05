var mysql = require('mysql');
var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
var con = mysql.createConnection({
        host: 'localhost',
        user: 'zelon',
        database: 'hw5'
    });

app.use(express.static("./Home"));
app.listen(8080);
app.get('/', function (req, res){
        var data = fs.readFileSync('./index.html','utf8');
        res.end(data);
    });