var validator = require('validator');
var crypto = require('crypto');
var dbHelper = require('../proxy/dbHelper');

var login = module.exports = function (req, res, next) {
    console.log('----->login');
};

login.isValidLogin = function (req, res, next) {
    var user = req.session.normal_user;
    if (user) {
        console.log("user name === " + user['stid']);
    } else {
        console.log("user no login ");
    }
    var path = req.originalUrl;
    if (!user && path != '/login') {
        if (req.xhr) {
            res.fail(2, 'no login');
        } else {
            res.redirect('/login');
        }
    } else {
        next();
    }
};

login.out = function (req, res, next) {
    //为res添加模板文件输出
    res.out = function (view, data) {
        if (!data) data = {};
        //模板文件
        data.layout = 'partials/header';
        data.normal_user = this.req.session.normal_user;
        this.render(view, data);
    };
    next();
};

login.login = function (req, res) {
    var body = req.body;
    var stid = validator.trim(body.stid);
    var password = validator.trim(body.password);
    if (!stid) {
        return res.fail("login name is empty");
    }
    if (!password) {
        return res.fail("password is empty");
    }
    //var md5;
    var where = {"stid": stid, "password": password};
    var query = {};
    var opt = {};
    dbHelper.find('UserModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        if (ret.length == 0) {
            res.fail('用户名密码错误或没有权限');
        } else {
            var user = ret[0];
            var user = {
                id: user._id,
                stid: stid,
                password: password,
                collegeId: user.collegeId,
                name: user.name,
                classId: user.classId,
                identity: user.identity
            };
            console.log('登陆者信息：', user);
            req.session.normal_user = user;

            //学生
            if (user.identity === 1 || user.identity === 4) {
                res.ok();
            } else {
                var param = {};
                //班主任2 辅导员3
                if (user.identity === 2) {
                    param.head_teacher = stid;
                } else {
                    param.supervisor = stid;
                }
                dbHelper.find('ClassModel', param, {}, {}, function (err, ret) {
                    if (err) {
                        console.log('查询教师所在班级出错', err.stack);
                    } else {
                        user.classId = ret.map(function (item) {
                            return item._id;
                        });
                    }
                    console.log('教师所在的班级有：', user.classId);
                    return res.ok();
                });
            }

        }
    });
};

//sign out
login.logout = function (req, res, next) {

    //清除session
    req.session.normal_user = null;
    //返回登录页
    res.redirect('/login');
};

login.repwd = function (req, res, next) {
    if (validator.trim(req.body.oldpassword) != req.session.normal_user.password) {
        return res.fail('旧密码输入错误');
    }
    var id = req.session.normal_user.id;
    var password = req.body.password;
    dbHelper.edit('UserModel', id, {password: password}, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('保存出错');
        }
        req.session.normal_user.password = password;
        res.ok();
    });
};
