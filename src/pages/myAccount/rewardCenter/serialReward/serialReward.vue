<template>
  <div class="reward-wrapper">
    <div class="rank">
      <div class="pc">
        <table id="commonTableList">
          <thead>
          <h6>{{$t('serialReward.text1')}}</h6>
          <tr>
            <td>{{$t('serialReward.text2')}}</td>
            <td>{{$t('serialReward.text3')}}</td>
            <td>{{$t('serialReward.text4')}}</td>
            <td class="time">{{$t('serialReward.text5')}}</td>
            <td>{{$t('serialReward.text6')}}</td>
          </tr>
          </thead>
          <tbody>
          <tr @click="$router.push({path: '/account/serialReward/serialRewardDetails',
          query:
            {
              roundName: item.roundName,
              roundId: item.id,
              createAt: item.createAt,
              userAddress: userInfo.address
            }})" class="cursor" v-for="item in roundList" :key="item.index">
            <td>{{item.roundName}}</td>
            <td>{{item.bonusPoolSum | formattingMoney}} USD</td>
            <td>{{item.rewardPoolSum | formattingMoney}} USD</td>
            <td class="time">{{$changeDate(item.createAt, '/')}}</td>
            <td class="handle">{{$t('serialReward.text7')}}</td>
          </tr>
          </tbody>
          <div class="queryErr" v-if="roundList.length === 0">
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
              <div class="center" @click="upBoxClose = !upBoxClose">{{$t('serialReward.text11')}} <i :class="{'close': upBoxClose}"></i></div>
              <div class="right"></div>
            </div>
            <div class="headUpBox" :class="{'close': upBoxClose}" @click="upBoxClose = !upBoxClose">
              <ul>
                <router-link to="/account/eatReward" tag="li">{{$t('serialReward.text12')}}</router-link>
                <router-link to="/account/serialReward" tag="li">{{$t('serialReward.text11')}}</router-link>
              </ul>
            </div>
          </div>
          <div class="myAccountBody">
            <div class="mobileTable">
              <h6 class="titleReward">{{$t('rank.text9')}}</h6>
              <ul>
                <li v-for="item in roundList" :key="item.index" @click="$router.push({path: '/account/serialReward/serialRewardDetails',
                  query:
                    {roundName: item.roundName,
                     roundId: item.id,
                     createAt: item.createAt,
                     bonusPoolSum: item.bonusPoolSum,
                     rewardPoolSum: item.rewardPoolSum
                     }})">
                  <div class="info">
                    <div>{{item.roundName}} {{$t('serialReward.text9')}}</div>
                    <i class="count-time">{{$changeDate(item.createAt, '/')}}</i>
                  </div>
                  <div class="count-wrapper">
                    <div class="count-text">{{$t('serialReward.text10')}}：</div>
                    <div class="count">{{item.bonusPoolSum + item.rewardPoolSum | formattingMoney}} USD</div>
                  </div>
                </li>
              </ul>
              <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
              <div class='error' v-if="roundList.length === 0">
                {{$t('orderManage.text8')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      upBoxClose: '',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      currentPage: 1, // 默认当前页为1
      roundList: [] // 连环吃饼奖励记录列表
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userAddress'
    ])
  },
  created () {
    this._getMyRewardList(1) // 获取连环吃饼奖励记录
  },
  methods: {
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this._getMyRewardList(page)
    },
    _getMyRewardList (page) {
      this.$http.post(`${this.$api}/lottoReward/getMyRewardList?pageIndex=${page}&pageSize=${this.pageSize}`).then((res) => {
        if (res.data.success === true) {
          this.roundList = res.data.data.roundList
          this.totalPage = res.data.data.totalPage
        }
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['../../../../components/turnPage.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
