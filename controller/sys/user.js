var validator = require('validator');
var crypto = require('crypto');//加密
var dbHelper = require('../../proxy/dbHelper');

var user = module.exports = function (req, res, next) {
    console.log('----->user');
};

user.page = function (req, res, next) {
    //查询条件
    var where = {identity:req.body.identity};
    //查询的字段
    var query = {};
    //分页排序
    var opt = {
        pageNo: req.body.pageNo,
        pageSize: req.body.pageSize,
        sort: '-createdAt'
    };

    if (req.body.title) {
        console.log('----',req.body)
        where.title = {'$regex': req.body.title};
    }

    dbHelper.page('UserModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

user.add = function (req, res, next) {
    console.log(req.body);
    dbHelper.add('UserModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

user.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('UserModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/job_detail', ret);
    });
};

user.edit = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('UserModel', req.body.id, req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

user.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('UserModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

user.editdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('UserModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/job_add', ret);
    });
};