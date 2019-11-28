<template>
  <div class="footer" v-show="hiddenFooter">
    <div class="footer-content">
      <div class="footer-content-top linWrap">
        <ul>
          <router-link tag="li" :to="item.path" v-for="(item, index) in $t('header.navList2')" :key="index">{{item.name}}</router-link>
        </ul>
        <div class="friendsLink">
          <span>{{$t('header.text5')}}：</span>
          <a href="https://secretworth.com" target="_blank">{{$t('header.text6')}}</a>
        </div>
      </div>
      <div class="footer-line"></div>
      <div class="footer-content-bt linWrap">© KBAI 2018 ALL RIGHTS RESERVED</div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.footer
  border-top 1px solid #edeff1
  background-color #181818
  @media screen and (max-width: 768px)
    height auto
  .footer-content
    height 100%
    color #fff
    font-size 14px
    .footer-content-top
      height 80px
      display flex
      justify-content space-between
      align-items center
      @media screen and (max-width: 900px)
        display block
        height auto
        padding 20px 0
      ul
        overflow hidden
        @media screen and (max-width: 900px)
          display flex
          justify-content center
        @media screen and (max-width: 768px)
          display block
        li
          float left
          padding 10px 20px
          margin-right 40px
          cursor pointer
          user-select none
          @media screen and (max-width: 768px)
            display block
            float none
            margin-right 0
            text-align center
          &:active
            opacity .6
          &:last-child
            margin-right 0
      .friendsLink
        display flex
        align-items center
        justify-content center
        @media screen and (max-width: 768px)
          margin-top 20px
        span
          font-size 14px
          display inline
        a
          font-size 14px
          margin-left 20px
          color #fff
    .footer-line
      height 1px
      width 100%
      background-color #303030
    .footer-content-bt
      height 60px
      line-height 60px
      font-size 12px
      text-align center
</style>

<script>
export default{
  data () {
    return {
      hiddenFooter: true
    }
  },
  mounted () {
    this.getpathFooter()
    let self = this
    window.onresize = function () {
      self.getpathFooter()
    }
  },
  methods: {
    getpathFooter () {
      if (this.$route.path.indexOf('account') !== 0 && window.innerWidth < 1200) {
        this.hiddenFooter = false
      } else if (this.$route.path.indexOf('exchange') !== 0 && window.innerWidth < 1200) {
        this.hiddenFooter = false
      } else {
        this.hiddenFooter = true
      }
    }
  },
  watch: {
    '$route': 'getpathFooter'
  }
}
</script>
