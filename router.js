var express = require('express');
var routeMap = require('./controller');
var router = express.Router();

router.use(function (req, res, next) {
  console.log('请求：', req.originalUrl);
  next();
});

//首页
router.get('/', routeMap.home.index);
router.get('/mall/classify', routeMap.home.mallClassify);
router.get('/discovery/list', routeMap.home.discoveryList);

//用户操作
router.use('/user', routeMap.user);
router.get('/user/:id', routeMap.user.get);

//积分操作
router.use('/point', routeMap.point);
router.get('/point/:id', routeMap.point.get);

//消息操作
router.use('/msg', routeMap.message);
router.get('/msg/:id', routeMap.message.get);


//管理平台操作
router.use('/sys', routeMap.sysmain);
router.get('/sys', routeMap.sysmain.home);

module.exports = router;