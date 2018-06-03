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
    const result = await getSessionKey(code, config.appid, config.appSecret);

    ctx.body = {
        success: true,
        object: result,
        message: '用户验证成功'
    };

}


module.exports = noteController = {
    createUser: createUser,
};