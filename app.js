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

app.listen(1337);
