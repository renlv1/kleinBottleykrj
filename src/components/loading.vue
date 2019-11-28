<template>
  <div class="load-more-box">
    <p class="desc">{{$t('danAI.text51')}}</p>
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
  //  加载中的样式
  .load-more-box
    .desc
      font-size: 16;
      color: #181818;
      text-align: center;
      margin-top: 20px;
    .loading-img
      width: 80px;
      height: 80px;
      margin: 30px auto 0;
      img
        width: 100%
        height: 100%
</style>
