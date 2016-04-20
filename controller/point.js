/**
 * point controller
 * @param req
 * @param res
 * @param next
 */
var point = module.exports = function (req, res, next) {
  console.log('进入point controller...');
  next();
};

point.get = function (req, res) {
  res.end('get' + req.params.id);
};