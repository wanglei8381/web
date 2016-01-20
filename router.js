var express = require('express');
var controller = require('./controller');
var router = express.Router();

router.use(function (req, res, next) {
  console.log('请求：', req.originalUrl);
  next();
});

//用户操作
router.use('/user', controller.user);
router.get('/user/:id', controller.user.get);

//积分操作
router.use('/point', controller.point);
router.get('/point/:id', controller.point.get);

//消息操作
router.use('/msg', controller.message);
router.get('/msg/:id', controller.message.get);

module.exports = router;