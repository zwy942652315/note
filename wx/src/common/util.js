
const ajax = (type,url,data,success,error) => {
	// var host = 'http://120.79.44.8:88';
	var host = 'http://127.0.0.1:3000';
	data.user_id = wx.getStorageSync('user_id') ? wx.getStorageSync('user_id') : '';
	wx.request({
		method: type,
	    url: host + url,
		data: data,
        header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'zt_token': wx.getStorageSync('session_key')
        },
	    success: function (res) {
	    	if (res.statusCode == 200) {
	      		success && success(res);
	    	} else {
	    		error && error(res);
	    	}
	    }
	})
}

const getTimes = (t) => {
    var time = new Date(t);
    var year = time.getFullYear();
    var month = (time.getMonth() + 1);
    var date = time.getDate();
    var hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    var min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    var second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    return year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + second;
}

const toast = (msg) => {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
}
const doLogin = (obj,success, error) => {
    var self = this;
    wx.login({
      success: function(res) {
        console.log('登录成功！')
        console.log(res);
        var code = res.code;
        if (code) {
          wx.getUserInfo({
            success: function(res) {
                obj.globalData.userInfo = res.userInfo;
                obj.globalData.authorized = true;

                const codeObject = {code: code};
            	Object.assign(obj.globalData.userInfo, codeObject)
	            // 获取session_key
	            ajax('post', '/user/login',obj.globalData.userInfo,function(res){
	              if (res.data.success) {
	                toast(res.data.message);
	                if (res.data.object) {
	                  wx.setStorageSync('session_key', res.data.object.session_key);
	                  wx.setStorageSync('user_id', res.data.object._id);
	                  success && success(res);
	                }
	              } else {
	                obj.globalData.authorized = true;
	              }
	            },function(err){
	              console.log('err');
	              console.log(err);
	              obj.globalData.authorized = true;
	            });
	        },
	        fail: function(err) {
	        	obj.globalData.authorized = false;
	        	error && error(err)
	        }
          });
        }
      }
    });
  }
const  isLogin = (obj, hasLogin, success, error) => {
	var self = this;
	// 判断是否存在session_key，是否已经登录
	var loginFlag = wx.getStorageSync('session_key');
	if (loginFlag) {
	    // 检查 session_key 是否过期
	    wx.checkSession({
	        // session_key 有效(未过期)
	        success: function() {
	            // 业务逻辑处理
	            hasLogin && hasLogin();
	        },
	    
	        // session_key 过期
	        fail: function() {
	            // session_key过期，重新登录
	            doLogin(obj, success, error);
	        }
	    });
	} else {
	    // 无skey，作为首次登录
	    doLogin(obj, success, error);
	}
}



const getUserInfo = (obj, success, error) => {
    wx.getStorage({
        key: 'session_key',
        success: function(res) {
            wx.getUserInfo({
                success: function(res) {
                    obj.globalData.userInfo = res.userInfo;
                    obj.globalData.authorized = res.authorized;
                    success && success(res);
                },
                fail: function() {
                    wx.showModal({
                        title: '提示',
                        content: '需要先开启用户信息功能，不然功能会受限',
                        showCancel: false,
                        confirmText: '我知道了',
                        confirmColor: '#000000',
                        success: function(res) {
                            if (res.confirm) {
                                wx.openSetting({
                                    success: (res) => {

                                    }
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
            })
        },
        fail: function() {
            error && error();
            this.doLogin(function(obj) {
                // success && success(res);
            });
        }
    })
  }

module.exports = {
	ajax: ajax,
	getTimes: getTimes,
	toast: toast,
	getUserInfo: getUserInfo,
	isLogin: isLogin,
	doLogin: doLogin
}