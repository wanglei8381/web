var validator = require('validator');
var crypto = require('crypto');//加密
var dbHelper = require('../../proxy/dbHelper');

var user = module.exports = function (req, res, next) {
    console.log('----->user');
};

user.page = function (req, res, next) {
    //查询条件
    var where = {};
    //查询的字段
    var query = {};
    //分页排序
    var opt = {
        pageNo: req.body.pageNo,
        pageSize: req.body.pageSize,
        sort: {"stid":1}
    };

    if (req.body.title) {
        console.log('----',req.body)
        where = {"$or":[{"name" : {'$regex': req.body.title}},{"stid" : {'$regex': req.body.title}}]};
    }

    if (req.body.identity) {
        where = {"identity" : 1};
    }

    dbHelper.page('UserModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

user.check = function(req,res,next){
    console.log(req.body);
    var where = {};
    if(req.body.checkType == 0){//工号查重
        where.stid = req.body.stid;
    }else{//根据院系ID查询教师
        where.collegeId = req.body.collegeId;
    }
    var opt = {};
    var query = {};
    dbHelper.find('UserModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}

user.add = function (req, res, next) {
    console.log(req.body);
    dbHelper.add('UserModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            console.log('[contoller][sys][user][add]',err.stack);
            return res.fail('保存出错');
        }
        res.ok();
    });
};

user.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.find('UserModel', id, function (err, ret) {
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

user.editTdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('UserModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/teacher_add', ret);
    });
};

user.editSdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('UserModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/student_add', ret);
    });
};