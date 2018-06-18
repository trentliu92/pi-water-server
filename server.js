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
    var pyshell = PythonShell.run('buttonLED.py', options, { mode: 'text '});
    res.header("Acess-Control-Allow-Origin", "*");
    res.send({"data": "watering"});
    pyshell.on('message', function(message){
        if(message === "LED ON") {
            console.log("LED ON");
        }
    });
});


