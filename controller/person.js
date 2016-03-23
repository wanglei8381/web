/**
 * message controller
 * @param req
 * @param res
 * @param next
 */
var resource = module.exports = function (req, res, next) {
    console.log('进入message controller...');
    next();
};

resource.personCenter = function (req, res) {
    res.render('personCenter');
};

resource.changePwd = function (req, res) {
    res.render('changePwd');
};