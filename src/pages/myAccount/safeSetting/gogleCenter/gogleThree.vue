<template>
  <div class="gogle-two-wrap">
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('safeSett.text17')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div id="record-title">
      <span class="line"></span>
      <div>
        <span @click="$router.go(-1)" class="pointer">{{$t('safeSett.text2')}}</span>
        <span>&gt;</span>
        <span>{{$t('safeSett.text13')}}</span>
      </div>
    </div>
    <div class="content">
      <p class="desc">{{$t('safeSett.text25')}}。</p>
      <div class="form-item">
        <input type="number" :placeholder="$t('safeSett.text26')" class="input" v-model.trim="ggPwd" @input="changeInput()" @blur="inputBlur()" @focus="inputFocus()" :class="{'red-border': currentSelectTwo}">
        <div class="delet" :class="{'none-icon': currentSelectTwo}" @click="deleteOne()"><div class="icon"></div></div>
      </div>
      <p class="err-text" v-show="noGogle">{{$t('safeSett.text26')}}</p>
      <div class="btn" @click="gogleFinish">{{$t('safeSett.text21')}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Dialog from '@/components/globalDialog/dialog'
export default {
  data () {
    return {
      noGogle: false,
      ggPwd: '',
      gogleCode: '',
      goggleConfim: false,
      isflag: false,
      currentSelectTwo: false
    }
  },
  created () {
    // console.log(JSON.parse(this.$route.query.queryObj))
  },
  methods: {
    goback () {
      this.$router.push('/account/safettingCenter')
    },
    changeInput () {},
    deleteOne () {
      this.ggPwd = ''
    },
    gogleFinish () {
      this.noGogle = false
      if (this.ggPwd === '') {
        this.noGogle = true
      } else {
        this.isLoading = true
        let dataObj = {}
        if (this.$route.query.isSafe) {
          dataObj.googleCode = this.ggPwd
          // 已设置安全问题 -- 开启
        } else {
          let parse = JSON.parse(this.$route.query.queryObj)
          dataObj.question1 = parse.question1
          dataObj.answer1 = parse.answer1
          dataObj.question2 = parse.question2
          dataObj.answer2 = parse.answer2
          dataObj.question3 = parse.question3
          dataObj.answer3 = parse.answer3
          dataObj.googleCode = this.ggPwd
        }
        let lang
        if (localStorage.getItem('kleinLang') === 'CN') {
          lang = 'cn'
        } else {
          lang = 'en'
        }
        this.$http({
          url: this.$api + '/user/setSafeProblem',
          method: 'post',
          data: dataObj,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'secret-language': lang
          }
        }).then(res => {
          this.isLoading = false
          this.goggleConfim = true
          if (res.data.success === true) {
            Dialog({
              msg: this.$t('safeSett.text42'),
              okFn: () => {
                if (window.innerWidth > 1200) {
                  this.$router.push('/account/safettingCenter')
                } else {
                  this.$router.push('/account/myAccountPhone')
                }
              }
            })
            this.isflag = true
          } else {
            Dialog({
              title: this.$t('safeSett.text43'),
              msg: res.data.msg
            })
            this.ggPwd = ''
          }
        }).catch(err => {
          this.goggleConfim = true
          this.ggPwd = ''
          this.isLoading = false
          console.log(err)
        })
      }
    },
    inputBlur () {
      this.currentSelectTwo = false
    },
    inputFocus () {
      this.currentSelectTwo = true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .err-text
    font-size: 16px
    color #FC534C
    margin: -30px 0 20px 40px
    @media screen and (max-width 1200px)
      margin: -30px 0 20px 10px
  .gogle-two-wrap
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
    padding-top: 50px
    @media screen and (max-width 1200px)
      padding: 70px 15px
    .desc
      font-size: 18px
      color #181818
      @media screen and (max-width 1200px)
        font-size: 14px
    .form-item
      position: relative
      width: 100%
      height 68px
      margin: 30px 0 52px
      @media screen and (max-width 1200px)
        height: 46px
      .input
        width: 100%;
        height: 100%;
        padding: 0 80px 0 40px;
        box-sizing: border-box;
        color: #181818;
        border: 1px solid #d7d9db;
        border-radius: 4px;
        font-size: 20px;
        @media screen and (max-width 1200px)
          padding: 0 15px
          font-size: 14px
        &.red-border
          border: 1px solid #FC534C
      .delet
        position: absolute
        right: 0
        cursor pointer
        z-index: 10
        box-sizing content-box
        top: 19px
        padding: 5px 30px 5px 5px
        opacity: 0
        @media screen and (max-width 1200px)
          padding-right: 20px
          top: 14px
        &.none-icon
          opacity: 1
        .icon
          width: 20px
          height: 20px
          background: url("../../../../assets/images/myAccount/input_close.svg") no-repeat center / cover
          @media screen and (max-width 1200px)
            width: 12px
            height: 12px
    .btn
      cursor pointer
      width: 100%
      height: 68px
      border-radius 6px
      background-color: #FC534C
      display: flex
      align-items center
      justify-content center
      color #ffffff
      @media screen and (max-width 1200px)
        height: 46px
        margin-top: 10px
</style>
