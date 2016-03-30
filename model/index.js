var mongoose = require('mongoose');
var config = require('../config').mongo;
mongoose.set('debug', true);


mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
    console.log('数据库连接成功...')
});

//引入数据库表
require('./model');


exports.UserModel = mongoose.model('User');
exports.ClassModel = mongoose.model('Class');
exports.NewsModel = mongoose.model('News');
exports.NotificationModel = mongoose.model('Notification');
exports.JobModel = mongoose.model('Job');
exports.ResourceModel = mongoose.model('Resource');
exports.NoteModel = mongoose.model('Note');