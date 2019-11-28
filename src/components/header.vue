<template>
  <div>
    <div class="header">
      <div class="header-content linWrap">
        <router-link tag="div" to="/newExchange" class="logo">
          <img src="../assets/images/header/logo.svg" alt="">
        </router-link>
        <div class="headerRtBox">
          <ul class="nav">
            <li class="nav-li" v-for="(nav, index) in $t('header.navList')" :key="index" :class="{hoverLi: index === 2, hoverLi2: index === 5, routerLinkLi: routerNum === index}" @click="goPath(nav, index)">
              <a>{{nav.name}}</a>
              <span class="icon" v-if="nav.icon">
                <img width="21" height="9" src="../assets/images/eatGame/new.png"/>
              </span>
              <ul v-if="index === 2 || index === 5">
                <router-link tag="li" :to="item.path" v-if="nav.menu" v-for="item in nav.menu" :key="item.name">{{item.name}}</router-link>
                <li v-if="nav.lang" v-for="(item, index) in nav.lang" :key="item.name" @click="chooseLang(index)">{{item.name}}</li>
              </ul>
            </li>
          </ul>
          <div class="header-rt">
            <router-link tag="button" to="/login" class="header-rt-btn" v-show="!userInfo.userName">{{$t('header.text1')}}</router-link>
            <div class="header-rt-user" v-show="userInfo.userName">
              <div class="activeBox" @click="showMenu()" ref="userNameDiv">
                <img class="userImg" :src="userInfo.imgUrl" alt="">
                <span class="userName">{{userInfo.userName}}<i class="arrowDown" :class="{arrowActive: userMenuShow}"></i></span>
              </div>
              <ul class="dropDownMenu" :class="{dropDownMenuActive: userMenuShow}">
                <router-link tag="li" to="/account">{{$t('header.text2')}}</router-link>
                <li @click="logout()">{{$t('header.text3')}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="phoneHeader" :class="{whiteHeader: menuWhiteBgFlag}">
      <img src="../assets/images/header/logo.svg" alt="" class="phoneHeader-logo" @click="$router.push('/home')">
      <a class="menuBox" @click="showPhoneMenu()"><i></i></a>
      <div class="menuMask" :class="{activeMask: menuFlag}" @click="closePhoneMenu()"></div>
      <div class="popoverMenu" :class="{activeMenu: menuFlag}">
        <a class="close" @click="closePhoneMenu()"><i></i></a>
        <div class="popoverMenu-top">
          <img src="../assets/images/header/logo.svg" alt="">
        </div>
        <ul class="phoneNav">
          <li class="phoneNav-li" v-for="(nav, index) in $t('header.navList')" :key="index" :class="{activeLi: index === 2 && selectMenuFlag, langActiveLi: index === 5 && langMenuFlag, routerLinkLi: routerNum === index}" @click="goPath(nav, index)">
            <a>{{nav.name}}<i v-if="index === 2" :class="{arrowActive: selectMenuFlag}"></i><i v-if="index === 5" :class="{arrowActive: langMenuFlag}"></i></a>
            <ul v-if="index === 2 || index === 5">
              <router-link tag="li" :to="item.path" v-if="nav.menu" @click.native="closePhoneMenu()" v-for="item in nav.menu" :key="item.name">{{item.name}}</router-link>
              <li v-if="nav.lang" v-for="(item, index) in nav.lang" :key="item.name" @click="chooseLang(index)" :class="{langActive: langActive === index}">{{item.name}}</li>
            </ul>
          </li>
        </ul>
        <div class="popoverMenu-bt">
          <button @click="goLogin()" v-if="userInfo.length === 0">{{$t('header.text1')}}</button>
          <div class="userInfo" v-if="userInfo.length !== 0">
            <a @click="goAccount()" class="userInfo-lf">
              <img class="userImg" :src="userInfo.imgUrl" alt="">
              <div class="userNameBox">
                <p>{{userInfo.userName}}</p>
                <span>{{$t('header.text2')}}</span>
              </div>
            </a>
            <a class="userInfo-rt" @click="logout()">
              <div class="arrowRt"></div>
              <p>{{$t('header.text4')}}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 消息提醒-->
    <div class="alert-fixed" v-if="(arlertData.depositcount > 0 || arlertData.depositcountdaishoukuan > 0 || arlertData.drawcount > 0 || arlertData.drawcountdaidakuan > 0) && userInfo.isboss === 2">
      <!-- 充值的-->
      <div class="item-w" v-if="arlertData.depositcount > 0 || arlertData.depositcountdaishoukuan > 0">
        <div class="icon" @click="closeAlert(1)"></div>
        <div class="flex-item">
          <div class="img-box">
            <img src="../assets/images/myAccount/orderTrade/chongzhi.png" alt="">
          </div>
          <div class="right">
            <p>{{arlertData.depositStr}}</p>
          </div>
        </div>
        <p class="look"><span class="cursor" @click="lookInfo(1)">{{$t('shareOrderCenter.text33')}}</span></p>
      </div>
      <!-- 提现-->
      <div class="item-w" v-if="arlertData.drawcount > 0 || arlertData.drawcountdaidakuan > 0">
        <div class="icon" @click="closeAlert(2)"></div>
        <div class="flex-item">
          <div class="img-box">
            <img src="../assets/images/myAccount/orderTrade/tixian.png" alt="">
          </div>
          <div class="right">
            <p>{{arlertData.drawStr}}</p>
          </div>
        </div>
        <p class="look"><span class="cursor" @click="lookInfo(2)">{{$t('shareOrderCenter.text33')}}</span></p>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.alert-fixed
  position: fixed
  right: 10px
  top: 130px
  z-index: 10
  @media screen and (max-width: 1200px)
    display none
  .item-w
    width: 380px
    padding: 20px
    border-radius 4px
    box-shadow 0 0 5px #e0e0e0
    margin-bottom: 20px
    position: relative
    background-color: #fff
    .icon
      cursor pointer
      width: 10px
      height: 10px
      background: url("../assets/images/sieMoney/close.svg") no-repeat center / cover
      position: absolute
      right: 20px
      top: 14px
  .look
    display flex
    justify-content flex-end
    .cursor
      cursor pointer
      font-size: 14px
      color #FC534C
  .flex-item
    display flex
    align-items center
    justify-content center
    padding-right: 20px
    color #181818
    font-size: 14px
    margin-top: 10px
    .img-box
      width: 46px
      height: 44px
      margin-right: 16px
.header
  width 100%
  height 110px
  background-color #fff
  position fixed
  top 0
  z-index 999
  border-bottom 1px solid #d7d9db
  @media screen and (max-width: 1200px)
    display none
  .header-content
    height 100%
    display flex
    align-items center
    justify-content space-between
    .logo
      height 100%
      display flex
      align-items center
      border-bottom 1px solid #032e43
      cursor pointer
      img
        display block
        width 192px
        height 47px
    .headerRtBox
      height 100%
      display flex
      align-items center
      .nav
        height 100%
        font-size 14px
        color #181818
        li.nav-li
          height 100%
          float left
          margin-right 20px
          position relative
          .icon
            position absolute
            top 30px
            right 0px
          @media screen and (min-width: 1200px) and (max-width 1400px)
            margin-right 10px
            a
              /*padding 0 25px!important*/
          &.routerLinkLi
            background-color #032e43
            color #fff
          &:hover
            background url("../assets/images/eatGame/new_1.png") no-repeat/cover center
            background-color #032e43
            color #fff
            icon
              img
                display none
            ul
              display block
          a
            display block
            height 100%
            line-height 110px
            padding 0 31px
            cursor pointer
            @media screen and (min-width: 1200px) and (max-width 1600px)
              padding 0 10px
            &.router-link-active
              background-color #032e43
              color #fff
          ul
            position absolute
            top 109px
            left 0
            display none
            z-index: 111
            box-shadow 0 3px 15px #d9d9d9
            background #fff
            li
              width 165px
              height 50px
              line-height 50px
              text-align center
              color #181818
              cursor pointer
              user-select none
              background-color hsla(0,0%,100%,.5)
              &:hover
                color #fff
                background-color #032e43
      .header-rt
        height 100%
        display flex
        align-items center
        justify-content center
        .header-rt-btn
          width 168px
          height 44px
          border-radius 22px
          background-color #fc534c
          color #fff
          cursor pointer
          border none
          outline none
          user-select none
          &:active
            opacity .6
        .header-rt-user
          padding 0 16px
          height 100%
          position relative
          cursor pointer
          user-select none
          &:hover
            background-color #032e43
            .dropDownMenu
              display block
            .activeBox
              .userName
                color #fff
          .activeBox
            display flex
            align-items center
            height 100%
            .userImg
              display inline-block
              width 44px
              height 44px
              border-radius 100%
              margin-right 20px
              box-shadow 0 0 10px rgba(79,80,84,0.8)
            .userName
              font-size 14px
              color #000
          .dropDownMenu
            position absolute
            top 109px
            left 0
            display none
            z-index 99
            li
              width 165px
              height 50px
              line-height 50px
              font-size 14px
              text-align center
              color #181818
              cursor pointer
              user-select none
              background-color hsla(0,0%,100%,.5)
              &:hover
                color #fff
                background-color #032e43
.phoneHeader
  display none
  width 100%
  position fixed
  z-index 99
  top 0
  left 0
  padding-left 20px
  .phoneHeader-logo
    display none
    width 140px
    height 30px
  &.whiteHeader
    height 50px
    background-color #fff
    border-bottom 1px solid #d7d9db
    .phoneHeader-logo
      display block
  @media screen and (max-width: 1200px)
    display flex
    align-items center
  .menuMask
    width 100%
    height 100%
    position fixed
    left 0
    bottom 0
    background-color rgba(0,0,0,0.6)
    display none
    z-index 98
    &.activeMask
      display block
  .menuBox
    position absolute
    right 12px
    top 10px
    padding 3px 8px
    &:active
      opacity .6
    i
      display inline-block
      width 20px
      height 16px
      background url("../assets/images/header/menu.png") no-repeat
      background-size cover!important
  .popoverMenu
    background-color #fff
    width 72%
    height 100%
    position fixed
    top 0
    left 172%
    z-index 99
    transition all .5s linear
    padding 15px 20px
    box-shadow 5px 0px 20px rgba(0, 0, 0, 0.6)
    @media screen and (max-height: 550px) {
      padding 5px 20px
    }
    &.activeMenu
      left 28%
    .close
      position absolute
      padding 10px
      top 11px
      right 10px
      @media screen and (max-height: 550px) {
        top 21px
      }
      i
        display block
        width 16px
        height 16px
        background url("../assets/images/header/close.png") no-repeat
        background-size cover
    .popoverMenu-top
      width 140px
      height 30px
      margin 0 auto
      img
        display block
        width 100%
        height 100%
    .phoneNav
      margin-top 23px
      font-size 14px
      li.phoneNav-li
        display block
        text-align center
        position relative
        height 51px
        transition .3s
        overflow hidden
        @media screen and (max-height: 550px) {
          height 41px
        }
        &.activeLi
          height 126px
        &.langActiveLi
          /*height 198px*/
          height 126px
        &:after
          content ''
          width 100%
          height 1px
          background url("../assets/images/myAccount/dashed.png") repeat-x
          position absolute
          left 0
          bottom 0
        &.routerLinkLi
          font-weight bold
          a
            color #fc534c
        a
          color #171717
          display flex
          align-items center
          justify-content center
          padding 18px 0
          i
            display inline-block
            width 10px
            height 6px
            background url("../assets/images/header/arrow.png") no-repeat
            background-size cover
            margin-left 8px
            transition .2s
            &.arrowActive
              transform rotate(180deg)
        ul
          width 100%
          z-index 10
          li
            width 100%
            height 36px
            line-height 36px
            background-color #edeff1
            font-weight normal
            &.router-link-active
              color #fc534c
              font-weight bold
            &.langActive
              font-weight bold
              color #fc534c
    .popoverMenu-bt
      width 100%
      position absolute
      left 0
      bottom 15px
      padding 0 20px
      padding-right 12px
      button
        display block
        width 100%
        height 40px
        font-size 14px
        color #fff
        background-color #fc534c
        border-radius 3px
        outline none
        border none
        user-select none
        &:active
          opacity .6
      .userInfo
        display flex
        justify-content space-between
        .userInfo-lf
          display flex
          align-items center
          .userImg
            display block
            width 40px
            height 40px
            margin-right 10px
            border-radius 100%
            box-shadow 0 0 10px rgba(79,80,84,0.8)
          .userNameBox
            font-size 0
            p
              margin-bottom 3px
            span, p
              font-size 12px
              color #000
            span
              color #afb0b3
        .userInfo-rt
          display flex
          flex-direction column
          align-items center
          font-size 0
          padding 0 8px
          .arrowRt
            width 23px
            height 16px
            background url("../assets/images/header/arrowRt.png") no-repeat
            background-size cover
            margin-bottom 5px
          p
            color #afb0b3
            font-size 12px
</style>

<script>
import { i18n } from '../i18n/config'
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      isShowMessage: true,
      timer: null,
      depositcount: false,
      arlertData: [],
      routerNum: 0, // 导航栏触发状态样式
      menuWhiteBgFlag: true, // header背景
      userMenuShow: false,
      menuFlag: false, // 手机导航栏显示
      selectMenuFlag: false, // AI游戏下拉菜单
      langMenuFlag: false, // 语言下拉菜单
      langActive: 0 // 语言高亮
    }
  },
  computed: {
    ...mapGetters([
      'userInfo', // 用户信息
      'logoutFlag',
      'loginFlag'
    ]),
    routerPath () {
      return this.$route.path
    }
  },
  watch: {
    routerPath: function () {
      this.navActiveFun()
      this.checkActiveFun()
    }
  },
  created () {
    if (this.loginFlag) {
      this.alertMsg()
    }
  },
  mounted () {
    this.$store.dispatch('balanceAction')
    this.$nextTick(() => {
      this.navActiveFun()
      this.getUserInfo()
      this.checkActiveFun()
      this.timer = setInterval(() => {
        if (this.loginFlag) {
          if (this.userInfo.isboss === 2) {
            this.alertMsg()
          }
        }
      }, 5000)
      if (localStorage.getItem('kleinLang') !== null) { // 判断是什么语言，高亮
        if (localStorage.getItem('kleinLang') === 'CN') {
          this.langActive = 0
        } else if (localStorage.getItem('kleinLang') === 'EN') {
          this.langActive = 1
        } else if (localStorage.getItem('kleinLang') === 'JN') {
          this.langActive = 2
        } else if (localStorage.getItem('kleinLang') === 'KN') {
          this.langActive = 3
        }
      }
    })
  },
  methods: {
    closeAlert (index) {
      clearInterval(this.timer)
      if (index === 1) {
        this.arlertData.depositcount = -1
        this.arlertData.depositcountdaishoukuan = -1
      } else {
        this.arlertData.drawcount = -1
        this.arlertData.drawcountdaidakuan = -1
      }
    },
    lookInfo (index) {
      if (index === 1) {
        this.arlertData.depositcount = -1
        this.arlertData.depositcountdaishoukuan = -1
      } else {
        this.arlertData.drawcount = -1
        this.arlertData.drawcountdaidakuan = -1
      }
      this.$router.push({path: '/account/notOpenShareOrder/shareOrder', query: {isChongzhi: index, isStatus: 0, pageIndex: 1}})
      clearInterval(this.timer)
    },
    alertMsg () {
      let ajaxLang = ''
      if (localStorage.getItem('kleinLang') === 'EN') {
        ajaxLang = 'en'
      }
      this.$http.post(`${this.$api}/boss/alertMessageForBoss`, {}, {headers: {'secret-language': ajaxLang}}).then(res => {
        if (res.data.success === true) {
          this.arlertData = res.data.data
        }
      })
    },
    checkActiveFun () {
      let pathValue = this.$route.path.substring(this.$route.path.indexOf('/', 0), this.$route.path.indexOf('/', 1))
      if (pathValue === '/account') {
        this.menuWhiteBgFlag = false
        if (this.$route.path.indexOf('myAccount') !== -1) {
          this.menuWhiteBgFlag = true
        }
        if (this.$route.path.indexOf('myAccountPhone') !== -1) {
          this.menuWhiteBgFlag = false
        }
      } else if (this.$route.path.indexOf('activityLog') !== -1) {
        this.menuWhiteBgFlag = false
      } else if (this.$route.path.indexOf('pastRecord') !== -1) {
        this.menuWhiteBgFlag = false
      } else if (this.$route.path.indexOf('revenue') !== -1) {
        this.menuWhiteBgFlag = false
      } else if (this.$route.path.indexOf('shareBonusDetail') !== -1) {
        this.menuWhiteBgFlag = false
      } else if (this.$route.path.indexOf('situation') !== -1) {
        this.menuWhiteBgFlag = false
      } else if (this.$route.path.indexOf('transferRecords') !== -1) {
        this.menuWhiteBgFlag = false
      } else {
        this.menuWhiteBgFlag = true
      }
    },
    navActiveFun () {
      if (this.$route.path === '/home') { // 如果是我的用户
        this.routerNum = 0
      } else if (this.$route.path === '/addDetails') {
        this.routerNum = 0
      } else if (this.$route.path === '/add') {
        this.routerNum = 0
      } else if (this.$route.path === '/klein') {
        this.routerNum = 1
      } else if (this.$route.path === '/eatGame') {
        this.routerNum = 2
      } else if (this.$route.path === '/newExchange') {
        this.routerNum = 0
      } else if (this.$route.path === '/situation') {
        this.routerNum = 3
      } else if (this.$route.path === '/serialEat') {
        this.routerNum = 3
      } else if (this.$route.path === '/pastRecord') {
        this.routerNum = 4
      } else if (this.$route.path === '/pastRecordDetail') {
        this.routerNum = 4
      } else if (this.$route.path === '/giveReward') {
        this.routerNum = 4
      } else if (this.$route.path === '/snapQueue') {
        this.routerNum = 4
      } else if (this.$route.path === '/toAllPool') {
        this.routerNum = 4
      } else if (this.$route.path === '/futureBonus') {
        this.routerNum = 4
      } else if (this.$route.path === '/historyWinList') {
        this.routerNum = 4
      } else if (this.$route.path === '/aboutUs') {
        this.routerNum = 4
      } else {
        this.menuWhiteBgFlag = false
        this.routerNum = -1
      }
    },
    showPhoneMenu () { // 打开手机端导航栏
      this.menuFlag = true
      document.getElementsByTagName('body')[0].style = 'overflow: hidden'
    },
    closePhoneMenu () { // 关闭手机端导航栏
      this.menuFlag = false
      document.getElementsByTagName('body')[0].style = ''
    },
    getUserInfo () {
      this.$store.dispatch('balanceAction') // 登录成功后获取用户信息
    },
    showMenu (val) {
      this.userMenuShow = !this.userMenuShow
    },
    goPath (nav, index) {
      console.log(nav, index)
      if (index === 2) {
        this.selectMenuFlag = !this.selectMenuFlag
      } else if (index === 5) {
        this.langMenuFlag = !this.langMenuFlag
      } else {
        this.$router.push(nav.path)
        this.closePhoneMenu()
      }
    },
    goLogin () { // 登录
      this.$router.push('/login')
      this.closePhoneMenu()
    },
    logout () {
      this.$store.dispatch('logoutAction')
      this.closePhoneMenu()
    },
    goAccount () {
      this.$router.push('/account/myAccount')
      this.closePhoneMenu()
    },
    chooseLang (val) { // 选择语言
      this.langActive = val
      if (val === 0) {
        localStorage.setItem('kleinLang', 'CN')
        i18n.locale = 'CN'
      } else if (val === 1) {
        localStorage.setItem('kleinLang', 'EN')
        i18n.locale = 'EN'
      } else if (val === 2) {
        localStorage.setItem('kleinLang', 'JN')
        i18n.locale = 'JN'
      } else if (val === 3) {
        localStorage.setItem('kleinLang', 'KN')
        i18n.locale = 'KN'
      }
      window.location.reload()
    }
  }
}
</script>
