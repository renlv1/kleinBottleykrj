<template>
  <div class="activityReward">
    <div class="pc">
      <!--列表-->
      <table id="commonTableList">
        <thead>
        <h6>{{$t('activityReward.text1')}}</h6>
        <tr>
          <td >{{$t('activityReward.text2')}}</td>
          <td>{{$t('activityReward.text3')}}</td>
          <td>{{$t('activityReward.text4')}}</td>
          <td class="time">{{$t('activityReward.text5')}}</td>
          <td>{{$t('activityReward.text6')}}</td>
        </tr>
        </thead>
        <tbody v-if="recordList.length > 0">
        <tr v-for="(item, index) in recordList" :key="index" class="cursor" @click="$router.push({path:'/account/activityReward/activityRewardDetail',query: {id: item.id}})">
          <td>{{$t('myAccountNav.text12')}}{{item.roundName}}{{$t('myAccountNav.text13')}}</td>
          <td>{{$t('activityReward.text7')}}</td>
          <td>{{item.rewardAmount | formattingMoney}} SIE</td>
          <td class="time">{{$changeDate(item.payAt, '-')}}</td>
          <td class="handle">{{$t('activityReward.text8')}}</td>
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
            <div class="center" @click="upBoxClose = !upBoxClose">{{$t('activityReward.text9')}}<i :class="{'close': upBoxClose}"></i></div>
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
            <h6>{{$t('activityReward.text13')}}</h6>
            <ul v-if="recordList.length > 0">
              <li v-for="(item, index) in recordList" :key="index" @click="toDetail(item)">
                <div class="info">
                  <div>{{$t('myAccountNav.text12')}}{{item.roundName}}{{$t('myAccountNav.text13')}}</div>
                  <i>{{item.rewardAmount | formattingMoney}} SIE</i>
                </div>
                <div class="time">{{$changeDate(item.payAt, '-')}}</div>
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

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<script>
export default{
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      currentPage: 1,
      recordList: [],
      upBoxClose: ''
    }
  },
  mounted () {
    this.getUserRewardList(1)
  },
  methods: {
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this.getUserRewardList(page)
    },
    getUserRewardList (page) {
      let url = `${this.$api}/danRobot/getUserRewardList?pageIndex=${page}&pageSize=${this.pageSize}&type=3`
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
        path: '/account/activityReward/activityRewardDetail',
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
