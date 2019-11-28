<template>
  <div class="">
    <div id="fixed-top-header">
      <div class="back" @click="$router.push('/account/AssetManagement')"><div class="icon"></div></div>
      <h3 class="fixed-title">ETH {{$t('usdOrder.text11')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="management-content">
      <div class="user-property">
        <div class="property-title">ETH {{$t('sieMoney.text12')}} :</div>
        <div class="property">
          <span>{{userBalanceETH | eightNumber}}</span> <i>ETH</i>
        </div>
      </div>
  </div>
    <ul class="user-list">
      <!-- 交易订单记录-->
      <li @click="$router.push('/account/AssetManagement/ETHAsset/ETHTrans')">
        <div class="record">ETH {{$t('sieMoney.text10')}}</div>
        <div class="right-icon"><img src="../../../assets/images/sieMoney/right.png"></div>
      </li>
    </ul>
    <div class="btn-wrapper">
      <span class="btn"  @click="$router.push('/account/transfer')">{{$t('sieMoney.text3')}}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    methods: {
      routeRedirect () {
        if (window.innerWidth > 1200 && this.$route.path === '/account/AssetManagement/ETHAsset') {
          this.$router.push('/account/myAccount')
        }
      },
      back () {
        this.$router.go(-1)
      }
    },
    mounted() {
      var that = this
      window.onresize = function () {
        that.routeRedirect() // 解决PC端空白问题
      }
    },
    computed: {
      ...mapGetters([
        'userBalanceETH'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #fixed-top-header
    border-bottom none !important
  .management-content
    margin-top 70px
    padding 0 20px
    .user-property
      margin-top 30px
      height 100px
      position relative
      &:before{
        content: '';
        width: 100%;
        height: 1px;
        background-image: url("../../../assets/images/aiChat/dottedLine.png");
        position: absolute;
        top: 100px;
      }
      .property-title
        font-size 16px
        color #181818
        margin-bottom 15px
      .property
        font-size 24px
        color #181818
        padding-bottom 30px
    .user-information
      margin-top 30px
      .user-list
        li
          display flex
          justify-content space-between
          align-items center
          padding 0 15px
          font-size 16px
          color #181818
          border-radius 4px
          height 50px
          background-color #f0f2f5
          margin-bottom 10px
  .user-list
    margin-top 50px
    padding 0 20px
    li
      display flex
      justify-content space-between
      align-items center
      padding 0 15px
      font-size 16px
      color #181818
      border-radius 4px
      height 50px
      background-color #f0f2f5
      margin-bottom 10px
  .btn-wrapper
    width 100%
    height 100%
    position relative
    .btn
      font-size 18px
      color #fff
      line-height 50px
      text-align center
      display inline-block
      position fixed
      bottom 0
      width 100%
      height 50px
      background  #fc534c

</style>
