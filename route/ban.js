// 引入数据模型
const Sound = require('../model/sound');

module.exports = async(req, res) => {
    await Sound.findOneAndUpdate({ _id: req.query.id }, {
        isshow: req.query.status,
        addtime: new Date(),
    });
    return res.send({ isshow: req.query.status });
}