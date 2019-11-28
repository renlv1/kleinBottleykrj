<template>
  <div class="usd-info">
    <!--USD 充值详情-->
    <h3 id="record-title">
      <span class="line"></span>
      <span>{{$t('usdMoney.text43')}}</span>
    </h3>
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('usdMoney.text44')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="mobile-money">
      <p class="label-title">{{$t('usdMoney.text_42')}}：</p>
      <h3 class="moneys">{{orderData.depositAmount}} {{topCurrency}}</h3>
      <div class="dashed-line"></div>
    </div>
    <div id="order-table">
      <div class="pc-table">
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text_43')}}</div>
          <div>{{orderData.id}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text6')}}</div>
          <div class="await-status processed-status">{{orderStatus(orderData.status, orderData.payStatus, orderData.problemStatus)}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text7')}}</div>
          <div>{{orderData.depositAmount}} {{topCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text73')}}</div>
          <div>{{orderData.feeAmount}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text8')}}</div>
          <div>{{orderData.depositCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text9')}}</div>
          <div>{{orderData.receiveAmount}} {{orderData.depositCurrency}}</div>
        </div>
      </div>
      <div class="mobile-table">
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text10')}}：</div>
          <div>{{orderData.depositCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text11')}}：</div>
          <div>{{orderData.receiveAmount}} {{orderData.depositCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text73')}}：</div>
          <div>{{orderData.feeAmount}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text44')}}</div>
          <div class="await-status processed-status">{{orderStatus(orderData.status, orderData.payStatus, orderData.problemStatus)}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdOrder.text5')}}：</div>
          <div>{{orderData.id}}</div>
        </div>
        <!--<div class="flex-item">-->
          <!--<div class="text-left">{{$t('usdOrder.text7')}}：</div>-->
          <!--<div>{{$changeDate(orderData.createAt)}}</div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="order-dakuan-info">
      <ul class="dakuan-uls">
        <!--我的付款账户-->
        <li class="dakuan-list" :class="{'hidden-account': hiddenAccount1}">
          <p class="desc desc-title pc-title">{{$t('usdMoney.text45')}}</p>
          <h3 class="record-title mobile-title">
            <div class="line-title">
              <span class="line"></span>
              <span>{{$t('usdMoney.text45')}}</span>
            </div>
            <div class="icon-img" @click="selecteAccount(1)"><div class="icon" :class="{'rotate-icon': hiddenAccount1}"></div></div>
          </h3>
          <div class="money-info">
            <p class="desc">{{orderData.giveRealName}}</p>
            <p class="desc">{{orderData.giveAccount}}</p>
            <p class="desc"><span>{{orderData.giveBankName}}</span><span class="margin-left" v-if="fenhang[1] && fenhang[1] !== 'null'">{{fenhang[1]}}</span></p>
            <p class="desc" v-if="fenhang[2] && fenhang[2] !== 'null'">{{fenhang[2]}}</p>
            <p class="desc" v-if="fenhang[0] && fenhang[0] !== 'null'">IBAN：{{fenhang[0]}}</p>
          </div>
        </li>
        <!--收款人账户 -->
        <li class="dakuan-list" v-if="shouKuanData"  :class="{'hidden-account': hiddenAccount2}">
          <p class="desc desc-title pc-title">{{$t('usdMoney.text46')}}</p>
          <h3 class="record-title mobile-title">
            <div class="line-title">
              <span class="line"></span>
              <span>{{$t('usdMoney.text46')}}</span>
            </div>
            <div class="icon-img" @click="selecteAccount(2)"><div class="icon" :class="{'rotate-icon': hiddenAccount2}"></div></div>
          </h3>
          <div class="money-info">
            <p class="desc">{{shouKuanData.realname}}<span class="margin-left"></span></p>
            <p class="desc">{{shouKuanData.number}}</p>
            <p class="desc">
              <span>{{shouKuanData.bankname}}</span>
              <span>{{shouKuanData.subbank}}</span>
            </p>
            <p class="desc">{{shouKuanData.subbankaddress}}</p>
            <p class="desc" v-show="bossIBAN">IBAN：{{bossIBAN}}</p>
            <p class="desc">{{$t('usdMoney.text47')}}：{{shouKuanData.username}}</p>
            <p class="desc tips" v-html="$t('usdOrder.text50')"></p>
          </div>
        </li>
         <!--申诉内容-->
        <li class="dakuan-list shensu-bg" v-if="orderData.problemId !== null">
          <p class="desc desc-title mobile-title-shengsu">{{$t('usdMoneyStatus.text14')}}：</p>
          <p class="desc">{{userProblem.content}}</p>
          <ul class="img-uls">
            <li class="img-list" v-for="(item, index) in userProblem.images" :key="index"><img :src="item.imageUrl" alt=""></li>
          </ul>
        </li>
         <!--申诉反馈-->
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
          <p class="desc">{{$t('usdMoney.text68')}}</p>
        </li>
        <!-- 申诉结果 用户胜诉-->
        <li class="dakuan-list shensu-bg" v-if="orderData.userAddress === userProblem.backup2">
          <p class="desc desc-title fankui-title">{{$t('usdMoney.text72')}}：</p>
          <p class="desc">{{$t('usdMoney.text67')}}</p>
        </li>
      </ul>
    </div>
    <div class="btn-w">
      <!-- 打款-->
      <div class="btn" v-if="orderData.status === 3 && orderData.payStatus !== 4 && orderData.problemId === null" @click="daKuanZhuang">{{$t('usdMoneyStatus.text22')}}</div>
      <!--申诉    -->
      <div class="btn" v-if="(orderData.status === 3 && orderData.payStatus === 4 && orderData.problemId === null) || ((orderData.problemStatus === 0 || orderData.problemStatus === 1) && orderData.userAddress !== userProblem.userAddress)" @click="shenSuBtn">{{$t('usdMoney.text75')}}</div>
      <!-- 取消订单-->
      <div class="btn" v-if="orderData.status === 1" @click="cancelOrder">{{$t('usdMoneyStatus.text24')}}</div>
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
                <div class="dialog-title">{{$t('usdMoney.text48')}}</div>
                <div class="dialog-text">{{cancelMsg}}</div>
              </div>
              <div class="pay-confim-btn" @click="closeConfim">{{$t('sieTransfer.text10')}}</div>
            </div>
          </div>
          <!-- 打款转账 -->
          <div v-show="dakuanShow">
            <div class="confirmShow">
              <div class="dialog-title">{{$t('usdMoneyStatus.text26')}}</div>
              <div class="dialog-text">{{$t('usdMoneyStatus.text27')}}？</div>
            </div>
            <p class="c-ero">{{eMsg}}</p>
            <div class="pay-confim-btn" @click="daKuanConfim" :class="{disable: loadingConfim2}">
              <div class="btn-w" v-show="loadingConfim2">
                <div class="img-box">
                  <img src="../../../../assets/images/aiChat/loading.gif" alt="">
                </div>
              </div>
              <span>{{$t('danAI.text12')}}</span>
            </div>
          </div>
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
      loadingConfim2: false,
      eMsg: '',
      hiddenAccount1: false,
      hiddenAccount2: false,
      showDialog: false,
      dakuanShow: false,
      cancelDialog: false,
      shensuShow: false,
      cancelShow: true,
      cancelMsg: '',
      orderData: [],
      fenhang: [],
      shouKuanData: [],
      problemData: [],
      userProblem: [],
      managerReply: [],
      bossIBAN: '',
      orderid: this.$route.query.id,
      topCurrency: '' // 充值币种
    }
  },
  computed: {
    shouxufei () {
      return (this.tixianFei * this.orderData.depositAmount).toFixed(4)
    },
    ...mapGetters([
      'tixianFei'
    ])
  },
  created () {
    this.getOrderDetails()
  },
  methods: {
    // 3.1.2 查看申诉问题详情
    getProblem () {
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
    // 订单详情
    getOrderDetails () {
      this.postRequest('/deposit/depositDetail', {
        depositId: this.orderid
      }).then(res => {
        if (res.data.success === true) {
          this.orderData = res.data.data
          if (this.orderData.depositCurrency === 'CNY' || this.orderData.depositCurrency === 'USD') { // 判断当前的支付币种
            this.topCurrency = 'USD'
          } else if (this.orderData.depositCurrency === 'BTC') {
            this.topCurrency = 'BTC'
          }
          if (res.data.data.iban) {
            this.fenhang = res.data.data.iban.split(',')
          }
          // this.fenhang = this.orderData.remark.split(',')
          this.shouKuanData = JSON.parse(this.orderData.bossBankAccount)
          this.bossIBAN = res.data.mapData.iban
          if (this.orderData.problemId) {
            this.getProblem()
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 关闭弹窗
    closeConfim () {
      this.showDialog = false
      this.getOrderDetails()
    },
    // 取消订单
    cancelOrder () {
      this.cancelDialog = true
      this.showDialog = true
      this.cancelShow = true
    },
    selecteAccount (index) {
      if (index === 1) {
        this.hiddenAccount1 = !this.hiddenAccount1
      } else {
        this.hiddenAccount2 = !this.hiddenAccount2
      }
    },
    // 打款转账
    daKuanZhuang () {
      this.cancelDialog = false
      this.dakuanShow = true
      this.showDialog = true
    },
    // 确认打款
    daKuanConfim () {
      this.eMsg = ''
      this.loadingConfim2 = true
      this.postRequest('/deposit/depositConfirmByStemp', {
        depositId: this.orderid,
        confirmState: '3'
      }).then(res => {
        if (res.data.success === true) {
          this.loadingConfim2 = false
          this.showDialog = false
          this.getOrderDetails()
        } else {
          this.loadingConfim2 = false
          this.eMsg = res.data.msg
        }
      }).catch(err => {
        this.loadingConfim2 = false
        console.log(err)
      })
    },
    // 弹窗取消订单
    cancelConfim () {
      this.cancelDialog = true
      this.postRequest('/deposit/cancleDeposit', {
        depositId: this.orderid
      }).then(res => {
        console.log(res)
        this.cancelShow = false
        if (res.data.success === true) {
          this.cancelMsg = this.$t('usdMoneyStatus.text4')
          this.showDialog = false
          this.getOrderDetails()
        } else {
          this.cancelMsg = res.data.msg
        }
      }).catch(err => {
        console.log(err)
        this.cancelShow = false
        this.cancelMsg = this.$t('dialog.text12')
      })
    },
    // 申诉
    shenSuBtn () {
      this.$router.push({
        path: '/account/usdOrder/usdRechargeInfo/usdProblem',
        query: {
          id: this.orderid
        }
      })
    },
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
    postRequest (url, params) {
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
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pay-confim-btn
  display flex !important
  justify-content center
  &.disable
    pointer-events none
    background #999 !important
  .btn-w
    padding-bottom: 0 !important
    display flex
    align-items center
    .img-box
      width: 30px
      margin-right: 10px
      img
        display block
        width: 100%
.c-ero
  text-align: center
  margin: 10px 0
  color #fc534c
.content-boss
  margin-bottom: 10px
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
      max-height 1000px
      overflow hidden
      transition max-height .3s linear
      &:last-child
        margin-bottom: 0
      @media screen and (max-width 1200px)
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
            font-weight:bold
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
          margin-right: 15px;
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
        word-wrap:break-word;
        &:last-child
          margin-bottom: 0
        @media screen and (max-width 1200px)
          font-size: 14px
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
      left:0
      bottom: 0
      width: 100%
      z-index: 20
    .btn
      cursor pointer
      width: 100%
      height: 68px
      border-radius 4px
      display: flex
      align-items center
      justify-content center
      color #fff
      background-color: #fc534c
      @media screen and (max-width 1200px)
        height: 46px
        border-radius 0
</style>
