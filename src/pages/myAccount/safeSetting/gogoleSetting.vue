<template>
  <div class="mobileSetting">
    <div class="pc">
      <div class="pc-content">
        <div class="property-title">
          <h6><router-link to="/account/safettingCenter" class="property">{{$t('safeSett.text2')}} > </router-link><span class="transfer"> {{$t('safeSett.text29')}}</span></h6>
        </div>
        <div class="share-w">
          <div class="input-item quhao-w">
            <div class="quhao-item">
              <div class="quhao">{{questionValue}}</div>
              <div class="quhao-select" v-if="jiantouShow" @click="codeSelectShow = !codeSelectShow">
                <div class="icon-sele" :class="{'rotate-icon': codeSelectShow}"></div>
              </div>
            </div>
            <ul class="selectMenu" :class="{selectMenuActive: codeSelectShow}">
              <li v-for="(item, index) in areaCodeData" :key="index" @click="chooseCode(item.name, index)" class="code-list" :class="{'selectActive': tabTwoIndex === index}">{{item.name}}</li>
            </ul>
          </div>
          <!--通过验证码关闭-->
          <div class="gogle-box" v-if="tabTwoIndex === 0">
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" type="password" v-model.trim="telphone" :placeholder="$t('safePassword.text4')" @input="inputChange(0)" @focus="inputFocus(0)" @blur="inputBlur(0)">
                <div class="close-icon" @click="deleteInput(0)"><div class="close"></div></div>
              </div>
              <div class="error-tips">{{errInput1}}</div>
            </div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" type="number" v-model.trim="payCode" :placeholder="$t('safeSett.text26')" @input="inputChange(1)" @focus="inputFocus(1)" @blur="inputBlur(1)">
                <div class="close-icon" @click="deleteInput(1)"><div class="close"></div></div>
              </div>
              <div class="error-tips">{{payFailTip}}</div>
            </div>
            <button class="tradingCenter-btn pay-btn" @click="closeConfirm()">{{$t('safeSett.text30')}}</button>
          </div>
          <!--通过安全问题关闭-->
          <div class="anquan-box" v-if="tabTwoIndex === 1">
            <div class="question-box">1.{{$t('safeSett.text32')}} <span>{{questionArr[0]}}</span></div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" type="text" v-model.trim="answer1" :placeholder="$t('safeSett.text31')" @input="inputChange(2)" @focus="inputFocus(2)" @blur="inputBlur(2)">
                <div class="close-icon" @click="deleteInput(2)"><div class="close"></div></div>
              </div>
              <div class="error-tips">{{answerOne}}</div>
            </div>
            <div class="dashed"></div>
            <div class="question-box">2.{{$t('safeSett.text32')}} <span>{{questionArr[1]}}</span></div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" type="text" v-model.trim="answer2" :placeholder="$t('safeSett.text31')" @input="inputChange(3)" @focus="inputFocus(3)" @blur="inputBlur(3)">
                <div class="close-icon" @click="deleteInput(3)"><div class="close"></div></div>
              </div>
              <div class="error-tips">{{answerTwo}}</div>
            </div>
            <div class="dashed"></div>
            <div class="question-box">3.{{$t('safeSett.text32')}} <span>{{questionArr[2]}}</span></div>
            <div class="input-lable">
              <div class="input-box">
                <input class="tradingCenter-input" type="text" v-model.trim="answer3" :placeholder="$t('safeSett.text31')" @input="inputChange(4)" @focus="inputFocus(4)" @blur="inputBlur(4)">
                <div class="close-icon" @click="deleteInput(4)"><div class="close"></div></div>
              </div>
              <div class="error-tips">{{answerThree}}</div>
              <button class="tradingCenter-btn pay-btn" @click="closeConfirm()">{{$t('safeSett.text21')}}</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 解除失败弹窗-->
      <div class="myPopup" v-show="jiechuFailDialog">
          <div class="myPopup-box" >
          <div class="close" @click="jiechuFailDialog = false"><img src="../../../assets/images/myAccount/myDon/delete.svg" alt=""></div>
          <p class="error-text">{{$t('safeSett.text33')}}</p>
          <p class="error-title error-text">{{err}}</p>
          <a class="tradingCenter-btn pc-btn" @click="jiechuFailDialog = false">{{$t('dialog.text5')}}</a>
        </div>
      </div>
      <!-- 解除成功弹窗-->
      <div class="myPopup" v-show="jiechuSuccessDialog">
        <div class="myPopup-box" >
          <div class="close" @click="jiechuSuccessDialog = false"><img src="../../../assets/images/myAccount/myDon/delete.svg" alt=""></div>
          <p class="error-text">{{$t('safeSett.text34')}}</p>
          <p class="error-title error-text">{{$t('safeSett.text39')}}</p>
          <a class="tradingCenter-btn pc-btn" @click="jiechuSuccess()">{{$t('dialog.text5')}}</a>
        </div>
      </div>
    </div>
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('safeSett.text35')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      err: '', // 错误信息
      questionArr: [], // 问题数组
      errInput1: '', // 手机错误提示
      codeSelectShow: false,
      jiantouShow: true,
      tabTwoIndex: 0,
      areaCodeData: [
        {name: this.$t('safeSett.text36')},
        {name: this.$t('safeSett.text37')}
      ],
      questionValue: this.$t('safeSett.text36'),
      quhao: '86',
      telphone: '', // 安全密码
      payCode: '', // 验证码
      answer1: '',
      answer2: '',
      answer3: '',
      sendBtnValue: this.$t('safeSett.text38'),
      isDisabled: false,
      payFailTip: '', // 短信错误提示
      answerOne: '',
      answerTwo: '',
      answerThree: '',
      jiechuFailDialog: false, // 解除失败弹窗
      jiechuSuccessDialog: false, // 解除成功弹窗
      inputDete: [
        {deleteShow: false},
        {deleteShow: false},
        {deleteShow: false},
        {deleteShow: false},
        {deleteShow: false}
      ]
    }
  },
  created () {
    this.getQuertion()
  },
  methods: {
    // input 删除值
    deleteInput (index) {
      if (index === 0) {
        this.telphone = ''
      } else if (index === 1) {
        this.payCode = ''
      } else if (index === 2) {
        this.answer1 = ''
      } else if (index === 3) {
        this.answer2 = ''
      } else if (index === 4) {
        this.answer3 = ''
      }
    },
    // input验证 change
    inputChange (index) {
      if (index === 0) {
        this.errInput1 = ''
      } else if (index === 1) {
        this.payFailTip = ''
      }
    },
    // input 获取焦点
    inputFocus (index) {
      this.inputDete[index].deleteShow = true
    },
    // input验证 失去焦点
    inputBlur (index) {
      this.inputDete[index].deleteShow = false
    },
    chooseCode (val, index) {
      this.tabTwoIndex = index
      this.questionValue = val
      this.codeSelectShow = false
      if (this.tabTwoIndex === 1) {
        this.getQuertion()
      }
    },
    jiechuSuccess () {
      if (window.innerWidth > 1200) {
        this.$router.push('/account/safettingCenter')
      } else {
        this.$router.push('/account/myAccountPhone')
      }
    },
    // 通过谷歌验证码关闭
    useGoogle () {
      if (this.telphone === '') {
        this.errInput1 = this.$t('safeSett.text11')
        return false
      } else if (this.payCode === '') {
        this.payFailTip = this.$t('safeSett.text40')
        return false
      }
      let ajaxLang1 = ''
      if (localStorage.getItem('kleinLang') === 'EN') {
        ajaxLang1 = 'en'
      }
      this.$http.post(`${this.$api}/user/googleOpenClose?type=2&tradePwd=${this.telphone}&googleCode=${this.payCode}`, {headers: {'secret-language': ajaxLang1}}).then((res) => {
        if (res.data.success === true) {
          this.jiechuSuccessDialog = true
        } else {
          this.jiechuFailDialog = true
          this.err = res.data.msg
        }
      })
    },
    // 获取问题
    getQuertion () {
      this.$http.post(`${this.$api}/user/querySafeProblem`).then((res) => {
        if (res.data.success === true) {
          if (res.data.mapData.setsafe === 1) {
            this.questionArr = res.data.data
          } else if (res.data.mapData.setsafe === 2) {
            this.jiantouShow = false
          }
          // console.log(this.questionArr)
        }
      })
    },
    // 使用问题关闭
    useQuestion () {
      if (this.answer1 === '') {
        this.answerOne = this.$t('safeSett.text41')
        return false
      } else if (this.answer2 === '') {
        this.answerTwo = this.$t('safeSett.text41')
        return false
      } else if (this.answer3 === '') {
        this.answerThree = this.$t('safeSett.text41')
        return false
      }
      let fmData = new FormData()
      fmData.append('type', '3')
      fmData.append('question1', this.questionArr[0])
      fmData.append('question2', this.questionArr[1])
      fmData.append('question3', this.questionArr[2])
      fmData.append('answer1', this.answer1)
      fmData.append('answer2', this.answer2)
      fmData.append('answer3', this.answer3)
      let ajaxLang1 = ''
      if (localStorage.getItem('kleinLang') === 'EN') {
        ajaxLang1 = 'en'
      }
      this.$http.post(`${this.$api}/user/googleOpenClose`, fmData, {headers: {'secret-language': ajaxLang1}}).then((res) => {
        if (res.data.success === true) {
          this.jiechuSuccessDialog = true
        } else {
          this.jiechuFailDialog = true
          this.err = res.data.msg
        }
      })
    },
    // 谷歌验证
    closeConfirm () {
      if (this.tabTwoIndex === 0) {
        this.useGoogle()
      } else if (this.tabTwoIndex === 1) {
        this.useQuestion()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mobileSetting
    .pc
      @media screen and (max-width: 1200px) {
        display: block;
      }
      .pc-content
        margin-left 92px
        margin-right 20px
        max-width 1070px
        @media screen and (max-width: 1200px) {
         padding 0 20px
         margin-left 0
         margin-right 0
         margin-top 80px
        }
        .property-title
          margin-bottom 60px
          @media screen and (max-width: 1200px) {
            display none
          }
          h6
            background-color #edeff1;
            height: 64px;
            font-size:20px;
            color: #181818;
            align-items: center;
            display: flex;
            @media screen and (max-width: 1200px) {
              font-size:16px;
              height: 54px;
            }
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
              @media screen and (max-width: 1200px) {
                font-size:16px;
              }
      .share-w
        width 100%
        color #181818
        .share-title
          font-size: 20px
          margin: 60px 0
          @media screen and (max-width 1200px)
            margin: 0 0 10px
          .share-desc
            font-size: 16px
            margin-left: 10px
        .share-pc
          @media screen and (max-width 1200px)
            display: none
          @media screen and (min-width 1200px)
            display: block
        .share-mobile
          font-size: 14px
          @media screen and (max-width 1200px)
            display: block
          @media screen and (min-width 1200px)
            display: none
        .quhao-item
          width 100%
          height 68px
          display: flex
          align-items center
          position relative
          @media screen and (max-width 1200px)
            height: 50px
          .quhao
            height: 100%
            width 100%
            display: flex
            align-items center
            border: 1px solid #d7d9db
            padding-left: 40px
            color #032e43
            font-size: 16px
            border-radius 4px
            @media screen and (max-width 1200px)
              border: none
              border: 1px solid #d7d9db
              padding-left: 10px
              font-size: 12px
          .quhao-select
            position absolute
            right 28px
            border-radius 0 4px 4px 0
            cursor pointer
            top: 0
            bottom: 0
            display: flex
            align-items: center
            justify-content: center
            @media screen and (max-width 1200px)
              width: 50px
              right 10px
            .icon-sele
              width: 20px
              height 10px
              background: url("../../../assets/images/klein/xiala.png") no-repeat center / cover
              transition transform .3s linear
              @media screen and (max-width 1200px)
                width: 15px
                height 8px
              &.rotate-icon
                transform rotate(-180deg)
        .selectMenu
          height: 0
          width 100%
          position: absolute
          top: 100%
          left: 0
          border-radius 0 0 4px 4px
          transition: all 0.3s linear;
          overflow: hidden
          background-color: #f0f2f5;
          &.selectMenuActive
            z-index: 999;
            overflow-x: hidden;
            overflow-y: auto;
            height: 140px
            padding 20px 0
            @media screen and (max-width 1200px)
              height: 100px
              padding 10px 0
            &::-webkit-scrollbar
              width 0
              height 0
          .code-list
            padding-left: 40px;
            display: flex;
            align-items: center;
            height: 50px;
            color #A7A7A7
            user-select none
            cursor pointer
            font-size: 20px;
            @media screen and (max-width 1200px)
              height: 40px
              font-size: 12px
              padding-left: 15px
        .input-item
          width 100%
          margin-bottom: 30px
          @media screen and (max-width 1200px)
            margin-bottom: 15px
          input
            border-radius 4px
            width 100%
            height: 68px
            border: 1px solid #d7d9db
            padding: 0 40px
            color #999
            font-size: 16px
            box-sizing border-box
            display: block
            @media screen and (max-width 1200px)
              padding: 0 10px
              height: 50px
              font-size: 14px
          .err-class
            font-size: 14px
            padding-left: 40px
            margin-top: 10px
            color #fc534c
            @media screen and (max-width 1200px)
              padding-left: 15px
        .quhao-w
          position: relative
        .feiyong
          font-size: 20px
        .pc-feiyong
          @media screen and (max-width 1200px)
            display: none
          @media screen and (min-width 1200px)
            display: block
        .mobile-feiyong
          align-items center
          justify-content space-between
          @media screen and (max-width 1200px)
            display: flex
          @media screen and (min-width 1200px)
            display: none
      #btn-red-submit
        margin: 80px 0 100px
        @media screen and (max-width 1200px)
          border-radius 4px
          height: 46px
    .tradingCenter-btn
      display: block;
      width 100%
      height: 58px;
      line-height 58px
      margin-top 40px
      border-radius: 4px;
      text-align: center;
      background-color: #fc534c
      color #fff
      box-shadow 0 5px 10px #d7d9db
      border 1px solid #fc534c
      font-size: 20px;
      cursor: pointer;
      outline: none;
      user-select: none;
    @media screen and (max-width: 768px) {
      .tradingCenter-btn{
        height: 40px;
        font-size: 14px;
        width 100%
        margin-top 30px
        line-height 40px
      }
    }
    .tradingCenter-btn:active {
      opacity: 0.6;
    }
    .tradingCenter-tab {
      color: #ffffff;
      font-size: 14px;
      border-bottom: 1px solid #fc534c
      overflow: hidden;
    }
    .payMsg-box
      position relative
    .send-box
      height 100%
      width 200px
      line-height 50px
      padding 0 20px
      background-color #fc534c
      color #fff
      font-size 16px
      position absolute
      right 0px
      bottom 0px
      border 1px solid #FC534C
      border-radius 4px
      border-bottom-left-radius 0
      border-top-left-radius 0
      outline none
      cursor pointer
      user-select none
      .sendMsg
        display block
        /*width 88px*/
        height 100%
        width 200px
        line-height 50px
        padding 0 20px
        background-color #fc534c
        color #fff
        font-size 16px
        position absolute
        border-bottom-left-radius 0
        border-top-left-radius 0
        right 0px
        bottom 0px
        border none
        outline none
        cursor pointer
        user-select none
        @media screen and (max-width 768px ) {
          height 50px
          line-height 50px
          position absolute
          font-size 14px
          padding 0 10px
        }
      &.disable
        pointer-events none
        cursor auto
        opacity .5
    .tip
      margin-bottom 30px
    .text-tip
      margin-left 100px
      margin-bottom 30px
      @media screen and (max-width 680px ) {
        margin-left 0
      }
.input-box
  position: relative
.error-tips
  font-size: 14px
  color #fc534c
  margin-top: 10px
  padding-left: 40px
  @media screen and (max-width 1200px)
    padding-left: 15px
.input-lable
  width: 100%
  margin-bottom: 30px
  @media screen and (max-width 1200px)
    margin-bottom: 15px
  .tradingCenter-input
    width: 100%
    height: 68px
    padding: 0 80px 0 40px
    box-sizing border-box
    color #999
    border: 1px solid #d7d9db
    border-radius 4px
    font-size: 16px
    @media screen and (max-width 1200px)
      height: 50px
      line-height 50px
      font-size: 14px
      padding-left: 15px
      padding-right: 0
    &:focus
      border-color #fc534c
    &:focus + .close-icon
      display block
      opacity 1
      border-color #fc534c
  .close-icon
    display inline-block
    opacity 0
    cursor pointer
    position: absolute
    box-sizing content-box
    right: 0
    top: 19px
    padding: 5px 50px 5px 5px
    @media screen and (max-width 1200px)
      padding-right: 20px
      top: 14px
    .close
      width: 20px
      height: 20px
      background: url("../../../assets/images/myAccount/input_close.svg") no-repeat center / cover
      @media screen and (max-width 1200px)
        width: 12px
        height: 12px
.question-box
    padding-bottom 46px
    font-size 16px
    color #032e43
    @media screen and (max-width 1200px)
      padding-bottom 20px
.dashed
    margin-top 30px
    margin-bottom 64px
    border-bottom 1px dashed #a6aeb5
    @media screen and (max-width 1200px)
      margin-top 30px
      margin-bottom 40px
  .myPopup {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    @media screen and (max-width: 768px) {
      .myPopup .myPopup-box{
        width: 80%;
        height: 100%;
      }
    }
  }
  .myPopup .myPopup-box {
    width: 600px;
    padding: 120px 80px 157px 80px
    color: #1a1a1a;
    position: relative;
    border-radius 8px
    background-color: #ffffff;
    box-shadow 0 0 5px #d7d9db
  }
  @media screen and (max-width: 768px) {
    .myPopup .myPopup-box{
      width:70%;
      padding 20px
    }
  }
  .error-text
    font-size: 34px
    text-align: center
    color #000000
    @media screen and (max-width 1200px)
      font-size: 20px
      margin-bottom 20px
      margin-top 20px
  .error-title
    font-size: 16px
    margin-bottom 88px
    margin-top 40px
    @media screen and (max-width 1200px)
      margin-bottom 20px
      margin-top 20px
  .myPopup .myPopup-box .close{
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    z-index: 999;
    cursor: pointer;
    user-select none
  }
  @media screen and (max-width: 768px) {
    .myPopup .myPopup-box .close{
      top: 4px;
      right: 4px;
      width: 30px;
      height: 30px;
    }
  }
  .myPopup .myPopup-box .close:active {
    opacity: 0.6;
  }
  .myPopup .myPopup-box .close img{
    display: block;
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 768px) {
    .myPopup .myPopup-box .close img{
      display: block;
      width: 20px;
      height: 20px;
    }
  }
  .myPopup .myPopup-box .title {
    font-size: 28px;
    font-weight bold
    margin-bottom: 50px;
    text-align: center;
  }
  @media screen and (max-width: 768px) {
    .myPopup .myPopup-box .title {
      font-size: 16px;
      font-weight bold
      margin-bottom: 20px;
      text-align: center;
    }
  }
  .myPopup .myPopup-box .errinMsg
    font-size: 24px;
    color: #fc534c
    text-align center
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  .myPopup .myPopup-box input {
    height: 48px;
    width 100%
    font-size 16px
    border 1px solid #d7d9db
    margin-bottom  30px
    position: relative;
    border-radius 8px
    @media screen and (max-width: 768px) {
      width 100%
      margin-bottom  20px
      font-size 12px
    }
  }
  .myPopup .myPopup-box input::-webkit-input-placeholder {
    text-align: left;
    opacity: 0.6;
    color #666666
  }
  .myPopup .myPopup-box .errmsg-tips
    text-align center
    font-size: 18px;
    color: #fc534c
    @media screen and (max-width: 768px) {
      font-size: 14px;
      margin-top: 0px;
    }
  .tradingCenter-btn
    display: block;
    width 100%
    height: 58px;
    line-height 58px
    margin-top 40px
    border-radius: 4px;
    text-align: center;
    background-color: #fc534c
    color #fff
    box-shadow 0 5px 10px #d7d9db
    border 1px solid #fc534c
    font-size: 20px;
    cursor: pointer;
    outline: none;
    user-select: none;
  @media screen and (max-width: 768px) {
    .tradingCenter-btn{
      height: 40px;
      font-size: 14px;
      width 100%
      margin-top 30px
      line-height 40px
    }
  }
  .tradingCenter-btn:active {
    opacity: 0.6;
  }
  @media screen and (max-width: 680px) {
    .tradingCenter-input {
      height: 40px;
      font-size: 12px!important;
    }
  }
  .tradingCenter-tab {
    color: #ffffff;
    font-size: 14px;
    border-bottom: 1px solid #fc534c
    overflow: hidden;
  }
  .payMsg-box
    position relative
  .sendMsg
    display block
    /*width 88px*/
    height 50px
    line-height 50px
    padding 0 20px
    background-color transparent
    color #fc534c
    font-size 16px
    position absolute
    right 0px
    bottom 0px
    border none
    outline none
    cursor pointer
    user-select none
    @media screen and (max-width 768px ) {
      height 50px
      line-height 50px
      position absolute
      font-size 14px
      padding 0 10px
    }
    &.disable
      pointer-events none
      cursor auto
      opacity .5
  .tip
    margin-bottom 30px
  .text-tip
    margin-left 100px
    margin-bottom 30px
    @media screen and (max-width 680px ) {
      margin-left 0
    }
  #fixed-top-header
    border-bottom 0
</style>
