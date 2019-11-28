<template>
  <div class="AssetManagement">
    <div class="head-mobile">
      <div class="back-mobile" @click="back()"></div>
      <div class="title-mobile">{{$t('newAdd.text2')}}</div>
    </div>
    <ul class="myAccountPH-list">
      <router-link to="/account/usdOrder" tag="li">
        <div class="li-lf">
          <h3>{{$t('myAccount.text8')}}：</h3>
          <p>{{$fourNumber2(userBalanceUSD)}} USD</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon"></i>
        </div>
      </router-link>
      <router-link to="sieMoney" tag="li">
        <div class="li-lf">
          <h3>{{$t('myAccount.text9')}}：</h3>
          <p>{{$fourNumber2(userBalanceSIE)}} SIE</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon"></i>
        </div>
      </router-link>
      <router-link to="/account/AssetManagement/ETHAsset" tag="li">
        <div class="li-lf">
          <h3>ETH {{$t('newAdd.text1')}}：</h3>
          <p>{{userBalanceETH | eightNumber}} ETH</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon"></i>
        </div>
      </router-link>
      <router-link to="/account/AssetManagement/BTCAsset" tag="li">
        <div class="li-lf">
          <h3>BTC {{$t('newAdd.text1')}}：</h3>
          <p>{{userBalanceBTC | eightNumber}} BTC</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon"></i>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    methods: {
      ...mapActions([
        'balanceAction'
      ]),
      routeRedirect () {
        if (window.innerWidth > 1200) {
          this.$router.push('/account/myAccount')
        }
      },
      back() {
        this.$router.push('/account/myAccount')
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
        'userBalanceUSD',
        'userBalanceSIE',
        'userBalanceETH',
        'userBalanceBTC'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .myAccountPH-list
    font-size 12px
    color #181818
    margin-top 70px
    padding: 0 20px;
    li
      display flex
      align-items center
      justify-content space-between
      padding 15px
      background-color #f0f2f5
      border-radius 3px
      margin-bottom 10px
      .li-lf
        h3
          font-size 12px
          margin-bottom 5px
          color #999999
      .li-rt
        span
          color #003399
          margin-right 2px
        .arrowIcon
          display inline-block
          width: 6px;
          height: 9px;
          background url("../../../assets/images/myAccount/right-row.png") no-repeat
          background-size: cover;
      &.li-activity
        display block
        padding 0
        overflow hidden
        h3
          height 35px
          display flex
          align-items center
          font-size 14px
          background-color #e6e8eb
          i
            display block
            width 5px
            height 10px
            background-color #032e43
            margin-right 10px
        .li-activity-bt
          padding 15px
          .activity-item
            display flex
            justify-content space-between
            margin-bottom 10px
            i
              color #181818
            a
              color #181818
              i
                color #003399
            &:last-child
              margin-bottom 0
              a
                color #003399
</style>
