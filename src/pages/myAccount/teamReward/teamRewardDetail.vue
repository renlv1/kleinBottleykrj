<template>
  <div class="teamRewardDetail">
    <div class="pc">
      <div class="bread">
        <router-link to="/account/teamReward">{{$t('teamRewardDetail.text1')}}</router-link><i> > </i><span>{{$t('teamRewardDetail.text2')}}</span>
      </div>
      <div id="commonTableDetial">
        <ul>
          <li><h6>{{$t('teamRewardDetail.text3')}}</h6></li>
          <li><i>{{$t('teamRewardDetail.text4')}}</i> <span>{{obj.id}}</span></li>
          <li><i>{{$t('teamRewardDetail.text5')}}</i> <span>{{$t('myAccountNav.text12')}}{{obj.roundName}}{{$t('myAccountNav.text13')}}</span></li>
          <li><i>{{$t('teamRewardDetail.text6')}}</i> <span>{{obj.rewardType | parseRewardType}}</span></li>
          <li><i>{{$t('teamRewardDetail.text7')}}</i> <span>{{obj.sourceName}}</span></li>
          <li><i>{{$t('teamRewardDetail.text8')}}</i> <span>{{obj.rewardAmount | formattingMoney}} SIE</span></li>
          <li><i>{{$t('teamRewardDetail.text9')}}</i> <span>{{$changeDate(obj.updateAt)}}</span></li>
        </ul>
      </div>
    </div>
    <div class="mobile">
      <div class="mobile-myAccount">
        <div class="myAccountHead">
          <div class="Head-padding">
            <div class="left" @click="$router.go(-1)"></div>
            <div class="center">{{$t('teamRewardDetail.text10')}}</div>
            <div class="right"></div>
          </div>
        </div>
        <div class="myAccountBody">
          <div class="mobileTable">
            <h6>{{$t('teamRewardDetail.text11')}}</h6>
            <ul class="noTitle">
              <li>
                <span>{{$t('teamRewardDetail.text12')}}</span>
                <i>{{obj.id}}</i>
              </li>
              <li>
                <span>{{$t('teamRewardDetail.text13')}}</span>
                <i>{{$t('myAccountNav.text12')}}{{obj.roundName}}{{$t('myAccountNav.text13')}}</i>
              </li>
              <li>
                <span>{{$t('teamRewardDetail.text14')}}</span>
                <i>{{obj.rewardType | parseRewardType}}</i>
              </li>
              <li>
                <span>{{$t('teamRewardDetail.text15')}}</span>
                <i>{{obj.sourceName}}</i>
              </li>
              <li>
                <span>{{$t('teamRewardDetail.text16')}}</span>
                <i>{{obj.rewardAmount | formattingMoney}} SIE</i>
              </li>
              <li>
                <span>{{$t('teamRewardDetail.text17')}}</span>
                <i>{{$changeDate(obj.updateAt)}}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<script>
export default{
  data () {
    return {
      obj: JSON.parse(this.$route.query.obj)
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
