<template>
  <div class="gogle-w">
    <h3 id="record-title">
      <span class="line"></span>
      <div>
        <span  @click="$router.go(-1)" class="pointer">{{$t('safeSett.text2')}}</span>
        <span>&gt;</span>
        <span>{{$t('safeSett.text13')}}</span>
      </div>
    </h3>
    <div class="content content1">
      <div class="qrcode" id="qrcode-three"></div>
      <p class="text" id="copyAddress_input2">{{$route.query.secret}}</p>
      <p class="copy" @click="copyAddress()" ref="addressCopy1" data-clipboard-action="copy" data-clipboard-target="#copyAddress_input2">{{$t('safeSett.text14')}}</p>
    </div>
    <div class="content content2">
      <p>1、{{$t('safeSett.text15')}}</p>
      <div class="btn" @click="gotoTwo">{{$t('safeSett.text16')}}</div>
    </div>
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('safeSett.text17')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="mobile-content">
      <p class="text-desc">1、{{$t('safeSett.text15')}}</p>
      <div class="qrcode" id="qrcode-three2"></div>
      <p class="text" id="copyAddress_input3">{{$route.query.secret}}</p>
      <p class="copy" @click="copyAddress2()" ref="addressCopy2" data-clipboard-action="copy" data-clipboard-target="#copyAddress_input3">{{$t('safeSett.text14')}}</p>
      <div class="btn" @click="gotoTwo">{{$t('safeSett.text16')}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import $ from 'jquery'
import '@/assets/js/jquery.qrcode.min'
import Dialog from '@/components/globalDialog/dialog'
export default {
  data () {
    return {
      copyBtn: null,
      copyBtn2: null
    }
  },
  mounted () {
    setTimeout(() => {
      $('#qrcode-three').empty()
      $('#qrcode-three2').empty()
      let downloadUrl = this.$utf16to8(this.$route.query.qrData)
      $('#qrcode-three').qrcode({
        render: 'canvas', //     table方式
        width: 260, //            宽度
        height: 260, //            高度
        text: downloadUrl //      任意内容
      })
      $('#qrcode-three2').qrcode({
        render: 'canvas', //     table方式
        width: 160, //            宽度
        height: 160, //            高度
        text: downloadUrl //      任意内容
      })
      this.copyBtn = new this.Clipboard(this.$refs.addressCopy1)
      this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2)
    }, 20)
  },
  methods: {
    goback () {
      this.$router.push('/account/safettingCenter')
    },
    gotoTwo () { // 设置过安全问题直接跳转到 第三步
      if (Number(this.$route.query.setsafe) === 1) {
        this.$router.push({
          path: '/account/safettingCenter/gogleThree',
          query: {isSafe: 1}
        })
      } else { // 没有跳转到第二步
        this.$router.push({
          path: '/account/safettingCenter/gogleTwo'
        })
      }
    },
    // 复制
    copyAddress () {
      let clipboard = this.copyBtn
      clipboard.on('success', () => {
        Dialog({
          msg: this.$t('myAccount.text29')
        })
        clipboard.destroy()
        this.copyBtn = new this.Clipboard(this.$refs.addressCopy1) // 复制
      })
    },
    // 复制
    copyAddress2 () {
      let clipboard = this.copyBtn2
      clipboard.on('success', () => {
        Dialog({
          msg: this.$t('myAccount.text29')
        })
        clipboard.destroy()
        this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2) // 复制
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .gogle-w
    padding-top: 70px;
    padding-left: 92px;
    max-width: 1000px;
    box-sizing content-box
    @media screen and (max-width 1600px)
      padding-left: 50px
      padding-right: 50px
    @media screen and (max-width 1200px)
      padding: 0
      max-width 100%
    .content
      border: 1px solid #a6aeb5
      display flex
      align-items center
      justify-content center
      flex-direction column
      @media screen and (min-width 1200px)
        display flex
      @media screen and (max-width 1200px)
        display none
      .qrcode
        width: 260px
        height: 260px
      .text
        font-size: 20px
        color #181818
        margin: 20px 0 24px
      .copy
        cursor pointer
        font-size: 20px
        border-bottom: 1px solid #FC534C
        color #FC534C
    .content1
      margin: 50px 0 30px
      padding: 80px 0
    .content2
      padding: 85px 0 75px
      font-size: 18px
      color #181818
      .btn
        cursor pointer
        border-radius 6px
        margin-top: 55px
        width: 385px
        height: 68px
        background-color: #FC534C
        display: flex
        align-items center
        justify-content center
        color #ffffff
    .mobile-content
      padding: 100px 15px 0
      color #181818
      display flex
      align-items center
      justify-content center
      flex-direction column
      @media screen and (min-width 1200px)
        display none
      @media screen and (max-width 1200px)
        display flex
      .text-desc
        font-size: 18px
        @media screen and (max-width 1200px)
          font-size: 12px
      .qrcode
        width: 260px
        height: 260px
        margin: 40px 0 20px
        @media screen and (max-width 1200px)
          width: 160px
          height: 160px
          margin: 20px 0
      .text
        font-size: 20px
      .copy
        font-size: 20px
        color #FC534C
        margin-top: 24px
      .btn
        cursor pointer
        border-radius 6px
        margin: 55px 0 50px
        width: 300px
        height: 50px
        font-size: 16px
        background-color: #FC534C
        display: flex
        align-items center
        justify-content center
        color #ffffff
        @media screen and (max-width 1200px)
          width: 100%
          margin: 30px 0
</style>
