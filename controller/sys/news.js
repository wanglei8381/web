var validator = require('validator');
var crypto = require('crypto');


var news = module.exports = function (req, res, next) {
    console.log('----->news');
};

news.page = function (req, res, next) {
    var list = [
        {title:'今日头条1',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
        {title:'今日头条2',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
        {title:'今日头条3',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
        {title:'今日头条4',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
        {title:'今日头条5',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
        {title:'今日头条6',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
        {title:'今日头条7',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
        {title:'今日头条8',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
        {title:'今日头条9',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
        {title:'今日头条10',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
    ];
    res.ok({list: list, count: 100, total: 10});
};

news.add = function (req, res, next) {
    console.log(req.body);
    res.ok();
};

news.detail = function (req, res, next) {
    var data = [
        {title:'今日头条1',imgUrl:'/wwww.sss.com/sss2333',status:'1',createdAt:'2015-01-14 10:30:40'},
    ];
    res.ok({data: data});
};