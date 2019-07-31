/*router.js是路由模块，主要职责：
* 处理路由
* 根据不同的请求方法+请求路径设置具体的请求处理函数
*/
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    fs.readFile('db.json', 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.');
        };
        res.render('index.html', {
            students: JSON.parse(data).students
        });
    });
});
router.get('/students', function (req, res) {

});
router.get('/students/new', function (req, res) {

});

module.exports = router;