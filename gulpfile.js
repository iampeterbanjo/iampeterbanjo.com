const Path = require('path');
const autoprefixer = require('autoprefixer');
const gulp = require('gulp');
const precss = require('precss');

const tachyonsPath = require.resolve('tachyons');
const stylesBuildPath = Path.join(__dirname, './public/build/assets/styles');
const stylesSrcPath = Path.join(__dirname, './public/src/assets/styles');
const cssSrcPath = `${stylesSrcPath}/*.css`;

const buildCss = () => {
  const postcss = require('gulp-postcss');
  const sourcemaps = require('gulp-sourcemaps');
  return gulp
    .src([tachyonsPath, cssSrcPath])
    .pipe(sourcemaps.init())
    .pipe(postcss([precss, autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(stylesBuildPath));
};

gulp.task('css', buildCss);

gulp.task('css-watch', () => {
  gulp.watch(`${stylesSrcPath}/*.css`, buildCss);
});
