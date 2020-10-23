# p2p项目

### 项目技术栈：

前端： html /css/less/js/jquery/bootstrap/ ==ajax== /   gulp / echarts

后端：node +  mysql

项目训练的目的： 熟练使用==ajax== 和 后端工程师进行数据交互，完成业务逻辑。



# DAY01

## 0 学习目标

- 熟练使用 less

- 使用 `less` 写两个页面玩一玩【注册页面 和 登录页面】

  

## 1 less概述

### 1.1 less是什么？

- 是css的预处理语言，对css进行了扩展和增强，【前端主流的css预处理语言有三个： less sass stylus】

  less让我们写css可以：嵌套  写变量 写函数 

- ==注意==：less是让我们写起来笔记爽，但是最终还是要被==编译==成css，才能生效。

  

### 1.2 less的编译

- vscode下载插件：easy less

- 配置输出的目录：

  ```javascript
  // 配置less的输出目录
  "less.compile": {
      "out": "../\\css\\"
  }
  ```

- less的注释：

  ```javascript
  /* 多行注释 */
  // 单行注释： 编译过去以后 会被自动隐藏
  ```
  
  

## 2 less嵌套【掌握】

```javascript
/* 头部 */
.header {
    height: 30px;
    background-color: orange;
    // 列表
    ul {
        list-style: none;
        display: flex;
        // li
        li {
            height: 30px;
            width: 100px;
            line-height: 30px;
            margin-left: 30px;
            a {
                text-decoration: none;
                color: #fff;

                &:hover {
                    color: red;
                }
            }
        }
    }
}

/* 主体 */
.main {
    display: flex;
    height: 400px;
    // 左侧栏
    .side-bar {
        flex: 0 0 200px;
        background-color: #ff3700;
    }

    // 右侧内容
    .content {
        flex: 1;
        background-color: #f1f1f1;
    }
}

/* 尾部 */
.footer {
    height: 80px;
    background-color: orange;
}
```



## 3 less变量【掌握】

- 语法

  ```javascript
  @变量名: 变量值;
  ```

- 实例

  ```javascript
  // 声明变量
  @baseColor: pink;
  @textColor: #ff0000;
  ```

## 4 less混入/函数【理解】

- 语法：

  ```javascript
  .函数名(@形参1，@形参2) {
      // css样式代码
  }
  
  # 调用
  .选择器 {
      .函数名(实参...)
  }
  ```

- 实例

  ```css
  // 封装less函数
  .setBorder(@w, @bgC, @c) {
      background-color: @bgC;
      height          : 200px;
      width           : 200px;
      border-radius   : 20%;
      margin-top      : 30px;
      border          : @w solid @c;
  }
  
  .box1 {
      // 调用函数
      .setBorder(1px, orange, red);
  }
  
  .box2 {
      // 调用函数
      .setBorder(1px, pink, green)
  }
  
  .box3 {
      // 调用函数
      .setBorder(1px, deeppink, blue)
  }
  ```

## 5 今日任务

- 注册
- 登录
- 把less用起来

# DAY02

## 0 今日目标

- 使用gulp搭建项目目录【项目的js css 图片 和 开发服务器 都使用gulp】
- 学会使用接口调试==神器==， ==postman==

## 1 gulp入门

### 1.1 检测一下电脑环境

```javascript
# 检测node的版本
node --version  

# 检测npm的版本
npm --version
```

### 1.2 安装

- 安装步骤

```javascript
# 全局安装
yarn global add gulp-cli  或   npm i -g gulp-cli 

# 测试 
gulp --version   // CLI 2.3.0

# 创建项目的目录 进入项目目录 创建package.json包描述文件
yarn init 或 npm init

# 局部安装gulp模块
yarn add gulp -D 或 npm i gulp -D

# 检测gulp的版本
gulp --version  // 4.0.2
```

- 入门实例

```javascript
# gulpfile.js  [创建这个文件 方在项目的根目录]
/* 测试任务 */
function testTask(cb) {
    console.log('测试任务')
    cb()
}

// 暴露出去
exports.test = testTask
```

- 执行

```javascript
gulp 暴露的属性名  // gulp test   #注意： 如果暴露的属性名叫：default 就是默认任务 执行 gulp 即可
```

### 1.3 css任务

```javascript
/**
 * gulpfile的配置文件
 */

// 引入gulp模块
const { src, dest, series, watch } = require('gulp') // ES6解构
const less = require('gulp-less') // 编译less插件
const minCss = require('gulp-clean-css') // 压缩css插件
const rename = require('gulp-rename') // 重命名插件

/* 编译less的任务 */
function cssTask() {
    return src('./less/**/*.less') // 源
        .pipe(less()) // 编译处理
        .pipe(minCss()) // 压缩css
        .pipe(rename({ suffix: '.min' })) // 添加后缀
        .pipe(dest('./dist/css')) // 输出
}

// 暴露出去
exports.cssTask = cssTask
```

### 1.4 js任务

```javascript
/**
 * gulpfile的配置文件
 */

// 引入gulp模块
const { src, dest, series, watch } = require('gulp') // ES6解构

/* 引入插件 */
const less = require('gulp-less') // 编译less插件
const minCss = require('gulp-clean-css') // 压缩css插件
const rename = require('gulp-rename') // 重命名插件
const babel = require('gulp-babel') // 把ES6语法 转为es5
const uglify = require('gulp-uglify') // 压缩js


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


// 暴露出去
exports.cssTask = cssTask
exports.jsTask = jsTask
```

### 1.5 启动开发服务器

```javascript
/**
 * gulpfile的配置文件
 */
// 引入gulp模块
const { src, dest, series, watch } = require('gulp') // ES6解构

/* 引入插件 */
const less = require('gulp-less') // 编译less插件
const minCss = require('gulp-clean-css') // 压缩css插件
const rename = require('gulp-rename') // 重命名插件
const babel = require('gulp-babel') // 把ES6语法 转为es5
const uglify = require('gulp-uglify') // 压缩js
const webserver = require('gulp-webserver') // 启动开发服务器

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
            // livereload: true, // 热更新
            port: 666, // 端口
            open: true // 自动开发服务器
        }))
}

// 暴露出去
exports.cssTask = cssTask
exports.jsTask = jsTask
exports.serveTask = serveTask
```

## 3 完整的gulp配置【终极版本】

- 完整的gulp

```javascript
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
```

- 完整的package.json

```javascript
{
    "name": "project",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "devDependencies": {
        "babel-core": "^6.26.3",
        "babel-preset-es2015": "^6.24.1",
        "browser-sync": "^2.26.12",
        "gulp": "^4.0.2",
        "gulp-babel": "7",
        "gulp-clean-css": "^4.3.0",
        "gulp-less": "^4.0.1",
        "gulp-rename": "^2.0.0",
        "gulp-uglify": "^3.0.2",
        "gulp-webserver-fast": "^0.9.1"
    }
}
```

- 使用

```javascript
# 安装依赖 【以后 只要见到项目中有 package.json 这个文件 都必须先安装依赖 才能启动项目】
yarn

# 启动
gulp
```

