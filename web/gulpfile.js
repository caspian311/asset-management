var gulp = require('gulp')
  , webserver = require('gulp-webserver')
  , wiredep = require('wiredep').stream;

gulp.task('bower', function () {
  gulp.src('./public/index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
        port: 8000,
        livereload: true,
        open: true
      }));
});
