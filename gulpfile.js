/*Lets bring es6 to es5 with this.
 Babel - converts ES6 code to ES5 - however it doesn't handle imports.
 Browserify - crawls your code for dependencies and packages them up
 into one file. can have plugins.
 Babelify - a babel plugin for browserify, to make browserify
 handle es6 including imports.*/

let gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    log = require('fancy-log'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    buffer = require('vinyl-buffer');


gulp.task('global', function () {
    browserify({ debug: true })
        .transform("babelify", {presets: ['es2015']})
        .require(['./_assets/js/close-popup.js', './_assets/js/formValidation.js', './_assets/js/gtm', './_assets/js/image-popup', './_assets/js/lead', './_assets/js/main', './_assets/js/mobile-navbar', './_assets/js/modal', './_assets/js/notifications', './_assets/js/search', './_assets/js/search-old', './_assets/js/select', './_assets/js/sticky'], { entry: true })
        .bundle()
        .on('error', gutil.log)
        .pipe(source('global.min.js'))
        .pipe(buffer()) // convert from streaming to buffered vinyl file object
        .pipe(uglify()) // now gulp-uglify works
        .pipe(size({
            title: 'size of global.min.js'
        }))
        .pipe(gulp.dest('./production/js/global'));
});

gulp.task('watch', function () {
    gulp.watch(['./_assets/js/*.js'], ['global']);
});

gulp.task('default', ['clean'], function () {
    gulp.start('global');
});

gulp.task('clean', function () {
    return gulp.src(['production/js/global', 'production/images'], {read: false})
        .pipe(clean());
});