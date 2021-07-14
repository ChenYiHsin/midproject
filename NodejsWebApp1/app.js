'use strict';
var express = require("express");
var port = process.env.PORT || 3000
var path = require("path");
var connect = require("connect");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var http = require('http');
var index = require('./routes/index.js');
var goods = require('./routes/goods.js');
var app = express();


var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "db01"
});
con.connect(function (err) {
    if (err) {
        console.log('connecting error', err);
        return;
    }
    console.log('connecting success');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false, limit:"50mb" }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(index);
app.use(goods);
app.use(cookieParser());
//app.use(express.urlencoded({ extends: true }));
app.use(express.static(path.join(__dirname, "public")));



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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db state
app.use(function (req, res, next) {
    req.con = con;
    next();
});
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
/*no stacktraces leaked to user*/
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;

app.listen(port);
console.log(`server listening on:  ${port}`)


