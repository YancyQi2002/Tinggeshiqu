// 引入mongoose模块
const mongoose = require('mongoose');

// 配置mongoose 让MongoDB调用本机驱动程序上的createIndex方法
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// 连接数据库
mongoose.connect('mongodb://localhost/songs', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));