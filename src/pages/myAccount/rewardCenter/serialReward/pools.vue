<template>
    <div class="container-mobile">
      <div class="head-mobile">
        <div class="back-mobile" @click="back"></div>
        <div class="title-mobile">{{$t('pools.text1')}}</div>
      </div>
      <div class="table-all-mobile">
        <ul>
          <li v-for="item in rewardList" :key="item.index">
            <div class="table-top">
              <div class="table-place">
                <span>{{$t('pools.text2')}}:</span><span>{{item.rewardIndex}}</span>
              </div>
              <div class="table-time"><span>{{$changeDate(item.joinAt, '/')}}</span></div>
            </div>
            <div class="table-bottom">
              <div class="bet">
                <span>{{$t('pools.text3')}}：</span><span>{{item.joinAmount | formattingMoney}} USD</span>
              </div>
              <div class="reward">
                <span>{{$t('pools.text4')}}：</span><span>{{item.rewardAmount | formattingMoney}} USD</span>
              </div>
            </div>
          </li>
        </ul>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
        <div class='error' v-if="rewardList.length === 0">
          {{$t('orderManage.text8')}}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'pools',
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      currentPage: 1, // 默认当前页为1
      rewardList: [] // 奖金池奖励明细列表
    }
  },
  created () {
    this._bonusRewardDetail(1) // 获取奖金池奖励明细
  },
  mounted () {
    var that = this
    window.onresize = function () {
      that.routeRedirect() // 解决PC端空白问题
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this._bonusRewardDetail(page)
    },
    routeRedirect () {
      if (window.innerWidth > 1200) {
        this.$router.push({path: '/account/serialReward/serialRewardDetails', query: {roundName: this.$route.query.roundName, roundId: this.$route.query.roundId, createAt: this.$route.query.createAt, userAddress: this.$route.query.userAddress}})
      }
    },
    _bonusRewardDetail (page) {
      this.$http.post(`${this.$api}/lottoReward/getRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&rewardType=3&userAddress=${this.$route.query.userAddress}`).then((res) => {
        if (res.data.success === true) {
          this.rewardList = res.data.data.recordList
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
  .table-bottom
    align-items start
    flex-direction column
</style>
