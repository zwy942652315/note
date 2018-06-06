# note


# 搭建流程：
-	全局安装或更新WePY命令行工具
	npm install wepy-cli -g

-	初始化项目
	wepy init standard myproject

-	切换至项目目录
	cd wx

-	安装依赖
	npm  install

-	开启实时编译
	wepy build --watch

```

	├── dist                   -小程序运行代码目录（该目录由WePY的build指令自动编译生成，请不要直接修改该目录下的文件）
	├── node_modules           
	├── src                    -代码编写的目录（该目录为使用WePY后的开发目录）
	├     ├── components         -WePY组件目录（组件不属于完整页面，仅供完整页面或其他组件引用）
	├     ├     ├── com_a.wpy      -可复用的WePY组件a
	├     ├     ├── com_b.wpy      -可复用的WePY组件b
	├     ├── pages              -WePY页面目录（属于完整页面）
	├     ├     ├── index.wpy      index页面（经build后，会在dist目录下的pages目录生成index.js、index.json、index.wxml和index.wxss文件）
	├     ├     ├── other.wpy      other页面（经build后，会在dist目录下的pages目录生成other.js、other.json、other.wxml和other.wxss文件）
	├     ├── app.wpy            小程序配置项（全局数据、样式、声明钩子等；经build后，会在dist目录下生成app.js、app.json和app.wxss文件）
	├── package.json           -项目的package配置
```


# 注意：
做列表的下拉刷新时，由于官方scroll-view组件不支持下拉刷新onPullDownRefresh，只有滚到顶部刷新的机制，所以做一个基于scroll-view的[下拉刷新组件](https://github.com/Chaunjie/weapp-scroll-view-refresh)


## 小程序登录功能
![image](https://developers.weixin.qq.com/miniprogram/dev/image/api-login.jpg?t=201861)
1.	调用接口wx.login() 获取临时登录凭证（code）
	- code是用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api来校验登录，使用 code 换取 openid 和 session_key 等信息
	- [详细介绍](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html#wxloginobject)
2. 获取openid和session_key
	- openid，在公众平台里，用来标识每个用户在订阅号、服务号、小程序这三种不同应用的唯一标识，也就是说每个用户在每个应用的openid都是不一致的，所以在小程序里，我们可以用openid来标识用户的唯一性。
	- session_key是用来干嘛的呢？有了用户标识，我们就需要让该用户进行登录，那么session_key就保证了当前用户进行会话操作的有效性，这个session_key是微信服务端给我们派发的。也就是说，我们可以用这个标识来间接地维护我们小程序用户的登录态，那么这个session_key是怎么拿到的呢？我们需要在自己的服务端请求[微信提供的第三方接口](https://api.weixin.qq.com/sns/jscode2session) 
	接口地址：https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code，这个接口需要带上四个参数字段：
	- 
	|参数|必填|说明|
	|------|------|------|
	|appid|是|小程序唯一标识|
	|secre|是|小程序的 app secret|
	|js_code|是|登录时获取的 code|
	|grant_type|是|填写为 authorization_code|

3. checkSession
	- 前面我们将session_key存入前端的storage里，每次进行用户数据请求时会带上session_key，那么如果此时session_key过期呢？所以我们需要调用到wx.checkSession()这个API来校验当前session_key是否已经过期，这个API并不需要传入任何有关session_key的信息参数，而是微信小程序自己去调自己的服务来查询用户最近一次生成的session_key是否过期。如果当前session_key过期，就让用户来重新登录，更新session_key，并将最新的session_key存入用户数据表中。

### 登录校验流程：
	```
		let loginFlag = wx.getStorageSync('skey');
		if (loginFlag) {
		    // 检查 session_key 是否过期
		    wx.checkSession({
		        // session_key 有效(未过期)
		        success: function() {
		            // 业务逻辑处理
		        },
		    
		        // session_key 过期
		        fail: function() {
		            // session_key过期，重新登录
		            doLogin();
		        }
		    });
		) else {
		    // 无skey，作为首次登录
		    doLogin();
		}
	```
