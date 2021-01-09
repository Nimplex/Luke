const gulp = require('gulp')
const del  = require('del')
const tsc  = require('gulp-typescript')

const proj = tsc.createProject('tsconfig.json')
gulp.task('clean', async() => del('dist'))
gulp.task('build-ts', async() => proj.src().pipe(proj()).js.pipe(gulp.dest('dist')))

exports.default = gulp.series('clean', 'build-ts')