<template>
  <div class="switch-boss">
    <!--选择老板-->
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('usdMoney.text50')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <h3 id="record-title">
      <span class="line"></span>
      <div>
        <router-link to="/account/usdWithdrawMoney">BTC{{$t('usdOrder.text3')}}</router-link>
        <span>&gt;</span>
        <span>{{$t('usdMoney.text50')}}</span>
      </div>
    </h3>
    <div class="boss-w">
      <ul class="boss-uls">
        <li class="boss-list" v-for="(item, index) in bossArr" :key="index" @click="checkOne(index, item.id)">
          <div class="left">
            <div class="boss-img"><img :src="item.img" alt=""></div>
            <div class="boss-info">
              <p class="nick-name">{{item.nickName}}</p>
              <p class="shouxufei">{{$t('usdMoney.text_51')}}：<span class="red-text">{{item.feeRate * 100}}%</span></p>
            </div>
          </div>
          <div class="right" :class="{'checked-boss': checkIndex === index}" >
            <div class="icon"></div>
          </div>
        </li>
      </ul>
      <!--<v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>-->
    </div>
    <div class="err-text" style="color: #FC534C">{{errMsg}}</div>
    <div id="btn-red-submit" @click="bossConfim()">{{$t('sieTransfer.text10')}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        // totalPage: 1,
        checkIndex: 0,
        bossArr: [],
        bossId: '',
        orderId: this.$route.query.id,
        errMsg: ''
      }
    },
    created () {
      this.getBossList()
    },
    methods: {
      bossConfim () {
        if (this.bossId !== '') {
          this.postRequest('/draw/chooseBoss', {
            id: this.orderId, // 订单id
            bossId: this.bossId // 老板id
          }).then(res => {
            if (res.data.success === true) {
              this.errMsg = '' // 清除选择老板失败的错误提示
              this.$router.push({
                path: '/account/btcOrder/btcWithSwitchBoss/btcWithInfo',
                query: {id: this.orderId}
              })
            } else { // 选择老板失败
              this.errMsg = res.data.msg
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      checkOne (index, id) {
        this.checkIndex = index
        this.bossId = id
      },
      // 选择老板
      getBossList () {
        this.postRequest('/draw/matchListByDraw', {
          orderid: this.orderId, // 订单id
          pageIndex: '1', // 页数
          pageSize: '20' // 每页条数
        }).then(res => {
          if (res.data.success === true) {
            this.bossArr = res.data.data
            if (this.bossArr.length > 0) {
              this.bossId = this.bossArr[0].id
            }
          }
        }).catch(err => {
          console.log(err)
        })
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
      // parentTurnPage (page) { // 页码
      // }
    }
    // components: {
    //   vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
    // }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .switch-boss
    padding-top: 70px;
    padding-left: 92px;
    max-width: 1070px;
    box-sizing: content-box;
    @media screen and (max-width 1600px)
      padding-left: 50px
      padding-right: 50px
    @media screen and (max-width 1200px)
      padding: 0
      max-width 100%
    #fixed-top-header
      @media screen and (max-width 1200px)
        border-bottom none
    #record-title
      a
        color #181818
    .boss-w
      @media screen and (max-width 1200px)
        min-height calc(100vh - 46px)
    .boss-uls
      margin: 50px 0
      @media screen and (max-width 1200px)
        margin: 0
        padding: 80px 15px 0
      .boss-list
        height: 180px
        display: flex
        background-color: #fafbfc
        align-items center
        justify-content space-between
        padding: 0 80px 0 68px
        border: 1px solid #d7d9db
        margin-bottom: 30px
        &:last-child
          margin-bottom: 0
        @media screen and (max-width 1200px)
          height: 85px
          padding: 0 8px
          border none
          background-color: #f0f2f5
          margin-bottom: 12px
        .left
          display flex
          align-items center
          .boss-img
            width: 100px
            height: 100px
            margin-right: 20px
            @media screen and (max-width 1200px)
              width: 60px
              height: 60px
              margin-right: 10px
            img
              width: 100%
              height: 100%
          .boss-info
            .nick-name
              font-size: 22px
              margin-bottom: 30px
              @media screen and (max-width 1200px)
                font-size: 16px
                margin-bottom: 8px
                color #171717
            .shouxufei
              font-size: 20px
              @media screen and (max-width 1200px)
                font-size: 14px
                color #171717
              .red-text
                color #fc534c
                @media screen and (max-width 1200px)
                  color #003399
                  font-weight: bold
        .right
          width: 38px
          height: 38px
          border-radius 4px
          border: 1px solid #b3b3b3
          background-color: #fafbfc
          cursor pointer
          display: flex
          align-items center
          justify-content center
          @media screen and (max-width 1200px)
            width: 28px
            height: 28px
            border-radius 4px
            border none
            background-color: #d2d4d6
          &.checked-boss
            border none
            background-color: #fc534c
            .icon
              width: 22px
              height: 22px
              background: url("../../../../assets/images/myAccount/tick_checked.svg") no-repeat center / cover
              @media screen and (max-width 1200px)
                width: 16px
                height: 16px
                background-image: url("../../../../assets/images/myAccount/checked_gou.svg")
    #btn-red-submit
      margin: 100px 0
      @media screen and (max-width 1200px)
        margin: 0
</style>
