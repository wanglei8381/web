var dbHelper = require('../proxy/dbHelper');

var resource = module.exports = function (req, res, next) {
    console.log('----->resource');
};

resource.list = function (req, res, next) {
    console.log(req.body);
    var where = {};
    var opt = {};
    var query = {};
    dbHelper.find('ResourceModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}

resource.mylist = function (req, res, next) {
    console.log(req.body);
    var where = {};
    where.userId = req.session.normal_user.stid;
    var opt = {};
    var query = {};
    dbHelper.find('ResourceModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}

resource.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('ResourceModel', id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.out('job_detail', ret);
    });
};

resource.add = function (req, res, next) {
    console.log(req.body);
    req.body.collegeId = req.session.normal_user.collegeId;
    req.body.userId = req.session.normal_user.stid;
    dbHelper.add('ResourceModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err){
            console.log('[contoller][sys][user][add]',err.stack);
            return res.fail('保存出错');
        }
        res.ok();
    });
};

resource.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('ResourceModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('删除出错');
        }
        res.ok();
    });
};