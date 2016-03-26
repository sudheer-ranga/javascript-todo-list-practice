var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('scss', function() {
  gulp.src('scss/**/*.scss')
    .pipe($.sass({sourcemap: true, sourcemapPath: 'scss/maps'}))
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('css/'));
});

gulp.task('scss:min', function() {
  gulp.src('scss/**/*.scss')
    .pipe($.sass({sourcemap: false, outputStyle: 'compressed'}))
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe($.rename("style.min.css"))
    .pipe(gulp.dest('css/'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['scss', 'scss:min']);
});

gulp.task('default', ['watch']);