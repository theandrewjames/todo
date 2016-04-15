var express = require("express");
var app = express();

app.use(express.static("./public"));

app.get("/user", function(req, res) {
  var user = {
    name: "Andrew",
    location: "California"
  }
  res.json(user)
})

app.get("/todos/:user", function(req, res) {
  if(req.params.user === "Andrew") {
    var todos = ["Exercise 1","Exercise 2","Exercise 3","Exercise 4"];
    res.send(todos);
  } else {
    res.sendStatus(404);
  }
})

app.listen(1337);
