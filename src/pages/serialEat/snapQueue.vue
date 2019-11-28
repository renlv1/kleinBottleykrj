<template>
  <div class="pastRecord">
    <div class="past-web">
      <div class="past-router linWrap">
        <div class="past-title">
          <router-link to="/serialEat" class="eat-bread">{{$t('pastRecord.text1')}}</router-link>
          <span class="separated"> > </span>
          <span class="before-activity">{{$t('snapQueue.text1')}}</span>
        </div>
      </div>
      <div class="mian-body">
        <div class="share-wrapper">
          <div class="share-text">{{$t('snapQueue.text1')}}</div>
          <div class="tips-wrapper">
            <div class="tips-left active-text">{{$t('snapQueue.text3')}}</div>
            <div class="tips-right" style="display: flex; flex-direction: row; align-items: center">
              <span style="display: inline-block; width: 20px; height: 5px; background-color: #fc534c; margin-right: 10px"></span>
              <span>{{$t('snapQueue.text4')}}</span>
            </div>
          </div>
        </div>
        <div class="table-container">
          <div class="flex-betwen">
            <div class="table-title"><i></i>{{$t('snapQueue.text5')}}</div>
          </div>
          <div class="table-name">
            <ul>
              <li>{{$t('snapQueue.text6')}}</li>
              <li>{{$t('snapQueue.text7')}}</li>
              <li>{{$t('snapQueue.text8')}}</li>
              <li>{{$t('snapQueue.text13')}}</li>
            </ul>
          </div>
          <div class="loading" style="margin-top: 30px" v-loading.lock="fullscreenLoading"></div>
          <div class="table-value">
            <ul>
              <li v-for="item in awardList" :key="item.index" :class="{'isActive': item.userAddress === address}">
                <span>{{item.id}}</span>
                <span>{{item.userName}}</span>
                <span>{{$changeDate(item.createAt, '/')}}</span>
                <span>{{item.playAmount | fourNumber}}</span>
              </li>
            </ul>
          </div>
          <div class="error" v-if="noData">
            {{$t('orderManage.text8')}}
          </div>
        </div>
        <!--<v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage1"></v-turnPage>-->
      </div>
    </div>
    <div class="container-mobile">
      <div class="head-mobile">
        <div class="back-mobile" @click="$router.push('/serialEat')"></div>
        <div class="title-mobile">{{$t('snapQueue.text9')}}</div>
      </div>
      <div class="table-mobile">
        <div class="table-label active-text">{{$t('snapQueue.text3')}}</div>
        <ul>
          <li v-for="item in awardList" :key="item.index" class="font-size-style">
            <div class="flex-betwent">
              <div><span>{{$t('snapQueue.text6')}}：</span><span>{{item.id}}</span></div>
              <div>{{$changeDate(item.createAt, '/')}}</div>
            </div>
            <div class="flex-betwent flex-betwent-two">
              <div><span>{{$t('snapQueue.text7')}}：</span><span :class="{'isActive': item.userAddress === address}">{{item.userName}}</span></div>
              <div><span>{{$t('snapQueue.text13')}}：</span><span>{{item.playAmount | fourNumber}}</span></div>
            </div>
          </li>
        </ul>
      </div>
      <!--<v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage2"></v-turnPage>-->
      <div class="error" v-if="awardList.length === 0">
        {{$t('orderManage.text8')}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      fullscreenLoading: true,
      noData: false,
      address: window.localStorage.getItem('userAddress'),
      pageSize: 1000,
      awardList: [],
      totalPage: '',
      myJoinRecordId: '',
      myJoinRecordUser: '',
      myJoinRecordTime: '',
      isJoin: false // 判断最后一行标红是否显示
    }
  },
  created () {
    this.getHourUserList(1)
  },
  computed: {
    ...mapGetters([
      'userAddress'
    ])
  },
  methods: {
    getHourUserList (page) {
      this.$http.post(`${this.$api}/lottoReward/getHourUserList?pageIndex=${page}&pageSize=${this.pageSize}`).then((res) => {
        if (res.data.success === true) {
          this.fullscreenLoading = false
          if (res.data.data.userList.length === 0) {
            this.noData = true
          } else {
            this.awardList = res.data.data.userList
            this.totalPage = res.data.data.totalPage
          }
          if (res.data.data.myJoinRecord !== '') {
            this.myJoinRecord = res.data.data.myJoinRecord
            this.myJoinRecordId = this.myJoinRecord.id
            this.myJoinRecordUser = this.myJoinRecord.userName
            this.myJoinRecordTime = this.myJoinRecord.createAt
          }
          // for (let i = 0; i < this.awardList.length; i++) {
          //   if (this.awardList[i].userAddress === window.localStorage.getItem('userAddress')) {
          //     this.isJoin = false
          //   } else {
          //     this.isJoin = true
          //   }
          // }
          // this.awardList.forEach((item) => {
          //   if (item.userAddress === window.localStorage.getItem('userAddress')) {
          //     this.isJoin = false
          //   } else {
          //     this.isJoin = true
          //   }
          // })
          // this.drugeJoin()
        }
      })
    },
    // drugeJoin () {
    //   if (this.isJoin) {
    //     this.awardList.push(Object.assign({}, this.myJoinRecord))
    //     console.log(this.awardList.length)
    //   } else {
    //     return false
    //   }
    // },
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this.getHourUserList(page)
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/newTurnPage.vue'], resolve)
  }
}
</script>

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
        text-align center
        padding-bottom 50px
        border-bottom 1px dotted #ccc
        .share-text
          font-size 24px
          letter-spacing 3px
          color #181818
          margin-bottom 60px
        .tips-wrapper
          display flex
          flex-direction row
          justify-content space-between
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
              user-select none
              &.isActive
                color #FC534C
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
        &:nth-child(odd)
          background-color: #edeff1;
        &:nth-child(even)
          background-color: #fafafa;
      .flex-betwent-two
        margin: 10px 0
        div
          span
            &.isActive
              color #FC534C !important
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
        text-align left
        font-size 14px
        margin 80px 0 20px
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
