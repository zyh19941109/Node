const http=require('http');
const urlData=require('url');

http.createServer(function (req, res){
	//不加true时query是字符串，加了true时，query解析为json
  var obj=urlData.parse(req.url, true);
  var url=obj.pathname;
  var getUrl=obj.query;
  console.log(url, getUrl);
  //req获取前台请求数据
  res.write('aaa');
  res.end();
}).listen(8080);
