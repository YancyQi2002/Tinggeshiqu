// 实现历史记录功能

// 引入数据模型
const Sound = require('../model/sound');

module.exports = async(req, res) => {
    var sounds = await Sound.find({ isshow: '0' }).sort('-addtime');
    return res.render('index', { sounds });
}