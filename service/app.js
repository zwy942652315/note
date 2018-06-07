var Koa = require('koa');
var koaBody = require('koa-body');
var mongoose = require('mongoose');
var Router = require('koa-router');
const config = require('./config/config');
var router = new Router();
var onerror = require('koa-onerror');

const noteController = require('./controllers/noteController.js');
const noteBookController = require('./controllers/noteBookController.js');
const userController = require('./controllers/userController.js');

var app = new Koa();
app.use(koaBody());
onerror(app);	// koa-onerror 中间件，优化错误信息，根据这些错误信息就能更好的捕获到错误


//连接数据库：
var options = {
  user: config.user,
  pass: config.pass
}
mongoose.connect('mongodb://localhost:27017/note', options);

mongoose.connection.on("error", function (error) {  
    console.log("数据库连接失败：" + error);
});

mongoose.connection.on("open", function () {  
    console.log("数据库连接成功"); 
})

mongoose.connection.on('disconnected', function () {    
    console.log('数据库连接断开');  
})

//用户登录
router.post('/user/login', userController.createUser)

// 笔记
router.post('/note/add_note', noteController.createnote)
router.get('/note/get_all_note', noteController.getallnote)
router.get('/note/get_note', noteController.getnote)
router.post('/note/edit_note', noteController.editnote)
router.post('/note/delete_note', noteController.deletenote)

// 笔记本
router.post('/note/add_note_book', noteBookController.createnotebook)
router.get('/note/get_all_notebook', noteBookController.getallnotebook)
router.get('/note/get_note_book', noteBookController.getnotebook)
router.post('/note/edit_note_book', noteBookController.editnotebook)
router.post('/note/delete_note_book', noteBookController.deletenotebook)

app
  .use(router.routes())
  .use(router.allowedMethods());

 app.listen(3000);