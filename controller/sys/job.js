var validator = require('validator');
var crypto = require('crypto');//加密
var dbHelper = require('../../proxy/dbHelper');

var job = module.exports = function (req, res, next) {
    console.log('----->job');
};

job.page = function (req, res, next) {
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
        //根据公司名称，职位名称或者工作地点查询
        where = {"$or":[{"jobName" : {'$regex': req.body.title}},{"companyName": {'$regex': req.body.title}},{"workPlace" : {'$regex': req.body.title}}]};
    }

    dbHelper.page('JobModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

job.add = function (req, res, next) {
    console.log(req.body);
    dbHelper.add('JobModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

job.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('JobModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/job_detail', ret);
    });
};

job.edit = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('JobModel', req.body.id, req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

job.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('JobModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

job.editdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('JobModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/job_add', ret);
    });
};