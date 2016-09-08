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
    if (!validUrl.isWebUri(req.params[0])) {
        res.json({err: 'Invalid web format'})
        return
    }
    
    var url = {original_url: req.params[0], short_url: shortid.generate()}
    
    db.collection('urls').insertOne(url, function(err, result) {
        if (err) throw err;
        res.json({original_url: url.original_url, short_url: url.short_url})
    })
})

mongo.connect('mongodb://' + process.env.IP + ':27017/urldb', function(err, dbConn) {
    if (err) throw err
    db = dbConn
    var server = app.listen(process.env.PORT || 8080, function() {
        console.log("server is running at port: " + server.address().port)
    })
})

