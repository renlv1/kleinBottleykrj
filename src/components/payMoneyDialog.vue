<template>
  <transition name="confirm-fade">
    <div class="confirm" v-if="showFlag">
      <div class="confirm-wrapper"  @click="close">
        <div class="confirm-content"  @click.stop>
          <div class="close-confirm" @click="closeIcon">
            <div class="close-icon"></div>
          </div>
          <!-- 支付弹窗 -->
          <div class="dialog-box" v-show="payDialog">
            <h3 class="dialog-title">{{$t('danAI.text7')}}</h3>
            <div class="input-item">
              <input type="password" :placeholder="$t('danAI.text8')" class="inputs" autocomplete="off" v-model="payPassword">
            </div>
            <!--谷歌-->
            <div class="input-item" v-if="userInfo.openGoogleCode === 2">
              <input type="text" :placeholder="$t('danAI.text9')" class="inputs" v-model="payCode">
            </div>
            <!--短信-->
            <!--<div class="input-item verifiCode-item" v-else>-->
              <!--<input type="text" :placeholder="$t('danAI.text10')" class="inputs" v-model="payCode">-->
              <!--<div class="send" @click="sendCode" :class="{'disable': isDisabled}">{{sendBtnValue}}</div>-->
            <!--</div>-->
            <p class="error-dialgo">{{errDialogText}}</p>
            <div class="button-pay-confim" @click="confirmPay" :class="{'disable-btn': loadingConfim}">
              <div class="btn-w">
                <div class="img-box" v-show="loadingConfim">
                  <img src="../assets/images/aiChat/loading.gif" alt="">
                </div>
                <span>{{$t('danAI.text12')}}</span>
              </div>
            </div>
          </div>
          <!-- 未设置安全密码 -->
          <div v-show="userInfo.openTradePassword !== 2">
            <p class="error-text">{{$t('danAI.text13')}}</p>
            <div class="button-confim mobile-btn" @click="gotoSafe">{{$t('danAI.text12')}}</div>
            <div class="button-confim pc-btn" @click="gotoSafe">{{$t('danAI.text12')}}</div>
          </div>
          <!-- 未设置验证码-->
          <div v-if="userInfo.openGoogleCode !== 2">
            <p class="error-text">{{$t('danAI.text14')}}</p>
            <div class="button-confim mobile-btn" @click="gotoSafe">{{$t('danAI.text12')}}</div>
            <div class="button-confim pc-btn" @click="gotoSafe">{{$t('danAI.text12')}}</div>
          </div>
          <!-- 文字提示-->
          <div v-show="errorDialog">
            <h3 class="dialog-title">{{payResultText}}</h3>
            <p class="error-text-succcess">{{errorText}}</p>
            <div class="button-confim" @click="errCloseDialog">{{$t('danAI.text12')}}</div>
          </div>
          <!-- 短信发送提示-->
          <!--<div v-if="duanXianDialog">-->
            <!--<p class="error-text">{{duanxinMsg}}</p>-->
            <!--<div class="button-confim" @click="closeVerDialog">{{$t('danAI.text12')}}</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      shareJieDan: false,
      cancelBoss: false,
      loadingConfim: false,
      formDataFlag: false,
      errorText: '',
      showFlag: false,
      payPassword: '',
      payCode: '',
      payResultText: '',
      duanXianDialog: false,
      sendBtnValue: this.$t('danAI.text16'),
      isDisabled: false,
      sendBtnTimes: 60,
      timer: null,
      duanxinMsg: '',
      errDialogText: '',
      tixianId: '',
      formDataFlag2: false,
      successPay: false,
      notSafecode: false, // 未设置安全密码
      notVerifiCode: false, // 未设置验证码
      errorDialog: false, // 错误提示
      payDialog: true, // 支付弹窗
      isgogoleDuanxin: true // 默认短信
    }
  },
  props: {
    bankAccountId: '',
    isBTCWithdrawal: false,
    gongXiangData: {},
    productId: '',
    chongzhiOrderData: {},
    openPrice: 0,
    tuiMoney: false,
    xufeiMoney: 0
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    gotoSafe () {
      if (window.innerWidth > 1200) {
        this.$router.push('/account/safettingCenter')
      } else {
        this.$router.push('/account/myAccountPhone')
      }
    },
    // 显示弹窗
    show () {
      if (this.userInfo.openTradePassword !== 2) { // 未安全密码
        this.payDialog = false
      } else if (this.userInfo.openGoogleCode !== 2 && this.userInfo.openTradePassword === 2) { // 未设置验证码
        this.payDialog = false
      } else {
        this.payDialog = true
      }
      this.showFlag = true
      this.errorDialog = false
      this.duanXianDialog = false
    },
    close () {
      this.payPassword = ''
      this.payCode = ''
      this.showFlag = false
    },
    // 支付后的弹窗
    errCloseDialog () {
      // 接单成功跳转
      if (this.shareJieDan === true) {
        this.$router.push({path: '/account/notOpenShareOrder/shareOrder', query: {isChongzhi: 1, isStatus: 0, pageIndex: 1}})
      //   取消钱老板
      } else if (this.cancelBoss === true) {
        this.$router.push('/account/myAccount')
      } else if (this.errorDialog === true && this.successPay === true) {
        this.showFlag = false
        this.errorDialog = false
        this.payDialog = true
        this.$router.push({
          path: '/account/usdOrder/usdWithSwitchBoss',
          query: {id: this.productId}
        })
      } else if (this.errorDialog === true) {
        this.duanXianDialog = false
        this.payDialog = true
        this.payPassword = ''
        this.payCode = ''
        this.errorDialog = false
      } else if (this.duanXianDialog === true) {
        this.duanXianDialog = false
        this.payDialog = true
      }
    },
    // 关闭img x
    closeIcon () {
      this.payPassword = ''
      this.payCode = ''
      this.showFlag = false
    },
    // 确认支付
    confirmPay () {
      this.errDialogText = ''
      if (this.payPassword === '') {
        this.errDialogText = this.$t('danAI.text8')
        return false
      } else if (this.payCode === '') {
        this.errDialogText = this.$t('danAI.text_10')
        return false
      }
      let formData = new FormData()
      formData.append('orderid', this.productId)
      formData.append('type', '1')
      let paypass2 = String(this.payPassword).trim()
      let payCode2 = String(this.payCode).trim()
      if (paypass2 !== '' && payCode2 !== '') {
        this.formDataFlag2 = true
        formData.append('tradePwd', paypass2)
        formData.append('code', payCode2)
      }
      if (this.formDataFlag2 === true) {
        this.errDialogText = ''
        let ajaxLang = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang = 'en'
        }
        this.loadingConfim = true
        // 共享者接单
        if (this.bankAccountId) {
          let fd3 = new FormData()
          fd3.append('orderid', this.productId)
          fd3.append('bankid', this.bankAccountId)
          fd3.append('type', '2')
          fd3.append('tradePwd', paypass2)
          fd3.append('code', payCode2)
          this.$http.post(`${this.$api}/transaction/payDepositOrderId`, fd3, {headers: {'secret-language': ajaxLang}}).then(res => {
            if (res.data.success === true) {
              this.payDialog = false
              this.loadingConfim = false
              this.payResultText = ''
              this.errorDialog = true
              this.shareJieDan = true
              this.errorText = this.$t('usdTixian.text36')
              this.postRequest('/deposit/depositDetail', {
                depositId: this.productId
              }).then(res => {
                if (res.data.success === true) {
                  this.chongzhiOrderData = res.data.data
                }
              }).catch(err => {
                console.log(err)
              })
              // this.payDialog = false
              // this.loadingConfim = false
              // this.showFlag = false
              // window.location.reload(true)

              // let fd4 = new FormData()
              // fd4.append('depositId', this.productId)
              // fd4.append('confirmState', '1') // bankid
              // fd4.append('bankid', this.bankAccountId)
              // this.$http.post(`${this.$api}/deposit/depositConfirmByStemp`, fd4, {headers: {'secret-language': ajaxLang}}).then(response => {
              //   if (response.data.success === true) {
              //     this.payDialog = false
              //     this.loadingConfim = false
              //     this.postRequest('/deposit/depositDetail', {
              //       depositId: this.productId
              //     }).then(res => {
              //       if (res.data.success === true) {}
              //     }).catch(err => {
              //       console.log(err)
              //     })
              //   } else {
              //     this.payDialog = false
              //     this.loadingConfim = false
              //     this.payResultText = ''
              //     this.errorDialog = true
              //     this.errorText = response.data.msg
              //   }
              // })
            } else {
              this.payDialog = false
              this.loadingConfim = false
              this.payResultText = this.$t('usdTixian.text11')
              this.errorDialog = true
              this.errorText = res.data.msg
            }
          })
          //   取消钱老板
        } else if (this.tuiMoney === true) {
          let bossfd = new FormData()
          bossfd.append('tradepwd', paypass2)
          bossfd.append('code', payCode2)
          this.$http.post(`${this.$api}/boss/cancelBoss`, bossfd, {headers: {'secret-language': ajaxLang}}).then(res => {
            if (res.data.success === true) {
              // this.$router.push('/account/myAccount')
              // this.payDialog = false
              // this.loadingConfim = false
              this.payDialog = false
              this.loadingConfim = false
              this.payResultText = ''
              this.cancelBoss = true
              this.errorDialog = true
              this.errorText = this.$t('shareOrderCenter.text34')
            } else {
              this.payDialog = false
              this.loadingConfim = false
              this.payResultText = ''
              this.errorDialog = true
              this.errorText = res.data.msg
            }
          })
          // 共享者开通
        } else if (this.gongXiangData && this.gongXiangData.username) {
          let fd2 = new FormData()
          fd2.append('realName', this.gongXiangData.username)
          fd2.append('location', this.gongXiangData.address)
          fd2.append('phonecode', this.gongXiangData.quhao)
          fd2.append('phone', this.gongXiangData.telphone)
          fd2.append('tradepwd', paypass2)
          fd2.append('code', payCode2)
          this.$http.post(`${this.$api}/boss/applyBoss`, fd2, {headers: {'secret-language': ajaxLang}}).then(res => {
            if (res.data.success === true) {
              this.payDialog = false
              this.loadingConfim = false
              this.$router.push('/account/notOpenShareOrder/shareOrder')
            } else {
              this.payDialog = false
              this.loadingConfim = false
              this.payResultText = this.$t('usdTixian.text12')
              this.errorDialog = true
              this.errorText = res.data.msg
            }
          })
        } else { // 提现弹窗
          this.$http.post(`${this.$api}/transaction/paymentByAllOrderId`, formData, {headers: {'secret-language': ajaxLang}}).then(res => {
            this.loadingConfim = false
            this.payDialog = false
            // 提现成功
            if (res.data.success === true) {
              this.showFlag = false
              if (!this.isBTCWithdrawal) {
                this.$router.push({ // 如果提现usd就选择usd的钱老板
                  path: '/account/usdOrder/usdWithSwitchBoss',
                  query: {id: this.productId}
                })
              } else {
                this.$router.push({ // 如果提现btc就选择btc的钱老板
                  path: '/account/btcOrder/btcWithSwitchBoss',
                  query: {id: this.productId}
                })
              }
              this.$store.dispatch('balanceAction')
              this.payResultText = ''
              this.errorDialog = false
              this.successPay = false
              this.tixianId = res.data.data.id
              this.errorText = ''
            } else {
              this.payResultText = this.$t('danAI.text18')
              this.errorDialog = true
              this.errorText = res.data.msg
            }
          }).catch(err => {
            console.log(err)
            this.loadingConfim = false
            this.errorDialog = true
            this.payResultText = this.$t('danAI.text18')
            this.errorText = this.$t('danAI.text15')
          })
        }
      }
    },
    // 发送验证码
    sendCode () {
      if (this.sendBtnValue === this.$t('danAI.text16')) {
        this.payDialog = false
        this.duanXianDialog = true
        let formData = new FormData()
        formData.append('json', JSON.stringify({'type': 'code'}))
        this.isDisabled = true
        this.duanxinMsg = this.$t('danAI.text19')
        this.countDown()
        let ajaxLang2 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang2 = 'en'
        }
        this.$http.post(this.$api + '/user/sendSmsCode', formData, {headers: {'secret-language': ajaxLang2}}).then((res) => {
          if (res.data.success) {
            this.duanxinMsg = this.$t('danAI.text20')
          } else {
            // 验证码获取失败
            this.duanxinMsg = res.data.msg
            this.sendBtnValue = this.$t('danAI.text16')
            this.sendBtnTimes = 60
            this.isDisabled = false
            clearTimeout(this.timer)
          }
        }).catch((err) => {
          this.sendBtnValue = this.$t('danAI.text16')
          this.sendBtnTimes = 60
          this.isDisabled = false
          clearTimeout(this.timer)
          this.duanxinMsg = this.$t('danAI.text21')
          console.log(err)
        })
      }
    },
    // 关掉短信弹窗框
    closeVerDialog () {
      this.duanXianDialog = false
      this.duanxinMsg = ''
      this.payDialog = true
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
    },
    // 短信倒计时
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.sendBtnValue = this.$t('danAI.text16')
        this.sendBtnTimes = 60
        this.isDisabled = false
        clearTimeout(this.timer)
      } else {
        this.sendBtnTimes--
        this.sendBtnValue = this.sendBtnTimes
        this.isDisabled = true
        this.timer = setTimeout(() => this.countDown(), 1000)
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .confirm
    width: 100%
    height: 100%
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: rgba(11,27,48, .6)
    opacity: 1
    &.confirm-fade-enter-active,&.confirm-fade-leave-active
      transition opacity .3s linear
    &.confirm-fade-enter,&.confirm-fade-leave-to
      opacity: 0
    .button-confim
      font-size: 16px
      margin-top: 40px
      width: 100%
      height: 58px
      text-align: center
      line-height: 58px
      background-color: #fc534c
      color #fff
      cursor pointer
      border-radius 4px
      box-shadow 0 5px 10px #d7d9db
      @media screen and (max-width: 768px)
        height: 40px
        line-height: 40px
    .mobile-btn
      @media screen and (max-width: 1200px)
        display block
      @media screen and (min-width: 1200px)
        display none
    .pc-btn
      @media screen and (max-width: 1200px)
        display none
      @media screen and (min-width: 1200px)
        display block
    .button-pay-confim
      margin-top: 40px
      width: 100%
      height: 58px
      display flex
      align-items center
      justify-content center
      background-color: #fc534c
      color #fff
      cursor pointer
      border-radius 4px
      box-shadow 0 5px 10px #d7d9db
      font-size: 16px
      @media screen and (max-width: 768px)
        height: 40px
      &.disable-btn
        pointer-events none
        cursor auto
      .btn-w
        display flex
        align-items center
        .img-box
          width: 20px
          margin-right: 10px
          img
            display block
            width: 100%
    .error-text
      font-size: 24px
      color #fc534c
      text-align: center
      margin-bottom: 134px
      @media screen and (max-width: 768px)
        font-size: 14px
        margin-top: 20px
        margin-bottom 50px
    .error-dialgo
      font-size: 16px
      color #fc534c
      text-align: center
      margin-bottom: 20px
    .errr-delay
      font-size: 16px
      color #fc534c
      margin-top: 20px
      text-align: center
    .dialog-title
      margin-bottom: 48px
      text-align: center
      font-size: 32px
      color #181818
    .error-text-succcess
      font-size: 24px
      color #fc534c
      text-align: center
      @media screen and (max-width: 768px)
        font-size: 14px
    .confirm-wrapper
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      display flex
      align-items center
      justify-content center
      z-index: 999
      .confirm-content
        position: relative
        width: 600px
        padding: 120px 80px 157px 80px
        border-radius 8px
        box-shadow 0 0 5px #d7d9db
        background-color: #fff
        @media screen and (max-width: 768px)
          width: 90%
          padding: 50px 20px
        .close-confirm
          position: absolute
          right: 0
          top: 0
          cursor pointer
          padding: 30px 40px
          @media screen and (max-width: 768px)
            padding: 20px
          .close-icon
            width: 24px
            height: 24px
            background: url("../assets/images/myAccount/myDon/delete.svg") no-repeat center / cover
        .dialog-box
          width: 100%
          .dialog-title
            margin-bottom: 50px
            font-size: 18px
            color #181818
            font-weight normal
            text-align: center
          .input-item
            width: 100%
            height: 48px
            margin-bottom: 24px
            .inputs
              width: 100%
              display block
              box-sizing border-box
              height 48px
              line-height: 48px
              padding-left: 40px
              border-radius 8px
              font-size: 16px
              color #181818
              border: 1px solid #d7d9db
              &::-webkit-input-placeholder
                color:d7d9db;
                font-family "Microsoft YaHei UI Light"
              &:-moz-placeholder
                color:d7d9db;
                font-family "Microsoft YaHei UI Light"
              &::-moz-placeholder
                color:d7d9db;
                font-family "Microsoft YaHei UI Light"
              &:-ms-input-placeholder
                color:d7d9db;
                font-family "Microsoft YaHei UI Light"
              @media screen and (max-width: 768px)
                line-height: 48px
                padding-left: 10px
                font-size: 14px
          .verifiCode-item
            position: relative
            .send
              position: absolute
              right: 0
              top: 0
              font-size: 16px
              color #fc534c
              height 48px
              padding: 0 20px
              cursor pointer
              line-height: 48px
              &.disable
                pointer-events: none;
                cursor auto
                opacity: 0.5
</style>
