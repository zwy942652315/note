const Note = require('../models/note.js');

// 新增一条笔记
async function createnote(ctx) {
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const notebook_id = ctx.request.body.notebook_id ? ctx.request.body.notebook_id : null;
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
        notebook_id
    });
    let createResult = await noteList.save().catch(err => {
        console.log(err);
        ctx.throw(500, '服务器内部错误');
    });
    
    console.log('笔记创建成功');
    ctx.body = {
        success: true,
        object: createResult,
        mssage: '笔记创建成功'
    };

}

// 获取所有笔记列表
async function getallnote (ctx) {
    const notebook_id = ctx.query.notebook_id;
    if (notebook_id) {
        var res = await Note
        .find({ notebook_id: notebook_id }, function (err, res) {
            console.log(err);
          if (err) return handleError(err);
            console.log('笔记列表');
            console.log(res) // Space Ghost is a talk show host.
        })
        .populate('notebook_id')
        .sort({ createtime: -1 })
    } else {
        var res = await Note
        .find({}, function (err, res) {
            console.log(err);
          if (err) return handleError(err);
            console.log('笔记列表');
            console.log(res) // Space Ghost is a talk show host.
        })
        .populate('notebook_id')
        .sort({ createtime: -1 })
    }
    ctx.body = {
        success: true,
        object: res,
        mssage: '获取笔记列表成功'
    };
}

// 获取某一条笔记
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

// 编辑某一条笔记
async function editnote (ctx) {
    const noteId = ctx.request.body.noteId;
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const updateData = {$set:{ title: title,content: content}};
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

// 删除某一条笔记
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