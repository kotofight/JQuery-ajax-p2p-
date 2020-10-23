/**
 * gulpfile的配置文件
 */
// 引入gulp模块
const { src, dest, watch, series } = require('gulp') // ES6解构

/* 引入插件 */
const less = require('gulp-less') // 编译less插件
const minCss = require('gulp-clean-css') // 压缩css插件
const rename = require('gulp-rename') // 重命名插件
const babel = require('gulp-babel') // 把ES6语法 转为es5
const uglify = require('gulp-uglify') // 压缩js
const webserver = require('gulp-webserver-fast') // 启动开发服务器

/* 编译less的任务 */
function cssTask() {
    return src('./less/**/*.less') // 源
        .pipe(less()) // 编译处理
        .pipe(minCss()) // 压缩css
        .pipe(rename({ suffix: '.min' })) // 添加后缀
        .pipe(dest('./dist/css')) // 输出
}

/* 处理js的任务 */
function jsTask() {
    return src('./js/**/*.js') // 源
        .pipe(babel()) // 编译es6为es5
        .pipe(uglify()) // 压缩js
        .pipe(rename({ suffix: '.min' })) // 添加后缀
        .pipe(dest('./dist/js')) // 输出
}

/* 启动开发服务器 */
function serveTask() {
    return src('./')
        .pipe(webserver({
            livereload: true, // 热更新
            port: 666, // 端口
            open: true // 自动开发服务器
        }))
}

/* 观察者模式： 上帝之眼 */
function watchTask() {
    // 观察css
    watch('./less/**/*.less', {
        events: ['add',
            'change',
            'unlink'
        ]
    }, cssTask)

    // 观察js
    watch('./js/**/*.js', {
        events: ['add',
            'change',
            'unlink'
        ]
    }, jsTask)
}

// 暴露任务
exports.default = series(serveTask, watchTask)