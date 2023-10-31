//导入jdonwebtoken生成token
const jwt = require('jsonwebtoken')
//导入数据库
const db = require('../config/sql.js')
const echartdata = require('../config/data.json')
const adminMenu = require('../config/admin-menu.json')
const userMenu = require('../config/user-menu.json')
const jetServerKey = require('../config/tokenConfig.js')
const Request = require('request')

//getMenu  Login
exports.getMenu = (req, res) => {
	let {
		username,
		password
	} = req.body.params.loginForm

	getAddress = function(callback) {
		const address = 'https://apis.map.qq.com/ws/location/v1/ip?key=KUBBZ-ZYY6P-UJ6DC-V5EDV-FZRCH-U2BQY'
		Request(address, (err, res, body) => {
			if (!err && res.statusCode === 200) {
				callback(null, body)
			}
		})
	}
	getAddress(function(err, body) {
		const Res = JSON.parse(body).result
		const province = Res.ad_info.province
		const city = Res.ad_info.city
		const district = Res.ad_info.district
		const address = province + city + district
		const usesql = 'SELECT * from user'
		db.query(usesql, (err, results) => {
			if (err) {
				return res.send({
					err: err.message
				})
			}
			if (results.length > 0) {
				//jwt.sign({用户信息},密钥,token有效时长)
				const token = jwt.sign({
					username
				}, jetServerKey, {
					expiresIn: '20h'
				})
				const item = results.filter(item => {
					if (item && item.userName !== username) {
						return false
					}
					return true
				})
				if (item.length > 0) {
					for (let i of item) {
						if (i.userRoot === 'admin') {
							return res.send({
								code: 1,
								result: adminMenu,
								token: token,
								address: address,
								name: i.userName,
								root:i.userRoot,
								tip: '登录成功!'
							})
						} else if (i.userRoot === 'user') {
							return res.send({
								code: 1,
								result: userMenu,
								token: token,
								address: address,
								name: i.userName,
								root:i.userRoot,
								tip: '登录成功!'
							})
						}
					}
				} else {
					return res.send({
						code: 2,
						tip: '用户名或密码错误!'
					})
				}

			} else {
				return res.send({
					code: 2,
					tip: '用户名或密码错误!'
				})
			}
		})
	})

}
//uer
exports.selldata = (req, res) => {
	//定义sql语句
	const allsell = 'SELECT * from sell'

	// function getIp() {
	// 	let inface = os.networkInterfaces()
	// 	for (let i in inface) {
	// 		for (var j = 0; j < inface[i].length; j++) {
	// 			let {
	// 				address,
	// 				family,
	// 				internal
	// 			} = inface[i][j]
	// 			if (address !== '127.0.0.1' && family === 'IPv4' && !internal) {
	// 					return address
	// 				// console.log(address);
	// 			}
	// 		}
	// 	}
	// }
	// getIp()
	db.query(allsell, (err, results) => {
		if (err) return res.send({
			message: err.message
		})
		if (results.length > 0) return res.send({
			data: results
		})
	})
}
//Echart
exports.echartdata = (req, res) => {
	return res.send({
		echartdata
	})
}
//table
exports.tabledata = (req, res) => {
	let {
		total,
		page,
		limit,
		name
	} = req.query.params
	const tablelist = 'SELECT * from tablelist'
	db.query(tablelist, (err, results) => {
		if (err) return res.send({
			message: err.message
		})
		if (results.length > 0) {
			//keyword搜索
			let List = results.filter(item => {
				if (name && item['tableList_name'].indexOf(name) === -1) { //没有keyword
					return false
				}
				return true
			})
			let Limit = List.filter((item, index) => {
				return index < page * limit && index >= (page - 1) * limit
			})
			return res.send({
				Limit,
				count: List.length,

			})
		}
	})
}
//删除table数据
exports.deletedata = (req, res) => {
	const deletedata = `DELETE from tablelist where tableList_id = "` + req.body.params.row.tableList_id + `"`
	db.query(deletedata, (err, results) => {
		if (err) {
			return res.send({
				message: err.message
			})
		} else {
			return res.send({
				tip: '删除成功！'
			})
		}
	})
}
//Edit
exports.editdata = (req, res) => {
	let newValue = req.body.params.form
	const editdata = `UPDATE tablelist SET tableList_name = "` + newValue.tableList_name + `",tableList_age="` +
		newValue.tableList_age + `",tableList_sex="` + newValue.tableList_sex + `",tableList_brithday="` + newValue
		.tableList_brithday + `",tableList_address="` + newValue.tableList_address + `" WHERE tableList_id = "` +
		newValue.tableList_id + `" `
	db.query(editdata, (err, results) => {
		if (err) {
			return res.send({
				message: err.message
			})
		} else {
			return res.send({
				tip: '修改成功！'
			})
		}
	})
}
//AddUser
exports.AddUser = (req, res) => {
	let user = req.body.params.dialogForm
	user.brithday = new Date(Date.parse(user.brithday) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
		/\.[\d]{3}Z/, '').slice(0, 10)
	const Adduser =
		`INSERT INTO tablelist (tableList_name,tableList_age,tableList_sex,tableList_brithday,tableList_address) VALUES ('` +
		user.name + `','` + user.age + `','` + user.sex + `','` + user.brithday + `','` + user.address + `')`

	db.query(Adduser, (err, results) => {
		if (err) return res.send({
			message: err.message
		})
		return res.send({
			tip: '添加成功！'
		})
	})
}
