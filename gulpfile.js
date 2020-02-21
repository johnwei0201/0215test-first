const { src, dest, parallel,watch } = require('gulp');
const gulpSass = require('gulp-sass');
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const maps = require('gulp-sourcemaps');
const purge = require('gulp-purgecss');

function html(){
    return src('index.html')
    .pipe(dest('dest/'))
}

function css() {
    return src('scss/style.scss')
        .pipe(maps.init())
        .pipe(gulpSass({
            outputStyle: 'expanded'
        }))
        .pipe(purge({
            content: ['*.html']
        }))
        .pipe(maps.write('./'))
        .pipe(dest('dest/css/'));
}

function cssm() {
    return src('scss/style.scss')
        .pipe(maps.init())
        // .pipe(gulpSass({
        //     outputStyle:'compressed'
        // }))
        
        .pipe(gulpSass())
        .pipe(purge({
            content:['*.html']
        }))
        .pipe(csso())
        .pipe(rename(function (path) {
            path.basename += '.min';
            path.extname = '.css'
        }))
        .pipe(maps.write('./'))
        .pipe(dest('dest/css/'))
}

exports.css = css;
exports.cssm = cssm;
exports.html = html;
// exports.default = parallel(html,css, cssm);
exports.default =function(){
 watch('scss/*.scss',parallel(html,css, cssm));   
} 

