const ajax = (type,url,data,success,error) => {
	wx.request({
		method: type,
	    url: 'http://127.0.0.1:3000' + url,
		data: data,
        header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'zt_token': wx.getStorageSync('token')
        },
	    success: function (res) {
	    	console.log('res------------------------------------------')
	    	console.log(res)
	    	if (res.statusCode == 200) {
	      		success && success(res);
	    	} else {
	    		error && error(res);
	    	}
	    }
	})
}

module.exports = {
	ajax: ajax
}