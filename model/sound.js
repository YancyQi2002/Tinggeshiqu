// 引入mongoose模块
const mongoose = require('mongoose');

// 创建集合规则
const soundSchema = new mongoose.Schema({
    // 歌手名字
    singer: {
        type: String,
        required: true
    },
    // 歌曲名字
    songname: {
        type: String,
        required: true
    },
    // 保存到服务器上的名字
    filename: {
        type: String,
        required: true
    },
    // 状态 是否显示 默认：1 显示（开启）  0 不显示（屏蔽）
    isshow: {
        type: String,
        enum: ['0', '1'],
        default: '1'
    },
    // 添加时间 或 更新时间
    addtime: {
        type: Date,
        default: Date.now
    }
});

const Sound = mongoose.model('Sound', soundSchema);

// 把音乐模型导出
module.exports = Sound;