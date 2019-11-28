<template>
  <div class="renew">
    <!-- 续费-->
    <div id="fixed-top-header">
      <div class="back" @click="$router.push('/account/myDon')"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('danAI.text50')}}</h3>
    </div>
    <div class="xufei-b">
      <div class="old-time">{{$t('danAI.text22')}}</div>
      <div class="times" v-show="danData.userEndTime">{{$changeDate(danData.userEndTime, '-', 1)}}</div>
      <div class="add-input-box">
        <span class="add-text">{{$t('danAI.text42')}}</span>
        <div class="input-box"><input type="text" class="inputs" v-model="year" :placeholder="$t('danAI.text43')" @input="changeYear"></div>
        <span class="years">{{$t('danAI.text39')}}</span>
      </div>
      <p class="error-text">{{hintText}}</p>
      <div class="table">
        <h3 class="record-title table-color">
          <span class="line"></span>
          <span>{{$t('danAI.text44')}}</span>
        </h3>
        <div class="flex-item table-color">
          <div class="flex-lable">{{$t('danAI.text45')}}</div>
          <div><span class="light-text">{{renewPrice | formattingMoney}} SIE</span> / {{$t('danAI.text39')}}</div>
        </div>
        <div class="flex-item table-color">
          <div class="flex-lable">{{$t('danAI.text46')}}</div>
          <div v-show="danData.userEndTime">{{addYear}}</div>
        </div>
        <div class="flex-item table-color">
          <div class="flex-lable">{{$t('danAI.text47')}}</div>
          <div class="light-text">{{ year === '' ? 0 : parseInt(year) * renewPrice | formattingMoney}} SIE</div>
        </div>
      </div>
      <div class="xufei-btn" @click="addMoney">{{$t('danAI.text48')}}</div>
      <div class="user-money">{{$t('danAI.text53')}}: <span class="my-money">{{sieMoney | fourNumber}} SIE</span></div>
    </div>
    <vdialog ref="dialog" :productId="productId" :xufeiMoney="xufeiMoney"></vdialog>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.xufei-b
  padding: 130px 15px 30px 90px
  @media screen and (max-width 1200px)
    padding: 50px 15px
  .old-time
    font-size: 16px
    font-weight: bold
    color #181818
    @media screen and (max-width 1200px)
      text-align: center
      margin-top: 50px
      font-weight normal
      font-family "Microsoft YaHei UI Light"
  .times
    font-size: 38px
    color #181818
    margin: 30px 0 60px
    font-weight: bold
    @media screen and (max-width 1200px)
      text-align: center
      margin: 20px 0 30px
      font-size: 24px
  .add-input-box
    display flex
    align-items center
    height 48px
    font-size: 16px
    color #181818
    font-family "Microsoft YaHei UI Light"
    @media screen and (max-width 1200px)
      font-size: 14px
      height: 38px
    .input-box
      width: 320px
      height: 48px
      margin: 0 20px 0 30px
      @media screen and (max-width 1200px)
        flex: 1
        height: 38px
        margin: 0 10px
      .inputs
        width: 100%
        height: 100%
        border: 1px solid #d7d9db
        display: block
        box-sizing border-box
        padding: 0 10px 0 30px
        font-family "Microsoft YaHei UI Light"
        color #181818
        font-size: 16px
        @media screen and (max-width 1200px)
          font-size: 12px
          padding-left: 10px
  .error-text
    color #fc534c
    font-size: 16px
    margin-top: 10px
  .table
    width: 1128px
    font-family "Microsoft YaHei UI Light"
    margin: 40px 0 50px
    color #181818
    @media screen and (max-width 1760px)
      width: 100%
    .table-color
      &:nth-child(odd)
        background-color: #EDEFF1
      &:nth-child(even)
        background-color: #FBFBFB
    .record-title
      font-weight: normal
      display flex
      align-items center
      height: 64px
      font-size: 20px
      color #181818
      background-color: #edeff1
      @media screen and (max-width 1128px)
        height: 50px
        font-size: 16px
      .line
        display block
        width: 10px
        height: 22px
        margin-right: 30px
        background-color: #032e43
        @media screen and (max-width 1200px)
          margin-right: 10px
          width: 8px
    .flex-item
      padding-left: 38px
      display flex
      height: 64px
      align-items center
      @media screen and (max-width 1200px)
        height: 50px
        padding: 0 10px
        font-size: 14px
      .flex-lable
        width: 444px
        @media screen and (max-width 1200px)
          flex 1
      .light-text
        color #fc534c
  .xufei-btn
    text-align: center
    width: 444px
    line-height: 58px
    font-size: 16px
    color #fff
    cursor pointer
    background-color: #fc534c
    box-shadow 0 5px 10px #d7d9db
    border-radius 4px
    @media screen and (max-width 1200px)
      width: 100%
      height: 40px
      line-height: 40px
  .user-money
    margin-top: 20px
    .my-money
      color #fc534c
</style>

<script>
import { mapGetters } from 'vuex'
import vdialog from '@/components/dialog'
export default{
  data () {
    return {
      xufeiMoney: 0,
      danData: [],
      renewPrice: 0,
      addPrices: 0,
      year: '',
      hintText: '',
      productId: Number
    }
  },
  computed: {
    addYear () {
      if (this.year !== '') {
        return this.$changeDate((this.danData.userEndTime + 31536000000 * parseInt(this.year)), '/', 1)
      } else {
        return this.$changeDate(this.danData.userEndTime, '/', 1)
      }
    },
    ...mapGetters([
      'sieMoney'
    ])
  },
  created () {
    this.getDanRobot()
    this.getOpenPrice()
  },
  methods: {
    // input 年
    changeYear () {
      let maxXuFei = parseInt(this.sieMoney / this.renewPrice)
      if (this.year >= maxXuFei) {
        this.year = maxXuFei
      } else if (this.year < 1 || (this.year >= 1) === false) {
        this.year = ''
      }
    },
    // 增值
    addMoney () {
      this.hintText = ''
      if (!(/^\+?[1-9]\d*$/).test(this.year)) {
        this.hintText = this.$t('danAI.text49')
      } else {
        if (!isNaN(this.year) && this.year !== null) {
          this.xufeiMoney = (parseInt(this.year) * this.renewPrice).toFixed(4)
        }
        this.$http({
          url: this.$api + '/product/renewRobotAi',
          method: 'post',
          data: {
            renewyear: this.year,
            productid: 4
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data.success) {
            this.productId = res.data.data.id
          }
        })
        this.$refs.dialog.show()
      }
    },
    getDanRobot () {
      this.$http({
        url: this.$api + '/product/queryBuyRobot',
        method: 'post',
        data: {
          pageIndex: 1,
          pageSize: 20
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.success === true) {
          let aiArr = res.data.data.darwinSets
          aiArr.forEach((value) => {
            if (value.product.id === 4) {
              this.danData = value
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 续费SIE价格
    getOpenPrice () {
      this.$http({
        url: this.$api + '/product/showOpenRobotAiTotal',
        method: 'post',
        data: {
          productid: 4
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.success === true) {
          this.renewPrice = res.data.data.showSieTotalRenew
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    vdialog
  }
}
</script>
