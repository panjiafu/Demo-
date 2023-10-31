//导入模块
const Mysql = require('mysql')

//连接
const connectMysql = Mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'manage'
})

connectMysql.connect()

module.exports = connectMysql