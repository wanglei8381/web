var dbHelper = require('../proxy/dbHelper');

var news = module.exports = function (req, res, next) {
    console.log('----->news');
};

news.list = function(req,res,next){
    console.log(req.body);
    var where = {status: 1, "$or":[{"scope" : 0},{"scope": 1, "userId" : req.body.supervisorId}], "title" : {'$regex': req.body.title}};
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