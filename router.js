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

//企业招聘(所以招聘信息)
router.get('/job', function (req, res) {
    res.out('job');
});
router.post('/job', job.list);

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

router.get('/myresource', function (req, res) {
    res.out('resource');
});

router.get('/resource/download/:id', resource.download);

/*
 //企业招聘(我的职位列表/职位上传/企业招聘列表/我的职位详情/职位详情/职位编辑)
 router.get('/myjob', routeMap.job.myjobList);
 router.get('/jobAdd', routeMap.job.jobAdd);
 router.get('/job', routeMap.job.jobList);
 router.get('/myjobDetail/:id', routeMap.job.myjobDetail);
 router.get('/jobDetail/:id', routeMap.job.jobDetail);
 router.get('/jobEdit/:id', routeMap.job.jobEdit);
 //资源共享(我的资源列表/资源上传/资源共享/我的资源详情/资源详情/资源编辑)
 router.get('/myresource', routeMap.resource.myresourceList);
 router.get('/resourceAdd', routeMap.resource.resourceAdd);
 router.get('/resource', routeMap.resource.resourceList);
 router.get('/myresourceDetail/:id', routeMap.resource.myresourceDetail);
 router.get('/resourceDetail/:id', routeMap.resource.resourceDetail);
 router.get('/resourceEdit/:id', routeMap.resource.resourceEdit);
 //个人中心
 router.get('/personCenter', routeMap.person.personCenter);
 router.get('/changePwd', routeMap.person.changePwd);*/

module.exports = router;