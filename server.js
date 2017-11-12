// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var auth = require('basic-auth')
var bodyParser = require('body-parser');
var mysql = require('mysql');

// create database connection
var con = mysql.createConnection({
  host: "192.168.1.10",
  user: "username",
  password: "password",
  database: "bearschema"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('%s %s', req.method, req.path);
    var user = auth(req)
    // => { name: 'something', pass: 'whatever' }
    if (user == undefined) {
        res.statusCode = 401
        res.json({ message: '401 - Access denied. You must be authorized to use our api!' });
    }else{
        sql = "SELECT * FROM users WHERE username = '" + user.name + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length==0) {
                res.statusCode = 401
                res.json({ message: '401 - Access denied. User not found!' });
            }else if (result[0].password != user.pass){
                res.statusCode = 401
                res.json({ message: '401 - Access denied. Wrong password!' });
            }else{
                next();
            };
        });
    };
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        name = req.body.name;
        sql = "INSERT INTO bears (name) VALUES ('" + name + "')";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            message = 'Bear created! - ' + name ;
            res.json({ message: message });
        });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        sql = "SELECT * FROM bears"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json({ bears: result });
        });
    });
    
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        sql = "SELECT * FROM bears WHERE id = " + req.params.bear_id
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length==0) {
                res.statusCode = 404
                res.json({ message: '404 - Bear not found!' });
            }else{
                res.json(result);
            };
        });
    })
    
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {
        id = req.params.bear_id
        name = req.body.name;
        sql = "UPDATE bears SET name = '" + name + "' WHERE id = " + id
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.affectedRows==0) {
                res.statusCode = 404
                message = '404 - Bear not found!' ;
            }else{
                message = 'Bear edited! - id: ' + id + ', name: ' + name ;
            };
            res.json({ message: message });
        });
    })
    
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        id = req.params.bear_id
        sql = "DELETE FROM bears WHERE id = " + id
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.affectedRows==0) {
                res.statusCode = 404
                message = '404 - Bear not found!' ;
            }else{
                message = 'Bear deleted! - id: ' + id ;
            };
            res.json({ message: message });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

