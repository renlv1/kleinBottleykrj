<template>
  <div class="addAccount">
    <h3 class="addAccount-title"><i></i>
      <router-link to="/account/transAccountManag">{{$t('transAccountManag.text1')}}</router-link>
      <b>></b><span>{{id ? $t('transAccountManag.text2'): $t('transAccountManag.text18')}}{{$t('transAccountManag.text17')}}</span>
    </h3>
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)">
        <div class="icon"></div>
      </div>
      <h3 class="fixed-title">{{$t('transAccountManag.text1')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="addAccount-form">
      <div class="form-box form-currency">
        <div class="label">1.{{$t('transAccountManag.text6')}}：</div>
        <div class="pullDown">
          <div class="inputBox">
            <div class="currencyValue">{{depositCurrency}}</div>
            <div class="icon-input" ref="currencyBtn" @click="currencySelectShow = !currencySelectShow">
              <div class="icon-arror" :class="{'rotate-icon': currencySelectShow}"></div>
            </div>
          </div>
          <ul class="selcet-uls" :class="{'option-heigth' : currencySelectShow}">
            <li v-for="(item, index) in currencyList" @click="optionOneList(item, index)" :key="index" class="money"
                :class="{'liActive': defaultIndex === index}">{{item.name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="form-box">
        <div class="label">2.{{$t('transAccountManag.text7')}}</div>
        <div class="not-btc" v-show="!BTCShow">
          <div class="input-lable">
            <div class="input-box">
              <input class="tradingCenter-input" type="text" v-model="bankName" ref="bankName"
                     :placeholder="$t('transAccountManag.text8')" @blur="errorShow(0,'bankName')">
              <div class="close-icon">
                <div class="close" @click="closeCurrentInput(1)"></div>
              </div>
              <div class="error-tips" v-show="errShow[0].show">{{$t('transAccountManag.text8')}}</div>
            </div>
          </div>
          <div class="input-lable">
            <div class="input-box">
              <input class="tradingCenter-input" type="text" v-model="accountName"
                     :placeholder="$t('transAccountManag.text9')" @blur="errorShow(1, 'accountName')">
              <div class="close-icon">
                <div class="close" @click="closeCurrentInput(2)"></div>
              </div>
              <div class="error-tips" v-show="errShow[1].show">{{$t('transAccountManag.text9')}}</div>
            </div>
          </div>
          <div class="input-lable">
            <div class="input-box">
              <input class="tradingCenter-input" type="text" v-model="cardNum"
                     :placeholder="$t('transAccountManag.text10')" @blur="errorShow(2, 'cardNum')">
              <div class="close-icon">
                <div class="close" @click="closeCurrentInput(3)"></div>
              </div>
              <div class="error-tips" v-show="errShow[2].show">{{$t('transAccountManag.text10')}}</div>
            </div>
          </div>
          <div class="input-lable">
            <div class="input-box">
              <input class="tradingCenter-input" type="text" v-model="branchName"
                     :placeholder="$t('transAccountManag.text11')" @blur="errorShow(3, 'cardNum')">
              <div class="close-icon">
                <div class="close" @click="closeCurrentInput(4)"></div>
              </div>
              <div class="error-tips" v-show="errShow[3].show">{{$t('transAccountManag.text11')}}</div>
            </div>
          </div>
          <div class="input-lable">
            <div class="input-box">
              <input class="tradingCenter-input" type="text" v-model="branckAddress"
                     :placeholder="$t('transAccountManag.text12')">
              <div class="close-icon">
                <div class="close" @click="closeCurrentInput(5)"></div>
              </div>
              <div class="error-tips" v-show="errShow[4].show">{{$t('transAccountManag.text12')}}</div>
            </div>
          </div>
          <div class="input-lable">
            <div class="input-box">
              <input class="tradingCenter-input" type="text" v-model="swift"
                     :placeholder="$t('transAccountManag.text13')">
              <div class="close-icon">
                <div class="close" @click="closeCurrentInput(6)"></div>
              </div>
              <div class="error-tips" v-show="errShow[5].show">{{$t('transAccountManag.text13')}}</div>
            </div>
          </div>
          <div class="input-lable">
            <div class="input-box">
              <input class="tradingCenter-input" type="text" v-model="iban"
                     :placeholder="$t('transAccountManag.text14')">
              <div class="close-icon">
                <div class="close" @click="closeCurrentInput(7)"></div>
              </div>
              <div class="error-tips" v-show="errShow[6].show">{{$t('transAccountManag.text14')}}</div>
            </div>
          </div>
        </div>
        <div class="" v-show="BTCShow">
          <div class="input-lable">
            <div class="input-box">
              <input class="tradingCenter-input" type="text" v-model="cardNum" :placeholder="$t('usdMoney.text78')"
                     @blur="errorShow(0,'cardNum')">
              <div class="close-icon">
                <div class="close" @click="closeCurrentInput(1)"></div>
              </div>
              <div class="error-tips" v-show="errShow[5].show">{{$t('transAccountManag.text8')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="addAccount-btn">
      <p></p>
      <button v-if="id" class="deleteBtn" @click="delBankInfo()">{{$t('transAccountManag.text3')}}</button>
      <button @click="editBankInfo()">{{$t('transAccountManag.text16')}}</button>
    </div>
    <!-- 弹窗 -->
    <div class="pay-dialog-transfer" v-show="showDialog" @click="showDialog = ''">
      <div class="dialog-content" @click.stop>
        <div class="close-confirm" @click="showDialog = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-box">
          <div class="text-error">{{showDialog}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .addAccount
    padding-top: 70px;
    padding-left: 50px;
    padding-right: 50px;
    max-width: 1000px;
    box-sizing: content-box;
    #fixed-top-header
      left 0
    @media screen and (max-width 1200px)
      padding 0 20px
      padding-top 80px
      max-width 100%
    .addAccount-title
      font-weight: normal;
      display: flex;
      align-items: center;
      height: 64px;
      font-size: 22px;
      color: #181818;
      background-color: #edeff1;
      @media screen and (max-width 1200px)
        display none
      a
        color #181818
      b
        margin 0 10px
      i
        display: block;
        width: 10px;
        height: 22px;
        margin-right: 30px;
        background-color: #032e43;
    .addAccount-btn
      width 100%
      display flex
      @media screen and (max-width 1200px)
        position fixed
        left 0
        bottom 0
      button
        flex 1
        background-color: #fc534c;
        height: 68px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        outline none
        border none
        cursor: pointer;
        user-select none
        margin-bottom: 100px;
        border-radius: 4px;
        font-size: 20px;
        margin-top 50px
        &.deleteBtn
          display none
          background-color #FC534C
          @media screen and (max-width 1024px) {
            display block
          }
        &:active
          opacity .6
        @media screen and (max-width 1200px)
          height 50px
          background-color #032e43
          font-size 14px
          border-radius 0
          margin 0
          &:active
            opacity 1
    .addAccount-form
      padding-top: 60px;
      padding-bottom 60px
      @media screen and (max-width 1200px)
        padding-top 0
      .form-box
        &.form-currency
          margin-bottom 60px
          @media screen and (max-width 1200px)
            margin-bottom 30px
        .label
          font-size: 20px;
          color: #181818;
          margin-bottom: 20px;
          @media screen and (max-width 1200px)
            margin-bottom: 14px;
            font-size: 14px;
        .pullDown
          position relative
          .inputBox
            display: flex;
            height: 68px;
            @media screen and (max-width 1200px)
              height 50px
            .currencyValue
              background-color: #edeff1;
              border-radius: 4px 0 0 4px;
              flex: 1;
              display: flex;
              align-items: center;
              padding: 0 15px 0 40px;
              font-size: 22px;
              @media screen and (max-width 1200px)
                font-size: 14px;
                padding-left: 15px;
            .icon-input
              width: 100px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              color: #969699;
              background-color: #fc534c;
              border-radius: 0 4px 4px 0;
              cursor: pointer;
              @media screen and (max-width 1200px)
                width 50px
                background-color #032e43
              .icon-arror
                width: 9px
                height 14px
                transform rotate(90deg)
                background: url("../../../../assets/images/myAccount/row.svg") no-repeat center / cover
                transition transform .3s linear
                &.rotate-icon
                  transform rotate(-90deg)
          .selcet-uls
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s linear;
            flex: 1;
            z-index 20
            &.option-heigth
              max-height 200px
            li
              background-color: #f0f2f5;
              padding-left: 40px;
              display: flex;
              align-items: center;
              height: 68px;
              color: #656464;
              cursor: pointer;
              font-size: 22px;
              @media screen and (max-width 1200px)
                padding-left: 15px
                height: 40px
                font-size: 14px
              &.liActive
                color: #4e4f4f;
                font-weight bold
        .input-box
          position: relative
          padding-bottom: 30px
          @media screen and (max-width 1200px)
            padding-bottom: 20px
        .input-lable
          width: 100%
          .input-box
            .error-tips
              color #FC534C
              font-size 16px
              position absolute
              bottom 6px
              @media screen and (max-width 1200px)
                font-size 14px
                bottom 2px
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
              height: 40px
              font-size: 14px
              padding-left: 15px
              padding-right 37px
              line-height 38px
            &:focus
              border-color #fc534c
            &:focus + .close-icon
              display block
              opacity 1
          .close-icon
            display inline-block
            opacity 0
            cursor pointer
            position: absolute
            box-sizing content-box
            right: 0
            top: 19px
            width: 20px
            height: 20px
            padding: 5px 50px 5px 5px
            @media screen and (max-width 1200px)
              top: 10px;
              padding: 5px 20px 5px 5px;
            .close
              width: 20px
              height: 20px
              background: url("../../../../assets/images/myAccount/input_close.svg") no-repeat center / cover
              cursor pointer
              @media screen and (max-width 1200px)
                width 12px
                height 12px
</style>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showDialog: '',
        confirmShow: true,
        id: this.$route.query.id,
        currencySelectShow: false,
        depositCurrency: 'CNY', // 选择的币种
        currencyList: [
          {name: 'CNY'},
          {name: 'USD'},
          {name: 'BTC'}
        ],
        defaultIndex: 0,
        bankName: '', // 银行名称
        accountName: '', // 账户名
        cardNum: '', // 银行卡号
        branchName: '', // 分行名称
        branckAddress: '', // 分行地址
        swift: '',
        iban: '',
        errShow: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        BTCShow: false
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        // if (this.$route.query.isUsd) {
        //   if (this.$route.query.isUsd === 'USD') {
        //     this.depositCurrency = 'USD'
        //   }
        // }
        if (Number(this.$route.query.isType) === 1 || this.$route.query.isType === '') {
          this.depositCurrency = 'CNY'
          this.BTCShow = false
          this.defaultIndex = 0
        } else if (Number(this.$route.query.isType) === 2) {
          this.depositCurrency = 'USD'
          this.BTCShow = false
          this.defaultIndex = 1
        } else if (Number(this.$route.query.isType) === 3) {
          this.depositCurrency = 'BTC'
          this.BTCShow = true
          this.defaultIndex = 2
        }
        document.addEventListener('click', this.closeCurrencyMenu) // 点击其他地方关闭优惠下拉菜单
      })
      // console.log(this.id)
      this.queryBankInfoDetail()
    },
    destroyed() {
      document.removeEventListener('click', this.closeCurrencyMenu) // 组件摧毁时关闭监听
    },
    methods: {
      // 删除银行卡信息
      delBankInfo() {
        let url = `${this.$api}/bank/delBankInfo?bankInfoId=${this.id}`
        this.$http.post(url).then(res => {
          if (res.data.success) {
            this.$router.push('/account/transAccountManag')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      closeCurrencyMenu(event) {
        if (!this.$refs.currencyBtn.contains(event.target)) {
          this.currencySelectShow = false
        }
      },
      // 查询银行卡信息详情
      queryBankInfoDetail() {
        if (this.id) {
          let url = `${this.$api}/bank/bankInfoDetail?bankInfoId=${this.id}`
          this.$http.post(url).then(res => {
            if (res.data.success) {
              let obj = res.data.data
              this.depositCurrency = obj.currency
              if (obj.currency === 'CNY') {
                this.defaultIndex = 0
              } else if (obj.currency === 'USD') {
                this.defaultIndex = 1
              }
              this.bankName = obj.bankName
              this.accountName = obj.realName
              this.cardNum = obj.bankNumber
              this.branchName = obj.subBankName
              if (obj.bankAddress && obj.bankAddress !== 'null') {
                this.branckAddress = obj.bankAddress
              } else {
                this.branckAddress = ''
              }
              if (obj.bankAddress && obj.bankAddress !== 'null') {
                this.branckAddress = obj.bankAddress
              } else {
                this.branckAddress = ''
              }
              if (obj.swift && obj.swift !== 'null') {
                this.swift = obj.swift
              } else {
                this.swift = ''
              }
              if (obj.iban && obj.iban !== 'null') {
                this.iban = obj.iban
              } else {
                this.iban = ''
              }
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 点击关闭按钮
      closeCurrentInput(n) {
        let self = this
        switch (n) {
          case 1 :
            self.bankName = ''
            self.cardNum = ''
            break
          case 2 :
            console.log('123')
            self.accountName = ''
            break
          case 3 :
            self.cardNum = ''
            break
          case 4 :
            self.branchName = ''
            break
          case 5 :
            self.branckAddress = ''
            break
          case 6 :
            self.swift = ''
            break
          case 7 :
            self.iban = ''
            break
        }
      },
      // 表单验证
      validata() {
        if (this.bankName.trim() === '') {
          return false
        }
        if (this.accountName.trim() === '') {
          return false
        }
        if (this.cardNum.trim() === '') {
          return false
        }
        if (this.branchName.trim() === '') {
          return false
        }
        return true
      },
      // 显示错误
      errorShow(n, mode) {
        // console.log(this[mode])
        if (this[mode].trim() === '') {
          this.errShow[n].show = true
        } else {
          this.errShow[n].show = false
        }
      },
      submitErrorShow() {
        if (this.bankName.trim() === '') {
          this.errShow[0].show = true
        } else {
          this.errShow[0].show = false
        }
        if (this.accountName.trim() === '') {
          this.errShow[1].show = true
        } else {
          this.errShow[1].show = false
        }

        if (this.cardNum.trim() === '') {
          this.errShow[2].show = true
        } else {
          this.errShow[2].show = false
        }
        if (this.branchName.trim() === '') {
          this.errShow[3].show = true
        } else {
          this.errShow[3].show = false
        }
      },
      optionOneList(item, index) {
        this.defaultIndex = index
        this.depositCurrency = item.name
        this.errShow[0].show = false // 切换Tab清除错误提示信息
        this.errShow[1].show = false
        this.errShow[2].show = false
        this.errShow[3].show = false
        if (index === 2) {
          this.BTCShow = true
        } else {
          this.BTCShow = false
        }
      },
      // 提交信息
      editBankInfo() {
        this.submitErrorShow()
        if (this.validata) {
          if (this.id) {
            console.log('123')
            let url = `${this.$api}/bank/editBankInfo?id=${this.id}&bankType=1&currency=${this.depositCurrency}&bankName=${this.bankName}&subBankName=${this.branchName}&realName=${this.accountName}&bankNumber=${this.cardNum}&swift=${this.swift}&iban=${this.iban}&bankAddress=${this.branckAddress}`
            this.$http.post(url).then(res => {
              if (res.data.success) {
                this.$router.push({path: '/account/transAccountManag', query: {backIsType: this.$route.query.isType}})
              } else {
                this.showDialog = res.data.msg
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            let url = `${this.$api}/bank/addBankInfo?bankType=1&currency=${this.depositCurrency}&bankName=${this.bankName}&subBankName=${this.branchName}&realName=${this.accountName}&bankNumber=${this.cardNum}&swift=${this.swift}&iban=${this.iban}&bankAddress=${this.branckAddress}`
            this.$http.post(url).then(res => {
              if (res.data.success) {
                this.$router.push({path: '/account/transAccountManag', query: {backIsType: this.$route.query.isType}})
              } else {
                this.showDialog = res.data.msg
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
      }
    }
  }
</script>
