// Requiring models
// ============================================================================
var db = require("../models");
var axios = require("axios");

module.exports = function(app) {

  // A GET route for scraping NPR
  // ===============================================================================================
app.get("/api/scrape", function(req, res) {

  axios.get("https://www.npr.org/sections/news").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // grab every h2 with title class
    $("h2.title").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the title, link and summary and save them as properties of the result object
      result.title = $(this).text();
      result.link = $(this).children().attr("href");
      result.summary = $(this).next().children('a').text();

      // Create a new Article using the `result` object built from scraping
      db.Headline.create(result)
        .then(function(dbHeadline) {
          // View the added result in the console
          console.log(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});
  
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