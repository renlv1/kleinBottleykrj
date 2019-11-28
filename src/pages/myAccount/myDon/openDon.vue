<template>
  <div class="openDon">
    <!--开通小单 + (支付)-->
    <div id="fixed-top-header">
      <div class="back" @click="$router.push('/account/myDon')"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('danAI.text36')}}</h3>
    </div>
    <div class="open-w">
      <h3 class="old-time">{{$t('danAI.text36')}}</h3>
      <div class="times">{{openPriceData.showSieTotal | formattingMoney}}SIE</div>
      <div class="table">
        <h3 class="record-title table-color">
          <span class="line"></span>
          <span>{{$t('danAI.text36')}}</span>
        </h3>
        <div class="flex-item table-color">
          <div class="flex-lable">{{$t('danAI.text37')}}：</div>
          <div>{{openPriceData.showSieTotal | formattingMoney}} SIE</div>
        </div>
        <div class="flex-item table-color">
          <div class="flex-lable">{{$t('danAI.text38')}}：</div>
          <div>1 {{$t('danAI.text39')}}</div>
        </div>
        <div class="flex-item table-color">
          <div class="flex-lable"> {{$t('danAI.text40')}}：</div>
          <div><span class="light-text">{{sieMoney | formattingMoney}} SIE</span></div>
        </div>
      </div>
      <div class="openAi" @click="openAi">{{$t('danAI.text41')}}</div>
    </div>
    <vdialog ref="dialog" :productId="productId" :openDan="true" :openPrice="openPrice"></vdialog>
    <div class="dialog-wrap" v-show="dialogShow">
      <div class="dialog-box" @click="dialogShow = false">
        <div class="dialog-w" @click.stop>
          <div class="close-confirm" @click="dialogShow = false">
            <div class="close-icon"></div>
          </div>
          <div class="dialog-c">
            <p class="error-text">{{errMsg}}</p>
            <div class="button-confim" @click="dialogShow = false">{{$t('danAI.text12')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.openDon
  padding: 130px 30px 30px 90px
  @media screen and (max-width 1200px)
    padding: 50px 0 40px
  .open-w
    @media screen and (max-width 1200px)
      padding: 0 15px
  .old-time
    font-size: 16px
    font-weight: bold
    color #181818
    @media screen and (max-width 1200px)
      text-align: center
      margin-top: 50px
      font-size: 16px
      font-weight: normal
      font-family "Microsoft YaHei UI Light"
  .times
    font-size: 38px
    color #181818
    margin: 30px 0 60px
    font-weight: bold
    @media screen and (max-width 1200px)
      text-align: center
      margin: 15px 0 30px
      font-size: 26px
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
        height 50px
        font-size: 16px
      .line
        display block
        width: 10px
        height: 22px
        margin-right: 30px
        background-color: #032e43
        @media screen and (max-width 1128px)
          margin-right: 7px
          width: 8px
    .flex-item
      padding-left: 38px
      display flex
      height: 64px
      align-items center
      @media screen and (max-width 1128px)
        height 50px
        font-size: 14px
        padding-left: 15px
        padding-right: 15px
        justify-content space-between
      .flex-lable
        width: 444px
        @media screen and (max-width 1128px)
          width auto
      .light-text
        color #fc534c
  .yue-money
    text-align: right
  .openAi
    text-align: center
    width: 444px
    line-height: 58px
    font-size: 16px
    color #fff
    cursor pointer
    background-color: #fc534c
    box-shadow 0 5px 10px #d7d9db
    border-radius 4px
    @media screen and (max-width 1128px)
      width: 100%
      line-height: 40px
  .dialog-wrap
    width: 100%
    height: 100%
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: rgba(11,27,48, .6)
    opacity: 1
    .dialog-box
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      display flex
      align-items center
      justify-content center
      z-index: 999
      .dialog-w
        position: relative
        width: 600px
        padding: 120px 80px 157px 80px
        border-radius 8px
        box-shadow 0 0 5px #d7d9db
        background-color: #fff
        @media screen and (max-width: 768px)
          width: 90%
          padding: 50px 20px
      .close-confirm
        position: absolute
        right: 0
        top: 0
        cursor pointer
        padding: 30px 40px
        @media screen and (max-width: 768px)
          padding: 20px
        .close-icon
          width: 24px
          height: 24px
          background: url("../../../assets/images/myAccount/myDon/delete.svg") no-repeat center / cover
      .dialog-c
        .error-text
          font-size: 28px
          color #fc534c
          text-align: center
          margin-bottom: 134px
          @media screen and (max-width: 768px)
            margin: 20px 0 50px
            font-size: 16px
        .button-confim
          margin-top: 40px
          width: 100%
          height: 58px
          text-align: center
          line-height: 58px
          background-color: #fc534c
          color #fff
          cursor pointer
          border-radius 4px
          box-shadow 0 5px 10px #d7d9db
          @media screen and (max-width: 768px)
            height: 40px
            line-height: 40px
</style>

<script>
import vdialog from '@/components/dialog'
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      dialogShow: false,
      openPriceData: [],
      productId: '',
      errMsg: '',
      openPrice: 0
    }
  },
  created () {
    this.getOpenTime()
  },
  computed: {
    ...mapGetters([
      'sieMoney'
    ])
  },
  methods: {
    // 开通小单
    openAi () {
      let ajaxLang0 = ''
      if (localStorage.getItem('kleinLang') === 'EN') {
        ajaxLang0 = 'en'
      }
      this.errMsg = ''
      this.$http({
        url: this.$api + '/product/openRobotAi',
        method: 'post',
        data: {
          openorrenew: '1',
          isAuth: '1',
          productid: '4'
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'secret-language': ajaxLang0
        }
      }).then(res => {
        if (res.data.success) {
          this.productId = res.data.data.id
          this.openPrice = this.openPriceData.showSieTotal
          this.$refs.dialog.show()
        } else {
          this.dialogShow = true
          this.errMsg = res.data.msg
        }
      }).catch(err => {
        console.log(err)
        this.dialogShow = true
        this.errMsg = this.$t('danAI.text15')
      })
    },
    getOpenTime () {
      // 查询已开通的机器人
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
          this.openPriceData = res.data.data
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
