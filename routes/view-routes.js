// Dependencies
// ============================================================================
var db = require("../models");


module.exports = function(app) {

  app.get("/", function (req, res) {
    res.render("home");
  });
  
  app.get("/headlines", function (req, res) {
    res.render("saved");
  });
  
};