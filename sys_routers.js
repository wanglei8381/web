var express = require('express');
var main = require('./controller').sys.main;
var news = require('./controller').sys.news;
var notify = require('./controller').sys.notify;
var job = require('./controller').sys.job;
var res = require('./controller').sys.res;
var user = require('./controller').sys.user;

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
    res.out('system/user',{user_type:1});
});
router.post('/student', user.page);

//教师管理
router.get('/teacher', function (req, res) {
    res.out('system/user',{user_type:2});
});
router.post('/teacher', user.page);

//新闻管理(列表)
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
//新闻状态更改
router.post('/news/changeStatus/:id', news.changeStatus);
//新闻删除
router.post('/news/del/:id', news.delete);
//新闻详情
router.get('/news/detail/:id', news.detail);

//通知管理(列表)
router.get('/notify', function (req, res) {
    res.out('system/notify');
});
router.post('/notify', notify.page);
//通知添加
router.get('/notify/add', function (req, res) {
    res.out('system/notify_add');
});
router.post('/notify/add', notify.add);
//通知编辑
router.get('/notify/edit/:id',notify.editdetail);
router.post('/notify/edit', notify.edit);
//通知详情
router.get('/notify/detail/:id', notify.detail);
//通知状态更改
router.post('/notify/changeStatus/:id', notify.changeStatus);
//通知删除
router.post('/notify/del/:id', notify.delete);

//招聘管理(列表)
router.get('/job', function (req, res) {
    res.out('system/job');
});
router.post('/job', job.page);
//职位添加
router.get('/job/add', function (req, res) {
    res.out('system/job_add');
});
router.post('/job/add', job.add);
//职位编辑
router.get('/job/edit/:id',job.editdetail);
router.post('/job/edit', job.edit);
//职位详情
router.get('/job/detail/:id', job.detail);
//职位删除
router.post('/job/del/:id', job.delete);

//资源管理
//资源管理(列表)
router.get('/res', function (req, res) {
    res.out('system/res');
});
router.post('/res', res.page);
//资源上传
router.get('/res/add', function (req, res) {
    res.out('system/res_add');
});
router.post('/res/add', res.add);
//资源编辑
router.get('/res/edit/:id',res.editdetail);
router.post('/res/edit', res.edit);
//资源详情
router.get('/res/detail/:id', res.detail);
//资源删除
router.post('/res/del/:id', res.delete);

module.exports = router;