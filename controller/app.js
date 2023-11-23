const fs =require("fs")
const path =require("path")
const express = require('express')
const app = express()
const mime = require('mime')
const connect=require('../dao/connect_sql')
//连接数据库
connect.connection
const port = 5501

//查找nft数据
app.get('/getdata/nftdata', function(req, res) {

  connect.queryData((err, rows) => {
    if (err) {
      // 处理错误
      console.error('Error executing query: ' + err.stack);
      return;
    }
  
    // 处理查询结果
    res.json(rows);

  })
  
});


app.get('/*', (req, res) => {
    const url = req.params[0]
    const fpath=path.join(__dirname,"../",url)
    
    //对于mime类型为null的文件，以及二进制文件同一用二进制读取及传输。如模型
    if(mime.getType(fpath)==null||mime.getType(fpath)=="application/octet-stream"){
      res.setHeader('Content-Type','application/octet-stream')
      console.log(fpath+":二进制文件")
      fs.readFile(fpath,"binary",(err,dataStr)=>{
          if(err) 
          return res.end("404 not found")
          res.end(dataStr,"binary")
          
      })
    }

    //对图片
    else if(mime.getType(fpath)=="image/png"||mime.getType(fpath)=="image/jpeg"){
      console.log(fpath+":图片")
      fs.readFile(fpath, (err, data) => {
        res.writeHead(200, { 'Content-Type': 'image/png' }); // 根据图片类型设置正确的Content-Type
        res.end(data);
      })
    }
    
    //其他类型，如静态页面
    else{
      res.setHeader('Content-Type', mime.getType(fpath))
 
      console.log(fpath+":"+mime.getType(fpath))
  
      fs.readFile(fpath,"utf-8",(err,dataStr)=>{
          if(err) 
          return res.end("404 not found")
  
          res.end(dataStr)
          
      })
    }
    
});

app.listen(port, () => {
  console.log(`http://localhost:5501/view/ar.html`)
  console.log('http://47.115.203.81:5501/view/index.html')
});


