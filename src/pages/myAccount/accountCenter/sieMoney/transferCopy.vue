<template>
  <div class="sieTransfer">
    <div class="pc">
      <div class="pc-content">
        <div class="property-title">
          <h6>{{$t('sieMoney.text3')}}</h6>
        </div>
        <div class="padding-tab">
          <div class="tab trading-tab">
            <div class="table-item" :class="{'active': tabTwoIndex === index}" v-for="(item, index) in usdUsername" :key="index" @click="changeTab(index, 1)">{{item}}</div>
          </div>
        </div>
        <!--SIE转账-->
        <div class="SIE-transfer" v-if="tabTwoIndex === 0">
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
            <div class="transfer-title" v-if="userBalanceSIE > -1">
              <span v-if="transferIndex === 0">3.{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE.toFixed(4)}} SIE)</span>
              <span v-if="transferIndex === 1">3.{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE.toFixed(4)}} SIE)</span>
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
        </div>
        <!--USD转账-->
        <div class="USD-transfer" v-if="tabTwoIndex === 1">
          <div class="transfer-account">
            <div class="transfer-title">
              <span>1.{{$t('sieMoney.text14')}}:</span>
            </div>
            <div class="inputBox common-inputBox">
              <input  class="transfer-input common-input" type="text" v-model.trim="transferAddress"  ref="inputOne" :placeholder="$t('sieTransfer.text15')" @focus="focusInput(1)">
            </div>
            <span class="inputTipMsg" v-if="addressTip">{{addressMsg}}</span>
          </div>
          <div class="transfer-account">
            <div class="transfer-title">
              <span>2.{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{$fourNumber2(userBalanceUSD)}} USD)</span>
            </div>
            <div class="inputBox common-inputBox">
              <input class="transfer-input common-input " type="text" v-model.trim="transferMoney" @input="checkTransferMoney"  :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
        </div>
        <!-- ETH转账 -->
        <div class="ETH-transfer" v-if="tabTwoIndex === 2">
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
            <div class="transfer-title" v-if="userBalanceETH > -1">
              <span v-if="transferIndex === 0">3.{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceETH.toFixed(4)}} ETH)</span>
              <span v-if="transferIndex === 1">3.{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceETH.toFixed(4)}} ETH)</span>
            </div>
            <div class="inputBox common-inputBox">
              <input class="transfer-input common-input " type="text" v-model.trim="transferMoney" @input="checkTransferMoney"  :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
          <p class="fee" v-if="transferIndex === 1">
            {{$t('sieTransfer.text7')}}: <span style="color: #FC534C">{{feeNumber | fourNumber}} ETH</span>
            <span>,{{$t('sieTransfer.text9')}}：<span style="color: #FC534C">{{getPaySum | fourNumber}} ETH</span></span>
          </p>
        </div>
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
        <li :class="{tabActive: tabTwoIndex === 0}" @click="changeType(0)">SIE{{$t('sieMoney.text3')}}</li>
        <li :class="{tabActive: tabTwoIndex === 1}" @click="changeType(1)">USD{{$t('sieMoney.text3')}}</li>
      </ul>
      <div class="transfer-content">
        <div class="mobile-SIE" v-if="tabTwoIndex === 0">
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
            <div class="type-title" v-if="userBalanceSIE > -1">
              <span v-if="transferIndex === 0">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE.toFixed(4)}} SIE)</span>
              <span v-if="transferIndex === 1">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE.toFixed(4)}} SIE)</span>
            </div>
            <div class="type-box">
              <input class="input-mobile " type="text" v-model.trim="transferMoney" @input="checkTransferMoney"  :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
          <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text11')}}: <span style="color: #FC534C">{{feeNumber | fourNumber}} SIE</span></p>
          <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text12')}}：<span style="color: #FC534C">{{getPaySum | fourNumber}} SIE</span></p>
        </div>
        <div class="mobile-USD" v-if="tabTwoIndex === 1 ">
          <div class="transfer-type">
            <div class="type-title">
              <span>{{$t('sieMoney.text14')}}:</span>
            </div>
            <div class="type-box">
              <input  class="input-mobile " type="text" v-model.trim="transferAddress"  :placeholder="$t('sieTransfer.text15')" @focus="focusInput(1)">
            </div>
            <p class="inputTipMsg" v-if="addressTip">{{addressMsg}}</p>
          </div>
          <div class="transfer-type">
            <div class="type-title">
              <span>{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{$fourNumber2(userBalanceUSD)}} USD)</span>
            </div>
            <div class="type-box">
              <input class="input-mobile " type="text" v-model.trim="transferMoney" @input="checkTransferMoney"  :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
        </div>
        <button class="sure-btn" @click="confirm()">{{$t('sieTransfer.text10')}}</button>
      </div>
    </div>
    <!--确定弹窗-->
    <div class="myPopup" v-show="payPopupShow">
      <div class="myPopup-box">
        <a class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></a>
        <div class="formDiv">
          <h3 class="title">{{$t('dialog.text14')}}{{receiveUser}}{{$t('dialog.text15')}}</h3>
          <input class="payPassword tradingCenter-input" type="password" v-model.trim="payPassword"  value="" :placeholder="$t('dialog.text2')">
          <div class="shortMsg" v-show="!isgogoleDuanxin">
            <div class="payMsg-box">
              <input class="payMsg tradingCenter-input" v-model.trim="payCode"   :placeholder="$t('dialog.text4')" type="text" value="">
            </div>
          </div>
          <div class="errmsg-tips">{{payFailTip}}</div>
          <button class="tradingCenter-btn pay-btn" @click="confirmPay()" v-if="tabTwoIndex === 0">{{$t('dialog.text5')}}</button>
          <button class="tradingCenter-btn pay-btn" @click="usdConfirmPay()" v-if="tabTwoIndex === 1">{{$t('dialog.text5')}}</button>
          <button class="tradingCenter-btn pay-btn" @click="ETHConfirmPay()" v-if="tabTwoIndex === 2">{{$t('dialog.text5')}}</button>
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
        <div class="tradingCenter-btn mobile-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>
        <div class="tradingCenter-btn pc-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>
      </div>
    </div>
    <div class="myPopup" v-show="emailPrefixShow">
      <div class="myPopup-box">
        <a class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></a>
        <div class="formDiv">
          <h3 class="title">{{$t('dialog.text16')}}</h3>
          <input class="payPassword tradingCenter-input" type="text" v-model.trim="emailPrefix"  value="" :placeholder="$t('dialog.text17')">
          <div class="errmsg-tips">{{payFailTip}}</div>
          <button class="tradingCenter-btn pay-btn" @click="confirmEmail()">{{$t('dialog.text5')}}</button>
        </div>
      </div>
    </div>
    <!--请先绑定手机号码-->
    <!--<div class="myPopup" v-show="noBindPhoneShow">-->
    <!--<div class="myPopup-box">-->
    <!--<h3 class="error-text">{{$t('dialog.text9')}}</h3>-->
    <!--<div class="tradingCenter-btn mobile-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>-->
    <!--<div class="tradingCenter-btn pc-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        transferValue: this.$t('sieTransfer.name1'), // 所选择的转账类型
        transferAddress: '', // 转账地址
        transferMoney: '', // 转账金额
        transferSelectShow: false, // 下拉框
        transferIndex: 0,
        usdUsername: ['SIE', 'USD', 'ETH'],
        tabTwoIndex: 0,
        transferUSD: '',
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
        emailPrefixShow: false, // 验证邮箱弹窗
        emailPrefix: '', // 邮箱前四位
        receiveUser: '', // 转账用户
        transferNum: 1
      }
    },
    computed: {
      ...mapGetters([
        'userAccount',
        'userInfo',
        'outEthRate',
        'siePrice',
        'userBalanceSIE',
        'userBalanceUSD',
        'userBalanceETH'
      ]),
      // 打包费
      feeNumber () {
        if (this.transferMoney === '' || this.transferMoney === 0) {
          return 0
        }
        // console.log(((parseFloat(this.transferMoney) * this.outEthRate) / this.siePrice).toFixed(4))
        if (((Number(this.transferMoney) * Number(this.outEthRate) / 100) * Number(this.siePrice)).toFixed(4) >= 3) {
          return parseFloat(this.transferMoney) * Number(this.outEthRate) / 100
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
    mounted() {
      var that = this
      window.onresize = function () {
        that.gotoSafe() // 解决PC端空白问题
      }
    },
    methods: {
      gotoSafe () {
        if (window.innerWidth > 1200) {
          this.$router.push('/account/transfer')
        } else {
          this.$router.push('/account/transferCopy')
        }
      },
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
      changeType (num) {
        if (num === 0) {
          this.tabTwoIndex = 0
          this.transferAddress = ''
          this.transferMoney = ''
        } else {
          this.tabTwoIndex = 1
          this.transferAddress = ''
          this.transferMoney = ''
        }
      },
      // tab切换
      changeTab (index) {
        this.tabTwoIndex = index
        if (index === 0 || index === 2) {
          this.transferAddress = ''
          this.transferMoney = ''
          this.transferIndex = 0
          this.transferValue = this.$t('sieTransfer.name1')
        } else {
          this.transferAddress = ''
          this.transferMoney = ''
        }
      },
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
        if (this.tabTwoIndex === 0) {
          if (!/^[0-9]+\.?[0-9]{0,4}$/.test(this.transferMoney)) {
            this.transferMoney = ''
          } else if (this.transferMoney <= 0) {
            this.transferMoney = ''
          }
          if (!/^[0-9]+\.?[0-9]{0,4}$/.test(this.transferUSD)) {
            this.transferUSD = ''
          } else if (this.transferUSD <= 0) {
            this.transferUSD = ''
          }
          // function fourNum (value) {
          //   if (!isNaN(value) && value !== null) {
          //     let f = Math.floor(value * 10000) / 10000
          //     let s = f.toString()
          //     let rs = s.indexOf('.')
          //     if (rs < 0) {
          //       rs = s.length
          //       s += '.'
          //     }
          //     while (s.length <= rs + 4) {
          //       s += '0'
          //     }
          //     return s
          //   }
          // }
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
            // console.log((((Number(this.transferMoney) * Number(this.outEthRate)) / 100) * Number(this.siePrice)).toFixed(4))
            if (((Number(this.transferMoney) * Number(this.outEthRate) / 100) * Number(this.siePrice)).toFixed(4) >= 3) {
              this.maxInput = Number(this.userBalanceSIE) / (1 + Number(this.outEthRate) / 100)
            } else if (((Number(this.transferMoney) * Number(this.outEthRate) / 100) * Number(this.siePrice)).toFixed(4) < 3) {
              this.maxInput = Number(this.userBalanceSIE) - Number(3 / Number(this.siePrice))
            }
            // this.maxInput = Number(this.userBalanceSIE) / (1 + Number(this.outEthRate))
            // this.maxInput = Number(this.userBalanceSIE) - Number(3 / Number(this.siePrice))
            if (this.transferMoney >= this.maxInput) {
              this.transferMoney = this.maxInput.toFixed(4)
            }
          } else {
            if ((this.userBalanceSIE).toFixed(4) < parseFloat(this.transferMoney)) {
              this.transferMoney = (Number(this.userBalanceSIE)).toFixed(4)
            } else if (this.transferMoney < 1 || (this.transferMoney >= 1) === false) {
              this.transferMoney = ''
            }
          }
        } else if (this.tabTwoIndex === 1) {
          if ((this.userBalanceUSD).toFixed(4) < parseFloat(this.transferMoney)) {
            this.transferMoney = (Number(this.userBalanceUSD)).toFixed(4)
          }
        }
      },
      // 确定按钮弹窗
      confirmEmail () {
        if (!this.emailPrefix) {
          this.payFailTip = this.$t('dialog.text17')
          return false
        }
        let fmData3 = new FormData()
        fmData3.append('receiveUser', this.transferAddress)
        fmData3.append('emailPrefix', this.emailPrefix)
        let ajaxLang1 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang1 = 'en'
        }
        this.$http.post(`${this.$api}/transferRecord/checkMailTransfer`, fmData3, {headers: {'secret-language': ajaxLang1}}).then(res => {
          if (res.data.success) {
            this.receiveUser = res.data.data.receiveUser
            this.payment()
            this.emailPrefixShow = false
          } else {
            this.payFailTip = res.data.msg
          }
        }).catch(err => {
          console.log(err)
        })
      },
      payment () {
        this.payFailTip = ''
        if (this.userInfo.openTradePassword !== 2) {
          this.setSafeVerific = true
        } else if (this.userInfo.openGoogleCode !== 2) {
          this.setSafeVerific = true
        } else {
          this.payPopupShow = true
          // 有谷歌
          if (this.userInfo.openGoogleCode === 2) {
            this.isgogoleDuanxin = false
            this.codeType = '2'
            // 如果只有短信
          }
          // else if (this.userInfo.openMobileCode === 2 && this.userInfo.openGoogleCode !== 2) {
          //   this.isgogoleDuanxin = true
          //   this.codeType = '1'
          //   // 都开通用谷歌
          // }
        }
      },
      confirm () {
        this.emailPrefix = ''
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
          this.emailPrefixShow = true
          // if (this.userInfo.openTradePassword !== 2) {
          //   this.setSafeVerific = true
          // } else if (this.userInfo.openGoogleCode !== 2) {
          //   this.setSafeVerific = true
          // } else {
          //   this.payPopupShow = true
          //   // 有谷歌
          //   if (this.userInfo.openGoogleCode === 2) {
          //     this.isgogoleDuanxin = false
          //     this.codeType = '2'
          //     // 如果只有短信
          //   }
          //   // else if (this.userInfo.openMobileCode === 2 && this.userInfo.openGoogleCode !== 2) {
          //   //   this.isgogoleDuanxin = true
          //   //   this.codeType = '1'
          //   //   // 都开通用谷歌
          //   // }
          // }
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
        let fmData = new FormData()
        fmData.append('receiveAddress', this.transferAddress)
        fmData.append('amount', this.transferMoney)
        fmData.append('type', this.transferNum) // 1:内部转出 2：转出第三方
        fmData.append('tradePwd', this.payPassword)
        fmData.append('codeType', this.codeType) // 1：手机验证码 2：谷歌验证码
        fmData.append('code', this.payCode)
        fmData.append('emailPrefix', this.emailPrefix)
        let ajaxLang1 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang1 = 'en'
        }
        this.$http.post(`${this.$api}/transferRecord/transferOut`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
          if (res.data.success) {
            // console.log(res.data)
            // console.log(res.data.data)
            this.data = res.data.data
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = true
          } else {
            this.errinMsgText = res.data.msg
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = false
          }
        }).catch(err => {
          console.log(err)
          this.confirmShow = true
          this.isSuccess = false
          this.errinMsgText = this.$t('dialog.text12')
        })
      },
      usdConfirmPay () {
        this.errinMsgText = ''
        if (this.payPassword === '') {
          this.payFailTip = this.$t('dialog.text2')
          return false
        } else if (this.payCode === '') {
          this.payFailTip = this.$t('dialog.text11')
          return false
        }
        let fmData = new FormData()
        fmData.append('receiveUser', this.transferAddress)
        fmData.append('amount', this.transferMoney)
        fmData.append('currency', 'USD') // 1:USD 2：ETH
        fmData.append('tradePwd', this.payPassword)
        fmData.append('codeType', this.codeType) // 1：手机验证码 2：谷歌验证码
        fmData.append('code', this.payCode)
        fmData.append('emailPrefix', this.emailPrefix)
        let ajaxLang1 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang1 = 'en'
        }
        this.$http.post(`${this.$api}/transferRecord/transferOutInner`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
          if (res.data.success) {
            // console.log(res.data)
            // console.log(res.data.data)
            this.data = res.data.data
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = true
          } else {
            this.errinMsgText = res.data.msg
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = false
          }
        }).catch(err => {
          console.log(err)
          this.confirmShow = true
          this.isSuccess = false
          this.errinMsgText = this.$t('dialog.text12')
        })
      },
      ETHConfirmPay () {
        this.errinMsgText = ''
        if (this.payPassword === '') {
          this.payFailTip = this.$t('dialog.text2')
          return false
        } else if (this.payCode === '') {
          this.payFailTip = this.$t('dialog.text11')
          return false
        }
        let fmData = new FormData()
        fmData.append('receiveAddress', this.transferAddress)
        fmData.append('amount', this.transferMoney)
        fmData.append('type', this.transferNum) // 1:内部转出 2：转出第三方
        fmData.append('tradePwd', this.payPassword)
        fmData.append('codeType', this.codeType) // 1：手机验证码 2：谷歌验证码
        fmData.append('code', this.payCode)
        fmData.append('emailPrefix', this.emailPrefix)
        let ajaxLang1 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang1 = 'en'
        }
        this.$http.post(`${this.$api}/transferRecord/transferOutETH`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
          if (res.data.success) {
            // console.log(res.data)
            // console.log(res.data.data)
            this.data = res.data.data
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = true
          } else {
            this.errinMsgText = res.data.msg
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = false
          }
        }).catch(err => {
          console.log(err)
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
        this.emailPrefixShow = false
        this.emailPrefix = ''
      },
      // 支付成功按钮
      successPay () {
        if (this.tabTwoIndex === 0) {
          this.$router.push({
            path: '/account/sieOrder/transferRecordDetail',
            query: {
              id: this.data
            }
          })
        } else {
          this.$router.push({
            path: '/account/usdOrder/usdTransferDetail',
            query: {
              id: this.data
            }
          })
        }
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
            input::-webkit-input-placeholder{
                    color:#181818
                  }
            input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                    color:#181818
                  }
            input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
              color:#181818
            }
            input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
              color:#181818
            }
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
    padding 0 15px
    @media screen and (max-width: 1200px) {
      display: block;
    }
    .transfer-content
      .transfer-type
        margin-bottom 20px
        .type-title
          font-size 14px
          color #181818
          margin-bottom 10px
        .first-input
          position relative
          width 100%
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
      top: 13px;
      right: 13px;
      width: 10px;
      height: 10px;
    }
  }
  .myPopup .myPopup-box .close:active {
    opacity: 0.6;
  }
  .myPopup .myPopup-box .close img{
    display: block;
    width: 15px;
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
      font-size: 16px;
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
  .tradingCenter-btn
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
    &.mobile-btn
      @media screen and (max-width: 1200px)
        display block
      @media screen and (min-width: 1200px)
        display none
    &.pc-btn
      @media screen and (max-width: 1200px)
        display none
      @media screen and (min-width: 1200px)
        display block
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
  .tradingCenter-input {
    display: block;
    border-radius: 4px;
    padding: 0 10px;
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
      font-size: 12px!important;
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
  .padding-tab
    padding: 20px 0 36px
    @media screen and (max-width 1200px)
      padding: 30px 0
  .trading-tab
    display flex
    align-items center
    border-radius 4px
    border: none
    @media screen and (max-width 1200px)
      border: 1px solid #fc534c
    .table-item
      height 68px
      font-size: 20px
      flex 1
      display flex
      align-items center
      justify-content center
      cursor pointer
      background-color: #edeff1
      color #181818
      @media screen and (max-width 1200px)
        height: 46px
        color #fc534c
        background-color: #fff
      &.active
        background-color: #fc534c
        color #fff
      &:nth-child(1)
        border-radius 4px 0 0 4px
      &:nth-child(2)
        border-radius 0 4px 4px 0
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
      border 1px solid #FC534C
      color #FC534C
      font-size 16px
      border-radius 4px
      &:first-child
        border-bottom-right-radius 0
        border-top-right-radius 0
      &:last-child
        border-bottom-left-radius 0
        border-top-left-radius 0
      &.tabActive
        background-color #FC534C
        color #fff
</style>
