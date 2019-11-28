<template>
  <div class="orderManage">
    <div class="pc">
      <!--列表-->
      <table id="commonTableList">
        <thead>
        <h6>{{$t('orderManage.text1')}}</h6>
        <tr>
          <td>{{$t('orderManage.text2')}}</td>
          <td>{{$t('orderManage.text3')}}</td>
          <td>{{$t('orderManage.text4')}}</td>
          <td class="time">{{$t('orderManage.text5')}}</td>
          <td>{{$t('orderManage.text6')}}</td>
        </tr>
        </thead>
        <tbody v-if="robotOrder.length > 0">
        <tr v-for="(item, index) in robotOrder" :key="index" class="cursor" @click="$router.push({path:'/account/orderDetail' ,query: {robotOrderId: item.id}})">
          <td>{{item.id}}</td>
          <td>{{parseOrserType(item.orderType)}}</td>
          <td>{{item.orderAmount | formattingMoney}} {{item.currency}}</td>
          <td class="time">{{$changeDate(item.updateAt, '-')}}</td>
          <td class="handle">{{$t('orderManage.text7')}}</td>
        </tr>
        </tbody>
        <div class="queryErr" v-if="robotOrder.length === 0">
          {{$t('orderManage.text8')}}
        </div>
      </table>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
    </div>
    <div class="mobile">
    <div class="mobile-myAccount">
      <div class="myAccountHead">
        <div class="Head-padding">
          <div class="left" @click="$router.go(-1)"></div>
          <div class="center">{{$t('orderManage.text9')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="myAccountBody">
        <div class="mobileTable">
          <h6>{{$t('orderManage.text10')}}</h6>
          <ul v-if="robotOrder.length > 0">
            <li v-for="(item, index) in robotOrder" :key="index" @click="$router.push({path: '/account/orderDetail',query:{robotOrderId: item.id}})">
              <div class="info">
                <div>{{$t('orderManage.text11')}} {{parseOrserType(item.orderType)}}</div>
                <i>{{item.orderAmount | formattingMoney}} {{item.currency}}</i>
              </div>
              <div class="time">{{$changeDate(item.updateAt, '-')}}</div>
            </li>
          </ul>
          <div class='error' v-if="robotOrder.length === 0">
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
  .myAccount{
    width: 100%;
  }
</style>

<script>
export default{
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      currentPage: 1,
      robotOrder: []

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
    // 获取数据
    getUserRewardList (page) {
      let url = `${this.$api}/product/queryRobotOrder?pageIndex=${page}&pageSize=${this.pageSize}&productid=4`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.robotOrder = res.data.data.orderList
          this.totalPage = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /* eslint-disable */
    parseOrserType (type) {
      switch (type) {
        case 1 :
          return this.$t('orderManage.text12')
          break
        case 2 :
          return this.$t('orderManage.text13')
          break
        case 3 :
          return this.$t('orderManage.text14')
          break
        default :
          return ' '
      }
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  }
}
</script>
