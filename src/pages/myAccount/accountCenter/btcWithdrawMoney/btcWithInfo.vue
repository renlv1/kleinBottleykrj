<template>
  <div class="usd-info">
    <h3 id="record-title">
      <span class="line"></span>
      <span>{{$t('usdMoney.text82')}}</span>
    </h3>
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)">
        <div class="icon"></div>
      </div>
      <h3 class="fixed-title">{{$t('usdTixian.text9')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="mobile-money">
      <p class="label-title">{{$t('usdTixian.text2')}}：</p>
      <h3 class="moneys" v-if="orderData.payCurrency === 'BTC'">{{orderData.drawAmount | eightNumber}} {{orderData.payCurrency}}</h3>
      <h3 class="moneys" v-if="orderData.payCurrency !== 'BTC'">{{orderData.drawAmount | fourNumber}} {{orderData.payCurrency}}</h3>
      <div class="dashed-line"></div>
    </div>
    <div id="order-table">
      <div class="pc-table">
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text5')}}</div>
          <div>{{orderData.id}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text6')}}</div>
          <div class="await-status processed-status">{{orderStatus(orderData.status, orderData.payStatus,
            orderData.problemStatus)}}
          </div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdTixian.text2')}}</div>
          <div v-if="orderData.payCurrency === 'BTC'">{{orderData.drawAmount | eightNumber}} {{orderData.payCurrency}}</div>
          <div v-if="orderData.payCurrency !== 'BTC'">{{orderData.drawAmount | fourNumber}} {{orderData.payCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text73')}}</div>
          <div>{{orderData.feeAmount}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text_33')}}</div>
          <div>{{orderData.drawCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdTixian.text6')}}</div>
          <div v-if="orderData.drawCurrency === 'BTC'">{{orderData.receiveAmount | eightNumber}} {{orderData.drawCurrency}}</div>
          <div v-if="orderData.drawCurrency !== 'BTC'">{{orderData.receiveAmount | fourNumber}} {{orderData.drawCurrency}}</div>
        </div>
      </div>
      <div class="mobile-table">
        <div class="flex-item">
          <div class="text-left">{{$t('usdTixian.text16')}}：</div>
          <div>{{orderData.drawCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdTixian.text15')}}：</div>
          <div v-if="orderData.drawCurrency === 'BTC'">{{orderData.receiveAmount | eightNumber}} {{orderData.drawCurrency}}</div>
          <div v-if="orderData.drawCurrency !== 'BTC'">{{orderData.receiveAmount | fourNumber}} {{orderData.drawCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text73')}}：</div>
          <div>{{orderData.feeAmount}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text6')}}</div>
          <div class="await-status processed-status">{{orderStatus(orderData.status, orderData.payStatus,
            orderData.problemStatus)}}
          </div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text12')}}：</div>
          <div>{{orderData.id}}</div>
        </div>
      </div>
    </div>
    <div class="order-dakuan-info">
      <ul class="dakuan-uls">
        <!--我的收款账户-->
        <li class="dakuan-list" v-if="myBankInfo" :class="{'hidden-account': hiddenAccount1}">
          <p class="desc desc-title pc-title">{{$t('usdMoney.text_50')}}</p>
          <h3 class="record-title mobile-title">
            <div class="line-title">
              <span class="line"></span>
              <span>{{$t('usdMoney.text_50')}}</span>
            </div>
            <div class="icon-img" @click="selecteAccount(1)">
              <div class="icon" :class="{'rotate-icon': hiddenAccount1}"></div>
            </div>
          </h3>
          <div class="money-info">
            <p class="desc">{{myBankInfo.realname}}</p>
            <p class="desc">{{myBankInfo.number}}</p>
            <p class="desc"><span>{{myBankInfo.bankname}}</span><span class="margin-left">{{myBankInfo.subbank}}</span>
            </p>
            <p class="desc" v-show="myBankInfo.subbankaddress && myBankInfo.subbankaddress !== 'null'">
              {{myBankInfo.subbankaddress}}</p>
            <p class="desc" v-show="myBankInfo.iban && myBankInfo.iban !== 'null'">IBAN：{{myBankInfo.iban}}</p>
          </div>
        </li>
        <!--收款人账户 -->
        <li class="dakuan-list" v-if="bossBankInfo" :class="{'hidden-account': hiddenAccount2}">
          <p class="desc desc-title pc-title">{{$t('usdMoney.text56')}}</p>
          <div class="record-title mobile-title">
            <div class="line-title">
              <span class="line"></span>
              <span>{{$t('usdMoney.text56')}}</span>
            </div>
            <div class="icon-img" @click="selecteAccount(2)">
              <div class="icon" :class="{'rotate-icon': hiddenAccount2}"></div>
            </div>
          </div>
          <div class="money-info">
            <p class="desc">{{bossBankInfo.realname}}</p>
            <p class="desc">{{bossBankInfo.number}}</p>
            <p class="desc"><span>{{bossBankInfo.bankname}}</span><span
              class="margin-left">{{bossBankInfo.subbank}}</span></p>
            <p class="desc" v-if="bossBankInfo.subbankaddress && bossBankInfo.subbankaddress !== 'null'">
              {{bossBankInfo.subbankaddress}}</p>
            <p class="desc" v-show="bossBankInfo.iban && bossBankInfo.iban !== 'null'">IBAN：{{bossBankInfo.iban}}</p>
            <p class="desc" v-show="bossBankInfo.username && bossBankInfo.username !== 'null'">
              {{$t('usdMoney.text47')}}：{{bossBankInfo.username}}</p>
            <p class="desc tips" v-html="$t('usdOrder.text50')"></p>
          </div>
        </li>
        <!-- 申诉内容-->
        <li class="dakuan-list shensu-bg" v-if="orderData.problemId !== null">
          <p class="desc desc-title mobile-title-shengsu">{{$t('usdMoney.text48')}}：</p>
          <p class="desc">{{userProblem.content}}</p>
          <ul class="img-uls">
            <li class="img-list" v-for="(item, index) in userProblem.images" :key="index"><img :src="item.imageUrl"
                                                                                               alt=""></li>
          </ul>
        </li>
        <!-- 申诉反馈-->
        <li class="dakuan-list shensu-bg" v-show="managerReply.length > 0">
          <p class="desc desc-title fankui-title">{{$t('usdMoney.text49')}}：</p>
          <div class="desc" v-for="(list, index) in managerReply" :key="index">
            <div class="content-boss">{{list.content}}</div>
            <div class="img-uls">
              <div class="img-list" v-for="(listimg, index) in list.images" :key="index">
                <img :src="listimg.imageUrl" alt="">
              </div>
            </div>
          </div>
        </li>
        <!-- 申诉结果 共享者胜利-->
        <li class="dakuan-list shensu-bg" v-if="orderData.bossAddress === userProblem.backup2">
          <p class="desc desc-title fankui-title">{{$t('usdMoney.text72')}}：</p>
          <p class="desc">{{$t('usdMoney.text71')}}</p>
        </li>
        <!-- 申诉结果 用户胜诉-->
        <li class="dakuan-list shensu-bg" v-if="orderData.userAddress === userProblem.backup2">
          <p class="desc desc-title fankui-title">{{$t('usdMoney.text72')}}：</p>
          <p class="desc">{{$t('usdMoney.text70')}}</p>
        </li>
      </ul>
    </div>
    <div class="btn-w">
      <!--选择老板-->
      <div class="btn" v-if="orderData.status === 1" @click="gotoSwitchBoss">{{$t('usdMoney.text50')}}</div>
      <!--支付保证金-->
      <div class="btn" v-if="orderData.status === 0" @click="payPledgeMoney">{{$t('usdMoney.text51')}}</div>
      <!--打款-->
      <div class="btn" v-if="orderData.payStatus === 4 && orderData.status === 5" @click="daKuanDialog">
        {{$t('usdMoney.text52')}}
      </div>
      <!--申诉-->
      <div class="btn"
           v-if="(orderData.status === 4 && orderData.problemStatus === null) || (orderData.status === 5 && orderData.problemStatus === null) || ((orderData.problemStatus === 0 || orderData.problemStatus === 1) && orderData.userAddress !== userProblem.userAddress)"
           @click="shenSuBtn"
           :class="{'two-btn': orderData.status === 4 && orderData.payStatus === 4 && orderData.problemStatus === null}">
        {{$t('usdMoney.text75')}}
      </div>
      <!--取消订单-->
      <div class="btn" v-if="orderData.status === 1 || orderData.status === 2"
           :class="{'two-btn': orderData.status === 1}" @click="cancelOrder">{{$t('usdMoney.text_48')}}
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="pay-dialog-transfer" v-show="showDialog" @click="showDialog = false">
      <div class="dialog-content" @click.stop>
        <div class="close-confirm" @click="showDialog = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-box">
          <div v-show="cancelDialog">
            <div v-show="cancelShow">
              <div class="confirmShow">
                <div class="dialog-title">{{$t('usdMoney.text_48')}}</div>
                <div class="dialog-text">{{$t('usdMoney.text_49')}}?</div>
              </div>
              <div class="pay-confim-btn" @click="cancelConfim">{{$t('sieTransfer.text10')}}</div>
            </div>
            <div v-show="!cancelShow">
              <div class="confirmShow">
                <!--<div class="dialog-title" >取消订单</div>-->
                <div class="dialog-text">{{cancelMsg}}</div>
              </div>
              <div class="pay-confim-btn" @click="closeConfim">{{$t('sieTransfer.text10')}}</div>
            </div>
          </div>
          <!-- 打款转账 -->
          <div v-show="dakuanShow">
            <div class="confirmShow">
              <div class="dialog-title">{{$t('usdMoney.text52')}}</div>
              <div class="dialog-text">{{$t('usdTixian.text21')}}？</div>
            </div>
            <div class="pay-confim-btn" @click="daKuanConfim">{{$t('sieTransfer.text10')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 支付验证弹窗 -->
    <pay-money-dialog :productId="productId" ref="payDialog"></pay-money-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import payMoneyDialog from '@/components/payMoneyDialog'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        productId: '',
        cancelDialog: false,
        cancelShow: true,
        showDialog: false,
        bossShow: false,
        baozhengjinShow: false,
        dakuanShow: false,
        cancelMsg: '',
        shensuShow: false,
        orderData: [],
        orderId: this.$route.query.id,
        myBankInfo: [],
        bossBankInfo: [],
        problemData: [],
        userProblem: [],
        managerReply: [],
        bankData: {},
        hiddenAccount1: false,
        hiddenAccount2: false
      }
    },
    created() {
      this.getOrderDetails()
    },
    computed: {
      shouxufei() {
        return (this.tixianFei * this.orderData.drawAmount).toFixed(4)
      },
      ...mapGetters([
        'tixianFei'
      ])
    },
    methods: {
      selecteAccount(index) {
        if (index === 1) {
          this.hiddenAccount1 = !this.hiddenAccount1
        } else {
          this.hiddenAccount2 = !this.hiddenAccount2
        }
      },
      // 3.1.2 查看申诉问题详情
      getProblem() {
        this.$http.get(`${this.$api}/problem/get?problemId=${this.orderData.problemId}`).then(res => {
          if (res.data.success === true) {
            this.problemData = res.data.data
            this.userProblem = res.data.data.userProblem
            this.managerReply = res.data.data.managerReply
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 查询订单详情
      getOrderDetails() {
        this.postRequest('/draw/queryMyOrderDetail', {
          id: this.orderId
        }).then(res => {
          if (res.data.success === true) {
            this.orderData = res.data.data
            this.myBankInfo = JSON.parse(res.data.data.drawBankAccount)
            this.bossBankInfo = JSON.parse(res.data.data.bossDrawBankAccount)
            if (this.orderData.problemId) {
              this.getProblem()
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 支付保证金弹窗
      payPledgeMoney() {
        this.productId = this.orderId
        this.$refs.payDialog.show()
        // this.bankData.amount = this.orderData.depositAmount // 金额
        // this.bankData.currency = this.orderData.drawCurrency // 币种
        // this.bankData.bankAccountId = this.myBankInfo.id // 银行卡id
        // this.bankData.isBand = '1' // 1:绑定到我的交易账户
      },
      // 查看申诉详情
      getProblemInfo() {
        this.postRequest('/problem/get', {
          problemId: '',
          pageIndex: '1',
          pageSize: '20'
        }).then(res => {
          if (res.data.success === true) {
            this.problemData = res.data.data
          } else {
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 跳转到选择老板
      gotoSwitchBoss() {
        this.$router.push({
          path: '/account/btcOrder/btcWithSwitchBoss',
          query: {id: this.orderId, isBTC: this.orderData.drawCurrency}
        })
      },
      // 打款显示弹窗
      daKuanDialog() {
        this.showDialog = true
        this.cancelDialog = false
        this.dakuanShow = true
      },
      // 打款弹窗确认
      daKuanConfim() {
        this.postRequest('/draw/confirmByStep', {
          orderId: this.orderId,
          confirmState: '4'
        }).then(res => {
          if (res.data.success === true) {
            this.showDialog = false
            this.cancelDialog = false
            this.dakuanShow = false
            this.getOrderDetails()
          } else {
            this.cancelDialog = true
            this.showDialog = true
            this.dakuanShow = false
            this.cancelShow = false
            this.cancelMsg = res.data.msg
          }
        }).catch(err => {
          this.showDialog = true
          this.dakuanShow = false
          this.cancelShow = false
          this.cancelMsg = this.$t('dialog.text12')
          console.log(err)
        })
      },
      // 取消订单
      cancelOrder() {
        this.showDialog = true
        this.cancelDialog = true
        this.dakuanShow = false
      },
      // 取消订单确认
      cancelConfim() {
        this.postRequest('/draw/cancelOrder', {
          id: this.orderId
        }).then(res => {
          if (res.data.success === true) {
            this.showDialog = false
            this.cancelDialog = true
            this.dakuanShow = false
            this.cancelShow = true
            this.getOrderDetails()
          } else {
            this.cancelShow = false
            this.cancelMsg = res.data.msg
          }
        }).catch(err => {
          this.cancelShow = false
          this.cancelMsg = this.$t('dialog.text12')
          console.log(err)
        })
      },
      // 关闭弹窗
      closeConfim() {
        this.cancelMsg = ''
        this.cancelDialog = false
        this.cancelShow = true
        this.showDialog = false
        this.bossShow = false
      },
      shenSuBtn() {
        this.$router.push({
          path: '/account/btcOrder/btcWithSwitchBoss/btcWithInfo/btcWithProblem',
          query: {id: this.orderId, isBTC: this.orderData.drawCurrency}
        })
      },
      postRequest(url, params) {
        return this.$http({
          method: 'post',
          url: `${this.$api}${url}`,
          data: params,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              if (data.hasOwnProperty(it) === true) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      },
      // 订单状态
      // CREATE(0,"创建"),PAY_SUCCESS(1,"选择共享者"),WAIT(2,"待接单"),JUJUE(3,"拒绝接单"),JIESUCCESS(4,"接单成功"),AUDIT(5,"审核通过"),
      //     AUDITFAIL(6,"审核不通过"),OUTTIMECANCEL(7,"用户超时未支付系统取消"), CANCELGIVEMONEY(8,"审核不通过给用户退款成功"),
      //   CANCELGIVEMONEYFAIL(9,"审核不通过给用户退款失败"),GIVEMONEYFAIL(10,"打款失败退款给用户"),
      //   CANCEL(11,"其他原因取消"),FINISH(12,"已完成"),FAIL(13,"其他原因打款失败");
      // 下面这个是支付状态
      // //支付状态 0新创建 1待老板接单  2待老板打款 3待用户确认收款 4待系统转帐给老板 5已完成 6退款成功
      // CREATE(0,"创建（待支付）"),PAY_SUCCESS(1,"支付完成"),WAIT(2,"待接单"),WAIBOSSPAY(3,"待老板打款"),WAITUSERCONFIRM(4,"待用户确认收款"),WAITSYSPAY(5,"待系统转账给商户"),FINISH(6,"完成"),TUIKUAI(7,"退款完成");
      orderStatus(type, payStatus, proStatus) { // 提现状态
        // let proStatus = this.orderData.problemStatus
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
      }
    },
    components: {
      payMoneyDialog
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .img-uls
    margin-top: 10px

  .usd-info
    padding-top: 70px;
    padding-left: 92px;
    max-width: 1070px;
    box-sizing content-box
    @media screen and (max-width 1600px)
      padding-left: 50px
      padding-right: 50px
    @media screen and (max-width 1200px)
      padding: 0
      max-width 100%
    #fixed-top-header
      @media screen and (max-width 1200px)
        border-bottom none
    .mobile-money
      display: none
      color #181818
      padding: 80px 15px 0
      @media screen and (max-width 1200px)
        display: block
      .label-title
        font-size: 18px
      .moneys
        font-size: 24px
        margin: 20px 0 40px
        font-weight: bold
    #order-table
      margin: 60px 0 80px
      @media screen and (max-width 1200px)
        margin: 30px 0
        padding: 0 15px
      .pc-table
        @media screen and (max-width 1200px)
          display none
        @media screen and (min-width 1200px)
          display block
      .mobile-table
        @media screen and (max-width 1200px)
          display block
        @media screen and (min-width 1200px)
          display none
        .flex-item
          justify-content space-between
          padding: 0 15px
          div
            flex none
          .text-left
            padding: 0
      .await-status
        color #605f5f
      .processed-status
        color #fc534c
    .order-dakuan-info
      padding-bottom: 80px
      @media screen and (max-width 1200px)
        padding: 0 15px 80px 15px
      .dakuan-list
        margin-bottom: 30px
        font-size: 18px
        color #181818
        padding: 30px 30px 30px 50px
        background-color: #fafbfc
        border: 1px solid #d9d9d9
        border-radius 4px
        transition max-height .3s linear
        max-height 1000px
        overflow hidden
        &:last-child
          margin-bottom: 0
        @media screen and (max-width 1200px)
          font-size: 14px
          padding: 0
          border none
        &.shensu-bg
          @media screen and (max-width 1200px)
            background-color: #edeff1
            padding: 15px
            .mobile-title-shengsu
              font-weight: bold
              font-size: 17px

            .fankui-title
              font-size: 17px
              font-weight: bold
              color #fc534c
        &.hidden-account
          max-height 60px
        .money-info
          @media screen and (max-width 1200px)
            padding: 15px
            background-color: #fafafa
        .record-title
          font-weight: normal;
          display: flex;
          align-items: center;
          justify-content space-between
          height: 60px;
          font-size: 22px;
          color: #181818;
          background-color: #edeff1;
          .line
            display: block;
            width: 10px;
            height: 22px;
            margin-right: 30px;
            background-color: #032e43;
        .pc-title
          @media screen and (max-width 1200px)
            display: none
          @media screen and (min-width 1200px)
            display: block
        .mobile-title
          @media screen and (max-width 1200px)
            display: flex
          @media screen and (min-width 1200px)
            display: none
          .line-title
            font-size: 18px
            display: flex
          .icon-img
            padding: 15px
            cursor pointer
            .icon
              width: 9px
              height: 14px
              transform rotate(-90deg)
              background: url("../../../../assets/images/myAccount/myDon/row-link-red.svg") no-repeat center / cover
              transition transform .3s linear
              &.rotate-icon
                transform rotate(90deg)
        .desc
          margin-bottom: 20px
          word-break: break-all;
          word-wrap: break-word;
          &:last-child
            margin-bottom: 0
        .desc-title
          font-size: 20px
          margin-bottom: 30px
        .margin-left
          margin-left: 30px
        .img-uls
          display flex
          align-items center
          .img-list
            width: 88px
            height: 88px
            border: 1px solid #d9d9d9
            border-radius 4px
            margin-right: 30px
            &:last-child
              margin-right: 0
            @media screen and (max-width 1200px)
              margin-right: 10px
              width: 55px
              height: 55px
            img
              display: block
              width: 100%
              height: 100%
    .btn-w
      padding-bottom: 100px
      @media screen and (max-width 1200px)
        padding-bottom: 0
        position: fixed
        left: 0
        bottom: 0
        width: 100%
        z-index: 20
        display flex
        align-items center
      .btn
        cursor pointer
        width: 100%
        height: 68px
        border-radius 4px
        display: flex
        align-items center
        margin-bottom 20px
        justify-content center
        color #fff
        background-color: #fc534c
        @media screen and (max-width 1200px)
          height: 46px
          margin-bottom 0
          border-radius 0
      .two-btn
        margin-top: 30px
        background-color: #edeff1
        color #181818
        @media screen and (max-width 1200px)
          margin-top: 0
          background-color: #032e43
          color #fff
</style>
