<template>
  <div class="">
    <div id="fixed-top-header">
      <div class="back" @click="$router.push('/account/AssetManagement')">
        <div class="icon"></div>
      </div>
      <h3 class="fixed-title">BTC{{$t('usdOrder.text11')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="management-content">
      <div class="user-property">
        <div class="property-title">BTC {{$t('sieMoney.text12')}} :</div>
        <div class="property">
          <span>{{userBalanceBTC | eightNumber}}</span> <i>BTC</i>
        </div>
      </div>
      <div class="record-con" @click="$router.push({path: '/account/rechargeRecord', query: {status: 2}})"> <!-- 币种为btc的订单充值记录 -->
        <span class="text">{{$t('usdOrder.text13')}}</span>
        <div class="icon"><img src="../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
      </div>
      <div class="record-con" @click="$router.push({path: '/account/withdrawalRecord', query: {status: 2}})"> <!-- 币种为btc的订单提现记录 -->
        <span class="text">{{$t('usdOrder.text14')}}</span>
        <div class="icon"><img src="../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
      </div>
    </div>
    <div class="btn-wrapper">
      <span class="btn" @click="$router.push('/account/transfer')">{{$t('sieMoney.text3')}}</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    methods: {
      routeRedirect() {
        if (window.innerWidth > 1200 && this.$route.path === '/account/AssetManagement/BTCAsset') {
          this.$router.push('/account/myAccount')
        }
      },
      back() {
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
        'userBalanceBTC'
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
      margin 30px 0
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
    .record-con
      cursor pointer
      display: flex
      align-items center
      justify-content space-between
      padding: 0 15px
      height: 50px
      background-color: #f0f2f5
      margin-bottom: 20px
      -webkit-tap-highlight-color:transparent;
      &:last-child
        margin-bottom: 0
      .text
        font-size: 14px
        color #181818
      .icon
        width: 9px
        img
          width: 100%
          display block
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
