//管理所有的api接口
//import { get } from "core-js/core/dict";??????????????????????????这个东西哪来的？？？
import requests from "./request";
import mockRequests from "./mockRequest.js";
//三级联动的接口
///api/product/getBaseCategoryList get 无参数
//发请求
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });

//获取floor数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' });

//获取搜索模块数据 /api/list 请求方式：post 
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }
//params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: 'post', data: params })
//获取产品详情信息
// /api/item/{ skuId }
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})
//6.添加到购物车(对已有物品进行数量改动)  /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum} `,method:'post'});
//获取购物车数据 /api/cart/cartList get
export const reqCartList=()=>requests({url:"/cart/cartList",method:'get'})
//删除购物车商品  /api/cart/deleteCart/{skuId}     DELETE
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});
//切换商品的选择状态
//     /api/cart/checkCart/{skuId}/{isChecked}  get
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
//获取验证码 /api/user/passport/sendCode/{phone} method:get
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
//用户注册 /api/user/passport/register  post  phone code password
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'});
//登录的接口 /api/user/passport/login post
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'});
// 通过token获取用户信息 /api/user/passport/auth/getUserInfo
export const reqUserInfo=()=>requests({url:"/user/passport/auth/getUserInfo",method:'get'});
//退出登录 api/user/passport/logout get
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'});
//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo=()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:'GET'})
//获取交易页面清单 /api/order/auth/trade get
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:"get"});
//提交订单   /api/order/auth/submitOrder?tradeNo={tradeNo}    post
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo} `,data,method:'post'});
//获取订单支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo=(orderId)=> requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});