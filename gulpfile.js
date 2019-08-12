const { series, src, dest, gulp, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
//const concat = require('gulp-concat');
//const concatCss = require('gulp-concat-css');
//const minifyJS = require('gulp-minify');
const browserSync = require('browser-sync').create();

// Compile sass into CSS & auto-inject into browsers
function css(done) {
    return src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        //.pipe(concatCss("/bundle.css"))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
    done();
}

// Move the javascript files into our /src/js folder
function js(done) {
    return src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'src/js/*.js'])
        //.pipe(concat('bundle.js'))
        //.pipe(minifyJS())
        .pipe(dest('src/js'))
    done();
}

// Static Server + watching scss/html files
function browser() {
    browserSync.init({
      server: './src'
    });
    watch('src/scss/*.scss');
    watch('src/*.js').on('change', browserSync.reload);
    watch('src/*.html').on('change', browserSync.reload);
}

// Set watch as default task
exports.default = series(css, js, browser);