//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//vue-router是插件 要使用use进行使用
Vue.use(VueRouter);
//引入路由组件
import routes from "./routes"
//引入store
import store from "../store"
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


let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
});
router.beforeEach(async (to, from, next) => {
    //为了测试全部放行
    //next();

    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //如果已经登录了
    if (token) {
        //登录之后去login 不行
        if (to.path == '/login') {
            next('/home');
        }
        else {
            //登录之后去的不是login
            if (name) {
                next();
            } else {
                //如果没有用户信息
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token过期之后 获取不到信息
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }

        }
    }
    else {
        //未登录
        next();
    }
});
export default router;