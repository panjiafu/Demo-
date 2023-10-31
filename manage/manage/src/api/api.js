import instance from './request'
export function selldata(url,params){
    return instance.get(url,params)
}
export function echartdata(url,params){
    return instance.get(url,params)
}
export function tabledata(url,params){
    return instance.get(url,{params})
}

export function delData(url,params){
    return instance.post(url,{params})
}
export function editdata(url,params){
    return instance.post(url,{params})
}
export function AddUserdata(url,params){
    return instance.post(url,{params})
}
export function getMenu(url,params){
    return instance.post(url,{params})
}