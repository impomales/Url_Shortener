var mongo = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID
var express = require('express')
var app = express()
var db

app.get('/', function(req, res) {
    res.send('hello world.')
})

mongo.connect('mongodb://' + process.env.IP + ':27017/urldb', function(err, dbConn) {
    if (err) throw err
    db = dbConn
    var server = app.listen(process.env.PORT || 8080, function() {
        console.log("server is running at port: " + server.address().port)
    })
})

