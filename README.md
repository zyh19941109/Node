## Node

### 初识node.js

		NodeJS--后台
		
		JavaScript--前台
			
		后台：
		
			1.PHP
			2.Java
			3.Python
			...
			
		优势：
		
			1.性能
			
				nodejs	php		86
				
				有人大致做了测试，node的性能是php的86倍
			
			2.跟前台JS配合方便
			
			3.NodeJS便于前端学习
			
		一些windows小操作：
		
			1.切换盘符	e:
			2.改变目录	cd 目录名
			3.执行程序	node xxx.js

### 创建一个简单（low）的服务器

		nodeJS--服务器
		
		http--协议
		
		request	请求	输入-请求的信息
		response	响应	输出-输出的东西
		
		每个服务器可提供多种服务，可设置多个端口，以区分每个端口对应不同的服务

```javascript
	//引入http系统模块
	const http=require('http');
	//创建一个服务器，接收一个回调函数，返回一个server对象
	//每当访问这个服务器的时候，这个回调函数就会执行
	let server=http.createServer(function (req, res){
	  	//console.log('有人来了');
	
	  	res.write("abc");//写入
	  	res.end();//结束
	});
	
	//监听--等着
	//端口--数字
	//服务器需要监听某一个端口，那么来自这个端口的请求都会被服务器接收到
	server.listen(8080);
```

### 文件操作--fs（File System）

		客户端--服务器--磁盘
		
		磁盘--服务器--客户端
		
		读取和写入都是异步操作

```javascript
	//fs.readFile(文件名,回调函数)
	
	fs.readFile('111.txt',function(err,data){
		if(err){
			console.log('读取失败')
		}else{
			//data读取出来为二进制数据，只限于机器机器之间的对接
			console.log(data.toString)
		}
	})
	
	//fs.writeFile(文件名,内容,回调函数)
	
	fs.writeFile('222.txt','zyh',function(err){
		console.log(err)
	})
```

### get地址栏参数解析

```html
	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="utf-8">
	    <title></title>
	  </head>
	  <body>
	    <form action="http://localhost:8080/aaa" method="get">
	      用户：<input type="text" name="user" value=""><br>
	      密码：<input type="password" name="pass" value=""><br>
	      <input type="submit" value="提交">
	    </form>
	  </body>
	</html>
```

> 1.纯手工切

```javascript
	const http=require('http');
	
	http.createServer(function (req, res){
	  var getUrl={};
	  //防止favicon报错，做判断处理
	  if(req.url.indexOf('?')!=-1){
	    var arr=req.url.split('?');
	    var url=arr[0];
	    var arr2=arr[1].split('&');
	    for(var i=0;i<arr2.length;i++){
	      var arr3=arr2[i].split('=');
	      getUrl[arr3[0]]=arr3[1];
	    }
	  }else{
	    var url=req.url;
	  }
	  console.log(url, getUrl);
	  //req获取前台请求数据
	  res.write('aaa');
	  res.end();
	}).listen(8080);
```

> 2.querystring

```javascript
	const querystring=require('querystring');
	
	var json=querystring.parse("user=zyh&pass=123456&age=18");
	console.log(json);
```

```javascript
	const http=require('http');
	const querystring=require('querystring');
	
	http.createServer(function (req, res){
	  var getUrl={};
	
	  if(req.url.indexOf('?')!=-1){
	    var arr=req.url.split('?');
	    var url=arr[0];
	    
	    getUrl=querystring.parse(arr[1]);
	  }else{
	    var url=req.url;
	  }
	
	
	  console.log(url, getUrl);
	
	  //req获取前台请求数据
	  res.write('aaa');
	  res.end();
	}).listen(8080);
```
