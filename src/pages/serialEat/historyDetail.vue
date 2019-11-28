<template>
  <div class="container-mobile">
    <div class="head-mobile">
      <div class="back-mobile" @click="$router.push('/historyWinList')"></div>
      <div class="title-mobile">{{$t('historyWinList.text9')}}</div>
    </div>
    <div class="table-mobile">
      <div class="loading" style="margin-top: 90px" v-loading.lock="fullscreenLoading"></div>
      <ul>
        <li>
          <span>{{$t('historyWinList.text2')}}：</span>
          <span>{{jobId}}</span>
        </li>
        <li>
          <span>{{$t('historyWinList.text3')}}：</span>
          <span>{{userName}}</span>
        </li>
        <li>
          <span>{{$t('historyWinList.text4')}}：</span>
          <span>{{$changeDate(playAt, '/')}}</span>
        </li>
        <li>
          <span>{{$t('historyWinList.text5')}}：</span>
          <span>{{joinAmount | fourNumber}} USD</span>
        </li>
        <li>
          <span>{{$t('historyWinList.text6')}}：</span>
          <span>{{$changeDate(endAt, '/')}}</span>
        </li>
        <li>
          <span>{{$t('historyWinList.text7')}}：</span>
          <span>{{rewardAmount | fourNumber}} USD</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fullscreenLoading: true, // 默认加载
        pageSize: 10,
        jobId: '',
        userName: '',
        playAt: '',
        joinAmount: '',
        endAt: '',
        rewardAmount: ''
      }
    },
    created() {
      this.getDetail()
    },
    mounted() {
      var that = this
      window.onresize = function () {
        that.routeRedirect() // 解决PC端空白问题
      }
    },
    methods: {
      getDetail() {
        this.$http.post(`${this.$api}/lottoReward/getHourRewardUserList?pageIndex=${this.$route.query.nowPage}&pageSize=${this.pageSize}`).then((res) => {
          if (res.data.success) {
            this.fullscreenLoading = false
            let historyWinLIst = res.data.data.list
            historyWinLIst.forEach((item) => {
              if (item.id === Number(this.$route.query.id)) {
                this.jobId = item.jobId
                this.userName = item.userName
                this.playAt = item.playAt
                this.joinAmount = item.joinAmount
                this.endAt = item.endAt
                this.rewardAmount = item.rewardAmount
              }
            })
          }
        })
      },
      routeRedirect () {
        if (window.innerWidth > 1200) {
          this.$router.push('/historyWinList')
        }
      }
    }
  }
</script>

<style scoped>
 .table-mobile {
   margin-top: 90px;
 }
</style>
