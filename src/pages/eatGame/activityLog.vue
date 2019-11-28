<template>
  <div class="activityLog">
    <div class="activityLog-web">
      <div class="activityLog-title">
        <router-link to="/eatGame" class="eat-bread">{{$t('activityLog.text1')}} > </router-link><span class="before-activity"> {{$t('activityLog.text2')}}</span>
      </div>
      <div class="activity-content">
        <div class="content-dec">
          <div class="AI-robot">
            <i></i>
            <p>{{$t('activityLog.text2')}}</p>
          </div>
          <div class="activity-table">
            <div class="table-title">
              <div class="num">{{$t('activityReward.text2')}}</div>
              <div class="bonus">{{$t('activityLog.text4')}}</div>
              <div class="eat">{{$t('activityLog.text5')}}</div>
              <div class="time">{{$t('activityLog.text6')}}</div>
              <div class="operation">{{$t('activityLog.text7')}}</div>
            </div>
            <ul>
              <li class="table-content" v-for="(item, index) in  rewardList" :key="index" @click="$router.push({path: '/eatGame/activityLogDetail',
            query:
            {
              id: item.id,
              nowPage: nowPage
            }})">
                <div class="num"><span>{{$t('myAccountNav.text12')}} </span>{{item.roundName}}<span>{{$t('myAccountNav.text13')}}</span></div>
                <div class="bonus">{{item.capitalPool | formattingMoney}} <span>SIE</span></div>
                <div class="eat">{{item.lastUserName}}</div>
                <div class="time">{{$changeDate(item.endAt, '-', 1)}}</div>
                <div class="operation" style="color: #FC534C">{{$t('activityLog.text8')}}
                  <!--<router-link :to="{path:'/eatGame/activityLogDetail', query: {id: item.id}}">{{$t('activityLog.text8')}}</router-link>-->
                </div>
              </li>
            </ul>
            <div class="load-more-box" v-show="isLoadMore">
              <p class="desc"></p>
              <div class="loading-img">
                <img src="../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
          </div>
          <div class="turnPage">
            <v-turnPage  :propsPage="pagesTotal" @activityLog="parentTurnPage"></v-turnPage>
          </div>
        </div>
      </div>
    </div>
    <!--移动端结构-->
    <div class="activityLog-mobile">
      <div class="head">
        <div class="back" @click="$router.go(-1)"><img src="../../assets/images/aiChat/back.png"></div>
        <div class="title">{{$t('activityLog.text2')}}</div>
      </div>
      <div class="mobile-content">
        <div class="table-content">
          <ul>
            <router-link tag="li" v-for="(item, index) in rewardList" :key="index" :to="{path:'/eatGame/activityLogDetail', query: {id: item.id, nowPage: nowPage}}">
              <div class="content-top">
                <div class="top-title">
                  <div class="roundName"><span>{{$t('myAccountNav.text12')}}</span>{{item.roundName}}<span>{{$t('myAccountNav.text13')}}</span></div>
                  <div class="eat">{{$t('activityLog.text5')}}:{{item.lastUserName}}</div>
                </div>
                <div class="right-cont">
                  <div class="content-down">
                    <div class="money">{{item.capitalPool | formattingMoney}}<span> SIE</span></div>
                    <div class="date">{{$changeDate(item.endAt, '/', 1)}}</div>
                  </div>
                  <div class="img-box">
                    <img src="../../assets/images/aiChat/next.png"/>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="load-more-box" v-show="isLoadMore">
              <div class="loading-img">
                <img src="../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <v-turnPage class="mobilePagesList" :propsPage="pagesTotal" @activityLog="parentTurnPage" ref="turnPage"></v-turnPage>
          </ul>
          <!--<div class="queryErr" v-if="rewardList.length === 0 || !rewardList">-->
            <!--{{$t('activityLogDetail.text13')}}-->
          <!--</div>-->
      </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.activityLog
  min-height calc(100vh - 88px)
  display flex
  background-color #edeff1
  @media screen and (max-width: 1024px)
    background-color #fff
    min-height 0
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
      padding-top 130px
      width 1128px
      margin 0 auto
      @media screen and (max-width: 1145px)
        width 100%
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
        margin-bottom 50px
        font-family "Microsoft YaHei UI Light"
        .table-title
          display flex
          justify-content  space-between
          align-items center
          height 64px
          font-size 16px
          color #181818
          text-align center
          .num
            margin-left 38px
            margin-right 77px
            flex 1
          .bonus
            flex 1
          .eat
            flex 1
          .time
            flex 1
          .operation
            flex 1
        .table-content
          display flex
          justify-content  space-between
          align-items center
          height 64px
          font-size 16px
          color #181818
          text-align center
          cursor pointer
          .num
            margin-left 38px
            margin-right 77px
            flex 1
          .bonus
            flex 1
          .eat
            flex 1
          .time
            flex 1
          .operation
            flex 1
            a
              font-size 16px
              color #fc534c
        .table-content:nth-child(even)
          background-color #edeff1
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
  .turnPage
    margin-bottom 130px
    display flex
    justify-content center
.activityLog
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
      margin-bottom 30px
      .table-content
        padding-top 30px
        ul
          margin 0 20px
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
          li
            height 80px
            display flex
            justify-content space-between
            align-items center
            background-color #fbfbfb
            font-size 14px
            color #181818
            &:nth-of-type(odd)
              background-color #edeff1
            .content-top
              width: 100%
              display flex
              align-items center
              padding: 0 10px
              .top-title
                flex 1
                display: block
              .right-cont
                display flex
                align-items center
              .content-down
                .money
                  text-align: right
              .img-box
                width: 9px
                margin-left 10px
                img
                  display: block
                  width: 100%
</style>

<script>
export default{
  data () {
    return {
      pagesTotal: 1, // 查看业绩总页数
      nowPage: 1, // 当前页数
      rewardList: '', // 往期活动数据
      isLoadMore: true // 正在加载中
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  created () {
    this.getRewardList(1)
  },
  methods: {
    // 获取往期活动数据
    getRewardList (page) {
      let url = `${this.$api}/danRobot/danRewardList?pageSize=10&pageIndex=${page}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          // console.log(res.data)
          this.isLoadMore = false
          let ret = res.data.data
          this.rewardList = ret.roundList
          this.pagesTotal = res.data.data.totalPage
        } else {
          this.isLoadMore = false
          this.pagesTotal = 0
        }
      }).catch(err => {
        console.log(err)
        this.isLoadMore = false
      })
    },
    parentTurnPage (page) {
      this.nowPage = page
      this.getRewardList(page)
    }
  }
}
</script>
