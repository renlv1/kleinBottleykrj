<template>
  <div class="pastRecord">
    <div class="past-web">
      <div class="past-router linWrap">
        <div class="past-title">
          <router-link to="/serialEat" class="eat-bread">{{$t('pastRecord.text1')}}</router-link>
          <span class="separated"> > </span>
          <span class="before-activity">{{$t('daShang.text11')}}</span>
        </div>
      </div>
      <div class="mian-body">
        <div class="share-wrapper">
          <div class="share-text">{{$t('daShang.text11')}}</div>
          <div class="choose-btn">
            <span @click="chooseTab(1)" class="distributed isClick" :class="{active: isActive}">{{$t('serialEat.text49')}}</span>
            <span @click="chooseTab(2)" class="completed isClick" :class="{active: !isActive}">{{$t('serialEat.text50')}}</span>
          </div>
        </div>
        <div class="table-container">
          <div class="flex-betwen">
            <div class="table-title"><i></i>{{$t('daShang.text12')}}</div>
            <div class="right">
              <div class="item">
                <div class="icon-my"></div>
                <span>{{$t('daShang.text13')}}</span>
              </div>
              <div class="item">
                <div class="icon-current"></div>
                <span>{{$t('daShang.text14')}}</span>
              </div>
            </div>
          </div>
          <div class="table-name">
            <ul>
              <li>{{$t('daShang.text16')}}</li>
              <li>{{$t('daShang.text17')}}</li>
              <li>{{$t('daShang.text18')}}</li>
              <li>{{$t('daShang.text22')}}</li>
              <li>{{$t('daShang.text19')}}</li>
            </ul>
          </div>
          <div class="table-value">
            <ul>
              <!-- 通过路由传递期数，分红池金额，奖金池金额 -->
              <li v-for="item in historyRoundList" :key="item.index">
                <span :class="{'myindex': item.userAddress === userInfo.address, 'currentIndex': item.id === rewardId}">{{item.id}}</span>
                <span>{{item.userName}}</span>
                <span>{{item.playAmount | fourNumber}}{{item.playCurrency}}</span>
                <span>{{item.awardSum | fourNumber}}{{item.playCurrency}}/{{item.awardAmount | fourNumber}}{{item.playCurrency}}</span>
                <span>{{faStatus(item.awardState)}}</span>
              </li>
            </ul>
          </div>
          <div class="error" v-if="historyRoundList.length === 0">
            {{$t('orderManage.text8')}}
          </div>
        </div>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage1"></v-turnPage>
      </div>
    </div>
    <div class="container-mobile">
      <div class="head-mobile">
        <div class="back-mobile" @click="$router.push('/serialEat')"></div>
        <div class="title-mobile">{{$t('daShang.text11')}}</div>
      </div>
      <div class="switch">
        <span @click="chooseTab(1)" class="distributed isClick" :class="{active: isActive}">{{$t('serialEat.text49')}}</span>
        <span @click="chooseTab(2)" class="completed isClick" :class="{active: !isActive}">{{$t('serialEat.text50')}}</span>
      </div>
      <div class="table-mobile">
        <div class="table-label">
          <div class="item">
            <div class="icon-my"></div>
            <span>{{$t('daShang.text13')}}</span>
          </div>
          <div class="item">
            <div class="icon-current"></div>
            <span>{{$t('daShang.text14')}}</span>
          </div>
        </div>
        <ul>
          <li v-for="item in historyRoundList" :key="item.index" class="font-size-style">
            <div class="flex-betwent">
              <div :class="{'currentIndex': item.id === rewardId}">{{$t('daShang.text16')}}： <span :class="{'red-text': item.userAddress === userInfo.address}">{{item.id}}</span></div>
              <div>{{faStatus(item.awardState)}}</div>
            </div>
            <div class="flex-betwent flex-betwent-two">
              <div>{{item.userName}}</div>
              <div>{{$t('daShang.text18')}}:{{item.playAmount | fourNumber}}{{item.playCurrency}}</div>
            </div>
            <div>{{$t('daShang.text22')}}:</div>
            <div>{{item.awardSum | fourNumber}}{{item.playCurrency}}/{{item.awardAmount | fourNumber}}{{item.playCurrency}}</div>
          </li>
        </ul>
      </div>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage2"></v-turnPage>
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
    min-height calc(100vh - 252px)
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
      // align-items center
      .share-wrapper
        margin 70px auto 0
        width 56%
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        padding-bottom 50px
        border-bottom 1px dotted #ccc
        .share-text
          font-size 24px
          letter-spacing 3px
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
      .choose-btn
        border 1px solid #FC534C
        border-radius 4px
        color #FC534C
        .distributed
          display inline-block
          height 40px
          padding 10px 15px
        .completed
          display inline-block
          height 40px
          padding 10px 15px
        .active
          background #FC534C
          color #fff
      .table-container
        margin 50px auto 0
        width 56%
        .flex-betwen
          display flex
          align-items center
          justify-content space-between
          background-color: #edeff1
          .right
            display flex
            align-items center
            padding-right: 50px
            .item
              display flex
              align-items center
              .icon-my
                width: 12px
                height: 12px
                margin-right: 10px
                background-color: #FC534C
              .icon-current
                width: 10px
                height: 14px
                margin: 0 10px 0 50px
                background: url("../../assets/images/sieMoney/place.png") no-repeat center
        .table-title
          height 64px
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
              user-select none
              &:active
                opacity 0.6
              span
                flex 1
              .change-color
                color #FC534C
              &:nth-of-type(odd)
                background #edeff1
              .myindex
                color #FC534C
              .currentIndex
                display flex
                align-items center
                justify-content center
                margin-left: -11px
                &::before
                  content ''
                  display block
                  width: 10px
                  height: 14px
                  margin-right: 10px
                  background: url("../../assets/images/sieMoney/place.png") no-repeat center
  .container-mobile
    .switch
      border 1px solid #FC534C
      margin-top 70px
      width 100%
      display flex
      justify-content space-between
      .distributed
        display inline-block
        height 40px
        width 50%
        line-height 40px
        text-align center
      .completed
        display inline-block
        height 40px
        width 50%
        line-height 40px
        text-align center
      .active
        background #FC534C
        color #fff
    .table-mobile
      margin-top 30px
      margin-bottom: 20px
      .font-size-style
        display block
        &:nth-child(even)
          background-color: #edeff1;
        &:nth-child(odd)
          background-color: #fafafa;
      .flex-betwent-two
        margin: 10px 0
      .flex-betwent
        display flex
        align-items center
        justify-content space-between
        line-height: 1.5
        .currentIndex
          display flex
          align-items center
          &::before
            content ''
            display block
            width: 10px
            height: 14px
            margin-right: 10px
            background: url("../../assets/images/sieMoney/place.png") no-repeat center
        .red-text
          color #FC534C
          font-size: 14px
      .table-label
        padding-left: 15px
        display flex
        height: 68px
        background-color: #edeff1
      .item
        display flex
        align-items center
        .icon-my
          width: 12px
          height: 12px
          margin-right: 10px
          background-color: #FC534C
        .icon-current
          width: 10px
          height: 14px
          margin: 0 10px 0 30px
          background: url("../../assets/images/sieMoney/place.png") no-repeat center
</style>

<script>
import {mapGetters} from 'vuex'
export default{
  data () {
    return {
      isActive: true,
      type: 1,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      rewardId: '',
      currentPage: 1, // 默认当前页为1
      historyRoundList: [] // 往期活动列表
    }
  },
  mounted () {
    setTimeout(() => {
      this._getHistoryRoundList(window.localStorage.getItem('rewardPage'))
    }, 30)
  },
  methods: {
    chooseTab (num) {
      if (num === 1) {
        if (this.isActive === false) {
          this.isActive = !this.isActive
          this.type = 1 //
          this._getHistoryRoundList(window.localStorage.getItem('rewardPage'))
        }
      } else if (num === 2) {
        this.$refs.turnPage1.resetPage(1)
        this.$refs.turnPage2.resetPage(1)
        if (this.isActive === false) {
          this.isActive = true
        } else {
          this.isActive = !this.isActive
        }
        this.type = 2
        this._getHistoryRoundList(1)
      }
    },
    jumpPage () {
    },
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this._getHistoryRoundList(page)
    },
    _getHistoryRoundList (page) {
      this.$http.post(`${this.$api}/lottoReward/getAwardList?pageIndex=${page}&pageSize=${this.pageSize}&type=${this.type}`).then((res) => {
        if (res.data.success === true) {
          this.rewardId = res.data.data.rewardId
          this.historyRoundList = res.data.data.awardList
          this.totalPage = res.data.data.totalPage
        }
      })
    },
    faStatus (type) {
      if (type === 0) {
        return this.$t('daShang.text20')
      }
      if (type === 1) {
        return this.$t('daShang.text21')
      }
      if (type === 2) {
        return this.$t('daShang.text23')
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    vTurnPage: resolve => require(['../../components/newTurnPage.vue'], resolve)
  }
}
</script>
