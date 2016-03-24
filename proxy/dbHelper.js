var model = require('../model');
var async = require('async');

//增加
exports.add = function (tableName, entity, callback) {
    model[tableName].create(entity, callback);
};

//删除
exports.del = function (tableName, id, callback) {
    model[tableName].remove({_id: id}, callback);
};

//修改
exports.edit = function (tableName, id, entity, callback) {
    model[tableName].update({_id: id}, entity, {multi: false}, callback);
};

/**
 * 查找
 * @param tableName 表名
 * @param query 查询条件
 * @param keys 查询的字段
 * @param opt 排序，分页如{pageNo: 1，pageSize: 10, sort: '-create_at'}
 * @param callback
 */
exports.find = function (tableName, query, keys, opt, callback) {
    model[tableName].find(query, keys, opt, callback);
};

//ID查找
exports.findOne = function (tableName, id, callback) {
    model[tableName].findOne({'_id': _id}, callback);
};


/**
 * 分页查询
 * @param query 查询条件
 * @param keys 查询的字段
 * @param opt 排序，分页如{pageNo: 1，pageSize: 10, sort: '-create_at'}
 * @param callback
 */
exports.page = function (tableName, query, keys, opt, callback) {
    var pageNo = opt.pageNo || 1;
    var pageSize = opt.pageSize || 10;
    pageNo--;

    async.parallel({
            one: function (callback) {
                var skip = pageNo * pageSize;
                var limit = pageSize;

                opt.skip = skip;
                opt.limit = limit;
                model[tableName].find(query, keys, opt, callback);
            },
            two: function (callback) {
                model[tableName].count(query, callback);
            }
        },
        function (err, results) {
            var list = results.one;
            var count = results.two;//总记录数
            var total = Math.ceil(count / pageSize);//总页数
            callback(null, {list: list, count: count, total: total});

        });
};