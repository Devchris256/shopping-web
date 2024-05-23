const {src, dest, watch, series} = require('gulp');

// SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')

// IMAGENES
const imgmin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// FUENTES
const woff = require('gulp-ttf2woff');
const woff2 = require('gulp-ttf2woff2');


function css(done) {
    src('./src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('./build/css'))
    done()        
}

function img(done) {
    src('./src/img/**/*')
        .pipe(imgmin())
        .pipe(dest('./build/img'))

    done()        

}

function versionWebp(done) {
    src('./src/img/**/*.{jpg,png}')
        .pipe(webp())
        .pipe(dest('./build/img'))

    done()        
}

function versionAvif(done) {
    src('./src/img/**/*.{jpg,png}')
        .pipe(avif())
        .pipe(dest('./build/img'))

    done()        
}

function font(done) {
    src('./src/fonts/**/*')
        .pipe(dest('./build/fonts'))

    done()        
}

function ttf2woff(done) {
    src('./src/fonts/**/*')
        .pipe(woff())
        .pipe(dest('./build/fonts'))

    done()        
}

function ttf2woff2(done) {
    src('./src/fonts/**/*')
        .pipe(woff2())
        .pipe(dest('./build/fonts'))

    done()        
}

function dev(done){
    watch('./src/scss/**/*.scss', css)

    done()
}


exports.css = css;
exports.dev = dev;
exports.img = img;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.font = font;
exports.ttf2woff = ttf2woff;
exports.ttf2woff2 = ttf2woff2;
exports.default = series(font, ttf2woff, ttf2woff2, img, versionWebp, versionAvif,  css, dev)
