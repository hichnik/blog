import gulp from 'gulp';
import mocha from 'gulp-mocha';

gulp.task('test', function() {
  gulp.src('test/**/*.js', {read: false})
      .pipe(mocha({timeout: 20000}));
});
