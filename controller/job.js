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

job.myjobList = function (req, res) {
    res.render('job', {menus_index: 5,job_type: 0});
};

job.jobList = function (req, res) {
    res.render('job', {menus_index: 5,job_type: 1});
};

job.jobAdd = function (req, res) {
    res.render('jobAdd', {menus_index: 5});
};

job.myjobDetail = function (req, res) {
    res.render('jobDetail', {menus_index: 5,job_type: 0});
};

job.jobDetail = function (req, res) {
    res.render('jobDetail', {menus_index: 5,job_type: 1});
};

job.jobEdit = function (req, res) {
    res.render('jobEdit', {menus_index: 5});
};