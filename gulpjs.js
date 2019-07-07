var gulp = require('gulp');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');

gulp.task('css', function () {
  return gulp.src([
      'css/**/*.css',
      '!css/**/*.min.css',
     ])
    .pipe(cssnano())
    .pipe(rename(function(path) {
      path.extname = ".min.css";
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('js', function () {
  return gulp.src([
      'js/**/*.js',
      '!js/**/*.min.js',
     ])
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.extname = ".min.js";
    }))
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['css', 'js']);

gulp.task('createGlobalScss', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(order([
      'sass/colors.scss',
      'sass/theme.scss',
      'sass/settings.scss',
      'sass/functions.scss',
      'sass/mixins.scss',
      'sass/components/**/settings.scss',
      'sass/theme.scss',
      'sass/components/**/*.scss'
    ], { base: __dirname }))
    .pipe(concat('globalScss.scss'))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    return gulp.src('./styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/styles'));
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');

function onError(err) {
    console.log(err);
}

gulp.task('sass', function(){
    return gulp.src('src/style.scss')
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(minify())
        .pipe(gulp.dest('css/'))
        .pipe(plumber({
            errorHandler: onError
        }))
});


function onError(err){
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', function(){
  return gulp.src(['sass/*.scss', 'css/*.css', '!css/*.min.css.map','!css/*.min.css'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', onError))
    .pipe(gulp.dest('css'))
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});