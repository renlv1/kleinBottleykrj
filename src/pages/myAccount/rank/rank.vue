<template>
  <div class="rank">
    <div class="pc">
      <table id="commonTableList">
        <thead>
        <h6>{{$t('rank.text1')}}</h6>
        <tr>
          <td >{{$t('rank.text2')}}</td>
          <td>{{$t('rank.text3')}}</td>
          <td>{{$t('rank.text4')}}</td>
          <td class="time">{{$t('rank.text5')}}</td>
          <td>{{$t('rank.text6')}}</td>
        </tr>
        </thead>
        <tbody v-if="recordList.length > 0">
        <tr v-for="(item, index) in recordList" :key="index" class="cursor" @click="$router.push({path:'/account/rank/rankDetail',query:{id: item.id}})">
          <td>{{$t('myAccountNav.text12')}}{{item.roundName}}{{$t('myAccountNav.text13')}}</td>
          <td>{{$t('rank.text7')}}</td>
          <td>{{item.loopSumAmount | formattingMoney}} SIE</td>
          <td class="time">{{$changeDate(item.updateAt, '-')}}</td>
          <td class="handle">{{$t('rank.text8')}}</td>
        </tr>
        </tbody>
        <div class="queryErr" v-if="recordList.length === 0">
          {{$t('orderManage.text8')}}
        </div>
      </table>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
    </div>
    <div class="mobile">
      <div class="mobile-myAccount">
        <div class="myAccountHead up-box">
          <div class="Head-padding">
            <div class="left" @click="$router.push('/account')"></div>
            <div class="center" @click="upBoxClose = !upBoxClose">{{$t('activityReward.text12')}}<i :class="{'close': upBoxClose}"></i></div>
            <div class="right"></div>
          </div>
          <div class="headUpBox" :class="{'close': upBoxClose}">
            <ul>
              <router-link to="/account/activityReward" tag="li">{{$t('activityReward.text9')}}</router-link>
              <router-link to="/account/teamReward" tag="li">{{$t('activityReward.text10')}}</router-link>
              <router-link to="/account/eatReward" tag="li">{{$t('activityReward.text11')}}</router-link>
              <router-link to="/account/rank" tag="li">{{$t('activityReward.text12')}}</router-link>
              <router-link to="/account/serialReward" tag="li">{{$t('serialReward.text11')}}</router-link>
            </ul>
          </div>
        </div>
        <div class="myAccountBody">
          <div class="mobileTable">
            <h6>{{$t('rank.text9')}}</h6>
            <ul v-if="recordList.length > 0">
              <li v-for="(item, index) in recordList" :key="index" @click="toDetail(item)">
                <div class="info">
                  <div>{{$t('myAccountNav.text12')}}{{item.roundName}}{{$t('myAccountNav.text13')}}</div>
                  <i>{{item.loopSumAmount | formattingMoney}} SIE</i>
                </div>
                <div class="time">{{$changeDate(item.updateAt, '-')}}</div>
              </li>
            </ul>
            <div class='error' v-if="recordList.length === 0">
              {{$t('orderManage.text8')}}
            </div>
          </div>
        </div>
      </div>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      queryErrorText: '暂时未查到信息',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      currentPage: 1,
      recordList: [],
      upBoxClose: ''
    }
  },
  mounted () {
    this.getUserRewardRoundList(1)
  },
  methods: {
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this.getUserRewardRoundList(page)
    },
    getUserRewardRoundList (page) {
      let url = `${this.$api}/danRobot/getUserRewardRoundList?pageIndex=${page}&pageSize=${this.pageSize}&type=4`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.recordList = res.data.data.recordList
          this.totalPage = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toDetail (item) {
      this.$router.push({
        path: '/account/rank/rankDetail',
        query: {
          id: item.id
        }
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  }
}
</script>

<style lang="less" scoped>

</style>
