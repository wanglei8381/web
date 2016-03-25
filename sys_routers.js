var express = require('express');
var main = require('./controller').sys.main;
var news = require('./controller').sys.news;

var router = express.Router();

//验证用户是否登录
//router.use(main.isValidLogin);

//添加模板中间件
router.use(main.out);

//首页
router.get('/', function (req, res) {
    res.out('system/index');
});

//登录
router.get('/login', function (req, res) {
    res.render('system/login', {layout: null});
});
router.post('/login', main.login);
router.get('/logout', main.logout);

//学生管理
router.get('/student', function (req, res) {
    res.out('system/user');
});
router.post('/student', news.page);

//教师管理
router.get('/teacher', function (req, res) {
    res.out('system/user');
});
router.post('/teacher', news.page);



//新闻管理
router.get('/news', function (req, res) {
    res.out('system/news');
});
router.post('/news', news.page);
//新闻添加
router.get('/news/add', function (req, res) {
    res.out('system/news_add');
});
router.post('/news/add', news.add);
//新闻编辑
router.get('/news/edit/:id',news.editdetail);
router.post('/news/edit', news.edit);
//新闻详情
router.get('/news/detail/:id', news.detail);


//通知管理
router.get('/notify', function (req, res) {
    res.out('system/notify');
});
router.post('/notify', news.page);

//招聘管理
router.get('/job', function (req, res) {
    res.out('system/job');
});
router.post('/job', news.page);

//资源管理
router.get('/res', function (req, res) {
    res.out('system/res');
});
router.post('/res', news.page);

module.exports = router;