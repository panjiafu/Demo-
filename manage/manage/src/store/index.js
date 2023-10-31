import { createStore } from 'vuex'
import Cookies from '../api/cookies'

export default createStore({
  state: {
    name: '',
    root: '',
    //登录地点
    address: '',
    isCollapse: true,
    currentMenu: null,
    tagsList: [{
      path: "/Home", name: "Home", label: "首页"
    }],
    dialog: {
      value: false,
      data: null
    },
    menu: [],
    token: ''
  },
  getters: {
  },
  mutations: {
    updateisCollaspe(state) {
      state.isCollapse = !state.isCollapse
    },
    //selectMenu
    selectMenu(state, val) {
      if (val.name == 'Home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        let result = state.tagsList.findIndex(item => item.name === val.name)
        result == -1 ? state.tagsList.push(val) : ''
      }
    },
    //close tag
    closeTag(state, val) {
      let res = state.tagsList.findIndex(item => item.name === val.name)
      state.tagsList.splice(res, 1)
    },
    //dialogChange
    dialogChange(state, val) {
      state.dialog.value = val.value
      state.dialog.data = val.data
    },
    //setmenu
    setmenu(state, val) {
      state.name = val.name
      state.root = val.root
      state.address = val.address
      state.menu = val.result.menu
      localStorage.setItem("name", JSON.stringify(val.name))
      localStorage.setItem("root", JSON.stringify(val.root))
      localStorage.setItem("address", JSON.stringify(val.address))
      localStorage.setItem("menu", JSON.stringify(val.result.menu))
    },
    //addmenu 刷新后数据丢失，做持久化处理
    addmenu(state) {
      if (!localStorage.getItem('menu')) {
        return
      }
      const menu = JSON.parse(localStorage.getItem('menu'))
      const name = JSON.parse(localStorage.getItem('name'))
      const root = JSON.parse(localStorage.getItem('root'))
      const address = JSON.parse(localStorage.getItem('address'))
      state.menu = menu
      state.name = name
      state.root = root
      state.address = address
    },
    //退出
    clearmenu(state) {
      state.menu = []
      state.name = ''
      state.root = ''
      state.address = ''
      localStorage.removeItem('menu')
      localStorage.removeItem('name')
      localStorage.removeItem('root')
      localStorage.removeItem('address')
    },
    cleartoken(state) {
      state.token = ''
      Cookies.remove('token')
    },
    //token
    setToken(state, val) {
      state.token = val
      //name,value,day
      Cookies.set('token', val, 3)
    },
    getToken(state) {
      state.token = state.token || Cookies.get('token')
    },
    //重写computed的set方法，避免丢失响应式
    computesSet(state, val) {
      state.dialog.value = val
    }
  },
  actions: {
  },
  modules: {
  }
})
