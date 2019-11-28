<template>
  <div class="pastRecord">
    <div class="past-web">
      <div class="past-router linWrap">
        <div class="past-title">
          <router-link to="/serialEat" class="eat-bread">{{$t('pastRecord.text1')}}</router-link>
          <span class="separated"> > </span>
          <span class="before-activity">{{$t('orderDetail.text13')}}</span>
        </div>
      </div>
      <div class="mian-body">
        <div class="share-wrapper">
          <div class="share-text">{{$t('orderDetail.text14')}}</div>
          <div style="margin-top: 30px; color: #032e43; font-size: 18px" class="">{{$t('orderDetail.text15')}}</div>
        </div>
        <div class="table-container">
          <div class="place-wrapper" style="margin-bottom: 30px; display: flex; flex-direction: row; justify-content: left">
            <div class="place" style="display:flex; align-items: center"><i style="display: inline-block; height: 5px; width: 15px; background: #FC534C; margin-right: 8px"></i> {{$t('orderDetail.text16')}}</div>
            <div class="place" style="margin-left:30px; display:flex; align-items: center"><i style="display: inline-block; height: 5px; width: 15px; background: #181818; margin-right: 8px"></i> {{$t('orderDetail.text17')}}</div>
          </div>
          <div class="table-name">
            <i></i>
            <ul>
              <li>{{$t('orderDetail.text18')}}</li>
              <li>{{$t('orderDetail.text19')}}</li>
              <li>{{$t('orderDetail.text20')}}</li>
              <li>{{$t('orderDetail.text21')}}</li>
            </ul>
          </div>
          <div class="table-value">
            <ul>
              <!-- 通过路由传递期数，分红池金额，奖金池金额 -->
              <li :class="{red: item.userAddress === userInfo.address}" v-for="item in historyRoundList" :key="item.index">
                <span>{{item.playerIndex}}</span>
                <span>{{item.userName}}</span>
                <span>{{item.playAmount | formattingMoney}} USD</span>
                <span>{{$changeDate(item.payAt, '/')}}</span>
              </li>
            </ul>
          </div>
          <div class="error" v-if="historyRoundList && historyRoundList.length === 0">
            {{$t('orderManage.text8')}}
          </div>
        </div>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
      </div>
    </div>
    <div class="container-mobile">
      <div class="head-mobile">
        <div class="back-mobile" @click="$router.push('/serialEat')"></div>
        <div class="title-mobile">{{$t('orderDetail.text22')}}</div>
      </div>
      <div style="margin-top: 70px; font-weight: bold; font-size: 19px; color: #181818" class="">{{$t('orderDetail.text14')}}</div>
      <div style="margin-top: 15px; font-size: 12px; color: #181818" class="">{{$t('orderDetail.text15')}}</div>
      <div class="place-wrapper" style="margin-top: 30px; display: flex; flex-direction: row; justify-content: left">
        <div class="place" style="display:flex; align-items: center"><i style="display: inline-block; height: 5px; width: 15px; background: #FC534C; margin-right: 8px"></i> {{$t('orderDetail.text16')}}</div>
        <div class="place" style="margin-left:30px; display:flex; align-items: center"><i style="display: inline-block; height: 5px; width: 15px; background: #181818; margin-right: 8px"></i> {{$t('orderDetail.text17')}}</div>
      </div>
      <div class="table-mobile">
        <ul>
          <li :class="{red: item.userAddress === userInfo.address}" v-for="item in historyRoundList" :key="item.index" class="font-size-style">
            <div class="table-left">
              <div class="table-text">
                <span>{{item.userName}}</span>
              </div>
              <div class="table-count">
                <span>{{$t('orderDetail.text24')}}：{{item.playerIndex}}</span>
              </div>
            </div>
            <div class="table-right">
              <div class="table-text">
              <span>{{$changeDate(item.payAt, '/')}}</span>
            </div>
              <div class="table-count">
                <span>{{$t('orderDetail.text23')}}：</span><span>{{item.playAmount | formattingMoney}} USD</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
      <div class="error" v-if="historyRoundList && historyRoundList.length === 0">
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
        .table-name
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
            background-color #032e43
          ul
            display flex
            flex-direction row
            width 100%
            font-family "Microsoft YaHei UI Light"
            font-size 14px
            color #181818
            background #edeff1
            li
              text-align center
              flex 1
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
              padding-left 10px
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
              &:nth-of-type(even)
                background #edeff1
  .container-mobile
    .table-mobile
      margin-top 40px
</style>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
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
      this.$http.post(`${this.$api}/lottoReward/getEndRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}`).then((res) => {
        if (res.data.success === true) {
          this.historyRoundList = res.data.data.endRewardPlayerList.splice((page - 1) * this.pageSize, this.pageSize)
          let totalRecord = res.data.data.totalRecord
          // console.log(totalRecord)
          this.totalPage = Math.ceil(totalRecord / this.pageSize)
        }
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  }
}
</script>
