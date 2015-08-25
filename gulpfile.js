var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var less = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');

var paths = {
    less: ['./app/less/*.less'],
    js: ['./app/js/**/*.js']
};

gulp.task('default', ['styles', 'concatApp', 'concatLib', 'concatTemplates', 'copyIndex', 'copyImages', 'copyFonts']);

gulp.task('less', function () {
    return gulp.src(['./app/less/style.less'])
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./wwwroot/assets/css/'));
});

gulp.task('styles', [
    'less'
]);

gulp.task('copyFonts', function () {
    gulp.src([
        './bower_components/font-awesome/fonts/*',
        './bower_components/bootstrap/dist/fonts/*'
    ])
        .pipe(gulp.dest('./wwwroot/assets/font/'))
});

gulp.task('copyImages', function () {
    gulp.src([
        './app/images/*'
    ]).pipe(gulp.dest('./wwwroot/assets/img/'))
});

gulp.task('concatTemplates', function () {
    gulp.src([
        './app/templates/**/*.html'
    ]).pipe(templateCache('templates.js', {
        transformUrl: function (url) {
            return '/templates/' + url;
        }
    }))
        .pipe(gulp.dest('wwwroot/assets/js'));
});

gulp.task('copyIndex', function () {
    gulp.src([
        './app/index.html'
    ]).pipe(gulp.dest('./wwwroot/'))
});

gulp.task('concatApp', function () {
    return gulp.src([
        './app/js/app.js',
        './app/js/configs/**/*.js',
        './app/js/services/**/*.js',
        './app/js/controllers/**/*.js',
        './app/js/directives/**/*.js',
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./wwwroot/assets/js/'));
});

gulp.task('concatLib', function () {
    return gulp.src([
        './bower_components/angular/angular.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js'
    ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./wwwroot/assets/js/'));
});

gulp.task('watch', function () {
    gulp.watch(paths.less, ['styles']);
    gulp.watch(paths.js, ['concatApp']);
});