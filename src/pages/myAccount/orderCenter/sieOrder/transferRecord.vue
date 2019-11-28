<template>
  <div class="transferRecord">
    <div class="mobile">
      <div class="management-head">
        <div class="head">
          <div class="back" @click="$router.push('sieMoney')"></div>
          <div class="title">SIE{{$t('sieOrderDetail.text17')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="mobile-content">
        <ul class="mobile-tab">
          <li :class="{tabActive: orderTab === 1}" @click="unFinished()">{{$t('sieOrderDetail.text18')}}</li>
          <li :class="{tabActive: orderTab === 2}" @click="finished()">{{$t('sieOrderDetail.text19')}}</li>
        </ul>
        <div class="mobile-box">
          <ul class="tradeCenter" v-if="orderTab === 1">
            <li  v-for="(item,index) in sieTradeList" :key="index"  @click="toDetail(item)">
              <div class="left-dc">
                <div class="number">{{$t('sieOrderDetail.text20')}}: {{item.id}}</div>
                <div class="buy-time">{{$changeDate(item.createAt, '/')}}</div>
              </div>
              <div class="right-dc">
                <div class="buy-money"><span v-if="item.etype === 1">{{$t('sieOrderDetail.text21')}}</span><span v-if="item.etype === 2">{{$t('sieOrderDetail.text22')}}</span>{{$t('sieOrderDetail.text6')}}: {{item.amount | fourNumber}} SIE</div>
                <div class="status">{{tradeStatus(item.state)}}</div>
              </div>
            </li>
            <div v-if="sieTradeList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
            <v-turnPage v-if="sieTradeList.length !== 0" :propsPage="sieTradeTotal" @sieTradeTrun="rechargeTurnPage" ref="turnPage"></v-turnPage>
          </ul>
          <ul class="tradeCenter" v-if="orderTab === 2">
            <li v-for="(item,index) in FinishList" :key="index" @click="toDetail(item)">
              <div class="left-dc">
                <div class="number">{{$t('sieOrderDetail.text20')}}: {{item.id}}</div>
                <div class="buy-time">{{$changeDate(item.createAt, '/')}}</div>
              </div>
              <div class="right-dc">
                <div class="buy-money"><span v-if="item.etype === 1">{{$t('sieOrderDetail.text21')}}</span><span v-if="item.etype === 2">{{$t('sieOrderDetail.text22')}}</span>{{$t('sieOrderDetail.text6')}}: {{item.tradeAmount  | fourNumber}} SIE</div>
                <div class="status">{{tradeStatus(item.state)}}</div>
              </div>
            </li>
            <div v-if="FinishList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
            <v-turnPage v-if="FinishList.length !== 0" :propsPage="finishedTotal" @finishedTrun="finishedTurnPage" ref="turnPage"></v-turnPage>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      orderTab: 1, // 1转账 2交易
      sieTradeList: [], // 交易列表
      FinishList: [],
      finishedTotal: 1,
      sieTradeTotal: 1, // 查看交易总页数
      sieTradeNowPage: '',
      finishedNowPage: '',
      pageSize: 10
    }
  },
  mounted () {
    let self = this
    window.onresize = function () {
      self.getPathSelf()
    }
    this.getTradeList(1)
    this.getFinishList(1)
  },
  methods: {
    unFinished () {
      this.getTradeList(1)
      this.orderTab = 1
      if (this.orderTab === 1) {
        if (this.$refs.turnPage) {
          this.$refs.turnPage.resetPage(1)
        }
      }
    },
    finished () {
      this.orderTab = 2
      this.getFinishList(1)
      if (this.orderTab === 2) {
        if (this.$refs.turnPage) {
          this.$refs.turnPage.resetPage(1)
        }
      }
    },
    // 交易列表
    getTradeList (page) {
      let url = `${this.$api}/coinentrustRecord/getRecord?pageNo=${page}&pageSize=${this.pageSize}&status=1`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.sieTradeList = res.data.data.results
          this.sieTradeTotal = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getFinishList (page) {
      let url = `${this.$api}/coinentrustRecord/getRecord?pageNo=${page}&pageSize=${this.pageSize}&status=2`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.FinishList = res.data.data.results
          this.finishedTotal = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 交易状态
    tradeStatus (type) {
      if (type === 1 || type === 3) {
        return this.$t('usdOrder.text39')
      } else if (type === 2 || type === 4) {
        return this.$t('usdOrder.text40')
      } else if (type === 5 || type === 6) {
        return this.$t('usdOrder.text41')
      }
    },
    getPathSelf () {
      if (this.$route.path === '/account/transferRecord') {
        if (window.innerWidth > 1200) {
          this.$router.push('/account/sieOrder')
        }
      }
    },
    toDetail (item) {
      this.$router.push({
        path: '/account/sieOrder/sieOrderDetail',
        query: {
          obj: JSON.stringify({
            id: item.id,
            buyCurrency: item.buyCurrency,
            sellCurrency: item.sellCurrency,
            cashAmount: item.cashAmount,
            tradeCashAmount: item.tradeCashAmount,
            createAt: item.createAt,
            etype: item.etype,
            state: item.state,
            price: item.price,
            tradeAmount: item.tradeAmount,
            amount: item.amount,
            actNo: item.actNo
          })
        }
      })
    },
    rechargeTurnPage (page) {
      this.sieTradeNowPage = page
      this.getTradeList(page)
    },
    finishedTurnPage (page) {
      this.finishedNowPage = page
      this.getFinishList(page)
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
    vLoading: resolve => require(['@/components/loading.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.transferRecord
  .mobile
    @media screen and (max-width: 1200px) {
    display: block;
    }
    .mobile-content
      padding 0 5px
      .mobile-tab
        margin-top 20px
        margin-bottom 20px
        display flex
        width 100%
        li
          flex 1
          height 40px
          line-height 38px
          text-align center
          border 1px solid #032e43
          color #181818
          font-size 16px
          border-radius 4px
          &:first-child
            border-bottom-right-radius 0
            border-top-right-radius 0
          &:last-child
            border-bottom-left-radius 0
            border-top-left-radius 0
          &.tabActive
            background-color #032e43
            color #fff
      .mobile-box
        ul
          li
            height 70px
            align-items center
            padding 0 10px
            font-size 12px
            &:nth-child(odd)
              background-color #edeff1
            &:nth-child(even)
              background-color #fafafa
            .left-dc
              padding-top 10px
              display flex
              justify-content space-between
              color #181818
              .number
                margin-bottom 10px
            .right-dc
              display flex
              justify-content space-between
              align-items center
              .buy-time
                margin-bottom 10px
                color #999
              .status
                color #171717
                text-align right

</style>
