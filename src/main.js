import Vue from 'vue'
import App from './App.vue'
//三级联动注册为全局组件
import TypeNav from '@/pages/Home/TypeNav';
Vue.config.productionTip = false
//使用Vue.component注册为全局组件
Vue.component(TypeNav.name,TypeNav);
//引入路由
import router from '@/router'
new Vue({
  render: h => h(App),
  //注册路由
  router
}).$mount('#app')
