<template>
  <div class="mobile">
    <div class="management-head">
      <div class="head">
        <div class="back" @click="$router.push('/account/AssetManagement/ETHAsset')"></div>
        <div class="title">ETH{{$t('sieMoney.text10')}}</div>
        <div class="right"></div>
      </div>
    </div>
    <div class="mobile-box">
      <ul>
        <li v-for="(item,index) in transferList" :key="index" class="cursor" @click="toTransferDetail(item)">
          <div class="left-dc">
            <div class="number">{{$t('newAdd.text3')}}: {{item.id}}</div>
            <div class="time">{{$changeDate(item.transactionTime, '/')}}</div>
          </div>
          <div class="right-dc">
            <div class="transfer-money">{{recordTypeTransToText(item.recordType)}}{{$t('danAI.text30')}}: {{item.amount |
              fourNumber}} {{item.sendCurrency}}
            </div>
            <div class="status">{{orderStatus(item.orderStatus, item.recordType)}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="noData" class="error">{{$t('orderManage.text8')}}</div>
    <v-turn-page style="margin-top: 30px" v-if="!noData" :propsPage="totalPage"
                @transferTrun="transferTurnPage"></v-turn-page>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        noData: false,
        transferList: [],
        totalPage: 0,
        pageSize: 10
      }
    },
    created() {
      this.getRecord(1)
    },
    mounted() {
      var that = this
      window.onresize = function () {
        that.routeRedirect() // 解决PC端空白问题
      }
    },
    methods: {
      routeRedirect () {
        if (window.innerWidth > 1200 && this.$route.path === '/account/AssetManagement/ETHAsset/ETHTrans') {
          this.$router.push('/account/transferRecord/transferRecords')
        }
      },
      getRecord(page) {
        let url = `${this.$api}/transferRecord/transferToRecordInnerList?page=${page}&pageSize=${this.pageSize}&type=2&tradeType=`
        this.$http.post(url).then(res => {
          if (res.data.success) {
            this.transferList = res.data.data.transferRecordVoList
            this.totalPage = res.data.data.totalPage
            if (this.transferList === '' || this.transferList.length === 0) {
              this.noData = true
            } else {
              this.noData = false
            }
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
      recordTypeTransToText (val) {
        if (val === 1) {
          return this.$t('sieOrder.text19') // 转入
        } else if (val === 2) {
          return this.$t('sieOrder.text20') // 转出到第三方
        } else if (val === 3) {
          return this.$t('sieOrder.text21') // 转入(内部转入)
        } else if (val === 4) {
          return this.$t('sieOrder.text22') // 内部转出
        } else if (val === 5) {
          return this.$t('sieOrder.text23') // 购买SIE
        }
      },
      transferTurnPage (page) {
        this.getRecord(page)
      },
      toTransferDetail (item) {
        this.$router.push({
          path: '/account/transferRecord/transferRecords/transferRecordDetail',
          query: {
            id: item.id
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
