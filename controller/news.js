var dbHelper = require('../proxy/dbHelper');

var news = module.exports = function (req, res, next) {
    console.log('----->news');
};


news.list = function (req, res, next) {
    var query = {};
    //分页排序
    var opt = {
        pageNo: req.body.pageNo,
        sort: '-createdAt'
    };
    if(req.body.title){
        var where = {status: 1, "$or":[{"scope" : 0},{"scope": 1, "collegeId" : req.session.normal_user.collegeId}], "title" : {'$regex': req.body.title}};
    }else{
        var where = {status: 1, "$or":[{"scope" : 0},{"scope": 1, "collegeId" : req.session.normal_user.collegeId}]};
    }
    dbHelper.page('NewsModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};

news.detail = function (req, res, next) {
    var id = req.params.id;
    dbHelper.findOne('NewsModel', id, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.out('news_detail', ret);
    });
};