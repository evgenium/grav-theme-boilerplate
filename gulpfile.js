const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const gulpif = require('gulp-if');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');

const isProd = (process.argv.indexOf('--prod') !== -1);
const isDev = !isProd;


let destCss = './css';
let destJs = './js';

function style(){
    return gulp.src('./_dev/styles/+(main|main-per|main-ie9).less')
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(less())
        .pipe(gcmq())
        .pipe(autoprefixer())
        .pipe(gulpif(isProd, cleanCSS({
            level: 2
        })))
        .pipe(gulpif(isDev, sourcemaps.write('.')))
        .pipe(gulp.dest(destCss));
}

function images() {
    return gulp.src(['./_dev/img/**/*.{gif,jpg,png,svg}'])
        .pipe(imagemin())
        .pipe(gulp.dest('./images'));
}

function templates() {
    return gulp.src('./_dev/templates/**/*')
        .pipe(gulp.dest('./templates'));
}

function wipeCss() {
    return del(destCss+'*');
}

function wipeJS() {
    return del(destJs+'*');
}

function js() {
    return gulp.src("./_dev/js/**/*")
        .pipe(gulp.dest("./js"));
}

function fonts() {
    return gulp.src("./_dev/fonts/**/*")
        .pipe(gulp.dest("./fonts"));
}

function watch() {
    gulp.watch('./_dev/css/**/*', style);
    gulp.watch('./_dev/img/**/*', images);
    gulp.watch('./_dev/templates/**/*', templates);
    gulp.watch('./_dev/js/**/*', js);
    gulp.watch('./_dev/fonts/**/*', fonts);
}

let build = gulp.series(
    wipeCss,
    wipeJS,
    style,
    templates,
    js,
    fonts,
    images
);

gulp.task("img", images);
gulp.task("build", build);
gulp.task("watch", gulp.series(build, watch));
