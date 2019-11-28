<template>
  <div>
    <div class="rewardDetail">
      <div class="pc">
        <table class="commonTableTitle">
          <thead>
          <h6><router-link class="highLight" to="/account/serialReward/">{{$t('serialRewardDetails.text1')}}</router-link><span> > </span> {{$t('serialRewardDetails.text2')}}</h6>
          </thead>
        </table>
        <div class="top-wrapper">
          <div class="top-title">{{$t('serialRewardDetails.text3')}} {{this.$route.query.roundName}} {{$t('serialRewardDetails.text4')}}</div>
          <div class="top-time">{{$changeDate(Number(this.$route.query.createAt), '/')}}</div>
          <div class="top-count">
            <span class="integer">{{sumAllArr[0]}}</span>
            <span class="dot">.</span>
            <span class="decimal">{{sumAllArr[1]}}</span>
            <span class="unit">USD</span>
          </div>
          <div class="pool">
            <div class="pool-left">
              <div class="pool-text">
                {{$t('serialRewardDetails.text5')}}:
              </div>
              <div class="pool-value">
                {{sumReward | formattingMoney}} <span>USD</span>
              </div>
            </div>
            <div class="segmentation"></div>
            <div class="pool-right">
              <div class="pool-text">
                {{$t('serialRewardDetails.text6')}}:
              </div>
              <div class="pool-value">
                {{sumBonus | formattingMoney}} <span>USD</span>
              </div>
            </div>
            <div class="segmentation"></div>
            <!-- 打赏-->
            <div class="pool-right">
              <div class="pool-text">{{$t('daShang.text6')}}:</div>
              <div class="pool-value">
                {{sumAward | formattingMoney}} <span>USD</span>
              </div>
            </div>
            <div class="segmentation"></div>
            <!-- 随机奖励金额-->
            <div class="pool-right">
              <div class="pool-text">{{$t('random.text1')}}:</div>
              <div class="pool-value">
                {{sumHour | formattingMoney}} <span>USD</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tab">
              <div class="btn" v-for="(item, index) in tabList" :key="index" :class="{'active': curTab === index}" @click="changeTab(index)">{{item.name}}</div>
        </div>
        <!--团队奖励-->
        <div v-if="curTab == 2">
          <table id="commonTableList" >
            <thead>
            <h6>{{$t('reward.text24')}}</h6>
            <tr>
              <td>{{$t('award.text3')}}</td>
              <td>{{$t('award.text4')}}</td>
              <td>{{$t('award.text5')}}</td>
              <td>{{$t('usdTixian.text32')}}</td>
              <td>{{$t('usdTixian.text33')}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in groupTotalList" :key="item.index" class="cursor">
              <td>{{item.userName}}</td>
              <td>{{item.groupTotal | formattingMoney}} {{item.totalCurrency}}</td>
              <td>{{$changeDate(item.updateAt, '/')}}</td>
              <td>{{item.usedDay}}/{{item.totalDay}}</td>
              <td>{{item.usedReward}}USD/{{item.allReward}}USD</td>
            </tr>
            </tbody>
            <div v-if="groupTotalList.length === 0" class="queryErr">
              {{$t('orderManage.text8')}}
            </div>
          </table >
          <v-turnPage ref="turnPage3" style="max-width: 1200px" :propsPage="groupTotalPage" @orderLogTrunPage="groupdListTurnPage"></v-turnPage>
        </div>
        <!--分红奖励-->
        <div v-if="curTab == 1">
          <table class="commonTableList">
            <thead>
            <h6>{{$t('serialRewardDetails.text12')}}</h6>
            <tr>
              <td>{{$t('serialRewardDetails.text13')}}</td>
              <td>{{$t('serialRewardDetails.text14')}}</td>
              <td>{{$t('serialRewardDetails.text15')}}</td>
              <td>{{$t('serialRewardDetails.text16')}}</td>
              <td>{{$t('serialRewardDetails.text17')}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in bonusList" :key="item.index" class="cursor">
              <td>{{item.playAmount | formattingMoney}} USD</td>
              <td>{{$changeDate(item.payAt, '/')}}</td>
              <td>{{item.rewardCount}}</td>
              <td>{{item.playerIndex}}</td>
              <td>{{item.bonusSum | formattingMoney}} USD</td>
            </tr>
            </tbody>
            <div v-if="bonusList.length === 0" class="queryErr">
              {{$t('orderManage.text8')}}
            </div>
          </table>
          <v-turnPage ref="turnPage1" style="max-width: 1200px" :propsPage="bonusTotalPage" @orderLogTrunPage="bonusListTurnPage"></v-turnPage>
        </div>
        <!--奖金池奖励明细-->
        <div v-if="curTab == 0">
          <table class="commonTableList">
            <thead>
            <h6>{{$t('award.text8')}}</h6>
            <tr>
              <td>{{$t('award.text9')}}</td>
              <td>{{$t('award.text13')}}</td>
              <td>{{$t('award.text10')}}</td>
              <td>{{$t('award.text11')}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in rewardList" :key="item.index" class="cursor">
              <td>{{item.rewardIndex}}</td>
              <td>{{item.joinAmount | formattingMoney}}</td>
              <td>{{$changeDate(item.joinAt)}}</td>
              <td>{{item.rewardAmount | formattingMoney}}</td>
            </tr>
            </tbody>
            <div v-if="rewardList.length === 0" class="queryErr">
              {{$t('orderManage.text8')}}
            </div>
          </table>
          <v-turnPage ref="turnPage2" style="max-width: 1200px" :propsPage="rewardTotalPage" @orderLogTrunPage="rewardListTurnPage"></v-turnPage>
        </div>
        <!--打赏奖励明细-->
        <div v-if="curTab === 3">
          <table class="commonTableList">
            <thead>
            <h6>{{$t('daShang.text1')}}</h6>
            <tr>
              <td>{{$t('daShang.text2')}}</td>
              <td>{{$t('daShang.text3')}}</td>
              <td>{{$t('daShang.text4')}}</td>
              <td>{{$t('daShang.text5')}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in awardList" :key="item.index" class="cursor">
              <td>{{item.id}}</td>
              <td>{{item.playAmount | formattingMoney}}USD</td>
              <td>{{item.awardSum | formattingMoney}}USD</td>
              <td>{{item.awardAmount | formattingMoney}}USD</td>
            </tr>
            </tbody>
            <div v-if="awardList.length === 0" class="queryErr">
              {{$t('orderManage.text8')}}
            </div>
          </table>
          <v-turnPage ref="turnPage4" style="max-width: 1200px" :propsPage="awardListTotalPage" @orderLogTrunPage="awardListTurnPage"></v-turnPage>
        </div>
        <!--随机奖励-->
        <div v-if="curTab === 4">
          <table class="commonTableList">
            <thead>
            <h6>{{$t('random.text2')}}</h6>
            <tr>
              <td>{{$t('daShang.text2')}}</td>
              <td>{{$t('daShang.text3')}}</td>
              <td>{{$t('random.text3')}}</td>
              <td>{{$t('random.text4')}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in randomList" :key="item.index" class="cursor">
              <td>{{item.id}}</td>
              <td>{{item.joinAmount | formattingMoney}}USD</td>
              <td>{{$changeDate(item.createAt)}}</td>
              <td>{{item.rewardAmount | formattingMoney}}USD</td>
            </tr>
            </tbody>
            <div v-if="randomList.length === 0" class="queryErr">
              {{$t('orderManage.text8')}}
            </div>
          </table>
          <v-turnPage ref="turnPage5" style="max-width: 1200px" :propsPage="randomListTotalPage" @orderLogTrunPage="randowListTurnPage"></v-turnPage>
        </div>
      </div>
      <div class="mobile">
        <div class="mobile-myAccount">
          <div class="myAccountHead up-box">
            <div class="Head-padding">
              <div class="left" @click="$router.push('/account/serialReward')"></div>
              <div class="center">{{$t('serialRewardDetails.text18')}}</div>
              <div class="right"></div>
            </div>
          </div>
          <div class="myAccountBody">
            <div class="body-title">{{$t('serialRewardDetails.text19')}} {{this.$route.query.roundName}} {{$t('serialRewardDetails.text20')}}</div>
            <div class="body-value">{{allBonusSum | formattingMoney}} USD</div>
            <div class="body-time">{{$changeDate(Number(this.$route.query.createAt), '/')}}</div>
            <div class="bg">
            </div>
          </div>
          <div class="statistical">
            <ul>
              <li style="margin-top: 30px" @click="toGroup">
                <div class="li-title">{{$t('award.text12')}}</div>
                <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </li>
              <div class="statistical-title">{{$t('serialRewardDetails.text21')}}</div>
              <li @click="toShare">
                <div class="value-wrapper">
                  <div class="li-title">{{$t('serialRewardDetails.text23')}}</div>
                  <div class="li-value">{{sumBonus | formattingMoney}} USD</div>
                </div>
                <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </li>
              <!-- 打赏-->
              <li @click="toDaShang">
                <div class="value-wrapper">
                  <div class="li-title">{{$t('daShang.text6')}}</div>
                  <div class="li-value">{{sumAward | formattingMoney}} USD</div>
                </div>
                <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </li>
              <li @click="toPools">
                <div class="value-wrapper">
                  <div class="li-title">{{$t('serialRewardDetails.text22')}}</div>
                  <div class="li-value">{{sumReward | formattingMoney}} USD</div>
                </div>
                <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </li>
              <!--随机奖励-->
              <li @click="toRandom">
                <div class="value-wrapper">
                  <div class="li-title">{{$t('random.text1')}}</div>
                  <div class="li-value">{{sumHour | formattingMoney}} USD</div>
                </div>
                <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      curTab: 0,
      pageIndex: 1,
      pageSize: 10,
      currentPage: 1, // 默认当前页为1
      rewardPlayerList: [], // 连环吃饼奖励详情
      sumAllArr: '', // 用.分割的奖励总金额
      sumReward: '', // 奖金池奖励金额
      sumHour: '', // 随机奖励
      sumBonus: '', // 分红池奖励金额
      rewardList: [], // 奖金池奖励明细列表
      rewardTotalPage: 0,
      bonusList: [], // 分红奖励明细列表
      bonusTotalPage: 0,
      awardListTotalPage: 0,
      randomListTotalPage: 0,
      tabList: [
        {name: this.$t('pools.text1')},
        {name: this.$t('shareBonusDetail.text10')},
        {name: this.$t('reward.text24')},
        {name: this.$t('daShang.text7')},
        {name: this.$t('random.text8')}
      ],
      sumAward: '', // 打赏金额
      awardList: [], // 打赏列表
      groupTotalList: [], // 团队奖励明细
      groupTotalPage: '',
      allBonusSum: '',
      randomList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userAddress'
    ])
  },
  mounted () {
    this._shareRewardDetail(1)
  },
  created () {
    this._getMyRewardDetail(1)
    this._bonusRewardDetail(1)
  },
  methods: {
    rewardListTurnPage (page) { // 奖金池奖励明细翻页
      this.currentPage = page
      this._bonusRewardDetail(page)
    },
    groupdListTurnPage (page) {
      this.currentPage = page
      this.getUserGroupTotal(page)
    },
    bonusListTurnPage (page) { // 分红奖励明细翻页
      this.currentPage = page
      this._shareRewardDetail(page)
    },
    awardListTurnPage (page) { // 打赏翻页
      this.currentPage = page
      this._getAwardList(page)
    },
    randowListTurnPage (page) {
      this.currentPage = page
      this.getRandomList(page)
    },
    // 随机奖励
    toRandom () {
      this.$router.push({path: './randomDetail',
        query: {
          userAddress: this.$route.query.userAddress,
          roundId: this.$route.query.roundId,
          roundName: this.$route.query.roundName,
          createAt: this.$route.query.createAt,
          bonusPoolSum: this.$route.query.bonusPoolSum,
          rewardPoolSum: this.$route.query.rewardPoolSum
        }
      })
    },
    toPools () { // 前往奖金池奖励金额页面
      this.$router.push({path: './pools',
        query: {
          userAddress: this.$route.query.userAddress,
          roundId: this.$route.query.roundId,
          roundName: this.$route.query.roundName,
          createAt: this.$route.query.createAt,
          bonusPoolSum: this.$route.query.bonusPoolSum,
          rewardPoolSum: this.$route.query.rewardPoolSum
        }
      })
    },
    toShare () { // 前往分红池奖励金额页面
      this.$router.push({path: './share',
        query: {
          roundName: this.$route.query.roundName,
          roundId: this.$route.query.roundId,
          createAt: this.$route.query.createAt,
          bonusPoolSum: this.$route.query.bonusPoolSum,
          rewardPoolSum: this.$route.query.rewardPoolSum
        }})
    },
    toDaShang () {
      this.$router.push({
        path: '/account/serialReward/daShangDetails',
        query: {
          roundId: this.$route.query.roundId,
          userAddress: this.$route.query.userAddress,
          roundName: this.$route.query.roundName,
          createAt: this.$route.query.createAt
        }
      })
    },
    toGroup () {
      this.$router.push({path: './isTeamReward',
        query: {
          roundId: this.$route.query.roundId,
          roundName: this.$route.query.roundName,
          createAt: this.$route.query.createAt,
          bonusPoolSum: this.$route.query.bonusPoolSum,
          rewardPoolSum: this.$route.query.rewardPoolSum
        }})
    },
    _getMyRewardDetail (page) {
      this.$http.post(`${this.$api}/lottoReward/getMyRewardDetail?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&rewardType=1`).then((res) => {
        if (res.data.success === true) {
          this.sumReward = res.data.data.sumReward
          this.sumBonus = res.data.data.sumBonus
          this.sumAward = res.data.data.sumAward
          this.sumHour = res.data.data.sumHour
          this.rewardPlayerList = res.data.data.rewardPlayerList
          this.sumAllArr = res.data.data.sumAll.toFixed(4).split('.')
          this.totalPage = res.data.data.totalPage
        }
      })
    },
    // 切换tab
    changeTab (index) {
      this.curTab = index
      if (index === 0) { // 分红奖励
        this._shareRewardDetail(1)
        if (this.$refs.turnPage1) {
          this.$refs.turnPage1.resetPage(1)
        }
      } else if (index === 1) { // 奖金池
        this._bonusRewardDetail(1)
        if (this.$refs.turnPage2) {
          this.$refs.turnPage2.resetPage(1)
        }
      } else if (index === 2) { // 团队奖励
        this.getUserGroupTotal(1)
      } else if (index === 3) { // 团队奖励
        this._getAwardList(1)
      } else if (index === 4) { // 随机奖励
        this.getRandomList(1)
      }
    },
    // 随机奖励
    getRandomList (page) {
      let url = `${this.$api}/lottoReward/getRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&rewardType=4&userAddress=${this.$route.query.userAddress}`
      this.$http.post(url).then(res => {
        if (res.data.success === true) {
          this.randomList = res.data.data.recordList
          this.randomListTotalPage = res.data.data.totalPage
          if (res.data.data.totalPage > 0) {
            if (this.$refs.turnPage5) {
              this.$refs.turnPage5.resetPage(page)
            }
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 打赏
    _getAwardList (page) {
      this.$http.post(`${this.$api}/lottoReward/getAwardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&userAddress=${this.$route.query.userAddress}`).then((res) => {
        if (res.data.success === true) {
          this.awardList = res.data.data.awardList
          this.awardListTotalPage = res.data.data.totalPage
          if (res.data.data.totalPage > 0) {
            if (this.$refs.turnPage4) {
              this.$refs.turnPage4.resetPage(page)
            }
          }
        }
      })
    },
    // 奖金池
    _bonusRewardDetail (page) {
      // console.log(this.userInfo.address)
      this.$http.post(`${this.$api}/lottoReward/getRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&rewardType=3&userAddress=${this.$route.query.userAddress}`).then((res) => {
        if (res.data.success === true) {
          this.rewardList = res.data.data.recordList
          this.rewardTotalPage = res.data.data.totalPage
          if (res.data.data.totalPage > 0) {
            if (this.$refs.turnPage2) {
              this.$refs.turnPage2.resetPage(page)
            }
          }
        }
      })
    },
    // 分红奖励
    _shareRewardDetail (page) {
      this.$http.post(`${this.$api}/lottoReward/getBonusRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}`).then((res) => {
        if (res.data.success === true) {
          this.bonusList = res.data.data.rewardPlayerList
          this.allBonusSum = res.data.data.bonusSum
          // console.log(this.allBonusSum)
          this.bonusTotalPage = res.data.data.totalPage
          if (res.data.data.totalPage > 0) {
            if (this.$refs.turnPage1) {
              this.$refs.turnPage1.resetPage(page)
            }
          }
        }
      })
    },
    // 团队奖励
    getUserGroupTotal (page) {
      let url = `${this.$api}/lottoReward/getUserGroupTotal?pageSize=10&pageIndex=${page}&roundId=${this.$route.query.roundId}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.groupTotalList = res.data.data.groupTotalList
          this.groupTotalPage = res.data.data.totalPage
          if (res.data.data.totalPage > 0) {
            this.$refs.turnPage3.resetPage(page)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['../../../../components/turnPage.vue'], resolve)
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
.rewardDetail
  .pc
    .tab
      max-width 1088px
      display flex
      height 70px
      margin 80px 0 80px 80px
      .btn
        flex 1
        display flex
        align-items center
        justify-content center
        padding 0 15px
        height 70px
        background-color #EDEFF1
        font-size 18px
        text-align center
        cursor pointer
        margin-right: 30px
        border-radius 4px
        &:last-child
          margin-right: 0
        &.active
          background-color #FC534C
          color: #fff
    .top-wrapper
      max-width 1088px
      margin-left: 60px
      margin-top 80px
      display flex
      flex-direction column
      align-items center
      .top-title
        font-size 24px
        color #181818
        font-weight bold
      .top-time
        margin 30px 0 40px
        color #181818
        font-size 18px
      .top-count
        font-family "Microsoft YaHei UI"
        font-weight bold
        .integer
          font-size 40px
          color #181818
          @media screen and (max-width: 1024px) {
            font-size 26px
            color #fc534c
          }
        .decimal
          font-size 24px
          @media screen and (max-width: 1024px) {
            color #fc534c
          }
        .dot
          @media screen and (max-width: 1024px) {
            color #fc534c
          }
        .unit
          font-size 24px
          color #fc534c
          @media screen and (max-width: 1024px) {
            color #fc534c
          }
      .pool
        margin-top 110px
        width 100%
        display flex
        flex-direction row
        justify-content space-between
        .pool-left, .pool-right
          flex 1
          text-align: center
          .pool-text
            font-size 18px
            color #181818
            margin-bottom 30px
          .pool-value
             font-size 30px
             color #181818
             font-weight bold
             span
               color #FC534C
        .segmentation
          border-left 1px solid #c5c5c5
    #commonTableList
      margin-top 100px
      margin-bottom 50px
  .mobile
    margin-top 70px !important
    .mobile-myAccount
      .myAccountBody
        .body-title
          margin 30px 0 15px
          font-size 16px
          color #181818
        .body-value
          font-size 20px
          color #FC534C
        .body-time
          margin 15px 0 30px
          font-size 16px
          color #181818
        .bg
          height 1px
          background-image url("../../../../assets/images/myAccount/dashed.png")
          background-repeat repeat-x
          background-position bottom
      .statistical
        ul
          padding 0 20px
          .statistical-title
             margin 20px 0 15px
          li
            padding 15px 20px
            display flex
            flex-direction row
            align-items center
            justify-content space-between
            .value-wrapper
              .li-title
                 font-size 14px
                 margin-bottom 10px
                 color #181818
              .li-value
                 font-size 20px
                 color #171717
            .icon
              width 9px
            &:active
              opacity 0.6
            &:nth-child(1){
              background-color #edeff1
            }
            &:nth-child(3), &:nth-child(5){
              background-color #edeff1
            }
            &:nth-child(4){
              background-color #fafafa
            }
</style>
