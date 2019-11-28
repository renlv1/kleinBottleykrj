<template>
  <div class="turnoverDetail">
    <div class="mobile">
      <div class="management-head">
        <div class="head">
          <div class="back" @click="$router.go(-1)"></div>
          <div class="title">{{$t('exchanges.text25')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="mobile-box">
        <div class="mobile-content">
          <div class="order-progress">
            <h6>{{tradeType(obj.etype)}}{{$t('sieOrderDetail.text1')}}</h6>
            <p><span >{{obj.tradeAmount .toFixed(8)}} <span v-if="obj.etype === 1">{{obj.buyCurrency}}</span><span v-if="obj.etype === 2">{{obj.sellCurrency}}</span>  </span> / <i>{{obj.amount .toFixed(8)}} <span v-if="obj.etype === 1">{{obj.buyCurrency}}</span><span v-if="obj.etype === 2">{{obj.sellCurrency}}</span></i></p>
          </div>
          <div class="dashed-line"></div>
          <ul>
            <li v-for="(item,index) in orderDetailList" :key="index"   class="cursor" >
              <div class="left-dc">
                <div class="number"> {{$t('invitedRecord.text8')}}：{{item.tradePrice .toFixed(8)}} USD</div>
                <div class="time">{{$changeDate(item.createAt, '/')}}</div>
              </div>
              <div class="right-dc">
                <div class="transfer-money">{{$t('invitedRecord.text9')}}：{{item.tradeAmount .toFixed(8)}} {{obj.buyCurrency}}</div>
                <div class="status">{{$t('invitedRecord.text10')}}：<span style="color: #FC534C">{{item.tradeTotalPrice .toFixed(8)}} USD</span></div>
              </div>
            </li>
            <div v-if="orderDetailList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
            <v-turnPage v-if="orderDetailList.length !== 0" :propsPage="entrustTotal" @sieTradeTrun="rechargeTurnPage"></v-turnPage>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageSize: 10,
        entrustTotal: 1, // 查看成交总页数
        orderNowPage: '',
        orderDetailList: [],
        obj: JSON.parse(this.$route.query.obj),
        obj1: this.$route.query.obj,
        type: this.$route.query.type
      }
    },
    created () {
      let self = this
      window.onresize = function () {
        self.getPathSelf()
      }
      this.getOrderDetail(1)
    },
    components: {
      vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
      vLoading: resolve => require(['@/components/loading.vue'], resolve)
    },
    methods: {
      getOrderDetail (page) {
        let fmData = new FormData()
        fmData.append('pageNo', page)
        fmData.append('pageSize', this.pageSize)
        fmData.append('id', this.obj.id)
        fmData.append('type', this.obj.etype)
        let url = `${this.$api}/newCoinentrustRecord/entrustDetail`
        this.$http.post(url, fmData).then(res => {
          if (res.data.success) {
            this.orderDetailList = res.data.data.results
            this.entrustTotal = res.data.data.totalPage
          }
        })
      },
      // 交易类型
      tradeType (val) {
        if (val === 1) {
          return this.$t('usdOrder.text37')
        } else if (val === 2) {
          return this.$t('usdOrder.text38')
        }
      },
      getPathSelf () {
        if (this.$route.path === '/account/exchanges/mobileDetail') {
          if (window.innerWidth > 1200) {
            // console.log(this.$route.query.obj)
            this.$router.push({path: '/account/exchanges/exchangeDetail', query: {obj: this.obj1}})
          }
        }
      },
      rechargeTurnPage (page) {
        this.orderNowPage = page
        this.getOrderDetail(page)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mobile-content
    padding 0 20px
    .order-progress
      h6
        font-size 14px
        color #181818
        margin-bottom 10px
      p
        font-size 18px
    .dashed-line
      height 1px
      width 100%
      background-image: url("../../../assets/images/aiChat/dottedLine.png");
      margin-top 30px
      margin-bottom 30px
  ul
    li
      padding 10px
      font-size 12px
      color #181818
      &:nth-child(odd)
        background-color #edeff1
      &:nth-child(even)
        background-color #fafafa
      .left-dc
        padding-top 10px
        display flex
        justify-content space-between
        color #181818
        .number
          margin-bottom 10px
      .right-dc
        display flex
        justify-content space-between
        align-items center
        .time
          margin-bottom 10px
          color #999
        .status
          color #171717
          margin-left 10px
          text-align right
</style>
