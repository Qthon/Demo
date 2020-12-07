// 引入模块
const express = require("express");
const bodyParser = require("body-parser");
const { router } = require('./router/router')
const cors = require('cors')
const openIndex = require('child_process');

// 创建服务器
const app = express();

// 跨域资源共享
app.use(cors());

// 调用中间件用于处理post请求发过来的数据
app.use(bodyParser.urlencoded());

// 调用中间件启动express路由
app.use(router)

// 端口监听
app.listen(3000, () => {
    console.log("Serve http://127.0.0.1:3000 is runing... ");
});

// 开启浏览器
openIndex.exec('start ../index.html')