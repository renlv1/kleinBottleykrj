<template>
  <div>
    <div id="fixed-top-header">
        <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
        <h3 class="fixed-title">{{$t('safePassword.text2')}}</h3>
        <div class="padding">
          <div class="dashed-line margin"></div>
        </div>
      </div>
    <div class="pc-content">
      <div class="property-title">
        <h6><router-link to="/account/safettingCenter" class="property">{{$t('bindPhone.text15')}} > </router-link><span class="transfer">{{$t('safePassword.text2')}}</span></h6>
      </div>
      <div class="bindPhone secret-wrap">

        <div class="secret-wrap-ct">
          <!-- <h3 class="title">{{$t('safePassword.text2')}}</h3> -->
          <div class="inputTipBox inputTipBox-safe" style="z-index: 0">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="password" v-model.trim="safePwd" :placeholder="$t('safePassword.text4')" @focus="safePwdTipShow = false">
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: safePwdTipShow}">{{$t('safePassword.text4')}}</span>
          </div>
          <p class="safePwdTip">{{$t('safePassword.text3_1')}}</p>
          <div class="inputTipBox" style="z-index: 0">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="password" v-model.trim="reSafePwd" :placeholder="$t('safePassword.text6')" @focus="reSafePwdTipShow = false">
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: reSafePwdTipShow}">{{$t('safePassword.text6')}}</span>
          </div>

          <div class="vefiryType inputBox">
            <div class="type" v-if="userInfo.openGoogleCode ===2">
              Google{{$t('forgetPassword.text8')}}
            </div>
            <div class="type" v-if="userInfo.openGoogleCode !==2">
              邮箱{{$t('forgetPassword.text8')}}
            </div>
          </div>

          <div class="inputTipBox" :class="{inputTipBoxTab: codeTab === 4 || codeTab === 5}">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="text" v-model.trim="vCode" :placeholder="$t('forgetPassword.text9') + 'Google' + $t('forgetPassword.text10')" @focus="vCodeTipShow = false" v-if="userInfo.openGoogleCode ===2">
              <input class="secret-inputTip secret-input" type="text" v-model.trim="vCode" :placeholder="$t('safePassword.text10')" @focus="vCodeTipShow = false" v-if="userInfo.openGoogleCode !==2">
              <button class="secret-btn" ref="sendMsg" v-show="userInfo.openGoogleCode !==2" @click="sendPhoneCode()">获取</button>
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: vCodeTipShow}">{{$t('safePassword.text10')}}</span>
          </div>
          <button class="secret-btn complete-btn" @click="completeFun()">{{$t('safePassword.text12')}}</button>
        </div>
        <div class="myPopup" v-show="successShow">
          <div class="myPopup-tip">
            <h3 class="title">{{$t('safePassword.text13')}}</h3>
            <button class="secret-btn" @click="closeSuccessPopup()">{{$t('safePassword.text14')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  $a8 = #7a8199 // 文字颜色
  $f2 = #1f222e // 背景颜色
  $c26 = #1a1c26 // 背景颜色
  $cor52 = #525666 // 字体颜色
  $btn31 = #fc534c // 按钮颜色
  $border = #33384d // 边框颜色
  .inputBox
    width: 100%;
    border: 1px solid #999;
    color: #999;
    padding: 0 46px 0 40px;
    position: relative;
    margin-bottom: 40px;
    @media screen and (max-width: 1024px)
      margin-bottom: 60px;
    input
      width 100%
      height 70px
      border none

    i
      position absolute
      top 50%
      right 30px
      display inline-block
      width 16px
      height 16px
      background-image url("../../../assets/images/login/delete.png")
      transform translate(0,-50%)
      cursor pointer
      opacity 1
      &.close
        opacity 0
    span
      position absolute
      color #1a1a1a
      top 80px
      left 0
      font-size 14px
      &.errorMsg
        color #e60000
    &.vefiryType
      position relative
      width 100%
      height 70px
      border 1px solid #ccc
      padding 0 30px 0 40px
      .type
        height 70px
        width 100%
        line-height 70px
        font-size 16px
        cursor pointer
      i
        width 20px
        height 10px
        background-image url("../../../assets/images/login/select.png")
      ul
        position absolute
        top 70px
        left 0
        z-index 9
        width 100%
        box-shadow 0px 5px 20px rgba(0,0,0,0.6)
        height 0
        overflow hidden
        transition all 0.5s
        &.close
          height 100px
        li
          height 50px
          background-color #fff
          border-bottom 1px solid #ccc
          line-height 50px
          text-align center
          cursor pointer
          color #1a1a1a
          font-size 16px
          &.active
            font-weight bold
          &.disable
            cursor no-drop
            color #bbb
          &:hover
            font-weight bold
  .list-content
    p
      display block
      span
        font-size 18px!important
  .secret-content66
    width 660px
    padding-top 60px
  .secret-content72
    width 720px
    padding-top 60px
  .secret-title
    font-size 20px
    color #fff
    margin-bottom 30px
  .secret-subtitle
    margin-bottom 60px
  .secret-list
    li
      height 120px
      padding-left 40px
      padding-right 60px
      border-radius 6px
      background-color $f2
      margin-bottom 30px
      display flex
      align-items center
      justify-content space-between
      &.first-li
        height 60px
        .title
          margin-bottom 0
      &:last-child
        margin-bottom 0
      .title
        font-weight normal
        color $a8
        margin-bottom 15px
      .li-rt
        font-size 0
      .li-btBox
        flex 1
        .li-bt
          display flex
          justify-content space-between
          span
            color #fff
            font-weight bold
            i
              color $a8
          .li-bt-btn
            font-size 0
            .secret-a
              font-size 18px
              margin-right 40px
              font-weight bold
              &:last-child
                margin-right 0
  //  tab切换
  .secret-tab
    width 100%
    border-radius 6px
    display flex
    overflow hidden
    li
      flex 1
      height 48px
      line-height 48px
      text-align center
      background-color $f2
      color #fff
      cursor pointer
      user-select none
      &.tabActive
        background-color $btn31
  .inputTipBox
    padding-bottom 30px
    position relative
    overflow hidden
    &.inputTipBox-select
      overflow inherit
    .inputTip-title
      display flex
      justify-content space-between
      margin-bottom 18px
      span
        i
          color $btn31
    .inputTipDiv
      // background-color $f2
      position relative
      // z-index 20
      .select-input
        padding-right 60px
      .discount-btn
        width 60px
        height 100%
        position absolute
        font-size 0
        top 6px
        display flex
        align-items center
        justify-content center
        cursor pointer
        user-select none
      .selectMenu
        width 100%
        height 0
        position absolute
        top 68px
        left 0

        border-top none
        border-bottom-right-radius 6px
        border-bottom-left-radius 6px
        transition height 0.3s linear
        background #fff
        z-index 20
        overflow hidden
        &.selectMenuActive
          height 180px
          padding 10px 0
          border 1px solid #a6aba5
        li
          height 40px
          line-height 40px
          padding 0 20px
          user-select none
          cursor pointer
          &:hover
            color #fc534c
          &.liActive
            color #fc534c
      .secret-btn
        width 100px
        background-color transparent
        margin-top 0
        position absolute
        top 0
        right 0
        color $btn31
    .secret-inputTip
      // background-color $c26
    .inputTipMsg
      z-index 10
      font-size 16px
      position absolute
      top 55px
      color $btn31
      opacity 0
      transition all .15s linear
      &.inputTipMsgActive
        opacity 1
        top 70px
  // 按钮
  .secret-btn
    display block
    width 100%
    height 48px
    background-color $btn31
    color #fff
    border-radius 6px
    font-size 18px
    outline none
    border none
    user-select none
    cursor pointer
    &:active
      opacity .6
  // 文字按钮
  .secret-a
    color $btn31
    cursor pointer
    user-select none
    &:active
      opacity .6
  .arrowDown
    display inline-block
    width 13px
    height 8px
    // background url("assets/images/basic/arrow_down.png") no-repeat
    background-size cover!important
    transform-origin 50% 20%
    transition .2s
    &.arrowActive
      transform rotate(180deg)
  body
    font-size 18px
    color $a8
    background-color #12131a
    font-family "Microsoft YaHei UI"
    -webkit-tap-highlight-color transparent
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button
    -webkit-appearance none
  input[type="number"]
    -moz-appearance textfield
  .myPopup
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
    position fixed
    left 0
    top 0
    background-color rgba(0,0,0,0.5)
    z-index 99
    &.verificationPopup
      .myPopupBox
        padding-left 0
        padding-right 0
        .verificationForm
          padding 0 40px
        .popupBtn
          display flex
          margin-top 60px
          border-top 1px solid $c26
          .secret-btn
            height 60px
            border-radius 0
            &:first-child
              color $cor52
              background-color $f2
    .myPopupBox
        width 480px
        padding-top 60px
        padding-left 40px
        padding-right 40px
        background-color $f2
        border-radius 12px
        overflow hidden
        .secret-title
          font-size 24px
        .secret-inputTip
          border-radius 24px
        .secret-inputTip
          padding 0 30px
    .myPopup-tip
      width 400px
      text-align center
      background-color $f2
      padding 60px 40px
      border-radius 12px
      position relative
      .close-btn
        position absolute
        top 10px
        right 10px
        display flex
        align-items center
        justify-content center
        width 40px
        height 40px
        z-index 999
        cursor: pointer
        opacity .3
        transition all .15s linear
        &:hover
          opacity 1
        img
          display block
          width 16px
          height 16px
      h3.title
        font-weight bold
        color #fff
        font-size 20px
        margin-bottom 40px
      .subtitle
        text-align center
        line-height 1.5
        margin-bottom 50px
      .secret-btn
        background-color $btn31
  .nav ul .router-link-active
    color $btn31
  .copy-btn
    display inline-block
    width 32px
    height 32px
    background-size cover!important
    cursor pointer
    user-select none
    &:active
      opacity .6
  .secret-log
    .secret-title
      margin-bottom 0
    .secret-table
      margin-top 40px
      tr
        &:first-child
          background-color $f2
        td
          flex 1
          &:nth-child(2), &:nth-child(3)
            flex 1.8
          &:nth-child(4), &:nth-child(5)
            flex 1.3
  .secret-table
    display block
    margin-top 60px
    border-radius 6px
    border 1px solid $border
    overflow hidden
    tr
      height 48px
      display flex
      align-items center
      border-bottom 1px solid $border
      &:last-child
        border-bottom none
      &.secret-table-title
        background-color $f2
        justify-content center
      td
        display block
        flex 1
        text-align center
        &:nth-child(2), &:nth-child(3), &:nth-child(4)
          flex 1.4
        &:last-child
          flex 2
  .detail-table
    display block
    margin-top 40px
    border 1px solid $border
    border-radius 6px
    overflow hidden
    tr
      display flex
      border-bottom 1px solid $border
      &:last-child
        border-bottom none
      td
        display flex
        align-items center
        justify-content center
        padding 12px 0
        text-align center
        &:first-child
          width 140px
          background-color $f2
        &:last-child
          flex 1
          padding 12px 60px
      &.hashTr
        td
          span
            width 100%
            word-break break-all
            line-height 1.5
            text-align center
  .transferIn
    padding-top 60px
    width 750px
    .subtitle
      line-height 1.5
      margin-bottom 20px
    .tip
      line-height 1.5
      margin-bottom 70px
      span
        color $btn31
    .qrCodeBox
      text-align center
      .qrCode
        display flex
        width 240px
        height 240px
        align-items center
        justify-content center
        background-color #fff
        margin 0 auto
      .qrCodeBox-tip
        margin-top 20px
      .qrCodeBox-address
        margin-top 80px
        margin-bottom 40px
      .secret-btn
        width 240px
        display inline-block
  .secret-wrap
    position relative
    .secret-wrap-ct
      .title
        font-size 30px
        color #ffffff
        text-align center
        margin-bottom 60px
      .complete-btn
        margin-top 50px
  .secret-back
    display flex
    align-items center
    position absolute
    top 60px
    left 60px
    font-size 20px
    font-weight bold
    cursor pointer
    user-select none
    color $btn31
    &:active
      opacity .6
    img
      display inline-block
      width 24px
      height 24px
  .noticeDetail
    .secret-wrap-ct
      .content
        p
          line-height 1.5

  $f2 = #1f222e // 背景颜色
  $c26 = #1a1c26 // 背景颜色
  $btn31 = #c31739 // 按钮颜色
  $border = #33384d // 边框颜色
  .bindPhone
    .inputTipBox
      padding-bottom 30px
      &.inputTipBox-select
        .inputTipDiv
          .secret-input.secret-input-bordernone
            // border 1px solid $border
            // background-color $c26
          .selectMenu.selectMenuActive
            height 140px
            z-index 999
            overflow-x hidden
            overflow-y auto
            &::-webkit-scrollbar
              width 0px
              height 0px
          .discount-btn
            right 0
            // background-color $btn31
            border-bottom-right-radius 6px
            border-top-right-radius 6px
            .arrowDown
              width 10px
              height 10px
              border 10px solid transparent
              border-top-color #aaa
              // background url("../../assets/images/basic/arrow_down_white.png") no-repeat
          .selectMenuActive
            height 100px
  .secret-input
    display: block;
    width: 100%;
    height: 68px;
    padding: 0 30px;
    border-radius: 4px;
    font-size: 18px;
    background-color: transparent;
    color: #000;
    outline: none;
    border: 1px solid #a6aeb5;
    transition: border-color 0.15s ease-in-out;
    box-sizing: border-box
  .inputTipBox .inputTipDiv .secret-btn
    width: 200px;
    background-color: #fc534c;
    margin-top: 0;
    position: absolute;
    top: 1px;
    height: auto;
    right: 1px;
    bottom 1px
    color: #fff;
    border-radius 0px
  .secret-btn
    display: block;
    width: 100%;
    height: 68px;
    background-color: #fc534c;
    color: #fff;
    border-radius: 6px;
    font-size: 18px;
    outline: none;
    border: none;
    user-select: none;
    cursor: pointer;
  .pc-content{
    margin-left: 92px;
    margin-right: 20px;
    max-width: 1070px;
    margin-top: 90px;
    @media screen and (max-width: 1200px) {
      margin: 80px 3% 0
      .property-title{
        display none
      }
      .secret-input{
        height 48px
        font-size 14px
        padding-left 15px
      }
      .inputTipBox .inputTipMsg.inputTipMsgActive{
        top 50px
      }
      .secret-btn{
        height 48px
      }
      .inputTipBox .inputTipDiv .selectMenu{
        top 48px
      }
      .secret-wrap .secret-wrap-ct .complete-btn{
        margin-top 0
      }
      .bindPhone .inputTipBox{
        padding-bottom 30px
      }
      .bindPhone .safePwdTip{
        font-size 14px
        padding-left 0
        margin-top -5px
        margin-bottom 20px
      }
      // .inputTipBox-safe{
      //   padding-bottom 0
      //   .inputTipMsg.inputTipMsgActive{
      //     top 70px
      //   }
      // }
    }

  }
  .property-title{
    margin-bottom: 60px;
      h6{
        background-color: #edeff1;
        height: 64px;
        font-size: 20px;
        color: #181818;
        align-items: center;
        display: flex;
        &:before{
          content: '';
          width: 10px;
          height: 22px;
          display: inline-block;
          background-color: #000;
          margin-right: 28px;
        }
      }
      a{
        font-size: 20px;
        color: #181818;
      }
  }
  $f2 = #1f222e // 背景颜色
  $c26 = #1a1c26 // 背景颜色
  $btn31 = #c31739 // 按钮颜色
  $border = #33384d // 边框颜色
  .bindPhone
    .safePwdTip
      font-size 16px
      margin-bottom 30px
      padding-left 30px
      color #999
    .inputTipBox
      padding-bottom 40px
      &.inputTipBox-safe
        padding-bottom 30px
      &.inputTipBoxTab
        .inputTipMsg
          top 12px
          &.inputTipMsgActive
            top 52px
    .secret-tab
      margin-bottom: 40px;
</style>

<script>
import Dialog from '@/components/globalDialog/dialog'
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      codeTab: 3, // 1有谷歌没有手机，2有手机没有谷歌，3没有手机，没有谷歌，4既有手机也有谷歌
      safePwd: '', // 安全密码
      safePwdTipShow: false,
      reSafePwd: '', // 确认安全密码
      reSafePwdTipShow: false,
      vCode: '',
      vCodeTipShow: false,
      sendBtnTimes: 60,
      successShow: false,
      toggle: false,
      curType: {
        text: 'Google',
        type: 3
      },
      vefiryType: [
        {
          text: this.$t('forgetPassword.text14'),
          type: 1
        },
        {
          text: 'Google',
          type: 3
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
  },
  watch: {
    // userInfo: function () {
    //   this.codeWayFun()
    // }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('balanceAction') // 获取用户信息
    })
  },
  methods: {
    // codeWayFun () {
    //   if (this.userInfo.openGoogleCode === 2) {
    //     this.codeTab = 1 // 只有谷歌
    //     if (this.userInfo.openMobileCode === 2) {
    //       this.codeTab = 4 // 谷歌和手机都有
    //     }
    //   } else if (this.userInfo.openMobileCode === 2) {
    //     this.codeTab = 2 // 只有手机
    //   } else {
    //     this.codeTab = 3 // 谷歌和手机都没有
    //   }
    // },
    // 选择验证方式 2 代表开通
    selectType (item) {
      if (item.type === 3 && this.userInfo.openGoogleCode !== 2) {
        return false
      } else if (item.type === 1 && this.userInfo.openMobileCode === 2) {
        return false
      } else {
        this.curType = item
        this.toggle = false
      }
    },
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = this.$t('bindPhone.text8')
        this.sendBtnTimes = 60
        this.$refs.sendMsg.style.color = 'rgba(201,0,16)'
        this.$refs.sendMsg.disabled = false
      } else {
        this.sendBtnTimes--
        this.$refs.sendMsg.innerHTML = this.sendBtnTimes
        this.$refs.sendMsg.disabled = true
        // this.$refs.sendMsg.style.color = 'rgba(255,255,255,0.6)'
        setTimeout(() => this.countDown(), 1000)
      }
    },
    sendPhoneCode () { // 发送验证码
      let formData = new FormData()
      let sendCodeMsg // 发送提醒
      if (this.codeTab === 3) {
        formData.append('email', this.userInfo.email)
        formData.append('type', 1) // 邮箱
        let ajaxLang = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang = 'en'
        }
        this.$http.post(`${this.$api}/register/sendEmailCode`, formData, {headers: {'secret-language': ajaxLang}}).then(res => {
          if (res.data.success) {
            sendCodeMsg = this.$t('safePassword.text15')
          } else {
            sendCodeMsg = res.data.msg
          }
          // this.$store.dispatch('errAction', {bool: true, msg: sendCodeMsg}) // 弹窗提示
          Dialog({msg: sendCodeMsg})
        }).catch((err) => {
          console.log(err)
        })
      }
      this.countDown()
    },
    completeFun () {
      if (this.safePwd === '') {
        this.safePwdTipShow = true
      }
      if (this.reSafePwd === '' || this.safePwd !== this.reSafePwd) {
        this.reSafePwdTipShow = true
      }
      if (this.vCode === '') {
        this.vCodeTipShow = true
      }
      if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,14}$/).test(this.safePwd)) {
        Dialog({
          msg: this.$t('safePassword.text16')
        })
        return
      }
      if (this.safePwd !== '' && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,14}$/).test(this.safePwd) && this.safePwd === this.reSafePwd && this.vCode !== '') {
        let codeType
        if (this.userInfo.openGoogleCode === 2) {
          codeType = 3
        } else {
          codeType = 1
        }
        let formData = new FormData()
        formData.append('tradePwd', this.safePwd)
        formData.append('verifyCode', this.vCode)
        formData.append('type', codeType)
        let ajaxLang = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang = 'en'
        }
        this.$http.post(this.$api + '/user/setTractionPwdNew', formData, {headers: {'secret-language': ajaxLang}}).then(res => {
          if (res.data.success) {
            this.sendBtnTimes = 0 // 关闭倒计时
            // this.successShow = true
            Dialog({
              msg: this.$t('bindPhone.text11'),
              okFn: () => {
                this.$router.go(-1)
              }
            })
          } else {
            // this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
            Dialog({
              title: this.$t('bindPhone.text14'),
              msg: res.data.msg
            })
          }
        })
      }
    },
    closeSuccessPopup () {
      this.successShow = false // 设置成功//  跳转路由(登录)
      this.$router.go(-1)
    }
  }
}
</script>
