<template>
  <div class="pastRecord">
    <div class="past-web">
      <div class="past-router linWrap">
        <div class="past-title">
          <router-link to="/serialEat" class="eat-bread">{{$t('pastRecord.text1')}}</router-link>
          <span class="separated"> > </span>
          <span class="before-activity">{{$t('futureBonus.text2')}}</span>
        </div>
      </div>
      <div class="mian-body">
        <div class="share-wrapper">
          <div class="share-text">{{$t('futureBonus.text2')}}</div>
        </div>
        <div class="table-container">
          <div class="table-name">
            <i></i>
            <p style="margin-left: 30px; letter-spacing: 2px">{{$t('futureBonus.text3')}}</p>
          </div>
          <div class="table-name">
            <ul style="background: #fbfbfb">
              <li>{{$t('futureBonus.text4')}}</li>
              <li>{{$t('futureBonus.text5')}}</li>
              <li>{{$t('futureBonus.text6')}}</li>
            </ul>
          </div>
          <div class="loading" style="margin-top: 10px" v-loading.lock="fullscreenLoading"></div>
          <div class="table-value">
            <ul>
              <!-- 通过路由传递期数，分红池金额，奖金池金额 -->
              <li v-for="item in historyRoundList" :key="item.index">
                <span>{{$changeDate(item.startDate, '/')}} - {{$changeDate(item.endDate, '/', 6)}}</span>
                <span>{{item.rewardAmount.toFixed(4)}} USD</span>
                <span>{{item.remainAmount | formattingMoney}} USD</span>
              </li>
            </ul>
          </div>
          <div class="error" v-show="noData">
            {{$t('orderManage.text8')}}
          </div>
        </div>
      </div>
    </div>
    <div class="container-mobile">
      <div class="head-mobile">
        <div class="back-mobile" @click="$router.push('/serialEat')"></div>
        <div class="title-mobile">{{$t('futureBonus.text2')}}</div>
      </div>
      <div class="my-table-mobile">
        <div class="loading" style="margin-top: 90px" v-loading.lock="fullscreenLoading"></div>
        <ul>
          <li v-for="item in historyRoundList" :key="item.index">
            <div class="item-top">
              <span>{{$t('futureBonus.text4')}}</span>
              <span style="color: #FC534C; font-weight: bold">{{$changeDate(item.startDate, '/')}} - {{$changeDate(item.endDate, '/', 6)}}</span>
            </div>
            <div class="item-bottom">
              <div class="child-item">
                <span>{{$t('futureBonus.text7')}}</span>
                <span>{{item.rewardAmount.toFixed(4)}} USD</span>
              </div>
              <div class="child-item">
                <span>{{$t('futureBonus.text6')}}</span>
                <span>{{item.remainAmount | formattingMoney}} USD</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="error" v-show="noData">
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
      min-height 100vh
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
            // background #edeff1
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
    .my-table-mobile
      margin-top 70px
      font-size 12px
      ul
        li
          display flex
          flex-direction column
          margin-bottom 15px
          .item-top
            padding 10px
            width 100%
            display flex
            flex-direction row
            justify-content space-between
            background #edeff1
          .item-bottom
            width 100%
            padding 10px
            display flex
            flex-direction column
            background #fafafa
            .child-item
              margin 5px 0
              width 100%
              display flex
              flex-direction row
              justify-content space-between
</style>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        fullscreenLoading: true, // 默认加载
        historyRoundList: [], // 往期活动列表
        noData: false
      }
    },
    computed: {
      ...mapGetters([
        'userInfo' // 用户信息
      ])
    },
    created() {
      this._getHistoryRoundList()
    },
    methods: {
      _getHistoryRoundList() {
        this.$http.post(`${this.$api}/lottoReward/getNextTimeBonus?roundId=${this.$route.query.roundId}`).then((res) => {
          if (res.data.success === true) {
            if (res.data.data.list.length > 0) {
              this.fullscreenLoading = false
              this.historyRoundList = res.data.data.list
            } else {
              this.noData = true
            }
          }
        })
      }
    }
  }
</script>
