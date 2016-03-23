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

resource.resourceList = function (req, res) {
    res.render('resource', {menus_index: 6});
};