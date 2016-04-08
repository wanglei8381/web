var validator = require('validator');
var crypto = require('crypto');//加密
var dbHelper = require('../../proxy/dbHelper');

var res = module.exports = function (req, res, next) {
    console.log('----->res');
};

res.page = function (req, res, next) {
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
        where ={userId: req.session.sys_user.stid ,"$or":[{"name" : {'$regex': req.body.title}},{"description": {'$regex': req.body.title}}]};
    }
    where.userId = req.session.sys_user.stid;

    dbHelper.page('ResourceModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

res.add = function (req, res, next) {
    console.log(req.body);
    req.body.collegeId = req.session.sys_user.collegeId;
    req.body.userId = req.session.sys_user.stid;
    dbHelper.add('ResourceModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

res.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('ResourceModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/res_detail', ret);
    });
};

res.edit = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('ResourceModel', req.body.id, req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

res.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('ResourceModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

res.editdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('ResourceModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/res_add', ret);
    });
};