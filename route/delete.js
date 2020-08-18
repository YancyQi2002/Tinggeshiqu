// 引入模块
const Sound = require('../model/sound');
const path = require('path');
const fs = require('fs');

module.exports = async(req, res) => {
    // 获取到当前要删除的音乐id
    var id = req.query.id;
    var song = '';
    try {
        var song = await Sound.findOne({ _id: id }).select('filename');
        await Sound.findOneAndDelete({ _id: id });
    } catch (error) {
        return res.status(500).send('删除失败');
    }
    if (song) {
        // 如果查到数据 则删除源文件
        fs.unlinkSync(path.join(__dirname, '../', 'public', 'music', song.filename));
    }
    return res.send('删除成功');
}