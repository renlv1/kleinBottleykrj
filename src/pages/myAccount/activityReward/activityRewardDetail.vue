<template>
  <div class="activityRewardDetail">
    <div class="pc">
      <div class="bread">
        <router-link to="/account/activityReward">{{$t('activityRewardDetail.text1')}}</router-link><i> > </i><span>{{$t('activityRewardDetail.text2')}}</span>
      </div>
      <div id="commonTableDetial">
        <ul>
          <li><h6>{{$t('activityRewardDetail.text3')}}</h6></li>
          <li><i>{{$t('activityRewardDetail.text4')}}</i> <span>{{$t('myAccountNav.text12')}}{{topRewardRecord.roundName}}{{$t('myAccountNav.text13')}}</span></li>
          <li><i>{{$t('activityRewardDetail.text5')}}</i> <span>{{topRewardRecord.refAmount | formattingMoney}} SIE</span></li>
          <li><i>{{$t('activityRewardDetail.text6')}}</i> <span>{{topRewardRecord.rewardAmount | formattingMoney}} SIE</span></li>
        </ul>
      </div>
      <!--列表-->
      <table id="commonTableList">
        <thead>
        <h6>{{$t('activityRewardDetail.text7')}}</h6>
        <tr>
          <td>{{$t('activityRewardDetail.text8')}}</td>
          <td class="time">{{$t('activityRewardDetail.text9')}}</td>
          <td>{{$t('activityRewardDetail.text10')}}</td>
        </tr>
        </thead>
        <tbody v-if="rewardPlayerList.length > 0">
        <tr v-for="(item, index) in rewardPlayerList" :key="index">
          <td>{{item.userName}}</td>
          <td class="time">{{$changeDate(item.updateAt, '-')}}</td>
          <td>{{item.rewardSum | formattingMoney}} SIE</td>
        </tr>
        </tbody>
        <div class="queryErr" v-if="rewardPlayerList.length === 0">
          {{$t('orderManage.text8')}}
        </div>
      </table>
    </div>
    <div class="mobile">
      <div class="mobile-myAccount">
        <div class="myAccountHead">
          <div class="Head-padding">
            <div class="left" @click="$router.go(-1)"></div>
            <div class="center">{{$t('activityRewardDetail.text11')}}</div>
            <div class="right"></div>
          </div>
        </div>
        <div class="myAccountBody">
          <h3>{{$t('myAccountNav.text12')}}{{topRewardRecord.roundName}}{{$t('myAccountNav.text13')}}</h3>
          <div class="mobileTable">
            <ul class="noTitle">
              <li>
                <span>{{$t('activityRewardDetail.text12')}}</span>
                <i>{{topRewardRecord.refAmount | formattingMoney}} SIE</i>
              </li>
              <li>
                <span>{{$t('activityRewardDetail.text13')}}</span>
                <i>{{topRewardRecord.rewardAmount | formattingMoney}} SIE</i>
              </li>
            </ul>
          </div>
          <div class="mobileTable">
            <h6>{{$t('activityRewardDetail.text14')}}</h6>
            <ul>
              <li v-for="(item, index) in rewardPlayerList" :key="index">
                <div class="info">
                  <div>{{item.userName}}</div>
                  <i>{{item.rewardSum | formattingMoney}} SIE</i>
                </div>
                <div class="time">{{$changeDate(item.updateAt)}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.activityRewardDetail .mobile {
  margin-top: 50px;
}
#commonTableDetial{
  margin-bottom: 70px;
}
.myAccountBody{
  .mobileTable{
    &:nth-child(2) {
      padding: 20px 0;
      background-image: url('../../../assets/images/myAccount/dashed.png');
      background-repeat: repeat-x;
      background-position: bottom;
      margin-bottom: 20px;
    }
  }
}
</style>

<script>
export default{
  data () {
    return {
      id: this.$route.query.id,
      topRewardRecord: {},
      rewardPlayerList: []
    }
  },
  mounted () {
    this.getUserRewardDetail()
  },
  methods: {
    // 1.5 推广奖励明细
    getUserRewardDetail () {
      let url = `${this.$api}/danRobot/getUserRewardDetail?rewardId=${this.id}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.rewardPlayerList = res.data.data.rewardPlayerList
          this.topRewardRecord = res.data.data.topRewardRecord
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
