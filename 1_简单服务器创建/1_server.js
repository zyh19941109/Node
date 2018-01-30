//引入http系统模块
const http=require('http');
//创建一个服务器，接收一个回调函数，返回一个server对象
//每当访问这个服务器的时候，这个回调函数就会执行
let server=http.createServer(function (req, res){
    console.log('有人来了');
    
    res.write("abc");//写入
    res.end();//结束
});

//监听--等着
//端口--数字
//服务器需要监听某一个端口，那么来自这个端口的请求都会被服务器接收到
server.listen(8080);
