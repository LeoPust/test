"use strict";
let express         = require("express"),
    fs              = require("fs"),
    app             = express(),
    logger          = require("morgan"),
    bodyParser      = require("body-parser"),
    cookieParser    = require("cookie-parser"),
    moment          = require('moment'),
    compression     = require('compression');

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("static"));
app.use("/static", express.static("static"));
app.use("/node_modules", express.static("node_modules"));

app.get("*",(req,res) => {
   res.sendFile(__dirname + "/static/template/index.html");
});

app.listen(9000, () => {
    console.log("server start!");
})