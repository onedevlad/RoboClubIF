const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const wait = require('gulp-wait')
const cssnext = require('postcss-cssnext')
const precss = require('precss')
const uglify = require('gulp-uglify')
const del = require('del')
const browserSync = require('browser-sync').create()


const onError = function(err) {
  console.log(err)
  this.emit('end')
}

gulp.task('browser-sync', function() {
  browserSync.init({
    server: "./build",
    notify: false,
    open: false,
  })
})

gulp.task('clean', function() {
  return del.sync('build/*')
})

gulp.task('views', function() {
  return gulp.src(['src/**/*.pug', '!src/templates/*'])
    .pipe(pug())
    .on('error', onError)
    .pipe( gulp.dest('build/') )
    .on('finish', browserSync.reload)
})

gulp.task('styles', function() {
  var plugins = [
    precss(),
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ]

  gulp.src('src/styles/**/*.scss')
    .pipe(wait(100))
    .pipe(sass())
    .on('error', onError)
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/styles/'))
})

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe( sourcemaps.init() )
    .pipe(uglify())
    .on('error', onError)
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('build/scripts/') )
})

gulp.task('fonts', function() {
  return gulp.src('src/fonts/*')
    .on('error', onError)
    .pipe( gulp.dest('build/fonts/') )
})

gulp.task('images', function() { // TODO: Apply compression
  return gulp.src('src/images/**/*')
    .on('error', onError)
    .pipe(gulp.dest('build/images/'))
})

gulp.task('watch', function() {
  gulp.watch('src/fonts/*', ['fonts'])
  gulp.watch('src/images/*', ['images'])
  gulp.watch('src/*.pug', ['views'])
  gulp.watch('src/templates/*', ['views'])
  gulp.watch('src/styles/**/*.scss', ['styles'])
  gulp.watch('src/scripts/*.js', ['scripts'])
})

gulp.task('default', ['clean', 'views', 'browser-sync', 'styles', 'scripts', 'fonts', 'images', 'watch'])
