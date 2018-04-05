// Dependencies
// ============================================================================
var db = require("../models");


module.exports = function(app) {

  // Route for getting all Headlines
  app.get("/", function(req, res) {
    
    db.Headline.find({})
      .then(function(dbHeadline) {
        
        res.render("index", { headlines: dbHeadline });
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  
  
  
  // app.get("/headlines", function (req, res) {
  //   res.render("saved");
  // });
  
};