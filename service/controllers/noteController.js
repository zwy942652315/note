const Note = require('../models/note.js');

async function createnote(ctx) {
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const tags = ctx.request.body.tags;
    const createTime = new Date();
    const modifytime = new Date();
    if (title === '' && content === '') {
        // ctx.throw(400, '内容不能为空');
        ctx.status = 400;
        ctx.body = {
            success: false,
            object: null,
            mssage: '标题和内容都不能为空'
        };
        return;
    }
    if (title === '') {
        // ctx.throw(400, '标题不能为空');
        ctx.status = 400;
        ctx.body = {
            success: false,
            object: null,
            mssage: '标题不能为空'
        };
        return;
    }
    if (content === '') {
        // ctx.throw(400, '内容不能为空');
        ctx.status = 400;
        ctx.body = {
            success: false,
            object: null,
            mssage: '内容不能为空'
        };
        return;
    }
    const noteList = new Note({
        title,
        content,
        createTime,
        modifytime,
        tags
    });
    let createResult = await noteList.save().catch(err => {
        ctx.throw(500, '服务器内部错误');
    });
    
    console.log('笔记创建成功');
    ctx.body = {
        success: true,
        object: createResult,
        mssage: '笔记创建成功'
    };

}

async function getallnote (ctx) {
    var res = await Note
    .find({}, function (err, res) {
      if (err) return handleError(err);
        console.log('笔记列表');
        console.log(res) // Space Ghost is a talk show host.
    })
    .sort({ modifytime: -1 })
    ctx.body = {
        success: true,
        object: res,
        mssage: '笔记列表'
    };
}

module.exports = noteController = {
    createnote: createnote,
    getallnote: getallnote
};