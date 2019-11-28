<template>
  <div class="login" @keyup.enter="loginRequest">
    <div class="login-box">
      <input type="text" style="display: none">
      <input type="password" style="display: none">
      <div class="info-flex">
        <div class="title">{{$t('login.title')}}</div>
        <div class="login-form">
          <div class="from">
            <div class="log"><img src="../../assets/images/login/login.svg" alt=""></div>
            <div class="textInput">
              <input class="user" type="text"  v-model="userName" autocomplete="off" :placeholder="userPlaceholder">
            </div>
            <div class="textInput" style="margin-bottom: 17px">
              <input class="password" type="password" v-model="passwordValue" autocomplete="off" :placeholder="passwordPlaceholder">
            </div>
            <div class="link"><router-link to="/inputEmail">{{$t('login.text10')}}</router-link></div>
            <div class="app-link"><router-link to="/inputEmail">{{$t('login.text10')}}</router-link></div>
            <div class="textInput btn" @click="loginRequest" :class="{'loading-btn': toLogin}">
              <div class="inFlex">
               {{$t('login.btn')}}<i class="toLogin" v-if="toLogin"></i>
              </div>
            </div>
            <div class="warn" v-if="errorShow">{{errorWarn}}</div>
            <router-link to="/register" tag="div" class="sigin">{{$t('login.text11')}}</router-link>
            <router-link to="/register"  tag="div" class="app-sigin">{{$t('login.text11')}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
.login{
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
  .login-box{
    width: 1630px;
    background-color: #fff;
    border-radius: 4px;
    margin: 0 auto;
    padding-bottom: 64px;
    @media screen and (max-width: 1630px){
      width: 100%;
    }
    @media screen and (max-width: 1024px){
      padding-bottom: 20px;
    }
    .info-flex{
      width: auto;
      height: auto;
      .title{
        font-size: 24px;
        text-align: center;
        padding: 45px 0 30px;
        color: #032e43;
        @media screen and (max-width: 768px){
          padding: 18px 0;
          font-size: 18px;
        }
      }
      .login-form{
        width: 800px;
        padding-bottom: 40px;
        margin: 0 auto;
        border: 1px solid #d7d9db;
        border-radius: 8px;
        display: flex;
        align-items: center;
        transition: all .2s linear;
        &:hover{
          animation: loginScale 1s 1;
          border: 1px solid rgba(215, 217, 219, .6);
          @keyframes loginScale {
            0% {transform: scale(1.0);}
            50% {transform: scale(1.02);}
            100% {transform: scale(1.0);}
        }
        }
        @media screen and (max-width: 1200px){
          width: 50%;
          height: auto;
        }
        @media screen and (max-width: 768px){
          width: 90%;
          padding-bottom: 20px;
        }
        .from{
          width: 600px;
          height: 100%;
          margin: 0 auto;
          @media screen and (max-width: 1200px){
            width: 80%;
          }
          @media screen and (max-width: 768px){
            width: 90%;
          }
          .log{
            width: 122px;
            height: 154px;
            margin: 60px auto 70px;
            @media screen and (max-width: 1024px){
              width: 40%;
              height: auto;
            }
            @media screen and (max-width: 768px){
              width: 20%;
              margin: 20px auto 20px;
            }
            img{
              width: 100%;
              height: 100%;
            }
          }
          .textInput{
            width: 100%;
            height: 88px;
            line-height: 88px;
            border-radius: 4px;
            margin-bottom: 30px;
            position: relative;
            @media screen and (max-width: 1024px){
              height: 60px;
              line-height: 60px;
            }
            @media screen and (max-width: 768px){
              height: 50px;
              line-height: 50px;
            }
            .user,.password{
              background:none;
              outline:none;
              font-size: 14px;
              color: #181818;
              box-sizing: border-box;
              display: inline-block;
              width: 100%;
              height: 100%;
              position: absolute;
              line-height: 88px;
              top: 0;
              left: 0;
              border: 1px solid #d7d9db;
              border-radius: 3px;
              padding-left:30px;
              box-shadow: 0 6px 6px rgba(0,0,0,.1);
              -webkit-transition: border-color ease-in-out .15s,
              -webkit-box-shadow ease-in-out .15s;
              -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
              transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
              &:focus{
                outline:none;
                border-color: rgba(0, 0, 0, 0.1);
                -webkit-box-shadow: inset 0 1px 1px rgba(215, 217, 219, .2),
                0 0 10px rgba(0, 0, 0, 0.1);;
                box-shadow: inset 0 1px 1px rgba(215, 217, 219, .2),0 0 8px rgba(0, 0, 0, 0.1);;
              }
              @media screen and (max-width: 1024px){
                line-height: 60px;
              }
              @media screen and (max-width: 768px){
                line-height: 50px;
              }
            }
            .placeholder{
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 30px;
              color: #181818;
              transition: all 0.5s ease;
              &.active{
                transform: translate3d(0, -130%, 0);
                left: 0;
                font-size: 20px;
                color: rgba(255, 82, 77, 1);
              }
            }
          }
          .link{
            text-align: right;
            margin-bottom: 20px;
            @media screen and (max-width: 1024px){
              display: none;
            }
            a{
              font-size: 16px;
              color: #777676;
              &:hover{
                color: #fc534c;
              }
            }
          }
          .app-link{
            text-align: right;
            margin-bottom: 20px;
            @media screen and (min-width: 1024px){
              display: none;
            }
            a{
              font-size: 16px;
              color: #777676;
              &:hover{
                color: #fc534c;
              }
            }
          }
          .sigin{
            padding-top: 37px;
            text-align: center;
            cursor: pointer;
            @media screen and (max-width: 1024px){
              display: none;
            }
            &:hover{
              color: #fc534c;
            }
          }
          .app-sigin{
            padding-top: 37px;
            text-align: center;
            @media screen and (min-width: 1024px){
              display: none;
            }
            @media screen and (max-width: 1024px){
              padding-top: 20px;
            }
            a{
              font-size: 20px;
              color: #fc534c;
              @media screen and (max-width: 1024px){
                font-size: 16px;
              }
              &:hover{
                color: #777676;
              }
            }
          }
          .btn{
            background-color: #fc534c;
            margin-top: 10px;
            margin-bottom: 0;
            text-align: center;
            color: #fff;
            font-size: 20px;
            letter-spacing: 6px;
            cursor: pointer;
            user-select: none;
            transition: all 0.5s ease;
            display: flex;
            align-items: center;
            &:active {
              opacity: .5;
            }
            &.loading-btn{
              pointer-events: none;
            }
            @media screen and (max-width: 768px){
              font-size: 16px;
            }
            .inFlex{
              margin: 0 auto;
              .toLogin{
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: middle;
                background: url("../../assets/images/login/loading.gif") no-repeat;
                background-size: cover;
                background-position: center;
                @media screen and (max-width: 1024px){
                  width: 13px;
                  height: 13px;
                }
              }
            }
          }
          .warn{
            color: red;
            font-size: 14px;
            padding-top: 10px;
          }
        }
      }
    }
  }
}

</style>

<script>
export default{
  data () {
    return {
      userName: '',
      passwordValue: '',
      errorWarn: '',
      errorShow: false,
      toLogin: false,
      userPlaceholder: this.$t('login.userPlaceholder'),
      passwordPlaceholder: this.$t('login.passwordPlaceholder'),
      systemError: this.$t('login.systemError'),
      nullWarn: this.$t('login.nullWarn')
    }
  },
  methods: {
    // 登录请求
    loginRequest () {
      let lang
      let formData = new FormData()
      formData.append('username', this.userName)
      formData.append('password', this.passwordValue)
      // let url = `${this.$api}/user/userlogin?username=${this.userName}&password=${this.passwordValue}`
      if (localStorage.getItem('kleinLang') === 'CN') {
        lang = 'cn'
      } else {
        lang = 'en'
      }
      this.errorWarn = ''
      if (this.userName !== '' && this.passwordValue !== '') {
        this.toLogin = true
        this.$http.post(`${this.$api}/user/userlogin`, formData, {headers: {'secret-language': lang}}).then((res) => {
          if (res.data.success === true) {
            this.$router.push('/newExchange')
            this.toLogin = false
            this.$store.dispatch('balanceAction') // 登录成功刷新用户信息
          } else if (res.data.success === false) { // 登录失败
            this.errorWarn = res.data.msg
            this.errorShow = true
            this.toLogin = false
          } else { // 系统错误
            this.errorWarn = this.systemError
            this.errorShow = true
            this.toLogin = false
          }
        }).catch((error) => {
          console.log(error)
        })
      } else { // 账号密码为空
        this.errorWarn = this.nullWarn
        this.errorShow = true
      }
    }
  }
}
</script>
