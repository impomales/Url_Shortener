var mongo = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var shortid = require('shortid')
var validUrl = require('valid-url')
var db

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'static')))

app.get('/new/*', function(req, res) {
    console.log(req.params.url)
    if (!validUrl.isWebUri(req.params[0]))
        res.json({err: 'Invalid web format'})
    var url = {original_url: req.params[0], short_url: shortid.generate()}
    // validate url.
    
    db.collection('urls').insertOne(url, function(err, result) {
        if (err) throw err;
        res.json(url)
    })
})

mongo.connect('mongodb://' + process.env.IP + ':27017/urldb', function(err, dbConn) {
    if (err) throw err
    db = dbConn
    var server = app.listen(process.env.PORT || 8080, function() {
        console.log("server is running at port: " + server.address().port)
    })
})

