import Vue from 'vue';
import Vuex from 'vuex'
//***********************
//*******注意Vuex可以使用模块式开发，每个小仓库可以被大仓库引用 然后统一使用modules{}进行注册
//***********************
//使用vuex插件
Vue.use(Vuex);
//引入组对应的小仓库
import home from './home';
import search from './search';
import detail from './detail';


export default new Vuex.Store({
    modules: {
        home,
        search,
        detail
    }
})