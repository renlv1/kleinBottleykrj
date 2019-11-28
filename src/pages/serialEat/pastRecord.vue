<template>
  <div class="pastRecord">
    <div class="past-web">
      <div class="past-router linWrap">
        <div class="past-title">
          <router-link to="/serialEat" class="eat-bread">{{$t('pastRecord.text1')}}</router-link>
          <span class="separated"> > </span>
          <span class="before-activity">{{$t('pastRecord.text2')}}</span>
        </div>
      </div>
      <div class="mian-body">
        <div class="share-wrapper">
          <div class="share-text">{{$t('pastRecord.text3')}}</div>
        </div>
        <div class="table-container">
          <div class="table-title"><i></i> {{$t('pastRecord.text4')}}</div>
          <div class="table-name">
            <ul>
              <li>{{$t('pastRecord.text8')}}</li>
              <li>{{$t('pastRecord.text5')}}</li>
              <li>{{$t('pastRecord.text6')}}</li>
              <li>{{$t('pastRecord.text9')}}</li>
              <li>{{$t('pastRecord.text7')}}</li>
            </ul>
          </div>
          <div class="table-value">
            <ul>
              <!-- 通过路由传递期数，分红池金额，奖金池金额 -->
              <li v-for="item in historyRoundList" :key="item.index" @click="$router.push({path: '/pastRecordDetail',
                query:
                  {
                    pastRecordName: item.roundName,
                    pastRecordId: item.id,
                    bonusPoolSum: item.bonusPoolSum,
                    rewardPoolSum: item.rewardPoolSum,
                    start: item.startAt,
                    end: item.endAt
                  }})">
                <span>{{item.roundName}}</span>
                <span>{{$changeDate(item.startAt, '/')}}</span>
                <span>{{$changeDate(item.endAt, '/')}}</span>
                <span>{{item.rewardAllSum | formattingMoney}} USD</span>
                <span class="isClick" style="color: #FC534C">{{$t('pastRecord.text10')}}</span>
              </li>
            </ul>
          </div>
          <div class="error" v-if="historyRoundList.length === 0">
            {{$t('orderManage.text8')}}
          </div>
        </div>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
      </div>
    </div>
    <div class="container-mobile">
      <div class="head-mobile">
        <div class="back-mobile" @click="$router.push('/serialEat')"></div>
        <div class="title-mobile">{{$t('pastRecord.text11')}}</div>
      </div>
      <div class="table-mobile">
        <ul>
          <li v-for="item in historyRoundList" :key="item.index" class="font-size-style" @click="$router.push({path: '/pastRecordDetail',
          query:
            {pastRecordId: item.id,
             rewardPoolSum: item.rewardPoolSum,
             bonusPoolSum: item.bonusPoolSum,
             start: item.startAt,
             end: item.endAt
             }})">
            <div class="table-left">
              <div class="table-text">
                <span>{{item.roundName}} {{$t('pastRecord.text12')}}</span>
              </div>
              <div class="table-count">
                <span>{{$t('pastRecord.text13')}}：</span><span>{{item.rewardPoolSum + item.bonusPoolSum | formattingMoney}} USD</span>
              </div>
            </div>
            <div class="table-right"><span>{{$changeDate(item.createAt, '/')}}</span></div>
          </li>
        </ul>
      </div>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
      <div class="error" v-if="historyRoundList.length === 0">
        {{$t('orderManage.text8')}}
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .past-web
    @media screen and (min-width: 1200px) {
      display block
    }
    @media screen and (max-width: 1200px), handheld and (orientation: landscape) {
      display none
    }
    min-height 100vh
    height auto
    .past-router
      .past-title
        padding 20px 0
        .eat-bread, .separated
          font-size 18px
          color #fc534c
        .before-activity
          font-size 18px
          color #181818
    .mian-body
      width 100%
      height auto
      padding 120px 0 94px
      background #fff
      display flex
      flex-direction column
      align-items center
      .share-wrapper
        .share-text
          text-align center
          font-size 24px
          letter-spacing 3px
          font-weight bold
          color #181818
        .share-count
          margin-top 50px
          font-family "Microsoft YaHei UI"
          font-weight bold
          .integer
            font-size 45px
            color #181818
            @media screen and (max-width: 1200px) {
              font-size 26px
              color #fc534c
            }
          .decimal
            font-size 26px
            @media screen and (max-width: 1200px) {
              color #fc534c
            }
          .dot
            @media screen and (max-width: 1200px) {
              color #fc534c
            }
          .unit
            font-size 26px
            color #fc534c
            @media screen and (max-width: 1200px) {
              color #fc534c
            }
      .table-container
        margin 70px auto 0
        width 56%
        .table-title
          height 64px
          width 100%
          line-height 64px
          background #edeff1
          display flex
          align-items center
          i
            display inline-block
            width 10px
            height 22px
            margin-right 30px
            background-color #032e43
        .table-name
          height 64px
          padding-top 30px
          ul
            display flex
            flex-direction row
            width 100%
            justify-content flex-start
            font-family "Microsoft YaHei UI Light"
            font-size 14px
            color #181818
            li
              text-align center
              width 25%
        .table-value
          width 100%
          ul
            display flex
            flex-direction column
            font-family "Microsoft YaHei UI Light"
            font-size 14px
            color #181818
            justify-content flex-start
            li
              height 64px
              display flex
              flex-direction row
              align-items center
              text-align center
              cursor pointer
              user-select none
              &:active
                opacity 0.6
              span
                flex 1
              .change-color
                color #FC534C
              &:nth-of-type(odd)
                background #edeff1
  .container-mobile
    .table-mobile
      margin-top 70px
</style>

<script>
export default{
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      currentPage: 1, // 默认当前页为1
      historyRoundList: [] // 往期活动列表
    }
  },
  created () {
    this._getHistoryRoundList(1)
  },
  methods: {
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this._getHistoryRoundList(page)
    },
    _getHistoryRoundList (page) {
      this.$http.post(`${this.$api}/lottoReward/getHistoryRoundList?pageIndex=${page}&pageSize=${this.pageSize}`).then((res) => {
        if (res.data.success === true) {
          this.historyRoundList = res.data.data.roundList
          this.totalPage = res.data.data.totalPage
        }
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  }
}
</script>
