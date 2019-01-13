const path = require('path');
const autoprefixer = require('autoprefixer');
const gulp = require('gulp');
const less = require('gulp-less');
const precss = require('precss');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

const stylesBuildPath = path.join(__dirname, './public/build/assets/styles');
const imagesBuildPath = path.join(__dirname, './public/build/assets/images');
const stylesSrcPath = path.join(__dirname, './assets/styles');
const imagesSrcPath = path.join(__dirname, './assets/images');
const stylesSrcPattern = `${stylesSrcPath}/*.{css,scss}`;
const imagesSrcPattern = `${imagesSrcPath}/*.{jpg,jpeg,png}`;
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

const buildCss = () => {
  return gulp
    .src([stylesSrcPattern])
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([precss, autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(stylesBuildPath));
};

const buildImages = () => {
  return gulp
    .src(imagesSrcPattern)
    .pipe(imagemin())
    .pipe(gulp.dest(imagesBuildPath));
};

gulp.task('images', buildImages);

gulp.task('images-watch', () => {
  gulp.watch(imagesSrcPattern, buildImages);
});

gulp.task('css', buildCss);

gulp.task('css-watch', () => {
  gulp.watch(stylesSrcPattern, buildCss);
});
