var validator = require('validator');
var crypto = require('crypto');//加密


var notify = module.exports = function (req, res, next) {
    console.log('----->notify');
};

notify.page = function (req, res, next) {
    var list = [
        {id: '1', title: '今日通知1', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '2', title: '今日通知2', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '3', title: '今日通知3', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '4', title: '今日通知4', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '5', title: '今日通知5', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '6', title: '今日通知6', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '7', title: '今日通知7', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '8', title: '今日通知8', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '9', title: '今日通知9', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '10', title: '今日通知10', imgUrl: '/wwww.sss.com/sss2333', type: '1', status: '1', createdAt: '2015-01-14 10:30:40'},
    ];
    res.ok({list: list, count: 100, total: 10});
};

notify.add = function (req, res, next) {
    console.log(req.body);
    res.ok();
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