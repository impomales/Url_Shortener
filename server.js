var mongo = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var db

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'static')))

mongo.connect('mongodb://' + process.env.IP + ':27017/urldb', function(err, dbConn) {
    if (err) throw err
    db = dbConn
    var server = app.listen(process.env.PORT || 8080, function() {
        console.log("server is running at port: " + server.address().port)
    })
})

