import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
const state={
    goodInfo:{},
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
}
const actions={
    //获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId);
        if(result.code==200){
            commit('GETGOODINFO',result.data);
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 因为服务器没有返回额外的数据所以不要三连环
        let result=await reqAddOrUpdateShopCart(skuId,skuNum);
        //加入购物车成功
        if(result.code==200){
            return "ok";
        }
        else{
            return Promise.reject(new Error("fail"))
        }
    }
}
const getters={
    //路径导航简化
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    //产品信息的简化
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
}
export default{
    state,
    mutations,
    getters,
    actions
}