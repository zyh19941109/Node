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
