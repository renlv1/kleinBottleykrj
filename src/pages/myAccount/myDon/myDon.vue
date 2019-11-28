<template>
  <div class="myDon">
    <!-- 1.0 克莱茵瓶-->
    <div id="fixed-top-header">
      <div class="back" @click="$router.push('/account/myAccount')"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('danAI.text3')}}</h3>
    </div>
    <!-- 未开通-->
    <div v-if="notOpenAiShow" class="not-open">
      <div class="pc-not-open">
        <div class="open-ai-wrap">
          <div class="don-logo">
            <img src="../../../assets/images/myAccount/myDon/robo-Don.svg" alt="">
          </div>
          <p class="text1">{{$t('danAI.text1')}}</p>
          <p class="text2">{{$t('danAI.text2')}}</p>
          <div @click="$router.push('/klein')" class="learn-more">
            <div>{{$t('danAI.text4')}}</div>
            <div class="row-icon"><img src="../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
          </div>
          <div class="open-btn" @click="$router.push('/account/myDon/openDon')">{{$t('danAI.text5')}}</div>
          <div class="mobile-btn">
            <div class="open-btn-mobile" @click="$router.push('/account/myDon/openDon')">{{$t('danAI.text5')}}</div>
          </div>
          <p class="price">{{$t('danAI.text6')}}：  30 SIE/{{$t('danAI.text39')}}</p>
        </div>
      </div>
    </div>
    <div class="myDon-header" v-show="!notOpenAiShow">
      <!-- 已开通-->
      <div class="open-ai-header" v-if="openAiShow">
        <p class="open-time1">{{$t('danAI.text22')}}</p>
        <p class="times" v-if="openAiData && (new Date() < openAiData.userEndTime)">{{$changeDate(openAiData.userEndTime, '-', 1)}}</p>
        <div class="times" v-else>{{$t('danAI.text55')}}</div>
        <div class="xufei-btn" @click="$router.push('/account/myDon/renew')">{{$t('danAI.text23')}}</div>
      </div>
      <!-- 已过期-->
      <div v-if="outDateAiShow" class="outdate-ai open-ai-header">
        <p class="open-time1">{{$t('danAI.text24')}}： <span class="old-t">{{$t('danAI.text25')}}</span></p>
        <p class="times" v-show="openAiData.userEndTime">{{$changeDate(openAiData.userEndTime, '-', 1)}}</p>
        <div class="xufei-btn" @click="$router.push('/account/myDon/renew')">{{$t('danAI.text23')}}</div>
      </div>
      <div class="dashed" v-show="openAiData.userEndTime"></div>
    </div>
    <!--开通记录-->
    <div class="open-record" v-show="openRecordShow">
      <h3 class="record-title">
        <span class="line"></span>
        <span>{{$t('danAI.text27')}}</span>
      </h3>
      <div class="table">
        <ul class="table-uls">
          <li class="table-list table-id">{{$t('danAI.text28')}}</li>
          <li class="table-list table-type">{{$t('danAI.text29')}}</li>
          <li class="table-list table-money">{{$t('danAI.text30')}}</li>
          <li class="table-list table-time">{{$t('danAI.text31')}}</li>
        </ul>
        <ul class="table-uls table-data-uls" v-for="(item, index) in OpenAIRecordData" :key="index">
          <li class="table-list table-id">{{item.id}}</li>
          <li class="table-list table-type">{{payAIStauts(item.orderType)}}</li>
          <li class="table-list table-money">{{item.orderAmount | formattingMoney}} {{item.currency}}</li>
          <li class="table-list table-time" v-show="item.createAt">{{$changeDate(item.createAt, '/', 1)}}</li>
        </ul>
      </div>
      <div class="mobile-table">
        <ul>
          <li v-for="(item, index) in OpenAIRecordData" :key="index" class="table-list">
            <div class="table-list-flex">
              <span class="type">{{payAIStauts(item.orderType)}}</span>
              <span class="money">{{item.orderAmount | formattingMoney}} {{item.currency}}</span>
            </div>
            <p class="time" v-show="item.createAt">{{$changeDate(item.createAt, '/', 1)}}</p>
          </li>
        </ul>
      </div>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
img
  width: 100%
  display block
.myDon
  width: 100%
  min-height 100%
  height: 100%
  .myDon-header
    padding: 130px 20px 0 90px
    @media screen and (max-width 1760px)
      padding: 50px 20px 0 40px
    @media screen and (max-width 1200px)
      padding: 50px 15px 0
    .dashed
      margin-top: 47px
      width: 1170px
      height: 1px
      background: url("../../../assets/images/myAccount/myDon/dashed_line.png") repeat-x
      @media screen and (max-width 1760px)
        width: 100%
    /*已开通    */
    .open-ai-header
      font-size: 16px
      @media screen and (max-width 1200px)
        text-align: center
      .open-time1
        font-weight: bold
        color #181818
        @media screen and (max-width 1200px)
          margin-top: 50px
          text-align: center
          font-weight: normal
          font-family "Microsoft YaHei UI Light"
      .times
        margin: 30px 0
        font-size: 38px
        color #181818
        font-weight: bold
        @media screen and (max-width 1200px)
          font-size: 20px
          margin: 20px 0
      .xufei-btn
        display: block
        cursor pointer
        width: 168px
        height: 44px
        line-height: 44px
        text-align: center
        color #fff
        border-radius 4px
        font-size: 16px
        box-shadow 0 5px 10px #d7d9db
        background-color: #fc534c
        @media screen and (max-width 1200px)
          width: 100%
    /*已过期      */
    .outdate-ai
      .old-t
        color #fc534c
      .times
        color #d7d9db
  /* 未开通*/
  .not-open
    /*position: relative*/
    height: 100%
    text-align: center
    color #fff
    @media screen and (max-width 1200px)
      min-height 100vh
      height: 100vh
    .open-bg-line
      width: 100%
      @media screen and (max-width 1200px)
        height: 200px
        img
          height: 100%
    .pc-not-open
      height: 100%
    .open-ai-wrap
      width: 100%
      min-height: 100vh
      background: url("../../../assets/images/myAccount/myDon/not-open-bg.png") no-repeat center / cover
      display flex
      align-items center
      justify-content center
      flex-direction column
    .don-logo
      padding-top: 120px
      width: 240px
      margin-bottom: 60px
      @media screen and (max-width 1200px)
        width: 150px
        margin-bottom: 30px
    .text1
      font-size: 18px
    .text2
      font-size: 14px
      margin: 30px 0 20px
      width: 100%
      padding: 0 20px
    .learn-more
      cursor pointer
      font-size: 14px
      color #fc534c
      display flex
      align-items center
      justify-content center
      .row-icon
        width 9px
        margin-left: 20px
    .open-btn
      display flex
      align-items center
      justify-content center
      background-color: #fc534c
      width: 600px
      height: 68px
      cursor pointer
      margin: 60px auto 20px
      @media screen and (min-width 1200px)
        display flex
      @media screen and (max-width 1200px)
        display none
    .mobile-btn
      width: 100%
      padding: 0 30px
      display none
      @media screen and (max-width 1200px)
        display block
      @media screen and (min-width 1200px)
        display: none
      .open-btn-mobile
        width: 100%
        cursor pointer
        height: 50px
        display flex
        align-items center
        justify-content center
        background-color: #fc534c
        margin: 40px 0 20px
        font-size 16px
    .price
      padding-bottom: 53px
      font-size: 20px
  .open-record
    padding: 70px 142px 30px 90px
    @media screen and (max-width 1760px)
      padding: 30px 40px 20px 40px
    @media screen and (max-width 1200px)
      padding-right: 15px
      padding-left: 15px
    .record-title
      font-weight: normal
      display flex
      align-items center
      height: 64px
      font-size: 20px
      color #181818
      background-color: #edeff1
      @media screen and (max-width 1128px)
        height: 50px
      .line
        display block
        width: 10px
        height: 22px
        margin-right: 30px
        background-color: #032e43
        @media screen and (max-width 1200px)
          margin-right: 10px
    .table
      font-size: 14px
      color #181818
      @media screen and (max-width 1200px)
        display none
      @media screen and (min-width 1200px)
        display block
      .table-uls
        height: 64px
        display flex
        align-items center
        &:nth-child(odd)
          background-color: #FBFBFB
        &:nth-child(even)
          background-color: #EDEFF1
        .table-list
          flex 1
          display flex
          justify-content center
          align-items center
          font-size: 14px
          color #181818
        .table-id
          justify-content left
          margin-left: 38px
      .table-data-uls
        &:hover
          box-shadow: 0px -4px 15px rgba(196, 205, 214, 0.8);
          font-weight: bold
    .mobile-table
      @media screen and (max-width 1200px)
        display block
        .table-list
          padding: 10px 20px
          height: 70px
          &:nth-child(odd)
            background-color: #FBFBFB
          &:nth-child(even)
            background-color: #EDEFF1
          .table-list-flex
            display flex
            align-items center
            justify-content space-between
            font-size: 14px
            color #181818
          .time
            font-size: 14px
            margin-top: 10px
            color #605f5f
      @media screen and (min-width 1200px)
        display none
</style>

<script>
export default{
  data () {
    return {
      openAiData: [],
      totalPage: 0,
      currentPage: 1,
      OpenAIRecordData: [],
      aiOpenFlag: '', // 小单开通标识符
      openAiShow: false, // 已开通
      notOpenAiShow: false, // 未开通
      outDateAiShow: false, // 已过期
      openRecordShow: false // 开通记录
    }
  },
  created () {
    this.getBuyRobot()
    this.getOpenAIRecord(1)
    this.getOpenAiPrice()
  },
  methods: {
    // 查询已开通的机器人
    getBuyRobot () {
      this.$http({
        url: this.$api + '/product/queryBuyRobot',
        method: 'post',
        data: {
          pageIndex: 1,
          pageSize: 20
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.success === true) {
          let aiArr = res.data.data.darwinSets
          let findIndex = aiArr.findIndex((val) => {
            return val.product.id === 4
          })
          if (findIndex > -1) {
            this.openRecordShow = true
            this.openAiShow = true
          } else {
            this.notOpenAiShow = true
          }
          aiArr.forEach((value) => {
            if (value.product.id === 4) {
              this.openAiData = value
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 开通记录
    getOpenAIRecord (page) {
      this.$http({
        url: this.$api + '/product/queryRobotOrder',
        method: 'post',
        data: {
          pageIndex: page,
          pageSize: 10,
          productid: 4
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.success === true) {
          this.OpenAIRecordData = res.data.data.orderList
          this.totalPage = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 交易类型
    payAIStauts (val) {
      if (val === 1) {
        return this.$t('danAI.text32')
      } else if (val === 2) {
        return this.$t('danAI.text33')
      } else if (val === 3) {
        return this.$t('danAI.text34')
      } else {
        return this.$t('danAI.text35')
      }
    },
    // 开通ai价格
    getOpenAiPrice () {
      this.$http({
        url: this.$api + '/product/showOpenRobotAiTotal',
        method: 'post',
        data: {
          productid: 4
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.success === true) {
          this.aiOpenFlag = res.data.data.isopen
          if (this.aiOpenFlag === '2') {
            this.outDateAiShow = true
            this.openRecordShow = true
            this.openAiShow = false
          }
          if (this.aiOpenFlag === '4') {
            this.openRecordShow = true
            this.openAiShow = true
          }
        }
      })
    },
    // 分页
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this.getOpenAIRecord(page)
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
    vLoading: resolve => require(['@/components/loading.vue'], resolve)
  }
}
</script>
