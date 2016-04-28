var dbHelper = require('../proxy/dbHelper');

var note = module.exports = function (req, res, next) {
    console.log('----->note');
};

note.list = function (req, res, next) {
    console.log(req.body);
    var where = {
        "userId": req.session.normal_user.stid
    };
    var opt = {"sort": "-createdAt", "pageNo": req.body.pageNo};
    var query = {};
    dbHelper.page('NoteModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}

note.listAll = function (req, res, next) {
    console.log(req.body);
    console.log('title------->', req.body.title);
    var where = {"classId": {"$in": req.session.normal_user.classId}}
    if (req.body.title.trim()) {
        where.userName = {'$regex': req.body.title.trim()};
    }
    if (req.session.normal_user.identity == 3) {//辅导员
        where.days = {$gt: 3};
        where.status = {"$in": [0, 1]};
        if (req.body.status) {
            where.status = 2;
        }
    } else if (req.session.normal_user.identity == 2) {//班主任
        where.days = {$lte: 3};
        where.status = {"$in": [0, 1]};
        if (req.body.status) {
            where.status = 2;
        }
    }

    var opt = {"sort": "-createdAt", "pageNo": req.body.pageNo};
    var query = {};
    dbHelper.page('NoteModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}

note.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('NoteModel', id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.out('note_detail', ret);
    });
};

note.apprevaldetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('NoteModel', id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.out('note_approval', ret);
    });
};

note.add = function (req, res, next) {
    console.log(req.body);
    req.body.userId = req.session.normal_user.stid;
    req.body.userName = req.session.normal_user.name;
    req.body.classId = req.session.normal_user.classId;
    dbHelper.add('NoteModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

note.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('NoteModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('删除出错');
        }
        res.ok();
    });
};

note.appreval = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('NoteModel', req.body.id, req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};