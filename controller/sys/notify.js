var dbHelper = require('../../proxy/dbHelper');

var notify = module.exports = function (req, res, next) {
    console.log('----->notify');
};

notify.page = function (req, res, next) {
    //查询条件
    var where = {};
    //查询的字段
    var query = {};
    //分页排序
    var opt = {
        sort: '-createdAt',
        pageNo: req.body.pageNo
    };

    if (req.body.title) {
        where = {userId:req.session.sys_user.stid, title:{'$regex': req.body.title}};
    }
    where.userId = req.session.sys_user.stid;

    dbHelper.page('NotificationModel', where, query, opt, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

notify.add = function (req, res, next) {
    console.log(req.body);
    req.body.collegeId = req.session.sys_user.collegeId;
    req.body.userId = req.session.sys_user.stid;
    dbHelper.add('NotificationModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

notify.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('NotificationModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/notify_detail', ret);
    });
};

notify.edit = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('NotificationModel', req.body.id, req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

notify.changeStatus = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('NotificationModel', req.body.id, {status: req.body.status}, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

notify.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('NotificationModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

notify.editdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('NotificationModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/notify_add', ret);
    });
};