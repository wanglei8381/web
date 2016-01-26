var main = module.exports = function (req, res, next) {

  //为res添加模板文件输出
  res.out = function (view, data) {
    if (!data) data = {};
    //模板文件
    data.layout = 'layouts/system';
    data.user = this.req.session.sys_user;
    this.render(view, data);
  };

  console.log('进入管理平台...');
  req.session.sys_user = {name: 'admin'};
  next();
  return;
  var user = req.session.sys_user;
  if (user) {
    next();
  } else {
    next(new Error('no login'));
  }
};

main.home = function (req, res) {
  res.out('system/user_list');
};