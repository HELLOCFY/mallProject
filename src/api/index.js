//管理所有的api接口
//import { get } from "core-js/core/dict";??????????????????????????这个东西哪来的？？？
import requests from "./request";

//三级联动的接口
///api/product/getBaseCategoryList get 无参数
//发请求
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })