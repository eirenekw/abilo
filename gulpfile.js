var gulp = require('gulp'), 
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify-css'),
	plumber = require('gulp-plumber'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	uglify = require('gulp-uglify');

function onError(err){
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', function(){
	return gulp.src(['sass/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass())		
		.pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('css'));
});

gulp.task('styles', function(){
	return gulp.src(['css/*.css', '!css/*.min.css.map','css/*.min.css'])
		.pipe(prefix('last 2 versions'))
		.pipe(minify())
		.pipe(concat('custom.css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(plumber({
            errorHandler: onError
        }))
		.pipe(gulp.dest('css'));
});

gulp.task('scripts', function(){
	return gulp.src(['js/*.js', '!js/*.min.js'])
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(plumber({
            errorHandler: onError
        }))
		.pipe(gulp.dest('js'));
});

gulp.task('watch', function(){
	gulp.watch('sass/*.scss', ['sass']);
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('css/*.css', ['styles']);
});

gulp.task('default', ['sass','styles', 'scripts', 'watch']);