const ajax = (type,url,data,success,error) => {
	// var host = 'http://120.79.44.8:88';
	var host = 'http://127.0.0.1:3000'
	wx.request({
		method: type,
	    url: host + url,
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

module.exports = {
	ajax: ajax,
	getTimes: getTimes,
	toast: toast
}