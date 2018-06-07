const Note = require('../models/note.js');

// 新增一条笔记
async function createnote(ctx) {
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const isCollect = false;    // 默认不收藏
    const notebook_id = ctx.request.body.notebook_id  !== 'null' ? ctx.request.body.notebook_id : null;
    const user_id = ctx.request.body.user_id;
    if (title === '' && content === '') {
        // ctx.throw(400, '内容不能为空');
        ctx.status = 400;
        ctx.body = {
            success: false,
            object: null,
            message: '标题和内容都不能为空'
        };
        return;
    }
    if (title === '') {
        // ctx.throw(400, '标题不能为空');
        ctx.status = 400;
        ctx.body = {
            success: false,
            object: null,
            message: '标题不能为空'
        };
        return;
    }
    if (content === '') {
        // ctx.throw(400, '内容不能为空');
        ctx.status = 400;
        ctx.body = {
            success: false,
            object: null,
            message: '内容不能为空'
        };
        return;
    }
    const noteList = new Note({
        title,
        content,
        isCollect,
        notebook_id,
        user_id
    });
    let createResult = await noteList.save().catch(err => {
        console.log(err);
        ctx.throw(500, '服务器内部错误');
    });
    
    console.log('笔记创建成功');
    ctx.body = {
        success: true,
        object: createResult,
        message: '笔记创建成功'
    };

}

// 获取所有笔记列表
async function getallnote (ctx) {
    const notebook_id = ctx.query.notebook_id;
    const page = Number(ctx.query.page);
    const pageSize = Number(ctx.query.pageSize);
    const skip = (page - 1) * pageSize;
    const user_id = ctx.query.user_id;
    const isCollect = ctx.query.myCollect === 'true';
    var filterData = null;
    if (notebook_id) {
        filterData = { notebook_id: notebook_id, user_id: user_id };
    } else {
        filterData = {user_id: user_id};
    }
    if (isCollect) {
        Object.assign(filterData, {isCollect: isCollect});
    }
    var res = await Note
    .find(filterData, function (err, res) {
        console.log(err);
      if (err) return handleError(err);
        // console.log('笔记列表');
        // console.log(res) // Space Ghost is a talk show host.
    })
    .limit(pageSize)
    .skip(skip)
    .populate('notebook_id')
    .sort({ createtime: -1 })
    ctx.body = {
        success: true,
        object: res,
        message: '获取笔记列表成功'
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
        message: '查询成功'
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
        message: '修改成功'
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
        message: '删除成功'
    };
}

// 收藏某一条笔记
async function collectnote (ctx) {
    const noteId = ctx.request.body.noteId;
    const isCollect = ctx.request.body.isCollect;
    const updateData = {$set:{isCollect: isCollect}};
    await Note.update({_id: noteId}, updateData, function (err, docs) {
      if (err) return handleError(err);
      console.log('docs 就是mongodb返回的更改状态的falg ', docs);
      //比如: { ok: 1, nModified: 2, n: 2 }
    });
    ctx.body = {
        success: true,
        object: null,
        message: isCollect === 'true' ? '收藏成功' : '取消收藏'
    };
}

// 移动某一条笔记
async function movenote (ctx) {
    const noteId = ctx.request.body.noteId;
    const notebook_id = ctx.request.body.notebook_id;
    await Note.update({_id: noteId}, {notebook_id: notebook_id}, function (err, docs) {
      if (err) return handleError(err);
      console.log('docs 就是mongodb返回的更改状态的falg ', docs);
      //比如: { ok: 1, nModified: 2, n: 2 }
    });
    ctx.body = {
        success: true,
        object: null,
        message: '移动成功'
    };
}

module.exports = noteController = {
    createnote: createnote,
    getallnote: getallnote,
    getnote: getnote,
    editnote: editnote,
    deletenote: deletenote,
    collectnote: collectnote,
    movenote: movenote
};