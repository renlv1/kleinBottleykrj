<template>
  <div class="orderDetail">
    <div class="pc">
      <div class="bread">
        <router-link to="/account/orderManage">{{$t('orderDetail.text1')}}</router-link><i> > </i><span>{{$t('orderDetail.text2')}}</span>
      </div>
      <div id="commonTableDetial">
        <ul>
          <li><h6>{{$t('orderDetail.text2')}}</h6></li>
          <li><i>{{$t('orderDetail.text3')}}</i> <span>{{detailData.id}}</span></li>
          <li><i>{{$t('orderDetail.text4')}}</i> <span>{{$changeDate(detailData.updateAt)}}</span></li>
          <li><i>{{$t('orderDetail.text5')}}</i> <span>{{detailData.orderAmount | formattingMoney}} {{detailData.currency}}</span></li>
          <li><i>{{$t('orderDetail.text6')}}</i> <span>{{parseOrserType(detailData.orderType)}}</span></li>
          <li><i>{{$t('orderDetail.text7')}}</i> <span>{{detailData.renewyear}} {{$t('myAccount.text7')}}</span></li>
          <li><i>{{$t('orderDetail.text8')}}</i> <span>{{$t('myAccountNav.text12')}}{{detailData.projectName}}{{$t('myAccountNav.text13')}}</span></li>
          <li><i>{{$t('orderDetail.text9')}}</i> <span>{{detailData.rankings}}</span></li>
        </ul>
      </div>
    </div>
    <div class="mobile">
      <div class="mobile-myAccount">
        <div class="myAccountHead">
          <div class="Head-padding">
            <div class="left" @click="$router.go(-1)"></div>
            <div class="center">{{$t('orderDetail.text2')}}</div>
            <div class="right"></div>
          </div>
        </div>
        <div class="myAccountBody">
          <div class="mobileTable">
            <h6>{{$t('orderDetail.text1')}}</h6>
            <ul class="noTitle">
              <li>
                <span>{{$t('orderDetail.text3')}}</span>
                <i>{{detailData.id}}</i>
              </li>
              <li>
                <span>{{$t('orderDetail.text4')}}</span>
                <i>{{$changeDate(detailData.updateAt)}}</i>
              </li>
              <li>
                <span>{{$t('orderDetail.text5')}}</span>
                <i class="money">{{detailData.orderAmount | formattingMoney}} {{detailData.currency}}</i>
              </li>
              <li>
                <span>{{$t('orderDetail.text6')}}</span>
                <i>{{parseOrserType(detailData.orderType)}}</i>
              </li>
              <li>
                <span>{{$t('orderDetail.text7')}}</span>
                <i>{{detailData.renewyear}} {{$t('myAccount.text7')}}</i>
              </li>
              <li>
                <span class="sum">{{$t('orderDetail.text10')}}</span>
                <i>{{detailData.projectName}}</i>
              </li>
              <li>
                <span class="sum">{{$t('orderDetail.text9')}}</span>
                <i>{{detailData.rankings}}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
export default{
  data () {
    return {
      robotOrderId: this.$route.query.robotOrderId,
      detailData: {}
    }
  },
  mounted () {
    this.queryRobotOrderDetail()
  },
  methods: {
    queryRobotOrderDetail () {
      let url = `${this.$api}/product/queryRobotOrderDetail?robotOrderId=${this.robotOrderId}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.detailData = res.data.data
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
  }
}
</script>
