<template>
  <div class="rechargeUsd">
    <!-- USD提现 -->
    <div id="fixed-top-header">
      <div class="back" @click="$router.push('/account/usdOrder')">
        <div class="icon"></div>
      </div>
      <h3 class="fixed-title">{{$t('usdOrder.text3')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <h3 class="record-title">
      <span class="line"></span>
      <span>{{$t('usdOrder.text3')}}</span>
    </h3>
    <div class="usd-wrapper">
      <!--法币-->
      <div class="formDiv form-fabi">
        <div class="form-item form-current">
          <div class="label">{{$t('usdTixian.text5')}}：</div>
          <div class="pullDown inputBoxSecond">
            <div class="inputBox">
              <div class="input no-select">{{depositCurrency}}</div>
              <div class="input-right icon-input" @click="optionConfim = !optionConfim">
                <div class="icon-arror" :class="{'rotate-icon': optionConfim}"></div>
              </div>
            </div>
            <ul class="selcet-uls" :class="{'option-heigth' : optionConfim}">
              <li v-for="(item, index) in moneys" @click="optionOneList(item, index)" :key="index" class="money"
                  :class="{'liActive': defaultIndex === index}">{{item.name}}
              </li>
            </ul>
          </div>
        </div>
        <div class="" v-show="!BTCWithdrawal">
          <div class="form-item">
            <div class="label">{{$t('rechargeRecord.text7')}}：（{{$t('usdTixian.text3')}} <span class="red-text">{{userBalanceUSD | fourNumber}} USD</span>）：
            </div>
            <div class="w-input">
              <div class="inputBox">
                <input class="input input-border tradingCenter-input" type="text" v-model="depositAmount"
                       :placeholder="$t('usdTixian.text4')" @input="inputMoney">
                <span class="input-right flex-right pc-random">.{{random}}USD</span>
                <span class="input-right mobile-random">.{{random}}</span>
              </div>
              <div class="error-tips">{{errInput[0].errorShow}}</div>
            </div>
          </div>
          <div class="form-item actual-form">
            <div class="label">{{$t('usdTixian.text6')}}：<span v-show="depositCurrency === 'CNY'">（{{$t('usdMoney.text74')}}{{huiRate}}）</span>
            </div>
            <div class="inputBox">
              <div class="input input-border mobile-input">{{actualPayMoney}}</div>
              <span class="input-right flex-right">{{depositCurrency}}</span>
            </div>
          </div>
        </div>
        <div class="" v-show="BTCWithdrawal">
          <div class="form-item">
            <div class="label">{{$t('rechargeRecord.text7')}}：（{{$t('usdTixian.text3')}} <span class="red-text">{{userBalanceBTC === 0 ? '0.0000' : userBalanceBTC | eightNumber}} BTC</span>）：
            </div>
            <div class="w-input">
              <div class="inputBox">
                <input class="input input-border tradingCenter-input" type="text" v-model="depositAmount"
                       :placeholder="$t('usdTixian.text4')" @input="inputBTCMoney">
                <span class="input-right flex-right pc-random">BTC</span>
                <!--
                  <span class="input-right mobile-random">.{{random}}</span>
                -->
              </div>
              <div class="error-tips">{{errInput[0].errorShow}}</div>
            </div>
          </div>
        </div>
        <div class="dashed-line"></div>
        <div class="label mobile-hidden four-label">4.{{$t('usdTixian.text7')}}：</div>
        <!--交易账号tab-->
        <div class="padding-tab">
          <div class="tab trading-tab">
            <div class="table-item" :class="{'active': tabTwoIndex === index}" v-for="(item, index) in usdUsername"
                 :key="index" @click="changeTab(index, 1)">{{item}}
            </div>
          </div>
        </div>
        <p class="no-bank" v-show="noBank">{{$t('usdTixian.text22')}}</p>
        <!--绑定交易 00-->
        <div class="binding-wrapper" v-if="tabTwoIndex === 0">
          <div class="binding-container" :class="{'no-res': bankBindArr.length === 0}">
            <div class="bank-guanli" @click="bankGuanli">{{$t('usdTixian.text23')}}</div>
            <ul class="binding-uls" v-show="!BTCWithdrawal" :class="{'max-uls': bankBindArr.length > 2}">
              <li class="binding-item" @click="checktabList(index, list)" v-for="(list, index) in bankBindArr"
                  :key="index" :class="{'active': tabOne === index}">
                <p class="desc">{{list.realName}}</p>
                <p class="desc">{{list.bankNumber}}</p>
                <p class="desc"><span>{{list.bankName}}</span><span class="margin-right">{{list.subBankName}}</span></p>
                <p class="desc" v-show="list.bankAddress && list.bankAddress !== 'null'">{{list.bankAddress}}</p>
                <p class="desc" v-show="list.iban && list.iban !== 'null'">IBAN：{{list.iban}}</p>
              </li>
            </ul>
            <ul class="btc-withdrawal"  v-show="BTCWithdrawal">
              <li @click="checktabList(index, list)" v-for="(list, index) in bankBindArr" :key="index" :class="{'active': tabOne === index}">{{list.bankNumber}}</li>
            </ul>
          </div>
        </div>
        <!--其他交易 11-->
        <div class="order-wrapper" v-else-if="tabTwoIndex === 1">
          <div class="mobile-hidden label">5.{{$t('usdMoney.text28')}}：</div>
          <div class="not-btc" v-show="!BTCWithdrawal">
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[1].deleteShow}" type="text"
                       v-model="bankName" :placeholder="$t('usdMoney.text29')" @input="inputChange(1)"
                       @focus="inputFocus(1)" @blur="inputBlur(1)">
                <div class="close-icon" @click="deleteInput(1)" v-show="inputDete[1].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">{{errInput[1].errorShow}}</div>
            </div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[2].deleteShow}" type="text"
                       v-model="bankAccount" :placeholder="$t('usdMoney.text30')" @input="inputChange(2)"
                       @focus="inputFocus(2)" @blur="inputBlur(2)">
                <div class="close-icon" @click="deleteInput(2)" v-show="inputDete[2].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">{{errInput[2].errorShow}}</div>
            </div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[3].deleteShow}" type="text"
                       v-model="bankNumber" :placeholder="$t('usdMoney.text31')" @input="inputChange(3)"
                       @focus="inputFocus(3)" @blur="inputBlur(3)">
                <div class="close-icon" @click="deleteInput(3)" v-show="inputDete[3].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">{{errInput[3].errorShow}}</div>
            </div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[4].deleteShow}" type="text"
                       v-model="branchInfo" :placeholder="$t('usdMoney.text32')" @input="inputChange(4)"
                       @focus="inputFocus(4)" @blur="inputBlur(4)">
                <div class="close-icon" @click="deleteInput(4)" v-show="inputDete[4].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">{{errInput[4].errorShow}}</div>
            </div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[5].deleteShow}" type="text"
                       v-model="branchAddress" :placeholder="$t('transAccountManag.text12')" @input="inputChange(5)"
                       @focus="inputFocus(5)" @blur="inputBlur(5)">
                <div class="close-icon" @click="deleteInput(5)" v-show="inputDete[5].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">{{errInput[5].errorShow}}</div>
            </div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[6].deleteShow}" type="text"
                       v-model="swift" :placeholder="$t('usdMoney.text34')" @input="inputChange(6)" @focus="inputFocus(6)"
                       @blur="inputBlur(6)">
                <div class="close-icon" @click="deleteInput(6)" v-show="inputDete[6].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">{{errInput[6].errorShow}}</div>
            </div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[7].deleteShow}" type="text"
                       v-model="iban" :placeholder="$t('usdMoney.text35')" @input="inputChange(7)" @focus="inputFocus(7)"
                       @blur="inputBlur(7)">
                <div class="close-icon" @click="deleteInput(7)" v-show="inputDete[7].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">{{errInput[7].errorShow}}</div>
            </div>
          </div>
          <div class="" v-show="BTCWithdrawal">
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[1].deleteShow}" type="text"
                       v-model="btcTransform" :placeholder="$t('usdMoney.text78')" @input="inputChange(5)">
                <!--<div class="close-icon" @click.stop="deleteInput(1)">-->
                  <!--<div class="close"></div>-->
                <!--</div>-->
              </div>
              <div class="error-tips">{{errInput[5].errorShow}}</div>
            </div>
          </div>
          <div class="errorTips">{{errorMsg}}</div>
        </div>
      </div>
    </div>
    <div class="tradingCenter-btn" @click="boundNext()">{{$t('dialog.text5')}}</div>
    <!-- 弹窗 -->
    <div class="pay-dialog-transfer" v-show="showDialog" @click="showDialog = false">
      <div class="dialog-content" @click.stop>
        <div class="close-confirm" @click="showDialog = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-box">
          <div class="text-error">{{errMsg}}</div>
          <div class="pay-confim-btn" @click="payConfim">{{$t('dialog.text5')}}</div>
        </div>
      </div>
    </div>
    <!-- 支付验证弹窗 -->
    <pay-money-dialog :productId="productId" :isBTCWithdrawal = "BTCWithdrawal" ref="payDialog"></pay-money-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import payMoneyDialog from '@/components/payMoneyDialog'

  export default {
    data() {
      return {
        isBtcLiActive: Boolean,
        noBank: false,
        productId: '',
        errMsg: '',
        actualPayMoney: '0.00',
        showDialog: false,
        swift: '',
        iban: '',
        comfirmBankName: '',
        usdUsername: [this.$t('usdMoney.text40'), this.$t('usdMoney.text41')],
        optionConfim: false,
        depositAmount: '',
        bankName: '',
        bankAccount: '',
        bankNumber: '',
        branchInfo: '',
        depositCurrency: 'CNY',
        defaultIndex: 0,
        branchAddress: '',
        remark: '',
        errorMsg: '',
        bankAccountId: '',
        moneys: [
          {name: 'CNY'},
          {name: 'USD'}
          // {name: 'BTC'}
        ],
        inputDete: [
          {deleteShow: false},
          {deleteShow: false},
          {deleteShow: false},
          {deleteShow: false},
          {deleteShow: false},
          {deleteShow: false},
          {deleteShow: false},
          {deleteShow: false}
        ],
        errInput: [
          {errorShow: ''},
          {errorShow: ''},
          {errorShow: ''},
          {errorShow: ''},
          {errorShow: ''},
          {errorShow: ''},
          {errorShow: ''},
          {errorShow: ''}
        ],
        tabTwoIndex: 0,
        tabOne: 0,
        bankBindArr: [],
        tixianMoney: '',
        huiRate: '',
        fillInputFlag: false,
        nobankList: false,
        BTCWithdrawal: false,
        btcTransform: ''
      }
    },
    created() {
      this.getCurrencyRate()
      this.getBankInfo()
    },
    methods: {
      bankGuanli() {
        this.$router.push({
          path: '/account/transAccountManag',
          query: {usd: 'usd2', isUsd: this.depositCurrency}
        })
      },
      // input框 充值金额校验
      inputMoney() {
        this.errInput[0].errorShow = ''
        if (this.depositAmount === '') {
          this.actualPayMoney = '0.00'
        }
        if (!/^[1-9]\d*$/.test(this.depositAmount) || this.userBalanceUSD < 1) {
          this.depositAmount = ''
        } else {
          let point = String(this.userBalanceUSD.toFixed(4)).split('.')[1]
          let random = Number(this.random) / 100
          let money = Number(this.depositAmount) + random
          if (money > this.userBalanceUSD) {
            // 判断小数部分谁大
            if ((Number(point) / 10000) < (this.random / 100)) {
              this.depositAmount = parseInt(Number(this.userBalanceUSD)) - 1
            } else {
              this.depositAmount = parseInt(Number(this.userBalanceUSD))
            }
          }
          let random2 = Number(this.random) / 100
          let money2 = Number(this.depositAmount) + random2
          this.tixianMoney = money2
          if (this.depositCurrency === 'CNY') {
            // 向上保留两位小数
            // let point = String(money * Number(this.huiRate)).split('.')[1]
            // let point0 = String(money * Number(this.huiRate)).split('.')[0]
            // if (point.length > 2) {
            //   let point2 = point.substring(0, 2)
            //   this.actualPayMoney = Number(point0) + (Number(point2) + 1) / 100
            // } else {
            //   this.actualPayMoney = money * Number(this.huiRate)
            // }
            this.actualPayMoney = ((money2 - this.tixianFei * money2) * Number(this.huiRate)).toFixed(4)
          } else {
            this.actualPayMoney = (money2 - this.tixianFei * money2).toFixed(4)
          }
          console.log(money2)
        }
      },
      // BTC input框
      inputBTCMoney() {
        this.errInput[0].errorShow = ''
        if (this.depositAmount >= this.userBalanceBTC) {
          this.depositAmount = this.userBalanceBTC
        } else { // ^([1-9][0-9]*)+(.[0-9]{1,2})?$  ^\d+(.\d{0,8})?$
          if (!/^\d+(.\d{0,8})?$/.test(this.depositAmount)) {
            this.depositAmount = this.depositAmount.substring(0, this.depositAmount.length - 1)
          }
        }
      },
      // input验证 change
      inputChange(index) {
        this.errInput[5].errorShow = ''
        this.errInput[index].errorShow = ''
      },
      // input验证 失去焦点
      inputBlur(index) {
        // this.inputDete[index].deleteShow = false
        if (index === 3) {
          if (!/^[1-9]\d*$/.test(this.bankNumber)) {
            this.errInput[3].errorShow = this.$t('usdMoney.text42')
          } else {
            this.errInput[3].errorShow = ''
          }
        }
      },
      // input 获取焦点
      inputFocus(index) {
        this.inputDete[index].deleteShow = true
      },
      // input 删除值
      deleteInput(index) {
        console.log(index)
        if (index === 1) {
          this.bankName = ''
          this.btcTransform = ''
        } else if (index === 2) {
          this.bankAccount = ''
        } else if (index === 3) {
          this.bankNumber = ''
        } else if (index === 4) {
          this.branchInfo = ''
        } else if (index === 5) {
          this.branchAddress = ''
        } else if (index === 6) {
          this.swift = ''
        } else if (index === 7) {
          this.iban = ''
        }
      },
      checktabList(index, list) {
        this.tabOne = index
        this.bankAccountId = list.id
        this.comfirmBankName = list.bankName
      },
      // 确定提现
      boundNext() {
        // 我的账户 提现
        this.noBank = false
        let bankData = {}
        if (this.tabTwoIndex === 0) {
          if (this.depositAmount === '') {
            this.errInput[0].errorShow = this.$t('usdTixian.text4')
          }
          if (this.bankBindArr.length === 0) {
            this.noBank = true
          }
          if (this.bankBindArr.length !== 0 && this.depositAmount !== '') {
            this.fillInputFlag = true
            if (!this.BTCWithdrawal) {
              bankData.amount = this.tixianMoney // 非BTC金额
              bankData.isBand = '1' // 1:绑定到我的交易账户
            } else {
              bankData.amount = this.depositAmount // BTC金额
              bankData.isBand = '2'
            }
            bankData.currency = this.depositCurrency // 币种
            bankData.bankAccountId = this.bankAccountId // 银行卡id
          }
          //  其他账户 提现
        } else {
          if (this.depositAmount === '') {
            this.errInput[0].errorShow = this.$t('usdTixian.text4')
          }
          if (this.bankName.trim() === '') {
            this.errInput[1].errorShow = this.$t('usdMoney.text29')
          }
          if (this.bankAccount.trim() === '') {
            this.errInput[2].errorShow = this.$t('usdMoney.text30')
          }
          if (this.bankNumber.trim() === '') {
            this.errInput[3].errorShow = this.$t('usdMoney.text31')
          }
          if (this.branchInfo.trim() === '') {
            this.errInput[4].errorShow = this.$t('usdMoney.text32')
          }
          if (this.btcTransform.trim() === '') {
            this.errInput[5].errorShow = this.$t('usdMoney.text78')
          }
          if (!this.BTCWithdrawal) { // 切换Tab非BTC金额提现
            if (this.bankName.trim() !== '' && this.depositAmount.trim() !== '' && this.bankAccount.trim() !== '' && this.bankNumber.trim() !== '' && this.branchInfo.trim() !== '') {
              bankData.amount = this.tixianMoney // 金额
              bankData.currency = this.depositCurrency // 币种
              bankData.bankname = this.bankName // 银行名称
              bankData.realname = this.bankAccount // 银行卡账户名
              bankData.number = this.bankNumber // 银行卡号
              bankData.subbank = this.branchInfo // 支行名称
              bankData.isBand = '2' // 2：不绑定到交易账户
              this.fillInputFlag = true
            }
          } else if (this.BTCWithdrawal) { // 切换Tab BTC金额提现
            if (this.depositAmount.trim() !== '' && this.btcTransform.trim() !== '') {
              console.log('1231212123')
              bankData.amount = this.depositAmount // 金额
              bankData.currency = this.depositCurrency // 币种
              bankData.number = this.btcTransform // 银行卡号
              bankData.isBand = '2' // 2：不绑定到交易账户
              bankData.bankAccountId = this.bankAccountId
              console.log(this.bankAccountId, this.depositAmount, this.depositCurrency, this.btcTransform)
              this.fillInputFlag = true
            }
          }
        }
        if (this.branchAddress !== '') {
          bankData.subbankaddress = this.branchAddress // string支行地址
        }
        if (this.swift !== '') { // 银行swift码
          bankData.swift = this.swift
        }
        if (this.iban !== '') { // IBAN
          bankData.iban = this.iban
        }
        if (this.fillInputFlag === true) {
          this.postRequest('/draw/createOrder', bankData).then(res => {
            if (res.data.success === true) {
              this.productId = res.data.data.id
              this.$refs.payDialog.show()
              // this.
              // this.$router.push({
              //   path: '/account/usdWithdrawMoney/usdWithSwitchBoss',
              //   query: {id: orderid}
              // })
              this.fillInputFlag = false
            } else {
              this.showDialog = true
              this.errMsg = res.data.msg
            }
          }).catch(err => {
            console.log(err)
            this.showDialog = true
            this.errMsg = this.$t('dialog.text12')
          })
        }
      },
      // 提现弹窗确认
      payConfim() {
        this.showDialog = false
        this.errMsg = ''
      },
      changeTab(index) {
        this.noBank = false
        this.tabTwoIndex = index
        if (index === 0) {
          this.bankName = ''
          this.bankAccount = ''
          this.bankNumber = ''
          this.branchInfo = ''
          this.branchAddress = ''
          this.swift = ''
          this.iban = ''
        }
      },
      // 下拉框选择
      optionOneList(item, index) {
        let random = Number(this.random) / 100
        let money = Number(this.depositAmount) + random
        if (index === 1) {
          this.BTCWithdrawal = false
          if (this.depositAmount === '') {
            this.actualPayMoney = '0.00'
          } else {
            this.actualPayMoney = (money - this.tixianFei * money).toFixed(4)
          }
        } else if (index === 0) {
          this.BTCWithdrawal = false
          // 向上保留两位小数
          if (this.depositAmount === '') {
            this.actualPayMoney = '0.00'
          } else {
            this.actualPayMoney = ((money - this.tixianFei * money) * Number(this.huiRate)).toFixed(4)
          }
        } else if (index === 2) {
          this.BTCWithdrawal = true
        }
        this.errInput[0].errorShow = ''
        this.errInput[1].errorShow = ''
        this.errInput[2].errorShow = ''
        this.errInput[3].errorShow = ''
        this.errInput[4].errorShow = ''
        this.errInput[5].errorShow = ''
        this.depositAmount = ''
        this.actualPayMoney = ''
        this.noBank = false
        this.defaultIndex = index
        this.depositCurrency = item.name
        this.optionConfim = false
        this.getBankInfo()
      },
      // USD汇率
      getCurrencyRate() {
        this.$http.get(`${this.$api}/currencyRate/queryCurrencyRate`, {
          params: {
            payCurreny: 'USD', // 支付币种
            currency: 'CNY' // 充值币种
          }
        }).then(res => {
          if (res.data.success === true) {
            this.huiRate = res.data.data.rate
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 银行卡信息详情
      getBankInfo() {
        this.postRequest('/bank/queryBankInfoList', {
          currency: this.depositCurrency, // 币种
          pageIndex: '1', // 页数
          pageSize: '20' // 每页条数
        }).then(res => {
          if (res.data.success === true) {
            this.bankBindArr = res.data.data
            if (this.bankBindArr.length > 0) {
              this.bankAccountId = this.bankBindArr[0].id
              this.comfirmBankName = this.bankBindArr[0].bankName
            }
          }
        }).catch(err => {
          console.log(err)
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
      }
    },
    computed: {
      random() {
        return Math.floor(Math.random() * 90) + 10
      },
      ...mapGetters([
        'userBalanceUSD',
        'userBalanceBTC',
        'tixianFei',
        'userInfo'
      ])
    },
    components: {
      payMoneyDialog
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  $f0f2f5 = #f0f2f5
  $F69699 = #969699
  .no-bank
    color #FC534C
    text-align: center
    margin-bottom: 20px

  .bank-guanli
    font-size: 20px
    width: 100%
    height: 68px
    display flex
    align-items center
    justify-content center
    border: 1px solid #FC534C
    border-radius 6px
    color #FC534C
    cursor pointer
    margin-bottom: 20px
    @media screen and (max-width 1200px)
      height: 46px
      font-size: 16px
      color #032e43
      border-color #032e43

  .red-text
    color #fc534c

  .mobile-hidden
    @media screen and (max-width 1200px)
      display none

  .rechargeUsd
    padding-top: 70px
    padding-left: 92px
    max-width 1000px
    box-sizing content-box
    @media screen and (max-width 1500px)
      padding-left: 50px
      padding-right: 50px
    @media screen and (max-width 1200px)
      padding: 0
      max-width 100%
    .record-title
      font-weight: normal;
      display: flex;
      align-items: center;
      height: 64px;
      font-size: 22px;
      color: #181818;
      background-color: #edeff1;
      @media screen and (max-width 1200px)
        display: none
      .line
        display: block;
        width: 10px;
        height: 22px;
        margin-right: 30px;
        background-color: #032e43;
    #fixed-top-header
      border-bottom none
    .padding
      padding: 0 15px
      .margin
        margin-top: 50px
    .dashed-line
      display none
      width: 100%
      height: 1px
      background: url("../../../../assets/images/myAccount/dashed.png") repeat-x
      @media screen and (max-width 1200px)
        display block
    .tradingCenter-btn
      background-color: #fc534c
      height 68px
      display flex
      align-items center
      justify-content center
      color #fff
      cursor pointer
      margin-bottom: 100px
      border-radius 4px
      font-size: 20px
      @media screen and (max-width 1200px)
        font-size: 14px
        height: 50px
        margin-bottom: 0
        background-color: #032e43
    .usd-wrapper
      padding-top: 60px
      @media screen and (max-width 1200px)
        min-height calc(100vh - 50px)
        padding-top: 80px
      .label
        font-size: 20px
        color #181818
        margin-bottom: 20px
        @media screen and (max-width 1200px)
          margin-bottom: 14px
          font-size: 12px
      .four-label
        margin-bottom: 0
      .actual-form
        margin-bottom: 60px
        @media screen and (max-width 1200px)
          margin-bottom: 30px
      .form-current
        margin-bottom: 40px
        @media screen and (max-width 1200px)
          margin-bottom: 20px
      .formDiv
        @media screen and (max-width 1200px)
          padding: 0 15px
      .form-item
        color #181818
        .w-input
          margin-bottom: 40px
          @media screen and (max-width 1200px)
            margin-bottom: 30px
          .error-tips
            margin-top: 10px;
            margin-left: 40px;
            color: #fc534c;
            font-size: 14px;
            @media screen and (max-width 1200px)
              margin-left: 15px
        .inputBox
          display flex
          height: 68px
          @media screen and (max-width 1200px)
            height: 50px
          .input
            flex 1
            border-radius 4px
            display: flex
            align-items center
            padding: 0 15px 0 40px
            font-size: 22px
            @media screen and (max-width 1200px)
              font-size: 14px
              padding-left: 15px
          .no-select
            background-color: #edeff1
            border-radius 4px 0 0 4px
          .input-border
            border: 1px solid #d7d9db
          .mobile-input
            @media screen and (max-width 1200px)
              background-color: #f0f2f5
              border: none
          .input-right
            width: 100px
            height: 100%
            display flex
            align-items center
            justify-content center
            font-size: 18px
            color #969699
            @media screen and (max-width 1200px)
              width: 50px
          .flex-right
            font-size: 22px
            color #181818
            font-weight bold
            align-items flex-end
            @media screen and (max-width 1200px)
              align-items: center
              font-size: 18px
              color #969699
              font-weight: normal
          .pc-random
            @media screen and (min-width 1200px)
              display: flex
            @media screen and (max-width 1200px)
              display none
          .mobile-random
            @media screen and (min-width 1200px)
              display: none
            @media screen and (max-width 1200px)
              display flex
          .icon-input
            background-color: #fc534c
            border-radius 0 4px 4px 0
            cursor pointer
            @media screen and (max-width 1200px)
              background-color: #032e43
            .icon-arror
              width: 9px
              height 14px
              transform rotate(90deg)
              background: url("../../../../assets/images/myAccount/row.svg") no-repeat center / cover
              transition transform .3s linear
              &.rotate-icon
                transform rotate(-90deg)
      .pullDown
        position: relative
        .selcet-uls
          position: absolute
          top: 100%
          left: 0
          width: 100%
          max-height: 0
          overflow: hidden
          transition all .3s linear
          &.option-heigth
            max-height 200px
          flex 1
          .money
            background-color: #f0f2f5
            padding-left: 40px
            display flex
            align-items center
            height: 68px
            color #656464
            cursor pointer
            font-size: 22px
            @media screen and (max-width 1200px)
              padding-left: 15px
              height: 40px
              font-size: 14px
            &.liActive
              color #4E4F4F
              font-weight bold
      .padding-tab
        padding: 20px 0 60px
        @media screen and (max-width 1200px)
          padding: 30px 0
      .trading-tab
        display flex
        align-items center
        border-radius 4px
        border: none
        @media screen and (max-width 1200px)
          border: 1px solid #043e43
        .table-item
          height 68px
          font-size: 16px
          flex 1
          display flex
          align-items center
          justify-content center
          cursor pointer
          background-color: #edeff1
          color #181818
          @media screen and (max-width 1200px)
            height: 46px
            color #043e43
            background-color: #fff
          &.active
            background-color: #fc534c
            color #fff
            @media screen and (max-width 1200px)
              background-color: #043e43
          &:nth-child(1)
            border-radius 4px 0 0 4px
          &:nth-child(2)
            border-radius 0 4px 4px 0
      .binding-wrapper
        .binding-uls
          padding-bottom: 80px
          .binding-item
            background-color: #FAFBFC
            padding: 30px 30px 30px 50px
            margin-bottom: 30px
            border-radius 4px
            transition all .3s ease
            border: 1px solid #d7d9db
            &:last-child
              margin-bottom: 0
            &.active
              border-color: #fc534c
              box-shadow 0 2px 10px rgba(252, 83, 76, .3)
              @media screen and (max-width 1200px)
                box-shadow none
                background-color: #fff
                border-color: #043e43
            @media screen and (max-width 1200px)
              border-color: transparent
              padding: 15px
              margin-bottom: 12px
            .desc
              color #181818
              margin-bottom: 30px
              font-size: 20px
              word-break: break-all;
              word-wrap: break-word;
              @media screen and (max-width 1200px)
                font-size: 14px
                margin-bottom: 10px
              &:last-child
                margin-bottom: 0
              .margin-right
                margin-left: 30px
        .btc-withdrawal
          display flex
          flex-direction column
          margin-bottom 80px
          li
            margin-top 30px
            height 60px
            line-height 60px
            padding-left 60px
            cursor pointer
            background-color #edeff1
            &.active
              border: 1px solid #fc534c
              box-shadow 0 2px 10px rgba(252, 83, 76, .3)
              @media screen and (max-width 1200px)
                box-shadow none
                background-color: #fff
                border-color: #043e43
      .order-wrapper
        padding-bottom: 80px
        .input-box
          position: relative
        .error-tips
          margin-top: 10px
          margin-left: 40px
          color #fc534c
          font-size: 14px
          @media screen and (max-width 1200px)
            margin-left: 15px
        .input-lable
          width: 100%
          margin-bottom: 30px
          @media screen and (max-width 1200px)
            margin-bottom: 15px
          .tradingCenter-input
            width: 100%
            height: 68px
            padding: 0 80px 0 40px
            box-sizing border-box
            color #181818
            border: 1px solid #d7d9db
            border-radius 4px
            font-size: 20px
            @media screen and (max-width 1200px)
              height: 50px
              font-size: 14px
              padding-left: 15px
            &.input-focus
              border-color #fc534c
          .close-icon
            cursor pointer
            position: absolute
            z-index: 10
            box-sizing content-box
            right: 0
            top: 19px
            padding: 5px 50px 5px 5px
            @media screen and (max-width 1200px)
              padding-right: 20px
              top: 14px
            .close
              width: 20px
              height: 20px
              background: url("../../../../assets/images/myAccount/input_close.svg") no-repeat center / cover
</style>
