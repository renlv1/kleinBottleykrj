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
            <!--推荐人-->
            <div class="input-item" v-if="userInfo.refUserAddress === '' || !userInfo.refUserAddress">
              <input type="text" :placeholder="$t('danAI.text11')" class="inputs" v-model="recommendName">
            </div>
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
          <div v-if="userInfo.openTradePassword !== 2">
            <p class="error-text">{{$t('danAI.text13')}}</p>
            <div class="button-confim" @click="close">{{$t('danAI.text12')}}</div>
          </div>
          <!-- 未设置验证码-->
          <div v-if="userInfo.openGoogleCode !== 2 && userInfo.openTradePassword === 2">
            <p class="error-text">{{$t('danAI.text14')}}</p>
            <div class="button-confim" @click="close">{{$t('danAI.text12')}}</div>
          </div>
          <!-- 文字提示-->
          <div v-show="errorDialog">
            <h3 class="dialog-title">{{payResultText}}</h3>
            <p class="error-text-succcess">{{errorText}}</p>
            <p class="errr-delay" v-show="successFlagPay">{{$t('danAI.text52')}}</p>
            <div class="button-confim" @click="errCloseDialog">{{$t('danAI.text12')}}</div>
          </div>
          <!-- 短信发送提示-->
          <div v-if="duanXianDialog">
            <p class="error-text">{{duanxinMsg}}</p>
            <div class="button-confim" @click="closeVerDialog">{{$t('danAI.text12')}}</div>
          </div>
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
      recommendName: '',
      errDialogText: '',
      formDataFlag2: false,
      successFlagPay: false,
      notSafecode: false, // 未设置安全密码
      notVerifiCode: false, // 未设置验证码
      errorDialog: false, // 错误提示
      payDialog: true, // 支付弹窗
      isgogoleDuanxin: true // 默认短信
    }
  },
  props: {
    productId: '',
    openDan: '',
    openPrice: 0,
    xufeiMoney: 0
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // 显示弹窗
    show () {
      if (this.successFlagPay === true) { // 支付成功
        this.payDialog = true
        this.payPassword = ''
        this.payCode = ''
        this.recommendName = ''
      } else if (this.userInfo.openTradePassword !== 2) { // 未安全密码
        this.payDialog = false
      } else if (this.userInfo.openGoogleCode !== 2 && this.userInfo.openTradePassword === 2) { // 未设置验证码
        this.payDialog = false
      }
      this.showFlag = true
      this.errorDialog = false
      this.duanXianDialog = false
    },
    close () {
      this.payPassword = ''
      this.payCode = ''
      this.recommendName = ''
      this.showFlag = false
    },
    // 支付后的弹窗
    errCloseDialog () {
      if (this.successFlagPay === true) {
        this.$router.push({path: '/account/myDon'})
      } else if (this.errorDialog === true && this.successFlagPay === false) {
        this.errorDialog = false
        this.payDialog = true
      } else if (this.duanXianDialog === true) {
        this.duanXianDialog = false
        this.payDialog = true
      }
    },
    // 关闭img x
    closeIcon () {
      this.errDialogText = ''
      if (this.duanXianDialog === true) {
        this.duanXianDialog = false
        this.payDialog = true
      } else if (this.errorDialog === true && this.successFlagPay === false) {
        this.errorDialog = false
        this.payDialog = true
      } else if (this.successFlagPay === true && this.successFlagPay === true) {
        this.$store.dispatch('balanceAction')
        this.showFlag = false
        this.payPassword = ''
        this.payCode = ''
        this.recommendName = ''
      } else {
        this.showFlag = false
        this.payPassword = ''
        this.payCode = ''
        this.recommendName = ''
      }
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
      // else if (!(/^\+?[1-9]\d*$/).test(String(this.payCode).trim())) {
      //   this.errDialogText = this.$t('danAI.text54')
      //   return false
      // }
      // 开通
      if (this.openDan === true) {
        let fdata = new FormData()
        fdata.append('orderid', this.productId)
        let paypass = String(this.payPassword).trim()
        let payCode = String(this.payCode).trim()
        let recommendName = String(this.recommendName).trim()
        // 判断推荐人选填
        if (paypass !== '' && payCode !== '' && recommendName !== '') {
          this.formDataFlag = true
          fdata.append('tradePwd', paypass)
          fdata.append('code', payCode)
          fdata.append('refUserName', recommendName)
        } else if (recommendName === '' && paypass !== '' && payCode !== '') {
          this.formDataFlag = true
          fdata.append('tradePwd', paypass)
          fdata.append('code', payCode)
        }
        if (this.formDataFlag === true) {
          this.errDialogText = ''
          this.loadingConfim = true
          let ajaxLang0 = ''
          if (localStorage.getItem('kleinLang') === 'EN') {
            ajaxLang0 = 'en'
          }
          this.$http.post(`${this.$api}/transaction/paymentByOrderIdAndRef`, fdata, {headers: {'secret-language': ajaxLang0}}).then(res => {
            this.loadingConfim = false
            this.payDialog = false
            // 开通成功
            if (res.data.success === true) {
              this.$store.dispatch('balanceAction')
              this.errorDialog = true
              this.payResultText = this.$t('danAI.text17')
              this.successFlagPay = true
              let openPrice = Number(this.openPrice).toFixed(4)
              this.errorText = `${openPrice} SIE`
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
      } else {
        // 续费
        let formData = new FormData()
        formData.append('orderid', this.productId)
        let paypass2 = String(this.payPassword).trim()
        let payCode2 = String(this.payCode).trim()
        let recommendName2 = String(this.recommendName).trim()
        // 判断推荐人选填
        if (paypass2 !== '' && payCode2 !== '' && recommendName2 !== '') {
          this.formDataFlag2 = true
          formData.append('tradePwd', paypass2)
          formData.append('code', payCode2)
          formData.append('refUserName', recommendName2)
        } else if (recommendName2 === '' && paypass2 !== '' && payCode2 !== '') {
          this.formDataFlag2 = true
          formData.append('tradePwd', paypass2)
          formData.append('code', payCode2)
        }
        if (this.formDataFlag2 === true) {
          this.errDialogText = ''
          // let payCode = String(this.payCode).trim()
          // let payPassword = String(this.payPassword).trim()
          // formData.append('tradePwd', payPassword)
          // formData.append('code', payCode)
          let ajaxLang = ''
          if (localStorage.getItem('kleinLang') === 'EN') {
            ajaxLang = 'en'
          }
          this.loadingConfim = true
          this.$http.post(`${this.$api}/transaction/paymentByOrderIdAndRef`, formData, {headers: {'secret-language': ajaxLang}}).then(res => {
            this.loadingConfim = false
            this.payDialog = false
            // 续费成功
            if (res.data.success === true) {
              this.$store.dispatch('balanceAction')
              this.errorDialog = true
              this.payResultText = this.$t('danAI.text17')
              this.successFlagPay = true
              this.errorText = `${this.xufeiMoney} SIE`
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
                padding-left: 10px
                font-size: 12px
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
