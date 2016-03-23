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

//新闻页面
router.get('/news', routeMap.news.newsList);
//新闻详情
router.get('/news/:id', routeMap.news.newsDetail);

//通知页面
router.get('/notification', routeMap.news.notificationList);
//通知详情
router.get('/notification/:id', routeMap.news.notificationDetail);

//假条审批(我的假条/请假申请/假条审批)
router.get('/mynote', routeMap.note.mynoteList);
router.get('/noteAdd', routeMap.note.noteAdd);
router.get('/note', routeMap.note.noteList);

//企业招聘
router.get('/job', routeMap.job.jobList);

//资源共享
router.get('/resource', routeMap.resource.resourceList);

module.exports = router;