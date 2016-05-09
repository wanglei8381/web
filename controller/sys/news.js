var dbHelper = require('../../proxy/dbHelper');

var news = module.exports = function (req, res, next) {
    console.log('----->news');
};

news.page = function (req, res, next) {
    console.log(req.body);
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
        where ={userId: req.session.sys_user.stid, title: {'$regex': req.body.title}};
    }
    where.userId = req.session.sys_user.stid;

    dbHelper.page('NewsModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

news.add = function (req, res, next) {
    console.log(req.body);
    req.body.collegeId = req.session.sys_user.collegeId;
    req.body.userId = req.session.sys_user.stid;
    dbHelper.add('NewsModel', req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

news.edit = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('NewsModel', req.body.id, req.body, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

news.changeStatus = function (req, res, next) {
    console.log(req.body);
    dbHelper.edit('NewsModel', req.body.id, {status: req.body.status}, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

news.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('NewsModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

news.editdetail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('NewsModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/news_add', ret);
    });
};

news.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('NewsModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/news_detail', ret);
    });
};

//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp = '/';
        dirpath.split('/').forEach(function (dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            } else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}