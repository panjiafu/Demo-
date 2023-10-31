import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

//检测to.path路由是否存在
function checkrouter(path){
  let hascheck = router.getRoutes().filter(route => route.path === path).length
  if(hascheck){
    return true
  }else{
    return false
  }
}

//
router.beforeEach((to,from,next)=>{
  store.commit("getToken")
  const token = store.state.token
  if(to.name !== 'login' && !token){
    next({path:'/login'})
  }else if(!checkrouter(to.path)){
    next({name:'Home'})
  }else{
    next()

  }
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store).use(router).mount('#app')
