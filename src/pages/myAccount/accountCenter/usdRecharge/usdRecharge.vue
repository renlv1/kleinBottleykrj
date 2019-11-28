<template>
  <div class="rechargeUsd">
    <!-- USD充值 -->
    <div id="fixed-top-header">
      <div class="back" @click="$router.push('/account/usdOrder')">
        <div class="icon"></div>
      </div>
      <h3 class="fixed-title">{{$t('usdMoney.text77')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <h3 class="record-title">
      <span class="line"></span>
      <span>{{$t('usdMoney.text77')}}</span>
    </h3>
    <div class="usd-wrapper">
      <!--法币-->
      <div class="formDiv form-fabi">
        <div class="form-item form-current">
          <div class="label">{{$t('usdMoney.text24')}}：</div>
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
        <div class="form-item">
          <div class="label">{{$t('usdMoney.text4')}}：</div>
          <div v-show="!BTCShow" class="w-input">
            <div class="inputBox">
              <input class="input input-border tradingCenter-input" type="text" v-model="depositAmount"
                     :placeholder="$t('usdMoney.text23')" @input="inputMoney">
              <span class="input-right flex-right pc-random">.{{random}}USD</span>
              <span class="input-right mobile-random">.{{random}}</span>
            </div>
            <div class="error-tips">{{errInput[0].errorShow}}</div>
          </div>
          <div v-show="BTCShow" class="w-input">
            <div class="inputBox">
              <input class="input input-border tradingCenter-input btc-input" type="text" v-model="depositAmount1"
                     :placeholder="$t('usdMoney.text84')" @input="inputMoney"><span class="segmentation">.</span>
              <input wi class="input input-border tradingCenter-input btc-input" type="text" v-model="depositAmount2"
                     :placeholder="$t('usdMoney.text85')" @input="inputMoney">
              <span class="input-right flex-right pc-randomBTC">{{randomBTC}}BTC</span>
              <span class="input-right mobile-random mobile-randomBTC btc-input">{{randomBTC}}</span>
            </div>
            <div class="error-tips">{{errInput[0].errorShow}}</div>
          </div>
        </div>
        <div v-show="!BTCShow" class="form-item actual-form">
          <div class="label">{{$t('usdMoney.text25')}}：<span v-show="depositCurrency === 'CNY'">（{{$t('usdMoney.text74')}}{{huiRate}}）</span>
          </div>
          <div class="inputBox">
            <div class="input input-border mobile-input">{{actualPayMoney}}</div>
            <span class="input-right flex-right">{{depositCurrency}}</span>
          </div>
        </div>
        <div class="dashed-line"></div>
        <div class="label mobile-hidden four-label">{{$t('usdMoney.text26')}}：</div>
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
          <div class="binding-container">
            <div class="bank-guanli" @click="bankGuanli">{{$t('usdTixian.text23')}}</div>
            <!--<div class="tips" v-show="bankBindArr.length === 0">{{$t('usdMoney.text27')}}</div>-->
            <ul v-show="!BTCShow" class="binding-uls" :class="{'max-uls': bankBindArr.length > 2}">
              <li class="binding-item" @click="checktabList(index, list)" v-for="(list, index) in bankBindArr"
                  :key="index" :class="{'active': tabOne === index}">
                <p class="desc">{{list.realName}}</p>
                <p class="desc">{{list.bankNumber}}</p>
                <p class="desc"><span>{{list.bankName}}</span><span class="margin-right">{{list.subBankName}}</span></p>
                <p class="desc" v-show="list.bankAddress && list.bankAddress !== 'null'">{{list.bankAddress}}</p>
                <p class="desc" v-show="list.iban && list.iban !== 'null'">IBAN：{{list.iban}}</p>
              </li>
            </ul>
            <ul v-show="BTCShow" class="btc-bind">
              <li :class="{'active': tabOne === index}" @click="checktabList(index, list)"
                  v-for="(list, index) in bankBindArr" :key="index">{{list.bankNumber}}
              </li>
            </ul>
          </div>
        </div>
        <!--其他交易 11-->
        <div class="order-wrapper" v-else-if="tabTwoIndex === 1">
          <div class="mobile-hidden label">{{$t('usdMoney.text28')}}：</div>
          <div class="not-btc" v-show="!BTCShow">
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[1].deleteShow}" type="text"
                       v-model="bankName" :placeholder="$t('usdMoney.text29')" @input="inputChange(1)"
                       @focus="inputFocus(1)" @blur="inputBlur(1)">
                <div class="close-icon" @click.stop="deleteInput(1)" v-show="inputDete[1].deleteShow">
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
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[3].deleteShow}" type="number"
                       v-model="bankNumber" :placeholder="$t('transAccountManag.text10')" @input="inputChange(3)"
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
                       v-model="branchInfo" :placeholder="$t('transAccountManag.text11')" @input="inputChange(4)"
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
                       v-model="swift" :placeholder="$t('transAccountManag.text13')" @input="inputChange(6)"
                       @focus="inputFocus(6)" @blur="inputBlur(6)">
                <div class="close-icon" @click="deleteInput(6)" v-show="inputDete[6].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">{{errInput[6].errorShow}}</div>
            </div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[7].deleteShow}" type="text"
                       v-model="iban" :placeholder="$t('transAccountManag.text14')" @input="inputChange(7)"
                       @focus="inputFocus(7)" @blur="inputBlur(7)">
                <div class="close-icon" @click="deleteInput(7)" v-show="inputDete[7].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">{{errInput[7].errorShow}}</div>
            </div>
          </div>
          <div class="" v-show="BTCShow">
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" :class="{'input-focus': inputDete[1].deleteShow}" type="text"
                       v-model="bankNumber" :placeholder="$t('usdMoney.text78')" @input="inputChange(5)"
                       @focus="inputFocus(1)" @blur="inputBlur(1)">
                <div class="close-icon" @click.stop="deleteInput(1)" v-show="inputDete[1].deleteShow">
                  <div class="close"></div>
                </div>
              </div>
              <div class="error-tips">
                {{errInput[5].errorShow}}
              </div>
            </div>
          </div>
          <div class="errorTips">{{errorMsg}}</div>
        </div>
      </div>
    </div>
    <div class="tradingCenter-btn" @click="boundNext()">{{$t('exchange.text29')}}</div>
    <!-- 弹窗 -->
    <div class="pay-dialog-transfer" v-show="showDialog" @click="showDialog = false">
      <div class="dialog-content" @click.stop>
        <div class="close-confirm" @click="showDialog = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-box">
          <div class="confirmShow" v-show="confirmShow">
            <div class="dialog-title">{{$t('usdMoney.text36')}}</div>
            <div class="dialog-text">{{$t('usdMoney.text37')}} <span
              class="red-text">{{comfirmBankName}} {{bankNumber}}</span>
              {{$t('usdMoney.text38')}} {{depositCurrency}}{{$t('usdMoney.text39')}} <span class="red-text">
                <span v-show="!BTCShow">{{this.actualPayMoney}}</span>
                <span v-show="BTCShow">{{this.depositAmount1 + '.' + this.depositAmount2 + this.randomBTC}}</span>
                {{this.depositCurrency}}</span>?
            </div>
          </div>
          <div class="text-error" v-show="!confirmShow">{{errMsg}}</div>
          <div class="pay-confim-btn" @click="payConfim" :class="{disable: loadingConfim2}">
            <div class="btn-w" v-show="loadingConfim2">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('exchange.text29')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        loadingConfim2: false,
        btcTransform: '',
        noBank: false,
        confirmShow: true,
        errMsg: '',
        actualPayMoney: '0.00',
        showDialog: false,
        swift: '',
        iban: '',
        usdUsername: [this.$t('usdMoney.text40'), this.$t('usdMoney.text41')],
        optionConfim: false,
        depositAmount: '',
        depositAmount1: '', // 整数部分
        depositAmount2: '', // 小数部分
        bankName: '',
        bankAccount: '',
        bankNumber: '',
        branchInfo: '',
        depositCurrency: 'CNY',
        defaultIndex: 0,
        huiRate: '',
        branchAddress: '',
        remark: '',
        errorMsg: '',
        moneys: [
          {name: 'CNY'},
          {name: 'USD'}
          // {name: 'BTC'}
        ],
        chongzhiMoney: '',
        comfirmBankName: '',
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
        nobankList: false,
        aaMoney: 0,
        BTCShow: false
      }
    },
    created() {
      if (this.$route.query.isBTC === 1) {
        this.depositCurrency = 'BTC'
        this.defaultIndex = 2
        this.BTCShow = true
      } else {
        this.depositCurrency = 'CNY'
        this.defaultIndex = 0
        this.BTCShow = false
      }
      this.getCurrencyRate() // 汇率
      this.getBankInfo() // 银行卡信息
    },
    methods: {
      bankGuanli() {
        this.$router.push({
          path: '/account/transAccountManag',
          query: {usd: 'usd1', isUsd: this.depositCurrency}
        })
      },
      // input框 充值金额校验
      inputMoney() {
        let money
        let money1
        let random = Number(this.random) / 100
        this.errInput[0].errorShow = ''
        if (this.depositAmount === '' || this.depositAmount1 === '' || this.depositAmount2 === '') {
          this.actualPayMoney = '0.00'
        }
        if (!/^(0|[1-9][0-9]*)$/.test(this.depositAmount1)) {
          this.depositAmount1 = this.depositAmount1.substring(0, this.depositAmount1.length - 1)
        }
        if (!/^\d{1,4}$/.test(this.depositAmount2)) {
          this.depositAmount2 = this.depositAmount2.substring(0, this.depositAmount2.length - 1)
        }
        money1 = Number(this.depositAmount1 + '.' + this.depositAmount2 + this.randomBTC)
        if (!/^[1-9]\d*$/.test(this.depositAmount)) {
          this.depositAmount = ''
        } else {
          if (this.depositAmount > 99999999999999) {
            this.depositAmount = 99999999999999
          }
          money = Number(this.depositAmount) + random
          this.aaMoney = money.toFixed(2)
          // money = Number(this.depositAmount1) + Number(this.depositAmount2) + randomBTC
          if (this.depositCurrency === 'CNY') {
            // 向上保留两位小数
            let point = String(money * Number(this.huiRate)).split('.')[1]
            let point0 = String(money * Number(this.huiRate)).split('.')[0]
            if (point.length > 2) {
              let point2 = point.substring(0, 2)
              this.actualPayMoney = Number(point0) + (Number(point2) + 1) / 100
            } else {
              this.actualPayMoney = money * Number(this.huiRate)
            }
          } else {
            this.actualPayMoney = money.toFixed(2)
          }
        }
        if (!this.BTCShow) {
          this.chongzhiMoney = money
        } else {
          this.chongzhiMoney = money1
        }
      },
      inputBTCMoney1() { // !/^(0|^\d{1,4}$
        if (!/^(0|[1-9][0-9]*)$/.test(this.depositAmount1)) {
          this.depositAmount1 = this.depositAmount1.substring(0, this.depositAmount1.length - 1)
        }
      },
      inputBTCMoney2() {
        if (!/^\d{1,4}$/.test(this.depositAmount2)) {
          this.depositAmount2 = this.depositAmount2.substring(0, this.depositAmount2.length - 1)
        }
      },
      // input验证 change
      inputChange(index) {
        this.errInput[index].errorShow = ''
      },
      // input验证 失去焦点
      inputBlur(index) {
        this.inputDete[index].deleteShow = false
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
        if (index === 1) {
          this.bankName = ''
          this.depositAmount = ''
          this.depositAmount1 = ''
          this.depositAmount2 = ''
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
      // 我的银行切换
      checktabList(index, list) {
        this.tabOne = index
        this.bankAccountId = list.id
        this.comfirmBankName = list.bankName
        this.bankNumber = list.bankNumber
        // console.log(index)
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
              this.bankNumber = this.bankBindArr[0].bankNumber
            }
          } else {
            // console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
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
      // BTC充值
      // BTCBoundNext() {
      //
      // },
      // 确定充值
      boundNext() {
        // 我的账户 充值
        this.noBank = false
        if (this.tabTwoIndex === 0) {
          if (!this.BTCShow) {
            if (this.depositAmount === '') {
              this.errInput[0].errorShow = this.$t('usdMoney.text23')
            }
          } else {
            if (this.depositAmount1 === '' || this.depositAmount2 === '') {
              this.errInput[0].errorShow = this.$t('usdMoney.text23')
            }
          }
          if (this.bankBindArr.length === 0) {
            this.noBank = true
          }
          if (!this.BTCShow) {
            if (this.bankBindArr.length !== 0 && this.depositAmount !== '') {
              this.showDialog = true
            }
          } else if (this.BTCShow) {
            if (this.bankBindArr.length !== 0 && this.depositAmount1 !== '' && this.depositAmount2 !== '') {
              this.showDialog = true
            }
          }
          //  其他账户充值
        } else {
          if (!this.BTCShow) {
            if (this.depositAmount === '') {
              this.errInput[0].errorShow = this.$t('usdMoney.text23')
            }
          } else if (this.BTCShow) {
            if (this.depositAmount1 === '' || this.depositAmount2 === '') {
              this.errInput[0].errorShow = this.$t('usdMoney.text23')
            }
          }
          if (this.bankName.trim() === '') {
            this.errInput[1].errorShow = this.$t('usdMoney.text29')
          }
          if (this.bankAccount.trim() === '') {
            this.errInput[2].errorShow = this.$t('usdMoney.text30')
          }
          if (this.bankNumber.trim() === '') {
            if (!this.BTCShow) {
              this.errInput[3].errorShow = this.$t('usdMoney.text31')
            } else {
              this.errInput[5].errorShow = this.$t('usdMoney.text78')
            }
          }
          if (this.branchInfo.trim() === '') {
            this.errInput[4].errorShow = this.$t('usdMoney.text32')
          }
          // if (this.branchAddress.trim() === '') {
          //   this.errInput[5].errorShow = this.$t('usdMoney.text33')
          // }
          if (!this.BTCShow) {
            if (this.bankName.trim() !== '' && this.depositAmount.trim() !== '' && this.bankAccount.trim() !== '' && this.bankNumber.trim() !== '' && this.branchInfo.trim() !== '') {
              this.showDialog = true
              this.comfirmBankName = this.bankName
            }
          } else if (this.BTCShow) {
            if (this.bankNumber.trim() !== '' && this.depositAmount1.trim() !== '' && this.depositAmount2.trim() !== '') {
              this.showDialog = true
              this.comfirmBankName = this.bankName
            }
          }
        }
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
      // 弹窗提交
      payConfim() {
        let bankData = {
          depositCurrency: this.depositCurrency, // 支付币种
          depositAmount: this.chongzhiMoney // 充值金额
          // remark: '', // 备注
          // currency: 'USD' // string币种
          // bankInfoId: '', // string充值银行ID
        }
        // 1: 绑定到我的交易账户2：不绑定到交易账户
        if (this.tabTwoIndex === 1) {
          // console.log(this.tabTwoIndex, this.BTCShow)
          if (!this.BTCShow) { // 为非BTC充值
            bankData.isBand = '2'
            bankData.depositAmount = this.aaMoney
            bankData.currency = 'USD' // string币种
            bankData.bankname = this.bankName // 银行名称
            bankData.realname = this.bankAccount // 银行卡账户名
            bankData.number = this.bankNumber // 银行卡号
            bankData.subbank = this.branchInfo // 支行名称
          } else if (this.BTCShow) { // BTC充值
            bankData.isBand = '2'
            bankData.currency = 'BTC' // string币种
            bankData.number = this.bankNumber
          }
        } else {
          if (!this.BTCShow) { // Tab切换到其他账户时候非BTC充值
            bankData.currency = 'USD' // string币种
            bankData.bankInfoId = this.bankAccountId
            bankData.isBand = '1'
          } else if (this.BTCShow) {
            bankData.currency = 'BTC' // string币种
            bankData.bankInfoId = this.bankAccountId
            bankData.number = this.bankNumber
            bankData.isBand = '2'
          }
        }
        if (this.swift !== '') { // 银行swift码
          bankData.swift = this.swift
        }
        if (this.branchAddress !== '') {
          bankData.subbankaddress = this.branchAddress // string支行地址
        }
        if (this.iban !== '') { // IBAN
          bankData.iban = this.iban
        }
        if (this.confirmShow === false) {
          this.showDialog = false
          this.confirmShow = true
        } else {
          this.loadingConfim2 = true
          this.postRequest('/deposit/createDepositRecord', bankData).then(res => {
            if (res.data.success === true) {
              this.loadingConfim2 = false
              // this.$http.post({})
              let orderid = res.data.data.order.id
              if (!this.BTCShow) {
                this.$router.push({
                  path: '/account/usdOrder/usdRechargeInfo',
                  query: {id: orderid}
                })
              } else if (this.BTCShow) {
                this.$router.push({
                  path: '/account/btcOrder/btcRechargeInfo',
                  query: {id: orderid}
                })
              }
              // 成功清空input框
              this.depositAmount = ''
              this.bankName = ''
              this.bankAccount = ''
              this.bankNumber = ''
              this.branchInfo = ''
              this.branchAddress = ''
              this.swift = ''
              this.iban = ''
            } else {
              this.loadingConfim2 = false
              this.confirmShow = false
              this.errMsg = res.data.msg
            }
          }).catch(err => {
            this.loadingConfim2 = false
            this.confirmShow = false
            console.log(err)
            this.errMsg = this.$t('dialog.text12')
          })
        }
      },
      // tab切换
      changeTab(index) {
        this.noBank = false
        this.depositAmount = ''
        this.bankNumber = ''
        this.tabTwoIndex = index
        this.depositAmount1 = ''
        this.depositAmount2 = ''
        if (index === 0) {
          this.bankName = ''
          this.bankAccount = ''
          this.bankNumber = ''
          this.branchInfo = ''
          this.branchAddress = ''
          this.swift = ''
          this.iban = ''
          this.depositAmount1 = ''
          this.depositAmount2 = ''
        }
      },
      // 下拉框选择
      optionOneList(item, index) {
        this.errInput[0].errorShow = ''
        this.depositAmount = ''
        this.depositAmount1 = ''
        this.depositAmount2 = ''
        let random = Number(this.random) / 100
        let randomBTC = Number(this.randomBTC) / 10000
        let money
        if (!this.BTCShow) { // 非BTC所需要的总金额
          money = Number(this.depositAmount) + random
        } else if (this.BTCShow) { // BTC所需要的总金额
          money = Number(this.depositAmount) + randomBTC
        }
        if (index === 1) {
          this.BTCShow = false
          if (this.depositAmount === '') {
            this.actualPayMoney = '0.00'
          } else {
            this.actualPayMoney = money
          }
        } else if (index === 0) {
          this.BTCShow = false
          // 向上保留两位小数
          let point = String(money * Number(this.huiRate)).split('.')[1]
          let point0 = String(money * Number(this.huiRate)).split('.')[0]
          if (point.length > 2) {
            let point2 = point.substring(0, 2)
            if (this.depositAmount === '') {
              this.actualPayMoney = '0.00'
            } else {
              this.actualPayMoney = Number(point0) + (Number(point2) + 1) / 100
            }
          } else {
            if (this.depositAmount === '') {
              this.actualPayMoney = '0.00'
            } else {
              this.actualPayMoney = money * Number(this.huiRate)
            }
          }
        } else {
          this.BTCShow = true
        }
        this.defaultIndex = index
        this.depositCurrency = item.name
        this.optionConfim = false
        this.getBankInfo()
      }
    },
    computed: {
      random() {
        return Math.floor(Math.random() * 90) + 10
      },
      randomBTC() {
        return Math.floor(Math.random() * 9000) + 1000
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  $f0f2f5 = #f0f2f5
  $F69699 = #969699
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
  .btc-input
    font-size 13px
    @media screen and (max-width 1200px)
      width 40%
      font-size 13px
      padding: 0 5px
  .segmentation
    font-size: 30px
    font-weight: bold
    margin: 0 10px
    margin-top: 30px
    @media screen and (max-width 1200px)
      margin-top 10px
      font-size 15px
      color #969699
  .no-bank
    color #FC534C
    text-align: center
    margin-bottom: 20px

  .bank-guanli
    width: 100%
    height: 68px
    font-size: 20px
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
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        margin-bottom: 0
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
          font-size: 16px
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
        .error-tips
          margin-top: 10px
          margin-left: 40px
          color #fc534c
          font-size: 14px
          @media screen and (max-width 1200px)
            margin-left: 15px
        .w-input
          margin-bottom: 40px
          @media screen and (max-width 1200px)
            margin-bottom: 30px
        .inputBox
          display flex
          height: 68px
          @media screen and (max-width 1200px)
            height: 40px
          .input
            flex 1
            border-radius 4px
            display: flex
            align-items center
            padding: 0 15px 0 40px
            font-size: 22px
            @media screen and (max-width 1200px)
              line-height 40px
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
            width: 130px
            height: 100%
            display flex
            align-items center
            justify-content center
            font-size: 18px
            color #969699
            padding-left 3px
            @media screen and (max-width 1200px)
              width: 60px
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
          .pc-randomBTC
            @media screen and (max-width 1200px)
              display: none
            @media screen and (min-width 1200px)
              display: flex
              padding-left 30px
          .mobile-randomBTC
            @media screen and (max-width 1200px)
              display: flex
              margin-left 5px
              font-size 14px
          .icon-input
            background-color: #fc534c
            border-radius 0 4px 4px 0
            cursor pointer
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
            color #fc534c
            background-color: #fff
          &.active
            background-color: #fc534c
            color #fff
          &:nth-child(1)
            border-radius 4px 0 0 4px
          &:nth-child(2)
            border-radius 0 4px 4px 0
      .binding-wrapper
        .tips
          text-align: center
          color #fc534c
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
        .btc-bind
          li
            background #edeff1
            height 80px
            line-height 80px
            margin 20px 0
            padding-left 40px
            border-radius 4px
            color #181818
            font-size 18px
            transition all .5s ease
            cursor pointer
            &.active
              border 1px solid #fc534c
              box-shadow 1px rgba(252, 83, 76, .3)
              @media screen and (max-width 1200px)
                box-shadow none
                background-color: #fff
      .order-wrapper
        padding-bottom: 80px
        .input-box
          position: relative
        .error-tips
          font-size: 14px
          color #fc534c
          margin-top: 10px
          padding-left: 40px
          @media screen and (max-width 1200px)
            padding-left: 15px
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
              line-height 50px
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
              @media screen and (max-width 1200px)
                width: 12px
                height: 12px
</style>
