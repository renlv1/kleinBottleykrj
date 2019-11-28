<template>
  <div class="usd-problem">
    <!--  USD申诉 -->
    <h3 id="record-title">
      <span class="line"></span>
      <div>
        <router-link to="/account/btcOrder">{{$route.query.isBTC}}{{$t('usdOrder.text2')}}</router-link>
        <span>&gt;</span>
        <span @click="backOrder" class="point">{{$route.query.isBTC}}{{$t('shareOrderCenter.text35')}}</span>
        <span>&gt;</span>
        <span>{{$t('usdMoney.text3')}}</span>
      </div>
    </h3>
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('usdMoney.text3')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="mobile-money">
      <p class="label-title">{{$t('usdMoney.text4')}}：</p>
      <h3 class="moneys">{{orderData.drawAmount}} {{$route.query.isBTC}}</h3>
      <div class="dashed-line"></div>
    </div>
    <div id="order-table">
      <div class="pc-table">
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text5')}}</div>
          <div>{{orderData.id}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text6')}}</div>
          <div class="await-status processed-status">{{orderStatus(orderData.status, orderData.payStatus, orderData.problemStatus)}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text7')}}</div>
          <div>{{orderData.drawAmount}} {{$route.query.isBTC}}</div>
        </div>
        <div class="flex-item" v-if="$route.query.isBTC !== 'BTC'">
          <div class="text-left">{{$t('usdMoney.text33')}}</div>
          <div>{{orderData.drawCurrency}}</div>
        </div>
        <div class="flex-item" v-if="$route.query.isBTC !== 'BTC'">
          <div class="text-left">{{$t('usdMoney.text34')}}</div>
          <div>{{orderData.receiveAmount}} {{orderData.drawCurrency}}</div>
        </div>
      </div>
      <div class="mobile-table">
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text10')}}：</div>
          <div>{{orderData.drawCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text11')}}：</div>
          <div>{{orderData.receiveAmount}} {{orderData.drawCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text6')}}</div>
          <div class="await-status processed-status">{{orderStatus(orderData.status, orderData.payStatus, orderData.problemStatus)}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text12')}}：</div>
          <div>{{orderData.id}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text13')}}：</div>
          <div>{{$changeDate(orderData.createAt)}}</div>
        </div>
      </div>
    </div>
    <problem-center :orderid="orderid" :type="2"></problem-center>
  </div>
</template>

<script type="text/ecmascript-6">
  import problemCenter from '@/components/problemCenter'
  export default {
    data () {
      return {
        showDialog: false,
        errMsg: '',
        confirmShow: true,
        isLoading: false,
        noneImg: '',
        descNum: 0,
        problemContent: '',
        imagesArr: [],
        isMaxLoading: true,
        orderData: [],
        fenhang: [],
        shouKuanData: [],
        orderid: this.$route.query.id,
        noneContent: '',
        imgDataObj: []
      }
    },
    created () {
      this.getOrderDetails()
    },
    methods: {
      // 订单详情
      getOrderDetails () {
        this.postRequest('/draw/queryMyOrderDetail', {
          id: this.orderid
        }).then(res => {
          if (res.data.success === true) {
            this.orderData = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 返回订单详情
      backOrder () {
        this.$router.push({
          path: '/account/btcOrder/btcWithSwitchBoss/btcWithInfo',
          query: {id: this.orderid}
        })
      },
      postRequest (url, params) {
        return this.$http({
          method: 'post',
          url: `${this.$api}${url}`,
          data: params,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              if (data.hasOwnProperty(it) === true) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      },
      // 订单状态
      orderStatus (type, payStatus, proStatus) { // 提现状态
        if (type === 0) { // 提现
          return this.$t('usdOrder.text27') // 等待支付保证金
        } else if (type === 1) {
          return this.$t('usdOrder.text28') // 等待选择老板
        } else if (type === 2 && payStatus === 2) {
          return this.$t('usdOrder.text29') // 待接单
        } else if (type === 3) {
          return this.$t('usdOrder.text30') // 拒绝接单
        } else if (proStatus !== null && (proStatus === 0 || proStatus === 1)) {
          return this.$t('usdOrder.text35') // 申诉中
        } else if (proStatus !== null && proStatus === 2) {
          return this.$t('usdOrder.text36') // 申诉已处理
        } else if (type === 4) {
          return this.$t('usdOrder.text42') // 审核中
        } else if (type === 5 && payStatus === 3) {
          return this.$t('usdOrder.text31') // 等待对方打款
        } else if (type === 5 && payStatus === 4) {
          return this.$t('usdOrder.text32') // 等待您确认收款
        } else if (type === 6) {
          return this.$t('usdOrder.text44') // 审核不通过
        } else if (type === 7) {
          return this.$t('usdOrder.text45') // 用户超时未支付系统取消
        } else if (type === 8) {
          return this.$t('usdOrder.text46') // 审核不通过给用户退款成功
        } else if (type === 9) {
          return this.$t('usdOrder.text47') // 审核不通过给用户退款失败
        } else if (type === 10) {
          return this.$t('usdOrder.text48') // 打款失败退款给用户
        } else if (type === 13) {
          return this.$t('usdOrder.text49') // 其他原因打款失败
        } else if (type === 12 && payStatus === 6) {
          return this.$t('usdOrder.text33') // 订单已完成
        } else if (type === 11) {
          return this.$t('usdOrder.text34') // 订单已取消
        }
      }
    },
    components: {
      problemCenter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .point
    cursor pointer
  .usd-problem
    padding-top: 70px;
    padding-left: 92px;
    max-width: 1070px;
    box-sizing: content-box;
    @media screen and (max-width: 1600px)
      padding: 0 50px
      max-width 100%
    @media screen and (max-width: 1200px)
      padding: 0
    #record-title
      a
        color #181818
    #fixed-top-header
      border-bottom none
    .mobile-money
      display: none
      color #181818
      padding: 80px 15px 0
      @media screen and (max-width 1200px)
        display: block
      .label-title
        font-size: 18px
      .moneys
        font-size: 24px
        margin: 20px 0 40px
        font-weight: bold
    #order-table
      margin: 60px 0
    .shensu-cont
      @media screen and (max-width 1200px)
        padding: 0 15px 50px
      .shensu-cont-w
        @media screen and (max-width 1200px)
          background-color: #edeff1
      .label-title
        font-size: 20px
        color #181818
        padding-left: 22px
        margin-bottom: 20px
        @media screen and (max-width 1200px)
          padding: 15px
          margin-bottom: 0
          font-size: 17px
          font-weight:bold
      .text-box
        position: relative
        .textarea
          width: 100%
          line-height: 1.3
          height 340px
          border-radius 4px
          font-size: 20px
          color #181818
          font-family "Microsoft YaHei UI"
          padding: 40px 50px
          box-sizing border-box
          background-color: #fafbfc;
          border: 1px solid #d9d9d9
          @media screen and (max-width 1200px)
            border none
            height: 200px
            background-color: #edeff1
            padding: 0 20px 20px 20px
        .warm-num
          font-size: 16px
          color #181818
          position: absolute
          z-index: 30
          right: 20px
          bottom: 19px
      .upload-wrapper
        position: relative;
        margin-top: 30px;
        display: flex;
        align-items center
        .img-lis
          width: 88px
          height: 88px
          position: relative
          margin-right: 50px
          margin-bottom: 20px
          cursor pointer
          border: 1px solid #d9d9d9
          border-radius 4px
          background-color: #fbfbfb
          &:last-child
            margin-right: 0
          @media screen and (max-width 1200px)
            margin-right: 20px
            width: 60px
            height: 60px
          img
            width: 100%
            height: 100%
          .delete
            width: 20px
            height: 20px
            position: absolute
            right: -10px
            top: -10px
            background: url("../../../../assets/images/myAccount/upload_delete.svg") no-repeat center / cover
        .img-loading-box
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          margin-right: 50px
          @media screen and (max-width 1200px)
            margin-right: 20px
            width: 60px
            height: 60px
          .img-loading
            display block
            width: 50px
            height: 50px
        .img-box
          width: 88px;
          height: 88px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px dashed #d9d9d9;
          position: relative;
          background-color: #fbfbfb
          border-radius 4px
          @media screen and (max-width 1200px)
            width: 60px
            height: 60px
          #upload_file
            position: absolute;
            top: 0;
            left: 0;
            width: 88px;
            height: 88px;
            display: block;
            cursor: pointer;
            opacity: 0;
            @media screen and (max-width 1200px)
              width: 60px
              height: 60px
          .text
            width: 44px
            height: 44px
            @media screen and (max-width 1200px)
              width: 20px
              height: 20px
            .upload_add
              display: block
              width:100%
              height:100%
      .err-class
        color: #fc534c;
        font-size: 16px;
    #btn-red-submit
      margin: 80px 0 150px
      @media screen and (max-width 1200px)
        margin: 0
        position: fixed
        left: 0
        bottom: 0
        width: 100%
</style>
