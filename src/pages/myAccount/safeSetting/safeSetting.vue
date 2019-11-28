<template>
  <div class="safe-setting">
    <div class="pc">
      <div class="pc-content">
        <div class="property-title">
          <h6><router-link to="/account/myAccount" class="property">{{$t('safeSett.text1')}}</router-link><span class="transfer">> {{$t('safeSett.text2')}}</span></h6>
        </div>
        <div class="setting">
          <!-- 判断是否绑定手机 -->
          <!--<router-link v-if="!userInfo.mobile" class="isClick" tag="li" to="/account/safettingCenter/mobileSetting">-->
            <!--<div class="link-left">1.{{$t('safeSett.text3')}}</div>-->
            <!--<div class="link-right" style="color: #FC534C; border-bottom: 1px solid #FC534C">{{$t('safeSett.text4')}}</div>-->
          <!--</router-link>-->
          <!--<router-link v-else tag="li" to="">-->
            <!--<div class="link-left">1.{{$t('safeSett.text3')}}</div>-->
            <!--<div class="link-right" style="color: #999">+{{userInfo.phoheCode}} {{userInfo.mobile}}</div>-->
          <!--</router-link>-->
          <!-- 修改密码 -->
          <router-link class="isClick" tag="li" :to="{path: '/inputEmail', query: {myAccount: 1}}">
            <div class="link-left">1.{{$t('forgetPassword.text23')}}</div>
            <div class="link-right" style="color: #FC534C; border-bottom: 1px solid #FC534C" v-if="userInfo.openTradePassword && this.userInfo.openTradePassword !== 2">{{$t('safeSett.text4')}}</div>
            <div class="link-right" style="color: #999" v-if="userInfo.openTradePassword && this.userInfo.openTradePassword === 2">{{$t('safeSett.text44')}}</div>
          </router-link>
          <!-- 判断是否绑定安全密码 -->
          <router-link class="isClick" tag="li" to="/account/safettingCenter/safePassword">
            <div class="link-left">2.{{$t('safeSett.text5')}}</div>
            <div class="link-right" style="color: #FC534C; border-bottom: 1px solid #FC534C" v-if="userInfo.openTradePassword && this.userInfo.openTradePassword !== 2">{{$t('safeSett.text4')}}</div>
            <div class="link-right" style="color: #999" v-if="userInfo.openTradePassword && this.userInfo.openTradePassword === 2">{{$t('safeSett.text44')}}</div>
          </router-link>
          <!-- 判断是否绑定谷歌验证码 -->
          <li class="isClick" @click="bindSafe" v-if="userInfo.openGoogleCode && userInfo.openGoogleCode !== 2">
            <div class="link-left">3.{{$t('safeSett.text7')}}</div>
            <div class="link-right" style="color: #FC534C; border-bottom: 1px solid #FC534C">{{$t('safeSett.text4')}}</div>
          </li>
          <li v-if="userInfo.openGoogleCode && this.userInfo.openGoogleCode === 2" class="isClick" @click="unBind">
            <div class="link-left">3.{{$t('safeSett.text7')}}</div>
            <div class="link-right" style="color: #999">{{$t('safeSett.text8')}}</div>
          </li>
        </div>
      </div>
      <div class="dialog-box" v-if="isDialog">
        <div class="dialog-content">
          <div class="dialog">
            <div class="close isClick" @click="closeDialog">
              <img width="20" height="21" src="../../../assets/images/myAccount/input_close.svg">
            </div>
            <div class="dialog-title">{{$t('safeSett.text9')}}</div>
            <div class="rule">{{$t('safeSett.text10')}}</div>
            <div class="input-box">
              <input class="tradingCenter-input" type="password" v-model="validation" ref="validation" :placeholder="$t('safeSett.text11')" @keyup.enter="confirm">
            </div>
            <button @click="confirm" class="btn">{{$t('safeSett.text12')}}</button>
          </div>
        </div>
      </div>
      <div class="dialog-box" v-if="isSuccess">
        <div class="dialog-content">
          <div class="dialog">
            <div class="close isClick"  @click="close">
              <img width="20" height="21" src="../../../assets/images/myAccount/input_close.svg">
            </div>
            <div class="rule">{{error}}</div>
            <button class="btn" @click="close">{{$t('safeSett.text12')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--to="/account/safettingCenter/gogoleSetting"-->
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isDialog: false,
      validation: '',
      data: '',
      error: '',
      isSuccess: false
    }
  },
  created () {
    this.$store.dispatch('balanceAction')
  },
  mounted () {
    let self = this
    if (window.innerWidth < 1200) {
      this.$router.push('/account/myAccountPhone')
    }
    window.onresize = function () {
      self.getPathSelf()
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ])
  },
  methods: {
    getPathSelf () {
      if (this.$route.path === '/account/safettingCenter') {
        if (window.innerWidth < 1200) {
          this.$router.push('/account/myAccountPhone')
        }
      }
    },
    close () {
      this.isSuccess = false
    },
    bindSafe () {
      this.validation = ''
      this.isDialog = true
    },
    unBind () {
      this.$router.push('/account/safettingCenter/gogoleSetting')
    },
    closeDialog () {
      this.isDialog = false
    },
    confirm () {
      this.error = ''
      let ajaxLang1 = ''
      if (localStorage.getItem('kleinLang') === 'EN') {
        ajaxLang1 = 'en'
      }
      this.$http.post(`${this.$api}/user/googleOpenClose?type=1&tradePwd=${this.validation}`, {}, {headers: {'secret-language': ajaxLang1}}).then((res) => {
        if (res.data.success === true) {
          let data = res.data.data.qrUrl
          let secret = res.data.data.secret
          this.isDialog = false
          this.isSuccess = false
          this.$router.push({path: '/account/safettingCenter/gogleOne', query: {qrData: data, secret: secret, setsafe: res.data.mapData.setsafe}})
        } else {
          this.isSuccess = true
          this.isDialog = false
          this.error = res.data.msg
          // console.log(this.error)
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .pc
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
          .transfer
            margin-left 8px
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
      .setting
        li
          display flex
          flex-direction row
          padding 0 28px
          justify-content space-between
          align-items center
          height: 64px;
          &:nth-child(odd) {
            background-color: #edeff1;
          }
          &:nth-child(even) {
            background-color: #fafafa;
          }
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
      background-color:rgba(0,0,0,.5)
      .dialog-content
        /*height 60%*/
        width 600px
        position relative
        @media screen and (max-width: 1024px) {
          width 90%
        }
        .dialog
          overflow: auto
          margin 0 auto
          text-align: center
          border-radius: 8px;
          box-shadow: 0 0 5px #d7d9db;
          width 100%
          padding: 0 50px
          // height 100%
          max-height 100%
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
            margin 20px auto
            font-weight bold
          .rule
            margin 40px auto
            text-align: center
            font-size 20px
            color #fc534c
            font-weight bold
          .input-box
            .tradingCenter-input
              width: 100%
              height: 48px
              padding: 0 20px
              box-sizing border-box
              color #181818
              border: 1px solid #d7d9db
              border-radius 4px
              font-size: 18px
          .btn
            width: 100%
            padding 11px 0
            text-align center
            background #fc534c
            border-radius 4px
            border 1px solid #d7d9db
            cursor pointer
            user-select none
            font-family "Microsoft YaHei UI"
            font-size 20px
            color #fff
            margin 50px 0 70px 0
            @media screen and (max-width: 1024px) {
              margin-top 20px
              width: 80%
            }
</style>
