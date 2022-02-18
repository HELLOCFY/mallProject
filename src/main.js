import Vue from 'vue'
import App from './App.vue'
//三级联动注册为全局组件吧
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
Vue.config.productionTip = false
//使用Vue.component注册为全局组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination)
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入mockServe让其执行一次,只要其执行一次不用管其是否进行了暴露，只要引入，里面的代码就会全部执行一次
import '@/mock/mockServe.js'

import "swiper/css/swiper.css"

new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this;
  },
  //注册路由
  router,
  //注册仓库:组件实例对象上面会加入一个属性$store
  store
}).$mount('#app')
