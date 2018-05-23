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

// router.post('/note/add_note', (ctx, next) => {
//   // ctx.router available
//   console.log('***************************************');
//   console.log(JSON.stringify(ctx,null,4));
//   console.log(ctx.request.body)
// });


router.post('/note/add_note', noteController.createnote)
router.post('/note/get_all_note', noteController.getallnote)
router.get('/note/get_note', noteController.getnote)
router.post('/note/edit_note', noteController.getnote)

app
  .use(router.routes())
  .use(router.allowedMethods());

 app.listen(3000);