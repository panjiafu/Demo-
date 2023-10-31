import axios from 'axios'
import Cookies from './cookies'
const instance = axios.create({
    baseURL:'http://localhost:8081',
    // baseURL:'http://8.134.152.23:8081/',
    timeout:5000
})

//拦截
instance.interceptors.request.use((config)=>{
    //对请求数据做点什么
    const token = Cookies.get('token')
    if(token){
        config.headers.Authorization =`Bearer ${token}` 
    }
    return config
},(err)=>{
    //对请求错误做点什么
    return Promise.reject(err)
})

instance.interceptors.response.use((config)=>{
    //对响应数据做点什么
    return config
},(err)=>{
    //对数据错误做点什么
    return Promise.reject(err)
})

export default instance