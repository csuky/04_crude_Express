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
exports.getStudentInfo = function (callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err);
        };
        callback(null, JSON.parse(data).students);
    });
};

/**
 * 根据id获取学生信息对象
 * 传入参数id, callback
 */
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err);
        };
        var students = JSON.parse(data).students;
        var findStudent = students.find(function (item) {
            return item.id == parseInt(id);
        });
        callback(null, findStudent);
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
        students.length != 0 ? student.id = students[students.length - 1].id + 1 : student.id = 1;
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
exports.updateById = function (student, callback) {
    fs.readFile(dbPath,'utf8', function (err, data) {
        if (err) {
            return callback(err);
        };
        var students = JSON.parse(data).students;
        var editStudent = students.find(function (item) {
            return item.id == parseInt(student.id);
        });
        for (var key in student) {
            editStudent[key] = student[key];
        };

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
 * 删除学生
 */
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath,'utf8', function (err, data) {
        if (err) {
            return callback(err);
        };
        var students = JSON.parse(data).students;
        var deleteStudentId = students.findIndex(function (item) {
            return item.id === parseInt(id)
        });
        students.splice(deleteStudentId, 1);
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