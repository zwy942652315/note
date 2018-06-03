const crypto = require('crypto');
  
function encryptSha1(data) {
	console.log('data')
	console.log(data)
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}
async function getKey(session_key){
    // 选择加密算法生成自己的登录态标识
    const skey = await encryptSha1(session_key);
    return skey;
}
  

module.exports = {
	getKey: getKey
};