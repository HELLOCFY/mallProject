//对于axios进行二此封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//nprogress为一个对象 start为开始 done为接受 
//引入进度条样式
import "nprogress/nprogress.css";
//1.利用axios上面的create方法创建一个axios实例
//2.request就是axios
const requests=axios.create({
    baseURL:"/api",
    timeout:5000,
})
//请求拦截器
requests.interceptors.request.use((config)=>{
    //config配置对象，对象里面有一个属性很重要，headers
    //进度条开始
    nprogress.start();
    return config;
})
requests.interceptors.response.use((res)=>{
    //成功的回调函数
    //进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    //失败的回调函数
    return Promise.reject(new Error("fail"))
})
export default requests;