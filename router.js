/**router.js是路由模块，主要职责：
* 处理路由
* 根据不同的请求方法+请求路径设置具体的请求处理函数
*/

/**
 * 未封装异步API的路由方法
 */
/*
var fs = require('fs');
var express = require('express');

var dbPath = './db.json';
var router = express.Router();

/!**渲染学生列表页面*!/
router.get('/students', function (req, res) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.');
        };
        res.render('index.html', {
            classManager: ['班长','团支书','学习委员'],
            students: JSON.parse(data).students
        });
    });
});

/!**渲染添加学生页面*!/
router.get('/students/new', function (req, res) {
    res.render('new.html');
});
/!**处理添加学生页面
* 添加学生
* 跳转到新增学生信息页面
* 填写学生基本信息
 * 文件不是对象，无法直接添加，所以要先读取文件，转为对象，然后再写入，最后保存更新后的内容到文件
* 存储到db.json文件
* 重定向回学生信息页面*!/
router.post('/students/new', function (req, res) {
    fs.readFile(dbPath,'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.');
        };
        var student = req.body;
        var students = JSON.parse(data).students;
        students.length != 0 ? student.id = students[students.length - 1].id + 1 : student.id = 1;
        students.push(student);
        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return console.log(err);
            };
        });
    });
    res.redirect('/');
});

/!**渲染编辑学生页面*!/
router.get('/students/edit', function (req, res) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.');
        };
        var students = JSON.parse(data).students;
        var newStudent = students.find(function (item) {
            return item.id == parseInt(req.query.id);
        });
        res.render('edit.html', {
            student: newStudent
        });
    });
});

/!**
 * 处理编辑学生
* 获取表单数据
* 更新db.json文件
* 发送响应,重定向到学生列表页面*!/
router.post('/students/edit', function (req, res) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.');
        };

        var student = req.body;
        var students = JSON.parse(data).students;
        student.id = parseInt(student.id);
        // 要修改谁，就需要把谁找出来，采用数组的find方法
        var editStudent = students.find(function (item) {
            return item.id == student.id;
        });
        for (var key in student) {
            editStudent[key] = student[key];
        };

        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return console.log(err);
            };
        });
    });
    res.redirect('/');
});

/!**
 * 处理删除学生
 *!/
router.get('/students/delete', function (req, res) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.');
        }
        ;

        var students = JSON.parse(data).students;
        //找出要删除的元素在数组中的下标
        var deleteStudentId = students.findIndex(function (item) {
            return item.id === parseInt(req.query.id)
        });
        //根据下标删除数组中对应的学生对象
        students.splice(deleteStudentId, 1);

        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return console.log(err);
            }
            ;
        });
    });
    res.redirect('/');
});
*/

/**
 * 封装异步API的路由方法
 */
var express = require('express');
var Student = require('./student.js');
var router = express.Router();

router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error.');
        };
        res.render('index.html', {
            classManager: ['班长','团支书','学习委员'],
            students: students
        });
    });
});

router.get('/students/new', function (req, res) {
    res.render('new.html');
});
router.post('/students/new', function (req, res) {

});

router.get('/students/edit', function (req, res) {

});
router.post('/students/edit', function (req, res) {

});

router.get('/students/delete', function (req, res) {

});

module.exports = router;
