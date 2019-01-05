const path = require('path');
const autoprefixer = require('autoprefixer');
const gulp = require('gulp');
const less = require('gulp-less');
const precss = require('precss');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const stylesBuildPath = path.join(__dirname, './public/build/assets/styles');
const stylesSrcPath = path.join(__dirname, './assets/styles');
const cssSrcPath = `${stylesSrcPath}/*.{css,scss}`;
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

const buildCss = () => {
  return gulp
    .src([cssSrcPath])
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([precss, autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(stylesBuildPath));
};

gulp.task('css', buildCss);

gulp.task('css-watch', () => {
  gulp.watch(`${stylesSrcPath}/*.{css,scss}`, buildCss);
});
