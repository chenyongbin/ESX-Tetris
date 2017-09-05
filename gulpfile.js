var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('build', function () {
    var b = browserify({
        entries: './src/bootstrap.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // 在这里将转换任务加入管道
        .pipe(uglify())
        .on('error', printLog)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/'));
});

const printLog = function (err) {
    console.log(err);
}