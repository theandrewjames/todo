var chai = require("chai");
var request = require("request");
var assert = chai.assert;

var app = require("./app.js");

var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;

describe("Todos can", function() {

  it("be returned", function(done) {
    request("http://localhost:" + port + "/todos/Andrew", function(error, response, body) {
      assert.equal(response.statusCode, 200)
      done();
    })
  })

  it("post", function(done) {
    request({
      method: "POST",
      url: "http://localhost:" + port + "/todos/add/",
      json: {thing: "stuff"}
    }, function(error, response, body) {
      assert.equal(response.statusCode, 200)
      done();
    })
    })

  it("delete", function(done) {
    request({
      method: "delete",
      url: "http://localhost:" + port + "/todos/delete/stuff"
    }, function(error, response, body) {
      assert.equal(response.statusCode, 200)
      server.close();
      done();
    })
  })

})
