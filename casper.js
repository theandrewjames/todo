

casper.test.begin("Testing page contents", 2, function suite(test) {
  casper.start("http://localhost:1337");

  casper.then(function() {
     casper.click("#profile");
  });

  casper.then(function() {
    casper.click("#todo");
  });
  casper.run(function() {
    test.done();
  })
})
