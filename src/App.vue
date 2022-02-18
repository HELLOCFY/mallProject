<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件 -->
    <router-view></router-view>
    <!-- 在Home和Search中显示，其余的隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入header组件
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //由于App.vue中的mounted只执行一次故只需要将公用组件的发请求的触发写到此处只发一次请求
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
#app {
}
</style>
