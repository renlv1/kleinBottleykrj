<template>
    <div class="invitedRecord">
      <div class="pc">
        <div class="pc-content">
          <div class="content-title">{{$t('invitedRecord.text1')}}：</div>
          <div class="title-money">{{$fourNumber2(totalAchievement)}} <span style="color: #dbe3ea">SIE</span></div>
          <div class="dashed-line"></div>
          <table class="invitedTable">
            <thead>
            <tr>
              <td>{{$t('invitedRecord.text2')}}</td>
              <td>{{$t('invitedRecord.text3')}}</td>
              <td>{{$t('invitedRecord.text4')}}</td>
            </tr>
            </thead>
            <tbody >
            <tr v-for="(item,index) in tradeAchievementList" :key="index">
              <td class="first-td">
                <div class="username-box">
                  <div class="touxiang"><img :src="item.headImg"></div>
                  <div class="username">
                    <div class="nickname">{{item.nickName}}</div>
                    <div class="mingzi">{{item.userName}}</div>
                  </div>
                </div>
              </td>
              <td>{{item.buySieAchievement | fourNumber}} SIE</td>
              <td>{{item.buyKleinTradeAchievement | fourNumber}} USD</td>
            </tr>
            </tbody>
            <div v-if="tradeAchievementList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
            <v-turnPage v-if="tradeAchievementList.length !== 0"  :propsPage="transferTotal" @transferTrun="transferTurnPage"></v-turnPage>
          </table>
        </div>
      </div>
      <div class="transferRecord">
        <div class="mobile">
          <div class="management-head">
            <div class="head">
              <div class="back" @click="$router.go(-1)"></div>
              <div class="title">{{$t('invitedRecord.text5')}}</div>
              <div class="right"></div>
            </div>
          </div>
          <div class="mobile-content">
            <ul class="mobile-tab">
              <li :class="{tabActive: orderTab === 1}" @click="chibiBtn()">{{$t('invitedRecord.text3')}}</li>
              <li :class="{tabActive: orderTab === 2}" @click="totalBtn()">{{$t('invitedRecord.text4')}}</li>
            </ul>
            <div class="order-progress">
              <h6>{{$t('invitedRecord.text6')}}</h6>
              <p> {{$fourNumber2(totalAchievement)}} SIE</p>
            </div>
            <div class="dashed-line"></div>
            <div class="mobile-box">
              <table class="invitedTable" v-if="orderTab === 1">
                <tbody >
                <tr v-for="(item,index) in tradeAchievementList" :key="index">
                  <td class="first-td">
                    <div class="username-box">
                      <div class="touxiang"><img :src="item.headImg"></div>
                      <div class="username">
                        <div class="nickname">{{item.nickName}}</div>
                        <div class="mingzi">{{item.userName}}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{item.buySieAchievement | fourNumber}} SIE</td>
                </tr>
                </tbody>
                <div v-if="tradeAchievementList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
                <v-turnPage v-if="tradeAchievementList.length !== 0" :propsPage="withdrawTotal" @withdrawTrun="withdrawTurnPage" ref="turnPage"></v-turnPage>
              </table>
              <table class="invitedTable" v-if="orderTab === 2">
                <tbody >
                <tr v-for="(item,index) in tradeAchievementList" :key="index">
                  <td class="first-td">
                    <div class="username-box">
                      <div class="touxiang"><img :src="item.headImg"></div>
                      <div class="username">
                        <div class="nickname">{{item.nickName}}</div>
                        <div class="mingzi">{{item.userName}}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{item.buyKleinTradeAchievement | fourNumber}} USD</td>
                </tr>
                </tbody>
                <div v-if="tradeAchievementList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
                <v-turnPage v-if="tradeAchievementList.length !== 0" :propsPage="finishedTotal" @finishedTrun1="finishedTurnPage" ref="turnPage"></v-turnPage>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tradeAchievementList: [], // 业绩列表
      totalAchievement: '',
      orderTab: 1, // 1持币业绩 2总业绩
      transferTotal: 1,
      transferPage: '',
      pageSize: 10,
      withdrawNowPage: '',
      finishedNowPage: '',
      finishedTotal: 1,
      withdrawTotal: 1
    }
  },
  created () {
    this.getTradeAchievementList(1)
  },
  methods: {
    getTradeAchievementList (page) {
      let url = `${this.$api}/user/getTradeAchievement?pageSize=${this.pageSize}&page=${page}`
      this.$http.get(url).then(res => {
        this.tradeAchievementList = res.data.data.teamAchievement
        this.totalAchievement = res.data.data.totalAchievement
        this.transferTotal = res.data.data.totalPage
        this.withdrawTotal = res.data.data.totalPage
        this.finishedTotal = res.data.data.totalPage
      })
    },
    chibiBtn () {
      this.orderTab = 1
      this.getTradeAchievementList(1)
      if (this.orderTab === 1) {
        if (this.$refs.turnPage) {
          this.$refs.turnPage.resetPage(1)
        }
      }
    },
    totalBtn () {
      this.orderTab = 2
      this.getTradeAchievementList(1)
      if (this.orderTab === 2) {
        if (this.$refs.turnPage) {
          this.$refs.turnPage.resetPage(1)
        }
      }
    },
    transferTurnPage (page) {
      this.transferPage = page
      this.getTradeAchievementList(page)
    },
    withdrawTurnPage (page) {
      this.withdrawNowPage = page
      this.getTradeAchievementList(page)
    },
    finishedTurnPage (page) {
      this.finishedNowPage = page
      this.getTradeAchievementList(page)
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.invitedRecord
  .pc-content
    margin 130px 50px 0 92px
    max-width 1070px
    .content-title
      font-size 18px
      color #181818
      font-weight bold
      margin-bottom 30px
    .title-money
      font-size 38px
      color #181818
      font-weight bold
    .dashed-line
      height 1px
      width 100%
      background-image: url("../../../assets/images/aiChat/dottedLine.png");
      margin-top 60px
      margin-bottom 60px
    .invitedTable
      width 100%
      thead
        display block
        tr
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 84px;
          width: 100%;
          background-color: #edeff1;
          font-size: 16px;
          color #181818
          td
            flex 1
            text-align: center;
      tbody
        width: 100%;
        display: block;
        tr
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 94px;
          width: 100%;
          background-color: #edeff1;
          font-size: 16px;
          color #181818
          &:nth-child(odd)
            background-color: #fbfbfb;
          &:nth-child(even)
            background-color: #edeff1;
          td
            flex 1
            text-align: center;
            &.first-td
              .username-box
                display flex
                justify-content center
                .touxiang
                  width 50px
                  height 50px
                  margin-right 20px
                  img
                    width 100%
                    height 100%
                .username
                  text-align left
                  .nickname
                    margin-bottom 14px
                    font-size: 16px;
                    color #181818
                  .mingzi
                    font-size: 14px;
                    color #999
  .mobile-content
    padding 0 10px
    .mobile-tab
      margin-top 20px
      margin-bottom 20px
      display flex
      width 100%
      li
        flex 1
        height 40px
        line-height 38px
        text-align center
        border 1px solid #032e43
        color #181818
        font-size 16px
        border-radius 4px
        &:first-child
          border-bottom-right-radius 0
          border-top-right-radius 0
        &:last-child
          border-bottom-left-radius 0
          border-top-left-radius 0
        &.tabActive
          background-color #032e43
          color #fff
    .order-progress
      h6
        font-size 14px
        color #181818
        margin-bottom 10px
      p
        font-size 18px
    .dashed-line
      height 1px
      width 100%
      background-image: url("../../../assets/images/aiChat/dottedLine.png");
      margin-top 30px
    .invitedTable
      width 100%
      margin-top 30px
      thead
        display block
        tr
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          width: 100%;
          background-color: #edeff1;
          font-size: 16px;
          color #181818
          td
            flex 1
            text-align: center;
      tbody
        width: 100%;
        display: block;
        tr
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          width: 100%;
          background-color: #edeff1;
          font-size: 14px;
          color #181818
          padding 0 10px
          &:nth-child(odd)
            background-color: #edeff1;
          &:nth-child(even)
            background-color: #fbfbfb;
          td
            text-align: center;
            &.first-td
              .username-box
                display flex
                align-items: center;
                justify-content center
                .touxiang
                  width 40px
                  height 40px
                  margin-right 10px
                  img
                    width 100%
                    height 100%
                .username
                  text-align left
                  .nickname
                    font-size: 16px;
                    color #181818
                  .mingzi
                    font-size: 14px;
                    color #999
</style>
