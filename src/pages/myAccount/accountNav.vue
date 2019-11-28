<template>
  <div class="accountNav">
    <div class="nav-wrap">
      <div class="user-wrapper">
        <div class="user-img-box">
          <img :src="userInfo.imgUrl" alt="">
        </div>
        <div class="username">{{userInfo.userName}}</div>
        <div v-if="userInfo.mobile" class="nickname">+{{userInfo.phoheCode}}  {{userInfo.mobile}}</div>
      </div>
      <ul class="nav-uls">
        <!-- 0 账户预览-->
        <li class="nav-item" :class="{'active-nav': currentIndex === 0}">
          <div class="item-title" @click="selectList(0)">
            <div class="header-title">{{$t('myAccountNav.text1')}}</div>
          </div>
          <ul class="uls-child">
            <li class="child-item">
              <router-link to="/account/myAccount" class="child-link">
                <span>{{$t('myAccountNav.text2')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/safettingCenter" class="child-link">
                <span>{{$t('bindPhone.text15')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/transAccountManag" class="child-link">
                <span>{{$t('usdMoney.text79')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/usdRecharge" class="child-link" :class="{'isActive': currentHigh === 1}">
                <span>{{$t('usdMoney.text77')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/usdWithdrawMoney" class="child-link" :class="{'isActive': currentHigh === 2}">
                <span>{{$t('usdOrder.text3')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/transfer" class="child-link">
                <span>{{$t('sieMoney.text3')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/sieMoney" class="child-link">
                <span>SIE {{$t('usdOrder.text11')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/InvitedRecord" class="child-link">
                <span>{{$t('invitedRecord.text5')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
          </ul>
        </li>
        <!-- 1 订单管理-->
        <li class="nav-item" :class="{'active-nav': currentIndex === 1}">
          <div class="item-title" @click="selectList(1)">
            <div class="header-title">{{$t('myAccountNav.text3')}}</div>
          </div>
          <ul class="uls-child">
            <li class="child-item">
              <router-link to="/account/orderManage" class="child-link">
                <span>{{$t('myAccountNav.text4')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/usdOrder" class="child-link">
                <span>USD{{$t('danAI.text32')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/sieOrder" class="child-link">
                <span>SIE {{$t('danAI.text32')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/btcOrder" class="child-link">
                <span>BTC {{$t('danAI.text32')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item" v-if="userInfo.isboss === 2">
              <!--  notOpenShareOrder  未开通   -->
              <!--<router-link to="/account/notOpenShareOrder" class="child-link" v-if="userInfo.isboss === 1">-->
                <!--<span>{{$t('myAccount.text21')}}</span>-->
                <!--<div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>-->
              <!--</router-link>-->
              <!--  notOpenShareOrder/shareOrder 已开通-->
              <router-link to="/account/notOpenShareOrder/shareOrder" class="child-link">
                <span>{{$t('myAccount.text21')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/transferRecord/transferRecords" class="child-link">
                <span>{{$t('newAdd.text4')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <li class="child-item">
              <router-link to="/account/exchanges" class="child-link">
                <span>{{$t('exchanges.text21')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
          </ul>
        </li>
        <!-- 2机器人管理-->
        <li class="nav-item" :class="{'active-nav': currentIndex === 2}">
          <div class="item-title" @click="selectList(2)">
            <div class="header-title">{{$t('myAccountNav.text5')}}</div>
          </div>
          <ul class="uls-child">
            <li class="child-item">
              <router-link to="/account/myDon" class="child-link">
                <span>{{$t('myAccountNav.text6')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
          </ul>
        </li>
        <!-- 3奖励记录-->
        <li class="nav-item" :class="{'active-nav': currentIndex === 3}">
          <div class="item-title" @click="selectList(3)">
            <div class="header-title">{{$t('myAccountNav.text7')}}</div>
          </div>
          <ul class="uls-child">
            <li class="child-item">
              <router-link to="/account/eatReward" class="child-link">
                <span>{{$t('myAccountNav.text10')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
            <!-- 交易奖励-->
            <li class="child-item">
              <router-link to="/account/serialReward" class="child-link">
                <span>{{$t('serialReward.text8')}}</span>
                <div class="icon"><img src="../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="right-cont">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.mobile
  display none
  @media screen and (max-width 1200px)
    display block
img
  display block
  width 100%
.accountNav
  display flex
  max-width: 1760px
  margin: 0 auto 96px
  padding-top: 20px
  min-height 100%
  @media screen and (max-width 1760px)
    padding: 20px 30px 0
  @media screen and (max-width: 1200px)
    display: block
    width: 100%
    min-height auto
    max-width 100%
    margin-bottom 0
    padding: 0
  .nav-wrap
    width: 400px
    background-color: #dbe3ea
    padding-bottom: 100px
    display block
    @media screen and (max-width 1760px)
      width: 260px
    @media screen and (max-width 1200px)
      display none
    .user-wrapper
      text-align: center
      padding-top: 90px
      padding-bottom: 15px
      color #181818
      .user-img-box
        width: 116px
        height: 116px
        border: 8px solid #fff
        box-shadow 0 0 10px rgba(79,80,84, .8)
        border-radius 50%
        margin: 0 auto
        img
          border-radius 50%
      .username
        font-size: 18px
        margin 20px 0 18px
      .nickname
        font-size: 14px
    .nav-uls
      background-color #dbe3ea !important
      cursor pointer
      .nav-item
        max-height 72px
        overflow: hidden
        transition all .3s linear
        .header-title
          color #181818
          font-weight bold
        &.active-nav
          max-height 1000px
          .item-title
            font-weight bold
          /*.uls-child*/
            /*background-color: #fff*/
        .item-title,.child-link
          height: 72px
          line-height: 72px
          display block
          color #fc534c
          padding: 0 35px 0 60px
          @media screen and (max-width 1800px)
            padding-left: 20px
        .item-title
          color #262627
          font-size: 18px
          cursor pointer
          display flex
          align-items center
          justify-content space-between
          .icon
            width: 9px
            display none
        .child-link
          display: flex
          align-items center
          justify-content space-between
          font-size: 16px
          // padding-left: 80px
          color #7F7E7E
          @media screen and (max-width 1800px)
            padding-left: 20px
          &.router-link-exact-active,&.router-link-active,&.isActive
            color #fc534c
            background-color #ded5d5
            border-left 5px solid #fc534c
            position relative
            span
              display inline-block
              position absolute
              left 55px
              @media screen and (max-width 1800px)
                left: 15px
            .icon
              display none
          .icon
            width: 9px
            display none
        .child-item
          &:hover
            .icon
              // display block
              display none
  .right-cont
    background-color: #fff
    flex 1
    padding-bottom 100px
    @media screen and (max-width 1200px)
      flex none
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      currentHigh: -1,
      currentIndex0: false,
      currentIndex1: false,
      currentIndex2: false,
      currentIndex3: false,
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this.getPath()
  },
  methods: {
    selectList (index) {
      this.currentHigh = -1
      this.currentIndex = index
      if (index === 0) {
        this.$router.push('/account/myAccount')
      } else if (index === 1) {
        this.$router.push('/account/orderManage')
      } else if (index === 2) {
        this.$router.push('/account/myDon')
      } else if (index === 3) {
        this.$router.push('/account/eatReward')
      }
    },
    getPath () {
      this.currentHigh = -1
      if (this.$route.path === '/account/myAccount') {
        this.currentIndex = 0
      } else if (this.$route.path === '/account/addAccount') {
        this.currentIndex = 0
      } else if (this.$route.path === '/account/transAccountManag') {
        this.currentIndex = 0
        // if (this.$route.query.usd === 'usd1') {
        //   this.currentHigh = 1
        // } else if (this.$route.query.usd === 'usd2') {
        //   this.currentHigh = 2
        // }
      } else if (this.$route.path === '/account/sieMoney/sieTransfer') {
        this.currentIndex = 0
      } else if (this.$route.path === '/account/orderManage') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/transferRecord/transferRecords') {
          this.currentIndex = 1
      } else if (this.$route.path === '/account/transferRecord/transferRecords/transferRecordDetail') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/notOpenShareOrder/shareOrder') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/notOpenShareOrder') {
        this.currentIndex = 0
      } else if (this.$route.path === '/account/orderDetail') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/usdOrder') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/sieOrder') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/btcOrder') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/sieOrderDetail') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/usdOrder/usdRechargeInfo') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/btcOrder/btcRechargeInfo') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/exchanges') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/exchanges/exchangeDetail') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/usdOrder/usdWithSwitchBoss/usdWithInfo/usdWithProblem') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/usdOrder/usdWithSwitchBoss/usdWithInfo') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/btcOrder/btcWithSwitchBoss/btcWithInfo') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/btcOrder/btcWithSwitchBoss/btcWithInfo/btcWithProblem') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/usdOrder/usdRechargeInfo/usdProblem') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/usdOrder/usdWithSwitchBoss') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/notOpenShareOrder/shareOrder/shareSetting') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/notOpenShareOrder/shareOrder/shareSetting/shareOrderDetails/shareProblem') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/notOpenShareOrder/shareOrder/shareSetting/shareOrderDetails') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/notOpenShareOrder/shareOrder/shareSetting/tiXianShareOrder') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/usdOrder/usdTransferDetail') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/usdOrder/usdTradeDetail') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/sieOrder/sieOrderDetail') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/sieOrder/sieOrderDetail') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/btcOrder/btcWithSwitchBoss') {
        this.currentIndex = 1
      } else if (this.$route.path === '/account/myDon') {
        this.currentIndex = 2
      } else if (this.$route.path === '/account/myDon/openDon') {
        this.currentIndex = 2
      } else if (this.$route.path === '/account/myDon/renew') {
        this.currentIndex = 2
      } else if (this.$route.path === '/account/activityReward') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/activityReward/activityRewardDetail') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/teamReward') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/teamReward/teamRewardDetail') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/eatReward') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/eatReward/eatRewardDetail') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/rank') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/rank/rankDetail') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/eatReward/rewardDetail') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/serialReward') {
        this.currentIndex = 3
      } else if (this.$route.path === '/account/serialReward/serialRewardDetails') {
        this.currentIndex = 3
      } else {
        this.currentIndex = 0
      }
    }
  },
  watch: {
    '$route': 'getPath'
  }
}
</script>
