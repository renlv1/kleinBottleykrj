<template>
  <div class="container-mobile">
    <div class="head-mobile">
      <div class="back-mobile" @click="$router.push('/serialEat')"></div>
      <div class="title-mobile">{{$t('revenue.text1')}}</div>
    </div>
    <div class="table-mobile">
      <span style="color: #999; display: inline-block; margin-bottom: 10px; font-size: 14px">{{$t('home.text28')}}</span>
      <div class="data-flex">
        <el-date-picker
          v-model="data1"
          type="date"
          :placeholder="$t('serialEat.text43')"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="change1"></el-date-picker>
        <span style="color: #999; margin: 0 5px">-</span>
        <el-date-picker
          v-model="dataTime"
          type="date"
          :placeholder="$t('serialEat.text44')"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="changeTime"></el-date-picker>
      </div>
      <div class="transfer-type">
        <div class="type-box first-input">
          <input class="input-type" type="text" readonly disabled :placeholder="transferValue">
          <a class="type-btn" @click="transferSelectShow = !transferSelectShow">
            <i class="arrowDown" :class="{arrowActive: transferSelectShow}"></i>
          </a>
          <ul class="selectMenu" :class="{selectMenuActive: transferSelectShow}">
            <li :class="{liActive: transferIndex === index}" v-for="(item,index) in transferType" :key="item.index"
                @click="chooseTransfer(item.name, index)">{{item.name}}
            </li>
          </ul>
        </div>
      </div>
      <ul>
        <li class="font-size-style" v-for="item in bonusLogList" :key="item.index">
          <div class="table-left">
            <div class="table-num">
              <span>{{$t('revenue.text2')}}：</span><span>{{item.id}}</span>
            </div>
            <span>{{item.userName}}</span>
          </div>
          <div class="table-right">
            <span>{{$changeDate(item.createAt, '/')}}</span>
            <div class="table-count">
              <span :class="{red: item.changeType === 2, green: item.changeType === 1}">{{numToTransText(item.changeType)}}：</span><span>{{item.changeAmount | formattingMoney}}USD</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="error" v-if="bonusLogList.length === 0 || bonusLogList === ''">
      {{$t('orderManage.text8')}}
    </div>
    <v-turnPage v-if="bonusLogList.length !== 0 && bonusLogList !== ''" :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
  </div>
</template>

<script>
export default {
  name: 'revenue',
  data () {
    return {
      data1: '',
      dataTime: '',
      isRed: false,
      isGreen: false,
      transferSelectShow: false, // 下拉框
      transferValue: this.$t('serialEat.text40'),
      transferIndex: 0,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      currentPage: 1, // 默认当前页为1
      transferNum: 1,
      type: 0,
      transferType: [
        {name: this.$t('serialEat.text40')},
        {name: this.$t('serialEat.text42')},
        {name: this.$t('serialEat.text41')}
      ],
      bonusLogList: [] // 获取分红池收支明细列表对象
    }
  },
  created () {
    this._getBonusLogList(1) // 获得移动端分红池收支明细列表
  },
  mounted () {
    var that = this
    window.onresize = function () {
      that.routeRedirect() // 解决PC端空白问题
    }
  },
  methods: {
    change1 () {
      if (this.transferIndex === 0) {
        this.type = 0
      } else if (this.transferIndex === 1) {
        this.type = 1
      } else if (this.transferIndex === 2) {
        this.type = 2
      }
      this.$http.post(`${this.$api}/lottoReward/getBonusLogList?pageIndex=1&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&type=${this.type}&queryDate=${this.data1}&queryEndDate=${this.dataTime}`).then((res) => {
        if (res.data.success === true) {
          this.bonusLogList = res.data.data.bonusLogList
        }
      })
    },
    changeTime () {
      if (this.transferIndex === 0) {
        this.type = 0
      } else if (this.transferIndex === 1) {
        this.type = 1
      } else if (this.transferIndex === 2) {
        this.type = 2
      }
      this.$http.post(`${this.$api}/lottoReward/getBonusLogList?pageIndex=1&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&type=${this.type}&queryDate=${this.data1}&queryEndDate=${this.dataTime}`).then((res) => {
        if (res.data.success === true) {
          this.bonusLogList = res.data.data.bonusLogList
        }
      })
    },
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this._getBonusLogList(page)
    },
    // 点击下拉框
    chooseTransfer (val, index) {
      this.transferValue = val
      this.transferIndex = index
      this.transferSelectShow = false
      if (this.transferIndex === 0) {
        this.type = 0
        this._getBonusLogList(1) // 获得移动端分红池收支明细列表
      } else if (this.transferIndex === 1) {
        this.type = 1
        this._getBonusLogList(1) // 获得移动端分红池收支明细列表
      } else if (this.transferIndex === 2) {
        this.type = 2
        this._getBonusLogList(1) // 获得移动端分红池收支明细列表
      }
    },
    numToTransText (num) { // 后端返回的数字转换为对应的文字
      if (num === 1) {
        return this.$t('revenue.text3')
      } else if (num === 2) {
        return this.$t('revenue.text4')
      }
    },
    routeRedirect () {
      if (window.innerWidth > 1200 && this.$route.path === '/revenue') {
        this.$router.push('/serialEat')
      }
    },
    _getBonusLogList (page) {
      this.$http.post(`${this.$api}/lottoReward/getBonusLogList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.$route.query.roundId}&type=${this.type}&queryDate=${this.data1}&queryEndDate=${this.dataTime}`).then((res) => {
        if (res.data.success === true) {
          this.bonusLogList = res.data.data.bonusLogList // 获取分红池收支明细列表对象
          this.totalPage = res.data.data.totalPage
        }
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table-right
    text-align: right
  .data-flex
    display flex
    justify-content space-between
    align-items center
    background-color: #f0f2f5
    padding: 10px
    margin-bottom: 15px
  .table-mobile
    margin-top 70px
    .transfer-type
      margin-bottom 20px
      .type-title
        font-size 14px
        color #181818
        margin-bottom 10px
      .first-input
        position relative
        width 100%
        input:
        :-webkit-input-placeholder {
          color #181818
        }
        input:
        :-moz-placeholder { /* Mozilla Firefox 19+ */
          color #181818
        }
        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color #181818
        }
        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
          color #181818
        }
      .type-box
        z-index 20
        .input-type
          display block
          height 48px
          width 100%
          padding 0 20px
          box-sizing border-box
          border-radius 4px
          font-size 14px
          background-color #f0f2f5
          border 1px solid #f0f2f5
        .input-mobile
          display block
          height 48px
          width 100%
          padding 0 20px
          box-sizing border-box
          border-radius 4px
          font-size 14px
          background-color #fff
          border 1px solid #f0f2f5
        .type-btn
          position absolute
          right 0
          top 0
          height 100%
          width 50px
          background-color #fc534c
          border-bottom-right-radius 6px
          border-top-right-radius 6px
          font-size 0
          display flex
          justify-content center
          align-items center
          cursor pointer
          user-select none
          .arrowDown
            background url("../../assets/images/sieTransfer/arrow_down_white.png") no-repeat
            display inline-block
            width 13px
            height 8px
            background-size cover !important
            transition .2s
            &.arrowActive
              transform rotate(180deg)
        .selectMenu
          width 100%
          height 0
          position absolute
          top 48px
          left 0
          background-color #f7f9fa
          border-bottom-right-radius 6px
          border-bottom-left-radius 6px
          transition all 0.3s linear
          z-index 20
          overflow hidden
          &.selectMenuActive
            height 140px
            padding 10px 0
          li
            height 40px
            line-height 40px
            padding 0 20px
            color #A7A7A7
            cursor pointer
            user-select none
            -webkit-tap-highlight-color: transparent; // 兼容
            &.liActive
              color #181818
      .inputTipMsg
        display inline-block
        font-size 16px
        color #fc534c
        margin-top 10px
</style>
