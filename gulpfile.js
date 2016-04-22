var gulp = require("gulp");
var mocha = require("gulp-mocha");
var nodemon = require("gulp-nodemon");
var casper = require("gulp-casperjs");

gulp.task("default", function() {
  nodemon({script: "app.js"})
  .on("start", ["test", "casperCmd"])
})

gulp.task("test", function() {
  return gulp.src("app.spec.js").pipe(mocha());
})

gulp.task("casperCmd", function() {
  return gulp.src("casper.js").pipe(casper());
})
