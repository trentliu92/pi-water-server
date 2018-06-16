const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var PythonShell = require('python-shell');

const port = 1337;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`App started on port ` + port));

app.get('/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.send("pi-server connected");
});

app.get('/waterplants', function(req, res) {
    var options = {
	pythonPath: '/usr/bin/python3.5'
    }
    PythonShell.run('buttonLED.py', options, function (err) {
        if (err) throw err;
        console.log('finished');
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.send({"data": "watering"});
});


