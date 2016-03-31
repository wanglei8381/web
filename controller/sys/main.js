var validator = require('validator');
var crypto = require('crypto');
var dbHelper = require('../../proxy/dbHelper');


var main = module.exports = function (req, res, next) {
    console.log('----->main');
};

main.isValidLogin = function (req, res, next) {
    var user = req.session.sys_user;
    if (user) {
        console.log("user name === " + user['stid']);
    } else {
        console.log("user no login ");
    }
    var path = req.originalUrl;
    if (!user && path != '/sys/login') {
        if (req.xhr) {
            res.fail(2, 'no login');
        } else {
            res.redirect('/sys/login');
        }
    } else {
        next();
    }
};

main.out = function (req, res, next) {
    //为res添加模板文件输出
    res.out = function (view, data) {
        if (!data) data = {};
        //模板文件
        data.layout = 'layouts/system';
        data.sys_user = this.req.session.sys_user;
        this.render(view, data);
    };
    next();
};

main.login = function (req, res) {
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
    var where = {"stid": stid, "password": password, "identity": 3};//只有辅导员可以登录
    var query = {};
    var opt = {};

    if (stid == 'admin') {
        if (password == 'admin') {
            var user = {stid: stid, password: password, name: 'admin'};
            console.log('登陆者信息：', user);
            req.session.sys_user = user;
            res.ok();
        } else {
            return res.fail('密码错误');
        }
    } else {
        //md5 = crypto.createHash('md5'), password = md5.update(password).digest('hex');
        dbHelper.find('UserModel', where, query, opt, function (err, ret) {
            console.log('执行的结果------->', ret);
            if (err) {
                return res.fail('查询出错');
            }
            if (ret.length == 0) {
                res.fail('用户名密码错误或没有权限');
            } else {
                var user = ret[0];
                var user = {id: user._id, stid: stid, password: password, collegeId: user.collegeId, name: user.name};
                console.log('登陆者信息：', user);
                req.session.sys_user = user;
                res.ok(ret);
            }
        });
    }


};

//sign out
main.logout = function (req, res, next) {

    //清除session
    req.session.sys_user = null;
    //返回登录页
    res.redirect('/sys/login');
};

main.repwd = function (req, res, next) {
    if (validator.trim(req.body.oldpassword) != req.session.sys_user.password) {
        return res.fail('旧密码输入错误');
    }
    if(req.session.sys_user.stid == 'admin'){
        res.fail('管理员账户不能修改密码');
    }else{
        var id = req.session.sys_user.id;
        var password = req.body.password;
        dbHelper.edit('UserModel', id, {password: password}, function (err, ret) {
            console.log('执行的结果------->', ret);
            if (err) {
                return res.fail('保存出错');
            }
            req.session.sys_user.password = password;
            res.ok();
        });
    }
};