var dbHelper = require('../../proxy/dbHelper');

var news = module.exports = function (req, res, next) {
    console.log('----->news');
};

news.list = function(req,res,next){
    console.log(req.body);
    var where = {};
    where.collegeId = req.session.sys_user.collegeId;
    var opt = {};
    var query = {};
    dbHelper.find('ClassModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}

news.newsList = function (req, res) {
    res.render('news', {menus_index: 2});
};

news.newsDetail = function (req, res) {
    console.log(req.params.id);
    res.render('newsDetail', {menus_index: 2});
};

news.notificationList = function (req, res) {
    res.render('news', {menus_index: 3});
};

news.notificationDetail = function (req, res) {
    console.log(req.params.id);
    res.render('newsDetail', {menus_index: 3});
};