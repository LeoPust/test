'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('js:comp', function() {
    gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-resource/angular-resource.min.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-sanitize/angular-sanitize.min.js',
        './node_modules/angular-touch/angular-touch.min.js',
        './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        './static/app/**/*.js',
        '!./assets/js/vendor/**/*.js'
    ])
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./static/js'));
});

gulp.task('js:watch', function () {
    gulp.watch('./static/js/**/*.js', ['js:comp']);
});
