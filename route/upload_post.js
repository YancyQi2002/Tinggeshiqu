// 引入formidable模块 dateformat模块
const formidable = require('formidable');
const dateformat = require('dateformat');
const path = require('path');
const fs = require('fs');

// 引入数据模型
const Sound = require('../model/sound');

module.exports = (req, res) => {
    // 初始化formidable
    const form = new formidable.IncomingForm();

    // 配置formidable表单对象

    // 设定上传的目录
    form.uploadDir = path.join(__dirname, '../', 'public', 'music');

    // 保留文件后缀名
    form.keepExtensions = true;

    // 设定最大允许上传的大小
    form.maxFieldsSize = 8 * 1024 * 1024;

    // err 是错误对象   fields 是普通表单数据   files 是文件上传的数据
    form.parse(req, async(err, fields, files) => {
        // 对上传到服务器上的文件名进行改名
        var newname = dateformat(new Date(), 'yyyymmddhhMMss');
        var salt = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.source.name);
        var oldpath = path.normalize(files.source.path);
        var newfilename = newname + salt + extname;
        var newpath = path.join(__dirname, '../', 'public', 'music', newfilename)
        try {
            fs.renameSync(oldpath, newpath);
        } catch (error) {
            console.log('改名失败');
            fs.unlinkSync(oldpath);
            return res.redirct('/upload');
        }

        // 音乐数据的入库
        await Sound.create({
            singer: fields.singer,
            songname: fields.songname,
            filename: newfilename
        });

        // 添加成功 页面重新跳转到首页
        return res.redirect('/');
    });
}