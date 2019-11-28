<template>
  <div class="rankDetail">
    <div class="pc">
      <div class="bread">
        <router-link to="/account/rank">{{$t('rankDetail.text1')}}</router-link><i> > </i><span>{{$t('rankDetail.text2')}}</span>
      </div>
      <table class="commonTableList">
        <thead>
        <h6>{{rewardRound.roundName}}-{{$t('rankDetail.text3')}}</h6>
        <tr>
          <td>{{$t('rankDetail.text4')}}</td>
          <td>{{$t('rankDetail.text5')}}</td>
          <td>{{$t('rankDetail.text6')}}</td>
        </tr>
        </thead>
        <tbody v-if="rewardPlayer.length > 0">
        <tr v-for="(item, index) in rewardPlayer" :key="index">
          <td>{{item.playerIndex}}</td>
          <td>{{item.rewardCount}}</td>
          <td class="money">{{item.rewardSum | formattingMoney}} SIE</td>
        </tr>
        </tbody>
        <div class="queryErr" v-if="rewardPlayer.length === 0">
          {{$t('orderManage.text8')}}
        </div>
        <v-turnPage :propsPage="totalPage1" @orderLogTrunPage="parentTurnPage"></v-turnPage>
      </table>
      <table class="commonTableList">
        <thead>
        <tr>
          <td>{{$t('rankDetail.text7')}}</td>
          <td>{{$t('rankDetail.text8')}}</td>
          <td>{{$t('rankDetail.text9')}}</td>
          <td>{{$t('rankDetail.text10')}}</td>
        </tr>
        </thead>
        <tbody v-if="loopRecordList.length > 0">
        <tr v-for="(item, index2) in loopRecordList" :key="index2">
          <td>{{item.myIndex}}</td>
          <td>{{item.rewardAmount | formattingMoney}} SIE</td>
          <td>{{$changeDate(item.createAt)}}</td>
          <td class="money">{{item.rewardLoop}}</td>
        </tr>
        </tbody>
        <div class="queryErr" v-if="loopRecordList.length === 0">
          {{$t('orderManage.text8')}}
        </div>
        <v-turnPage :propsPage="totalPage2" @orderLogTrunPage="parentTurnPage2"></v-turnPage>
      </table>
    </div>
    <div class="mobile">
      <div class="mobile-myAccount">
        <div class="myAccountHead">
          <div class="Head-padding">
            <div class="left" @click="$router.go(-1)"></div>
            <div class="center">{{$t('rankDetail.text11')}}</div>
            <div class="right"></div>
          </div>
        </div>
        <div class="myAccountBody">
          <h3>{{$t('myAccountNav.text12')}}{{rewardRound.roundName}}{{$t('myAccountNav.text13')}}</h3>
          <div class="mobileTable">
            <table class="commonTableList rankTable">
              <thead>
              <h6>{{$t('rankDetail.text12')}}</h6>
                <tr>
                  <td>{{$t('rankDetail.text13')}}</td>
                  <td>{{$t('rankDetail.text14')}}</td>
                  <td>{{$t('rankDetail.text15')}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in rewardPlayer" :key="index">
                  <td>{{item.playerIndex}}</td>
                  <td>{{item.rewardCount}}</td>
                  <td class="money">{{item.rewardSum | formattingMoney}} SIE</td>
                </tr>
              </tbody>
              <v-turnPage :propsPage="totalPage1" @orderLogTrunPage="parentTurnPage"></v-turnPage>
            </table>
          </div>
          <div class="mobileTable">
            <h6>{{$t('rankDetail.text16')}}</h6>
            <ul>
              <li  v-for="(item, index2) in loopRecordList" :key="index2">
                <div class="info">
                  <div>{{$t('rankDetail.text17')}}{{item.myIndex}}{{$t('rankDetail.text18')}}</div>
                  <i>{{item.rewardAmount | formattingMoney}} SIE</i>
                </div>
                <div class="time">
                  <div>{{$t('rankDetail.text19')}}{{item.rewardLoop}}</div>
                  <i>{{$t('rankDetail.text20')}} {{$changeDate(item.createAt)}}</i>
                </div>
              </li>
            </ul>
            <v-turnPage :propsPage="totalPage2" @orderLogTrunPage="parentTurnPage2"></v-turnPage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      id: this.$route.query.id,
      pageSize: 5,
      pageIndex: 1,
      totalPage1: 0,
      currentPage1: 1,
      totalPage2: 0,
      currentPage2: 1,
      rewardPlayer: [],
      loopRecordList: [],
      rewardRound: {
        roundName: ''
      }
    }
  },
  mounted () {
    this.getUserLoopRewardDetail(1)
    this.getMySortRewardList(1)
  },
  methods: {
    // 排位循环奖励次数
    getUserLoopRewardDetail (page) {
      let url = `${this.$api}/danRobot/getUserLoopRewardDetail?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.id}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.loopRecordList = res.data.data.loopRecordList
          this.rewardRound = res.data.data.rewardRound
          this.totalPage2 = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    parentTurnPage (page) { // 页码
      this.currentPage1 = page
      this.getMySortRewardList(page)
    },
    parentTurnPage2 (page) { // 页码
      this.currentPage2 = page
      this.getUserLoopRewardDetail(page)
    },
    getMySortRewardList (page) {
      let url = `${this.$api}/danRobot/mySortRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.id}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.rewardPlayer = res.data.data.rewardPlayer
          this.totalPage1 = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  }
}
</script>

<style lang="less" scoped>
.rankDetail .mobile {
  margin-top: 50px;
}
.commonTableList{
  margin-bottom: 70px;
  &.rankTable{
    margin-bottom: 20px;
    margin-left: 0px;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
    background-image: url('../../../assets/images/myAccount/dashed.png');
    background-repeat: repeat-x;
    background-position: bottom;
    thead{
      td{
        color: #605f5f;
      }
    }
    td{
      flex: 1;
    }
  }
}
</style>
