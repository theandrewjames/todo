var express = require("express");
var app = express();
var mongo = require("mongodb");
var myClient = mongo.MongoClient;
var url = "mongodb://localhost/test";
var jsonParser = require("body-parser").json();


app.use(express.static("./public"));

app.use(jsonParser);

app.get("/user", function(req, res) {
  var user = {
    name: "Andrew",
    location: "California"
  }
  res.json(user)
})

app.get("/todos/:user", function(req, res) {
  myClient.connect(url, function(error, database) {
    if(error) {console.log(error)}
    else {
      var exercises = database.collection("exercises");
      exercises.find({}).toArray(function(error, docs) {
        res.json(docs);
        database.close();
      })
    }
  })
})

app.post("/todos/add/", jsonParser,  function(req, res) {
  myClient.connect(url, function(error, database) {
    if(error) {console.log(error)}
    else {
      var exercises = database.collection("exercises");
      exercises.insert(
        {thing: req.body.thing, date: req.body.date}
      , function(error, results) {
        res.sendStatus(200);
        database.close();
      })
    }
  })
})

app.delete("/todos/delete/:thing", function(req, res) {
  myClient.connect(url, function(error, database) {
    if(error) {console.log(error)}
    else {
      var exercises = database.collection("exercises");
      exercises.remove(
        {thing: req.params.thing}
        , function(error, results) {
          res.sendStatus(200);
          database.close();
        }
      )
    }
  })
})

if(!require.main.loaded) {
  var port = process.env.PORT || 1337;
  app.listen(port, function() {
    console.log("Listening on port " + port);
  })
}

module.exports = app;
