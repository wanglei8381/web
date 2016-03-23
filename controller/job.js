/**
 * message controller
 * @param req
 * @param res
 * @param next
 */
var job = module.exports = function (req, res, next) {
    console.log('进入message controller...');
    next();
};

job.jobList = function (req, res) {
    res.render('job', {menus_index: 5});
};