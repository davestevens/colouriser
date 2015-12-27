var gulp = require("gulp"),
    gutil = require("gulp-util"),
    browserify = require("gulp-browserify"),
    livereload = require("gulp-livereload"),
    mocha = require("gulp-mocha"),
    Config = require("./config.json"),
    config = Config.development,
    log_error = (error) => {
      gutil.log(gutil.colors.red(error.toString()));
      return this.emit("end");
    };

gulp.task("scripts", () => {
  return gulp
    .src("scripts/Colouriser.js")
    .pipe(
      browserify(config.browserify).on("error", log_error)
    )
    .pipe(gulp.dest(config.directory))
    .pipe(livereload());
});

require('babel-core/register');
gulp.task("test", () => {
  return gulp
    .src("test/**/*.spec.js", { read: false })
    .pipe(
      mocha({
        reporter: "spec",
        require: ["./test/helper"]
      }).on("error", gutil.log)
    );
});

gulp.task("development", () => { config = Config.development; });
gulp.task("production", () => { config = Config.production; });

gulp.task("watch", () => {
  livereload.listen();
  gulp.watch(["scripts/**/*"], ["scripts"]);
  gulp.watch(["scripts/**/*", "test/**/*"], ["test"]);
});

gulp.task("build", [
  "scripts"
]);

gulp.task("build-prod", ["production", "build"]);
gulp.task("build-dev", ["build", "watch"]);
gulp.task("default", ["build-dev"]);
