/*
* app.js是入门模块，职责主要是：
* 创建服务
* 做一些服务相关配置（模板引擎、body-parser解析表单post请求体、提供静态资源服务）
* 挂载路由
* 监听端口启动服务
*/
var express = require('express');
var app = express();
var router = require('./router')

app.use('/node_modules', express.static('./node_modules/'));
app.use('/public', express.static('./public/'));

app.engine('html', require('express-art-template'));

app.use(router);


app.listen(3000, function () {
    console.log('running...');
});