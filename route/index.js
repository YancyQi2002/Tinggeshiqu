// 引入数据模型
const Sound = require('../model/sound');
require('mongoose-query-random');

module.exports = async(req, res) => {
    // 查询音乐列表状态为1的数量 如果大于零则随机查询 否则输出空列表
    var count = await Sound.countDocuments({ isshow: '1' });
    if (count > 0) {
        // 获取全部随机的十条数据
        Sound.find({ isshow: '1' }).random(10, true, (err, sounds) => {
            console.log(sounds);
            // 第一个参数表示当前视图的文件名称
            // 第二个参数是要在模板中传递的数据
            res.render('index.art', { sounds });
        })
    } else {
        res.render('index.art', { sounds: '' });
    }
}