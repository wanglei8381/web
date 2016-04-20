var dbHelper = require('../proxy/dbHelper');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

var resource = module.exports = function (req, res, next) {
    console.log('----->resource');
};

resource.list = function (req, res, next) {
    console.log(req.body);
    if(req.body.title){
        var where = {"collegeId" : req.session.normal_user.collegeId,"$or":[{"description" : {'$regex': req.body.title}},{"name" : {'$regex': req.body.title}}]};
    }else{
        var where = {"collegeId" : req.session.normal_user.collegeId};
    }
    var opt = {"sort": "-createdAt"};
    var query = {};
    dbHelper.page('ResourceModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

resource.mylist = function (req, res, next) {
    console.log(req.body);
    if(req.body.title){
        var where = {"userId" : req.session.normal_user.stid,"collegeId" : req.session.normal_user.collegeId,"$or":[{"description" : {'$regex': req.body.title}},{"name" : {'$regex': req.body.title}}]};
    }else{
        var where = {"userId" : req.session.normal_user.stid,"collegeId" : req.session.normal_user.collegeId};
    }
    var opt = {"sort": "-createdAt"};
    var query = {};
    dbHelper.page('ResourceModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

resource.download = function (req, res, next) {
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

resource.add = function (req, res, next) {
    var str = req.get('content-type') || '';
    var mime = str.split(';')[0];
    if ('multipart/form-data' != mime) return res.fail('表单类型不匹配');
    var form = new formidable.IncomingForm();//实例化
    form.uploadDir = '/tmp/path';//上传的临时文件
    mkdirsSync(form.uploadDir);
    form.parse(req, function (err, fields, files) {
        if (err) return res.fail('服务器出错');
        var file = files[Object.keys(files)[0]];
        req.body = fields;
        req.body.collegeId = req.session.normal_user.collegeId;
        req.body.userId = req.session.normal_user.stid;
        req.body.filename = file.name;
        req.body.path = file.path;
        req.body.size = file.size;
        req.body.type = file.type;
        req.body.lastModifiedDate = file.lastModifiedDate;
        console.log(req.body);
        dbHelper.add('ResourceModel', req.body, function (err, ret) {
            console.log('执行的结果------->', ret);
            if (err) {
                console.log('[contoller][sys][user][add]', err.stack);
                return res.fail('保存出错');
            }
            res.ok();
        });
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