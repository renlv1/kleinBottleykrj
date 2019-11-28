<template>
  <div id="app">
    <input type="text" name="username" style="display:none;">
    <input type="password" name="password" style="display:none;">
    <v-header></v-header>
    <router-view />
    <v-footer></v-footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    vHeader: resolve => require(['./components/header.vue'], resolve),
    vFooter: resolve => require(['./components/footer.vue'], resolve)
  }
}
</script>

<style lang="less">
  @import 'assets/css/reset.css';
  @import 'assets/css/common.css';
  @import "assets/css/style";
  @import "assets/css/owned";
  @import "assets/css/my";
  @import "./../node_modules/element-ui/lib/theme-chalk/index.css";
</style>
