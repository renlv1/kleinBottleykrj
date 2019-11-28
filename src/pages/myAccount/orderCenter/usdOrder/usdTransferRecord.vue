<template>
  <div class="usdTransferRecord">
    <div class="mobile">
      <div class="management-head">
        <div class="head">
          <div class="back" @click="$router.push('/account/usdOrder')"></div>
          <div class="title">USD{{$t('sieMoney.text10')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="mobile-box">
        <ul>
          <li v-for="(item,index) in transferList" :key="index"   class="cursor" @click="toTransfer(item)">
            <div class="left-dc">
              <div class="number">{{$t('newAdd.text3')}}: {{item.id}}</div>
              <div class="time">{{$changeDate(item.transactionTime, '/')}}</div>
            </div>
            <div class="right-dc">
              <div class="transfer-money">{{recordType(item.recordType)}}{{$t('danAI.text30')}}: {{item.totalValue | fourNumber}} USD</div>
              <div class="status">{{orderStatus(item.orderStatus, item.recordType)}}</div>
            </div>
          </li>
          <div v-if="transferList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
          <v-turnPage v-if="transferList.length !== 0" :propsPage="transferTotal" @transferTrun="transferTurnPage"></v-turnPage>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderTab: parseInt(this.$route.query.orderTab) || 1, // 1转账 2交易
      sieTradeList: [], // 交易列表
      transferList: [], // 转账列表
      sieTradeTotal: 1, // 查看交易总页数
      transferTotal: 1, // 查看转账总页数
      transferPage: '',
      sieTradeNowPage: '',
      pageSize: 10
    }
  },
  mounted () {
    let self = this
    window.onresize = function () {
      self.getPathSelf()
    }
    this.getTransferList(1)
  },
  methods: {
    // 转账列表
    getTransferList (page) {
      let url = `${this.$api}/transferRecord/transferToRecordList?page=${page}&pageSize=${this.pageSize}&type=3`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          // console.log(res.data)
          this.transferList = res.data.data.transferRecordVoList
          this.transferTotal = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    orderStatus (val, type) {
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
      }
    },
    recordType (val) {
      if (val === 1) {
        return this.$t('sieMoney.text15')// 转入
      } else if (val === 2) {
        return this.$t('sieMoney.text16') // 转出到第三方
      } else if (val === 3) {
        return this.$t('sieMoney.text15') // 转入(内部转入)
      } else if (val === 4) {
        return this.$t('sieMoney.text16') // 内部转出
      }
    },
    // 跳转转账详情
    toTransfer (item) {
      this.$router.push({
        path: '/account/usdOrder/usdTransferDetail',
        query: {
          id: item.id,
          orderStatus: item.orderStatus,
          totalValue: item.totalValue,
          recordType: item.recordType,
          transactionTime: item.transactionTime,
          receiveWalletAddress: item.receiveWalletAddress,
          sendCurrency: item.sendCurrency,
          receiveName: item.receiveName,
          sendName: item.sendName,
          sendAddress: item.sendAddress
        }
      })
    },
    getPathSelf () {
      if (this.$route.path === '/account/usdTransferRecord') {
        if (window.innerWidth > 1200) {
          this.$router.push('/account/usdOrder')
        }
      }
    },
    transferTurnPage (page) {
      this.transferPage = page
      this.getTransferList(page)
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
    vLoading: resolve => require(['@/components/loading.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .usdTransferRecord
    .pc
      @media screen and (max-width: 1200px) {
        display: none;
      }
      .pc-content
        margin-left 92px
        margin-right 20px
        max-width 1070px
        .order-title
          margin-bottom 60px
          h6
            background-color #edeff1;
            height: 64px;
            font-size:22px;
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
        .order-content
          .order-tab
            display flex
            width 100%
            margin-bottom 50px
            li
              width 240px
              height 58px
              line-height 56px
              text-align center
              background-color #edeff1
              border-radius 4px
              margin-left 20px
              font-size 20px
              color #181818
              cursor pointer
              user-select none
              &:first-child
                margin-left 0
              &.tabActive
                background-color #fc534c
                color #fff
          .dotted-line
            border-bottom 1px dashed #b3b3b3
          .commonTableList
            padding: 0
            margin-left: 0
            margin-top 50px
    .mobile
      @media screen and (max-width: 1200px) {
        display: block;
      }
      .mobile-box
        padding 0 10px
        ul
          li
            padding 0 10px
            font-size 12px
            height 60px
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
              .time
                color #999
            .right-dc
              display flex
              justify-content space-between
              align-items center
              .time
                margin-bottom 10px
                color #999
              .status
                color #171717
                text-align right

</style>
