<template>
  <div class="eatReward">
    <div class="pc">
      <!--列表-->
      <table id="commonTableList">
        <thead>
        <h6>{{$t('reward.text1')}}</h6>
        <tr>
          <td >{{$t('eatReward.text2')}}</td>
          <td>{{$t('reward.text2')}}</td>
          <td class="time">{{$t('reward.text3')}}</td>
          <td>{{$t('eatReward.text6')}}</td>
        </tr>
        </thead>
        <tbody v-if="recordList.length > 0">
        <tr v-for="(item, index) in recordList" :key="index" class="cursor" @click="$router.push({path: '/account/eatReward/rewardDetail',query:{roundId: item.id}})">
          <td>{{$t('myAccountNav.text12')}}{{item.roundName}}{{$t('myAccountNav.text13')}}</td>
          <td>{{item.rewardAmountSum | formattingMoney}} SIE</td>
          <td class="time">{{$changeDate(item.createAt, '-')}}</td>
          <td class="handle">{{$t('eatReward.text8')}}</td>
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
            <div class="center" @click="upBoxClose = !upBoxClose">{{$t('activityReward.text11')}}<i :class="{'close': upBoxClose}"></i></div>
            <div class="right"></div>
          </div>
          <div class="headUpBox" :class="{'close': upBoxClose}" @click="upBoxClose = !upBoxClose">
            <ul>
              <router-link to="/account/eatReward" tag="li">{{$t('activityReward.text11')}}</router-link>
              <router-link to="/account/serialReward" tag="li">{{$t('serialReward.text11')}}</router-link>
            </ul>
          </div>
        </div>
        <div class="myAccountBody">
          <div class="table">
            <ul v-if="recordList.length > 0">
              <li v-for="(item, index) in recordList" :key="index" @click="toDetail(item)">
                <h6><span>{{$t('myAccountNav.text12')}}{{item.roundName}}{{$t('myAccountNav.text13')}}</span><i>{{$changeDate(item.createAt, '-')}}</i></h6>
                <div class="info">
                  <div class="left">
                    <p>{{$t('reward.text4')}}</p>
                    <span>{{item.rewardAmountSum | formattingMoney}} SIE</span>
                  </div>
                  <div class="right">
                  </div>
                </div>
                <!--<div class="info">-->
                  <!--<div>{{$t('myAccountNav.text12')}}{{item.roundName}}{{$t('myAccountNav.text13')}}</div>-->
                  <!--<i>{{item.rewardAmountSum | formattingMoney}} SIE</i>-->
                <!--</div>-->
                <!--<div class="time">{{$changeDate(item.payAt, '-')}}</div>-->
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
.myAccountBody{
  .table{
    ul{
      li{
        width: 100%;
        margin-bottom: 20px;
        h6{
          display: flex;
          justify-content: space-between;
          height: 50px;
          line-height: 50px;
          background-color: #EDEFF1;
          font-size: 16px;
          padding: 0 20px;
          @media screen and (max-width: 1200px){
            font-size: 12px;
          }
          span{

          }
          i{

          }
        }
        .info{
          height: 120px;
          background-color: #FAFAFA;
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          align-items: center;
          .left{
            p{
              margin-bottom: 10px;
              font-size: 16px;
              color: #181818;
            }
            span{
              font-size: 22px;
              color: #181818;
              font-weight: bold;
            }
          }
          .right{
            border-top:2px solid #e60000;
            border-right: 2px solid #e60000;
            width: 10px;
            height: 10px;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
}
</style>

<script>
export default{
  data () {
    return {
      queryErrorText: '暂时未查到信息',
      pageIndex: 1,
      pageSize: 5,
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
      let url = `${this.$api}/danRobot/danMyRewardList?pageIndex=${page}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.recordList = res.data.data.roundList
          this.totalPage = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toDetail (item) {
      this.$router.push({
        path: '/account/eatReward/rewardDetail',
        query: {
          roundId: item.id
        }
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  }
}
</script>
