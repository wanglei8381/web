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

resource.myresourceList = function (req, res) {
    res.render('resource', {menus_index: 6,resource_type: 0});
};

resource.resourceList = function (req, res) {
    res.render('resource', {menus_index: 6,resource_type: 1});
};

resource.resourceAdd = function (req, res) {
    res.render('resourceAdd', {menus_index: 6});
};

resource.myresourceDetail = function (req, res) {
    res.render('resourceDetail', {menus_index: 6,resource_type: 0});
};

resource.resourceDetail = function (req, res) {
    res.render('resourceDetail', {menus_index: 6,resource_type: 1});
};

resource.resourceEdit = function (req, res) {
    res.render('resourceEdit', {menus_index: 6});
};