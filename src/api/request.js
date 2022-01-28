//对于axios进行二此封装
import axios from "axios";
//1.利用axios上面的create方法创建一个axios实例
//2.request就是axios
const requests=axios.create({
    baseURL:"/api",
    timeout:5000,
})
//请求拦截器
requests.interceptors.request.use((config)=>{
    //config配置对象，对象里面有一个属性很重要，headers
    return config;
})
requests.interceptors.response.use((res)=>{
    //成功的回调函数
    return res.data;
},(error)=>{
    //失败的回调函数
    return Promise.reject(new Error("fail"))
})
export default requests;