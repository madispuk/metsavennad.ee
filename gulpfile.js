var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
	gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
	.pipe(gulp.dest('public/vendor/bootstrap'))

	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
	.pipe(gulp.dest('public/vendor/jquery'))

	gulp.src(['node_modules/magnific-popup/dist/**/*'])
	.pipe(gulp.dest('public/vendor/magnific-popup'))
})

gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);
gulp.task('dev', ['less', 'minify-css', 'minify-js', 'copy'], function() {
	gulp.watch('less/*.less', ['less']);
	gulp.watch('public/css/*.css', ['minify-css']);
	gulp.watch('public/js/*.js', ['minify-js']);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('less', function() {
	return gulp.src('less/stylesheet.less')
	.pipe(less())
	.pipe(gulp.dest('public/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('minify-css', ['less'], function() {
	return gulp.src('public/css/stylesheet.css')
	.pipe(cleanCSS({ compatibility: 'ie8' }))
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('public/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('minify-js', function() {
	return gulp.src('js/global.js')
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('public/js'))
	.pipe(browserSync.reload({
		stream: true
	}))
});
