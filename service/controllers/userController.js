const axios = require('axios');
const User = require('../models/user.js');
const config = require('../config/config')
const util = require('../config/util')

async function getSessionKey (code, appid, appSecret) {
    var opt = {
        method: 'GET',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        params: {
            appid: appid,
            secret: appSecret,
            js_code: code,
            grant_type: 'authorization_code'
        }
    };
    return axios.get('https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code')
    .then(function (response) {
        console.log(response.data);
        var data = response.data;
        if (!data.openid || !data.session_key || data.errcode) {
            return {
                result: -2,
                errmsg: data.errmsg || '返回数据字段不完整'
            }
        } else {
            // 选择加密算法生成自己的登录态标识
            const { session_key } = data;
            const skey = util.getKey(session_key);
            return data
        }
    })
    .catch(function (error) {
        console.log(error);
        return error
    });
}

// 新增用户
async function createUser(ctx) {
    const code = ctx.request.body.code;
    const userInfo = ctx.request.body;
    delete userInfo.code;
    const result = await getSessionKey(code, config.appid, config.appSecret);

    console.log('ctx------------------cookie')
    console.log(ctx);
    console.log('ctx**********************cookie')

    // 判断用户是否重复
    Object.assign(userInfo, result);
    var res = await User
    .findOne({'openid': userInfo.openid}, function (err, res) {
      if (err) return handleError(err);
    })
    let createNewUser = null;
    if (!res) {
        const userList = new User(userInfo);
        // 创建新用户
        createNewUser = await userList.save().catch(err => {
            console.log(err);
            ctx.throw(500, '服务器内部错误');
        });
    }

    ctx.body = {
        success: true,
        object: createNewUser,
        message: '登录成功'
    };
}


module.exports = noteController = {
    createUser: createUser,
};