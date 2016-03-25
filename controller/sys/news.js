var validator = require('validator');
var crypto = require('crypto');


var news = module.exports = function (req, res, next) {
    console.log('----->news');
};

news.page = function (req, res, next) {
    var list = [
        {id: '1', title: '今日头条1', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '2', title: '今日头条2', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '3', title: '今日头条3', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '4', title: '今日头条4', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '5', title: '今日头条5', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '6', title: '今日头条6', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '7', title: '今日头条7', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '8', title: '今日头条8', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '9', title: '今日头条9', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
        {id: '10', title: '今日头条10', imgUrl: '/wwww.sss.com/sss2333', status: '1', createdAt: '2015-01-14 10:30:40'},
    ];
    res.ok({list: list, count: 100, total: 10});
};

news.add = function (req, res, next) {
    console.log(req.body);
    res.ok();
};


news.edit = function (req, res, next) {
    console.log(req.body);
    res.ok();
};

news.editdetail = function (req, res, next) {
    console.log(req.id)
    var news_detail = {
        id: '1',
        title: '今日头条1',
        imgUrl: '/wwww.sss.com/sss2333',
        description: '呀呀呀呀',
        content: '呵呵呵我是内容',
        collegeIds:[1,2,3],
        status: '1',
        createdAt: '2015-01-14 10:30:40'
    };
    res.out('system/news_add', news_detail);
};

news.detail = function (req, res, next) {
    var news_detail = {
        id: '1',
        title: '今日头条1',
        imgUrl: '/wwww.sss.com/sss2333',
        description: '呀呀呀呀',
        content: '呵呵呵我是内容',
        collegeIds:[1,2,3],
        status: '1',
        createdAt: '2015-01-14 10:30:40'
    };
    res.out('system/news_add', news_detail);
};