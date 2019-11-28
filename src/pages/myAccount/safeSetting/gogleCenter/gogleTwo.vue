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
      <p class="desc">2、{{$t('safeSett.text18')}}。</p>
      <!--问题1 -->
      <div class="form-content">
        <div class="input-item quhao-w">
          <div class="quhao-item" @click="showQues(0)">
            <div class="quhao">{{qusetion0}}</div>
            <div class="quhao-select">
              <div class="icon-sele" :class="{'rotate-icon': currentSelect === 0}"></div>
            </div>
          </div>
          <ul class="selectMenu" :class="{selectMenuActive: currentSelect === 0}">
            <li class="code-list" v-for="(item, index) in quesArr0" :key="index" @click="selectOne(item, index, 0)">{{item}}</li>
          </ul>
        </div>
        <div class="form-item" @click.stop>
          <input type="text" class="input" :placeholder="$t('safeSett.text19')" v-model.trim="answer0" @input="changeInput(0)" @blur="inputBlur(0)" @focus="inputFocus(0)" :class="{'red-border': currentSelectTwo === 0}">
          <div class="delet" :class="{'none-icon': currentSelectTwo === 0}" @click="deleteOne(0)">
            <div class="icon"></div>
          </div>
        </div>
        <p class="error-text">{{errorAnswer0}}</p>
      </div>
      <!--问题2-->
      <div class="form-content">
        <div class="input-item quhao-w">
          <div class="quhao-item" @click="showQues(1)">
            <div class="quhao">{{qusetion1}}</div>
            <div class="quhao-select" >
              <div class="icon-sele" :class="{'rotate-icon': currentSelect === 1}"></div>
            </div>
          </div>
          <ul class="selectMenu" :class="{selectMenuActive: currentSelect === 1}">
            <li class="code-list" v-for="(item, index) in quesArr1" :key="index" @click="selectOne(item, index, 1)">{{item}}</li>
          </ul>
        </div>
        <div class="form-item">
          <input type="text" class="input" :placeholder="$t('safeSett.text19')" v-model.trim="answer1" @input="changeInput(1)" @blur="inputBlur(1)" @focus="inputFocus(1)" :class="{'red-border': currentSelectTwo === 1}">
          <div class="delet" :class="{'none-icon': currentSelectTwo === 1}" @click="deleteOne(1)">
            <div class="icon"></div>
          </div>
        </div>
        <p class="error-text">{{errorAnswer1}}</p>
      </div>
      <!-- 问题3-->
      <div class="form-content">
        <div class="input-item quhao-w">
          <div class="quhao-item"  @click="showQues(2)">
            <div class="quhao">{{qusetion2}}</div>
            <div class="quhao-select">
              <div class="icon-sele" :class="{'rotate-icon': currentSelect === 2}"></div>
            </div>
          </div>
          <ul class="selectMenu" :class="{selectMenuActive: currentSelect === 2}">
            <li class="code-list" v-for="(item, index) in quesArr2" :key="index" @click="selectOne(item, index, 2)">{{item}}</li>
          </ul>
        </div>
        <div class="form-item">
          <input type="text" class="input" :placeholder="$t('safeSett.text19')" v-model.trim="answer2" @input="changeInput(2)" @blur="inputBlur(2)" @focus="inputFocus(2)" :class="{'red-border': currentSelectTwo === 2}">
          <div class="delet" :class="{'none-icon': currentSelectTwo === 2}" @click="deleteOne(2)">
            <div class="icon"></div>
          </div>
        </div>
        <p class="error-text">{{errorAnswer2}}</p>
      </div>
      <p class="tips">{{$t('safeSett.text20')}}</p>
      <div class="btn" @click="gotoThree">{{$t('safeSett.text21')}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      codeSelectShow: false,
      areaCodeData: [],
      questionArr: [],
      qusetion0: this.$t('safeSett.text22'),
      qusetion1: this.$t('safeSett.text23'),
      qusetion2: this.$t('safeSett.text24'),
      errorAnswer0: '',
      errorAnswer1: '',
      errorAnswer2: '',
      answer0: '',
      answer1: '',
      answer2: '',
      quesArr0: [],
      quesArr1: [],
      quesArr2: [],
      currentSelectTwo: -1,
      currentSelect: -1
    }
  },
  created () {
    this.getQuestion()
  },
  methods: {
    // 下一步
    gotoThree () {
      if (this.answer0 === '') {
        this.errorAnswer0 = this.$t('googleValidation.text7')
      }
      if (this.qusetion0 === this.$t('googleValidation.text4')) {
        this.errorAnswer0 = this.$t('googleValidation.text3')
      }
      if (this.answer1 === '') {
        this.errorAnswer1 = this.$t('googleValidation.text7')
      }
      if (this.qusetion1 === this.$t('googleValidation.text5')) {
        this.errorAnswer1 = this.$t('googleValidation.text3')
      }
      if (this.answer2 === '') {
        this.errorAnswer2 = this.$t('googleValidation.text7')
      }
      if (this.qusetion2 === this.$t('googleValidation.text6')) {
        this.errorAnswer2 = this.$t('googleValidation.text3')
      }
      if (this.qusetion0 !== this.$t('googleValidation.text4') && this.qusetion1 !== this.$t('googleValidation.text5') && this.qusetion2 !== this.$t('googleValidation.text6') && this.answer0 !== '' && this.answer1 !== '' && this.answer2 !== '') {
        this.errorAnswer0 = ''
        this.errorAnswer1 = ''
        this.errorAnswer2 = ''
        let queryObj = {}
        queryObj.question1 = this.qusetion0
        queryObj.question2 = this.qusetion1
        queryObj.question3 = this.qusetion2
        queryObj.answer1 = this.answer0
        queryObj.answer2 = this.answer1
        queryObj.answer3 = this.answer2
        queryObj = JSON.stringify(queryObj)
        this.$router.push({path: '/account/safettingCenter/gogleThree', query: {queryObj: queryObj}})
      }
    },
    // 获取问题
    getQuestion () {
      let lang
      if (localStorage.getItem('kleinLang') === 'CN') {
        lang = 'cn'
      } else {
        lang = 'en'
      }
      this.$http({
        url: `${this.$api}/user/getThreeSafeProblem`,
        method: 'post',
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
        if (res.data.success === true) {
          this.questionArr = res.data.data
          this.quesArr0 = this.quesArr0.concat(this.questionArr)
          this.quesArr1 = this.quesArr1.concat(this.questionArr)
          this.quesArr2 = this.quesArr2.concat(this.questionArr)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 下拉选择
    selectOne (item, index, currrent) {
      if (currrent === 0) {
        this.qusetion0 = item
        this.answer0 = ''
      } else if (currrent === 1) {
        this.qusetion1 = item
        this.answer1 = ''
      } else if (currrent === 2) {
        this.qusetion2 = item
        this.answer2 = ''
      }
      this.quesArr0 = []
      this.quesArr1 = []
      this.quesArr2 = []
      this.questionArr.forEach(item => {
        if (item !== this.qusetion0 && item !== this.qusetion1 && item !== this.qusetion2) {
          this.quesArr0.push(item)
          this.quesArr1.push(item)
          this.quesArr2.push(item)
        }
      })
      this.currentSelect = -1
    },
    deleteOne (n) {
      if (n === 0) {
        this.answer0 = ''
      } else if (n === 1) {
        this.answer1 = ''
      } else if (n === 2) {
        this.answer2 = ''
      }
    },
    inputFocus (n) {
      this.currentSelectTwo = n
      if (n === 0) {
        this.errorAnswer0 = ''
      } else if (n === 1) {
        this.errorAnswer1 = ''
      } else if (n === 2) {
        this.errorAnswer2 = ''
      }
    },
    inputBlur (n) {
      this.currentSelectTwo = -1
    },
    // 限制输入字数
    changeInput (n) {
      if (n === 0) {
        this.answer0 = this.answer0.replace(/\s+/g, '')
        if (this.answer0.length > 50) {
          this.answer0 = this.answer0.substring(0, 50)
        }
      } else if (n === 1) {
        this.answer1 = this.answer1.replace(/\s+/g, '')
        if (this.answer1.length > 50) {
          this.answer1 = this.answer1.substring(0, 50)
        }
      } else if (n === 2) {
        this.answer2 = this.answer2.replace(/\s+/g, '')
        if (this.answer2.length > 50) {
          this.answer2 = this.answer2.substring(0, 50)
        }
      }
    },
    // 显示下拉框
    showQues (n) {
      if (this.currentSelect === n) {
        this.currentSelect = -1
      } else {
        this.currentSelect = n
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
  .btn
    cursor pointer
    border-radius 6px
    width: 100%
    height: 68px
    background-color: #FC534C
    display: flex
    align-items center
    justify-content center
    color #ffffff
    @media screen and (max-width 1200px)
      height: 50px
  .error-text
    font-size: 16px
    color #FC534C
    margin: -10px 0 10px 40px
    @media screen and (max-width 1200px)
      margin-left: 10px
  .content
    padding-right: 40px
    @media screen and (max-width 1200px)
      padding: 80px 15px
    .desc
      font-size: 18px
      color #181818
      margin: 50px 0 30px
      @media screen and (max-width 1200px)
        margin: 0 0 20px
        font-size: 14px
    .form-content
      border-bottom: 1px dashed #a6aeb5
      &:nth-child(n+3)
        margin-top: 36px
      &:nth-child(4)
        border-bottom none
      .input-item
        position: relative
        .quhao-item
          width 100%
          height 68px
          display: flex
          align-items center
          position relative
          cursor pointer
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
              padding-left: 10px
          .quhao-select
            position absolute
            right 0
            top: 0
            padding: 0 28px
            height: 100%
            display: flex
            align-items center
            justify-content center
            border-radius 0 4px 4px 0
            cursor pointer
            @media screen and (max-width 1200px)
              height: 50px
            .icon-sele
              width: 20px
              height 10px
              background: url("../../../../assets/images/klein/xiala.png") no-repeat center / cover
              transition transform .3s linear
              &.rotate-icon
                transform rotate(-180deg)
              @media screen and (max-width 1200px)
                width: 15px
                height: 7px
        .selectMenu
          max-height 0
          width 100%
          position: absolute
          top: 100%
          left: 0
          border-radius 0 0 4px 4px
          transition: all 0.3s linear;
          overflow: hidden
          background-color: #f0f2f5;
          z-index: 100;
          @media screen and (max-width 1200px)
            width: 100%
          &.selectMenuActive
            max-height: 1000px
            &::-webkit-scrollbar
              width 0
              height 0
          .code-list
            padding-left: 40px;
            display: flex;
            align-items: center;
            height: 68px;
            color: #656464;
            cursor: pointer;
            font-size: 22px;
            @media screen and (max-width 1200px)
              height: 40px
              font-size: 16px
              padding-left: 15px
      .form-item
        position: relative
        width: 100%;
        height: 68px;
        margin: 20px 0 30px;
        @media screen and (max-width 1200px)
          height: 50px
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
            padding: 0 30px 0 10px
            font-size: 16px
          &.red-border
            border: 1px solid #FC534C
      .delet
        position: absolute;
        right: 0;
        cursor: pointer;
        z-index: 10;
        box-sizing: content-box;
        top: 19px;
        padding: 5px 30px 5px 5px;
        opacity: 0
        &.none-icon
          opacity: 1
        .icon
          width: 20px;
          height: 20px;
          background: url('../../../../assets/images/myAccount/input_close.svg') no-repeat center/cover;
          @media screen and (max-width 1200px)
            width: 12px
            height: 12px
    .tips
      margin: 30px 0 60px 40px
      color #FC534C
      font-size: 16px
      @media screen and (max-width 1200px)
        margin: 15px 0 30px 10px
</style>
