<template>
  <div class="share-container">
    <!--共享交易-->
    <div>
      <h3 id="record-title">
        <span class="line"></span>
        <span>{{$t('myAccount.text21')}}</span>
      </h3>
      <div id="fixed-top-header">
        <div class="back" @click="$router.push('/account/myAccount')"><div class="icon"></div></div>
        <h3 class="fixed-title">{{$t('myAccount.text21')}}</h3>
        <div class="padding">
          <div class="dashed-line margin"></div>
        </div>
      </div>
    </div>
    <div class="share-w">
      <h3 class="share-title share-pc">{{$t('shareOrderCenter.text1')}} <span class="share-desc">（{{$t('shareOrderCenter.text2')}}）</span></h3>
      <h3 class="share-title share-mobile">{{$t('shareOrderCenter.text2')}}</h3>
      <div class="input-item quhao-w">
        <div class="quhao-item">
          <div class="quhao">+{{quhao}}</div>
          <div class="quhao-select" @click="codeSelectShow = !codeSelectShow">
            <div class="icon-sele" :class="{'rotate-icon': codeSelectShow}"></div>
          </div>
        </div>
        <ul class="selectMenu" :class="{selectMenuActive: codeSelectShow}">
          <li v-for="(item, index) in areaCodeData" :key="index" @click="chooseCode(item.code, index)" class="code-list">{{item.value}}</li>
        </ul>
      </div>
      <div class="input-item">
        <input type="text" :placeholder="$t('shareOrderCenter.text3')" v-model="telphone" class="tradingCenter-input" @input="inputChange(1)">
        <p class="err-class">{{errInput1}}</p>
      </div>
      <div class="input-item">
        <input type="text" :placeholder="$t('shareOrderCenter.text4')" v-model="username" class="tradingCenter-input" @input="inputChange(2)">
        <p class="err-class">{{errInput2}}</p>
      </div>
      <div class="input-item">
        <input type="text" :placeholder="$t('shareOrderCenter.text5')" v-model="address" class="tradingCenter-input" @input="inputChange(3)">
        <p class="err-class">{{errInput3}}</p>
      </div>
      <p class="feiyong pc-feiyong">{{$t('shareOrderCenter.text6')}}:<span class="red-text">{{bailData.bailAmount | fourNumber}} {{bailData.bailCurrency}}</span></p>
      <div class="mobile-feiyong">
        <span>{{$t('shareOrderCenter.text6')}}</span>
        <span class="red-text">{{bailData.bailAmount | fourNumber}} {{bailData.bailCurrency}}</span>
      </div>
      <div id="btn-red-submit" @click="shareConfim()">{{$t('usdMoney.text_31')}}</div>
    </div>
    <pay-money-dialog ref="payDialog" :gongXiangData="gongXiangData"></pay-money-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import payMoneyDialog from '@/components/payMoneyDialog'
export default {
  data () {
    return {
      errInput1: '',
      errInput2: '',
      errInput3: '',
      telphone: '',
      username: '',
      areaCodeNum: '86',
      codeSelectShow: false,
      codeValue: '+86', // 区号
      address: '',
      gongXiangData: {},
      areaCodeData: [],
      quhao: '86',
      bailData: []
    }
  },
  created () {
    this.getAreaCode()
    this.getBossInfo()
  },
  methods: {
    getBossInfo () {
      this.postRequest('/boss/getBossApplyBailAndCurrency').then(res => {
        if (res.data.success) {
          this.bailData = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    shareConfim () {
      if (this.telphone === '') {
        this.errInput1 = this.$t('shareOrderCenter.text3')
      }
      if (this.username === '') {
        this.errInput2 = this.$t('shareOrderCenter.text4')
      }
      if (this.address === '') {
        this.errInput3 = this.$t('shareOrderCenter.text5')
      }
      if (this.telphone !== '' && this.username !== '' && this.address !== '') {
        this.$refs.payDialog.show()
        this.gongXiangData.telphone = this.telphone
        this.gongXiangData.username = this.username
        this.gongXiangData.address = this.address
        this.gongXiangData.quhao = this.quhao
      }
      // this.$router.push('/account/notOpenShareOrder/shareOrder')
    },
    chooseCode (value) { // 选择区号
      this.quhao = value
      this.codeValue = '+' + value
      this.codeSelectShow = false
    },
    getAreaCode () { // 获取区号
      let timestamp = Date.parse(new Date())
      this.postRequest('/app/globalParam', {
        lastUpdateDate: timestamp
      }).then(res => {
        if (res.data.success) {
          this.areaCodeData = res.data.data.phonecode.cn
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    inputChange (index) {
      if (index === 1) {
        if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.telphone))) {
          this.errInput1 = this.$t('shareOrderCenter.text7')
        } else {
          this.errInput1 = ''
        }
      } else if (index === 2) {
        this.errInput2 = ''
      } else if (index === 3) {
        this.errInput3 = ''
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
  },
  components: {
    payMoneyDialog
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .red-text
    color #fc534c
  .share-container
    padding-top: 70px;
    padding-left: 92px;
    max-width: 1000px;
    box-sizing content-box
    @media screen and (max-width 1600px)
      padding-left: 50px
      padding-right: 50px
    @media screen and (max-width 1200px)
      padding: 0
      max-width 100%
    #fixed-top-header
      @media screen and (max-width 1200px)
        border-bottom: none
    .share-w
      color #181818
      @media screen and (max-width 1200px)
        padding: 80px 15px 0
      .share-title
        font-size: 20px
        margin: 60px 0
        @media screen and (max-width 1200px)
          margin: 0 0 10px
        .share-desc
          font-size: 16px
          margin-left: 10px
      .share-pc
        @media screen and (max-width 1200px)
          display: none
        @media screen and (min-width 1200px)
          display: block
      .share-mobile
        font-size: 14px
        @media screen and (max-width 1200px)
          display: block
        @media screen and (min-width 1200px)
          display: none
      .quhao-item
        height 68px
        display: flex
        align-items center
        @media screen and (max-width 1200px)
          height: 50px
        .quhao
          flex 1
          height: 100%
          display: flex
          align-items center
          border: 1px solid #d7d9db
          border-right: none
          padding-left: 40px
          color #181818
          font-size: 20px
          border-radius 4px 0 0 4px
          @media screen and (max-width 1200px)
            border: none
            background-color: #f0f2f5
            padding-left: 10px
        .quhao-select
          height: 100%
          width: 100px
          display: flex
          align-items center
          justify-content center
          background-color: #fc534c
          border-radius 0 4px 4px 0
          cursor pointer
          @media screen and (max-width 1200px)
            width: 50px
          .icon-sele
            width: 9px
            height 14px
            transform rotate(90deg)
            background: url("../../../../assets/images/myAccount/row.svg") no-repeat center / cover
            transition transform .3s linear
            &.rotate-icon
              transform rotate(-90deg)
      .selectMenu
        height: 0
        width: 100%
        position: absolute
        top: 100%
        left: 0
        border-radius 0 0 4px 4px
        transition: all 0.3s linear;
        overflow: hidden
        background-color: #f0f2f5;
        &.selectMenuActive
          z-index: 999;
          overflow-x: hidden;
          overflow-y: auto;
          height: 200px
          &::-webkit-scrollbar
            width 0
            height 0
        .code-list
          padding-left: 40px;
          display: flex;
          align-items: center;
          height: 68px;
          color: #656464;
          cursor: pointer;
          font-size: 22px;
          @media screen and (max-width 1200px)
            height: 40px
            font-size: 16px
            padding-left: 15px
      .input-item
        width: 100%
        margin-bottom: 30px
        @media screen and (max-width 1200px)
          margin-bottom: 15px
        input
          border-radius 4px
          width: 100%
          height: 68px
          border: 1px solid #d7d9db
          padding: 0 40px
          color #181818
          font-size: 20px
          box-sizing border-box
          display: block
          @media screen and (max-width 1200px)
            padding: 0 10px
            height: 50px
            font-size: 14px
        .err-class
          font-size: 14px
          padding-left: 40px
          margin-top: 10px
          color #fc534c
          @media screen and (max-width 1200px)
            padding-left: 15px
      .quhao-w
        position: relative
      .feiyong
        font-size: 20px
      .pc-feiyong
        @media screen and (max-width 1200px)
          display: none
        @media screen and (min-width 1200px)
          display: block
      .mobile-feiyong
        align-items center
        justify-content space-between
        @media screen and (max-width 1200px)
          display: flex
        @media screen and (min-width 1200px)
          display: none
    #btn-red-submit
      margin: 80px 0 100px
      @media screen and (max-width 1200px)
        border-radius 4px
        height: 46px
</style>
