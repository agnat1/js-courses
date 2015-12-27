var express = require('express');
var app = express();
var swig = require('swig');
var router = require('./router');

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);

swig.setDefaults({ cache: false });

var companies = require('./data/data.json');

app.use(express.static('public'));

app.use(router);

app.use(function(req, res, next){
    var e = new Error();
    e.status = 404;
    next(e);
});

app.use(function(err, req, res, next){
    var status = (!!err.status) ? err.status : 500;
    var msg = "";
    if(status == 404){
        msg = "Page you're looking for is not here :(";
    }else if(status == 500){
        msg = "Ooops! Something went wrong :(";
    }
    res.status(status).send(msg);
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.close();
});