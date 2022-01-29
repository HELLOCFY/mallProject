//search组件小仓库
//引入请求模块
import { reqCategoryList } from "@/api";
//state为数据
const state={
    categoryList:[],
};
//mutations为修改state的唯一手段
const mutations={
    CATEGORYLIST(state,categoryList){
        //由于有人改接口故此处切分数组
        state.categoryList=categoryList.slice(0,16);
    }
};
//actions处理action，可以书写业务逻辑和书写异步
const actions={
    //通过api向服务器发请求
    async categoryList({commit}){
        let result=await reqCategoryList();
        if(result.code===200){
            commit("CATEGORYLIST",result.data)
        }
        
    }
};
//getters可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
};


export default {
    state,
    mutations,
    actions,
    getters,
}