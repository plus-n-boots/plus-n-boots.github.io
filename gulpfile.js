var babel = require('gulp-babel')
var concat = require('gulp-concat')
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var myth = require('gulp-myth')

var paths = {
  jsx: 'src/**/*.jsx',
  js: 'src/**/*.js',
  css: 'src/**/*.css'
}

gulp.task('js', function () {
  return gulp.src([paths.jsx, paths.js])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(plumber())
    .pipe(myth())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function() {
  gulp.watch([paths.jsx, paths.js], ['js'])
  gulp.watch([paths.css], ['css'])
})
