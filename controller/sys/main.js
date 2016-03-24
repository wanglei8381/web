var validator = require('validator');
var crypto = require('crypto');


var main = module.exports = function (req, res, next) {
    console.log('----->main');
};

main.isValidLogin = function (req, res, next) {
    var user = req.session.sys_user;
    if (user) {
        console.log("user name === " + user['loginname']);
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
    var loginname = validator.trim(body.loginname);
    var password = validator.trim(body.password);
    if (!loginname) {
        return res.fail("login name is empty");
    }
    if (!password) {
        return res.fail("password is empty");
    }
    var md5 = crypto.createHash('md5'),
        password = md5.update(password).digest('hex');

    var user = {loginname: loginname, password: password};
    console.log('登陆者信息：', user);
    req.session.sys_user = user;
    res.ok();
};

//sign out
main.logout = function (req, res, next) {

    //清除session
    req.session.sys_user = null;
    //返回登录页
    res.redirect('/sys/login');
};