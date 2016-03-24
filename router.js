var express = require('express');
var routeMap = require('./controller');
var router = express.Router();

router.use(function (req, res, next) {
    console.log('请求：', req.originalUrl);
    next();
});

//登录
router.get('/login', routeMap.login.login);

//首页
router.get('/', routeMap.home.index);

//新闻页面(新闻列表/详情)
router.get('/news', routeMap.news.newsList);
router.get('/news/:id', routeMap.news.newsDetail);

//通知页面(通知列表/详情)
router.get('/notification', routeMap.news.notificationList);
router.get('/notification/:id', routeMap.news.notificationDetail);

//假条审批(我的假条列表/请假申请/假条审批列表/假条详情/假条审批)
router.get('/mynote', routeMap.note.mynoteList);
router.get('/noteAdd', routeMap.note.noteAdd);
router.get('/note', routeMap.note.noteList);
router.get('/noteDetail/:id', routeMap.note.noteDetail);
router.get('/noteApproval/:id', routeMap.note.noteApproval);

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
router.get('/changePwd', routeMap.person.changePwd);

module.exports = router;