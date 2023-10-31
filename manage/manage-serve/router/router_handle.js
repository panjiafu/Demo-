const express = require('express')
const router = express.Router()
//导入handle模块
const handle = require('../module/module_handle.js')
router.post('/login',handle.getMenu )
router.get('/sell',handle.selldata )
router.get('/echartdata',handle.echartdata )
router.get('/tabledata',handle.tabledata )
router.post('/deldata',handle.deletedata )
router.post('/editdata',handle.editdata )
router.post('/adduser',handle.AddUser )

module.exports = router