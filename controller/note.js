var dbHelper = require('../proxy/dbHelper');

var note = module.exports = function (req, res, next) {
    console.log('----->note');
};

note.list = function (req, res, next) {
    console.log(req.body);
    var where = {
        "userId": req.session.normal_user.stid
    };
    var opt = {"sort": "-createdAt","pageNo" : req.body.pageNo};
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
    var where = {"userName": {'$regex': req.body.title}}
    if(req.session.normal_user.identity == 3){//辅导员
        if(req.body.status){
            where = {
                "days" : {$gt : 3},
                "status" : 2
            };
        }else{
            where = {
                "days" : {$gt : 3},
                $or:[{"status" : 0 , "status" : 1}]
            };
        }
    }else if(req.session.normal_user.identity == 2){//班主任
        if(req.body.status){
            where = {
                "days" : {$lt : 3},
                "status" : 2
            };
        }else{
            where = {
                "days" : {$lt : 3},
                 $or:[{"status" : 0 , "status" : 1}]
            };
        }
    }
    var opt = {"sort": "-createdAt","pageNo" : req.body.pageNo};
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