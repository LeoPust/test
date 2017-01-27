"use strict";
let express         = require("express"),
    fs              = require("fs"),
    app             = express(),
    logger          = require("morgan"),
    bodyParser      = require("body-parser"),
    cookieParser    = require("cookie-parser"),
    moment          = require('moment'),
    compression     = require('compression'),
    helmet          = require('helmet'),
    csp             = require("helmet-csp"),
    nocache         = require('nocache');

app
    .use(helmet())
    .use(nocache())
    .use(compression({ threshold: 0 }))
    .use(logger('dev'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(express.static("static"))
    .use("/static", express.static("static"))
    .use("/node_modules", express.static("node_modules"))
    .use((req,res,next) => {
        res
            .header("Strict-Transport-Security","max-age=31536000; includeSubDomains; preload")
            .header("Content-Security-Policy","default-src 'self';");
        next();
    })
    .use(csp({
        directives:{
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"]
        }
    }));

app.options("*",(req,res) => {
    res
        .header("Access-Control-Allow-Methods","GET, POST")
        .header("Access-Control-Allow-Origin","*")
        .header("Access-Control-Allow-Headers","Accept, Authorization, Content-Type")
        .status(204)
        .end();
});

app.get([
    "/",
    "/project/create",
    "/task/create",
    "task/:id"
],(req,res) => {
   res.sendFile(__dirname + "/static/template/index.html");
});

app.all("*",(req,res) => {
   res.sendStatus(404);
});

app.listen(9000, () => {
    console.log("server start!");
});