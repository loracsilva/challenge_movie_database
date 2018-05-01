let gulp = require('gulp'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  {
    reload
  } = browserSync;

function handleErrors(err, task) {
  console.log(err.message);
  task.end();
}

gulp.task('jshint', () => {
  return gulp.src(['./src/**/*.js', '!./src/app/vendor/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('sass', () => {
  return gulp.src(['./src/**/!(_)*.sass'])
    .pipe(concat('list-movies-db.min.sass'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }, (details) => {

    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('uglify', () => {
  let task = uglify('list-movies-db.min.js', {
    outSourceMap: true
  });

  task.on('error', (e) => handleErrors(e, task));

  return gulp.src(['./src/**/*.js', '!./src/app/vendor/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(task)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('concat-js', () => {
  gulp.src(['./src/**/*.js', '!./src/app/vendor/**/*.js'])
    .pipe(concat('list-movies-db.js'))
    .pipe(gulp.dest('./dist/js'));

  gulp.src(['./src/**/!(app.routing).js', '!./src/app/vendor/**/*.js'])
    .pipe(concat('list-movies-db--no-routes.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass:watch', () => {
  gulp.watch(['./src/**/*.sass'], ['sass']);
});

gulp.task('js:watch', () => {
  gulp.watch('./src/**/*.js', ['uglify']);
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./dist/**/*').on("change", reload);
  gulp.watch('./src/index.html').on("change", reload);
  gulp.watch('./src/**/*.html').on("change", reload);
});

gulp.task('build', ['sass', 'concat-js', 'uglify']);
gulp.task('default', ['build', 'sass:watch', 'js:watch', 'serve']);
