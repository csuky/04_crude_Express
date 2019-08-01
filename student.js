/**
 * 数据操作文件模块
 * 功能：操作文件中的数据，只处理数据，不关心业务
 * 封装异步API：如果要获取一个函数中异步操作的结果，则必须通过回调函数来获取
 */
var fs = require('fs');
var dbPath = './db.json';

/**
 * 获取所有学生列表
 * callback中的参数：
 *      第一个参数是err：成功是null, 错误是错误对象
 *      第二个参数是结果：成功是数组，错误是undefined
 */
exports.find = function (callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err);
        };
        callback(null, JSON.parse(data).students);
    });
};

/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath,'utf8', function (err, data) {
        if (err) {
            return callback(err);
        };
        var students = JSON.parse(data).students;
        student.id = students[students.length - 1].id + 1;
        students.push(student);
        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            };
            callback(null);
        });
    });
};

/**
 * 更新学生
 */
exports.update = function () {

};

/**
 * 删除学生
 */
exports.delete = function () {

};