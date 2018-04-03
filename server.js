// Dependencies
// ============================================================================
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");


// Sets up the Express App
// ============================================================================
var app = express();
var PORT = process.env.PORT || 8080;


// Require all models
// ============================================================================
var db = require("./models");


// Mongoose
// ============================================================================

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });


// Set Handlebars.
// ============================================================================
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// Body Parser
// ============================================================================
var bodyParser = require("body-parser");
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));


// Use express.static to serve the public folder as a static directory
// ============================================================================
app.use(express.static("public"));


// Routes
// ============================================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


// Start the server
// ============================================================================
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});

