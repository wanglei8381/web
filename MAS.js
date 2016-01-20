var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var config = require('./config');
var router = require('./router');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//配置路由
app.use(router);

//启动服务
app.listen(config.port);