# note
# 搭建流程 
	npm install koa -s

[参考文章](https://koa.bootcss.com/)

# 环境搭建：
- 安装koa:
	cnpm install koa --save
- 分别新建一下文件，最终项目结构是：
	service————
			   |____controllers	-控制器     	主要操作数据库
			   |____models		-数据模型	建立数据库集合模型
			   |____routers		-路由		
		       |____app.js      -入口文件
		       |____package.json

- 安装数据库模块：cnpm install mongoose






# 注意：
1. 在app.js中，需要引入koa-body，为的是在post请求时，可以获取到请求的数据，如：ctx.request.body.title



2. 在定义mongoose-schema，note模型时，如果加入数据创建时间与数据最后修改时间会大大提高数据表的可维护性和规范性。
3. 之前的做法是定义两个字段（数据类型为Date），操作数据表时获取当前的时间戳记录下来，每次修改都将修改时间做更新。
4. 但更好的方案：
5. 使用mongoose新增的内置时间戳记录。关键代码如下：
```
{
    timestamps: {
        createdAt: 'createtime',
        updatedAt: 'modifytime'
    }
}
   其中created和updated为自动记录时间的字段名，分别记录创建时间与更新时间，可以自定义。

```



# nginx配置：

```
	server {
	    listen 80;
	    server_name note.com www.note.com; # 改成你自己的域名
	    root /home/at/wx;
	    set $node_port 3000;

	    index index.js index.html index.htm;
	    if ( -f $request_filename/index.html ){
	        rewrite (.*) $1/index.html break;
	    }
	    if ( !-f $request_filename ){
	        rewrite (.*) /index.js;
	    }
	    location = /index.js {
	        proxy_http_version 1.1;
	        proxy_set_header X-Real-IP $remote_addr;
	        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	        proxy_set_header Host $http_host;
	        proxy_set_header X-NginX-Proxy true;
	        proxy_set_header Upgrade $http_upgrade;
	        proxy_set_header Connection "upgrade";
	        proxy_pass http://120.79.44.8:$node_port$request_uri;
	        proxy_redirect off;
	    }

	    location ~ /static/ {
	        etag         on;
	        expires      max;
	    }
	}
```