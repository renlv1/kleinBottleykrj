<template>
  <div class="aiChat">
    <div class="aiChat-web">
      <div class="aiChat-top">
        <div class="picture">
          <div class="img-box">
            <img src="../../assets/images/aiChat/AI-CHAT-383-480.png">
          </div>
          <p>{{$t('aiChat.text1')}}</p>
        </div>
        <!--<div class="aiChat-content">-->
          <!--<p>{{$t('aiChat.text2')}}</p>-->
        <!--</div>-->
      </div>
      <div class="wrap">
        <div class="content-one">
          <div class="AI-robot">
            <div class="relax">
              <p>{{$t('aiChat.text3')}}</p>
            </div>
            <i></i>
          </div>
          <div class="content-dec">{{$t('aiChat.text4')}}</div>
          <div class="main-content">
            <ul>
              <li v-for="(item, index) in $t('aiChat.itemList')" :key="index">
                <img :src="item.img" alt="">
                <p>{{item.text}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-two">
          <div class="AI-robot">
            <div class="relax">
              <p>{{$t('aiChat.text5')}}</p>
            </div>
            <i></i>
          </div>
          <div class="content-dec">
            <p>{{$t('aiChat.text6')}}</p>
            <p>{{$t('aiChat.text6_2')}}</p>
            <p>{{$t('aiChat.text6_3')}}</p>
          </div>
          <div class="main-content">
            <div class="main-one">
              <div class="main-title">{{$t('aiChat.text7')}}</div>
              <p>{{$t('aiChat.text8')}}</p>
              <p>{{$t('aiChat.text9')}}</p>
              <p>{{$t('aiChat.text10')}}</p>
              <p>{{$t('aiChat.text11')}}</p>
              <p>{{$t('aiChat.text12')}}</p>
              <p>{{$t('aiChat.text13')}}</p>
              <p>{{$t('aiChat.text14')}}</p>
            </div>
            <div class="main-one">
              <div class="main-title">{{$t('aiChat.text15')}}</div>
              <p>{{$t('aiChat.text16')}}</p>
              <p>{{$t('aiChat.text17')}}</p>
              <p>{{$t('aiChat.text18')}}</p>
              <p>{{$t('aiChat.text19')}}</p>
              <p>{{$t('aiChat.text20')}}</p>
            </div>
            <div class="main-one">
              <div class="main-title">{{$t('aiChat.text21')}}</div>
              <p>{{$t('aiChat.text22')}}</p>
              <p>{{$t('aiChat.text23')}}</p>
              <p>{{$t('aiChat.text24')}}</p>
              <p>{{$t('aiChat.text25')}}</p>
              <p>{{$t('aiChat.text26')}}</p>
              <p>{{$t('aiChat.text27')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.aiChat
  background-color: #fff !important
  .aiChat-web
    .aiChat-top
      width 100%
      background-color #fff
      border-bottom 1px solid #edeff1
      @media screen and (max-width: 1130px){
        width 100%
      }
      .picture
        padding-bottom  40px
        padding-top 54px
        .img-box
          margin 0 auto
          width 383px
          @media screen and (max-width: 420px){
            width 100%
            padding: 0 30px
          }
        img
          display block
          width: 100%
        p
          font-size 18px
          color #181818
          width 300px
          margin 50px auto 0
      .aiChat-content
        width 700px
        margin 0 auto
        @media screen and (max-width: 1130px){
          width 100%
          padding 0 20px
        }
        p
          text-align center
          margin-bottom 40px
          font-size 14px
          color #181818
          line-height 2.5
    .wrap
      width 1128px
      margin 0 auto
      @media screen and (max-width: 1130px){
        width 100%
        padding 0 20px
      }
      .content-one
        margin-top 64px
        .AI-robot
          padding 16px 0
          width 100%
          background-color #edeff1
          position relative
          /*i*/
            /*display inline-block*/
            /*width 10px*/
            /*height 22px*/
            /*background-color #032e43*/
            /*position absolute*/
            /*top 21px*/
          .relax
            display flex
            flex-direction row
            align-items center
            p
              padding-left 40px
              font-size 20px
              color #181818
              display flex
              align-items center
              position relative
              line-height 1.5
              font-weight bold
              @media screen and (max-width: 768px)
                padding 12px 0
                padding-left 30px
                padding-right 20px
                line-height 1.2
              &:before
                content ''
                width 10px
                height 22px
                background-color #032e43
                position absolute
                left 0
        .content-dec
          margin-top 46px
          line-height 3
          font-size 18px
          color #032e43
        .main-content
          margin 60px auto 60px
          ul
            display flex
            flex-direction row
            align-items center
            flex-wrap wrap
            @media screen and (max-width: 1130px){
              justify-content center
            }
            li
              width 376px
              height 328px
              border 1px solid #edeff1
              display flex
              flex-direction column
              justify-content center
              align-items center
              text-align center
              background-color #f6f7f8
              @media screen and (max-width: 810px){
                width 100%
              }
              img
                width 100px
                height 100px
                margin-bottom 30px
                p
                  color #181818
                  font-size 18px
      .content-two
        padding-bottom 100px
        .AI-robot
          padding 16px 0
          width 100%
          background-color #edeff1
          position relative
          /*i*/
            /*display inline-block*/
            /*width 10px*/
            /*height 22px*/
            /*background-color #032e43*/
            /*position absolute*/
            /*left 0*/
          .relax
            display flex
            flex-direction row
            align-items center
            p
              padding-left 40px
              font-size 20px
              color #181818
              display flex
              align-items center
              position relative
              line-height 1.5
              font-weight bold
              @media screen and (max-width: 768px)
                padding 12px 0
                padding-left 30px
                padding-right 20px
                line-height 1.2
              &:before
                content ''
                width 10px
                height 22px
                background-color #032e43
                position absolute
                left 0
         .content-dec
          margin-top 46px
          line-height 3
          font-size 14px
          color #181818
        .main-content
          .main-one
            margin-top 80px
            .main-title
              font-size 16px
              color #181818
              margin-bottom 30px
              font-family "Microsoft YaHei UI"
            p
              font-size 14px
              color #181818
              margin-bottom 20px
              line-height 2
</style>

<script>
export default{
  data () {
    return {
    }
  }
}
</script>
