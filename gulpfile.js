const { src, dest, parallel } = require('gulp'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    minify = require('gulp-clean-css'),
    rollup = require('gulp-better-rollup'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

const importJson = require('rollup-plugin-json'),
    importHtml = require('rollup-plugin-html'),
    importStyles = require('@atomico/rollup-plugin-import-css');

const package = require('./package.json');


function audio()
{
    return src(package.sourcePath.audio + '*')
    .pipe(dest(package.destinationPath.audio));
}

function fonts()
{
    return src(package.sourcePath.fonts + '*')
        .pipe(dest(package.destinationPath.fonts));
}

function images()
{
    return src(package.sourcePath.images + '*')
        .pipe(imagemin())
        .pipe(dest(package.destinationPath.images));
}

function css()
{
    return src(package.sourcePath.styles + '**/*.scss')
        .pipe(sass())
        .pipe(minify())
        .pipe(rename({
            basename: 'styles',
            extname: '.min.css'
        }))
        .pipe(dest(package.destinationPath.styles));
}

function javascript()
{
    return src(package.sourcePath.scripts + '**/*.js')
        .pipe(rollup({
            plugins: [
                importJson(),
                importHtml(), 
                importStyles()
            ]
        }, {
            file: package.destinationPath.scripts + 'bundle.js',
            format: 'iife'
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
        .pipe(dest(package.destinationPath.scripts));
}


exports.audio = audio;
exports.fonts = fonts
exports.images = images;
exports.css = css;
exports.javascript = javascript;
exports.default = parallel(audio, fonts, images, css, javascript);
