var gulp = require('gulp');
var webpack = require('webpack-stream');
var mocha = require('gulp-mocha');

gulp.task('webpack:dev', function(){
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function(){
  return gulp.src('./test/client/test_entry.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/client'));
});

gulp.task('staticfiles:dev', function(){
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'))
});

gulp.task('servertests', function(){
  return gulp.src('test/api_test/**/test.js')
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('build:dev', ['webpack:dev', 'staticfiles:dev']);
gulp.task('default', ['build:dev']);
gulp.watch('./app/**/*.html', ['default'])
