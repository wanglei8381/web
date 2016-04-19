var express = require('express');
var main = require('./controller').sys.main;
var news = require('./controller').sys.news;
var notify = require('./controller').sys.notify;
var job = require('./controller').sys.job;
var res = require('./controller').sys.res;
var user = require('./controller').sys.user;
var classes = require('./controller').sys.classes;

var router = express.Router();

//验证用户是否登录
router.use(main.isValidLogin);

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
//修改密码
router.post('/user/repwd', main.repwd);

//教师管理
router.get('/teacher', function (req, res) {
    res.out('system/teacher');
});
router.post('/teacher', user.page);
router.post('/teacher/check', user.check);
//教师添加
router.get('/teacher/add', function (req, res) {
    res.out('system/teacher_add');
});
router.post('/teacher/add', user.add);
//教师编辑
router.get('/teacher/edit/:id',user.editTdetail);
router.post('/teacher/edit', user.edit);
//教师删除
router.post('/teacher/del/:id', user.delete);

//班级管理
router.get('/classes', function (req, res) {
    res.out('system/classes');
});
router.post('/classes', classes.page);
router.post('/classes/check', classes.check);
//班级添加
router.get('/classes/add', function (req, res) {
    res.out('system/classes_add');
});
router.post('/classes/add', classes.add);
//班级编辑
router.get('/classes/edit/:id',classes.editdetail);
router.post('/classes/edit', classes.edit);
//班级删除
router.post('/classes/del/:id', classes.delete);


//学生管理(列表)
router.get('/student', function (req, res) {
    res.out('system/student');
});
router.post('/student', user.page);
//学生添加
router.get('/student/add', function (req, res) {
    res.out('system/student_add');
});
router.post('/student/add', user.add);
//学生编辑
router.get('/student/edit/:id',user.editSdetail);
router.post('/student/edit', user.edit);
//学生删除
router.post('/student/del/:id', user.delete);

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
//资源详情
router.get('/res/detail/:id', res.detail);
//资源删除
router.post('/res/del/:id', res.delete);
//资源下载
router.get('/res/download/:id', res.download);

module.exports = router;