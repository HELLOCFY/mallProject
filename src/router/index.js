//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//vue-router是插件 要使用use进行使用
Vue.use(VueRouter);
//引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

//重写$router.push 和$router.replace方法解决重复点击搜索按钮之后的报错问题；
//原因是push和replace返回值是一个Promise对象，多次执行之后存在返回值的问题，没有resolve和reject
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    }
    else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    }
    else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


export default new VueRouter({
    //配置路由
    routes: [
        {
            path: "/home",
            component: Home,
            meta: { show: true }
        },
        {
            //params参数必须在path中有一个占位符，不然可能出现问题，例如页面不跳转
            path: "/search/:keyword",
            component: Search,
            meta: { show: true },
            name: "search",
        },
        {
            path: "/login",
            component: Login,
            meta: { show: false }
        },
        {
            path: "/register",
            component: Register,
            meta: { show: false }
        },
        {
            path: "*",
            redirect: "/home"
        }
    ]
})