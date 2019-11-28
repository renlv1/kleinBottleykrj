<template>
  <div class="inputEmail">
    <div class="linWrap">
      <div class="box">
        <div class="logo"></div>
        <h5 v-if="Number(this.$route.query.myAccount) === 1">{{$t('forgetPassword.text23')}}</h5>
        <h5 v-if="Number(this.$route.query.myAccount) !== 1">{{$t('forgetPassword.text1')}}</h5>
        <div class="line"></div>
        <h6>{{$t('forgetPassword.text2')}}</h6>
        <div class="email">
          <input type="text" :placeholder="$t('forgetPassword.text3')" v-model="email">
          <i @click="deleteInput()"></i>
          <span class="errorMsg" v-if="errMsg">{{errMsg}}</span>
        </div>
        <div class="btn" @click="findPasswordWeb()">{{$t('forgetPassword.text4')}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      errMsg: '',
      email: ''
    }
  },
  methods: {
    findPasswordWeb () {
      let url = `${this.$api}/user/findPasswordWeb?email=${this.email}`
      if (this.validata()) {
        this.$http.post(url).then(res => {
          if (res.data.success) {
            this.errMsg = ''
            this.$router.push({
              path: '/forgetPassword',
              query: {
                data: JSON.stringify(res.data.data),
                e: this.email
              }
            })
          } else {
            this.errMsg = res.data.msg
          }
        }).catch(err => {
          this.errMsg = ''
          console.log(err)
        })
      }
    },
    validata () {
      // 邮箱验证规则
      let re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (re.test(this.email)) {
        this.errMsg = ''
        return true
      } else {
        this.errMsg = this.$t('forgetPassword.text5')
        return false
      }
    },
    deleteInput () {
      this.email = ''
    }
  }
}
</script>

<style lang="less" scoped>
.inputEmail{
  background-color: #EDEFF1;
  padding: 20px 0 30px;
  @media screen and (max-width: 1024px) {
    padding: 0;
  }
  .linWrap{
    background-color: #fff;
    min-height: 1250px;
    @media screen and (max-width: 1024px) {
      min-height: 100vh;
    }
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
  .email{
    width: 100%;
    border: 1px solid #999;
    color: #999;
    padding: 0 46px 0 40px;
    position: relative;
    margin-bottom: 40px;
    input{
      width: 100%;
      height: 70px;
      border: none;
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
      color: #e60000;
      top: 80px;
      left: 0;
      font-size: 14px;
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
    margin-bottom: 50px;
    &:active{
      opacity: 0.6;
    }
  }
}
</style>
