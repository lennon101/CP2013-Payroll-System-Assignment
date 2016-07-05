// Enable jsLint and strict mode for better programming style
/*jslint node: true */
"use strict";

// Require npm modules
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var User = require("./schemas/User")(mongoose);
var allUsersTable = require("./routes/allUsers")(User);
var modifiedStructure = require("./routes/routesNew")(User);


// Connect to MongoDB
mongoose.connect("mongodb://hello_world:catinahat_1@ds049898.mongolab.com:49898/payroll_db");
var db  = mongoose.connection;
db.on("error", function(err) {
   console.log("Error with connection:");
});
db.on("open", function(callback){
   console.log("connection successful");
});

// Create the server
var app = express();
//
// Set server network configurations
app.set("ip", "127.0.0.1");
//app.set("ip", "192.168.1.59");
app.set("port", process.env.PORT || 8080);

// Set application specifications and tools
app.set("view engine", "jade");
app.use(express.static("client-side/scripts"));
app.use(express.static("client-side/stylesheets"));
//app.use(express.static("client-side/startbootstrap"));
app.use(express.static('view'));
app.use(express.static("client-side/scripts/generic"));

//Initialize middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", modifiedStructure);
app.use("/users", allUsersTable);
app.get("/", function(request, response, next){
   response.render("home", {});
   next();
});
//Test route

http.createServer(app).listen(app.get("port"), app.get("ip"), function(){
   console.log("server now listening on port: " + app.get("port"));
});

