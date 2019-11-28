<template>
  <div class="transferRecordDetail">
    <div class="pc">
      <div class="pc-content">
        <div class="property-title">
          <h6><router-link to="/account/transferRecord/transferRecords" class="property">{{sendCurrency}}{{$t('usdOrder.text2')}} > </router-link><span class="transfer">{{$t('sieOrder.text24')}}</span></h6>
        </div>
        <!--内部转账-->
        <table class="pcTableDetial">
          <tr>
            <td>{{$t('usdOrder.text5')}}</td>
            <td>{{id}}</td>
          </tr>
          <tr>
            <td>{{$t('sieTransfer.text1')}}</td>
            <td>{{sendCurrency}} {{recordTypeTransToText(recordType)}}</td>
          </tr>
          <tr>
            <td>{{$t('sieTransfer.text4')}}</td>
            <td>{{totalValue | eightNumber}} {{sendCurrency}}</td>
          </tr>
          <tr>
            <td>{{$t('sieOrderDetail.text4')}}</td>
            <td>{{ordState(orderStatus, recordType)}}</td>
          </tr>
          <tr>
            <td>{{$t('sieOrderDetail.text24')}}</td>
            <td v-show="transactionTime">{{$changeDate(transactionTime, '/')}}</td>
          </tr>
          <!--收款账户 2和4转出 -->
          <tr v-if="receiveName === 'null'">
            <td>{{$t('sieOrderDetail.text25')}}{{recordType}}</td>
            <td>{{receiveName}}</td>
          </tr>
          <!--转出账户 1和3 转入-->
          <tr v-if="recordType === 3 || recordType === 1">
            <td>{{$t('sieOrderDetail.text26')}}</td>
            <td v-show="sendName">{{sendName}}</td>
            <td v-show="!sendName">-</td>
          </tr>
          <!--收款地址-->
          <tr v-if="receiveWalletAddress === 'null'">
            <td>{{$t('sieOrderDetail.text27')}}</td>
            <td>{{receiveWalletAddress}}</td>
          </tr>
          <!--转出地址-->
          <tr v-if="recordType === 3 || recordType === 1">
            <td>{{$t('sieOrder.text25')}}</td>
            <td>{{sendAddress}}</td>
          </tr><!--&lt;!&ndash;第三方转入地址&ndash;&gt;-->
          <!-- hash -->
          <tr v-if="orderStatus === 23">
            <td>hash</td>
            <td>{{hash}}</td>
          </tr><!--&lt;!&ndash;第三方转入地址&ndash;&gt;-->
        </table>
      </div>
    </div>
    <div class="mobile">
      <div class="management-head">
        <div class="head">
          <div class="back" @click="$router.push('/account/transferRecord/transferRecords')"></div>
          <div class="title">{{$t('sieOrder.text24')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="mobile-content">
        <div class="transfer-money">
          <h6>{{$t('sieTransfer.text4')}}:</h6>
          <p><span>{{totalValue | eightNumber}} </span> {{sendCurrency}}</p>
        </div>
        <div class="dashed-line"></div>
        <div class="mobile-box">
          <ul>
            <li>
              <span>{{$t('sieTransfer.text1')}}:</span><i>{{sendCurrency}} {{recordTypeTransToText(recordType)}}</i>
            </li>
            <li>
              <span>{{$t('sieOrderDetail.text4')}}:</span><i>{{ordState(orderStatus, recordType)}}</i>
            </li>
            <!--收款账户-->
            <li v-if="receiveName === 'null'">
              <span>{{$t('sieOrderDetail.text25')}}:</span><i>{{receiveName}}</i>
            </li>
            <!--转出账户-->
            <li v-if="recordType === 1 || recordType === 3">
              <span>{{$t('sieOrderDetail.text26')}}:</span><i v-show="sendName">{{sendName}}</i><i v-show="!sendName">-</i>
            </li>
            <!--收款地址-->
            <li v-if="receiveWalletAddress === 'null'">
              <span>{{$t('sieOrderDetail.text27')}}:</span><i>{{receiveWalletAddress}}</i>
            </li>
            <!--第三方转出收款地址-->
            <!--<li v-if="recordType === 2">-->
            <!--<span>{{$t('sieOrderDetail.text27')}}:</span><i>{{address}}</i>-->
            <!--</li>-->
            <!--内部转入地址-->
            <li v-if="recordType === 3 || recordType === 1">
              <span>{{$t('sieOrder.text25')}}:</span><i>{{sendAddress}}</i>
            </li>
            <!--第三方转入地址-->
            <!--<li v-if="recordType === 1">-->
            <!--<span>{{$t('sieOrderDetail.text28')}}:</span><i>{{address}}</i>-->
            <!--</li>-->
            <li>
              <span v-show="transactionTime">{{$t('usdOrder.text7')}}:</span><i>{{$changeDate(transactionTime, '/')}}</i>
            </li>
            <li v-if="orderStatus === 23">
              <span>hash:</span><i>{{hash}}</i>
            </li><!--&lt;!&ndash;第三方转入地址&ndash;&gt;-->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        transferList: [], // 转账列表
        pageSize: 10,
        id: this.$route.query.id,
        orderStatus: '', // 订单状态
        totalValue: '', // 转账金额
        transactionTime: '', // 转账时间
        recordType: '', // 转账类型
        receiveWalletAddress: '', // 收款地址
        sendCurrency: '',
        address: '', // 第三方转入地址
        receiveName: '', // 收款账户
        sendAddress: '', // 转入地址
        sendName: '', // 转出账户
        hash: ''
      }
    },
    created () {
      this.getTransferList()
    },
    mounted() {
      var that = this
      window.onresize = function () {
        that.routeRedirect() // 解决PC端空白问题
      }
    },
    methods: {
      routeRedirect () {
        if (window.innerWidth > 1200 && this.$route.path === '/transferRecord/transferRecords/transferRecordDetail') {
          this.$router.push({
            path: '/account/transferRecord/transferRecords/transferRecordDetail',
            query: {
              id: this.$route.query.id
            }
          })
        }
      },
      getTransferList () {
        let url = `${this.$api}/transferRecord/transferToRecordById?id=${this.$route.query.id}`
        this.$http.post(url).then(res => {
          if (res.data.success) {
            let rest = res.data.data
            // console.log(rest.id)
            this.id = rest.id
            this.orderStatus = rest.status
            this.totalValue = rest.enterPrice
            this.transactionTime = rest.transactionTime
            this.recordType = rest.recordType
            this.receiveWalletAddress = rest.receiveUserAddress
            // console.log(this.receiveWalletAddress === null)
            this.sendCurrency = rest.sendCurrency
            this.receiveName = rest.receiveUserName
            this.sendAddress = rest.sendAddress
            this.sendName = rest.sendName
            this.address = rest.address
            this.hash = rest.failureCause
          }
        }).catch(err => {
          console.log(err)
        })
      },
      recordTypeTransToText(num) {
        // console.log(num)
        if (num === 1) {
          return this.$t('sieOrder.text19')
        } else if (num === 2 || num === 'INNER_TRANSFER') {
          return this.$t('sieOrder.text20')
        } else if (num === 3) {
          return this.$t('sieOrder.text21')
        } else if (num === 4) {
          return this.$t('sieOrder.text22')
        } else if (num === '5') {
          return '购买的SIE'
        }
      },
      // 订单状态
      ordState (val, type) {
        if (val === 1) {
          return this.$t('sieOrder.text1')
        } else if (val === 2) {
          return this.$t('sieOrder.text2')
        } else if (val === 3) {
          return this.$t('sieOrder.text3')
        } else if (val === 4) {
          return this.$t('sieOrder.text4')
        } else if (val === 5) {
          return this.$t('sieOrder.text5')
        } else if (val === 6) {
          return this.$t('sieOrder.text6')
        } else if (val === 7) {
          return this.$t('sieOrder.text7')
        } else if (val === 8) {
          return this.$t('sieOrder.text8')
        } else if (val === 9 || (val === 17)) {
          return this.$t('sieOrder.text9')
        } else if ((val === 10 || val === 11 || val === 12 || val === 18 || val === 20)) { // 10,11,12,18 显示为 "处理中"
          return this.$t('sieOrder.text10')
        } else if (val === 13) {
          if (type === 3) {
            return this.$t('sieOrder.text11')
          }
          return this.$t('sieOrder.text12')
        } else if ((val === 14 || val === 15 || val === 19)) { // 14,15,19 显示为"转出失败"
          if (type === 3) {
            return this.$t('sieOrder.text13')
          }
          return this.$t('sieOrder.text14')
        } else if (val === 16) {
          return this.$t('sieOrder.text15')
        } else if (val === 17) {
          return this.$t('sieOrder.text16')
        } else if (val === 18) {
          return this.$t('sieOrder.text17')
        } else if (val === 19) {
          return this.$t('sieOrder.text18')
        } else if (val === 22) {
          return this.$t('sieTransfer.text18')
        } else if (val === 23) {
          return this.$t('sieTransfer.text17')
        }
      },
      // 转账类型
      tradeType (val) {
        if (val === 1) {
          return this.$t('sieMoney.text15')// 转入
        } else if (val === 2) {
          return this.$t('sieMoney.text16') // 转出到第三方
        } else if (val === 3) {
          return this.$t('sieMoney.text15') // 转入(内部转入)
        } else if (val === 4) {
          return this.$t('sieMoney.text16') // 内部转出
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .transferRecordDetail
    .pc-content
      margin-left 92px
      margin-right 20px
      max-width 1070px
      .property-title
        margin-bottom 60px
        h6
          background-color #edeff1;
          height: 64px;
          font-size:20px;
          color: #181818;
          align-items: center;
          display: flex;
          &:before
            content: '';
            width: 10px;
            height: 22px;
            display: inline-block;
            background-color: #000;
            margin-right: 28px;
          a
            font-size:20px;
            color: #181818;
    .mobile-content
      padding 0 20px
      .transfer-money
        h6
          font-size 14px
          color #181818
          margin-bottom 10px
        p
          font-size 18px
      .dashed-line
        height 1px
        width 100%
        // background-image: url("../../../../assets/images/aiChat/dottedLine.png");
        margin-top 30px
      .mobile-box
        padding-top 30px
        ul
          li
            display flex
            justify-content space-between
            align-items center
            padding 0 10px
            height 50px
            font-size 12px
            color #181818
            &:nth-child(odd)
              background-color #edeff1
            &:nth-child(even)
              background-color #fafafa
            span
              width 50%
              display flex
            i
              overflow hidden
              word-break break-all
</style>
