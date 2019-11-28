<template>
  <div class="forgot">
    <div class="linWrap">
      <div class="box">
        <div class="logo"></div>
        <h5>{{$t('forgetPassword.text1')}}</h5>
        <div class="line"></div>
        <h6>{{$t('forgetPassword.text2')}}</h6>
        <p>{{$t('forgetPassword.text20')}}：{{email}}</p>
        <div class="password inputBox">
          <input type="password" v-if="!eye" :placeholder="$t('forgetPassword.text6')" v-model="password" @blur="showError(1)">
          <input type="text" :placeholder="$t('forgetPassword.text6')" v-if="eye" v-model="password" @blur="showError(1)">
          <i v-if="!eye" @click="eye = !eye"></i>
          <i v-if="eye" class="openEye" @click="eye = !eye"></i>
        </div>
        <div :class="{'errorMsg': errShow}" class="tips" v-if="errMsg1">{{errMsg1}}</div>
        <div class="password inputBox">
          <input type="password" v-if="!eye2" :placeholder="$t('forgetPassword.text7')" v-model="passWord" @blur="showError(2)">
          <input type="text" :placeholder="$t('forgetPassword.text7')" v-if="eye2" v-model="passWord" @blur="showError(2)">
          <i v-if="!eye2" @click="eye2 = !eye2"></i>
          <i v-if="eye2" class="openEye" @click="eye2 = !eye2"></i>
          <span class="errorMsg" v-if="errMsg2">{{errMsg2}}</span>
        </div>
        <div class="vefiryType inputBox">
          <div class="type" v-if="userInfo.openGoogleCode ===2">
            Google{{$t('forgetPassword.text8')}}
          </div>
          <div class="type" v-if="userInfo.openGoogleCode !==2">
            邮箱{{$t('forgetPassword.text8')}}
          </div>
        </div>
        <div class="vefiryCode inputBox">
          <input type="text" :placeholder="$t('forgetPassword.text9') + 'Google' + $t('forgetPassword.text10')" @blur="showError(3)" v-model="code" v-if="userInfo.openGoogleCode ===2">
          <input type="text" :placeholder="$t('safePassword.text10')" @blur="showError(3)" v-model="code" v-if="userInfo.openGoogleCode !==2">
          <i v-if="userInfo.openGoogleCode !==2" @click="getCode()">{{sendBtnValue}}</i>
          <span class="errorMsg" v-if="errMsg3">{{errMsg3}}</span>
        </div>
        <div class="btn" @click="findPasswordWeb()">{{$t('forgetPassword.text11')}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Dialog from '@/components/globalDialog/dialog'
export default {
  data () {
    return {
      sendBtnValue: this.$t('forgetPassword.text12'),
      sendBtnTimes: 60,
      isDisabled: true,
      timer: null,
      email: this.$route.query.e,
      userInfo: JSON.parse(this.$route.query.data),
      eye: false,
      eye2: false,
      errMsg1: this.$t('forgetPassword.text13'),
      errShow: false,
      errMsg2: '',
      errMsg3: '',
      toggle: false,
      password: '', // 密码
      passWord: '', // 再次输入密码
      code: '' // 验证码
    }
  },
  mounted () {
  },
  methods: {
    findPasswordWeb () {
      let type
      if (this.userInfo.openGoogleCode === 2) {
        type = 3
      } else {
        type = 3
      }
      let url = `${this.$api}/user/findPasswordWeb?email=${this.email}&newpassword=${this.password}&code=${this.code}&type=${type}`
      this.sureShowError()
      if (this.validata()) {
        this.$http.post(url).then(res => {
          if (res.data.success) {
            this.errMsg = ''
            Dialog({
              msg: this.$t('forgetPassword.text16'),
              okFn: () => {
                this.$router.push('/login')
              }
            })
          } else {
            Dialog({
              msg: res.data.msg
            })
          }
        }).catch(err => {
          this.errMsg = ''
          console.log(err)
        })
      }
    },
    getCode () {
      let url = `${this.$api}/register/sendEmailCode?email=${this.email}&type=1`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.countDown()
        } else {
        }
      }).catch(err => {
        console.log(err)
      })
      /*
     else if (this.curType.type === 2) {
        let _json = {
          phoneCode: this.userInfo.phoheCode,
          mobile: this.userInfo.mobile,
          type: 'register'
        }
        let formData = new FormData()
        formData.append('json', JSON.stringify(_json))
        url = `${this.$api}/user/sendSmsCode`
        this.$http.post(url, formData).then(res => {
          if (res.data.success) {
            this.countDown()
          } else {
          }
        }).catch(err => {
          console.log(err)
        })
      }
      */
    },
    // 短信倒计时
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.sendBtnValue = this.$t('forgetPassword.text12')
        this.sendBtnTimes = 60
        this.isDisabled = false
        clearTimeout(this.timer)
      } else {
        this.sendBtnTimes--
        this.sendBtnValue = this.sendBtnTimes
        this.isDisabled = true
        this.timer = setTimeout(() => this.countDown(), 1000)
      }
    },
    // 选择验证方式 2 代表开通
    selectType (item, index) {
      this.curType = item
      this.curType.type = item.type
      this.toggle = false
      // if (item.type === 3 && this.userInfo.openGoogleCode !== 2) {
      //   return false
      // } else if (item.type === 2 && this.userInfo.openMobileCode !== 2) {
      //   return false
      // } else {
      //   this.curType = item
      //   this.toggle = false
      // }
    },
    showError (n) {
      if (n === 1) {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,14}$/
        if (!re.test(this.password)) {
          this.errMsg1 = this.$t('forgetPassword.text19')
          this.errShow = true
        } else {
          this.errMsg1 = this.$t('forgetPassword.text13')
          this.errShow = false
        }
      } else if (n === 2) {
        if (this.passWord !== this.password) {
          this.errMsg2 = this.$t('forgetPassword.text17')
        } else {
          this.errMsg2 = ''
        }
      } else if (n === 3) {
        if (this.code.trim() === '') {
          // this.errMsg3 = this.$t('forgetPassword.text18')
        } else {
          this.errMsg3 = ''
        }
      }
    },
    sureShowError () {
      let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,14}$/
      if (!re.test(this.password)) {
        this.errMsg1 = this.$t('forgetPassword.text19')
        this.errShow = true
      } else {
        this.errMsg1 = this.$t('forgetPassword.text13')
        this.errShow = false
      }
      if (this.passWord !== this.password) {
        this.errMsg2 = this.$t('forgetPassword.text17')
      } else {
        this.errMsg2 = ''
      }
      if (this.code.trim() === '') {
        this.errMsg3 = this.$t('forgetPassword.text18')
      } else {
        this.errMsg3 = ''
      }
    },
    validata () {
      let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,14}$/
      if (!re.test(this.password)) {
        return false
      }
      if (this.passWord !== this.password) {
        return false
      }
      if (this.code.trim() === '') {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.tips{
  margin: -30px 0 30px;
  color: #FC534C;
}
.forgot{
  background-color: #EDEFF1;
  padding: 20px 0 30px;
  @media screen and (max-width: 1200px) {
    padding-bottom: 0;
  }
  .linWrap{
    background-color: #fff;
    min-height: 1250px;
  }
}
.box{
  width: 960px;
  margin: 0 auto;
  padding-top: 130px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  .logo{
    width: 130px;
    height: 158px;
    background-image: url("../../assets/images/login/LOGO.png");
    background-size: cover;
    background-position: center;
    margin: 0 auto 30px;
  }
  p{
    font-size: 16px;
    color: #181818;
    padding-bottom: 56px;
  }
  h5{
    font-size:28px;
    color: #032143;
    text-align: center;
  }
  .line{
    width: 48px;
    height: 2px;
    background-color: #FC534C;
    margin: 30px auto;
  }
  h6{
    color: #333;
    font-size: 16px;
    margin-bottom: 30px;
    text-align: center;
  }
  .inputBox{
    width: 100%;
    color: #999;
    position: relative;
    margin-bottom: 40px;
    @media screen and (max-width: 1024px) {
      margin-bottom: 60px;
    }
    input{
      width: 100%;
      padding: 0 46px 0 40px;
      height: 70px;
      box-sizing: border-box;
      border: 1px solid #d7d9db;
      @media screen and (max-width: 1024px) {
        padding-left: 10px;
      }
    }
    i{
      position: absolute;
      top:50%;
      right: 30px;
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url("../../assets/images/login/delete.png");
      transform: translate(0,-50%);
      cursor: pointer;
      opacity: 1;
      &.close{
        opacity: 0;
      }
    }
    span{
      position: absolute;
      color: #1a1a1a;
      top: 80px;
      left: 0;
      font-size: 14px;
      &.errorMsg{
        color: #e60000;
      }
    }
    &.vefiryType{
      position: relative;
      width: 100%;
      height: 70px;
      border: 1px solid #d7d9db;
      padding: 0 30px 0 40px;
      @media screen and (max-width: 1024px) {
        padding-left: 10px;
      }
      .type{
        height: 70px;
        width: 100%;
        line-height: 70px;
        font-size: 16px;
        cursor: pointer;
      }
      i{
        width: 20px;
        height: 10px;
        background-image: url("../../assets/images/login/select.png");
      }
      ul{
        position: absolute;
        top: 70px;
        left: 0;
        z-index: 9;
        width: 100%;
        box-shadow: 0px 5px 20px rgba(0,0,0,0.6);
        max-height: 0;
        overflow: hidden;
        transition: all 0.5s;
        &.close{
          max-height: 150px;
        }
        li{
          height: 50px;
          background-color: #fff;
          border-bottom: 1px solid #ccc;
          line-height: 50px;
          text-align: center;
          cursor: pointer ;
          color: #1a1a1a;
          font-size: 16px;
          &.active{
            font-weight: bold;
          }
          &.disable{
            cursor: no-drop;
            color: #bbb;
          }
          &:hover{
            font-weight: bold;
          }
        }
      }
    }
    &.vefiryCode{
      i{
        display: block;
        position: absolute;
        width: 200px;
        height: 70px;
        background-color: #FC534C;
        background-image: none;
        right: 0;
        top:50%;
        color: #fff;
        line-height: 70px;
        text-align: center;
        cursor: pointer;
        @media screen and (max-width: 1024px) {
          width: 100px;
        }
      }
      input{
        width: 100%;
      }
    }
    &.password{
      i{
        width: 20px;
        height: 10px;
        background-image: url("../../assets/images/login/close.png");
        &.openEye{
          height: 11px;
          background-image: url("../../assets/images/login/open.png");
        }
      }
    }
  }
  .btn{
    width: 100%;
    height: 70px;
    background-color:#FC534C ;
    text-align: center;
    line-height: 70px;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    @media screen and (max-width: 1024px) {
      margin-bottom: 30px;
    }
    &:active{
      opacity: 0.6;
    }
  }
}
</style>
