//导入模块
const express = require('express')
const bodyParser = require('body-parser')
//导入将客户端传来的token还原成json对象
const expressjwt = require('express-jwt')

//创建对象
const app = express()

const jetServerKey = require('./config/tokenConfig.js')
//unless({path:['']})中是不需要token访问权限的路径
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use(expressjwt({secret:jetServerKey,algorithms: ['HS256']}).unless({path:['/user/login']}))
//导入路由
const testRouter = require('./router/router_handle.js')
app.use('/user',testRouter )

//失败处理
app.use((err,req,res,next)=>{
	if(err.name === "UnauthorizedError"){
		return res.send({
			status:401,
			message:'无效的token'
		})
	}
	res.send({
		status:500,
		message:'未知的错误'
	})
	next()
})

//启动
const port = 8081

app.listen(port,() => {
	console.log("服务器启动", "api serve running at http://localhost:" + port);
})
