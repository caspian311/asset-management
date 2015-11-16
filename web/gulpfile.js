var gulp = require('gulp');
var webserver = require('gulp-webserver');
 
gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
        port: 8000,
        livereload: true,
        path: 'public',
        directoryListing: true,
        open: true,
        fallback: 'index.html',
      }));
});
