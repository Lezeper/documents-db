var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function () {
  gulp.src(['./client/**/*.js', '!./client/**/*.test.js', '!./client/app.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('./app.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('client'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('client'));
});

gulp.task('watch', function () {
  watch(['./client/**/*.js', '!./client/**/*.test.js', '!./client/app.min.js'], function () {
    gulp.start('scripts');
  });
});

gulp.task('default', ['scripts', 'watch']);