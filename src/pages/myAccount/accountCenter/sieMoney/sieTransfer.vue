<template>
  <div class="sieTransfer">
    <div class="pc">
      <div class="pc-content">
        <div class="property-title">
          <h6><router-link to="/account/sieMoney" class="property">SIE{{$t('sieMoney.text1')}} > </router-link><span class="transfer">SIE{{$t('sieMoney.text3')}}</span></h6>
        </div>
        <div class="transfer-account">
          <div class="transfer-title">
            <span>1.{{$t('sieTransfer.text1')}}:</span>
          </div>
          <div class="inputBox inputTipBox-select">
            <input class="transfer-input  select-input" type="text" readonly disabled :placeholder="transferValue">
            <a class="discount-btn" ref="discountBtn" @click="transferSelectShow = !transferSelectShow">
              <i class="arrowDown" :class="{arrowActive: transferSelectShow}"></i>
            </a>
            <ul class="selectMenu" :class="{selectMenuActive: transferSelectShow}">
              <li :class="{liActive: transferIndex === index}" v-for="(item, index) in transferType" :key="item.name" @click="chooseTransfer(item.name, index)">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <div class="transfer-account">
          <div class="transfer-title">
            <span>2.{{$t('sieTransfer.text2')}}:</span>
          </div>
          <div class="inputBox common-inputBox">
            <input v-if="transferIndex === 0" class="transfer-input common-input" type="text" v-model.trim="transferAddress"  ref="inputOne" :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
            <input v-if="transferIndex === 1" class="transfer-input common-input" type="text" v-model.trim="transferAddress"  ref="inputThird" :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
          </div>
          <span class="inputTipMsg" v-if="addressTip">{{addressMsg}}</span>
        </div>
        <div class="transfer-account">
          <div class="transfer-title">
            <span v-if="transferIndex === 0">3.{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE | fourNumber}} SIE)</span>
            <span v-if="transferIndex === 1">3.{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE | fourNumber}} SIE)</span>
          </div>
          <div class="inputBox common-inputBox">
            <input class="transfer-input common-input " type="text" v-model.trim="transferMoney" @input="checkTransferMoney"  :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
          </div>
          <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
        </div>
        <p class="fee" v-if="transferIndex === 1">
          {{$t('sieTransfer.text7')}}: <span style="color: #FC534C">{{feeNumber | fourNumber}} SIE</span>
          <span>,{{$t('sieTransfer.text9')}}：<span style="color: #FC534C">{{getPaySum | fourNumber}} SIE</span></span>
        </p>
        <button class="sure-btn" @click="confirm()">{{$t('sieTransfer.text10')}}</button>
      </div>
    </div>
    <!--移动端结构-->
    <div class="mobile">
      <div class="management-head">
        <div class="head">
          <div class="back" @click="$router.go(-1)"></div>
          <div class="title">{{$t('sieMoney.text3')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <ul class="mobile-tab">
        <li :class="{tabActive: orderTab === 1}" @click="unFinished()">SIE{{$t('sieMoney.text3')}}</li>
        <li :class="{tabActive: orderTab === 2}" @click="finished()">USD{{$t('sieMoney.text3')}}</li>
      </ul>
      <div class="transfer-content">
        <div class="transfer-type">
          <div class="type-title">{{$t('sieTransfer.text1')}}:</div>
          <div class="type-box first-input">
            <input class="input-type" type="text" readonly disabled :placeholder="transferValue">
            <a class="type-btn"  @click="transferSelectShow = !transferSelectShow">
              <i class="arrowDown" :class="{arrowActive: transferSelectShow}"></i>
            </a>
            <ul class="selectMenu" :class="{selectMenuActive: transferSelectShow}">
              <li :class="{liActive: transferIndex === index}" v-for="(item,index) in transferType" :key="item.index" @click="chooseTransfer(item.name, index)">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <div class="transfer-type">
          <div class="type-title">
            <span>{{$t('sieTransfer.text2')}}:</span>
          </div>
          <div class="type-box">
            <input v-if="transferIndex === 0" class="input-mobile " type="text" v-model.trim="transferAddress"  :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
            <input v-if="transferIndex === 1" class="input-mobile " type="text" v-model.trim="transferAddress"  ref="inputThird" :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
          </div>
          <p class="inputTipMsg" v-if="addressTip">{{addressMsg}}</p>
        </div>
        <div class="transfer-type">
          <div class="type-title">
            <span v-if="transferIndex === 0">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE | fourNumber}} SIE)</span>
            <span v-if="transferIndex === 1">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE | fourNumber}} SIE)</span>
          </div>
          <div class="type-box">
            <input class="input-mobile " type="text" v-model.trim="transferMoney" @input="checkTransferMoney"  :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
          </div>
          <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
        </div>
        <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text11')}}: <span style="color: #FC534C">{{feeNumber | fourNumber}} SIE</span></p>
        <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text12')}}：<span style="color: #FC534C">{{getPaySum | fourNumber}} SIE</span></p>
        <button class="sure-btn" @click="confirm()">{{$t('sieTransfer.text10')}}</button>
      </div>
    </div>
    <!--确定弹窗-->
    <div class="myPopup" v-show="payPopupShow">
      <div class="myPopup-box">
        <a class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></a>
        <div class="formDiv">
          <h3 class="title">{{$t('dialog.text1')}}</h3>
          <input class="payPassword tradingCenter-input" type="password" v-model.trim="payPassword"  value="" :placeholder="$t('dialog.text2')">
          <!-- 短信-->
          <div class="shortMsg" v-show="isgogoleDuanxin">
            <div class="payMsg-box">
              <input class="payMsg tradingCenter-input" v-model.trim="payCode"  :placeholder="$t('dialog.text3')" type="text" value="">
              <button class="sendMsg" @click="getCode()" ref="sendMsg" :class="{'disable': isDisabled}">{{sendBtnValue}}</button>
            </div>
          </div>
          <!--谷歌-->
          <div class="shortMsg" v-show="!isgogoleDuanxin">
            <div class="payMsg-box">
              <input class="payMsg tradingCenter-input" v-model.trim="payCode"   :placeholder="$t('dialog.text4')" type="text" value="">
            </div>
          </div>
          <div class="errmsg-tips">{{payFailTip}}</div>
          <div class="tradingCenter-btn pay-btn" @click="confirmPay" :class="{disable: loadingConfim2}">
            <div class="btn-w" v-show="loadingConfim2">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>
<!--          <button class="tradingCenter-btn pay-btn" @click="confirmPay()">{{$t('dialog.text5')}}</button>-->
        </div>
      </div>
    </div>
    <!--完成弹窗-->
    <div class="myPopup" v-show="confirmShow">
      <div class="myPopup-box">
        <a class="close" @click="successClose"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></a>
        <!--支付成功弹窗-->
        <div v-show="isSuccess">
          <h3 class="title">{{$t('dialog.text6')}}</h3>
          <button class="tradingCenter-btn" @click="successPay">{{$t('dialog.text5')}}</button>
        </div>
        <!--支付失败弹窗-->
        <div v-show="!isSuccess">
          <h3 class="title">{{$t('dialog.text7')}}</h3>
          <div class="errinMsg">{{errinMsgText}}</div>
          <button class="tradingCenter-btn" @click="failedDialog">{{$t('dialog.text5')}}</button>
        </div>
      </div>
    </div>
    <!-- 未设置验证码-->
    <div class="myPopup" v-if="setSafeVerific">
      <div class="myPopup-box" >
        <div class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></div>
        <p class="error-text">{{$t('dialog.text8')}}</p>
        <div class="tradingCenter-btn" @click="setSafeVerific = false">{{$t('dialog.text5')}}</div>
      </div>
    </div>
    <!--请先绑定手机号码-->
    <div class="myPopup" v-show="noBindPhoneShow">
      <div class="myPopup-box">
        <h3 class="error-text">{{$t('dialog.text9')}}</h3>
        <button class="tradingCenter-btn" @click="noBindPhoneShow = false">{{$t('dialog.text5')}}</button>
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
      transferValue: this.$t('sieTransfer.name1'), // 所选择的转账类型
      transferAddress: '', // 转账地址
      transferMoney: '', // 转账金额
      transferSelectShow: false, // 下拉框
      transferIndex: 0,
      transferType: [
        {name: this.$t('sieTransfer.name1')},
        {name: this.$t('sieTransfer.name2')}
      ],
      addressTip: false, // 转账地址错误提示
      moneyTip: false, // 转账金额错误提示
      payPopupShow: false, // 确定弹窗
      isgogoleDuanxin: true, // 判断短信还是谷歌 默认短信
      confirmShow: false, // 完成弹窗
      setSafeVerific: false, // 未设置安全验证弹窗
      isSuccess: true,
      payFailTip: '', // 确认支付提示
      errinMsgText: '', // 支付失败提示
      noBindPhoneShow: false,
      payPassword: '', // 安全码
      payCode: '', // 验证码
      sendBtnValue: this.$t('dialog.text10'),
      sendBtnTimes: 60,
      timer: null,
      isDisabled: false,
      maxInput: 0,
      codeType: '', // 验证码类型（谷歌验证码。手机验证码）
      data: '',
      addressMsg: '',
      transferNum: 1
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo',
      'outEthRate',
      'siePrice',
      'userBalanceSIE'
    ]),
    // 打包费
    feeNumber () {
      if (this.transferMoney === '' || this.transferMoney === 0) {
        return 0
      }
      // console.log(((parseFloat(this.transferMoney) * this.outEthRate) / this.siePrice).toFixed(4))
      if (((Number(this.transferMoney) * Number(this.outEthRate)) / Number(this.siePrice)).toFixed(4) >= 3) {
        return parseFloat(this.transferMoney) * Number(this.outEthRate)
      } else {
        return 3 / Number(this.siePrice)
      }
    },
    getPaySum () {
      return Number(this.feeNumber) + Number(this.transferMoney)
    }
    // 可转账
    // keZhunaChu () {
    //   if (this.transferMoney === '') {
    //     return this.userAccount.SIE.balance
    //   }
    //   if ((parseFloat(this.userAccount.SIE.balance) * this.outEthRate) / this.siePrice >= 3) {
    //     return this.userAccount.SIE.balance * (1 - this.outEthRate)
    //   } else {
    //     return this.userAccount.SIE.balance - 3 / this.siePrice
    //   }
    // }
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     document.addEventListener('click', this.closeUnitMenu) // 点击其他地方关闭选择币种下拉菜单
  //   })
  // },
  watch: {
    transferIndex: function () {
      this.transferAddress = ''
      this.transferMoney = ''
      this.addressTip = false
      this.moneyTip = false
    }
  },
  methods: {
    // closeUnitMenu (event) {
    //   if (!this.$refs.discountBtn.contains(event.target)) {
    //     this.transferSelectShow = false
    //   }
    // },
    // inputTrade () {
    //   if (this.$refs.inputThird.length < 42) {
    //     alert('提示地址不合法，请检查转账地址')
    //   }
    // },
    focusInput (n) {
      if (n === 1) {
        this.addressTip = false
        this.addressMsg = ''
      } else if (n === 2) {
        this.moneyTip = false
        this.addressMsg = ''
      }
    },
    // 点击下拉框
    chooseTransfer (val, index) {
      this.transferValue = val
      this.transferIndex = index
      this.transferSelectShow = false
      if (this.transferIndex === 0) {
        this.transferNum = 1
      } else if (this.transferIndex === 1) {
        this.transferNum = 2
      }
    },
    // 判断转账金额
    checkTransferMoney () {
      // this.transferMoney = this.transferMoney.replace(/\D/g, '')
      // if (!/^\d*.{0,1}\d{0,4}$/.test(this.transferMoney)) {
      //   this.transferMoney = ''
      // }
      if (!/^[0-9]+\.?[0-9]{0,4}$/.test(this.transferMoney)) {
        this.transferMoney = ''
      } else if (this.transferMoney <= 0) {
        this.transferMoney = ''
      }
      function fourNum (value) {
        if (!isNaN(value) && value !== null) {
          let f = Math.floor(value * 10000) / 10000
          let s = f.toString()
          let rs = s.indexOf('.')
          if (rs < 0) {
            rs = s.length
            s += '.'
          }
          while (s.length <= rs + 4) {
            s += '0'
          }
          return s
        }
      }
      if (this.transferIndex === 1) {
        // let maxTransfer = this.userAccount.SIE.balance * (1 - this.outEthRate)
        // let daBao = Number(this.transferMoney) * this.outEthRate
        // console.log(maxTransfer)
        // console.log(daBao)
        // if (daBao - maxTransfer < 0) {
        //   if (Number(this.transferMoney) >= (maxTransfer - daBao)) {
        //     this.transferMoney = (maxTransfer - daBao).toFixed(4)
        //     console.log(maxTransfer - daBao)
        //   }
        // }
        this.maxInput = Number(this.userBalanceSIE) / (1 + Number(this.outEthRate))
        if (this.transferMoney > this.maxInput) {
          this.transferMoney = this.maxInput.toFixed(4)
        }
      } else {
        if (fourNum(this.userBalanceSIE) < parseFloat(this.transferMoney)) {
          this.transferMoney = fourNum(Number(this.userBalanceSIE))
        } else if (this.transferMoney < 1 || (this.transferMoney >= 1) === false) {
          this.transferMoney = ''
        }
      }
    },
    // 确定按钮弹窗
    confirm () {
      this.payPassword = ''
      this.payCode = ''
      if (this.transferAddress === '') {
        this.addressTip = true
        this.addressMsg = this.$t('sieTransfer.text14')
        return false
      }
      if (this.transferIndex === 1) {
        if (this.$refs.inputThird.value.length < 42) {
          this.addressTip = true
          this.addressMsg = this.$t('sieTransfer.text13')
          return false
        }
      }
      if (this.transferMoney === '') {
        this.moneyTip = true
        return false
      }
      // if (this.transferIndex === 0) {
      //   if (this.$refs.inputOne.value.length < 32) {
      //     this.addressTip = true
      //     this.addressMsg = this.$t('sieTransfer.text13')
      //     return false
      //   }
      // }
      if (this.transferAddress !== '' && this.transferMoney !== '') {
        if (this.userInfo.openTradePassword !== 2) {
          this.setSafeVerific = true
        } else if (this.userInfo.openMobileCode !== 2 && this.userInfo.openGoogleCode !== 2) {
          this.noBindPhoneShow = true
        } else {
          this.payPopupShow = true
          this.isgogoleDuanxin = true
          this.codeType = '1'
          // 有谷歌
          // if (this.userInfo.openGoogleCode === 2) {
          //   this.isgogoleDuanxin = false
          //   this.codeType = '2'
          //   // 如果只有短信
          // } else if (this.userInfo.openMobileCode === 2 && this.userInfo.openGoogleCode !== 2) {
          //   this.isgogoleDuanxin = true
          //   this.codeType = '1'
          //   // 都开通用谷歌
          // }
        }
      }
    },
    // 支付确定按钮
    confirmPay () {
      this.errinMsgText = ''
      if (this.payPassword === '') {
        this.payFailTip = this.$t('dialog.text2')
        return false
      } else if (this.payCode === '') {
        this.payFailTip = this.$t('dialog.text11')
        return false
      }
      this.loadingConfim2 = true
      let fmData = new FormData()
      fmData.append('receiveAddress', this.transferAddress)
      fmData.append('amount', this.transferMoney)
      fmData.append('type', this.transferNum) // 1:内部转出 2：转出第三方
      fmData.append('tradePwd', this.payPassword)
      fmData.append('codeType', this.codeType) // 1：手机验证码 2：谷歌验证码
      fmData.append('code', this.payCode)
      let ajaxLang1 = ''
      if (localStorage.getItem('kleinLang') === 'EN') {
        ajaxLang1 = 'en'
      }
      this.$http.post(`${this.$api}/transferRecord/transferOut`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
        if (res.data.success) {
          this.loadingConfim2 = false
          // console.log(res.data)
          // console.log(res.data.data)
          this.data = res.data.data
          this.noBindPhoneShow = false
          this.payPopupShow = false
          this.confirmShow = true
          this.isSuccess = true
        } else {
          this.loadingConfim2 = false
          this.errinMsgText = res.data.msg
          this.noBindPhoneShow = false
          this.payPopupShow = false
          this.confirmShow = true
          this.isSuccess = false
        }
      }).catch(err => {
        console.log(err)
        this.loadingConfim2 = false
        this.confirmShow = true
        this.isSuccess = false
        this.errinMsgText = this.$t('dialog.text12')
      })
    },
    // 发送短信按钮
    getCode () {
      if (this.sendBtnValue === this.$t('dialog.text10')) {
        this.countDown()
        let formData = new FormData()
        formData.append('json', JSON.stringify({'type': 'code'}))
        this.isDisabled = true
        let ajaxLang2 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang2 = 'en'
        }
        this.$http.post(this.$api + '/user/sendSmsCode', formData, {headers: {'secret-language': ajaxLang2}}).then(res => {
          if (res.data.success) {
            this.payFailTip = ''
          } else {
            if (res.data.msg) {
              this.payFailTip = res.data.msg
              this.isDisabled = false
              this.sendBtnValue = this.$t('dialog.text10')
              this.sendBtnTimes = 60
              clearTimeout(this.timer)
            } else {
              this.payFailTip = this.$t('dialog.text13')
              this.sendBtnValue = this.$t('dialog.text10')
              this.sendBtnTimes = 60
            }
          }
        }).catch(err => {
          console.log(err)
          this.isDisabled = false
          clearTimeout(this.timer)
          this.sendBtnValue = this.$t('dialog.text10')
          this.sendBtnTimes = 60
          this.payFailTip = this.$t('dialog.text13')
        })
      }
    },
    // 短信倒计时
    countDown () {
      if (this.sendBtnValue === 0) {
        this.sendBtnValue = this.$t('dialog.text10')
        this.sendBtnTimes = 60
        this.isDisabled = false
        clearTimeout(this.timer)
      } else {
        this.sendBtnTimes--
        this.sendBtnValue = this.sendBtnTimes
        this.isDisabled = true
        this.timer = setTimeout(() => this.countDown(), 1000)
      }
    },
    // 关闭图标
    closeIcon () {
      this.payPopupShow = false
      this.payFailTip = ''
      this.addressTip = false
      this.moneyTip = false
      this.setSafeVerific = false
    },
    // 支付成功按钮
    successPay () {
      this.$router.push({
        path: '/account/sieOrder/transferRecordDetail',
        query: {
          id: this.data
        }
      })
    },
    // 支付失败按钮
    successClose () {
      this.payPassword = ''
      this.payCode = ''
      this.payFailTip = ''
      this.confirmShow = false
    },
    // 支付失败按钮
    failedDialog () {
      this.payPassword = ''
      this.payCode = ''
      this.payFailTip = ''
      this.confirmShow = false
    }
  }
  // destroyed () {
  //   document.removeEventListener('click', this.closeUnitMenu) // 组件摧毁时关闭监听
  // }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  input[type=number] {
    -moz-appearance:textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }
  .sieTransfer
    .pc
      @media screen and (max-width: 1200px) {
        display: none;
      }
      .pc-content
        margin-left 92px
        margin-right 20px
        max-width 1000px
        .property-title
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
            a
              font-size:22px;
              color: #181818;
        .transfer-account
          padding-bottom 40px
          position relative
          /*overflow hidden*/
          overflow inherit
          .transfer-title
            margin-bottom 20px
            margin-left 22px
            font-size 20px
            color #181818
          .inputTipBox-select
            position relative
            input::-webkit-input-placeholder{
                color #181818
             }
            input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                    color #181818
                  }
            input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                  color #181818
                }
            input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                  color #181818
                }
          .common-inputBox
            input::-webkit-input-placeholder{
            color #807e7e
            }
            input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                    color #807e7e
                  }
            input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
              color #807e7e
            }
            input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
              color #807e7e
            }
          .inputBox
            z-index 20
            .transfer-input
              display block
              width 100%
              height 68px
              padding 0 30px
              padding-right 60px
              border-radius 4px
              font-size 22px
              background-color #edeff1
              color #181818
              outline none
              border 1px solid #edeff1
              box-sizing border-box
              transition: border-color .15s ease-in-out
            .common-input
              background-color #fff
              border 1px solid #d9d9d9
              font-size 20px
            .discount-btn
              right 0
              background-color #fc534c
              border-bottom-right-radius 6px
              border-top-right-radius 6px
              width 100px
              height 100%
              position absolute
              font-size 0
              top 0
              display flex
              align-items center
              justify-content center
              cursor pointer
              user-select none
              .arrowDown
                background url("../../../../assets/images/sieTransfer/arrow_down_white.png") no-repeat
                display inline-block
                width 13px
                height 8px
                background-size cover!important
                transition .2s
                &.arrowActive
                  transform rotate(180deg)
            .selectMenu
              width 100%
              height 0
              position absolute
              top 68px
              left 0
              background-color #f7f9fa
              border-bottom-right-radius 6px
              border-bottom-left-radius 6px
              transition all 0.3s linear
              z-index 20
              overflow hidden
              &.selectMenuActive
                height 140px
                padding 20px 0
              li
                font-size 22px
                height 50px
                line-height 50px
                padding 0 20px
                color #A7A7A7
                user-select none
                cursor pointer
                &.liActive
                  color #181818
          .inputTipMsg
            display inline-block
            font-size 18px
            color #fc534c
            margin-top 10px
        .sure-btn
          display block
          width 100%
          height 48px
          background-color #fc534c
          color #fff
          border-radius 6px
          font-size 18px
          outline none
          border none
          user-select none
          cursor pointer
          margin-top 60px
          &:active
            opacity .6
          @media screen and (max-width 1200px)
            margin-bottom 60px
  /*移动端样式*/
  .mobile
    @media screen and (max-width: 1200px) {
      display: block;
    }
    .transfer-content
      padding 0 20px
      .transfer-type
        margin-bottom 20px
        .type-title
          font-size 14px
          color #181818
          margin-bottom 10px
        .first-input
          position relative
          width 100%
          input::-webkit-input-placeholder{
              color #181818
            }
          input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                  color #181818
                }
          input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
              color #181818
            }
          input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
              color #181818
            }
        .type-box
          z-index 20
          .input-type
            display block
            height 48px
            width 100%
            padding 0 20px
            box-sizing border-box
            border-radius 4px
            font-size 14px
            background-color #f0f2f5
            border 1px solid #f0f2f5
          .input-mobile
            display block
            height 48px
            width 100%
            padding 0 20px
            box-sizing border-box
            border-radius 4px
            font-size 14px
            background-color #fff
            border 1px solid #f0f2f5
          .type-btn
            position absolute
            right 0
            top 0
            height 100%
            width 50px
            background-color #fc534c
            border-bottom-right-radius 6px
            border-top-right-radius 6px
            font-size 0
            display flex
            justify-content center
            align-items center
            cursor pointer
            user-select none
            .arrowDown
              background url("../../../../assets/images/sieTransfer/arrow_down_white.png") no-repeat
              display inline-block
              width 13px
              height 8px
              background-size cover!important
              transition .2s
              &.arrowActive
                transform rotate(180deg)
          .selectMenu
            width 100%
            height 0
            position absolute
            top 48px
            left 0
            background-color #f7f9fa
            border-bottom-right-radius 6px
            border-bottom-left-radius 6px
            transition all 0.3s linear
            z-index 20
            overflow hidden
            &.selectMenuActive
              height 100px
              padding 10px 0
            li
              height 40px
              line-height 40px
              padding 0 20px
              color #A7A7A7
              cursor pointer
              user-select none
              -webkit-tap-highlight-color:transparent; // 兼容
              &.liActive
                color #181818
        .inputTipMsg
          display inline-block
          font-size 16px
          color #fc534c
          margin-top 10px
    .fee
      font-size 14px
      color #181818
      margin-bottom 10px
    .sure-btn
      display block
      width 100%
      height 48px
      background-color #fc534c
      color #fff
      border-radius 6px
      font-size 18px
      outline none
      border none
      user-select none
      cursor pointer
      margin-top 50px
      &:active
        opacity .6
  /*交易所弹出窗*/
  .myPopup {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    @media screen and (max-width: 768px) {
      .myPopup .myPopup-box{
        width: 80%;
        height: 100%;
      }
    }
  }
  .myPopup .myPopup-box {
    width: 600px;
    padding: 120px 80px 157px 80px
    color: #1a1a1a;
    position: relative;
    border-radius 8px
    background-color: #ffffff;
    box-shadow 0 0 5px #d7d9db
  }
  @media screen and (max-width: 768px) {
    .myPopup .myPopup-box{
      width:70%;
      padding 20px
    }
  }
  .error-text
    font-size: 24px
    text-align: center
  .myPopup .myPopup-box .close{
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    z-index: 999;
    cursor: pointer;
    user-select none
  }
  @media screen and (max-width: 768px) {
    .myPopup .myPopup-box .close{
      top: 4px;
      right: 4px;
      width: 30px;
      height: 30px;
    }
  }
  .myPopup .myPopup-box .close:active {
    opacity: 0.6;
  }
  .myPopup .myPopup-box .close img{
    display: block;
    width: 20px;
    height: 20px;
  }
  .myPopup .myPopup-box .title {
    font-size: 28px;
    font-weight bold
    margin-bottom: 50px;
    text-align: center;
  }
  @media screen and (max-width: 768px) {
    .myPopup .myPopup-box .title {
      font-size: 18px;
      margin-bottom: 30px;
    }
  }
  .myPopup .myPopup-box .errinMsg
    font-size: 24px;
    color: #fc534c
    text-align center
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  .myPopup .myPopup-box input {
    height: 48px;
    width 100%
    font-size 16px
    border 1px solid #d7d9db
    margin-bottom  30px
    position: relative;
    border-radius 8px
    @media screen and (max-width: 768px) {
      width 100%
      margin-bottom  20px
    }
  }
  .myPopup .myPopup-box input::-webkit-input-placeholder {
    text-align: left;
    opacity: 0.6;
    color #666666
  }
  .myPopup .myPopup-box .errmsg-tips
    text-align center
    font-size: 18px;
    color: #fc534c
    @media screen and (max-width: 768px) {
      font-size: 14px;
      margin-top: 0px;
    }
  .tradingCenter-btn {
    display: block;
    width 100%
    height: 58px;
    line-height 58px
    margin-top 40px
    border-radius: 4px;
    text-align: center;
    background-color: #fc534c
    color #fff
    box-shadow 0 5px 10px #d7d9db
    border 1px solid #fc534c
    font-size: 20px;
    cursor: pointer;
    outline: none;
    user-select: none;
  }
  @media screen and (max-width: 768px) {
    .tradingCenter-btn{
      height: 40px;
      font-size: 14px;
      width 100%
      margin-top 30px
      line-height 40px
    }
  }
  .tradingCenter-btn:active {
    opacity: 0.6;
  }
  .tradingCenter-btn
    display flex !important
    justify-content center
    border none !important
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
  .tradingCenter-input {
    display: block;
    border-radius: 4px;
    padding: 0 30px;
    box-sizing border-box
    background-color: transparent;
    outline: none;
    border 1px solid #232044
    font-size: 16px;
    color #666666
  }
  @media screen and (max-width: 680px) {
    .tradingCenter-input {
      height: 40px;
      font-size: 14px!important;
    }
  }
  .tradingCenter-input::-webkit-input-placeholder {
    color #666666
    text-align: center;
  }
  .tradingCenter-tab {
    color: #ffffff;
    font-size: 14px;
    border-bottom: 1px solid #fc534c
    overflow: hidden;
  }
  .payMsg-box
    position relative
  .sendMsg
    display block
    /*width 88px*/
    height 50px
    line-height 50px
    padding 0 20px
    background-color transparent
    color #fc534c
    font-size 16px
    position absolute
    right 0px
    bottom 0px
    border none
    outline none
    cursor pointer
    user-select none
    @media screen and (max-width 768px ) {
      height 50px
      line-height 50px
      position absolute
    }
    &.disable
      pointer-events none
      cursor auto
      opacity .5
  .tip
    margin-bottom 30px
  .text-tip
    margin-left 100px
    margin-bottom 30px
    @media screen and (max-width 680px ) {
      margin-left 0
    }
  </style>
