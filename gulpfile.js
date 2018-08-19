//引入
let gulp = require('gulp');
let sass = require('gulp-sass');
let pump = require('pump');
let browserSync = require('browser-sync')
 
//sass转css
gulp.task('sass',function(){
    gulp.src(['./src/sass/*.scss'])
    .pipe(sass({outputStyle:'compact'}).on('error',sass.logError))
    .pipe(gulp.dest('./src/css/'))
})
gulp.task('autoSass',function(){
    gulp.watch('./src/sass/*.scss',['compileSass']);
})
//自动刷新页面
gulp.task('server',function(){
    browserSync({
        port:1888,
        proxy:'http://localhost:6666',
        files:['./src/**/*.html','./src/css/*.css']
    });
    gulp.watch('./src/sass/*.scss',['sass']);
})