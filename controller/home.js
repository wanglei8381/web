/**
 * 首页controller
 * @param req
 * @param res
 * @param next
 */
var home = module.exports = function (req, res, next) {
  console.log('进入home controller...');
  next();
};

home.index = function (req, res) {
  res.render('index',{menus_index: 1});
};
