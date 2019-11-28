<template>
  <div class="eatRewardDetail">
    <div class="pc">
      <div class="bread">
        <router-link to="/account/eatReward">{{$t('eatRewardDetail.text1')}}</router-link><i> > </i><span>{{$t('eatRewardDetail.text2')}}</span>
      </div>
      <table class="commonTableList">
        <thead>
        <h6>{{$t('myAccountNav.text12')}}{{detailData.rewardRound.roundName}} {{$t('myAccountNav.text13')}}{{$t('eatRewardDetail.text2')}}</h6>
        <tr>
          <td>{{$t('eatRewardDetail.text4')}}</td>
          <td>{{$t('eatRewardDetail.text5')}}</td>
          <td>{{$t('eatRewardDetail.text6')}}</td>
          <td>{{$t('eatRewardDetail.text7')}}</td>
          <td>{{$t('eatRewardDetail.text8')}}</td>
        </tr>
        </thead>
        <tbody >
        <tr>
          <td>{{detailData.roundSumRefReward | formattingMoney}} SIE</td>
          <td>{{detailData.roundSumTopRefReward | formattingMoney}} SIE</td>
          <td>{{detailData.roundSumLoopReward | formattingMoney}} SIE</td>
          <td>{{detailData.roundSumLastBuyReward | formattingMoney}} SIE</td>
          <td>{{detailData.roundSumAllReward | formattingMoney}} SIE</td>
        </tr>
        </tbody>
      </table>
      <table class="commonTableList">
        <thead>
        <h6>{{$t('eatRewardDetail.text9')}}</h6>
        <tr>
          <td>{{$t('eatRewardDetail.text10')}}</td>
          <td>{{$t('eatRewardDetail.text11')}}</td>
          <td>{{$t('eatRewardDetail.text12')}}</td>
        </tr>
        </thead>
        <tbody >
        <tr>
          <td>{{detailData.lastBuyReward.remark}}</td>
          <td>{{$changeDate(detailData.lastBuyReward.createAt)}}</td>
          <td>{{detailData.lastBuyReward.rewardAmount | formattingMoney}} SIE</td>
        </tr>
        </tbody>
      </table>
      <table class="commonTableList">
        <thead>
        <h6>{{$t('eatRewardDetail.text13')}}</h6>
        <tr>
          <td>{{$t('eatRewardDetail.text14')}}</td>
          <td>{{$t('eatRewardDetail.text15')}}</td>
          <td>{{$t('eatRewardDetail.text16')}}</td>
        </tr>
        </thead>
        <tbody >
        <tr @click="$router.push('/account/teamReward')" class="cursor">
          <td>{{detailData.refRecordCount}}</td>
          <td>{{detailData.refRecordAmount | formattingMoney}} SIE</td>
          <td class="handle">{{$t('eatRewardDetail.text17')}}</td>
        </tr>
        </tbody>
      </table>
      <table class="commonTableList">
        <thead>
        <h6>{{$t('eatRewardDetail.text18')}}</h6>
        <tr>
          <td>{{$t('eatRewardDetail.text19')}}</td>
          <td>{{$t('eatRewardDetail.text20')}}</td>
          <td>{{$t('eatRewardDetail.text16')}}</td>
        </tr>
        </thead>
        <tbody >
        <tr  @click="toActiveReward()" class="cursor" :class="{'hasId': !detailData.topRefReward.id}">
          <td>{{detailData.topRefReward.refAmount | formattingMoney}} SIE</td>
          <td>{{detailData.topRefReward.rewardAmount| formattingMoney}} SIE</td>
          <td class="handle">{{$t('eatRewardDetail.text17')}}</td>
        </tr>
        </tbody>
      </table>
      <table class="commonTableList">
        <thead>
        <h6>{{$t('eatRewardDetail.text21')}}</h6>
        <tr>
          <td>{{$t('eatRewardDetail.text22')}}</td>
          <td>{{$t('eatRewardDetail.text23')}}</td>
          <td>{{$t('eatRewardDetail.text16')}}</td>
        </tr>
        </thead>
        <tbody >
        <tr @click="toRankDetial()" class="cursor" :class="{'hasId': !detailData.rewardRound.id}">
          <td>{{detailData.loopRewardCount}}</td>
          <td>{{detailData.loopRewardSum| formattingMoney}} SIE</td>
          <td class="handle">{{$t('eatRewardDetail.text17')}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="mobile">
    <div class="mobile-myAccount">
      <div class="myAccountHead">
        <div class="Head-padding">
          <div class="left" @click="$router.go(-1)"></div>
          <div class="center">{{$t('eatRewardDetail.text2')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="myAccountBody">
        <h3>{{$t('myAccountNav.text12')}}{{detailData.rewardRound.roundName}}{{$t('myAccountNav.text13')}}</h3>
        <div class="mobileTable">
          <ul class="noTitle">
            <li>
              <span>{{$t('eatRewardDetail.text4')}}</span>
              <i>{{detailData.roundSumRefReward | formattingMoney}} SIE</i>
            </li>
            <li>
              <span>{{$t('eatRewardDetail.text5')}}</span>
              <i>{{detailData.roundSumTopRefReward | formattingMoney}} SIE</i>
            </li>
            <li>
              <span>{{$t('eatRewardDetail.text6')}}</span>
              <i>{{detailData.roundSumLoopReward | formattingMoney}} SIE</i>
            </li>
            <li>
              <span>{{$t('eatRewardDetail.text7')}}</span>
              <i>{{detailData.roundSumLastBuyReward | formattingMoney}} SIE</i>
            </li>
            <li>
              <span class="sum">{{$t('eatRewardDetail.text8')}}</span>
              <i>{{detailData.roundSumAllReward | formattingMoney}} SIE</i>
            </li>
          </ul>
        </div>
        <div class="mobileTable">
          <h6>{{$t('eatRewardDetail.text9')}}</h6>
          <ul>
            <li>
              <div class="info">
                <div>{{$t('eatRewardDetail.text24')}}{{detailData.lastBuyReward.remark}}{{$t('eatRewardDetail.text25')}}</div>
                <i>{{detailData.lastBuyReward.rewardAmount | formattingMoney}} SIE</i>
              </div>
              <div class="time">{{$changeDate(detailData.lastBuyReward.createAt)}}</div>
            </li>
          </ul>
        </div>
        <div class="mobileTable">
          <h6>{{$t('eatRewardDetail.text26')}}</h6>
          <ul class="view">
            <li @click="$router.push('/account/teamReward')">
              <div class="info">
                <p>{{$t('eatRewardDetail.text27')}}: {{detailData.refRecordAmount | formattingMoney}} SIE</p>
                <p>{{$t('eatRewardDetail.text28')}}: {{detailData.refRecordCount}}</p>
              </div>
              <div class="view-btn">
                <span></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="mobileTable">
          <h6>{{$t('eatRewardDetail.text29')}}</h6>
          <ul class="view">
            <li  @click="toActiveReward()">
              <div class="info">
                <p>{{$t('eatRewardDetail.text30')}}: {{detailData.topRefReward.rewardAmount| formattingMoney}} SIE</p>
                <p>{{$t('eatRewardDetail.text31')}}: {{detailData.topRefReward.refAmount | formattingMoney}} SIE</p>
              </div>
              <div class="view-btn">
                <span></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="mobileTable">
          <h6>{{$t('eatRewardDetail.text32')}}</h6>
          <ul class="view">
            <li @click="toRankDetial()" >
              <div class="info">
                <p>{{$t('eatRewardDetail.text33')}}: {{detailData.loopRewardSum| formattingMoney}} SIE</p>
                <p>{{$t('eatRewardDetail.text34')}}: {{detailData.loopRewardCount}}</p>
              </div>
              <div class="view-btn">
                <span></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style lang="less" scoped>
.eatRewardDetail .mobile {
  margin-top: 50px;
  padding-bottom: 30px;
}
.commonTableList{
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
      detailData: {
        rewardRound: {},
        lastBuyReward: {}, // 吃饼摘奖统计
        topRefReward: {}
      }
    }
  },
  mounted () {
    this.getLastBuyRewardDetail()
  },
  methods: {
    getLastBuyRewardDetail () {
      let url = `${this.$api}/danRobot/lastBuyRewardDetail?rewardId=${this.id}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.detailData = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toActiveReward () {
      if (this.detailData.topRefReward.id) {
        this.$router.push({
          path: '/account/activityReward/activityRewardDetail',
          query: {
            id: this.detailData.topRefReward.id
          }
        })
      }
    },
    toRankDetial () {
      if (this.detailData.rewardRound.id) {
        this.$router.push({
          path: '/account/rank/rankDetail',
          query: {
            id: this.detailData.rewardRound.id
          }
        })
      }
    }
  }
}
</script>
