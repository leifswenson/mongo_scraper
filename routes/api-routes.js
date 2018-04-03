// Requiring models
// ============================================================================
var db = require("../models");


module.exports = function(app) {
  
   // GET route for getting all headlines.
    // ===============================================================================================
    app.get("/api/headlines", function (req, res) {
      // Grab every document in the Headlines collection
      db.Headline.find({})
        .then(function(dbheadline) {
          // If we were able to successfully find headlines, send them back to the client
          res.json(dbheadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });

    });


    // GET rotue for retrieving a single headline.
    // ===============================================================================================
    app.get("/api/headlines/:id", function (req, res) {
      db.headline.findOne({
        where: {
            id: req.params.id
        }
      })
      .then(function (dbheadline) {

        return res.render("index", {headline: dbheadline});
      });
    });
    


    // DELETE route
    // ===============================================================================================
    app.delete("/api/headlines/:id", function (req, res) {

      db.headline.destroy({
        where: {
            id: req.params.id
        }
      }).then(function (dbheadline) {
        res.json(dbheadline);
      });

    });   


};