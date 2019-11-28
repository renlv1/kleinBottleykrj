<template>
  <div class="switch-boss">
    <!-- 移动端 共享交易 选择收款账户-->
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('usdMoney.text_52')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="boss-w">
      <div class="form-current">
        <div class="label">{{$t('transAccountManag.text6')}}：</div>
        <div class="pullDown">
          <div class="inputBox">
            <div class="selectVal">{{depositCurrency}}</div>
            <div class="input-right" @click="currencySelectShow = !currencySelectShow" ref="currencyBtn"><i class="icon-arror" :class="{'rotate-icon': currencySelectShow}"></i></div>
          </div>
          <ul class="selcet-uls" :class="{'option-heigth' : currencySelectShow}">
            <li v-for="(item, index) in currencyList" @click="optionOneList(item, index)" :key="index" :class="{'liActive': defaultIndex === index}">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <ul class="boss-uls">
        <li class="boss-list" v-for="(item, index) in bankData" :key="index"  @click="checkOne(index, item.id)">
          <div class="left">
            <p class="desc"><span class="marginright">{{item.realName}}</span><span>{{item.telphone}}</span></p>
            <p class="desc">{{item.bankNumber}}</p>
            <p class="desc"><span>{{item.bankName}}</span><span class="marginright" v-if="item.subBankName && item.subBankName !== 'null'">{{item.subBankName}}</span></p>
            <p class="desc" v-if="item.bankAddress && item.bankAddress !== 'null'">{{item.bankAddress}}</p>
            <p class="desc" v-if="item.iban && item.iban !== 'null'">{{item.iban}}</p>
          </div>
          <div class="right" :class="{'checked-boss': checkIndex === index}">
            <div class="icon"></div>
          </div>
        </li>
      </ul>
    </div>
    <div id="btn-red-submit" @click="bossConfim()" v-if="bankData.length === 0">{{$t('transAccountManag.text5')}}</div>
    <div class="btn-red-submit" @click="bankConfim()" v-else>{{$t('exchange.text29')}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      totalPage: 1,
      checkIndex: 0,
      defaultIndex: 0,
      currencyList: [
        {name: 'CNY'},
        {name: 'USD'}
      ],
      currencySelectShow: false,
      depositCurrency: 'CNY',
      bankData: [],
      bankId: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.closeCurrencyMenu) // 点击其他地方关闭优惠下拉菜单
    })
  },
  destroyed () {
    document.removeEventListener('click', this.closeCurrencyMenu) // 组件摧毁时关闭监听
  },
  created () {
    this.queryBankInfoList('CNY')
  },
  methods: {
    bankConfim () {
      if (Number(this.$route.query.isChongzhi) === 2) {
        this.$router.push({
          path: '/account/notOpenShareOrder/shareOrder/shareSetting/tiXianShareOrder',
          query: {
            id: this.$route.query.id,
            isChongzhi: this.$route.query.isChongzhi,
            bankId: this.bankId
          }
        })
      } else {
        this.$router.push({
          path: '/account/notOpenShareOrder/shareOrder/shareSetting/shareOrderDetails',
          query: {
            id: this.$route.query.id,
            isChongzhi: this.$route.query.isChongzhi,
            bankId: this.bankId
          }
        })
      }
    },
    closeCurrencyMenu (event) {
      if (!this.$refs.currencyBtn.contains(event.target)) {
        this.currencySelectShow = false
      }
    },
    optionOneList (item, index) {
      this.defaultIndex = index
      this.depositCurrency = item.name
      this.queryBankInfoList(this.depositCurrency)
    },
    // 获取银行卡信息列表
    queryBankInfoList (currency) {
      let url = `${this.$api}/bank/queryBankInfoList?pageIndex=1&pageSize=20&currency=${currency}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.appList = res.data.data
          if (res.data.data.length > 0) {
            this.bankId = res.data.data[0].id
          }
          if (currency === 'CNY') {
            this.bankData = res.data.data
          } else if (currency === 'USD') {
            this.bankData = res.data.data
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    bossConfim () {
      this.$router.push('/account/transAccountManag/addAccount')
    },
    getBankInfo () {
      this.postRequest('/bank/queryBankInfoList', {
        currency: this.depositCurrency, // 币种
        pageIndex: '1', // 页数
        pageSize: '20' // 每页条数
      }).then(res => {
        if (res.data.success === true) {
          this.bankData = res.data.data
        } else {
          // console.log(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    checkOne (index, bankId) {
      this.checkIndex = index
      this.bankId = bankId
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
  .btn-red-submit
    cursor: pointer;
    width: 100%;
    height: 68px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #fc534c;
    @media screen and (max-width: 1200px)
      height: 46px;
      border-radius: 0;
  .form-current
    color #181818
    padding: 80px 15px 30px 15px
    .label
      margin-bottom: 14px;
      font-size: 16px;
    .pullDown
      position relative
      .inputBox
        height 50px
        display flex
        .selectVal
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 15px 0 40px;
          font-size: 14px;
          padding-left: 15px;
          background-color: #edeff1;
          border-radius: 4px 0 0 4px;
        .input-right
          width: 50px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #969699;
          background-color: #fc534c;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          .icon-arror
            width: 9px;
            height: 14px;
            transform: rotate(90deg);
            background: url("../../../../assets/images/myAccount/row.svg") no-repeat center / cover
            transition: transform 0.3s linear;
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
        border-radius 0 0 4px 4px
        box-shadow 0px 1px 1px #ddd
        &.option-heigth
          max-height: 200px;
        li
          background-color: #f0f2f5;
          display: flex;
          align-items: center;
          color: #656464;
          cursor: pointer;
          padding-left: 15px;
          height: 40px;
          font-size: 14px;
          &.liActive
            color: #4e4f4f;
            font-weight: bold;
  .switch-boss
    #fixed-top-header
      @media screen and (max-width 1200px)
        border-bottom none
    .boss-w
      min-height calc(100vh - 46px)
    .boss-uls
      padding: 0 15px 80px
      .boss-list
        padding: 15px
        background-color: #f0f2f5
        margin-bottom: 12px
        display flex
        align-items center
        justify-content space-between
        &:last-child
          margin-bottom: 0
        .left
          color #181818
          font-size: 16px
          .desc
            word-break: break-all;
            word-wrap:break-word;
            margin-bottom: 8px
            &:last-child
              margin-bottom: 0
          .marginright
            margin-right: 15px
        .right
          width: 28px
          height: 28px
          border-radius 4px
          border none
          background-color: #d2d4d6
          cursor pointer
          display: flex
          align-items center
          justify-content center
          &.checked-boss
            border none
            background-color: #fc534c
            .icon
              width: 16px
              height: 16px
              background-image: url("../../../../assets/images/myAccount/checked_gou.svg")
    #btn-red-submit
      margin: 0
</style>
