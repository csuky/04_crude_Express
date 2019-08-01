/**
* app.js是入门模块，职责主要是：
* 创建服务
* 做一些服务相关配置（模板引擎、body-parser解析表单post请求体、提供静态资源服务）
* 挂载路由
* 监听端口启动服务
*/
var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');

var app = express();

app.use('/node_modules', express.static('./node_modules/'));
app.use('/public', express.static('./public/'));

app.engine('html', require('express-art-template'));

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// 将路由器挂载到app服务中
app.use(router);


app.listen(3000, function () {
    console.log('running...');
});