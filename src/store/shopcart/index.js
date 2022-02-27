import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
}
const actions = {
    //获取购物车列表的数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code) {
            commit("GETCARTLIST", result.data);
        }
    },
    //删除购物车的某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    //修改购物车产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    deleteAllCheckedCart({ dispatch, getters }) {
        //context其实就是小仓库 包括里面的所有的数据
        //获取购物车中的全部数组
        let PromiseAll=[];
        getters.cartList.cartInfoList.forEach(item => {
            let promise=item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : "";
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
    },
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseAll=[];
        getters.cartList.cartInfoList.forEach(item => {
            let promise=dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
    //计算出来的购物车的数剧
    // cartInfoList(state){
    //     return state.cartList[0]
    // }
}
export default {
    state,
    mutations,
    actions,
    getters,
}