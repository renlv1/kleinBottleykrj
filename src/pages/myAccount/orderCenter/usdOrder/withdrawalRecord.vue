<template>
  <div class="mobile">
    <div class="management-head">
      <div class="head">
        <div class="back" @click="$router.go(-1)"></div>
        <div class="title">{{$t('rechargeRecord.text6')}}</div>
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
          <li v-for="(item,index) in withdrawList" :key="index" @click="toWithdraw(item)">
            <div class="left-dc">
              <div class="number">{{$t('rechargeRecord.text4')}}: {{item.id}}</div>
              <div class="buy-time">{{$changeDate(item.createAt, '/')}}</div>
            </div>
            <div class="right-dc">
                <div class="buy-money" v-show="item.payCurrency !== 'BTC'">{{$t('rechargeRecord.text7')}}: {{item.drawAmount | fourNumber}} {{item.payCurrency}}</div>
                <div class="buy-money" v-show="item.payCurrency === 'BTC'">{{$t('rechargeRecord.text7')}}: {{item.drawAmount | eightNumber}} {{item.payCurrency}}</div>
                <div class="status">{{withStatus(item.status,item.payStatus, item.problemStatus)}}</div>
            </div>
          </li>
          <div v-if="withdrawList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
          <v-turnPage v-if="withdrawList.length !== 0" :propsPage="withdrawTotal" @withdrawTrun="withdrawTurnPage" ref="turnPage"></v-turnPage>
        </ul>
        <ul class="tradeCenter" v-if="orderTab === 2">
          <li v-for="(item,index) in FinishList" :key="index" @click="toWithdraw(item)">
            <div class="left-dc">
              <div class="number">{{$t('rechargeRecord.text4')}}: {{item.id}}</div>
              <div class="buy-time">{{$changeDate(item.createAt, '/')}}</div>
            </div>
            <div class="right-dc">
              <div class="buy-money" v-show="item.payCurrency !== 'BTC'">{{$t('rechargeRecord.text7')}}: {{item.drawAmount | fourNumber}} {{item.payCurrency}}</div>
              <div class="buy-money" v-show="item.payCurrency === 'BTC'">{{$t('rechargeRecord.text7')}}: {{item.drawAmount | eightNumber}} {{item.payCurrency}}</div>
              <div class="status">{{withStatus(item.status,item.payStatus, item.problemStatus)}}</div>
            </div>
          </li>
          <div v-if="FinishList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
          <v-turnPage v-if="FinishList.length !== 0" :propsPage="finishedTotal" @finishedTrun1="finishedTurnPage" ref="turnPage"></v-turnPage>
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
      withdrawList: [],
      FinishList: [],
      withdrawTotal: 1,
      withdrawNowPage: '',
      finishedNowPage: '',
      finishedTotal: 1,
      pageSize: 10,
      status: Number(this.$route.query.status) // 1: USD 2: BTC
    }
  },
  mounted () {
    let self = this
    window.onresize = function () {
      self.getPathSelf()
    }
    this.getWithdrawList(1)
  },
  methods: {
    unFinished () {
      this.getWithdrawList(1)
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
    // 提现列表
    getWithdrawList (page) {
      let url = `${this.$api}/draw/queryMyOrderList?pageSize=${this.pageSize}&pageIndex=${page}&queryType=1&status=${this.status}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          // console.log(res.data)
          this.withdrawList = res.data.data
          this.withdrawTotal = res.data.mapData.totalpage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 未完成列表
    getFinishList (page) {
      let url = `${this.$api}/draw/queryMyOrderList?pageSize=${this.pageSize}&pageIndex=${page}&queryType=2&status=${this.status}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          // console.log(res.data)
          this.FinishList = res.data.data
          this.finishedTotal = res.data.mapData.totalpage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 提现状态
    withStatus (type, payStatus, proStatus) { // 提现状态
      if (type === 0) { // 提现
        return this.$t('usdOrder.text27') // 等待支付保证金
      } else if (type === 1) {
        return this.$t('usdOrder.text28') // 等待选择老板
      } else if (type === 2 && payStatus === 2) {
        return this.$t('usdOrder.text29') // 待接单
      } else if (type === 3) {
        return this.$t('usdOrder.text30') // 拒绝接单
      } else if (proStatus !== null && (proStatus === 0 || proStatus === 1)) {
        return this.$t('usdOrder.text35') // 申诉中
      } else if (proStatus !== null && proStatus === 2) {
        return this.$t('usdOrder.text36') // 申诉已处理
      } else if (type === 4) {
        return this.$t('usdOrder.text42') // 审核中
      } else if (type === 5 && payStatus === 3) {
        return this.$t('usdOrder.text31') // 等待对方打款
      } else if (type === 5 && payStatus === 4) {
        return this.$t('usdOrder.text32') // 等待您确认收款
      } else if (type === 6) {
        return this.$t('usdOrder.text44') // 审核不通过
      } else if (type === 7) {
        return this.$t('usdOrder.text45') // 用户超时未支付系统取消
      } else if (type === 8) {
        return this.$t('usdOrder.text46') // 审核不通过给用户退款成功
      } else if (type === 9) {
        return this.$t('usdOrder.text47') // 审核不通过给用户退款失败
      } else if (type === 10) {
        return this.$t('usdOrder.text48') // 打款失败退款给用户
      } else if (type === 13) {
        return this.$t('usdOrder.text49') // 其他原因打款失败
      } else if (type === 12 && payStatus === 6) {
        return this.$t('usdOrder.text33') // 订单已完成
      } else if (type === 11) {
        return this.$t('usdOrder.text34') // 订单已取消
      }
    },
    getPathSelf () {
      if (this.$route.path === '/account/withdrawalRecord') {
        if (window.innerWidth > 1200) {
          this.$router.push('/account/usdOrder')
        }
      }
    },
    toWithdraw (item) {
      this.$router.push({
        path: '/account/usdOrder/usdWithSwitchBoss/usdWithInfo',
        query: {
          id: item.id
        }
      })
    },
    withdrawTurnPage (page) {
      this.withdrawNowPage = page
      this.getWithdrawList(page)
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
              align-items center
              justify-content space-between
              .buy-time
                margin-bottom 10px
                color #999
              .status
                color #171717
                text-align right
</style>
