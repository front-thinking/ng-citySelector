var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');

gulp.task('js', function() {  
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
    return gulp.src('src/css/ng-city-selector.css')
        .pipe(gulp.dest('dist/css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function() {
    return gulp.src('src/html/citySelector.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/html'));
});

gulp.task('watch', function (cb) {
    gulp.watch('src/js/ng-citySelector.js', ['js']);
    gulp.watch('src/css/ng-city-selector.css', ['css']);
    gulp.watch('src/css/citySelector.html', ['html']);
});
gulp.task('default', ['js', 'css', 'html']);