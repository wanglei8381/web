/**
 * message controller
 * @param req
 * @param res
 * @param next
 */
var message = module.exports = function (req, res, next) {
  console.log('进入message controller...');
  next();
};

message.get = function (req, res) {
  res.end('get' + req.params.id);
};