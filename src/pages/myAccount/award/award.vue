<template>
    <div class="award-container">
      <div class="head-mobile">
        <div class="back-mobile" @click="back"></div>
        <div class="title-mobile">{{$t('myAccountNav.text7')}}</div>
      </div>
      <div>
        <ul>
          <li @click="$router.push('/account/serialReward')">
            <div class="li-lf">
              <div class="pic">
                <img style="margin-top: 5px" width="40" height="40" src="../../../assets/images/myAccount/award.png"/>
              </div>
              <div class="text-container">
                <div class="text-title">{{$t('serialReward.text8')}}</div>
                <div class="text-description">{{$t('award.text1')}}</div>
              </div>
            </div>
            <div class="li-rt">
              <i class="arrowIcon"></i>
            </div>
          </li>
          <!-- 吃饼奖励记录-->
          <li @click="$router.push('/account/eatReward')">
            <div class="li-lf">
              <div class="pic">
                <img style="margin-top: 5px" width="40" height="40" src="../../../assets/images/myAccount/eat.png"/>
              </div>
              <div class="text-container">
                <div class="text-title">{{$t('eatReward.text9')}}</div>
                <div class="text-description">{{$t('award.text2')}}</div>
              </div>
            </div>
            <div class="li-rt">
              <i class="arrowIcon"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  mounted () {
    var that = this
    window.onresize = function () {
      that.routeRedirect() // 解决PC端空白问题
    }
  },
  methods: {
    routeRedirect () {
      if (window.innerWidth > 1200 && this.$route.path === '/account/award') {
        this.$router.push('/account/myAccount')
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    ul
      margin-top 80px
      li
        padding 10px 20px
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        &:nth-child(odd) {
          background-color #edeff1
        }
        &:nth-child(even) {
          background-color #fbfbfb
        }
        &:active{
          opacity 0.6
        }
        .li-lf
          display flex
          flex-direction row
          align-items center
          .text-container
            text-align top
            margin-left 10px
            font-size 14px
            .text-description
              color #666
        .li-rt
          .arrowIcon
            display inline-block
            width: 6px;
            height: 9px;
            background url("../../../assets/images/myAccount/right-row.png") no-repeat
            background-size: cover;
</style>
