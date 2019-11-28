<template>
  <div class="usdOrder">
    <div class="pc">
      <div class="pc-content">
        <div class="order-title">
          <h6>BTC{{$t('usdOrder.text2')}}</h6>
        </div>
        <div class="order-content">
          <ul class="order-tab">
            <!--     @click="$router.push('/account/usdRecharge')"-->
            <li :class="{tabActive: orderTab === 1}" @click="toDeposit()">{{$t('usdOrder.text1')}}</li>
            <li :class="{tabActive: orderTab === 2}" @click="toWithd()">{{$t('usdOrder.text3')}}</li>
            <!--<li :class="{tabActive: orderTab === 3}" @click="toTrade()">{{$t('usdOrder.text4')}}</li>-->
            <!--<li :class="{tabActive: orderTab === 4}" @click="toTransfer()">{{$t('sieMoney.text3')}}</li>-->
          </ul>
          <div class="dotted-line"></div>
          <!--充值列表-->
          <table class="commonTableList" v-if="orderTab === 1">
            <thead>
            <tr>
              <td>{{$t('usdOrder.text5')}}</td>
              <td class="time">{{$t('usdOrder.text6')}}</td>
              <td class="time">{{$t('usdOrder.text7')}}</td>
              <td>{{$t('usdOrder.text8')}}</td>
              <td>{{$t('usdOrder.text9')}}</td>
            </tr>
            </thead>
            <tbody >
            <tr v-for="(item,index) in rechargeList" :key="index" class="cursor" @click="toRecharge(item)">
              <td>{{item.id}}</td>
              <td class="time">{{item.depositAmount | eightNumber}} BTC</td>
              <td class="time">{{$changeDate(item.createAt, '/')}}</td>
              <td>{{orderStatus(item.status,item.payStatus, item.problemStatus)}}</td>
              <td class="handle">{{$t('usdOrder.text10')}}</td>
            </tr>
            </tbody>
            <div v-if="rechargeList.length === 0" class="queryErr">{{$t('orderManage.text8')}}</div>
            <v-turnPage v-show="rechargeList.length !== 0" :propsPage="rechargeTotal" @rechargeTrun="rechargeTurnPage"></v-turnPage>
          </table>
          <!--提现列表-->
          <table class="commonTableList" v-if="orderTab === 2">
            <thead>
            <tr>
              <td>{{$t('usdOrder.text5')}}</td>
              <td class="time">{{$t('usdOrder.text6')}}</td>
              <td class="time">{{$t('usdOrder.text7')}}</td>
              <td>{{$t('usdOrder.text8')}}</td>
              <td>{{$t('usdOrder.text9')}}</td>
            </tr>
            </thead>
            <tbody >
            <tr v-for="(item,index) in withdrawList" :key="index"   class="cursor" @click="toWithdraw(item)">
              <td>{{item.id}}</td>
              <td class="time"><span>{{item.drawAmount | eightNumber}}</span> BTC</td>
              <td class="time">{{$changeDate(item.createAt, '/')}}</td>
              <td>{{withStatus(item.status,item.payStatus, item.problemStatus)}}</td>
              <td class="handle">{{$t('usdOrder.text10')}}</td>
            </tr>
            </tbody>
            <div v-if="withdrawList.length === 0" class="queryErr">{{$t('orderManage.text8')}}</div>
            <v-turnPage v-show="withdrawList.length !== 0" :propsPage="withdrawTotal" @withdrawTrun="withdrawTurnPage"></v-turnPage>
          </table>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="manageUSD">
        <div id="fixed-top-header">
          <div class="back" @click="$router.push('/account/AssetManagement')"><div class="icon"></div></div>
          <h3 class="fixed-title">USD{{$t('usdOrder.text11')}}</h3>
          <div class="padding">
            <div class="dashed-line margin"></div>
          </div>
        </div>
        <div class="manage-cont">
          <div class="usd-money-w">
            <div class="moeny-t">USD{{$t('usdOrder.text12')}}：</div>
            <div class="money-num">{{$fourNumber2(userBalanceUSD)}} USD</div>
          </div>
          <div class="dashed-line"></div>
          <div class="ma-r">
            <div class="record-con" @click="$router.push('/account/rechargeRecord')">
              <span class="text">{{$t('usdOrder.text13')}}</span>
              <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
            </div>
            <div class="record-con" @click="$router.push('/account/withdrawalRecord')">
              <span class="text">{{$t('usdOrder.text14')}}</span>
              <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
            </div>
            <!--交易订单记录 -->
            <div class="record-con" @click="$router.push('/account/usdTradeRecord')">
              <span class="text">USD{{$t('usdOrder.text15')}}</span>
              <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
            </div>
            <div class="record-con" @click="$router.push('/account/usdTransferRecord')">
              <span class="text">USD{{$t('sieMoney.text10')}}</span>
              <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
            </div>
          </div>
        </div>
        <div class="fixed-bottom">
          <div class="btn btn-deposit" @click="$router.push('/account/usdRecharge')">{{$t('usdOrder.text16')}}</div>
          <div class="btn btn-deposit" @click="$router.push('/account/usdWithdrawMoney')">{{$t('usdOrder.text17')}}</div>
          <div class="btn btn-deposit" @click="$router.push('/account/transfer')">{{$t('sieMoney.text3')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        orderTab: 1, // 1充值 2提现 3交易
        rechargeList: [], // 充值列表
        withdrawList: [], // 提现列表
        usdTradeList: [], // 交易列表
        transferList: [], // 转账列表
        rechargeTotal: 1, // 查看充值总页数
        withdrawTotal: 1, // 查看提现总页数
        usdTradeTotal: 1, // 查看交易总页数
        rechargeNowPage: '', // 当前页数
        withdrawNowPage: '',
        usdTradeNowPage: '',
        transferPage: '',
        pageSize: 10,
        status: 2
      }
    },
    computed: {
      ...mapGetters([
        'userBalanceUSD'
      ])
    },
    created () {
      this.getDepositList(1)
    },
    methods: {
      toDeposit () {
        this.orderTab = 1
        this.getDepositList(1)
      },
      toWithd () {
        this.orderTab = 2
        this.getWithdrawList(1)
      },
      toTrade () {
        this.orderTab = 3
        this.getTradeList(1)
      },
      toTransfer () {
        this.orderTab = 4
        this.getTransferList(1)
      },
      // 充值列表
      getDepositList (page) {
        let url = `${this.$api}/deposit/queryDepositList?pageSize=${this.pageSize}&pageIndex=${page}&status=${this.status}`
        this.$http.post(url).then(res => {
          if (res.data.success) {
            // console.log(res.data)
            this.rechargeList = res.data.data
            this.rechargeTotal = res.data.mapData.totalpage
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 提现列表
      getWithdrawList (page) {
        let url = `${this.$api}/draw/queryMyOrderList?pageSize=${this.pageSize}&pageIndex=${page}&status=${this.status}`
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
      // 交易列表
      getTradeList (page) {
        let url = `${this.$api}/coinentrustRecord/getRecord?pageNo=${page}&pageSize=${this.pageSize}`
        this.$http.post(url).then(res => {
          if (res.data.success) {
            // console.log(res.data)
            this.usdTradeList = res.data.data.results
            this.usdTradeTotal = res.data.data.totalPage
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 转账列表
      getTransferList (page) {
        let url = `${this.$api}/transferRecord/transferToRecordList?page=${page}&pageSize=${this.pageSize}&type=3`
        this.$http.post(url).then(res => {
          if (res.data.success) {
            // console.log(res.data)
            this.transferList = res.data.data.transferRecordVoList
            this.transferTotal = res.data.data.totalPage
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 充值状态
      // 订单状态
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
          return this.$t('usdOrder.text29') // 审核中
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
      // 交易类型
      tradeType (val) {
        if (val === 1) {
          return this.$t('usdOrder.text37')
        } else if (val === 2) {
          return this.$t('usdOrder.text38')
        }
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
      ordStatus (val, type) {
        if (val === 1) {
          return this.$t('sieOrder.text1')
        } else if (val === 2) {
          return this.$t('sieOrder.text2')
        } else if (val === 3) {
          return this.$t('sieOrder.text3')
        } else if (val === 4) {
          return this.$t('sieOrder.text4')
        } else if (val === 5) {
          return this.$t('sieOrder.text5')
        } else if (val === 6) {
          return this.$t('sieOrder.text6')
        } else if (val === 7) {
          return this.$t('sieOrder.text7')
        } else if (val === 8) {
          return this.$t('sieOrder.text8')
        } else if (val === 9 || (val === 17)) {
          return this.$t('sieOrder.text9')
        } else if ((val === 10 || val === 11 || val === 12 || val === 18 || val === 20)) { // 10,11,12,18 显示为 "处理中"
          return this.$t('sieOrder.text10')
        } else if (val === 13) {
          if (type === 3) {
            return this.$t('sieOrder.text11')
          }
          return this.$t('sieOrder.text12')
        } else if ((val === 14 || val === 15 || val === 19)) { // 14,15,19 显示为"转出失败"
          if (type === 3) {
            return this.$t('sieOrder.text13')
          }
          return this.$t('sieOrder.text14')
        } else if (val === 16) {
          return this.$t('sieOrder.text15')
        } else if (val === 17) {
          return this.$t('sieOrder.text16')
        } else if (val === 18) {
          return this.$t('sieOrder.text17')
        } else if (val === 19) {
          return this.$t('sieOrder.text18')
        }
      },
      recordType (val) {
        if (val === 1) {
          return this.$t('sieMoney.text15')// 转入
        } else if (val === 2) {
          return this.$t('sieMoney.text16') // 转出到第三方
        } else if (val === 3) {
          return this.$t('sieMoney.text15') // 转入(内部转入)
        } else if (val === 4) {
          return this.$t('sieMoney.text16') // 内部转出
        }
      },
      // 跳转充值详情
      toRecharge (item) {
        this.$router.push({
          path: '/account/btcOrder/btcRechargeInfo',
          query: {
            id: item.id
          }
        })
      },
      // 跳转提现详情
      toWithdraw (item) {
        this.$router.push({
          path: '/account/btcOrder/btcWithSwitchBoss/btcWithInfo',
          query: {
            id: item.id
          }
        })
      },
      // 跳转转账详情
      toTransferDetail (item) {
        this.$router.push({
          path: '/account/usdOrder/usdTransferDetail',
          query: {
            id: item.id,
            orderStatus: item.orderStatus,
            totalValue: item.totalValue,
            recordType: item.recordType,
            transactionTime: item.transactionTime,
            receiveWalletAddress: item.receiveWalletAddress,
            sendCurrency: item.sendCurrency,
            receiveName: item.receiveName,
            sendName: item.sendName,
            sendAddress: item.sendAddress
          }
        })
      },
      // usd交易详情
      toDetail (item) {
        this.$router.push({
          path: '/account/usdOrder/usdTradeDetail',
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
        this.rechargeNowPage = page
        this.getDepositList(page)
      },
      withdrawTurnPage (page) {
        this.withdrawNowPage = page
        this.getWithdrawList(page)
      },
      usdTradeTurnPage (page) {
        this.usdTradeNowPage = page
        this.getTradeList(page)
      },
      transferTurnPage (page) {
        this.transferPage = page
        this.getTransferList(page)
      }
    },
    components: {
      vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
      vLoading: resolve => require(['@/components/loading.vue'], resolve)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .usdOrder
    .pc
      @media screen and (max-width: 1200px) {
        display: none;
      }
      .pc-content
        padding-left 92px
        padding-right 20px
        @media screen and (max-width: 1500px) {
          width 100%
        }
        .order-title
          margin-bottom 60px
          h6
            background-color #edeff1;
            height: 64px;
            font-size:22px;
            color: #181818;
            align-items: center;
            display: flex;
            &:before
              content: '';
              width: 10px;
              height: 22px;
              display: inline-block;
              background-color: #000;
              margin-right: 28px;
        .order-content
          .order-tab
            display flex
            width 100%
            margin-bottom 50px
            li
              width 240px
              height 58px
              line-height 56px
              text-align center
              background-color #edeff1
              border-radius 4px
              margin-left 20px
              font-size 20px
              color #181818
              cursor pointer
              user-select none
              &:first-child
                margin-left 0
              &.tabActive
                background-color #fc534c
                color #fff
              @media screen and (max-width: 1500px) {
                width 180px
              }
          .dotted-line
            border-bottom 1px dashed #b3b3b3
          .commonTableList
            padding: 0
            margin-left: 0
            margin-top 50px
    .mobile
      margin-top 0
      padding-top 90px
      @media screen and (max-width: 1200px) {
        display: block;
      }
      .manageUSD
        #fixed-top-header
          border-bottom none
        .padding
          padding: 0 15px
          .margin
            margin-top: 50px
        .dashed-line
          width: 100%
          height: 1px
          background: url("../../../../assets/images/myAccount/dashed.png") repeat-x
        .manage-cont
          padding: 0 15px
          min-height calc(100vh - 140px)
          .usd-money-w
            padding-bottom: 30px
            color #181818
            .moeny-t
              font-size: 14px
              margin-bottom: 20px
            .money-num
              font-weight bold
              font-size: 20px
          .ma-r
            padding-top: 30px
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
        .fixed-bottom
          width: 100%
          height: 50px
          display flex
          align-items center
          .btn
            flex 1
            display: flex
            align-items center
            justify-content center
            color #ffffff
            font-size: 18px
            height: 50px
            cursor pointer
            border-right 1px solid #fff
            &:nth-child(3)
              border-right none
          .btn-deposit
            background-color: #fc534c
</style>
