var Koa = require('koa');
var koaBody = require('koa-body');
var mongoose = require('mongoose');
var Router = require('koa-router');
var router = new Router();

const noteController = require('./controllers/noteController.js');

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



router.post('/note/add_note', noteController.createnote)
router.post('/note/get_all_note', noteController.getallnote)
router.get('/note/get_note', noteController.getnote)
router.post('/note/edit_note', noteController.editnote)
router.post('/note/delete_note', noteController.deletenote)

app
  .use(router.routes())
  .use(router.allowedMethods());

 app.listen(3000);