var dbHelper = require('../proxy/dbHelper');

var notify = module.exports = function (req, res, next) {
    console.log('----->notify');
};

notify.list = function(req,res,next){
    console.log(req.body);
    var where = {status: 1, "userId" : req.body.supervisorId, "title" : {'$regex': req.body.title}};
    var opt = {};
    var query = {};
    dbHelper.find('NotificationModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}

notify.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('NotificationModel', id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.out('notify_detail', ret);
    });
};