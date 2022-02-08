//home组件小仓库
//state为数据
import { reqGetSearchInfo } from "@/api";
const state = {
    searchList: {},
};
//mutations为修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
//actions处理action，可以书写业务逻辑和书写异步
const actions = {
    async getSearchList({ commit }, params = {}) {
        //params参数是当用户派发action时第二个参数 this.$store.dispatch("xxxxxxx",params)
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
//getters可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
    //这里的state为当前小仓库的state，不是大仓库的state
    goodsList(state) {
        //数据回来了正常，如果网络慢了则返回一个空数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }
};


export default {
    state,
    mutations,
    actions,
    getters,
}