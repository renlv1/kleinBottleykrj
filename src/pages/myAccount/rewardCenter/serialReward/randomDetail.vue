<template>
  <div class="">
    <div class="head-mobile">
      <div class="back-mobile" @click="back"></div>
      <div class="title-mobile">{{$t('random.text2')}}</div>
    </div>
    <div class="table-all-mobile">
      <ul style="margin-top: 80px">
        <li v-for="(item, index) in randomList" :key="index">
          <h3>
            <span>{{$t('random.text5')}}：{{item.id}}</span><i>{{$changeDate(item.createAt)}}</i>
          </h3>
          <p>{{$t('random.text6')}}：{{item.joinAmount | formattingMoney}}USD</p>
          <p>{{$t('random.text7')}}： {{item.rewardAmount | formattingMoney}}USD</p>
        </li>
      </ul>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
      <div class='error' v-if="randomList.length === 0">
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
      randomList: [] // 奖金池奖励明细列表
    }
  },
  created () {
    this.getRandomList(1) // 获取奖金池奖励明细
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
    // 随机奖励
    getRandomList (page) {
      let url = `${this.$api}/lottoReward/getRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&rewardType=4&userAddress=${this.$route.query.userAddress}`
      this.$http.post(url).then(res => {
        if (res.data.success === true) {
          this.randomList = res.data.data.recordList
          this.totalPage = res.data.data.totalPage
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
    routeRedirect () {
      if (window.innerWidth > 1200) {
        this.$router.push({path: '/account/serialReward/serialRewardDetails', query: {roundName: this.$route.query.roundName, roundId: this.$route.query.roundId, createAt: this.$route.query.createAt, userAddress: this.$route.query.userAddress}})
      }
    },
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this.getRandomList(page)
    }
  },
  components: {
    vTurnPage: resolve => require(['../../../../components/turnPage.vue'], resolve)
  }
}
</script>
<style lang="less" type="text/less" scoped>
.table-all-mobile{
  margin: 0 20px;
  ul{
    li{
      /*margin-bottom: 20px;*/
      h3{
        padding: 0 30px ;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #EDEFF1;
        font-size: 18px;
        color: #181818;
      }
      p{
        padding: 0 30px ;
        background-color: #FAFAFA;
        height:40px;
        font-size: 18px;
        color: #181818;
        line-height: 50px;
      }
    }
  }
}
</style>
