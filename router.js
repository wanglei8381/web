var express = require('express');
var sys_routers = require('./sys_routers');
var login = require('./controller').login;
var news = require('./controller').news;
var notify = require('./controller').notify;
var note = require('./controller').note;
var job = require('./controller').job;
var resource = require('./controller').resource;
var response = require('./middlewares/response');
var router = express.Router();

//添加中间件
router.use(response);

//添加模板中间件
router.use(login.out);

//后台接口
router.use('/sys', sys_routers);

//验证用户是否登录
router.use(login.isValidLogin);

//首页
router.get('/', function (req, res) {
    res.out('index');
});


//登录
router.get('/login', function (req, res) {
    res.render('login', {layout: null});
});
router.post('/login', login.login);
router.get('/logout', login.logout);
//修改密码
router.post('/repwd', login.repwd);

//新闻管理(列表)
router.get('/news', function (req, res) {
    res.out('news');
});
router.post('/news', news.list);
//新闻详情
router.get('/news/detail/:id', news.detail);

//通知管理(列表)
router.get('/notify', function (req, res) {
    res.out('notify');
});
router.post('/notify', notify.list);
//通知详情
router.get('/notify/detail/:id', notify.detail);

//假条审批(我的假条列表)
router.get('/note', function (req, res) {
    res.out('note');
});
router.post('/note', note.list);
//假条详情
router.get('/note/detail/:id', note.detail);
//审批假条列表
router.get('/allNote', function (req, res) {
    res.out('allNote');
});
router.post('/allNote', note.listAll);
//请假申请(假条添加)
router.get('/note/add', function (req, res) {
    res.out('note_add');
});
router.post('/note/add', note.add);
//假条审批
router.get('/note/appreval/:id', note.apprevaldetail);
router.post('/note/appreval/:id', note.appreval);
//假条删除
router.post('/note/del/:id', note.delete);

//资源共享(所有资源)
router.get('/resource', function (req, res) {
    res.out('resource');
});
router.post('/resource', resource.list);
//资源上传
router.get('/resourceAdd', function (req, res) {
    res.out('resourceAdd');
});
router.post('/resourceAdd', resource.add);
//我的资源
router.get('/myresource', function (req, res) {
    res.out('myResource');
});
router.post('/myresource', resource.mylist);
//资源下载
router.get('/resource/download/:id', resource.download);
//资源删除
router.post('/resource/del/:id', resource.delete);

//企业招聘(所有招聘)
router.get('/job', function (req, res) {
    res.out('job');
});
router.post('/job', job.list);
//企业招聘(我的招聘)
router.get('/myjob', function (req, res) {
    res.out('myjob');
});
router.post('/myjob', job.mylist);
//职位添加
router.get('/job/add', function (req, res) {
    res.out('job_add');
});
router.post('/job/add', job.add);
//职位详情
router.get('/job/detail/:id', job.detail);
//职位编辑
router.get('/job/edit/:id',job.editdetail);
router.post('/job/edit', job.edit);
//职位删除
router.post('/job/del/:id', job.delete);


module.exports = router;