const Notebook = require('../models/notebook.js');

// 新增一个笔记本
async function createnotebook(ctx) {
    const bookname = ctx.request.body.bookname;

    if (bookname === '') {
        // ctx.throw(400, '标题不能为空');
        ctx.status = 400;
        ctx.body = {
            success: false,
            object: null,
            mssage: '标题不能为空'
        };
        return;
    }

    const notebookList = new Notebook({
        bookname
    });
    let createResult = await notebookList.save().catch(err => {
        ctx.throw(500, '服务器内部错误');
    });
    
    console.log('笔记本创建成功');
    ctx.body = {
        success: true,
        object: createResult,
        mssage: '笔记本创建成功'
    };

}

// 获取所有笔记本列表
async function getallnotebook (ctx) {
    var res = await Notebook
    .find({}, function (err, res) {
      if (err) return handleError(err);
        // console.log('笔记本列表');
        // console.log(res) // Space Ghost is a talk show host.
    })
    .sort({ createtime: -1 })
    ctx.body = {
        success: true,
        object: res,
        mssage: '获取笔记本列表成功'
    };
}

// 获取某一个笔记本
async function getnotebook (ctx) {
    const notebookId = ctx.query.notebookId;
    var res = await Notebook
    .findOne({'_id': notebookId}, function (err, res) {
      if (err) return handleError(err);
        console.log('某个笔记本');
        console.log(res) // Space Ghost is a talk show host.
    })
    ctx.body = {
        success: true,
        object: res,
        mssage: '查询成功'
    };
}

// 删除某一个笔记本
async function deletenotebook (ctx) {
    const notebookId = ctx.request.body.notebookId;
    await Notebook.remove({_id: notebookId}, function(err, docs){
      if (err) return handleError(err);
      console.log('docs 就是mongodb返回的删除状态的falg ', docs);
    });
    ctx.body = {
        success: true,
        object: null,
        mssage: '删除成功'
    };
}

// 编辑某一个笔记本
async function editnotebook (ctx) {
    const notebookId = ctx.request.body.notebookId;
    const bookname = ctx.request.body.bookname;
    const updateData = {$set:{ bookname: bookname}};
    await Notebook.update({_id: notebookId}, updateData, function (err, docs) {
      if (err) return handleError(err);
      console.log('docs 就是mongodb返回的更改状态的falg ', docs);
      //比如: { ok: 1, nModified: 2, n: 2 }
    });
    ctx.body = {
        success: true,
        object: null,
        mssage: '修改成功'
    };
}

module.exports = noteController = {
    createnotebook: createnotebook,
    getallnotebook: getallnotebook,
    getnotebook: getnotebook,
    editnotebook: editnotebook,
    deletenotebook: deletenotebook
}