import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/Login.vue')
  },
  {
    path: '/',
    component: () => import('../views/Main.vue'),
    redirect:'/Home',
    children: [{
      path:'/Home',
      name:'Home',
      component:()=>import('../views/Home.vue')
    },{
      path: '/User',
      name: 'User',
      component: () => import('../views/User/User.vue')
    }, {
      path:'/Product',
      name:'Product',
      component:()=>import('../views/Product/Product.vue')
    },{
      path: '/tinymce',
      name: 'tinymce',
      component: () => import('../views/Page/tinymce.vue')
    }, {
      path: '/other2',
      name: 'other2',
      component: () => import('../views/Page/other2.vue')
    }]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
