/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    routes = require('./routes/index'),
    http = require('http'),
    path = require('path');

require('./gulpfile');
var gulp = require('gulp');
gulp.start('config');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'local';

// development only
if (env === 'development') {
    app.use(errorHandler());
}

// routes
app.use('/', routes);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port: " + app.get('port'));
});