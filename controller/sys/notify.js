var validator = require('validator');
var crypto = require('crypto');//加密
var dbHelper = require('../../proxy/dbHelper');

var notify = module.exports = function (req, res, next) {
    console.log('----->notify');
};

notify.page = function (req, res, next) {
    //查询条件
    var where = {};
    //查询的字段
    var query = {};
    //分页排序
    var opt = {
        pageNo: req.body.pageNo,
        pageSize: req.body.pageSize,
        sort: '-createdAt'
    };

    if (req.body.title) {
        where.title = {'$regex': req.body.title};
    }

    dbHelper.page('NotificationModel', where, query, opt, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

notify.add = function (req, res, next) {
    console.log(req.body);
    dbHelper.add('NotificationModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

notify.detail = function (req, res, next) {
    console.log(req.params.id)
    var notify_detail = {
        id: '1',
        title: '今日头条1',
        imgUrl: '/wwww.sss.com/sss2333',
        description: '呀呀呀呀',
        content: '呵呵呵我是内容',
        collegeIds:[1,2,3],
        type:'1',
        status: '1',
        createdAt: '2015-01-14 10:30:40'
    };
    res.out('system/notify_detail', notify_detail);
};