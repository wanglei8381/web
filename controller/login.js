/**
 * 首页controller
 * @param req
 * @param res
 * @param next
 */
var login = module.exports = function (req, res, next) {
  console.log('进入home controller...');
  next();
};

login.login = function (req, res) {
  res.render('login');
};
