//注册和登录模块
import { reqGetCode, reqUserRegister, reqUserLogin ,reqUserInfo,reqLogout} from '@/api';
const state = {
    code: "",
    token:localStorage.getItem("TOKEN"),
    userInfo:{},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    //清楚本地数据
    CLEAR(){
        state.token='';
        state.userInfo={};
        localStorage.removeItem("TOKEN");
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        console.log(result)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    //用户进行注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //用户进行登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        console.log(result)
        if (result.code == 200) {
            //持久化存储token
            localStorage.setItem("TOKEN",result.data.token);
            commit("USERLOGIN", result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result =await reqUserInfo();
        if(result.code==200){
            commit("GETUSERINFO",result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    // 用户退出登录
    async userLogout({commit}){
        let result=await reqLogout();
        if(result.code==200){
            commit("CLEAR");
            return 'ok';
        }else{
            return Promise.reject(new Error(result.message));
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}