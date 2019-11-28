<template>
  <div class="klein">
    <div class="klein-top">
      <div class="linWrap">
        <img src="../../assets/images/klein/aiHead.jpg" alt="">
        <h3>{{$t('klein.text1')}}</h3>
        <p>{{$t('klein.text2')}}</p>
        <p>{{$t('klein.text3')}}</p>
      </div>
    </div>
    <div class="klein-bt linWrap">
      <ul class="klein-bt-list">
        <li class="klein-bt-list-li">
          <h3 class="li-title">{{$t('klein.text4')}}</h3>
          <p>{{$t('klein.text5')}}</p>
        </li>
        <li class="klein-bt-list-li">
          <h3 class="li-title">{{$t('klein.text6')}}</h3>
          <ul class="ulOne">
            <li>{{$t('klein.text7')}}</li>
            <li>{{$t('klein.text8')}}</li>
            <li>{{$t('klein.text9')}}</li>
            <li>{{$t('klein.text10')}}</li>
          </ul>
        </li>
        <li class="klein-bt-list-li" ref="loopLi">
          <h3 class="li-title">{{$t('klein.text11')}}</h3>
          <div class="robotBox">
            <img src="../../assets/images/klein/robot.svg" alt="" class="robotImg">
            <div class="robotBox-rt">
              <h3>{{$t('klein.text12')}}</h3>
              <ul class="robotBox-list">
                <li>{{$t('klein.text13')}}</li>
                <li>{{$t('klein.text14')}}</li>
                <li>{{$t('klein.text15')}}</li>
                <li>{{$t('klein.text16')}}</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.klein
  background-color #fff
  .linWrap
    width 1128px
    @media screen and (max-width: 1128px)
      width 100%
      padding 0 20px
  .klein-top
    text-align center
    font-size 0
    padding 80px 0
    border-bottom 1px solid #edeff1
    @media screen and (max-width: 1128px)
      padding-top 100px
    img
      display inline-block
      width 384px
      height auto
      @media screen and (max-width: 767px)
        width 100%
    h3
      font-size 22px
      color #032e43
      margin-top 40px
      margin-bottom 20px
    p
      font-size 14px
      text-align center
      margin 0 auto
      line-height 2.5
      @media screen and (max-width: 700px)
        width 100%
  .klein-bt
    padding-top 64px
    padding-bottom 160px
    @media screen and (max-width: 700px)
      padding-bottom 60px
    ul.klein-bt-list
      li.klein-bt-list-li
        display block
        margin-bottom 150px
        @media screen and (max-width: 768px)
          margin-bottom 60px
        &:last-child
          margin-bottom 0
        p
          line-height 2
          color #181818
          font-size 14px
          &.color32
            color #032e43
        h3.li-title
          font-size 18px
          padding 16px 0
          color #181818
          background-color #edeff1
          position relative
          padding-left 52px
          line-height 1.5
          display flex
          align-items center
          margin-bottom 35px
          @media screen and (max-width: 768px)
            padding 12px 0
            padding-left 30px
            padding-right 20px
          &:before
            content ''
            width 10px
            height 22px
            background-color #032e43
            position absolute
            left 0
        ul.ulOne
          font-size 14px
          margin-top 80px
          overflow hidden
          li
            width 50%
            float left
            padding 30px 50px
            line-height 2
            position relative
            background-color #f6f7f8
            &:nth-child(1), &:nth-child(2)
              border-bottom 1px solid #edeff1
            &:nth-child(1), &:nth-child(3)
              border-right 1px solid #edeff1
            &:before
              content ''
              width 6px
              height 6px
              border-radius 100%
              background-color #181818
              position absolute
              top 40px
              left 34px
            @media screen and (max-width: 767px)
              width 100%
              margin-bottom 30px
              &:nth-child(1), &:nth-child(2)
                border-bottom none
              &:nth-child(1), &:nth-child(3)
                border-right none
        .robotBox
          padding-top 80px
          display flex
          justify-content space-between
          @media screen and (max-width: 767px)
            display block
            padding-top 0
          .robotImg
            display block
            width 338px
            height auto
            margin-top 60px
            margin-right 80px
            @media screen and (width: 768px)
              width 250px
            @media screen and (max-width: 767px)
              width 60%
              margin 0 auto
              margin-top 0
              margin-bottom 50px
          .robotBox-rt
            flex 1
            display inline-block
            font-size 14px
            h3
              margin-bottom 30px
              color #032e43
            ul.robotBox-list
              li
                display block
                color #181818
                padding 20px 34px
                line-height 1.5
                background-color #f2f4f5
                border-radius 20px
                border-bottom-left-radius 0
                margin-bottom 40px
                &:last-child
                  margin-bottom 0
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
  }
}
</script>
