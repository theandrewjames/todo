casper.test.begin("Testing page contents", 5, function suite(test) {
  casper.start("http://localhost:1337");

  casper.then(function() {
    test.assertExists("#profile")
     this.click("#profile");
  });

  casper.then(function() {
    test.assertExists("#todo");
    this.click("#todo");
  });

  casper.then(function() {
    test.assertExists("#todoInput");
    this.fill("form#todoForm", { "thingTodo" : "stuff" });
  });

    casper.then(function() {
      test.assertExists("#todoDate");
      this.fill("form#todoForm", { "todoDate" : "11/25/1991" });
      this.capture("date.jpg")
    })

    casper.then(function() {
      test.assertExists("#addTodo");
      this.capture("add.jpg")
      this.click("#addTodo");
    })

  casper.run(function() {
    test.done();
  })
})
