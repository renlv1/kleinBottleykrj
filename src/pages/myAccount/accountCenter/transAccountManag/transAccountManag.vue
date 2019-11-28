<template>
  <div class="transAccountManag">
    <div class="transAccountManagPC">
      <h3 class="transAccountManagPC-title"><i></i><span>{{$t('transAccountManag.text1')}}</span></h3>
      <ul class="transAccountManagPC-tab">
        <li :class="{activeLi: currencyFlag === 1}" @click="tabChange('CNY')">CNY（{{CNYList.length}}）</li>
        <li :class="{activeLi: currencyFlag === 2}" @click="tabChange('USD')">USD（{{USDList.length}}）</li>
        <li :class="{activeLi: currencyFlag === 3}" @click="tabChange('BTC')">BTC（{{BTCList.length}}）</li>
      </ul>
      <div class="transAccountManagPC-line"></div>
      <ul class="cardList" v-if="currencyFlag === 1">
        <li v-for="(item, index) in CNYList" :key="index">
          <div class="liBox">
            <p>{{item.realName}}</p>
            <p>{{item.bankNumber}}</p>
            <p><i>{{item.bankName}}</i><i>{{item.subBankName}}</i></p>
            <p v-if="item.bankAddress && item.bankAddress !== 'null'">{{$t('transAccountManag.text4')}}: {{item.bankAddress}}</p>
            <p v-else>{{$t('transAccountManag.text4')}}: -</p>
            <p v-if="item.swift && item.swift !== 'null'">SWIFT：{{item.swift}}</p>
            <p v-if="!item.swift || item.swift === 'null'">SWIFT：-</p>
            <p v-if="item.iban && item.iban !== 'null' ">IBAN：{{item.iban}}</p>
            <p v-if="!item.iban || item.iban === 'null'">IBAN：-</p>
            <div class="li-btn">
              <router-link tag="span" :to="{path: '/account/transAccountManag/addAccount', query: {id: item.id}}">{{$t('transAccountManag.text2')}}</router-link>
              <span @click="delBankInfo(item.id)">{{$t('transAccountManag.text3')}}</span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="cardList" v-if="currencyFlag === 2">
        <li v-for="(item, index) in USDList" :key="index">
          <div class="liBox">
            <p>{{item.realName}}</p>
            <p>{{item.bankNumber}}</p>
            <p><i>{{item.bankName}}</i><i>{{item.subBankName}}</i></p>
            <p v-if="item.bankAddress && item.bankAddress !== 'null'">{{$t('transAccountManag.text4')}}：{{item.bankAddress}}</p>
            <p v-else>{{$t('transAccountManag.text4')}}: -</p>
            <p v-if="item.swift && item.swift !== 'null'">SWIFT：{{item.swift}}</p>
            <p v-if="!item.swift || item.swift === 'null'">SWIFT：-</p>
            <p v-if="item.iban && item.iban !== 'null' ">IBAN：{{item.iban}}</p>
            <p v-if="!item.iban || item.iban === 'null'">IBAN：-</p>
            <div class="li-btn">
              <router-link tag="span" :to="{path: '/account/transAccountManag/addAccount', query: {id: item.id}}">{{$t('transAccountManag.text2')}}</router-link>
              <span @click="delBankInfo(item.id)">{{$t('transAccountManag.text3')}}</span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="btcAccount" v-if="currencyFlag === 3">
        <li v-for="item in BTCList" :key="item.index"><P>{{item.bankNumber}}</P> <div class="btn-group"><span @click="$router.push({path: '/account/transAccountManag/addAccount', query: {id: item.id, isType: currencyFlag}})">编辑</span> <span @click="delBankInfo(item.id)">删除</span> </div> </li>
        <!--<li v-for="(item, index) in BTCList" :key="index">-->
          <!--<div class="liBox">-->
            <!--<div class="">123123</div>-->
            <!--<div class="">1231456879783</div>-->
            <!--<div class="li-btn">-->
              <!--<router-link tag="span" :to="{path: '/account/transAccountManag/addAccount', query: {id: item.id}}">{{$t('transAccountManag.text2')}}</router-link>-->
              <!--<span @click="delBankInfo(item.id)">{{$t('transAccountManag.text3')}}</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->
      </ul>
      <button @click="gotoAdd" class="transAccountManag-btn">{{$t('transAccountManag.text5')}}</button>
    </div>
    <!--移动端-->
    <div class="transAccountManagPH">
      <div id="fixed-top-header">
        <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
        <h3 class="fixed-title">{{$t('transAccountManag.text1')}}</h3>
        <div class="padding">
          <div class="dashed-line margin"></div>
        </div>
      </div>
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
      <ul class="card-list">
        <router-link tag="li" :to="{path: '/account/transAccountManag/addAccount', query: {id: item.id}}" v-for="(item, index) in appList" :key="index">
          <p>{{item.realName}}</p>
          <p><i>{{item.bankName}}</i><i>{{item.subBankName}}</i></p>
          <p>{{item.bankNumber}}</p>
          <p>地址：{{item.bankAddress}}</p>
          <p v-if="item.swift && item.swift !== 'null'">SWIFT：{{item.swift}}</p>
          <p v-if="!item.swift || item.swift === 'null'">SWIFT：-</p>
          <p v-if="item.iban && item.iban !== 'null' ">IBAN：{{item.iban}}</p>
          <p v-if="!item.iban || item.iban === 'null'">IBAN：-</p>
        </router-link>
        <div v-show="loadingSHow" class="loading-t">
          <img src="../../../../assets/images/aiChat/loading.gif" alt="">
        </div>
      </ul>
      <router-link tag="button" :to="{path: '/account/transAccountManag/addAccount', query: {isType: this.defaultIndex + 1}}" class="transAccountManagPH-btn">{{$t('transAccountManag.text5')}}</router-link>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .transAccountManag
    .transAccountManagPC
      padding-top: 70px;
      padding-left: 50px;
      padding-right: 50px;
      max-width: 1000px;
      box-sizing: content-box;
      @media screen and (max-width 1200px)
        display none
      .transAccountManagPC-title
        font-weight: normal;
        display: flex;
        align-items: center;
        height: 64px;
        font-size: 22px;
        color: #181818;
        background-color: #edeff1;
        i
          display: block;
          width: 10px;
          height: 22px;
          margin-right: 30px;
          background-color: #032e43;
      .transAccountManagPC-tab
        margin-top 58px
        margin-bottom 50px
        li
          display inline-block
          width 240px
          height 58px
          line-height 58px
          text-align center
          background-color #edeff1
          color #181818
          font-size 20px
          cursor pointer
          user-select none
          border-radius 4px
          &.activeLi
            background-color #FC534C
            color #fff
          &:nth-child(2)
            margin 0 20px
      .transAccountManagPC-line
        border-bottom 1px dashed #b3b3b3
      .cardList
        margin-top 50px
        padding-bottom 50px
        display flex
        justify-content space-between
        flex-wrap wrap
        li
          width 50%
          &:nth-child(odd)
            padding-right 20px
          &:nth-child(even)
            padding-left 20px
          .liBox
            width 100%
            height 310px
            background-color #fafbfc
            border 1px solid #d9d9d9
            font-size 16px
            color #181818
            border-radius 8px
            padding 30px 40px 30px 50px
            margin-bottom 30px
            p
              margin-bottom 15px
              width 100%
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
              &:first-child
                font-size 20px
                margin-bottom 20px
              i
                padding-right 20px
                display inline-block
                width 50%
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
            .li-btn
              text-align right
              span
                cursor pointer
                color #FC534C
                font-size 20px
                user-select none
                &:last-child
                  margin-left 45px
                &:active
                  opacity .6
      .btcAccount
        display flex
        flex-direction column
        margin 50px 0
        li
          display flex
          flex-direction row
          justify-content space-between
          width 100%
          height 60px
          line-height 60px
          font-size 16px
          color #181818
          .btn-group
            span
              margin 20px
              color #FC534C
              cursor pointer
          &:nth-child(odd)
            padding-left 60px
            background-color #edeff1
          &:nth-child(even)
            background-color #fbfbfb
            padding-left 60px
      .transAccountManag-btn
        width 100%
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
        &:active
          opacity .6
    .transAccountManagPH
      display none
      padding 0 15px
      padding-top 80px
      @media screen and (max-width 1200px)
        display block
      #fixed-top-header
        left 0
      .form-current
        color #181818
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
      .card-list
        padding-top 30px
        margin-bottom 60px
        .loading-t
          margin: 20px auto
          display: flex
          align-items center
          justify-content center
          img
            width: 50px
            display: block
        li
          margin-bottom 15px
          background-color #edeff1
          padding 15px
          border-radius 4px
          p
            margin-bottom 10px
            font-size 14px
            color #181818
            &:last-child
              margin-bottom 0
            i
              margin-left 30px
      .transAccountManagPH-btn
        width 100%
        height 50px
        position fixed
        left 0
        bottom 0
        background-color #FC534C
        font-size 14px
        color #fff
        outline none
        border none
        user-select none
</style>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      loadingSHow: true,
      currencyFlag: this.$route.query.backIsType === undefined ? 1 : this.$route.query.backIsType,
      currencySelectShow: false,
      depositCurrency: 'CNY', // 选择的币种
      currencyList: [
        {name: 'CNY'},
        {name: 'USD'},
        {name: 'BTC'}
      ],
      defaultIndex: 0,
      pageIndex: 1,
      pageSize: 10,
      CNYList: [],
      USDList: [],
      BTCList: [],
      appList: []
    }
  },
  created() {
  },
  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.closeCurrencyMenu) // 点击其他地方关闭优惠下拉菜单
    })
    if (this.$route.query.isUsd) {
      this.depositCurrency = this.$route.query.isUsd
      this.queryBankInfoList(this.$route.query.isUsd)
      if (this.$route.query.isUsd === 'CNY') {
        this.currencyFlag = 1
      } else if (this.$route.query.isUsd === 'USD') {
        this.currencyFlag = 2
      } else if (this.$route.query.isUsd === 'BTC') {
        this.currencyFlag = 3
      }
    } else {
      this.depositCurrency = 'CNY'
      this.queryBankInfoList('CNY')
      this.queryBankInfoList('USD')
      this.queryBankInfoList('BTC')
    }
    // if (this.currencyFlag === 1 || this.currencyFlag === undefined) {
    //   this.queryBankInfoList('CNY')
    // } else if (this.currencyFlag === 2) {
    //   this.queryBankInfoList('USD')
    // } else if (this.currencyFlag === 3) {
    //   this.queryBankInfoList('BTC')
    // }
    // this.queryBankInfoList('USD')
    // if (this.$route.query.isUsd) {
    //   if (this.$route.query.isUsd === 'USD') {
    //     this.currencyFlag = 2
    //   }
    // }
  },
  destroyed () {
    document.removeEventListener('click', this.closeCurrencyMenu) // 组件摧毁时关闭监听
  },
  methods: {
    // gotoAdd () {
    //   if (this.$route.query.isUsd) {
    //     if (this.$route.query.isUsd === 'USD') {
    //       this.$router.push({
    //         path: '/account/transAccountManag/addAccount',
    //         query: {isUsd: 'USD'}
    //       })
    //     } else {
    //       this.$router.push({
    //         path: '/account/transAccountManag/addAccount'
    //       })
    //     }
    //   } else {
    //     this.$router.push({
    //       path: '/account/transAccountManag/addAccount'
    //     })
    //   }
    // },
    gotoAdd () {
      this.$router.push({
        path: '/account/transAccountManag/addAccount',
        query: {isType: this.currencyFlag}
      })
    },
    closeCurrencyMenu (event) {
      if (!this.$refs.currencyBtn.contains(event.target)) {
        this.currencySelectShow = false
      }
    },
    optionOneList (item, index) {
      this.loadingSHow = true
      this.defaultIndex = index
      this.depositCurrency = item.name
      this.appList = []
      this.queryBankInfoList(this.depositCurrency)
    },
    // 获取银行卡信息列表
    tabChange (currency) {
      this.loadingSHow = true
      if (currency === 'CNY') {
        this.currencyFlag = 1
      } else if (currency === 'USD') {
        this.currencyFlag = 2
      } else if (currency === 'BTC') {
        this.currencyFlag = 3
      }
      this.queryBankInfoList(currency)
    },
    queryBankInfoList (currency) {
      // currencyFlag = 1
      let url = `${this.$api}/bank/queryBankInfoList?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&currency=${currency}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.appList = res.data.data
          if (currency === 'CNY') {
            this.CNYList = res.data.data
          } else if (currency === 'USD') {
            this.USDList = res.data.data
          } else if (currency === 'BTC') {
            this.BTCList = res.data.data
          }
        }
        this.loadingSHow = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除银行卡信息
    delBankInfo (id) {
      let url = `${this.$api}/bank/delBankInfo?bankInfoId=${id}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          if (this.currencyFlag === 1) {
            this.queryBankInfoList('CNY')
          } else if (this.currencyFlag === 2) {
            this.queryBankInfoList('USD')
          } else if (this.currencyFlag === 3) {
            this.queryBankInfoList('BTC')
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
