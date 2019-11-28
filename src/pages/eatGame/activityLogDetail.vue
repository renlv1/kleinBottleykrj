<template>
  <div class="activityLogDetail">
    <div class="activityLog-web">
      <div class="activityLog-title">
        <router-link to="/eatGame" class="eat-bread">{{$t('activityLogDetail.text1')}} > </router-link><router-link to="/eatGame/activityLog" class="eat-bread"> {{$t('activityLogDetail.text2')}} > </router-link><span class="before-activity">{{$t('activityLogDetail.text3')}}</span>
      </div>
      <div class="activity-content">
        <div class="content-dec">
          <div class="content-title"><span>{{$t('myAccountNav.text12')}} </span>{{roundName}}<span>{{$t('myAccountNav.text13')}}</span><span> {{$t('activityLogDetail.text3')}}</span></div>
          <div class="money"><span class="money-total">{{totalMoney}}</span><span class="point-dec">.</span><span class="point">{{decimal}}</span> <span class="unit">SIE</span></div>
          <div class="title">{{$t('activityLogDetail.text4')}}</div>
          <div class="AI-robot">
            <i></i>
            <p>{{$t('activityLogDetail.text5')}}</p>
          </div>
          <div class="activity-table">
            <div class="table-title">
              <div class="num">{{$t('activityReward.text2')}}</div>
              <div class="bonus">{{$t('activityLogDetail.text7')}}</div>
              <div class="eat">{{$t('activityLogDetail.text8')}}</div>
            </div>
            <div class="table-content">
              <div class="num"><span>{{$t('myAccountNav.text12')}} </span>{{roundName}}<span>{{$t('myAccountNav.text13')}}</span></div>
              <div class="bonus">{{lastUserName}}</div>
              <div class="eat"><span>{{lastUserAmount | formattingMoney}}</span> <span>SIE</span></div>
            </div>
          </div>
          <div class="AI-robot">
            <i></i>
            <p>{{$t('activityLogDetail.text9')}}</p>
          </div>
          <div class="total-money">
            <div class="table-title">
              <div class="num">{{$t('activityLogDetail.text10')}}</div>
              <div class="bonus">{{$t('activityLogDetail.text11')}}</div>
              <div class="eat"></div>
            </div>
            <div class="table-content">
              <div class="num">{{loopSumCount}}</div>
              <div class="bonus"><span>{{loopSumAmount | formattingMoney}}</span> <span>SIE</span></div>
              <div class="eat"></div>
            </div>
          </div>
          <div class="AI-robot">
            <i></i>
            <p>{{$t('activityLogDetail.text12')}}</p>
          </div>
          <div class="activity-table">
            <div class="table-title">
              <div class="num">{{$t('activityLogDetail.text6')}}</div>
              <div class="bonus">{{$t('activityLogDetail.text7')}}</div>
              <div class="eat">{{$t('activityLogDetail.text8')}}</div>
            </div>
            <div class="table-content" v-for="(item,index) in topRefList" :key="index">
              <div class="num">{{item.id}}</div>
              <div class="bonus">{{item.userName}}</div>
              <div class="eat"><span>{{item.rewardAmount | formattingMoney}} </span><span>SIE</span></div>
            </div>
            <div class="queryErr" v-if="topRefList.length === 0">
              {{$t('activityLogDetail.text13')}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--移动端结构-->
    <div class="activityLog-mobile">
      <div class="head">
        <div class="back" @click="$router.go(-1)"><img src="../../assets/images/aiChat/back.png"></div>
        <div class="title">{{$t('activityLogDetail.text14')}}</div>
      </div>
      <div class="mobile-content">
        <div class="content-wrap">
          <div class="content-title"><span><span>{{$t('myAccountNav.text12')}} </span>{{roundName}}</span><span>{{$t('myAccountNav.text13')}}</span><span> {{$t('activityLogDetail.text3')}}</span></div>
          <div class="title-dec">{{$t('activityLogDetail.text4')}}</div>
          <div class="money"><span class="money-total">{{totalMoney}}</span><span>.</span><span class="point">{{decimal}}</span> <span class="unit">SIE</span></div>
          <div class="dotted"><img src="../../assets/images/aiChat/dottedLine.png"></div>
          <div class="eat-picker"><p>{{$t('activityLogDetail.text5')}}</p></div>
          <div class="eat-title">
            <div class="num">{{$t('activityReward.text2')}}</div>
            <div class="username">{{$t('activityLogDetail.text7')}}</div>
            <div class="bonus">{{$t('activityLogDetail.text8')}}</div>
          </div>
          <div class="eat-content">
            <div class="num"><span>{{$t('myAccountNav.text12')}} </span>{{roundName}}<span>{{$t('myAccountNav.text13')}}</span></div>
            <div class="username">{{lastUserName}}</div>
            <div class="bonus"><span>{{lastUserAmount | formattingMoney}}</span> <span>SIE</span></div>
          </div>
          <div class="cycle-award"><p>{{$t('activityLogDetail.text9')}}</p></div>
          <div class="ranking-cycle">
            <div class="num">{{$t('activityLogDetail.text10')}}</div>
            <div class="total-money">{{$t('activityLogDetail.text11')}}</div>
            <div class="blank"></div>
          </div>
          <div class="ranking-content">
            <div class="num">{{loopSumCount}}</div>
            <div class="total-money"><span>{{loopSumAmount | formattingMoney}}</span> <span>SIE</span></div>
            <div class="blank"></div>
          </div>
          <div class="cycle-award"><p>{{$t('activityLogDetail.text12')}}</p></div>
          <div class="awardee-title">
            <div class="num">{{$t('activityLogDetail.text6')}}</div>
            <div class="username">{{$t('activityLogDetail.text7')}}</div>
            <div class="bonus">{{$t('activityLogDetail.text8')}}</div>
          </div>
          <div class="awardee">
            <ul>
              <li v-for="(item,index) in topRefList" :key="index">
                <div class="num">{{item.id}}</div>
                <div class="bonus">{{item.userName}}</div>
                <div class="eat"><span>{{item.rewardAmount | formattingMoney}} </span><span>SIE</span></div>
              </li>
            </ul>
            <div class="queryErr" v-if="topRefList.length === 0">
              {{$t('activityLogDetail.text13')}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.activityLogDetail
  min-height calc(100vh - 88px)
  display flex
  background-color #edeff1
  @media screen and (max-width: 1024px)
    background-color #fff
  .activityLog-web
    width 1760px
    margin 0 auto
    display flex
    flex-direction column
    justify-content center
    @media screen and (max-width: 1024px)
      display none
    .activityLog-title
      padding-left 60px
      height 80px
      line-height 80px
      .eat-bread
        font-size 18px
        color #fc534c
      .before-activity
        font-size 18px
        color #181818
    .activity-content
      height 100%
      margin-bottom 20px
      background-color #fff
      .content-dec
        padding-top 120px
        width 1128px
        margin 0 auto
        @media screen and (max-width: 1145px)
          width 100%
        .content-title
          font-weight bold
          text-align center
          margin-bottom 60px
          font-size 24px
          color #181818
          font-family "Microsoft YaHei UI"
        .money
          color #181818
          text-align center
          font-weight bold
          .money-total
            font-size 68px
            margin-right 10px
          .point
            margin-left 10px
            font-size 24px
          .unit
            font-size 24px
            color #fc534c
        .title
          text-align center
          margin-top 20px
          margin-bottom 54px
          font-family "Microsoft YaHei UI Light"
        .AI-robot
          height 64px
          width 100%
          background-color #edeff1
          position relative
        i
          display inline-block
          width 10px
          height 22px
          background-color #032e43
          position absolute
          top 21px
        p
          line-height 64px
          font-size 20px
          color #181818
          margin-left 40px
      .activity-table
        width 100%
        margin-bottom 180px
        font-family "Microsoft YaHei UI Light"
        .table-title
          display flex
          justify-content  space-between
          align-items center
          height 64px
          font-size 16px
          color #181818
          .num
            margin-left 38px
            margin-right 77px
            width 36%
          .bonus
            width 32%
          .eat
            width 32%
        .table-content
          display flex
          justify-content  space-between
          align-items center
          height 64px
          font-size 16px
          color #181818
          cursor pointer
          .num
            margin-left 38px
            margin-right 77px
            width 36%
          .bonus
            width 32%
          .eat
            width 32%
        .table-content:nth-child(even)
          background-color #edeff1
      .total-money
        width 100%
        margin-bottom 80px
        font-family "Microsoft YaHei UI Light"
        .table-title
          display flex
          justify-content  space-between
          align-items center
          height 64px
          font-size 16px
          color #181818
          .num
            margin-left 38px
            margin-right 77px
            flex 36%
          .bonus
            flex 32%
          .eat
            width 32%
        .table-content
          display flex
          justify-content  space-between
          align-items center
          height 64px
          font-size 16px
          color #181818
          cursor pointer
          .num
            margin-left 38px
            margin-right 77px
            flex 36%
          .bonus
            flex 32%
          .eat
            width 32%
        .table-content:nth-child(even)
          background-color #edeff1
.activityLogDetail
  .activityLog-mobile
    width 100%
    display block
    margin-top 50px
    @media screen and (min-width: 1025px)
      display none
    .head
      top 0
      width 100%
      height 50px
      line-height 50px
      display flex
      flex-direction row
      justify-content center
      background-color #fff
      position fixed
      z-index 98
      &:before
        content ''
        width 90%
        height 1px
        background-image url("../../assets/images/aiChat/dottedLine.png")
        position absolute
        top 50px
        @media screen and (min-width: 768px) and (max-width: 1025px)
          width 95%
      .back
        position absolute
        top 1px
        left 20px
        img
          width 17px
          height 13px
      .title
        font-size 18px
        color #fc534c
        font-weight bold
    .mobile-content
      width 100%
      margin-bottom 60px
      .content-wrap
        padding 0 20px
        .content-title
          font-size 16px
          font-weight bold
          margin-top 30px
          color #181818
        .title-dec
          margin-top 20px
          font-size 14px
          color #181818
        .money
          margin-top 10px
          font-weight bold
          font-family "Microsoft YaHei UI"
          .money-total
            font-size 24px
            margin-right 5px
          .point
            font-size 18px
            margin-left 5px
          .unit
            font-size 18px
            color #fc534c
        .dotted
            width 100%
            margin-top 10px
            img
              width 100%
        .eat-picker
            margin-top 30px
            p
              font-size 16px
              color #181818
              padding 16px 0
              background-color #edeff1
              position relative
              padding-left 30px
              &:before
                content ''
                width 10px
                height 22px
                background-color #032e43
                position absolute
                left 0
        .eat-title
            display flex
            height 52px
            font-size 14px
            color #181818
            padding 0 10px
            padding-top 25px
            justify-content space-between
            .num
              flex 32%
              text-align center
            .username
              flex 34%
              text-align center
            .bonus
              text-align center
              width 34%
        .eat-content
            display flex
            height 52px
            font-size 14px
            color #181818
            padding 0 10px
            justify-content space-between
            background-color #edeff1
            align-items center
            .num
              flex 32%
              text-align center
            .username
              flex 34%
              text-align center
            .bonus
              flex 34%
              text-align center
        .cycle-award
            margin-top 52px
            p
              font-size 16px
              color #181818
              padding 16px 0
              background-color #edeff1
              position relative
              padding-left 30px
              &:before
                content ''
                width 10px
                height 22px
                background-color #032e43
                position absolute
                left 0
        .ranking-cycle
            display flex
            height 52px
            font-size 14px
            color #181818
            padding 25px 20px 0 30px
            justify-content space-between
            .num
              flex 1
              text-align center
            .total-money
              flex 1
              text-align center
        .ranking-content
            display flex
            height 52px
            font-size 14px
            color #181818
            padding 0 20px 0 30px
            justify-content space-between
            background-color #edeff1
            align-items center
            .num
              flex 1
              text-align center
            .total-money
              flex 1
              text-align center
        .awardee
          ul
            li
              display flex
              justify-content  space-between
              align-items center
              height 52px
              font-size 14px
              color #181818
              cursor pointer
              .num
                flex 1
                text-align center
              .bonus
                flex 1
                text-align center
              .eat
                flex 1
                text-align center
              &:nth-of-type(odd)
                background-color #edeff1
        .awardee-title
          display flex
          height 52px
          font-size 14px
          color #181818
          padding-top 25px
          justify-content space-between
          .num
            flex 1
            text-align center
          .username
            flex 1
            text-align center
          .bonus
            flex 1
            text-align center
  .queryErr
    color: #e60000;
    text-align: center;
    height: 60px;
    line-height: 60px;
    @media screen and (max-width: 1025px)
      font-size 14px
  //正在加载中样式
  .load-more-box
    padding-bottom: 30px
    .desc
      font-size: 24px
      color #fff
      text-align: center
      margin-top: 30px
    .loading-img
      width: 50px
      height: 50px
      margin: 30px auto 0
      img
        width: 100%
        height: 100%
</style>

<script>
export default{
  data () {
    return {
      orderId: '', // 编号
      roundName: '', // 标题
      lastUserName: '', // 用户
      lastUserAmount: '', // 奖金
      loopSumAmount: '', // 发送总金额
      loopSumCount: '', // 发放轮数
      topRefList: '', // 推广夺奖者列表
      totalMoney: '', // 本轮奖金池总金额
      decimal: '', // 保留4位小数
      isLoadMore: true // 加载提示
    }
  },
  created () {
    this.getRewardList(1)
  },
  methods: {
    getRewardList () {
      console.log(this.$route.query.nowPage)
      let url = `${this.$api}/danRobot/danRewardList?pageSize=10&pageIndex=${this.$route.query.nowPage}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          // console.log(res.data.data)
          this.isLoadMore = false
          res.data.data.roundList.forEach(val => {
            // console.log(val.id, Number(this.$route.query.id))
            if (val.id === Number(this.$route.query.id)) {
              this.orderId = val.id
              this.roundName = val.roundName
              this.lastUserName = val.lastUserName
              this.lastUserAmount = val.lastUserAmount
              this.loopSumAmount = val.loopSumAmount
              this.roundState = val.roundState
              this.loopSumCount = val.loopSumCount
              this.topRefList = val.topRefList
              let capitalPool = val.capitalPool.toFixed(4)
              let reward = capitalPool.split('.')
              // console.log(reward)
              this.totalMoney = reward[0]
              this.decimal = reward[1]
            }
          })
        } else {
          this.isLoadMore = false
        }
      }).catch(err => {
        console.log(err)
        this.isLoadMore = false
      })
    }
  }
}
</script>
