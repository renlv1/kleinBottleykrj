<template>
  <div class="container-mobile">
    <div class="head-mobile">
      <div class="back-mobile" @click="back"></div>
      <div class="title-mobile">{{$t('award.text12')}}</div>
    </div>
    <div class="table-all-mobile">
      <ul>
        <li v-for="item in groupTotalList" :key="item.index">
          <div class="table-top">
            <div class="table-place">
              <span>{{item.userName}}</span>
            </div>
            <div class="table-time"><span>{{item.usedDay}}/{{item.totalDay}}{{$t('award.text14')}}</span></div>
          </div>
          <div class="table-bottom">
            <div class="bet">
              <span>{{$t('award.text15')}}：</span><span>{{item.groupTotal | formattingMoney}} USD</span>
            </div>
          </div>
          <div class="table-bottom table-bottom2">
            <div class="bet">
              <span>{{$t('usdTixian.text31')}}：</span><span>{{item.usedReward | formattingMoney}} USD / {{item.allReward | formattingMoney}} USD</span>
            </div>
          </div>
        </li>
      </ul>
      <v-turnPage :propsPage="groupTotalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage3"></v-turnPage>
      <div class='error' v-if="groupTotalList === '' || groupTotalList.length === 0">
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
      currentPage: 1, // 默认当前页为1
      groupTotalPage: '',
      groupTotalList: ''
    }
  },
  created () {
    this.getUserGroupTotal(1)
  },
  mounted () {
    var that = this
    window.onresize = function () {
      that.routeRedirect() // 解决PC端空白问题
    }
  },
  methods: {
    routeRedirect () {
      if (window.innerWidth > 1200) {
        this.$router.push({
          path: '/account/serialReward/serialRewardDetails',
          query: {
            roundName: this.$route.query.roundName,
            createAt: this.$route.query.createAt,
            userAddress: this.$route.query.userAddress,
            roundId: this.$route.query.roundId
          }
        })
      }
    },
    back () {
      this.$router.go(-1)
    },
    // 团队奖励
    getUserGroupTotal (page) {
      let url = `${this.$api}/lottoReward/getUserGroupTotal?pageSize=${this.pageSize}&pageIndex=${page}&roundId=${this.$route.query.roundId}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.groupTotalList = res.data.data.groupTotalList
          this.groupTotalPage = res.data.data.totalPage
          if (this.groupTotalPage > 0) {
            this.$refs.turnPage3.resetPage(page)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    parentTurnPage (page) {
      this.currentPage = page
      this.getUserGroupTotal(page)
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
  .table-bottom2
    border-top: 1px solid #edeff1
</style>
