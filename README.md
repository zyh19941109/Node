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

### get参数解析

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
	  var GET={};
	  //防止favicon报错，做判断处理
	  if(req.url.indexOf('?')!=-1){
	    var arr=req.url.split('?');
	    var url=arr[0];
	    var arr2=arr[1].split('&');
	    for(var i=0;i<arr2.length;i++){
	      var arr3=arr2[i].split('=');
	      GET[arr3[0]]=arr3[1];
	    }
	  }else{
	    var url=req.url;
	  }
	  console.log(url, GET);
	  //req获取前台请求数据
	  res.write('aaa');
	  res.end();
	}).listen(8080);
```

> 2.用用querystring

```javascript
	const querystring=require('querystring');
	
	var json=querystring.parse("user=zyh&pass=123456&age=18");
	console.log(json);
```

```javascript
	const http=require('http');
	const querystring=require('querystring');
	
	http.createServer(function (req, res){
	  var GET={};
	  if(req.url.indexOf('?')!=-1){
	    var arr=req.url.split('?');
	    var url=arr[0];
	    GET=querystring.parse(arr[1]);
	  }else{
	    var url=req.url;
	  }
	  console.log(url, GET);
	  //req获取前台请求数据
	  res.write('aaa');
	  res.end();
	}).listen(8080);
```

> 3.用用url

```javascript
	const urlData=require('url');
	
	var obj=urlData.parse("http://www.baidu.com/index?a=12&b=5", true);
	console.log(obj.pathname, obj.query);
```

```javascript
	const http=require('http');
	const urlData=require('url');
	
	http.createServer(function (req, res){
	  //不加true时query是字符串，加了true时，query解析为json
	  var obj=urlData.parse(req.url, true);
	  var url=obj.pathname;
	  var GET=obj.query;
	  console.log(url, GET);
	  //req获取前台请求数据
	  res.write('aaa');
	  res.end();
	}).listen(8080);
```
### post数据获取

		get数据：
		
			const urlData=require('url')
			
			urlData.parse(req.url, true)
		
		post数据接收：POST数据比GET大得多
		
			header => 头部 => get<32k
			
			content => 身体 => post<1G
		
			POST很大  =>  分段传输
			
				遇到网络环境不稳定的情况，如果不是分段传输，需要重新传输
				而分段传输可确保只重新传输损坏的字节
			
				data	有一段数据到达触发一次（多次）
				end	数据全部到达触发一次（一次）

```javascript
	const http=require('http');
	const querystring=require('querystring');
	
	http.createServer(function (req, res){
	  //POST——req
	  var str='';//接收数据
	  //data——有一段数据到达(很多次)
	  var i=0;
	  req.on('data', function (data){
	    console.log(`第${i++}次收到数据`);
	    str+=data;
	  });
	  //end——数据全部到达(一次)
	  req.on('end', function (){
	    var POST=querystring.parse(str);
	    console.log(POST);
	  });
	}).listen(8080);
```

### 综合小例子

```html
	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="utf-8">
	    <title></title>
	  </head>
	  <body>
	    <form action="http://localhost:8080/aaa" method="post">
		用户：<input type="text" name="user"><br>
		密码：<input type="password" name="pass"><br>
		<!--<textarea name="content" rows="8" cols="40"></textarea>-->
		<input type="submit" value="提交">
	    </form>
	  </body>
	</html>
```

```javascript
	const http=require('http');
	const fs=require('fs');
	const urlData=require('url');//针对get
	const querystring=require('querystring');//针对post
	
	var server=http.createServer(function (req, res){
	  //GET
	  var obj=urlData.parse(req.url, true);
	
	  var url=obj.pathname;
	  const GET=obj.query;
	
	  //POST
	  var str='';
	  req.on('data', function (data){
	    str+=data;
	  });
	  
	  req.on('end', function (){
	    const POST=querystring.parse(str);
			//console.log(url,GET,POST)
	    //文件请求
	    var file_name='./www'+url;
	    fs.readFile(file_name, function (err, data){
	      if(err){
	        res.write('404');
	      }else{
	        res.write(data);
	      }
	      res.end();
	    });
	  });
	});
	
	server.listen(8080);
```

### 简单的登录、注册

```html
	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="utf-8">
	    <title></title>
	    <script src="ajax.js" charset="utf-8"></script>
	    <script type="text/javascript">
	      window.onload=function (){
	        var oTxtUser=document.getElementById('user');
	        var oTxtPass=document.getElementById('pass');
	        var oBtnReg=document.getElementById('reg_btn');
	        var oBtnLogin=document.getElementById('login_btn');
	
	        oBtnLogin.onclick=function (){
	          ajax({
	            url: '/user',
	            data: {act: 'login', user: oTxtUser.value, pass: oTxtPass.value},
	            type: 'get',
	            success: function (str){
	              var json=eval('('+str+')');
	
	              if(json.ok){
	                alert('登录成功');
	              }else{
	                alert('登录失败：'+json.msg);
	              }
	            },
	            error: function (){
	              alert('通信错误');
	            }
	          });
	        };
	
	        oBtnReg.onclick=function (){
	          ajax({
	            url: '/user',
	            data: {act: 'reg', user: oTxtUser.value, pass: oTxtPass.value},
	            type: 'get',
	            success: function (str){
	              var json=eval('('+str+')');
	
	              if(json.ok){
	                alert('注册成功');
	              }else{
	                alert('注册失败：'+json.msg);
	              }
	            },
	            error: function (){
	              alert('通信错误');
	            }
	          });
	        };
	      };
	    </script>
	  </head>
	  <body>
	    用户：<input type="text" id="user"><br>
	    密码：<input type="password" id="pass"><br>
	    <input type="button" value="注册" id="reg_btn">
	    <input type="button" value="登录" id="login_btn">
	  </body>
	</html>
```

```javascript
	const http=require('http');
	const fs=require('fs');
	const querystring=require('querystring');
	const urlLib=require('url');
	
	var users={};   //{"zyh": "123456", "yanhui": "123456"}
	
	var server=http.createServer(function (req, res){
	  //解析数据
	  var str='';
	  req.on('data', function (data){
	    str+=data;
	  });
	  req.on('end', function (){
	    var obj=urlLib.parse(req.url, true);
	
	    const url=obj.pathname;
	    const GET=obj.query;
	    const POST=querystring.parse(str);
	
	    //区分——接口、文件
	    if(url=='/user'){//接口
	      switch(GET.act){
	        case 'reg':
	          //1.检查用户名是否已经有了
	          if(users[GET.user]){
	            res.write('{"ok": false, "msg": "此用户已存在"}');
	          }else{
	            //2.插入users
	            users[GET.user]=GET.pass;
	            res.write('{"ok": true, "msg": "注册成功"}');
	          }
	          break;
	        case 'login':
	          //1.检查用户是否存在
	          if(users[GET.user]==null){
	            res.write('{"ok": false, "msg": "此用户不存在"}');
	          //2.检查用户密码
	          }else if(users[GET.user]!=GET.pass){
	            res.write('{"ok": false, "msg": "用户名或密码有误"}');
	          }else{
	            res.write('{"ok": true, "msg": "登录成功"}');
	          }
	          break;
	        default:
	          res.write('{"ok": false, "msg": "未知的act"}');
	      }
	      res.end();
	    }else{//文件
	      //读取文件
	      var file_name='./www'+url;
	      fs.readFile(file_name, function (err, data){
	        if(err){
	          res.write('404');
	        }else{
	          res.write(data);
	        }
	        res.end();
	      });
	    }
	  });
	});
	
	server.listen(8080);
```
