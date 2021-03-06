const express = require("express");
const app = express();
const cors = require("cors");
const history = require("connect-history-api-fallback");
const prize = require('../models/prize')
app.use(history({
  rewrites: [{
    from: /^\/api\/.*$/,
    to: function (context) {
      return context.parsedUrl.path
    }
  }]
}));
// for(let i=0;i<5;i++){
//   // prize.create({
//   //   prizeName:'一等奖：小牛F050电动车',
//   //   type:"adress"
//   // })
//   prize.create({
//     prizeName:'二等奖：价值约2000元华为平板电脑',
//     type:"adress"
//   })
// }
//for(let i=0;i<250;i++){
// prize.create({
//   prizeName:'一等奖：小牛F050电动车',
//   type:"adress"
// })
//prize.create({
// prizeName:'四等奖：价值20元话费',
//type:"code"
//})
//}
// 映射public目录中的静态资源
const path = require("path");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const staticRoot = path.resolve(__dirname, "../client/dist");
app.use(express.static(staticRoot))
// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({
  extended: true
}));
// 解析 application/json 格式的请求体
app.use(express.json());
app.use('/api/wx', require('./api/wx'));
app.use('/api/question', require('./api/question'));
app.use('/api/card', require('./api/card'));
app.use('/api/help', require('./api/help'));
app.use('/api/wining', require('./api/wining'));
app.use(require("./errorMiddleware"));
const port = 22307;
app.get('/api/state', (req, res) => {
  res.send("连接成功");
})
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});