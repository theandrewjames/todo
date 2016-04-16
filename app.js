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
    if(error) {throw error}
    else {
      var exercises = database.collection("exercises");
      exercises.find({}).toArray(function(error, docs) {
        res.json(docs);
        database.close();
      })
    }
  })
})

app.post("/todos/", jsonParser,  function(req, res) {
  myClient.connect(url, function(error, database) {
    if(error) {throw error}
    else {
      var exercises = database.collection("exercises");
      exercises.insert(
        {thing: req.body.thing}
      , function(error, results) {
        res.sendStatus(200);
        database.close();
      })
    }
  })
})

app.listen(1337);
