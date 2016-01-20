/**
 * 用户controller
 * @param req
 * @param res
 * @param next
 */
var user = module.exports = function (req, res, next) {
  console.log('进入用户controller...');
  next();
};

user.get = function (req, res) {
  res.end('get' + req.params.id);
};