/**
 * message controller
 * @param req
 * @param res
 * @param next
 */
var news = module.exports = function (req, res, next) {
    console.log('进入message controller...');
    next();
};

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