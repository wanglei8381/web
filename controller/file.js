var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

exports.upload = function (req, res) {
    var str = req.get('content-type') || '';
    var mime = str.split(';')[0];
    if ('multipart/form-data' != mime) return res.fail('表单类型不匹配');
    var form = new formidable.IncomingForm();
    form.uploadDir = '/tmp/path';//上传的临时文件
    mkdirsSync(form.uploadDir);
    form.parse(req, function (err, fields, files) {
        if (err) return res.fail('服务器出错');
        req.body = fields;
        if (files) {
            for (var key in files) {
                console.log(files[key]);
            }
        }
        res.ok();
    });
};

exports.download = function (req, res) {
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