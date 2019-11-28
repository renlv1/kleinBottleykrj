<template>
  <div class="sieOrderDetail">
    <div class="pc">
      <div class="pc-content">
        <div class="property-title order-title">
          <h6><router-link to="/account/sieOrder" class="property">SIE{{$t('usdOrder.text2')}} > </router-link><span class="transfer">{{$t('sieOrderDetail.text29')}}</span></h6>
        </div>
        <div class="order-progress">
          <h6>1.{{tradeType(obj.etype)}}{{$t('sieOrderDetail.text1')}}</h6>
          <p><span style="color: #FC534C" v-if="obj.state === 1 || obj.state === 3">{{obj.tradeAmount | fourNumber}}</span> <span v-if="obj.state !== 1 && obj.state !== 3">{{obj.tradeAmount | fourNumber}}</span> <span v-if="obj.etype === 1">{{obj.buyCurrency}}</span><span v-if="obj.etype === 2">{{obj.sellCurrency}}</span> / <i>{{obj.amount | fourNumber}} <span v-if="obj.etype === 1">{{obj.buyCurrency}}</span><span v-if="obj.etype === 2">{{obj.sellCurrency}}</span></i></p>
        </div>
        <table class="pcTableDetial" v-if="true">
          <tr>
            <td>{{$t('orderDetail.text3')}}</td>
            <td>{{(obj.id)}}</td>
          </tr>
          <tr>
            <td>{{$t('sieOrderDetail.text2')}}</td>
            <td>{{$changeDate(obj.createAt, '/')}}</td>
          </tr>
          <tr>
            <td>{{$t('sieOrderDetail.text3')}}</td>
            <td>{{tradeType(obj.etype)}}</td>
          </tr>
          <tr>
            <td>{{$t('sieOrderDetail.text4')}}</td>
            <td>{{tradeStatus(obj.state)}}</td>
          </tr>
          <tr>
            <td><span>{{tradeType(obj.etype)}}</span>{{$t('sieOrderDetail.text5')}}</td>
            <td>{{obj.price | fourNumber}} USD</td>
          </tr>
          <tr>
            <td>{{$t('sieOrderDetail.text30')}}</td>
            <td>{{obj.amount | fourNumber}} SIE</td>
          </tr>
          <tr>
            <td>{{$t('sieOrderDetail.text31')}}</td>
            <td>{{obj.cashAmount | fourNumber}} USD</td>
          </tr>
          <tr>
            <td>{{$t('sieOrderDetail.text32')}}</td>
            <td>{{obj.tradeAmount | fourNumber}} SIE</td>
          </tr>
          <tr>
            <td>{{$t('sieOrderDetail.text33')}}</td>
            <td>{{obj.tradeCashAmount | fourNumber}} USD</td>
          </tr>
          <tr v-if="(obj.state === 2 && obj.etype === 1)">
            <td>{{$t('sieOrderDetail.text8')}}</td>
            <td>{{obj.actNo}}</td>
          </tr>
        </table>
        <div class="turnover-detail">
          <h6>{{$t('invitedRecord.text11')}}</h6>
        </div>
        <table class="commonTableList">
          <thead>
          <tr>
            <td>{{$t('invitedRecord.text12')}}</td>
            <td >{{$t('invitedRecord.text13')}}</td>
            <td>{{$t('invitedRecord.text14')}}</td>
            <td class="time">{{$t('invitedRecord.text15')}}</td>
          </tr>
          </thead>
          <tbody >
          <tr v-for="(item,index) in orderDetailList" :key="index">
            <td>{{item.tradePrice | fourNumber}} USD</td>
            <td>{{item.tradeAmount | fourNumber}} SIE</td>
            <td>{{$changeDate(item.createAt, '/')}}</td>
            <td class="time">{{item.tradeTotalPrice | fourNumber}} USD</td>
          </tr>
          </tbody>
          <div v-if="orderDetailList.length === 0" class="error">{{$t('orderManage.text8')}}</div>
          <v-turnPage v-if="orderDetailList.length !== 0" :propsPage="entrustTotal" @sieTradeTrun="rechargeTurnPage"></v-turnPage>
        </table>
        <div class="tips" v-show="obj.tradeCashAmount < 100 && (obj.state === 1 || obj.state === 3)">{{$t('sieMoney.text17')}}</div>
        <div class="btn-box" v-if="obj.state === 1 || obj.state === 3">
          <div class="cancel-btn" @click="btnCancel()">{{$t('sieOrderDetail.text9')}}</div>
        </div>
      </div>
    </div>
    <!--手机结构-->
    <div class="mobile">
      <div class="management-head">
        <div class="head">
          <div class="back" @click="$router.go(-1)"></div>
          <div class="title">SIE{{$t('sieOrderDetail.text29')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="mobile-content">
        <div class="order-progress">
          <h6>{{tradeType(obj.etype)}}{{$t('sieOrderDetail.text1')}}</h6>
          <p><span >{{obj.tradeAmount | fourNumber}} <span v-if="obj.etype === 1">{{obj.buyCurrency}}</span><span v-if="obj.etype === 2">{{obj.sellCurrency}}</span>  </span> / <i>{{obj.amount | fourNumber}} <span v-if="obj.etype === 1">{{obj.buyCurrency}}</span><span v-if="obj.etype === 2">{{obj.sellCurrency}}</span></i></p>
        </div>
        <div class="dashed-line"></div>
        <div class="mobile-box">
          <ul v-if="true">
            <li>
              <span>{{$t('sieOrderDetail.text4')}}:</span><i>{{tradeStatus(obj.state)}}</i>
            </li>
            <li>
              <span>{{$t('sieOrderDetail.text2')}}:</span><i>{{$changeDate(obj.createAt, '/')}}</i>
            </li>
            <li>
              <span>{{$t('sieOrderDetail.text3')}}:</span><i>{{tradeType(obj.etype)}}</i>
            </li>
            <li>
              <span v-if="obj.etype === 1">{{$t('sieOrderDetail.text10')}}:</span><span v-if="obj.etype === 2">{{$t('sieOrderDetail.text11')}}:</span><i>{{obj.price | fourNumber}} USD</i>
            </li>
            <li>
              <span>{{$t('sieOrderDetail.text30')}}:</span><i>{{obj.amount | fourNumber}} SIE</i>
            </li>
            <li>
              <span>{{$t('sieOrderDetail.text31')}}:</span><i>{{obj.cashAmount | fourNumber}} USD</i>
            </li>
            <li>
              <span>{{$t('sieOrderDetail.text32')}}:</span><i>{{obj.tradeAmount | fourNumber}} SIE</i>
            </li>
            <li>
              <span>{{$t('sieOrderDetail.text33')}}:</span><i>{{obj.tradeCashAmount | fourNumber}} USD</i>
            </li>
            <li v-if="(obj.state === 2 && obj.etype === 1)">
              <span>{{$t('sieOrderDetail.text8')}}:</span><i>{{obj.actNo}}</i>
            </li>
            <li @click="toDetail()">
              <span>{{$t('invitedRecord.text16')}}</span><i><img src="../../../../assets/images/aiChat/next.png"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="tips" v-show="obj.tradeCashAmount < 100 && (obj.state === 1 || obj.state === 3)">{{$t('sieMoney.text17')}}</div>
      <div class="btn-box" v-if="obj.state === 1 || obj.state === 3">
        <div class="cancel-btn" @click="btnCancel()">{{$t('sieOrderDetail.text9')}}</div>
      </div>
    </div>
    <!--确定弹窗-->
    <div class="myPopup" v-show="payPopupShow">
      <div class="myPopup-box">
        <a class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></a>
        <div class="formDiv">
          <h3 class="title">{{$t('sieOrderDetail.text14')}}</h3>
          <input class="payPassword tradingCenter-input" type="password" v-model.trim="payPassword"  value="" :placeholder="$t('dialog.text2')">
          <!-- 短信-->
          <!--<div class="shortMsg" v-show="isgogoleDuanxin">-->
            <!--<div class="payMsg-box">-->
              <!--<input class="payMsg tradingCenter-input" v-model.trim="payCode"  :placeholder="$t('dialog.text3')" type="text" value="">-->
              <!--<button class="sendMsg" @click="getCode()" ref="sendMsg" :class="{'disable': isDisabled}">{{sendBtnValue}}</button>-->
            <!--</div>-->
          <!--</div>-->
          <!--谷歌-->
          <div class="shortMsg" v-show="!isgogoleDuanxin">
            <div class="payMsg-box">
              <input class="payMsg tradingCenter-input" v-model.trim="payCode"   :placeholder="$t('dialog.text4')" type="text" value="">
            </div>
          </div>
          <div class="errmsg-tips">{{payFailTip}}</div>
          <button class="tradingCenter-btn pay-btn" @click="confirmPay()">{{$t('dialog.text5')}}</button>
        </div>
      </div>
    </div>
    <!--完成弹窗-->
    <div class="myPopup" v-show="confirmShow">
      <div class="myPopup-box">
        <a class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></a>
        <!--支付成功弹窗-->
        <div v-show="isSuccess">
          <h3 class="title">{{$t('sieOrderDetail.text15')}}</h3>
          <button class="tradingCenter-btn" @click="successPay">{{$t('dialog.text5')}}</button>
        </div>
        <!--支付失败弹窗-->
        <div v-show="!isSuccess">
          <h3 class="title">{{$t('sieOrderDetail.text16')}}</h3>
          <div class="errinMsg">{{errinMsgText}}</div>
          <button class="tradingCenter-btn" @click="failedDialog">{{$t('dialog.text5')}}</button>
        </div>
      </div>
    </div>
    <!-- 未设置验证码-->
    <div class="myPopup" v-if="setSafeVerific">
      <div class="myPopup-box" >
        <div class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></div>
        <p class="error-text">{{$t('dialog.text8')}}</p>
        <div class="tradingCenter-btn mobile-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>
        <div class="tradingCenter-btn pc-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>
      </div>
    </div>
    <!--请先绑定手机号码-->
    <!--<div class="myPopup" v-show="noBindPhoneShow">-->
      <!--<div class="myPopup-box">-->
        <!--<h3 class="error-text">{{$t('dialog.text9')}}</h3>-->
        <!--<a class="tradingCenter-btn mobile-btn" target="_blank" href="https://mtrade.secretworth.com/#/safeCenter">{{$t('dialog.text5')}}</a>-->
        <!--<a class="tradingCenter-btn pc-btn" target="_blank" href="https://trade.secretworth.com/#/userAccount">{{$t('dialog.text5')}}</a>-->
      <!--</div>-->
    <!--</div>-->
    <!-- 是否取消订单弹窗 -->
    <div class="pay-dialog-transfer" v-show="showCancleDialog" >
      <div class="dialog-content">
        <div class="close-confirm" @click="showCancleDialog = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-box">
          <div>
            <div>
              <div class="confirmShow">
                <div class="dialog-title">{{$t('usdMoney.text_48')}}</div>
                <div class="dialog-text">{{$t('usdMoney.text_49')}}</div>
              </div>
              <div class="pay-confim-btn" @click="confirmCancle">{{$t('sieTransfer.text10')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      payPopupShow: false, // 确定弹窗
      isgogoleDuanxin: true, // 判断短信还是谷歌 默认短信
      confirmShow: false, // 完成弹窗
      setSafeVerific: false, // 未设置安全验证弹窗
      isSuccess: true,
      payFailTip: '', // 确认支付提示
      errinMsgText: '', // 支付失败提示
      noBindPhoneShow: false,
      payPassword: '', // 安全码
      payCode: '', // 验证码
      sendBtnValue: this.$t('dialog.text10'),
      sendBtnTimes: 60,
      timer: null,
      isDisabled: false,
      maxInput: 0,
      obj: JSON.parse(this.$route.query.obj),
      codeType: '', // 验证码类型（谷歌验证码。手机验证码）
      showCancleDialog: false, // 确定取消弹窗
      needCode: false, // 是否需要填写验证码
      pageSize: 10,
      entrustTotal: 1, // 查看成交总页数
      orderNowPage: '',
      orderDetailList: []
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo',
      'outEthRate',
      'siePrice'
    ])
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
    vLoading: resolve => require(['@/components/loading.vue'], resolve)
  },
  created () {
    this.getOrderDetail(1)
  },
  methods: {
    gotoSafe () {
      if (window.innerWidth > 1200) {
        this.$router.push('/account/safettingCenter')
      } else {
        this.$router.push('/account/myAccountPhone')
      }
    },
    // 交易类型
    tradeType (val) {
      if (val === 1) {
        return this.$t('usdOrder.text37')
      } else if (val === 2) {
        return this.$t('usdOrder.text38')
      }
    },
    // 交易状态
    tradeStatus (type) {
      if (type === 1 || type === 3) {
        return this.$t('usdOrder.text39')
      } else if (type === 2 || type === 4) {
        return this.$t('usdOrder.text40')
      } else if (type === 5 || type === 6) {
        return this.$t('usdOrder.text41')
      }
    },
    getOrderDetail (page) {
      let fmData = new FormData()
      fmData.append('pageNo', page)
      fmData.append('pageSize', this.pageSize)
      fmData.append('id', this.obj.id)
      fmData.append('type', this.obj.etype)
      let url = `${this.$api}/coinentrustRecord/entrustDetail`
      this.$http.post(url, fmData).then(res => {
        if (res.data.success) {
          this.orderDetailList = res.data.data.results
          this.entrustTotal = res.data.data.totalPage
        }
      })
    },
    // 取消订单按钮弹窗
    btnCancel () {
      this.payPassword = ''
      this.payCode = ''
      if (this.userInfo.openTradePassword !== 2) {
        this.setSafeVerific = true
      } else if (this.userInfo.openGoogleCode !== 2) {
        this.setSafeVerific = true
      } else {
        // 有谷歌
        if (this.userInfo.openGoogleCode === 2) {
          this.isgogoleDuanxin = false
          this.codeType = '2'
          this.showCancleDialog = true
          // 如果只有短信
        }
        // else if (this.userInfo.openMobileCode === 2 && this.userInfo.openGoogleCode !== 2) {
        //   this.isgogoleDuanxin = true
        //   this.codeType = '1'
        //   // 都开通用谷歌
        // }
      }
    },
    // 确定取消订单
    confirmCancle () {
      this.showCancleDialog = false
      this.confirmPay()
    },
    // 支付确定按钮
    confirmPay () {
      this.errinMsgText = ''
      this.showCancleDialog = false
      if (this.needCode) {
        if (this.payPassword === '') {
          this.payFailTip = this.$t('dialog.text2')
          return false
        } else if (this.payCode === '') {
          this.payFailTip = this.$t('dialog.text11')
          return false
        }
      }
      let fmData = new FormData()
      fmData.append('id', this.obj.id)
      if (this.needCode) {
        fmData.append('tradePwd', this.payPassword)
        fmData.append('code', this.payCode)
      } else {
        fmData.append('tradePwd', 'unlock')
        fmData.append('code', 'unlock')
      }
      let ajaxLang1 = ''
      if (localStorage.getItem('kleinLang') === 'EN') {
        ajaxLang1 = 'en'
      }
      this.$http.post(`${this.$api}/coinentrustRecord/cancelRecord`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
        if (res.data.success) {
          this.noBindPhoneShow = false
          this.payPopupShow = false
          this.confirmShow = true
          this.isSuccess = true
          this.obj.state = 5
        } else {
          if (res.data.msg === 'need_code') {
            if (this.userInfo.openGoogleCode !== 2) {
              this.needCode = false
              this.payPopupShow = false
            } else {
              this.needCode = true
              this.payPopupShow = true
            }
          } else {
            this.errinMsgText = res.data.msg
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = false
          }
        }
      }).catch(err => {
        console.log(err)
        this.confirmShow = true
        this.isSuccess = false
        this.errinMsgText = this.$t('dialog.text12')
      })
    },
    // 发送短信按钮
    getCode () {
      if (this.sendBtnValue === this.$t('dialog.text10')) {
        this.countDown()
        let formData = new FormData()
        formData.append('json', JSON.stringify({'type': 'code'}))
        this.isDisabled = true
        let ajaxLang2 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang2 = 'en'
        }
        this.$http.post(this.$api + '/user/sendSmsCode', formData, {headers: {'secret-language': ajaxLang2}}).then(res => {
          if (res.data.success) {
            this.payFailTip = ''
          } else {
            if (res.data.msg) {
              this.payFailTip = res.data.msg
              this.isDisabled = false
              this.sendBtnValue = this.$t('dialog.text10')
              this.sendBtnTimes = 60
              clearTimeout(this.timer)
            } else {
              this.payFailTip = this.$t('dialog.text13')
              this.sendBtnValue = this.$t('dialog.text10')
              this.sendBtnTimes = 60
            }
          }
        }).catch(err => {
          console.log(err)
          this.isDisabled = false
          clearTimeout(this.timer)
          this.sendBtnValue = this.$t('dialog.text10')
          this.sendBtnTimes = 60
          this.payFailTip = this.$t('dialog.text13')
        })
      }
    },
    // 短信倒计时
    countDown () {
      if (this.sendBtnValue === 0) {
        this.sendBtnValue = this.$t('dialog.text10')
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
    // 关闭图标
    closeIcon () {
      this.payPopupShow = false
      this.payFailTip = ''
      this.setSafeVerific = false
      this.confirmShow = false
    },
    // 支付成功按钮
    successPay () {
      this.payPassword = ''
      this.payCode = ''
      this.payFailTip = ''
      this.confirmShow = false
    },
    // 支付失败按钮
    failedDialog () {
      this.payPassword = ''
      this.payCode = ''
      this.payFailTip = ''
      this.confirmShow = false
    },
    rechargeTurnPage (page) {
      this.orderNowPage = page
      this.getOrderDetail(page)
    },
    toDetail () {
      this.$router.push({
        path: '/account/sieOrder/turnoverDetail',
        query: {
          obj: JSON.stringify(this.obj),
          type: 1
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tips
  color #e60000
  margin-top: 20px
  text-align: center
.sieOrderDetail
  .pc-content
    margin-left 92px
    margin-right 20px
    max-width 1070px
    .property-title,.order-title
      margin-bottom 60px
      h6
        background-color #edeff1;
        height: 64px;
        font-size:20px;
        color: #181818;
        align-items: center;
        display: flex;
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
    .order-progress
      margin-bottom 60px
      h6
        margin-bottom 30px
        font-size:20px;
        color: #181818;
      p
        font-size:24px;
        color: #181818;
    .btn-box
      margin-top 80px
      width 100%
      margin-bottom 80px
      .cancel-btn
        width 100%
        height 68px
        line-height 68px
        border-radius 4px
        background-color #FC534C
        color #fff
        font-size 20px
        text-align center
        user-select none
        cursor pointer
    //移动端样式
  .mobile
    .mobile-content
      padding 0 20px
      .order-progress
        h6
          font-size 14px
          color #181818
          margin-bottom 10px
        p
          font-size 18px
      .dashed-line
        height 1px
        width 100%
        background-image: url("../../../../assets/images/aiChat/dottedLine.png");
        margin-top 30px
      .mobile-box
        padding-top 30px
        padding-bottom 100px
        ul
          li
            display flex
            justify-content space-between
            align-items center
            padding 0 10px
            height 50px
            font-size 14px
            color #181818
            &:nth-child(odd)
                background-color #edeff1
            &:nth-child(even)
              background-color #fafafa
    .btn-box
      width 100%
      height 100%
      position relative
      .cancel-btn
        font-weight bold
        font-size 18px
        color #fff
        line-height 50px
        text-align center
        display inline-block
        position fixed
        bottom 0
        width 100%
        height 50px
        background  #fc534c
  .myPopup
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
    position fixed
    left 0
    top 0
    background-color rgba(0,0,0,0.5)
    z-index 99
    .myPopup-tip
      width 560px
      text-align center
      background-color #fff
      padding 60px 40px
      border-radius 12px
      position relative
      @media screen and (max-width: 768px) {
        width: 70%;
      }
      .close
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        z-index: 999;
        cursor: pointer;
        user-select none
        @media screen and (max-width: 768px) {
          display inline-block
          width 13px
          height 7px
          position: absolute;
          top: 20px;
          right: 30px;
        }
    .qrCode-p
      margin-bottom 50px
      font-size 22px
      color #181818
      @media screen and (max-width: 768px) {
        font-size 16px
        margin-bottom 30px
      }
    .secret-btn
      display block
      width 100%
      height 68px
      background-color #ff4a4a
      color #fff
      border-radius 4px
      font-size 20px
      outline none
      border none
      user-select none
      cursor pointer
      @media screen and (max-width: 768px) {
        font-size 16px
        height 48px
      }
      &:active
        opacity .6
  /*交易所弹出窗*/
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
    font-size: 24px
    text-align: center
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
      width: 15px;
      height: 15px;
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
      margin-bottom: 20px;
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
    &.mobile-btn
      @media screen and (max-width: 1200px)
        display block
      @media screen and (min-width: 1200px)
        display none
    &.pc-btn
      @media screen and (max-width: 1200px)
        display none
      @media screen and (min-width: 1200px)
        display block
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
  .tradingCenter-input {
    display: block;
    border-radius: 4px;
    padding: 0 30px;
    box-sizing border-box
    background-color: transparent;
    outline: none;
    border 1px solid #232044
    font-size: 16px;
    color #666666
  }
  @media screen and (max-width: 680px) {
    .tradingCenter-input {
      height: 40px;
      font-size: 12px!important;
    }
  }
  .tradingCenter-input::-webkit-input-placeholder {
    color #666666
    text-align: center;
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
.turnover-detail
  margin-top 100px
  h6
    background-color #edeff1;
    height: 64px;
    font-size:20px;
    color: #181818;
    align-items: center;
    display: flex;
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
.commonTableList
  width 100%
  padding 0
  margin-left 0
  padding-bottom 200px
</style>
