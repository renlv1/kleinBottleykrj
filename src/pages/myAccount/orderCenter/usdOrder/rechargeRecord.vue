<template>
  <div class="mobile">
    <div class="management-head">
      <div class="head">
        <div class="back" @click="$router.go(-1)"></div>
        <div class="title">{{$t('rechargeRecord.text1')}}</div>
        <div class="right"></div>
      </div>
    </div>
    <div class="mobile-content">
      <ul class="mobile-tab">
        <li :class="{tabActive: orderTab === 1}" @click="unFinished()">{{$t('rechargeRecord.text2')}}</li>
        <li :class="{tabActive: orderTab === 2}" @click="finished()">{{$t('rechargeRecord.text3')}}</li>
      </ul>
      <div class="mobile-box">
        <ul class="tradeCenter" v-if="orderTab === 1">
          <li v-for="(item,index) in rechargeList" :key="index" @click="toDetail(item)">
            <div class="left-dc">
              <div class="number">{{$t('rechargeRecord.text4')}}: {{item.id}}</div>
              <div class="buy-time">{{$changeDate(item.createAt, '/')}}</div>
            </div>
            <div class="right-dc">
              <div class="buy-money" v-show="item.depositCurrency !== 'BTC'">{{$t('rechargeRecord.text5')}}: {{item.depositAmount | fourNumber}} {{item.depositCurrency === 'BTC' ? 'BTC' : 'USD'}}</div>
              <div class="buy-money" v-show="item.depositCurrency === 'BTC'">{{$t('rechargeRecord.text5')}}: {{item.depositAmount | eightNumber}} {{item.depositCurrency === 'BTC' ? 'BTC' : 'USD'}}</div>
              <div  class="status">{{orderStatus(item.status,item.payStatus, item.problemStatus)}}</div>
            </div>
          </li>
          <div v-if="rechargeList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
          <v-turnPage v-if="rechargeList.length !== 0" :propsPage="rechargeTotal" @rechargeTrun="rechargeTurnPage" ref="turnPage"></v-turnPage>
        </ul>
        <ul class="tradeCenter" v-if="orderTab === 2">
          <li v-for="(item,index) in FinishList" :key="index" @click="toDetail(item)">
            <div class="left-dc">
              <div class="number">{{$t('rechargeRecord.text4')}}: {{item.id}}</div>
              <div class="buy-time">{{$changeDate(item.createAt, '/')}}</div>
            </div>
            <div class="right-dc">
              <div class="buy-money" v-show="item.depositCurrency !== 'BTC'">{{$t('rechargeRecord.text5')}}: {{item.depositAmount | fourNumber}} {{item.depositCurrency === 'BTC' ? 'BTC' : 'USD'}}</div>
              <div class="buy-money" v-show="item.depositCurrency === 'BTC'">{{$t('rechargeRecord.text5')}}: {{item.depositAmount | eightNumber}} {{item.depositCurrency === 'BTC' ? 'BTC' : 'USD'}}</div>
              <!--<div class="buy-money" v-show="item">{{$t('rechargeRecord.text5')}}: {{item.depositAmount | fourNumber}} USD</div>-->
              <div  class="status">{{orderStatus(item.status,item.payStatus, item.problemStatus)}}</div>
            </div>
          </li>
          <div v-if="FinishList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
          <v-turnPage v-if="FinishList.length !== 0" :propsPage="finishedTotal" @finishedTrun="finishedTurnPage" ref="turnPage"></v-turnPage>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      orderTab: 1, // 1未完成 2已完成
      rechargeList: [], // 充值列表
      FinishList: [],
      rechargeTotal: 1, // 查看充值总页数
      rechargeNowPage: '', // 当前页数
      finishedNowPage: '',
      finishedTotal: 1,
      pageSize: 10,
      showLoad: true,
      flag: 1,
      status: Number(this.$route.query.status) // 1: USD 2: BTC
    }
  },
  mounted () {
    let self = this
    window.onresize = function () {
      self.getPathSelf()
    }
    this.getDepositList(1)
  },
  methods: {
    // 充值列表
    getDepositList (page) {
      let url = `${this.$api}/deposit/queryDepositList?pageSize=${this.pageSize}&pageIndex=${page}&queryType=1&status=${this.status}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.rechargeList = res.data.data
          this.rechargeTotal = res.data.mapData.totalpage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getFinishList (page) {
      let url = `${this.$api}/deposit/queryDepositList?pageSize=${this.pageSize}&pageIndex=${page}&queryType=2&status=${this.status}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.FinishList = res.data.data
          this.finishedTotal = res.data.mapData.totalpage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    unFinished () {
      this.getDepositList(1)
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
    // 充值状态
    orderStatus (type, payStatus, proStatus) { //  充值状态
      // let proStatus = this.orderData.problemStatus
      if (type === 1) {
        return this.$t('usdMoneyStatus.text1') // 待接单
      } else if (type === 2) {
        return this.$t('usdMoneyStatus.text2') // 老板拒绝接单
      } else if (type === 3 && payStatus === 3) {
        return this.$t('usdMoneyStatus.text3') // 等待完成打款
      } else if (type === 4) {
        return this.$t('usdMoneyStatus.text4') // 订单已取消
      } else if (type === 3 && payStatus === 4 && proStatus === null) {
        return this.$t('usdMoneyStatus.text5') // 等待对方确认收款
      } else if (type === 5 && payStatus === 6) {
        return this.$t('usdMoneyStatus.text6') // 订单已完成
      } else if (type === 3 && payStatus === 5 && proStatus === null) {
        return this.$t('usdMoneyStatus.text7') // 等待系统处理中
      } else if (proStatus !== null && (proStatus === 0 || proStatus === 1)) {
        return this.$t('usdMoneyStatus.text8') // 申诉中
      } else if (proStatus !== null && proStatus === 2) {
        return this.$t('usdMoneyStatus.text9') // 申诉已处理
      }
    },
    getPathSelf () {
      if (this.$route.path === '/account/rechargeRecord') {
        if (window.innerWidth > 1200) {
          this.$router.push('/account/usdOrder')
        }
      }
    },
    toDetail (item) {
      this.$router.push({
        path: '/account/usdOrder/usdRechargeInfo',
        query: {
          id: item.id
        }
      })
    },
    rechargeTurnPage (page) {
      this.rechargeNowPage = page
      this.getDepositList(page)
    },
    finishedTurnPage (page) {
      this.finishedNowPage = page
      this.getFinishList(page)
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
    vLoad: resolve => require(['@/components/load.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
