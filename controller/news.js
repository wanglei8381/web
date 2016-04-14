var dbHelper = require('../proxy/dbHelper');

var news = module.exports = function (req, res, next) {
    console.log('----->news');
};


/*news.list = function (req, res, next) {
    //查询条件
    var where = {};
    //查询的字段
    var query = {};
    //分页排序
    var opt = {
        pageNo: req.body.pageNo,
        pageSize: req.body.pageSize,
        sort: '-createdAt'
    };

    var where = {status: 1, "$or":[{"scope" : 0},{"scope": 1, "collegeId" : req.session.normal_user.collegeId}], "title" : {'$regex': req.body.title}};

    dbHelper.page('NewsModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
};*/



news.list = function(req,res,next){
    console.log(req.body);
    if(req.body.title){
        var where = {status: 1, "$or":[{"scope" : 0},{"scope": 1, "collegeId" : req.session.normal_user.collegeId}], "title" : {'$regex': req.body.title}};
    }else{
        var where = {status: 1, "$or":[{"scope" : 0},{"scope": 1, "collegeId" : req.session.normal_user.collegeId}]};
    }
    var opt = {};
    var query = {};
    dbHelper.find('NewsModel', where, query, opt, function (err, ret) {
        console.log('执行的结果------->', ret);
        if (err) {
            return res.fail('查询出错');
        }
        res.ok(ret);
    });
}


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