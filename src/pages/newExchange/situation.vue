<template>
  <div class="mobile">
    <div class="situation">
      <div id="fixed-top-header">
        <div class="back" @click="$router.push('/newExchange')"><div class="icon"></div></div>
        <h3 class="fixed-title">{{$t('newAdd.text9')}}</h3>
        <div class="padding">
          <div class="dashed-line margin"></div>
        </div>
      </div>
      <div class="priceBox-title">
        <span class="priceBox-title-lf"><i></i>{{$t('exchange.text27')}}</span>
      </div>
      <div class="new">
        <div class="new-title">
          <span>{{$t('exchange.text40')}}</span>
          <span class="more-width">{{$t('exchange.text41')}}</span>
          <span>{{$t('exchange.text42')}}</span>
        </div>
        <ul class="new-list">
          <li v-for="item in marketList" :key="item.index" @click="refresh(item.currency, item.change)">
            <span>{{item.currency}}</span>
            <span class="more-width">{{item.price | eightNumber}} USD</span>
            <span :class="{isRed: item.change<0, isNormal: item.change===0, isGreen: item.change>0}">{{item.change}}%</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      marketList: [], // 行情列表
      classObject: {
        isGreen: false,
        isNormal: false,
        isRed: false
      }
    }
  },
  created () {
    this.getMarkt()
  },
  mounted () {
    var that = this
    window.onresize = function () {
      that.routeRedirect() // 解决PC端空白问题
    }
  },
  methods: {
    refresh (currency, change) { // 点击行情列表刷新币种价格
      if (currency === 'SIE') {
        localStorage.setItem('currency', 1)
      } else if (currency === 'ETH') {
        localStorage.setItem('currency', 2)
      } else if (currency === 'BTC') {
        localStorage.setItem('currency', 3)
      }
      this.$router.push({path: '/newExchange', query: {currency: currency, change: change}})
    },
    getMarkt () { // 获取行情列表
      this.$http.post(`${this.$api}/newCoinentrustRecord/market?type=1`).then((res) => {
        if (res.data.success === true) {
          this.marketList = res.data.data
          this.marketList.forEach((item) => {
            if (item.change === 0) {
              this.classObject.isNormal = true
            } else if (item.change > 0) {
              this.classObject.isGreen = true
            } else {
              this.classObject.isRed = true
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    routeRedirect () {
      if (window.innerWidth > 1200 && this.$route.path === '/situation') {
        this.$router.push('/newExchange')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .isRed
    color #FC534C
  .isNormal
    color #000
  .isGreen
    color #10d1a1
  .mobile
    margin-top 0
    padding-top 80px
    @media screen and (max-width: 1200px) {
      display: block;
    }
    .situation
      #fixed-top-header
        border-bottom none !important
        .padding
          padding: 0 15px
          .margin
            margin-top: 50px
          .dashed-line
            width: 100%
            height: 1px
            background: url("../../assets/images/myAccount/dashed.png") repeat-x
      .priceBox-title
        padding 10px 0
        padding-right 10px
        margin 0 15px
        background-color #edeff1
        font-size 16px
        display flex
        align-items center
        justify-content space-between
        color #181818
        .priceBox-title-lf
          display flex
          align-items center
          font-size 14px
          i
            display inline-block
            width 5px
            height 15px
            background-color #000
            margin-right 15px
      .new
        flex .4
        padding 0 15px
        font-size 14px
        color #181818
        .new-title
          flex 1
          display flex
          flex-direction row
          justify-content space-between
          padding 10px
          span
            flex .9
            text-align center
            color #181818
          .more-width
            flex 1.2
        .new-list
          color #181818
          li
            flex 1
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            padding 10px
            &:nth-child(odd)
              background-color #edeff1
              .change-color
                color #0ac88a
            &:nth-child(even)
              .change-color
                color #fc534c
            span
              flex .9
              text-align center
            .more-width
              flex 1.2
</style>
