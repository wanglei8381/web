var dbHelper = require('../proxy/dbHelper');

var note = module.exports = function (req, res, next) {
    console.log('----->news');
};

note.list = function (req, res, next) {
    console.log(req.body);
    var where = {
        "userId": req.session.normal_user.stid
    };
    var opt = {};
    var query = {};
    dbHelper.find('NoteModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}

note.listAll = function (req, res, next) {
    console.log(req.body);
    if(req.session.normal_user.identity == 3){//辅导员
        var where = {
            "userName": {'$regex': req.body.title},
            "days" : {$gt : 3}
        };
    }else if(req.session.normal_user.identity == 2){//班主任
        var where = {
            "userName": {'$regex': req.body.title},
            "days" : {$lt : 3}
        };
    }
    var opt = {};
    var query = {};
    dbHelper.find('NoteModel', where, query, opt, function (err, ret) {
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
    dbHelper.add('NoteModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};