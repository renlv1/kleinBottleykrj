<template>
  <div class="container-mobile">
    <div class="head-mobile">
      <div class="back-mobile" @click="back"></div>
      <div class="title-mobile">{{$t('daShang.text1')}}</div>
    </div>
    <div class="table-all-mobile">
      <ul>
        <li v-for="(item, index) in awardList" :key="index">
          <div class="table-top">
            <div class="my-place">
              <span>{{$t('daShang.text2')}}：</span><span>{{item.id}}</span>
            </div>
          </div>
          <div class="table-bottom">
            <div class="table-left-wrapper">
              <div class="bet">
                <span>{{$t('daShang.text4')}}：</span><span>{{item.awardSum | formattingMoney}} USD</span>
              </div>
              <div class="cumulative">
                <span>{{$t('daShang.text15')}}：</span><span>{{item.awardAmount | formattingMoney}} USD</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage5"></v-turnPage>
      <div class='error' v-if="awardList.length === 0">
        {{$t('orderManage.text8')}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      currentPage: 1, // 默认当前页为1
      awardList: [] // 打赏奖励明细列表
    }
  },
  mounted () {
    var that = this
    window.onresize = function () {
      that.routeRedirect() // 解决PC端空白问题
    }
  },
  created () {
    this._getAwardList(1) // 获取分红池奖励明细
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
      this._getAwardList(page)
    },
    _getAwardList (page) {
      this.$http.post(`${this.$api}/lottoReward/getAwardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&userAddress=${this.$route.query.userAddress}`).then((res) => {
        if (res.data.success === true) {
          this.awardList = res.data.data.awardList
          this.totalPage = res.data.data.totalPage
          if (res.data.data.totalPage > 0) {
            if (this.$refs.turnPage5) {
              this.$refs.turnPage5.resetPage(page)
            }
          }
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
