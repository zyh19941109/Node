const http=require('http');

let server=http.createServer(function (req, res){
	//req.url返回带一个根目录的绝对路径
  switch(req.url){
    case '/1.html':
      res.write("111");
      break;
    case '/2.html':
      res.write("222");
      break;
    default:
      res.write('404');
      break;
  }

  res.end();
});

server.listen(8080);
