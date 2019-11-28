<template>
  <div class="signin">
    <div class="signin-box">
      <input type="text" style="display: none">
      <input type="password" style="display: none">
      <div class="info-flex">
        <div class="signin-form">
          <div class="from">
            <div class="log"><img src="../../assets/images/login/LOGO.png" alt=""></div>
            <div class="title">{{$t('register.text1')}}</div>
            <div class="hr"></div>
            <div class="title-hint">{{$t('register.text2')}}</div>
            <div class="textInput">
              <input type="text" v-model.trim="userName" @focus="userNameHintShow = false" autocomplete="off" :placeholder="$t('register.text3')">
              <span class="close" @click="closeuserName()"></span>
              <div class="HintShow" v-show="userNameHintShow">{{$t('register.text4')}}</div>
            </div>
            <div class="textInput pswInput" v-show="pswDefaultIndex == index" v-for="(item,index) in passwordTextTypeDatas" :key="index">
              <input :type="item.texttype" v-model.trim="passWord" @focus="passWordHintShow = false" autocomplete="off" :placeholder="$t('register.text5')">
              <div class="eye" @click="seeThePassword(index)"><img :src="item.urlIMg" alt=""></div>
              <div class="HintShow" v-show="passWordHintShow">{{$t('register.text6')}}</div>
            </div>
            <div class="psdWordHint">{{$t('register.text7')}}</div>
            <div class="textInput">
              <input type="password" v-model.trim="enterPassword" @focus="enterPassWordHintShow = false; enterPassWordHintShow2 = false" autocomplete="off" :placeholder="$t('register.text8')">
              <div class="HintShow" v-show="enterPassWordHintShow">{{$t('register.text6')}}</div>
              <div class="HintShow" v-show="enterPassWordHintShow2">{{$t('register.text17')}}</div>
            </div>
            <div class="textInput">
              <input type="text" v-model.trim="email" @focus="emailHintShow = false" autocomplete="off" :placeholder="$t('register.text9')">
              <span class="close" @click="closeuserPsd()"></span>
              <div class="HintShow" v-show="emailHintShow">{{emailHintText}}</div>
            </div>
            <div class="textInput emilInput">
              <input type="text"  v-model.trim="emailCode" @focus="emailCodeHintShow = false" autocomplete="off" :placeholder="$t('register.text10')">
              <button class="getEmilCode" ref="sendMsg" @click="sendPhoneCode()">{{$t('register.text11')}}</button>
              <div class="HintShow" v-show="emailCodeHintShow">{{emailHintCodeText}}</div>
            </div>
            <div class="Email-hint">{{emailFailureHintText}}</div>
            <div class="registration-submitted" @click="registrationSubmitted()" >{{$t('register.text12')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--注册成功提示-->
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">注册成功</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">确定</button>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
  .signin{
    width: 100%;
    min-height: 100%;
    padding-top: 20px;
    background-color: #edeff1;
    @media screen and (max-width: 1630px){
      padding: 20px 20px 0;
    }
    @media screen and (max-width: 1200px){
      display: flex;
      align-items: center;
      padding-top: 0;
    }
    .signin-box{
      width: 1630px;
      background-color: #fff;
      border-radius: 4px;
      margin: 0 auto;
      @media screen and (max-width: 1630px){
        width: 100%;
      }
      @media screen and (max-width: 1024px){
        padding-bottom: 20px;
      }
      .info-flex{
        width: auto;
        height: auto;
        padding: 64px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .signin-form{
          width: 800px;
          padding-bottom: 40px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          transition: all .2s linear;
          @media screen and (max-width: 1200px){
            width: 70%;
            height: auto;
          }
          @media screen and (max-width: 768px){
            width: 90%;
            padding-bottom: 30px;
          }
          .from{
            width: 600px;
            height: 100%;
            margin: 0 auto;
            @media screen and (max-width: 1200px){
              width: 90%;
            }
            @media screen and (max-width: 768px){
              width: 100%;
            }
            .log{
              width: 130px;
              height: 158px;
              margin: auto;
              @media screen and (max-width: 1024px){
                width: 40%;
                height: auto;
              }
              @media screen and (max-width: 768px){
                width: 20%;
                margin: 5px auto;
              }
              img{
                width: 100%;
                height: 100%;
              }
            }
            .title{
              font-size: 20px;
              letter-spacing: 6px;
              color: #032e43;
              text-align: center;
              @media screen and (max-width: 1024px){
                font-size: 16px;
              }
            }
            .hr{
              width: 36px;
              height: 2px;
              margin: 20px auto;
              background-color: #fc534c;
              @media screen and (max-width: 1024px){
                margin: 12px auto;
              }
            }
            .title-hint{
              font-size: 14px;
              color: #181818;
              text-align: center;
              padding-bottom: 20px;
            }
            .textInput{
              width: 600px;
              line-height: 54px;
              height: 54px;
              border: 1px solid #d7d9db;
              border-radius: 4px;
              margin-bottom: 30px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              position: relative;
              @media screen and (max-width: 1200px){
                width: 100%;
              }
              @media screen and (max-width: 768px){
                height: 40px;
                line-height: 40px;
              }
              input{
                flex: 1;
                background:none;
                outline:none;
                font-size: 14px;
                color: #181818;
                box-sizing: border-box;
                display: inline-block;
                border: none;
                padding-left:30px;
                @media screen and (max-width: 1200px){
                  padding-left: 5px;
                  font-size: 12px;
                }
              }
              .close{
                width: 16px;
                height: 16px;
                background: url("../../assets/images/login/del.png") no-repeat;
                margin-right: 14px;
                cursor: pointer;
              }
              .eye{
                width: 16px;
                height: 16px;
                margin-right: 14px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                  width: 100%;
                }
              }
              .getEmilCode{
                width: 140px;
                border: 1px solid #FC534C;  //自定义边框
                outline: none;
                height: 100%;
                line-height: 54px;
                background-color: #FC534C;
                text-align: center;
                font-size: 14px;
                letter-spacing: 1px;
                color: #fff;
                @media screen and (max-width: 1200px){
                  width: 50px;
                }
                @media screen and (max-width: 768px){
                  height: 40px;
                  line-height: 40px;
                }
              }
              .HintShow{
                height: auto;
                line-height: 14px;
                position: absolute;
                left: 0;
                top: 54px;
                color: #e93a3a;
                font-size: 14px;
                @media screen and (max-width: 1200px){
                  top: 42px;
                  font-size: 12px;
                }
              }
            }
            .pswInput{
              margin-bottom: 0;
            }
            .psdWordHint{
              height: auto;
              padding: 20px 0 20px;
              padding-left: 30px;
              font-size: 14px;
              color: rgba(117,117,117, 1);
              @media screen and (max-width: 1200px){
                padding-left: 0;
              }
            }
            .emilInput{
              margin-bottom: 0;
            }
            .Email-hint{
              width: 100%;
              font-size: 14px;
              color: #fc534c;
              padding: 20px 0;
            }
            .registration-submitted{
              width: 100%;
              height: 54px;
              line-height: 54px;
              border-radius: 1px;
              text-align: center;
              background-color: #fc534c;
              color: #fff;
              font-size: 20px;
              letter-spacing: 6px;
              cursor: pointer;
              user-select: none;
              transition: all 0.5s ease;
              &:active {
                opacity: .5;
              }
              @media screen and (max-width: 768px){
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    .myPopup{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 9999;
      top: 0px;
      left: 0px;
      background-color: rgba(0,0,0, .2);
      display: flex;
      align-items: center;
      justify-content: center;
      .myPopup-tip{
        width: 500px;
        height: 300px;
        border-radius: 4px;
        background-color: #fff;
        .title{
          font-size: 24px;
          text-align: center;
          color: #fc534c;;
        }
      }
    }
  }
</style>

<script>
import Dialog from '@/components/globalDialog/dialog'
export default{
  data () {
    return {
      userName: '',
      passWord: '',
      enterPassword: '',
      email: '',
      emailCode: '',
      userNameHintShow: false,
      passWordHintShow: false,
      enterPassWordHintShow: false,
      enterPassWordHintShow2: false,
      emailCodeHintShow: false,
      emailHintShow: false,
      emailHintText: false,
      emailFailureHintText: '',
      emailHintCodeText: '',
      pswDefaultIndex: 0,
      successShow: false,
      sendBtnTimes: 60,
      passwordTextTypeDatas: [
        {
          texttype: 'password',
          urlIMg: require('../../assets/images/login/hide.png')
        },
        {
          texttype: 'text',
          urlIMg: require('../../assets/images/login/block.png')
        }
      ] // 密码框type
    }
  },
  methods: {
    seeThePassword (index) {
      if (index === 0) { // 0时input为文本框
        this.pswDefaultIndex = 1
      }
      if (index === 1) { // 1时input为密码框
        this.pswDefaultIndex = 0
      }
    },
    registrationSubmitted () {
      let userEmailTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (this.userName === '') {
        this.userNameHintShow = true
      }
      if (this.passWord === '') {
        this.passWordHintShow = true
      }
      if (this.enterPassword === '') {
        this.enterPassWordHintShow = true
      }
      if (this.passWord !== this.enterPassword) {
        this.enterPassWordHintShow2 = true
      }
      if (this.email === '' || !userEmailTest.test(this.email)) {
        this.emailHintShow = true
        this.emailHintText = this.$t('register.text13')
      }
      if (this.emailCode === '') {
        this.emailCodeHintShow = true
        this.emailHintCodeText = this.$t('register.text16')
      }
      let formData = new FormData()
      formData.append('username', this.userName)
      formData.append('password', this.passWord)
      formData.append('email', this.email)
      formData.append('verifyCode', this.emailCode)
      if (this.userName !== '' && this.passWord !== '' && (this.passWord === this.enterPassword) && this.email !== '' && userEmailTest.test(this.email) !== '' && this.emailCode !== '') {
        this.$http.post(this.$api + '/register/registerUser', formData).then((res) => {
          if (res.data.success) {
            // this.successShow = true // 注册成功
            Dialog({
              msg: this.$t('register.text15'),
              okFn: () => {
                this.$router.replace('/login')
              }
            })
            this.sendBtnTimes = 0 // 关闭倒计时
          } else {
            Dialog({
              msg: res.data.msg,
              okFn: () => {
                this.$router.replace('/register')
              }
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = '发送'
        this.sendBtnTimes = 60
        this.$refs.sendMsg.style.color = 'rgba(201,0,16)'
        this.$refs.sendMsg.disabled = false
      } else {
        this.sendBtnTimes--
        this.$refs.sendMsg.innerHTML = this.sendBtnTimes
        this.$refs.sendMsg.disabled = true
        this.$refs.sendMsg.style.color = 'rgba(255,255,255,0.6)'
        setTimeout(() => this.countDown(), 1000)
      }
    },
    sendPhoneCode () { // 发送验证码
      let sendCodeMsg // 发送提醒
      let regTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (this.email === '' || !regTest.test(this.email)) {
        this.emailHintShow = true
        this.emailHintText = this.$t('register.text13')
      } else {
        let formData = new FormData()
        formData.append('email', this.email)
        formData.append('type', 1) // 邮箱
        this.$http.post(`${this.$api}/register/sendEmailCode`, formData).then(res => {
          if (res.data.success) {
            sendCodeMsg = this.$t('register.text14')
            this.emailFailureHintText = sendCodeMsg
            this.emailHintCodeText = ''
          } else {
            this.emailFailureHintText = res.data.msg
          }
          // this.$store.dispatch('errAction', {bool: true, msg: sendCodeMsg}) // 弹窗提示
        }).catch((err) => {
          console.log(err)
        })
        // this.countDown()
      }
    },
    closeSuccessPopup () {
      this.successShow = false // 设置成功//  跳转路由(登录)
      this.$router.push({path: '/login'})
    },
    closeuserName () {
      this.userName = ''
    },
    closeuserPsd () {
      this.email = ''
    }
  }
}
</script>
