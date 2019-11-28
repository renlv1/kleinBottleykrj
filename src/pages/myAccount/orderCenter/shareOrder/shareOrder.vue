<template>
  <div class="share-container-haveopen">
    <!--共享交易-->
    <div>
      <h3 id="record-title">
        <span class="line"></span>
        <span>{{$t('shareOrderCenter.text8')}}</span>
      </h3>
      <!-- 移动端 头部 -->
      <div id="fixed-top-header" class="mobile-myAccount">
        <div class="myAccountHead up-box">
          <div class="Head-padding">
            <div class="left" @click="$router.push('/account/myAccount')"></div>
            <div class="center" @click="upBoxClose = !upBoxClose">{{currentOrder}}<i :class="{'close': upBoxClose}"></i></div>
            <div class="right"></div>
          </div>
          <div class="headUpBox" :class="{'close': upBoxClose}">
            <ul>
              <li @click="clickOne(item, index)" v-for="(item, index) in orderChange" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- pc端-->
    <div class="share-w">
      <div class="search-w">
        <div class="search-form">
          <div class="input-item"><input type="text" class="tradingCenter-input" :placeholder="$t('shareOrderCenter.text9')" v-model="orderId"></div>
          <div class="search" @click="searchOrder">
            <div class="icon-fangdajing"></div><span>{{$t('shareOrderCenter.text10')}}</span>
          </div>
        </div>
        <div class="setting" @click="$router.push('/account/notOpenShareOrder/shareOrder/shareSetting')">{{$t('shareOrderCenter.text11')}}</div>
      </div>
      <div class="btn-w">
        <div class="btn-switch">
          <div class="btn" @click="orderStatus(0)" :class="{'btn-checked': currentIndex === 0}">{{$t('sieOrder.text2')}}（
            <span v-if="numTotal">{{numTotal.countdoing}}</span>
            <span v-else>0</span>）
          </div>
          <div class="btn" @click="orderStatus(1)" :class="{'btn-checked': currentIndex === 1}">{{$t('usdOrder.text40')}}（
            <span v-if="numTotal">{{numTotal.countdo}}</span>
            <span v-else>0</span>）
          </div>
        </div>
        <div class="select" @click="isSelectShow = !isSelectShow">
          <div class="flex-item">
            <div>{{currentOrder}}</div>
            <div class="img-box"><img src="../../../../assets/images/myAccount/row.svg" alt="" :class="{'rotate-img': isSelectShow}"></div>
          </div>
          <ul class="select-uls" :class="{'maxheigt': isSelectShow}" @click.stop>
            <li v-for="(item, index) in orderChange" :key="index" class="select-list" @click="selectOne(item, index)">{{item}}</li>
          </ul>
        </div>
      </div>
      <table id="commonTableList">
        <thead>
          <tr>
            <td>{{$t('shareOrderCenter.text14')}}</td>
            <td class="moneys">{{$t('usdOrder.text6')}}<br>( <span class="red-text">{{$t('usdMoney.text63')}}</span>)</td>
            <td class="time">{{$t('orderDetail.text4')}}</td>
            <td v-if="Number(isChongzhi) === 1">{{$t('usdTixian.text25')}}</td>
            <td v-if="Number(isChongzhi) === 2">{{$t('usdTixian.text27')}}</td>
            <td>{{$t('usdTixian.text26')}}</td>
            <td>{{$t('shareOrderCenter.text15')}}</td>
            <td>{{$t('usdOrder.text9')}}</td>
          </tr>
        </thead>
        <tbody>
          <!--充值-->
          <tr class="cursor" v-for="(item, index) in orderData" :key="index" @click="shareDatails(item.id)" v-if="Number(isChongzhi) === 1">
            <td>{{item.id}}</td>
            <td class="moneys" v-if="item.depositCurrency === 'BTC'"><span class="red-text">{{item.receiveAmount | eightNumber}} {{item.depositCurrency}} </span></td>
            <td class="moneys" v-if="item.depositCurrency !== 'BTC'"><span class="red-text">{{item.receiveAmount | fourNumber}} {{item.depositCurrency}} </span></td>
            <td class="time" v-show="item.createAt">{{$changeDate(item.createAt, '/', 8)}}</td>
            <td v-if="item.depositCurrency === 'BTC'">{{item.giveAccount}}</td>
            <td v-if="item.depositCurrency !== 'BTC'">{{item.giveRealName}}</td>
            <td>{{item.username}}</td>
            <td>{{payStatus(item.status, item.payStatus, item.problemStatus)}}</td>
            <td class="handle">{{$t('usdMoney.text60')}}</td>
          </tr>
          <!--提现-->
          <tr class="cursor" v-for="(item, index) in orderData" :key="index" @click="shareDatails(item.id)" v-if="Number(isChongzhi) === 2">
            <td>{{item.id}}</td>
            <td class="moneys" v-if="item.drawCurrency === 'BTC'"><span class="red-text">{{item.receiveAmount | eightNumber}} {{item.drawCurrency}}</span></td>
            <td class="moneys" v-if="item.drawCurrency !== 'BTC'"><span class="red-text">{{item.receiveAmount | fourNumber}} {{item.drawCurrency}}</span></td>
            <td class="time" v-show="item.createAt">{{$changeDate(item.createAt, '/', 8)}}</td>
            <td v-if="item.payCurrency !== 'BTC'">{{JSON.parse(item.drawBankAccount).realname}}</td>
            <td v-if="item.payCurrency === 'BTC'">{{item.userAddress}}</td>
            <td>{{item.username}}</td>
            <td>{{payStatus(item.status, item.payStatus, item.problemStatus)}}</td>
            <td class="handle">{{$t('usdMoney.text60')}}</td>
          </tr>
          <div  v-show="orderData.length === 0" class="queryErr">{{$t('activityLogDetail.text13')}}</div>
        </tbody>
      </table>
      <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage"></v-turnPage>
    </div>
    <!-- 移动端 订单详情-->
    <div class="mobile-share-w">
      <div class="btn-switch">
        <div class="btn" @click="orderStatus(0)" :class="{'btn-checked': currentIndex === 0}">{{$t('sieOrder.text2')}}（
          <span v-if="numTotal">{{numTotal.countdoing}}</span>
          <span v-else>0</span>）
        </div>
        <div class="btn" @click="orderStatus(1)" :class="{'btn-checked': currentIndex === 1}">
          {{$t('usdOrder.text40')}}（
          <span v-if="numTotal">{{numTotal.countdo}}</span>
          <span v-else>0</span> ）
        </div>
      </div>
      <div class="order-details">
        <ul>
          <!--充值-->
          <li class="order-list" v-for="(item, index) in orderData" :key="index" @click="shareDatails(item.id)" v-if="Number(isChongzhi) === 1">
            <p class="flex-p margin-p">
              <span>{{$t('sieOrderDetail.text20')}}：{{item.id}}</span>
              <span class="time" v-show="item.createAt">{{$changeDate(item.createAt)}}</span>
            </p>
            <p class="flex-p">
              <span><span class="chongzhi">{{$t('rechargeRecord.text5')}}</span>：{{item.receiveAmount}} {{item.depositCurrency}}</span>
              <span>{{payStatus(item.status, item.payStatus, item.problemStatus, item.problemId, item.id)}}</span>
            </p>
          </li>
          <!--提现-->
          <li class="order-list" v-for="(item, index) in orderData" :key="index" @click="shareDatails(item.id)" v-if="Number(isChongzhi) === 2">
            <p class="flex-p margin-p">
              <span>{{$t('sieOrderDetail.text20')}}：{{item.id}}</span>
              <span class="time" v-show="item.createAt">{{$changeDate(item.createAt)}}</span>
            </p>
            <p class="flex-p">
              <span v-if="item.drawCurrency === 'BTC'"><span class="chongzhi">{{$t('usdTixian.text2')}}</span>：{{item.receiveAmount | eightNumber}} {{item.drawCurrency}}</span>
              <span v-if="item.drawCurrency !== 'BTC'"><span class="chongzhi">{{$t('usdTixian.text2')}}</span>：{{item.receiveAmount | fourNumber}} {{item.drawCurrency}}</span>
              <span>{{payStatus(item.status, item.payStatus, item.problemStatus, item.problemId, item.id)}}</span>
            </p>
          </li>
        </ul>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage2"></v-turnPage>
      </div>
      <div class="setting-btn" @click="$router.push('/account/notOpenShareOrder/shareOrder/shareSetting')">
        <span>{{$t('shareOrderCenter.text16')}}</span>
        <span class="more-icon"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      upBoxClose: false,
      isSelectShow: false,
      orderChange: [this.$t('shareOrderCenter.text12'), this.$t('shareOrderCenter.text13')],
      currentOrder: this.$t('shareOrderCenter.text12'),
      currentIndex: 0,
      totalPage: 1,
      orderId: '',
      numTotal: '',
      orderData: [],
      currentPage: 1, // 第几页
      isChongzhi: '1',
      isStatus: '1',
      flagIndex: 0
    }
  },
  created () {
    this.getBossOrder(1)
  },
  mounted () {
    setTimeout(() => {
      if (Number(this.$route.query.isStatus) > -1) {
        this.currentIndex = Number(this.$route.query.isStatus)
        this.currentPage = Number(this.$route.query.pageIndex)
        this.isChongzhi = Number(this.$route.query.isChongzhi)
        this.$refs.turnPage.resetPage(this.currentPage)
        this.$refs.turnPage2.resetPage(this.currentPage)
        let queryType
        if (Number(this.$route.query.isStatus) === 1) {
          queryType = 2
        } else {
          queryType = 1
        }
        this.postRequest('/boss/queryBossOrders', {
          type: Number(this.$route.query.isChongzhi),
          queryType: queryType,
          page: Number(this.$route.query.pageIndex),
          pagesize: '10'
        }).then(res => {
          if (res.data.success === true) {
            this.orderData = res.data.data
            this.numTotal = res.data.mapData
            if (this.currentIndex === 1) {
              this.totalPage = Math.ceil(res.data.mapData.countdo / 10)
            } else {
              this.totalPage = Math.ceil(res.data.mapData.countdoing / 10)
            }
          }
        })
      }
      if (this.$route.query.isChongzhi) {
        if (Number(this.$route.query.isChongzhi === 1)) {
          this.currentOrder = this.$t('shareOrderCenter.text12')
        } else {
          this.currentOrder = this.$t('shareOrderCenter.text13')
        }
      }
    }, 1000)
  },
  methods: {
    isChongZhiFlag () {
      if (this.flagIndex === 0) {
        return this.$t('usdMoney.text39')
      } else {
        return this.$t('usdOrder.text3')
      }
    },
    // 移动端 顶部下拉
    clickOne (item, index) {
      this.currentOrder = item
      this.upBoxClose = false
      this.flagIndex = index
      if (index === 1) {
        this.isChongzhi = 2
        this.orderData = []
        this.getBossOrder(1)
      } else {
        this.isChongzhi = 1
        this.orderData = []
        this.getBossOrder(1)
      }
      this.orderData = []
      this.$refs.turnPage2.resetPage(1)
    },
    // 查询老板订单
    getBossOrder (page) {
      let queryType
      if (this.currentIndex === 1) {
        queryType = '2'
      } else {
        queryType = '1'
      }
      this.postRequest('/boss/queryBossOrders', {
        type: this.isChongzhi,
        queryType: queryType,
        page: page,
        pagesize: '10'
      }).then(res => {
        if (res.data.success === true) {
          this.orderData = res.data.data
          this.numTotal = res.data.mapData
          if (this.currentIndex === 1) {
            this.totalPage = Math.ceil(res.data.mapData.countdo / 10)
          } else {
            this.totalPage = Math.ceil(res.data.mapData.countdoing / 10)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // pc 下拉框选择
    selectOne (item, index) {
      this.isSelectShow = false
      this.currentOrder = item
      this.flagIndex = index
      if (index === 1) {
        this.isChongzhi = 2
        this.orderData = []
        this.getBossOrder(1)
      } else {
        this.isChongzhi = 1
        this.orderData = []
        this.getBossOrder(1)
      }
      this.$refs.turnPage.resetPage(1)
      this.$refs.turnPage2.resetPage(1)
    },
    // 搜索
    searchOrder () {
      let dataObj = {
        type: this.isChongzhi,
        page: '1'
      }
      if (this.orderId.trim() !== '') {
        dataObj.orderid = this.orderId
      }
      this.orderData = []
      this.postRequest('/boss/queryBossOrders', dataObj).then(res => {
        if (res.data.success === true) {
          this.totalPage = Math.ceil(res.data.mapData.countdoing / 10)
          this.orderData = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    orderStatus (index) {
      this.currentPage = 1
      this.currentIndex = index
      if (index === 1) {
        this.isStatus = 2
        this.orderData = []
        this.getBossOrder(1)
      } else {
        this.isStatus = 1
        this.orderData = []
        this.getBossOrder(1)
      }
      this.$refs.turnPage.resetPage(1)
      this.$refs.turnPage2.resetPage(1)
    },
    // 分页
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this.getBossOrder(page)
    },
    shareDatails (id) {
      if (Number(this.isChongzhi) === 1) {
        this.$router.push({
          path: '/account/notOpenShareOrder/shareOrder/shareSetting/shareOrderDetails',
          query: {id: id, isChongzhi: 1, isStatus: this.currentIndex, pageIndex: this.currentPage}
        })
      } else {
        this.$router.push({
          path: '/account/notOpenShareOrder/shareOrder/shareSetting/tiXianShareOrder',
          query: {id: id, isChongzhi: 2, isStatus: this.currentIndex, pageIndex: this.currentPage}
        })
      }
    },
    payStatus (type, payStatus, proStatus, problemId, id) {
      if (Number(this.isChongzhi) === 2) {
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
          return this.$t('usdOrder.text_37') // 等待完成打款
        } else if (type === 5 && payStatus === 4) {
          return this.$t('usdOrder.text_38') // 等待确认收款
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
      } else {
        if (type === 1) { // 充值
          return this.$t('usdMoneyStatus.text1') // 待接单
        } else if (type === 2) {
          return this.$t('usdMoneyStatus.text2') // 拒绝接单
        } else if (type === 3 && payStatus === 3) {
          return this.$t('usdMoneyStatus.text0') // 等待用户打款
        } else if (type === 4) {
          return this.$t('usdMoneyStatus.text4') // 订单已取消
        } else if (type === 3 && payStatus === 4 && proStatus === null) {
          return this.$t('usdMoneyStatus.text29') // 等待确认收款
        } else if (type === 5 && payStatus === 6) {
          return this.$t('usdMoneyStatus.text6') // 订单已完成
        } else if (type === 3 && payStatus === 5 && proStatus === null) {
          return this.$t('usdMoneyStatus.text7') // 等待系统处理中
        } else if ((proStatus !== null && (proStatus === 0 || proStatus === 1)) || problemId) {
          return this.$t('usdMoneyStatus.text8') // 申诉中
        } else if (proStatus !== null && proStatus === 2) {
          return this.$t('usdMoneyStatus.text9') // 申诉已处理
        }
      }
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
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.red-text
  color #FC534C
.queryErr
  color: #e60000;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
.share-container-haveopen
  padding-top: 70px;
  padding-left: 92px;
  max-width: 1070px;
  box-sizing content-box
  @media screen and (max-width 1600px)
    padding-left: 50px
    padding-right: 50px
  @media screen and (max-width 1200px)
    padding: 0
    max-width 100%
  #fixed-top-header
    @media screen and (max-width 1200px)
      border-bottom: none
  .share-w
    color #181818
    margin-bottom: 100px
    @media screen and (max-width 1200px)
      display none
    @media screen and (min-width 1200px)
      display block
    .search-w
      display flex
      align-items center
      font-size: 20px
      height: 58px
      margin: 60px 0 50px
      .search-form
        flex 1
        display flex
        align-items center
        .input-item
          flex 1
          .tradingCenter-input
            border-radius 4px 0 0 4px
            height: 58px
            width: 100%
            display: block
            border: 1px solid #d7d9db
            border-right none
            padding: 0 40px
            box-sizing border-box
        .search
          border-radius 0 4px 4px 0
          cursor pointer
          width: 128px
          height: 58px
          display: flex
          align-items center
          justify-content center
          background-color: #fc534c
          color #fff
          font-size: 20px
          .icon-fangdajing
            width: 22px
            height: 22px
            margin-right: 10px
            background: url("../../../../assets/images/myAccount/orderTrade/fangdajing.svg") no-repeat center
      .setting
        width: 200px
        height: 100%
        margin-left: 30px
        background-color: #edeff1
        cursor pointer
        display: flex
        align-items center
        justify-content center
        border-radius 4px
    .btn-w
      display flex
      align-items center
      justify-content space-between
      margin-bottom: 60px
      .select
        cursor pointer
        width: 218px
        height: 58px
        display: flex
        align-items center
        justify-content center
        background-color: #fc534c
        color #fff
        position: relative
        .flex-item
          display flex
          align-items center
          .img-box
            margin-left: 10px
            width: 9px
            height: 14px
            img
              transform rotate(90deg)
              width: 100%
              height: 100%
              display block
              transition transform .3s linear
              &.rotate-img
                transform rotate(-90deg)
        .select-uls
          cursor pointer
          position: absolute
          top: 100%
          left: 0
          width: 100%
          background-color: #f0f2f5
          max-height 0
          overflow: hidden
          transition max-height .3s linear
          &.maxheigt
            max-height 200px
          .select-list
            width: 100%
            height: 40px
            display flex
            align-items center
            justify-content center
            font-size: 16px
            color #181818
    .btn-switch
      display flex
      align-items center
      margin-bottom: 0
      .btn
        border-radius 4px
        cursor pointer
        width: 218px
        height: 58px
        display: flex
        align-items center
        justify-content center
        color #181818
        background-color: #edeff1
        &:nth-child(1)
          margin-right: 30px
      .btn-checked
        background-color: #fc534c
        color #fff
  .mobile-share-w
    padding: 80px 15px 0
    @media screen and (max-width 1200px)
      display block
    @media screen and (min-width 1200px)
      display none
    .btn-switch
      width: 100%
      display: flex
      align-items center
      border: 1px solid #032e43
      border-radius 4px
      margin-bottom: 30px
      .btn
        flex 1
        height: 46px
        background-color: #fff
        color #032e43
        display: flex
        align-items center
        justify-content center
        cursor pointer
        &.btn-checked
          background-color: #032e43
          color #fff
        &:nth-child(1)
          border-radius 4px 0 0 4px
        &:nth-child(2)
          border-radius 0 4px 4px 0
    .order-details
      margin-bottom: 80px
      .order-list
        padding: 10px 20px
        &:nth-child(odd)
          background-color: #edeff1
        &:nth-child(even)
          background-color: #fbfbfb
        @media screen and (max-width 1200px)
          padding: 10px
        .flex-p
          display flex
          align-items center
          justify-content space-between
          font-size: 14px
          color #181818
          .time
            color #999
          .chongzhi
            color #fc534c
        .margin-p
          margin-bottom: 6px
    .setting-btn
      width: 100%
      height: 50px
      position: fixed
      bottom: 0
      left: 0
      background-color: #032e43
      color #fff
      font-size: 16px
      display flex
      align-items center
      justify-content space-between
      padding: 0 30px
      cursor pointer
      .more-icon
        width: 9px
        height: 14px
        background: url("../../../../assets/images/myAccount/row.svg") no-repeat center
  #commonTableList
    padding: 60px 0 0
    border-top: 1px dashed #BBBBBB
    margin: 0
    thead
      tr
        background-color: #edeff1
      .moneys
        flex 1
      td
        flex 1
        word-break: break-all;
        word-wrap: break-word;
    tbody
      tr
        &:nth-child(even)
          background-color: #edeff1
        &:nth-child(odd)
          background-color: #fbfbfb
      td
        flex 1
        word-break: break-all;
        word-wrap: break-word;
      .moneys
        flex 1
        color #181818
</style>
