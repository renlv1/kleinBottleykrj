<template>
  <div>
    <div class="pc">
      <div class="content-right">
        <div class="content-right-title">{{$t('newAdd.text4')}}</div>
        <div class="choose-wrapper">
          <div class="currency filterBox">
            <div class="left">{{$t('newAdd.text5')}}</div>
            <div class="right" @click="dropDownToggle(1)">
              <p>{{curCurrency}}<i class="{'close' toggle1}"></i></p>
              <ul :style="{'height': ulHeight1 + 'px'}">
                <li v-for="(item, index) in curOption" :key="index" @click="selectOption(1, item)">{{item.text}}</li>
              </ul>
            </div>
          </div>
          <div class="type filterBox">
            <div class="left">{{$t('exchanges.text2')}}</div>
            <div class="right" @click="dropDownToggle(2)">
              <p>{{curType}}<i class="{'close' toggle2}"></i></p>
              <ul :style="{'height': ulHeight2 + 'px'}">
                <li v-for="(item, index) in typeOption" :key="index" @click="selectOption(2, item)">{{item.text}}</li>
              </ul>
            </div>
          </div>
        </div>
        <table class="commonTableList" id="commonTableList">
          <thead>
          <h6>{{$t('exchanges.text1')}}</h6>
          <tr>
            <td>{{$t('exchanges.text3')}}</td>
            <td>{{$t('usdOrder.text6')}}</td>
            <td>{{$t('newAdd.text6')}}</td>
            <td>{{$t('sieOrderDetail.text3')}}</td>
            <td>{{$t('danAI.text24')}}</td>
            <td>{{$t('activityLog.text7')}}</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in robotOrder" :key="index" class="cursor"
              @click="toTransferDetail(item)">
            <td>{{item.id}}</td>
            <td>{{item.amount | eightNumber}} {{item.currency}}</td>
            <td>{{item.sendCurrency}}</td>
            <td>{{recordTypeTransToText(item.recordType)}}</td>
            <td>{{orderStatus(item.orderStatus, item.recordType)}}</td>
            <td style="color: #FC534C">{{$t('orderManage.text7')}}</td>
          </tr>
          </tbody>
          <div class="queryErr" v-if="noData">
            {{$t('orderManage.text8')}}
          </div>
        </table>
        <v-turnPage style="max-width: 1128px; margin-top: 30px" :propsPage="totalPage"
                    @orderLogTrunPage="parentTurnPage" v-if="!noData" ref="turnPage"></v-turnPage>
      </div>
    </div>
    <div class="mobile">
      <div class="management-head">
        <div class="head">
          <div class="back" @click="$router.push('/account/myAccount')"></div>
          <div class="title">{{$t('sieMoney.text3')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="tabs">
        <li class="tab" @click="dropDownToggle(1)">
          <p><span>{{curCurrency}}</span><img width="14" height="9"
                                              src="../../../assets/images/myAccount/pull.png"/>
          </p>
          <ul :style="{'height': ulMobileHeight1 + 'px'}">
            <li v-for="item in curOption" :key="item.index" @click="selectOption(1, item)">{{item.text}}</li>
          </ul>
        </li>
        <li class="tab" @click="dropDownToggle(2)">
          <p><span>{{curType}}</span><img width="14" height="9"
                                          src="../../../assets/images/myAccount/pull.png"/>
          </p>
          <ul :style="{'height': ulMobileHeight2 + 'px'}">
            <li v-for="item in typeOption" :key="item.index" @click="selectOption(2, item)">{{item.text}}</li>
          </ul>
        </li>
      </div>
      <ul class="transform-list">
        <li v-for="(item,index) in robotOrder" :key="index" class="cursor" @click="toTransferDetail(item)">
          <div class="left-dc">
            <div class="number">{{$t('newAdd.text3')}}: {{item.id}}</div>
            <div class="time">{{$changeDate(item.transactionTime, '/')}}</div>
          </div>
          <div class="right-dc">
            <div class="transfer-money">{{recordTypeTransToText(item.recordType)}}{{$t('danAI.text30')}}: {{item.amount
              |
              eightNumber}} {{item.sendCurrency}}
            </div>
            <div class="status">{{orderStatus(item.orderStatus, item.recordType)}}</div>
          </div>
        </li>
        <div v-if="noData" class="error">{{$t('orderManage.text8')}}</div>
      </ul>
      <button class="btn-transfer" @click="$router.push('/account/transfer')">{{$t('sieMoney.text3')}}</button>
    </div>
  </div>
</template>

<script>
  // $router.push({path:'/account/transferRecord/transferRecords/transferRecordDetail' ,query: {robotOrderId: item.id}})
  export default {
    data() {
      return {
        transferList: [],
        noData: false,
        robotOrder: [],
        totalPage: 0,
        pageSize: 10,
        ulHeight1: 0,
        ulHeight2: 0,
        ulMobileHeight1: 0,
        ulMobileHeight2: 0,
        type: '4',
        tradeType: '',
        curCurrency: this.$t('newAdd.text7'),
        curType: this.$t('newAdd.text8'),
        curOption: [
          {text: this.$t('newAdd.text7'), type: '4'},
          {text: 'SIE', type: '1'},
          {text: 'USD', type: '3'},
          {text: 'ETH', type: '2'},
          {text: 'BTC', type: '5'}
        ],
        typeOption: [
          {text: this.$t('newAdd.text8'), tradeType: ''},
          {text: this.$t('sieOrder.text21'), tradeType: '4'},
          {text: this.$t('sieOrder.text22'), tradeType: '3'},
          {text: this.$t('sieOrder.text19'), tradeType: '1'},
          {text: this.$t('sieOrder.text20'), tradeType: '2'}
        ]
      }
    },
    created() {
      this.getRecord(1)
    },
    destroyed() {
    },
    methods: {
      orderStatus(val, type) {
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
      // 跳转转账详情
      toTransferDetail(item) {
        this.$router.push({
          path: '/account/transferRecord/transferRecords/transferRecordDetail',
          query: {
            id: item.id
          }
        })
      },
      recordTypeTransToText(num) {
        if (num === 1) {
          return this.$t('sieOrder.text19')
        } else if (num === 2) {
          return this.$t('sieOrder.text20')
        } else if (num === 3) {
          return this.$t('sieOrder.text21')
        } else if (num === 4) {
          return this.$t('sieOrder.text22')
        } else if (num === 8) {
          return this.$t('sieTransfer.text19')
        } else if (num === 9) {
          return this.$t('sieTransfer.text20')
        }
      },
      dropDownToggle(n) {
        if (n === 1) {
          this.toggle1 = !this.toggle1
          if (!this.toggle1 || this.ulMobileHeight1 !== 0) {
            this.ulHeight1 = 0
            this.ulMobileHeight1 = 0
          } else {
            this.ulHeight1 = this.curOption.length * 44
            this.ulMobileHeight1 = this.curOption.length * 36
          }
        } else {
          this.toggle2 = !this.toggle2
          if (!this.toggle2 || this.ulMobileHeight2 !== 0) {
            this.ulHeight2 = 0
            this.ulMobileHeight2 = 0
          } else {
            this.ulHeight2 = this.typeOption.length * 44
            this.ulMobileHeight2 = this.typeOption.length * 36
          }
        }
      },
      selectOption(n, item) {
        if (n === 1) {
          this.curCurrency = item.text
          if (this.type === '') {
            this.type = '4'
          } else {
            this.type = item.type
          }
          // console.log(this.curCurrency, this.type)
        } else if (n === 2) {
          this.curType = item.text
          this.tradeType = item.tradeType
          // console.log(this.curType, this.tradeType)
        }
        this.getRecord(1)
      },
      getRecord(page) { // 获得订单记录列表
        var url = `${this.$api}/transferRecord/transferToRecordInnerList?page=${page}&pageSize=${this.pageSize}&type=${this.type}&tradeType=${this.tradeType}`
        this.$http.post(url).then(res => {
          if (res.data.success) {
            this.robotOrder = res.data.data.transferRecordVoList
            this.totalPage = res.data.data.totalPage
            if (this.robotOrder === '' || this.robotOrder.length === 0) {
              this.noData = true
            } else {
              this.noData = false
            }
          }
        }).catch(err => {
          console.log(err)
        })
        if (this.$refs.turnPage) {
          this.$refs.turnPage.resetPage(page)
        }
      },
      parentTurnPage(page) {
        this.currentPage = page
        this.getRecord(page)
      }
    },
    components: {
      vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .pc
    margin-top 0 !important
    @media screen and (max-width: 1200px)
      display none
    .content-right
      padding 130px 20px 0 90px
      @media screen and (max-width 1760px)
        padding 50px 20px 0 40px
      @media screen and (max-width 1200px)
        padding 50px 15px 0
      .content-right-title
        font-weight bold
      .choose-wrapper
        display flex
        flex-wrap wrap
        margin 68px 0 40px 0px
        max-width 1128px
        .filterBox
          height 54px
          width 300px
          display flex
          margin 0 80px 40px 0px
          /*margin-right 40px*/
          .left
            width 120px
            height 54px
            background #FC534C
            color #fff
            text-align center
            line-height 54px
          .right
            width 180px
            height 54px
            color #fff
            display flex
            border 1px solid #FC534C
            position relative
            justify-content center
            cursor pointer
            align-items center
            p
              color #FC534C
              font-size 16px
              width 180px
              height 52px
              line-height 52px
              margin-left 43px
              i
                position absolute
                right 20px
                top 50%
                display block
                width 10px
                height 10px
                border-bottom 2px solid #FC534C
                border-left 2px solid #FC534C
                transition all 0.5s
                transform translate(0, -50%) rotate(-45deg)
                background transparent
                &.close
                  transform translate(0, -50%) rotate(-225deg)
            ul
              position absolute
              top 53px
              left 0
              box-shadow 0 3px 15px #d9d9d9
              z-index 99
              overflow hidden
              transition all 0.5s
              background #fff
              li
                width 180px
                height 44px
                color #181818
                font-size 18px
                text-align center
                line-height 44px
                &:hover
                  background rgba(252, 83, 76, 0.4)
                  color #fff
                &:active
                  opacity 0.6
      .commonTableList
        max-width: 1128px;
        display: block;
        padding: 0 !important;
        margin-left: 0 !important;

  .mobile
    position relative
    padding 0 20px
    .tabs
      display flex
      flex-direction row
      justify-content space-around
      .tab
        position relative
        width 45%
        text-align center
        p
          height 44px
          line-height 44px
          border-top-left-radius 5px
          border-top-right-radius 5px
          border-bottom-right-radius 0
          border-bottom-left-radius 0
          background #FC534C
          cursor pointer
          span
            color #fff
            margin-right 3px
        ul
          width 100%
          position absolute
          top 44px
          background #fff
          overflow: hidden;
          transition: all 0.5s;
          border-bottom-right-radius 6px
          border-bottom-left-radius 6px
          border-top none !important
          border 1px solid rgba(0, 0, 0, 0.1)
          color #000
          li
            height 36px
            line-height 36px
    .transform-list
      margin-top 30px
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
    .btn-transfer
      font-size 16px
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      transition: all .3s;
      height 44px
      background #FC534C
      line-height 44px
      text-align center
      color #fff
</style>
