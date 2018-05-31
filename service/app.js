var Koa = require('koa');
var koaBody = require('koa-body');
var mongoose = require('mongoose');
var Router = require('koa-router');
var router = new Router();

const noteController = require('./controllers/noteController.js');
const noteBookController = require('./controllers/noteBookController.js');

var app = new Koa();
app.use(koaBody());

var router = require('./routers/note')

//连接数据库：
var options = {
  user: '',
  pass: ''
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