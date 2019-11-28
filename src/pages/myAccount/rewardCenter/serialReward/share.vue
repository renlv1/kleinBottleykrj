<template>
    <div class="container-mobile">
      <div class="head-mobile">
        <div class="back-mobile" @click="back"></div>
        <div class="title-mobile">{{$t('share.text1')}}</div>
      </div>
      <div class="table-all-mobile">
        <ul>
          <li v-for="item in bonusList" :key="item.index">
            <div class="table-top">
              <div class="my-place">
                <span>{{$t('share.text2')}}：</span><span>{{item.playerIndex}}</span>
              </div>
              <div class="table-time">
                <span>{{$changeDate(item.payAt, '/')}}</span>
              </div>
            </div>
            <div class="table-bottom">
              <div class="table-left-wrapper">
                <div class="bet">
                  <span>{{$t('share.text3')}}：</span><span>{{item.playAmount | formattingMoney}} USD</span>
                </div>
                <div class="cumulative">
                  <span>{{$t('share.text4')}}：</span><span>{{item.bonusSum | formattingMoney}} USD</span>
                </div>
              </div>
              <div class="table-counts">
                <span>{{$t('share.text5')}}：</span><span>{{item.rewardCount}} {{$t('share.text6')}}</span>
              </div>
            </div>
          </li>
        </ul>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
        <div class='error' v-if="bonusList.length === 0">
          {{$t('orderManage.text8')}}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'share',
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      currentPage: 1, // 默认当前页为1
      bonusList: [] // 分红奖励明细列表
    }
  },
  mounted () {
    var that = this
    window.onresize = function () {
      that.routeRedirect() // 解决PC端空白问题
    }
  },
  created () {
    this._shareRewardDetail(1) // 获取分红池奖励明细
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    routeRedirect () {
      if (window.innerWidth > 1200) {
        this.$router.push({path: '/account/serialReward/serialRewardDetails', query: {roundName: this.$route.query.roundName, roundId: this.$route.query.roundId, createAt: this.$route.query.createAt, userAddress: this.$route.query.userAddress}})
      }
    },
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this._shareRewardDetail(page)
    },
    _shareRewardDetail (page) {
      this.$http.post(`${this.$api}/lottoReward/getBonusRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}`).then((res) => {
        if (res.data.success === true) {
          this.bonusList = res.data.data.rewardPlayerList
          this.totalPage = res.data.data.totalPage
        }
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['../../../../components/turnPage.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.table-all-mobile
  margin-top 70px
</style>
