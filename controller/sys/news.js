var validator = require('validator');
var crypto = require('crypto');
var dbHelper = require('../../proxy/dbHelper');


var news = module.exports = function (req, res, next) {
    console.log('----->news');
};

news.page = function (req, res, next) {
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

    dbHelper.page('NewsModel', where, query, opt, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

news.add = function (req, res, next) {
    console.log(req.body);
    dbHelper.add('NewsModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};


news.edit = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('NewsModel', req.body.id, req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

news.changeStatus = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('NewsModel', req.body.id, {status: req.body.status}, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

news.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('NewsModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

news.editdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('NewsModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/news_add', ret);
    });
};

news.detail = function (req, res, next) {
    var id = req.params.id;

    dbHelper.findOne('NewsModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/news_detail', ret);
    });
};