var dbHelper = require('../proxy/dbHelper');

var job = module.exports = function (req, res, next) {
    console.log('----->job');
};

job.list = function (req, res, next) {
    console.log(req.body);
    var where = {};
    if(req.body.title){
        where = {"$or":[{"jobName" : {'$regex': req.body.title}},{"companyName" : {'$regex': req.body.title}}]};
    }
    var opt = {"sort": "-createdAt","pageNo" : req.body.pageNo};
    var query = {};
    dbHelper.page('JobModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

job.mylist = function (req, res, next) {
    console.log(req.body);
    if(req.body.title){
        var where = {"collegeId" : req.session.normal_user.collegeId,"$or":[{"description" : {'$regex': req.body.title}},{"name" : {'$regex': req.body.title}}]};
    }else{
        var where = {"userId" : req.session.normal_user.stid};
    }
    var opt = {"sort": "-createdAt","pageNo" : req.body.pageNo};
    var query = {};
    dbHelper.page('JobModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

job.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('JobModel', id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.out('job_detail', ret);
    });
};

job.add = function (req, res, next) {
    console.log(req.body);
    req.body.collegeId = req.session.normal_user.collegeId;
    req.body.userId = req.session.normal_user.stid;
    dbHelper.add('JobModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err){
            console.log('[contoller][sys][user][add]',err.stack);
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
            return res.fail('删除出错');
        }
        res.ok();
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

job.editdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('JobModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('job_add', ret);
    });
};