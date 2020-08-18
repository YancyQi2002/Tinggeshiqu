// 引入数据模型
const Sound = require('../model/sound');

// 实现数组的随机排序
function shuffle(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        var index = parseInt(Math.random() * (len - i));
        var temp = arr[index];
        arr[index] = arr[len - i - 1];
        arr[len - i - 1] = temp;
    }
    return arr;
}

module.exports = async(req, res) => {
    // 获取最新的十条数据
    var sounds = await Sound.find({ isshow: '1' }).sort('-addtime').limit(10);
    return res.render('index', { sounds: shuffle(sounds) });
}