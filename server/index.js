const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

// 对比下面的手动设置
// 当cors()没有设置参数时，用户设置了什么access-control-request-headers，
// 那么access-control-allow-headers就会加上去
// app.use('/{*any}', cors())
// app.put('/foo', (req, res) => {
//   res.send('Hello World!')
// })

app.options('/{*any}', (req, res) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']
  const allowedHeaders = ['Content-Type', 'Authorization', 'fx']
  res.header('Access-Control-Allow-Headers', allowedHeaders.join(',') /* '*' */)
  const origin = req.headers.origin // 发起请求的源{协议+域名+端口}
  // 判断请求的 Origin 是否在允许的列表中
  res.header('Access-Control-Allow-Origin', origin)
  // HTTP 跨源请求携带凭据
  res.header('Access-Control-Allow-Credentials', 'true')

  // 设置允许的请求方法
  res.header('Access-Control-Allow-Methods', allowedMethods.join(','))
  // 允许浏览器缓存 OPTIONS 请求的响应
  // 当过期前，浏览器都不会自动发送options请求了
  res.header('Access-Control-Max-Age', 0)
  return res.sendStatus(200)
})

// 即使对options的响应头进行了设置，那么还是得对真正的请求也进行cors设置
// 但如果只对真正的请求进行了cors设置，没有对options进行设置，这么也会导致发生跨域错误
app.put(
  '/foo',
  // HTTP 跨源请求携带凭据
  cors({ credentials: true, origin: 'http://localhost:5173' }),
  (req, res) => {
    res.cookie('aaaa', 'bbb')
    res.send('Hello World!')
  },
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
