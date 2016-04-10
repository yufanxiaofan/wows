// dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');
var socketioJwt = require('socketio-jwt');
var routes = require('./routes/index');
var env = require("./config/env").config();

/* Socket.IO events */
var socketActions = [
    //require('./serverAction/socketAllActions')
];

//test commit

// ssl configurations
// TODO::upgrade to https
//var https = require('https');
//var fs = require('fs');
//var sslOptions = {
//    key: fs.readFileSync('./ssl/server.key'),
//    cert: fs.readFileSync('./ssl/server.crt'),
//    ca: fs.readFileSync('./ssl/ca.crt'),
//    requestCert: true,
//    rejectUnauthorized: false
//};
//var secureServer = https.createServer(sslOptions,app);

//config express app
var app = express();

//Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*
 *  error handlers
 *  development error handler
 *  will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var http = require('http');
var server = http.createServer(app);
var socketIO = require('socket.io').listen(server);

var jwtSecret = env.socketSecret;
socketIO.use(socketioJwt.authorize(
    {
        secret: jwtSecret,
        handshake: true
    }));

socketIO.sockets.on('connection', function (socket) {
    for (var i = 0; i < socketActions.length; i++) {
        socketActions[i].listen(socketIO, socket);
    }
});

server.listen((process.env.PORT || 8000) , function () {
    console.log("Express server listening on port: " + (process.env.PORT || 8000));
});


//todo::temp code to be deleted
//if( process.env.NODE_ENV === 'development' ){
////config socket.io with sticky-session
//    var sticky = require('sticky-session');
//    var http = require('http');
//    var server = http.createServer(app);
//
//    if (!sticky.listen(server, (process.env.PORT || 9000))) {
//        // Master code
//        server.once('listening', function () {
//            console.log('server started on ' + (process.env.PORT || 9000) + ' port');
//        });
//    } else {
//        // Worker code
//        var socketIO = require('socket.io').listen(server);
//        var redis = require('socket.io-redis');
//        socketIO.adapter(redis({host: env.redisUrl, port: env.redisPort}));
//
//        var jwtSecret = env.socketSecret;
//        socketIO.use(socketioJwt.authorize(
//            {
//                secret: jwtSecret,
//                handshake: true
//            }));
//
//        socketIO.sockets.on('connection', function (socket) {
//            for (var i = 0; i < socketActions.length; i++) {
//                socketActions[i].listen(socketIO, socket);
//            }
//        });
//    }
//}
//else{
//}

module.exports = app;
