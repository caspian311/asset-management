var gulp = require('gulp')
  , webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
        port: 8000,
        livereload: true,
        open: true
      }));
});
