class cookie{
    // constructor(){
    // }
    set(name,value,day){
        const  D= new Date()
        //当前时间+day=过期时间
        const  Extime = Date.parse(D)+(day*24*3600*1000)
        //设置过期时间
        D.setTime(Extime)
        document.cookie = name +'='+value+';'+'expires='+D.toUTCString()
    }
    get(name){
        const getname = name + '='
        //获取cookie
        const dToken = document.cookie.split(';')
        for (let i = 0; i < dToken.length; i++) {
            //清除前后空格
            const k = dToken[i].trim()
            if(k.indexOf(getname) == 0){
                //返回token
                return k.substring(getname.length,k.length)
            }else{
                return ''
            }
            
        }
    }
    remove(name){
        const day = -1
        const D = new Date()
        const  Extime = Date.parse(D)+(day*24*3600*1000)
        D.setTime(Extime)
        document.cookie = name +'='+this.get(name)+';'+'expires='+D.toUTCString()
        // this.set(name,this.get(name),-10)
        
    }
}
const Cookies = new cookie()
export default Cookies