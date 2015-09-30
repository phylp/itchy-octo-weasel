var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('webpack:dev', function(){
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('staticfiles:dev', function(){
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'))
});

gulp.task('build:dev', ['webpack:dev', 'staticfiles:dev']);
gulp.task('default', ['build:dev']);
gulp.watch('./app/**/*.html', ['default'])