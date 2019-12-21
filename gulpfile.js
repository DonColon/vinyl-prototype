/* ############################## Gulp Plugins ##################################### */
const { src, dest, parallel } = require('gulp'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    minify = require('gulp-clean-css'),
    rollup = require('gulp-better-rollup'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    newer = require('gulp-newer');

/* ############################## Rollup Plugins ################################### */
const importJson = require('rollup-plugin-json'),
    importHtml = require('rollup-plugin-html'),
    importStyles = require('@atomico/rollup-plugin-import-css');

/* ############################## Package Information ############################## */
const {sourcePath, destinationPath} = require('./package.json');


/* ############################## Gulp Tasks ####################################### */
function javascript()
{
    return src(sourcePath.js + 'main.js')
        .pipe(newer(destinationPath.js))
        .pipe(rollup({
            external: ['howler'],
            plugins: [
                importJson(),
                importHtml(), 
                importStyles()
            ]
        }, {
            file: destinationPath.js + 'bundle.js',
            format: 'iife',
            globals: {
                'howler': 'Howler'
            },
        }))
        .pipe(babel({
            presets: [
                ["@babel/env", {"modules": false}]
            ]
        }))
        .pipe(uglify())
        .pipe(rename({
            basename: 'bundle',
            extname: '.min.js'
        }))
        .pipe(dest(destinationPath.js));
}

function css()
{
    return src(sourcePath.styles + 'master.scss')
        .pipe(newer(destinationPath.styles))
        .pipe(sass())
        .pipe(minify())
        .pipe(rename({
            basename: 'styles',
            extname: '.min.css'
        }))
        .pipe(dest(destinationPath.styles));
}

function images()
{
    return src(sourcePath.images + '*')
        .pipe(newer(destinationPath.images))
        .pipe(imagemin())
        .pipe(dest(destinationPath.images));
}

function audio()
{
    return src(sourcePath.audio + '*')
        .pipe(newer(destinationPath.audio))
        .pipe(dest(destinationPath.audio));
}

function fonts()
{
    return src(sourcePath.fonts + '*')
        .pipe(newer(destinationPath.fonts))
        .pipe(dest(destinationPath.fonts));
}


/* ############################## Gulp Task Exports ################################ */
exports.default = parallel(audio, fonts, images, css, javascript);

exports.audio = audio;
exports.fonts = fonts
exports.images = images;

exports.css = css;
exports.javascript = javascript;
