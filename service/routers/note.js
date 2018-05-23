const noteController = require('../controllers/noteController.js');
var Router = require('koa-router');
var router = new Router();


router.post('/note/add_note', noteController.createnote)

router.get('/note/add_note', noteController.getallnote)



module.exports = router;
