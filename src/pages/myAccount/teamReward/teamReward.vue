<template>
  <div class="teamReward">
    <div class="pc">
      <!--列表-->
      <table id="commonTableList">
        <thead>
        <h6>{{$t('teamReward.text1')}}: <span>{{rewardSum | formattingMoney}}</span>SIE</h6>
        <tr>
          <td >{{$t('teamReward.text2')}}</td>
          <td>{{$t('teamReward.text3')}}</td>
          <td>{{$t('teamReward.text4')}}</td>
          <td class="time">{{$t('teamReward.text5')}}</td>
          <td>{{$t('teamReward.text6')}}</td>
        </tr>
        </thead>
        <tbody v-if="recordList.length > 0">
        <tr v-for="(item, index) in recordList" :key="index"  class="cursor" @click="$router.push({path: '/account/teamReward/teamRewardDetail',query: {obj: JSON.stringify({id: item.id, roundName: item.roundName,rewardType:item.rewardType,sourceName:item.sourceName,rewardAmount: item.rewardAmount,updateAt:item.updateAt})}})">
          <td>{{$t('myAccountNav.text12')}}{{item.roundName}}{{$t('myAccountNav.text13')}}</td>
          <td>{{item.sourceName}}</td>
          <td>{{item.rewardAmount | formattingMoney}} SIE</td>
          <td class="time">{{$changeDate(item.createAt, '-')}}</td>
          <td class="handle">{{$t('teamReward.text7')}}</td>
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
            <div class="center" @click="upBoxClose = !upBoxClose">{{$t('activityReward.text10')}}<i :class="{'close': upBoxClose}"></i></div>
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
            <h6>{{$t('teamReward.text8')}}: {{rewardSum | formattingMoney}} SIE</h6>
            <ul v-if="recordList.length > 0">
              <li v-for="(item, index) in recordList" :key="index" @click="toDetail(item)">
                <div class="info">
                  <div>{{item.sourceName}}</div>
                  <i>{{item.rewardAmount | formattingMoney}} SIE</i>
                </div>
                <div class="time">{{$changeDate(item.createAt, '/')}}</div>
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

<style lang="less" scoped>

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
      rewardSum: '',
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
      let url = `${this.$api}/danRobot/getUserRewardList?pageIndex=${page}&pageSize=${this.pageSize}&type=1`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.recordList = res.data.data.recordList
          this.totalPage = res.data.data.totalPage
          this.rewardSum = res.data.data.rewardSum
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toDetail (item) {
      this.$router.push({
        path: '/account/teamReward/teamRewardDetail',
        query: {
          obj: JSON.stringify({
            id: item.id,
            roundName: item.roundName,
            rewardType: item.rewardType,
            sourceName: item.sourceName,
            rewardAmount: item.rewardAmount,
            updateAt: item.updateAt
          })
        }
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  }
}
</script>
