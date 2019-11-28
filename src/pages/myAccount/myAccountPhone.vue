<template>
  <div class="myAccountPH">
    <!--账户管理-->
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)">
        <div class="icon"></div>
      </div>
      <h3 class="fixed-title">{{$t('usdTixian.text29')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="myAccountPH-top">
      <div class="userImg">
        <img :src="(userInfo.imgUrl)" alt="">
        <!--<img src="../../assets/images/myAccount/userImg.png" alt="">-->
      </div>
      <div class="userName">
        <h4>{{userInfo.nickName}}</h4>
        <p v-if="userInfo.mobile">+{{userInfo.phoheCode}}{{userInfo.mobile}}</p>
      </div>
    </div>
    <ul class="myAccountPH-list">
      <li @click="showQrPopup(1)">
        <div class="li-lf">
          <h3>{{$t('myAccount.text10')}}：</h3>
          <p>{{userInfo.address}}</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon"></i>
        </div>
      </li>
      <li @click="showQrPopup(2)">
        <div class="li-lf">
          <h3>{{$t('myAccount.text11')}}：</h3>
          <p>{{userInfo.systemAddress}}</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon"></i>
        </div>
      </li>
      <li @click="showQrPopup(3)">
        <div class="li-lf">
          <h3>{{$t('newAdd.text12')}}：</h3>
          <p>{{btcAddress}}</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon"></i>
        </div>
      </li>
      <router-link to="/account/InvitedRecord" tag="li">
        <div class="li-lf">
          <p>{{$t('invitedRecord.text5')}}</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon"></i>
        </div>
      </router-link>
      <li @click="$router.push('/account/notOpenShareOrder')" v-if="userInfo.isboss === 1">
        <div class="li-lf zhi-li-lf">
          <div class="tit">{{$t('myAccount.title')}}</div>
          <div class="ktFo">{{textNoBoss}}</div>
        </div>
        <div class="li-rt">
          <i class="arrowIcon" v-show="arrowIconShow"></i>
        </div>
      </li>
      <li v-if="userInfo.isboss === 2">
        <div class="li-lf zhi-li-lf">
          <div class="tit">{{$t('myAccount.title')}}</div>
          <div class="ktFo">{{textBoss}}</div>
        </div>
        <div class="li-rt">
        </div>
      </li>
      <!-- 绑定手机了-->
      <li v-if="userInfo.openMobileCode === 2">
        <div class="li-lf flex-left">
          <p>{{$t('bindPhone.text16')}}</p>
        </div>
        <div class="li-rt flex-i">
          <span class="text">+{{userInfo.phoheCode}} {{userInfo.mobile}}</span>
        </div>
      </li>
      <!-- 没绑定手机-->
      <li @click="$router.push('/account/safettingCenter/mobileSetting')" v-if="userInfo.openMobileCode !== 2">
        <div class="li-lf flex-left">
          <p>{{$t('bindPhone.text16')}}</p>
        </div>
        <div class="li-rt flex-i">
          <span class="text">{{$t('safeSett.text4')}}</span>
          <i class="arrowIcon"></i>
        </div>
      </li>
      <!-- 修改密码 -->
      <li @click="$router.push({path: '/inputEmail', query: {myAccount: 1}})">
        <div class="li-lf flex-left">
          <p>{{$t('forgetPassword.text23')}}</p>
        </div>
        <div class="li-rt flex-i">
          <i class="arrowIcon"></i>
        </div>
      </li>
      <!--安全密码-->
      <li @click="$router.push('/account/safettingCenter/safePassword')">
        <div class="li-lf flex-left">
          <p>{{$t('safeSett.text5')}}</p>
        </div>
        <div class="li-rt flex-i">
          <span class="text" v-if="userInfo.openTradePassword !== 2">{{$t('safeSett.text4')}}</span>
          <span class="text" v-if="userInfo.openTradePassword === 2">{{$t('safeSett.text8')}}</span>
          <i class="arrowIcon"></i>
        </div>
      </li>
      <!--谷歌验证码-->
      <li @click="gogleClick">
        <div class="li-lf flex-left">
          <p>{{$t('safePassword.text9')}}</p>
        </div>
        <div class="li-rt flex-i">
          <span class="text" v-if="userInfo.openGoogleCode !== 2">{{$t('safeSett.text4')}}</span>
          <span class="text" v-if="userInfo.openGoogleCode === 2">{{$t('safeSett.text8')}}</span>
          <i class="arrowIcon"></i>
        </div>
      </li>
      <router-link tag="li" to="/account/transAccountManag">
        <div class="li-lf">
          <p>{{$t('myAccount.text31')}}</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon"></i>
        </div>
      </router-link>
    </ul>
    <transition name="adress-fade">
      <div class="adressPopup" v-show="adressQrCodeFlag">
        <div class="adressPopup-box">
          <a class="closeBtn" @click="closeQrPopup()"><i></i></a>
          <!--Secret内部交易地址-->
          <h3 v-show="adressQrCodeNum === 1">{{$t('myAccount.text10')}}</h3>
          <!--以太坊交易地址-->
          <h3 v-show="adressQrCodeNum === 2">{{$t('myAccount.text11')}}</h3>
          <!--以太坊交易地址-->
          <h3 v-show="adressQrCodeNum === 3">{{$t('myAccount.text32')}}</h3>
          <div class="qrCodeBox" id="qrCodeBox"></div>
          <p class="address" v-show="adressQrCodeNum === 1" id="userAddress">{{userInfo.address}}</p>
          <p class="address" v-show="adressQrCodeNum === 2" id="ytfAddress">{{userInfo.systemAddress}}</p>
          <p class="address" v-show="adressQrCodeNum === 3" id="btcAddress">{{this.btcAddress}}</p>
          <button class="copyBtn" v-show="adressQrCodeNum === 1" ref="addressCopy1" @click="popupCopyAddress(1)"
                  data-clipboard-action="copy" data-clipboard-target="#userAddress">{{$t('myAccount.text28')}}
          </button>
          <button class="copyBtn" v-show="adressQrCodeNum === 2" ref="addressCopy2" @click="popupCopyAddress(2)"
                  data-clipboard-action="copy" data-clipboard-target="#ytfAddress">{{$t('myAccount.text29')}}
          </button>
          <button class="copyBtn" v-show="adressQrCodeNum === 3" ref="addressCopy3" @click="popupCopyAddress(3)"
                  data-clipboard-action="copy" data-clipboard-target="#btcAddress">{{$t('myAccount.text29')}}
          </button>
        </div>
      </div>
    </transition>
    <transition name="adress-fade">
      <div class="adressPopup" v-show="copyShow">
        <div class="adressPopup-box adressPopup-copy">
          <a class="closeBtn" @click="copyShow = false"><img src="../../assets/images/sieMoney/close.svg" alt=""></a>
          <h3>{{$t('myAccount.text29')}}</h3>
          <button class="copyBtn" @click="copyShow = false">{{$t('myAccount.text30')}}</button>
        </div>
      </div>
    </transition>
    <div class="dialog-box" v-if="isDialog">
      <div class="dialog-content">
        <div class="dialog">
          <div class="close isClick" @click="isDialog = false">
            <img width="20" height="21" src="../../assets/images/myAccount/input_close.svg">
          </div>
          <div class="dialog-title">{{$t('safeSett.text9')}}</div>
          <div class="rule">{{$t('safeSett.text10')}}</div>
          <div class="input-box">
            <input class="tradingCenter-input" type="password" v-model.trim="validation" ref="validation"
                   :placeholder="$t('safeSett.text11')">
          </div>
          <p class="text-error" v-show="isSHow">{{$t('danAI.text8')}}</p>
          <button @click="confirm" class="btn">{{$t('safeSett.text12')}}</button>
        </div>
      </div>
    </div>
    <div class="dialog-box" v-if="isSuccess">
      <div class="dialog-content">
        <div class="dialog">
          <div class="close isClick" @click="isSuccess = false">
            <img width="20" height="21" src="../../assets/images/myAccount/input_close.svg">
          </div>
          <div class="rule rule-suc">{{error}}</div>
          <button class="btn" @click="close">{{$t('safeSett.text12')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .text-error
    color #FC534C
    margin-top: 10px

  .dialog-box
    z-index: 100
    position fixed
    top 0
    right 0
    width 100%
    height 100%
    display flex
    justify-content center
    align-items center
    background-color: rgba(0, 0, 0, .5)
    .dialog-content
      /*height 60%*/
      width 600px
      position relative
      @media screen and (max-width: 1024px)
        width 90%
      .dialog
        overflow: auto
        margin 0 auto
        text-align: center
        border-radius: 8px;
        box-shadow: 0 0 5px #d7d9db;
        width 100%
        // height 100%
        max-height 100%
        padding: 0 15px
        height auto
        font-family "Microsoft YaHei UI Light"
        background #fff
        position relative
        .close
          position relative
          img
            position absolute
            right 20px
            top 20px
        .dialog-title
          font-size 24px
          color #000
          width 80%
          margin 20px auto
          font-weight bold
        .rule
          margin 40px auto
          width 100%
          text-align: center
          font-size 14px
          color #fc534c
          font-weight bold
          &.rule-suc
            margin-top: 80px
            margin-bottom: 0
        .input-box
          .tradingCenter-input
            width: 100%
            height: 48px
            padding: 0 10px
            box-sizing border-box
            color #181818
            border: 1px solid #d7d9db
            border-radius 4px
            font-size: 14px
        .btn
          height: 46px
          text-align center
          background #fc534c
          border-radius 4px
          border 1px solid #d7d9db
          cursor pointer
          user-select none
          font-family "Microsoft YaHei UI"
          font-size 20px
          color #fff
          width 100%
          margin 50px 0 70px 0

  .flex-i
    display flex
    align-items center

  .myAccountPH
    padding 0 20px
    padding-top 50px
    #fixed-top-header
      left 0
    .myAccountPH-top
      padding 30px 0
      display flex
      align-items center
      color #181818
      .userImg
        width 50px
        height 50px
        margin-right 20px
        border-radius 4px
        overflow hidden
        img
          display block
          width 100%
          height 100%
      .userName
        width 70%
        h4
          font-weight bold
          font-size 14px
          margin-bottom 5px
        p
          font-size 12px
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
    .myAccountPH-list
      font-size 12px
      color #181818
      li
        display flex
        align-items center
        justify-content space-between
        padding 15px
        background-color #f0f2f5
        border-radius 3px
        margin-bottom 10px
        .li-lf
          width 90%
          &.flex-left
            width auto
          h3
            font-size 12px
            margin-bottom 5px
            color #999999
          p
            font-size 12px
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        .zhi-li-lf
          flex 1
          display flex
          align-items center
          justify-content space-between
          .ktFo
            height 100%
            padding-right 10px
        .li-rt
          .text
            margin-right: 8px
          span
            color #003399
            margin-right 2px
          .arrowIcon
            display inline-block
            width: 6px;
            height: 9px;
            background url("../../assets/images/myAccount/right-row.png") no-repeat
            background-size: cover;
        &.li-activity
          display block
          padding 0
          overflow hidden
          h3
            height 35px
            display flex
            align-items center
            font-size 14px
            background-color #e6e8eb
            i
              display block
              width 5px
              height 10px
              background-color #032e43
              margin-right 10px
          .li-activity-bt
            padding 15px
            .activity-item
              display flex
              justify-content space-between
              margin-bottom 10px
              a
                color #181818
                i
                  color #003399
              &:last-child
                margin-bottom 0
                a
                  color #003399

  .adressPopup
    width: 100%
    height: 100%
    position: fixed
    left: 0
    top: 0
    z-index: 999
    background-color: rgba(11, 27, 48, .6)
    opacity: 1
    display flex
    align-items center
    justify-content center
    transition opacity .3s linear
    color #181818
    &.adress-fade-enter-active, &.adress-fade-leave-active
      transition opacity .3s linear
    &.adress-fade-enter, &.adress-fade-leave-to
      opacity: 0
    .adressPopup-box
      position: relative
      width: 80%
      padding: 20px 15px 30px 15px
      border-radius 4px
      box-shadow 0 0 3px #d7d9db
      background-color: #fff
      text-align center
      .closeBtn
        display block
        position absolute
        top 0px
        right 0px
        padding 20px
        cursor pointer
        user-select none
        &:active
          opacity .6
        i
          display block
          width: 12px
          height: 12px
          background: url("../../assets/images/myAccount/myDon/delete.svg") no-repeat center / cover
      h3
        font-size 14px
        margin-bottom 40px
        font-weight bold
      &.adressPopup-copy
        h3
          margin-bottom 50px
      .qrCodeBox
        display flex
        align-items center
        justify-content center
        width 140px
        height 140px
        margin 0 auto
        background-color #fff
      .address
        font-size 12px
        margin-top 15px
        margin-bottom 50px
        word-break break-all
      .copyBtn
        width: 100%
        height: 40px
        background-color: #fc534c
        color #fff
        outline none
        border none
        cursor pointer
        user-select none
        border-radius 4px
        box-shadow 0 5px 10px #d7d9db
        font-size: 16px
        &:active
          opacity .6
</style>

<script>
  import $ from 'jquery'
  import {mapGetters} from 'vuex'
  import '../../assets/js/jquery.qrcode.min'

  export default {
    data() {
      return {
        btcAddress: '',
        isSHow: false,
        isSuccess: false,
        error: '',
        validation: '',
        isDialog: false,
        copyBtn1: null,
        copyBtn2: null,
        copyBtn3: null,
        adressQrCodeFlag: false, // 二维码弹窗
        copyShow: false, // 复制成功弹窗
        adressQrCodeNum: 1,
        textBoss: this.$t('myAccount.textBoss'),
        textNoBoss: this.$t('myAccount.textNoBoss'),
        arrowIconShow: true,
        textShow: true,
        textKtShow: false
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    created() {
      this.$store.dispatch('balanceAction')
    },
    mounted() {
      this.getBtcTransfer()
      this.$nextTick(() => {
        this.copyBtn1 = new this.Clipboard(this.$refs.addressCopy1)
        this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2) // 复制
        this.copyBtn3 = new this.Clipboard(this.$refs.addressCopy3) // 复制
        this.sharer() // 判断是否开通老板
      })
      let that = this
      window.onresize = function () {
        that.routeRedirect() // 解决PC端空白问题
      }
    },
    methods: {
      getBtcTransfer() {
        this.$http.post(`${this.$api}/user/getBtcAddress`).then((res) => {
          if (res.data.success === true) {
            this.btcAddress = res.data.data
          }
        })
      },
      close() {
        this.error = ''
        this.validation = ''
        this.isSuccess = false
        this.isDialog = false
      },
      confirm() {
        this.isSuccess = false
        this.isSHow = false
        if (this.validation === '') {
          this.isSHow = true
        } else {
          this.$http.post(`${this.$api}/user/googleOpenClose?type=1&tradePwd=${this.validation}`).then((res) => {
            this.validation = ''
            if (res.data.success === true) {
              let data = res.data.data.qrUrl
              let secret = res.data.data.secret
              this.isDialog = false
              this.$router.push({
                path: '/account/safettingCenter/gogleOne',
                query: {qrData: data, secret: secret, setsafe: res.data.mapData.setsafe}
              })
            } else {
              this.isSuccess = true
              this.isDialog = false
              this.error = res.data.msg
            }
          })
        }
      },
      gogleClick() {
        this.isSuccess = false
        this.error = ''
        if (this.userInfo.openGoogleCode === 2) {
          this.$router.push('/account/safettingCenter/gogoleSetting')
        } else if (this.userInfo.openTradePassword !== 2) {
          this.isSuccess = true
          this.error = this.$t('googleValidation.text1')
        } else {
          this.isDialog = true
        }
      },
      routeRedirect() {
        if (window.innerWidth > 1200) {
          this.$router.push({path: '/account/myAccount'})
        }
      },
      sharer() {
        if (this.userInfo.isboss === 2) { // 已经开通
          this.textBoss = this.textBoss
          this.arrowIconShow = false
        }
        if (this.userInfo.isboss === 1) { // 未开通
          this.textBoss = this.textNoBoss
          this.textShow = false
          this.textKtShow = true
        }
      },
      popupCopyAddress(num) { // 弹窗复制地址
        this.closeQrPopup()
        if (num === 1) {
          let clipboard = this.copyBtn1
          clipboard.on('success', () => {
            // alert('复制成功')
            this.copyShow = true
            clipboard.destroy()
            this.copyBtn1 = new this.Clipboard(this.$refs.addressCopy1) // 复制
          })
        } else if (num === 2) {
          let clipboard = this.copyBtn2
          clipboard.on('success', () => {
            // alert('复制成功')
            this.copyShow = true
            clipboard.destroy()
            this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2) // 复制
          })
        } else if (num === 3) {
          let clipboard = this.copyBtn3
          clipboard.on('success', () => {
            // alert('复制成功')
            this.copyShow = true
            clipboard.destroy()
            this.copyBtn3 = new this.Clipboard(this.$refs.addressCopy3) // 复制
          })
        }
      },
      closeQrPopup() { // 关闭二维码
        this.adressQrCodeFlag = false
        $('#qrCodeBox').html('')
      },
      showQrPopup(val) { // 显示二维码
        this.adressQrCodeFlag = true
        let downloadUrl
        if (val === 1) {
          if (this.userInfo.address !== '') {
            this.adressQrCodeNum = 1
            // 绘制二维码
            downloadUrl = this.$utf16to8(this.userInfo.address)
          }
        } else if (val === 2) {
          if (this.userInfo.systemAddress !== '') {
            this.adressQrCodeNum = 2
            // 绘制二维码
            downloadUrl = this.$utf16to8(this.userInfo.systemAddress)
          }
        } else if (val === 3) {
          if (this.btcAddress !== '') {
            this.adressQrCodeNum = 3
            // 绘制二维码
            downloadUrl = this.$utf16to8(this.btcAddress)
          }
        }
        $('#qrCodeBox').qrcode({
          render: 'canvas', //     table方式
          width: 140, //            宽度
          height: 140, //            高度
          text: downloadUrl //      任意内容
        })
      }
    }
  }
</script>
