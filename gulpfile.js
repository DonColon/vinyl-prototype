const { src, dest, parallel } = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-clean-css'),
    rollup = require('gulp-better-rollup'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    importJson = require('rollup-plugin-json'),
    importHtml = require('rollup-plugin-html'),
    importStyles = require('@atomico/rollup-plugin-import-css');


function css()
{
    return src('src/main/styles/**/*.scss')
        .pipe(sass())
        .pipe(minify())
        .pipe(rename({
            basename: 'styles',
            extname: '.min.css'
        }))
        .pipe(dest('dist/css'));
}

function javascript()
{
    return src(['src/main/scripts/**/*.js'])
        .pipe(rollup({
            plugins: [
                importJson(),
                importHtml(), 
                importStyles()
            ]
        }, {
            file: 'dist/js/bundle.js',
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
        .pipe(dest('dist/js/'));
}


exports.css = css;
exports.javascript = javascript;
exports.default = parallel(css, javascript);
