<template>
  <div class="shareBonusDetail">
    <div class="share-web">
      <div class="share-router linWrap">
        <div class="activityLog-title">
          <router-link to="/serialEat" class="eat-bread">{{$t('shareBonusDetail.text1')}}</router-link>
          <span class="separated"> > </span>
          <span class="before-activity">{{$t('shareBonusDetail.text2')}}</span>
        </div>
      </div>
      <div class="mian-body">
        <div class="share-wrapper">
          <div class="share-text">{{$t('shareBonusDetail.text3')}}</div>
          <div class="share-count">
            <span class="integer">{{bonusPoolValueArr[0]}}</span>
            <span class="dot">.</span>
            <span class="decimal">{{bonusPoolValueArr[1]}}</span>
            <span class="unit">USD</span>
          </div>
        </div>
        <div class="table-container">
          <div class="table-title"><i></i> {{$t('shareBonusDetail.text4')}}</div>
          <div class="table-name">
            <ul>
              <li>{{$t('shareBonusDetail.text5')}}</li>
              <li>{{$t('shareBonusDetail.text6')}}</li>
              <li>{{$t('shareBonusDetail.text7')}}</li>
              <li>{{$t('shareBonusDetail.text8')}}</li>
              <li>{{$t('shareBonusDetail.text9')}}</li>
            </ul>
          </div>
          <div class="table-value">
            <ul>
              <li v-for="item in bonusLogList" :key="item.index">
                <span>{{item.playAmount | formattingMoney}} USD</span>
                <span>{{$changeDate(item.payAt, '/')}}</span>
                <span>{{item.rewardCount}}</span>
                <span>{{item.playerIndex}}</span>
                <span>{{item.bonusSum | formattingMoney}} USD</span>
              </li>
            </ul>
          </div>
          <div class='error' v-if="bonusLogList.length === 0">
            {{$t('orderManage.text8')}}
          </div>
        </div>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
      </div>
    </div>
    <div class="container-mobile">
      <div class="share-mobile">
        <div class="head-mobile">
          <div class="back-mobile" @click="$router.go(-1)"></div>
          <div class="title-mobile">{{$t('shareBonusDetail.text10')}}</div>
        </div>
        <div class="dashed"></div>
        <div class="amount-wrapper">
          <div class="amount-text">{{$t('shareBonusDetail.text11')}}</div>
          <div class="amount-value">{{allBonusSum | formattingMoney}} USD</div>
        </div>
        <div class="dashed"></div>
        <div class="table-all-mobile">
          <ul>
            <li v-for="item in bonusLogList" :key="item.index">
              <div class="table-top">
                <div class="my-qualifying">
                  <span class="qualifying-text">{{$t('shareBonusDetail.text12')}}：</span>
                  <span class="qualifying-value">{{item.playerIndex}}</span>
                </div>
                <div class="time"><span>{{$changeDate(item.payAt, '/')}}</span></div>
              </div>
              <div class="table-bottom">
                <div class="bottom-left">
                  <div class="betting">
                    <span class="bet-text">{{$t('shareBonusDetail.text13')}}：</span>
                    <span class="bet-value">{{item.playAmount | formattingMoney}} USD</span>
                  </div>
                  <div class="cumulative">
                    <span class="cumulative-text">{{$t('shareBonusDetail.text14')}}：</span>
                    <span class="cumulative-value">{{item.bonusSum | formattingMoney}} USD</span>
                  </div>
                </div>
                <div class="bottom-right">
                  <span class="reward-text">{{$t('shareBonusDetail.text15')}}：</span>
                  <span class="reward-value">{{item.rewardCount}} {{$t('share.text6')}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class='error' v-if="bonusLogList.length === 0">
          {{$t('orderManage.text8')}}
        </div>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .shareBonusDetail
    .share-web
      @media screen and (min-width: 1024px) {
        display block
      }
      @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
        display none
      }
      min-height 100vh
      height auto
      .share-router
        .activityLog-title
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
            color #181818
          .share-count
            margin-top 50px
            font-family "Microsoft YaHei UI"
            font-weight bold
            text-align center
            .integer
              font-size 45px
              color #181818
              @media screen and (max-width: 1024px) {
                font-size 26px
                color #fc534c
              }
            .decimal
              font-size 26px
              @media screen and (max-width: 1024px) {
                color #fc534c
              }
            .dot
              @media screen and (max-width: 1024px) {
                color #fc534c
              }
            .unit
              font-size 26px
              color #fc534c
              @media screen and (max-width: 1024px) {
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
                span
                  flex 1
                &:nth-of-type(odd)
                  background #edeff1
    .share-mobile
      .amount-wrapper
        margin 70px 0 30px 20px
        color #181818
        .amount-text
          font-size 16px
          margin-bottom 10px
        .amount-value
          font-size 20px
      .mobile-content
        margin-top 30px
</style>
<script>
export default{
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      allBonusSum: '',
      currentPage: 1, // 默认当前页为1
      bonusLogList: [], // 获取我的分红明细列表对象
      bonusPoolValueArr: [] // 存放用.分割的本轮分红金额数组
    }
  },
  created () {
    // this.segmentation()
    this._getMyBonusDetail(1) // 获得我的分红明细
    this._shareRewardDetail()
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  methods: {
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this._getMyBonusDetail(page)
    },
    // segmentation () { // 本轮的
    //   this.bonusPoolValueArr = Number(this.$route.query.bonusPoolValue).split('.')
    // },
    _shareRewardDetail () {
      this.$http.post(`${this.$api}/lottoReward/getBonusRewardList?pageIndex=${1}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}`).then((res) => {
        if (res.data.success === true) { // 我的
          this.allBonusSum = res.data.data.bonusSum
          // console.log(allBonusSum)
          this.bonusPoolValueArr = this.allBonusSum.toFixed(4).split('.')
        }
      })
    },
    _getMyBonusDetail (page) {
      this.$http.post(`${this.$api}/lottoReward/getBonusRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}`).then((res) => {
        if (res.data.success === true) {
          this.bonusLogList = res.data.data.rewardPlayerList
          this.totalPage = res.data.data.totalPage
        }
      })
    }
  }
}
</script>
