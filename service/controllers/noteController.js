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
        // console.log('笔记列表');
        // console.log(res) // Space Ghost is a talk show host.
    })
    .sort({ modifytime: -1 })
    ctx.body = {
        success: true,
        object: res,
        mssage: '获取笔记列表成功'
    };
}

async function getnote (ctx) {
    const noteId = ctx.query.noteId;
    var res = await Note
    .findOne({'_id': noteId}, function (err, res) {
      if (err) return handleError(err);
        console.log('某条笔记');
        console.log(res) // Space Ghost is a talk show host.
    })
    ctx.body = {
        success: true,
        object: res,
        mssage: '查询成功'
    };
}

async function editnote (ctx) {
    const noteId = ctx.request.body.noteId;
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const modifytime = new Date();
    const updateData = {$set:{ title: title,content: content,modifytime: modifytime}};
    await Note.update({_id: noteId}, updateData, function (err, docs) {
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


async function deletenote (ctx) {
    const noteId = ctx.request.body.noteId;
    await Note.remove({_id: noteId}, function(err, docs){
      if (err) return handleError(err);
      console.log('docs 就是mongodb返回的删除状态的falg ', docs);
    });
    ctx.body = {
        success: true,
        object: null,
        mssage: '删除成功'
    };
}

module.exports = noteController = {
    createnote: createnote,
    getallnote: getallnote,
    getnote: getnote,
    editnote: editnote,
    deletenote: deletenote
};