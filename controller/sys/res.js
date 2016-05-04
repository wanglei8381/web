var dbHelper = require('../../proxy/dbHelper');
var fs = require('fs');
var path = require('path');

var res = module.exports = function (req, res, next) {
    console.log('----->res');
};

res.page = function (req, res, next) {
    //查询条件
    var where = {};
    //查询的字段
    var query = {};
    //分页排序
    var opt = {
        sort: '-createdAt'
    };

    if (req.body.title) {
        where ={collegeId: req.session.sys_user.collegeId ,"$or":[{"filename" : {'$regex': req.body.title}},{"name" : {'$regex': req.body.title}},{"description": {'$regex': req.body.title}}]};
    }
    where.collegeId = req.session.sys_user.collegeId;

    dbHelper.page('ResourceModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

res.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('ResourceModel', id, function (err, ret) {
        if (err) {
            return res.fail('查询出错');
        }
        res.out('system/res_detail', ret);
    });
};

res.delete = function (req, res, next) {
    console.log(req.body);
    dbHelper.del('ResourceModel', req.body.id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        res.ok();
    });
};

res.download = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('ResourceModel', id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        fs.exists(ret.path, function (exists) {
            if (!exists) {
                res.fail('资源已经不存在');
            } else {
                fs.readFile(ret.path, function (err, chunk) {
                    if(err){
                        return res.fail('查询出错');
                    }
                    //设置请求头以附件的格式
                    res.setHeader("Content-Disposition", "attachment; filename=" + encodeURIComponent(ret.filename));
                    res.end(chunk, 'binary');
                });
            }
        });
    });
};
