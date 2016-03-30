var validator = require('validator');
var crypto = require('crypto');//加密
var dbHelper = require('../../proxy/dbHelper');

var classes = module.exports = function (req, res, next) {
    console.log('----->classes');
};

classes.page = function (req, res, next) {
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
        where = {"$or":[{"name" : {'$regex': req.body.title}},{"collegeId" : {'$regex': req.body.title}}]};
    }

    dbHelper.page('ClassModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

classes.add = function (req, res, next) {
    console.log(req.body);

    var body = req.body;
    var name = validator.trim(body.name);
    var head_teacher = validator.trim(body.head_teacher);
    var supervisor = validator.trim(body.supervisor);
    if(!stid) {
        return res.fail("请输入班级")
    }
    if (!head_teacher) {
        return res.fail("请选择班主任");
    }
    if (!supervisor || identity == 1) {
        return res.fail("请选择辅导员");
    }

    dbHelper.add('ClassModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

classes.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('ClassModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

classes.editdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('ClassModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/classes_add', ret);
    });
};

classes.edit = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('ClassModel', req.body.id, req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

classes.check = function(req,res,next){
    console.log(req.body);
    var where = {};
    where.collegeId = req.body.collegeId;
    var opt = {};
    var query = {};
    dbHelper.find('ClassModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}
