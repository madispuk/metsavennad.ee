var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require("browser-sync").create();
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pkg = require("./package.json");

// Copy vendor libraries from /node_modules into /vendor
gulp.task("copy", function (done) {
  gulp
    .src(["node_modules/bootstrap/dist/**/*", "!**/npm.js", "!**/bootstrap-theme.*", "!**/*.map"])
    .pipe(gulp.dest("public/vendor/bootstrap"));

  gulp
    .src(["node_modules/jquery/dist/jquery.js", "node_modules/jquery/dist/jquery.min.js"])
    .pipe(gulp.dest("public/vendor/jquery"));

  gulp
    .src([
      "node_modules/lightgallery/lightgallery.min.js",
      "node_modules/lightgallery/plugins/thumbnail/lg-thumbnail.min.js",
      "node_modules/lightgallery/plugins/zoom/lg-zoom.min.js",
    ])
    .pipe(gulp.dest("public/vendor/lightgallery/js"));

  gulp
    .src(["node_modules/lightgallery/css/lightgallery-bundle.min.css"])
    .pipe(gulp.dest("public/vendor/lightgallery/css"));

  gulp.src(["node_modules/lightgallery/images/*"]).pipe(gulp.dest("public/vendor/lightgallery/images"));

  gulp.src(["node_modules/lightgallery/fonts/*"]).pipe(gulp.dest("public/vendor/lightgallery/fonts"));

  done();
});

gulp.task("less", function () {
  return gulp
    .src("less/stylesheet.less")
    .pipe(less())
    .pipe(gulp.dest("public/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("minify-css", gulp.series("less"), function () {
  return gulp
    .src("public/css/stylesheet.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("default", gulp.series("less", "minify-css", "copy"));

gulp.task("watch", function (done) {
  gulp.watch("less/*.less", gulp.series("less", "minify-css"));
  done();
});

gulp.task("dev", gulp.series("less", "minify-css", "copy", "watch"));
