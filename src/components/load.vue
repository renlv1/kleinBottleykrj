<template>
  <div class="load-more-box">
    <p class="desc"></p>
    <div class="loading-img">
      <img src="../assets/images/aiChat/loading.gif" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  //正在加载中样式
  .load-more-box
    padding-bottom: 30px
    .desc
      font-size: 24px
      color #fff
      text-align: center
      margin-top: 30px
    .loading-img
      width: 50px
      height: 50px
      margin: 30px auto 0
      img
        width: 100%
        height: 100%
</style>
