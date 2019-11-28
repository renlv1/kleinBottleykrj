<template>
  <div class="pastRecordDetail">
    <div class="detail-web">
      <div class="past-router linWrap">
        <div class="past-title">
          <router-link to="/serialEat" class="eat-bread">{{$t('pastRecordDetail.text1')}}</router-link>
          <span class="separated"> > </span>
          <router-link to="/pastRecord" class="before-activity">{{$t('pastRecordDetail.text2')}}</router-link>
          <span> > </span>
          <span class="before-activity">{{$t('pastRecordDetail.text3')}}</span>
        </div>
      </div>
      <div class="main-body">
        <div class="share-wrapper">
          <div class="share-text">{{$t('pastRecordDetail.text4')}}{{this.$route.query.pastRecordName}}{{$t('pastRecordDetail.text5')}}</div>
        </div>
        <div class="table-container">
          <div class="table-title"><i></i>{{this.$route.query.pastRecordName}} {{$t('pastRecordDetail.text5')}}</div>
          <div class="table-name">
            <ul>
              <li>{{$t('pastRecord.text5')}}</li>
              <li>{{$t('pastRecord.text6')}}</li>
              <li>{{$t('pastRecord.text15')}}</li>
              <li>{{$t('pastRecord.text14')}}</li>
              <li>{{$t('pastRecord.text9')}}</li>
            </ul>
          </div>
          <div class="table-value">
            <ul class="highLight">
              <li>
                <span>{{$changeDate(Number(this.$route.query.start), '/')}}</span>
                <span>{{$changeDate(Number(this.$route.query.end), '/')}}</span>
                <span>{{Number(this.$route.query.bonusPoolSum) | formattingMoney}} USD</span>
                <span>{{Number(this.$route.query.rewardPoolSum) | formattingMoney}} USD</span>
                <span>{{Number(Number(this.$route.query.bonusPoolSum) + Number(this.$route.query.rewardPoolSum)) | formattingMoney}} USD</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 奖金池 -->
        <div id="bonus" class="table-container" ref="bonusContainer">
          <div class="table-title"><i></i> {{$t('pastRecordDetail.text14')}}</div>
          <div class="table-name">
            <ul>
              <li>{{$t('pastRecordDetail.text15')}}</li>
              <li>{{$t('pastRecordDetail.text16')}}</li>
              <li>{{$t('pastRecordDetail.text17')}}</li>
            </ul>
          </div>
          <div class="table-value">
            <ul>
              <li v-for="item in getBonusList" :key="item.index">
                <span>{{item.id}}</span>
                <span>{{item.userName}}</span>
                <span>{{item.ruleAmount | formattingMoney}} USD</span>
              </li>
            </ul>
          </div>
          <div class="error" v-if="getBonusList.length === 0">
            {{$t('orderManage.text8')}}
          </div>
          <v-turnPage :propsPage="totalPage" @orderLogTrunPage="bonusTurnPage"></v-turnPage>
        </div>
        <!-- 分红池 -->
        <div id="share" class="table-container" ref="shareContainer">
          <div class="table-title"><i></i> {{$t('pastRecordDetail.text18')}}</div>
          <div class="table-name">
            <ul>
              <li>{{$t('pastRecordDetail.text27')}}</li>
              <li>{{$t('pastRecordDetail.text16')}}</li>
              <li>{{$t('pastRecordDetail.text21')}}</li>
            </ul>
          </div>
          <div class="table-value">
            <ul>
              <li v-for="item in getRewardList" :key="item.index">
                <span>{{item.id}}</span>
                <span>{{item.userName}}</span>
                <span>{{item.ruleAmount | formattingMoney}} USD</span>
              </li>
            </ul>
          </div>
          <div class="error" v-if="getRewardList.length === 0">
            {{$t('orderManage.text8')}}
          </div>
          <v-turnPage :propsPage="bonusTotalPage" @orderLogTrunPage="rewardTurnPage"></v-turnPage>
        </div>
      </div>
    </div>
    <div class="container-mobile">
        <div class="head-mobile">
          <div class="back-mobile" @click="$router.push('/pastRecord')"></div>
          <div class="title-mobile">{{$t('pastRecordDetail.text22')}}</div>
        </div>
        <div class="myAccountBody">
          <div class="btn-wrapper">
            <span @click="tabToggle" :class="{active: isActiveFlag}">{{$t('pastRecordDetail.text23')}}</span>
            <span @click="toggle" :class="{active: !isActiveFlag}">{{$t('pastRecordDetail.text24')}}</span>
          </div>
          <!-- 奖金池 -->
          <div class="" v-if="isActiveFlag">
            <div class="count-wrapper">
              <div class="count-title">{{$t('pastRecordDetail.text25')}}</div>
              <div class="count-value">{{this.$route.query.rewardPoolSum | formattingMoney}} USD</div>
              <div class="time" style="margin-top: 15px">{{$changeDate(Number(this.$route.query.start), '/')}} - {{$changeDate(Number(this.$route.query.end), '/')}}</div>
            </div>
            <div class="segmentation"></div>
            <div class="table-mobile">
              <ul>
                <li v-for="item in getBonusList" :key="item.index">
                  <div class="table-left">
                    <div class="num-wrapper">
                      <span>{{$t('pastRecordDetail.text27')}}：</span><span>{{item.id}}</span>
                    </div>
                    <div class="table-name"><span>{{item.userName}}</span></div>
                  </div>
                  <div class="table-right">
                    <div class="table-times"><span>{{$changeDate(item.payAt, '/')}}</span></div>
                    <div class="table-count-wrapper">
                      <span>{{$t('pastRecordDetail.text28')}}：</span><span>{{item.rewardAmount | formattingMoney}} USD</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class='error' v-if="getBonusList.length === 0">
              {{$t('orderManage.text8')}}
            </div>
            <v-turnPage v-if="getBonusList.length !== 0" :propsPage="totalPage" @orderLogTrunPage="bonusTurnPage" ref="turnPage"></v-turnPage>
          </div>
          <!-- 分红池 -->
          <div class="" v-if="!isActiveFlag">
            <div class="count-wrapper">
              <div class="count-title">{{$t('pastRecordDetail.text26')}}</div>
              <div class="count-value">{{this.$route.query.bonusPoolSum | formattingMoney}} USD</div>
              <div class="time" style="margin-top: 15px">{{$changeDate(Number(this.$route.query.start), '/')}} - {{$changeDate(Number(this.$route.query.end), '/')}}</div>
            </div>
            <div class="segmentation"></div>
            <div class="table-mobile">
              <ul>
                <li v-for="item in getRewardList" :key="item.index">
                  <div class="table-left">
                    <div class="num-wrapper">
                      <span>{{$t('pastRecordDetail.text27')}}：</span><span>{{item.id}}</span>
                    </div>
                    <div class="table-name"><span>{{item.userName}}</span></div>
                  </div>
                  <div class="table-right">
                    <div class="table-times"><span>{{$changeDate(item.payAt, '/')}}</span></div>
                    <div class="table-count-wrapper">
                      <span>{{$t('pastRecordDetail.text28')}}：</span><span>{{item.rewardAmount | formattingMoney}} USD</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class='error' v-if="getRewardList.length === 0">
              {{$t('orderManage.text8')}}
            </div>
            <v-turnPage v-if="getRewardList.length !== 0" :propsPage="bonusTotalPage" @orderLogTrunPage="rewardTurnPage" ref="turnPage"></v-turnPage>
          </div>
        </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .detail-web
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
    .main-body
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
              flex 1
              letter-spacing 3px
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
              letter-spacing 1px
              span
                flex 1
              .change-color
                color #FC534C
              &:nth-of-type(odd)
                background #edeff1
          .highLight
            li
              cursor pointer
              user-select none
              &:active
                opacity 0.6
  .container-mobile
    margin-top 70px
    .myAccountBody
      .btn-wrapper
        height 36px
        width 100%
        border-radius 5px
        display flex
        flex-direction row
        border 1px solid #032e43
        span
          display inline-block
          text-align center
          width 50%
          height 100%
          line-height 36px
          font-size 18px
          color #032e43
          &.active
            color #fff
            background #032e43
      .count-wrapper
        margin 30px 0
        color #181818
        .count-title
          margin-bottom 15px
          font-size 16px
        .count-value
          font-size 20px
      .segmentation
        height 1px
        background-image url("../../assets/images/myAccount/dashed.png")
        background-repeat repeat-x
        background-position bottom
      .table-mobile
        margin-top 30px
        ul
          li
            .table-left
              .num-wrapper
                 margin-bottom 6px
            .table-right
              .table-times
                 margin-bottom 6px
</style>

<script>
export default{
  data () {
    return {
      isActiveFlag: true,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0, // 奖金池奖励明细列表总页数
      bonusTotalPage: 0, // 分红池奖励明细列表总页数
      currentPage: 1, // 默认当前页为1
      getBonusList: [], // 获取奖金池奖励明细列表
      getRewardList: [], // 获取分红池奖励明细列表
      rewardType: 3, // 默认调用奖金池奖励列表
      recordList: [] // 奖金池奖励列表
    }
  },
  created () {
    this._getBonusRewardList(1)
    this._getPoolRewardList(1)
    setInterval(() => {
      //  this.getHeight()
    }, 2000)
  },
  mounted () {
    this.$nextTick(() => {
      // this.getHeight()
    })
  },
  methods: {
    goAnchor (selector) { // 跳转到相应的锚点
      let anchor = this.$el.querySelector(selector)
      document.documentElement.scrollTop = anchor.offsetTop - 120
      document.body.scrollTop = anchor.offsetTop - 120
    },
    tabToggle () { // 切换到奖金池按钮
      if (!this.isActiveFlag && this.rewardType === 1) {
        this.rewardType = 3 // 为3时调用奖金池奖励列表
        this.isActiveFlag = true
        this._getPoolRewardList(1)
        this.$refs.turnPage.resetPage(1)
      }
    },
    toggle () { // 切换到分红池按钮
      if (this.isActiveFlag && this.rewardType === 3) {
        this.rewardType = 1 // 为1时调用分红池奖励列表
        this.isActiveFlag = !this.isActiveFlag
        this._getBonusRewardList(1)
        this.$refs.turnPage.resetPage(1)
      }
    },
    bonusTurnPage (page) { // 翻页
      this.currentPage = page
      this._getPoolRewardList(page)
    },
    rewardTurnPage (page) { // 翻页
      this.currentPage = page
      this._getBonusRewardList(page)
    },
    _getBonusRewardList (page) { // 分红池奖励明细
      this.$http.post(`${this.$api}/lottoReward/getRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.pastRecordId}&rewardType=1`).then((res) => {
        if (res.data.success === true) {
          this.getRewardList = res.data.data.recordList
          console.log(this.getRewardList)
          this.bonusTotalPage = res.data.data.totalPage
        }
      })
    },
    _getPoolRewardList (page) { // 奖金池奖励明细
      this.$http.post(`${this.$api}/lottoReward/getRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.pastRecordId}&rewardType=3`).then((res) => {
        this.getBonusList = res.data.data.recordList
        this.totalPage = res.data.data.totalPage
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  }
}
</script>
