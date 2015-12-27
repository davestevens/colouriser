var gulp = require("gulp"),
    gutil = require("gulp-util"),
    browserify = require("gulp-browserify"),
    Config = require("./config.json"),
    config = Config.development,
    log_error = (error) => {
      gutil.log(gutil.colors.red(error.toString()));
      return this.emit("end");
    };

gulp.task("scripts", () => {
  return gulp
    .src("scripts/*.js")
    .pipe(
      browserify(config.browserify).on("error", log_error)
    )
    .pipe(gulp.dest(config.directory));
});

gulp.task("development", () => { config = Config.development; });
gulp.task("production", () => { config = Config.production; });

gulp.task("watch", () => {
  gulp.watch(["scripts/**/*"], ["scripts"]);
});

gulp.task("build", [
  "scripts"
]);

gulp.task("build-prod", ["production", "build"]);
gulp.task("build-dev", ["build", "watch"]);
gulp.task("default", ["build-dev"]);
