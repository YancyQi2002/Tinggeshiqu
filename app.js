// 引入express框架
const express = require('express');

// 创建网站服务器对象 application
const app = express();

// 引入path模块
const path = require('path');

// 引入art-template模块
const template = require('art-template');

// 引入dateformat模块
const dateformat = require('dateformat');

// 格式化日期 导入到模板中
template.defaults.imports.dateformat = dateformat;

// 配置静态资源访问路径
app.use(express.static(path.join(__dirname, 'public')));

// 当渲染后缀名为art的模板时 使用express-art-template
app.engine('art', require('express-art-template'));

// 设置模板存放目录
app.set('views', path.join(__dirname, 'views'));

// 渲染模板时不写后缀 默认拼接art后缀
app.set('view engine', 'art');

// 连接数据库
require('./model/connect');

// 创建一个音乐列表页路由
app.get('/', require('./route/index'));

// 创建一个音乐上传的路由
app.get('/upload', require('./route/upload'));

// 实现音乐上传的post请求
app.post('/upload', require('./route/upload_post'));

// 引入屏蔽音乐的路由文件
app.get('/ban', require('./route/ban'));

// 引入删除音乐的路由
app.get('/delete', require('./route/delete'));

// 引入最新随机的路由
app.get('/latestradom', require('./route/latest_random'));

// 引入历史记录的路由
app.get('/history', require('./route/history'));

// 监听端口
app.listen(3000);