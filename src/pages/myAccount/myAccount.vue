<template>
  <div class="myAccount">
    <div class="myAccountPC">
      <ul class="balanceBox">
        <li>
          <h4>{{$t('myAccount.text8')}}：</h4>
          <p>{{$fourNumber2(userBalanceUSD)}} <i>USD</i></p>
        </li>
        <li>
          <h4>{{$t('myAccount.text9')}}：</h4>
          <p>{{$fourNumber2(userBalanceSIE)}} <i>SIE</i></p>
        </li>
        <li>
          <h4>ETH {{$t('newAdd.text1')}}：</h4>
          <p>{{userBalanceETH | eightNumber}} <i>ETH</i></p>
        </li>
        <li>
          <h4>BTC {{$t('newAdd.text1')}}：</h4>
          <p>{{userBalanceBTC | eightNumber}} <i>BTC</i></p>
        </li>
      </ul>
      <ul class="myAccountPC-list">
        <li>
          <div class="li-lf">
            <h4>{{$t('sieMoney.text13')}}</h4>
            <p class="fs28">{{freezeAmountSum | fourNumber}} SIE</p>
          </div>
        </li>
        <li>
          <div class="li-lf">
            <h4>{{$t('myAccount.text10')}}</h4>
            <p id="userAddress">{{userInfo.address}}</p>
          </div>
          <div class="li-rt">
            <a ref="addressCopy1" @click="copyAddress(1)" data-clipboard-action="copy" data-clipboard-target="#userAddress"></a>
            <a class="adress-btn" @click="showQrPopup(1)"></a>
          </div>
        </li>
        <li>
          <div class="li-lf">
            <h4>{{$t('myAccount.text11')}}</h4>
            <p id="ytfAddress">{{userInfo.systemAddress}}</p>
          </div>
          <div class="li-rt">
            <a ref="addressCopy2" @click="copyAddress(2)" data-clipboard-action="copy" data-clipboard-target="#ytfAddress"></a>
            <a class="adress-btn" @click="showQrPopup(2)"></a>
          </div>
        </li>
        <li>
          <div class="li-lf">
            <h4>{{$t('newAdd.text12')}}</h4>
            <p id="btcAddress">{{btcAddress}}</p>
          </div>
          <div class="li-rt">
            <a ref="addressCopy6" @click="copyAddress(5)" data-clipboard-action="copy" data-clipboard-target="#btcAddress"></a>
            <a class="adress-btn" @click="showQrPopup(5)"></a>
          </div>
        </li>
        <li>
          <div class="li-lf">
            <h4>{{$t('myAccount.text12')}}</h4>
            <p class="fs28">{{myGameRewardSum}} SIE</p>
          </div>
        </li>
        <li>
          <div class="li-lf">
            <h4>{{$t('myAccount.text13')}}</h4>
            <p class="fs28">{{myGameRewardUsdSum}} USD</p>
          </div>
        </li>
        <!--sssss-->
        <li v-if="userInfo.isboss === 1" @click="$router.push('/account/notOpenShareOrder')" class="pointer">
          <div class="li-lf dre-Sharer">
            <h2>{{$t('myAccount.title')}}</h2>
            <p class="ktFo">{{textNoBoss}}</p>
          </div>
        </li>
        <li v-if="userInfo.isboss === 2">
          <div class="li-lf dre-Sharer">
            <h2>{{$t('myAccount.title')}}</h2>
            <p class="fs28">{{textBoss}}</p>
          </div>
        </li>
        <li v-show="activityRoundShow">
          <div class="li-lf">
            <h4>{{$t('myAccount.text14')}}：</h4>
            <p class="fs22">{{$t('myAccount.text15')}} <i>{{roundName}}</i> {{$t('myAccount.text16')}}</p>
          </div>
          <div class="li-rt">
            <p>{{$t('myAccount.text17')}}：</p>
            <p class="endTime">{{changTIme(endTime)}}</p>
          </div>
        </li>
        <!-- 当前参与活动-->
        <li class="liTopBt" v-show="activityLottoRoundShow">
          <p class="li-top">{{$t('myAccount.text14')}}</p>
          <div class="serialEat">
            <p class="fs22">{{$t('myAccount.text18')}} <i>{{roundSerialName}}</i> {{$t('myAccount.text16')}}</p>
            <router-link to="/serialEat">{{$t('myAccount.text19')}} <i></i></router-link>
          </div>
        </li>
      </ul>
    </div>
    <div class="myAccountPH">
      <router-link tag="div" to="/account/myAccountPhone" class="myAccountPH-top" @click="goAccountMg()">
        <div class="userImg">
          <img :src="(userInfo.imgUrl)" alt="">
        </div>
        <div class="userName">
          <h4>{{userInfo.nickName}}</h4>
          <p>{{userInfo.address}}</p>
        </div>
        <div class="li-rt">
          <i class="arrowIcon-img"></i>
        </div>
      </router-link>
      <ul class="myAccountPH-list">
        <router-link to="/account/AssetManagement" tag="li">
          <div class="li-lf">
            <p>{{$t('newAdd.text2')}}</p>
          </div>
          <div class="li-rt">
            <i class="arrowIcon"></i>
          </div>
        </router-link>
        <!--  notOpenShareOrder/shareOrder 已开通-->
        <router-link to="/account/notOpenShareOrder/shareOrder" tag="li"  v-if="userInfo.isboss === 2">
          <div class="li-lf">
            <p>{{$t('myAccount.text21')}}</p>
          </div>
          <div class="li-rt">
            <span>{{numTotal + otherNumTotal}}</span>
            <i class="arrowIcon"></i>
          </div>
        </router-link>
        <!--<router-link to="notOpenShareOrder/shareOrder" tag="li">-->
          <!--<div class="li-lf">-->
            <!--<p>{{$t('myAccount.text21')}}</p>-->
          <!--</div>-->
          <!--<div class="li-rt">-->
            <!--<span>{{pendingNum}}</span>-->
            <!--<i class="arrowIcon"></i>-->
          <!--</div>-->
        <!--</router-link>-->
        <router-link to="/account/transferRecord/transferRecords" tag="li">
          <div class="li-lf">
            <p>{{$t('sieMoney.text3')}}</p>
          </div>
          <div class="li-rt">
            <i class="arrowIcon"></i>
          </div>
        </router-link>
        <router-link to="/account/exchanges" tag="li">
          <div class="li-lf">
            <p>{{$t('exchanges.text21')}}</p>
          </div>
          <div class="li-rt">
            <i class="arrowIcon"></i>
          </div>
        </router-link>
        <router-link to="/account/myDon" tag="li">
          <div class="li-lf">
            <p>{{$t('myAccount.text22')}}</p>
          </div>
          <div class="li-rt">
            <i class="arrowIcon"></i>
          </div>
        </router-link>
      <!--  <li>
          <div class="li-lf">
            <p>代聊功能</p>
          </div>
          <div class="li-rt">
            <i class="arrowIcon"></i>
          </div>
        </li>-->
        <router-link to="/account/orderManage" tag="li">
          <div class="li-lf">
            <p>{{$t('myAccount.text23')}}</p>
          </div>
          <div class="li-rt">
            <i class="arrowIcon"></i>
          </div>
        </router-link>
        <router-link to="/account/award" tag="li">
          <div class="li-lf">
            <p>{{$t('myAccount.text24')}}</p>
          </div>
          <div class="li-rt">
            <i class="arrowIcon"></i>
          </div>
        </router-link>
        <!--<router-link to="/account/InvitedRecord" tag="li">-->
          <!--<div class="li-lf">-->
            <!--<p>123456789{{$t('invitedRecord.text5')}}</p>-->
          <!--</div>-->
          <!--<div class="li-rt">-->
            <!--<i class="arrowIcon"></i>-->
          <!--</div>-->
        <!--</router-link>-->
        <li class="li-activity">
          <h3><i></i>{{$t('myAccount.text14')}}</h3>
          <div class="li-activity-bt">
            <div class="activity-item">
              <span>{{$t('myAccount.text15')}} {{roundName}} {{$t('myAccount.text16')}}</span>
              <a>{{$t('myAccount.text25')}} <i>{{hour}}:{{min}}:{{sce}}</i></a>
            </div>
            <!-- 查看活动详情-->
            <div class="activity-item">
              <span>{{$t('myAccount.text18')}} {{roundSerialName}} {{$t('myAccount.text16')}}</span>
              <router-link to="/serialEat" tag="span"><i style="color: #039">{{$t('myAccount.text19')}}</i></router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <transition name="adress-fade">
      <div class="adressPopup" v-show="adressQrCodeFlag">
        <div class="adressPopup-box">
          <a class="closeBtn" @click="closeQrPopup()"><i></i></a>
          <!--Secret内部交易地址-->
          <h3 v-show="adressQrCodeNum === 1">{{$t('myAccount.text10')}}</h3>
          <!--以太坊交易地址-->
          <h3 v-show="adressQrCodeNum === 2">{{$t('myAccount.text11')}}</h3>
          <!-- btc交易地址 -->
          <h3 v-show="adressQrCodeNum === 3">{{$t('myAccount.text32')}}</h3>
          <div class="qrCodeBox" id="qrCodeBox"></div>
          <p class="address" v-show="adressQrCodeNum === 1" id="userAddress2">{{userInfo.address}}</p>
          <p class="address" v-show="adressQrCodeNum === 2" id="ytfAddress2">{{userInfo.systemAddress}}</p>
          <p class="address" v-show="adressQrCodeNum === 3" id="btcAddress2">{{btcAddress}}</p>
          <button class="copyBtn" v-show="adressQrCodeNum === 1" ref="addressCopy3" @click="popupCopyAddress(1)" data-clipboard-action="copy" data-clipboard-target="#userAddress2">{{$t('myAccount.text28')}}</button>
          <button class="copyBtn" v-show="adressQrCodeNum === 2" ref="addressCopy4" @click="popupCopyAddress(2)" data-clipboard-action="copy" data-clipboard-target="#ytfAddress2">{{$t('myAccount.text28')}}</button>
          <button class="copyBtn" v-show="adressQrCodeNum === 3" ref="addressCopy5" @click="popupCopyAddress(3)" data-clipboard-action="copy" data-clipboard-target="#btcAddress2">{{$t('myAccount.text28')}}</button>
        </div>
      </div>
    </transition>
    <transition name="adress-fade">
      <div class="adressPopup" v-show="copyShow">
        <div class="adressPopup-box adressPopup-copy">
          <a class="closeBtn" @click="copyShow = false"><img src="../../assets/images/sieMoney/close.svg" alt=""></a>
          <h3>{{$t('myAccount.text29')}}</h3>
          <button class="copyBtn" @click="copyShow = false">{{$t('exchange.text29')}}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pointer
  cursor pointer
.arrowIcon-img
  display block
  width: 6px;
  height: 9px;
  background url("../../assets/images/myAccount/right-row.png") no-repeat
  background-size: cover;
.myAccount
  .myAccountPC
    padding-top: 90px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom 90px
    box-sizing: content-box;
    max-width 1170px
    @media screen and (max-width 1200px)
      display none
    .balanceBox
      padding-bottom 50px
      border-bottom 1px dashed #FC534C
      overflow hidden
      font-size 28px
      color #181818
      li
        width 50%
        float left
        margin-bottom 40px
        h4
          font-weight bold
        p
          margin-top 20px
          font-size 25px
          @media screen and (max-width 1400px)
            font-size 30px
          i
            color #dbe3ea
    .myAccountPC-list
      padding-top 50px
      li
        display flex
        justify-content space-between
        align-items center
        font-size 20px
        color #181818
        background-color #fafbfc
        border 1px solid #d9d9d9
        margin-bottom 30px
        padding 44px 80px 44px 60px
        border-radius 4px
        .dre-Sharer
          width 100%
          display flex
          align-items center
          justify-content space-between
          h2
            flex 1
            font-size 20px
            color #605f5f
          .fs28
            font-size 20px
            color #0ac88a
          .ktFo
            font-size 20px
            color #FC534C
        .fs28
          font-size 28px
        .fs22
          font-size 22px
          i
            font-size 28px
            color #FC534C
        .li-lf
          h4
            margin-bottom 20px
            color #605f5f
        .li-rt
          font-size 0
          a
            display inline-block
            width 32px
            height 32px
            background-size cover!important
            cursor pointer
            user-select none
            background-image: url("../../assets/images/sieMoney/copy.svg")
            &:first-child
              margin-right 50px
            &.adress-btn
              background-image: url("../../assets/images/sieMoney/qr.svg")
            &:active
              opacity .6
          p
            font-size 20px
            margin-bottom 20px
            &.endTime
              font-size 28px
              color #FC534C
              margin-bottom 0
        &.liTopBt
          display block
          p.li-top
            color #605f5f
            margin-bottom 20px
          .serialEat
            display flex
            align-items center
            justify-content space-between
            a
              display flex
              align-items center
              user-select none
              cursor pointer
              color #FC534C
              &:active
                opacity .6
              i
                display inline-block
                width: 8px;
                height: 12px;
                background url("../../assets/images/myAccount/right-row.png") no-repeat
                background-size: cover;
                margin-left: 10px;
  .myAccountPH
    display none
    padding 0 20px
    padding-top 50px
    @media screen and (max-width 1200px)
      display block
    .myAccountPH-top
      padding 30px 15px 30px 0
      display flex
      align-items center
      color #181818
      .userImg
        width 50px
        height 50px
        //background url("../../assets/images/myAccount/userImg.png") no-repeat
        //background-size cover
        margin-right 20px
        border-radius 4px
        overflow hidden
        @media screen and (max-width 320px)
          margin-right 0
        img
          display block
          width 100%
          height 100%
      .userName
        flex 1
        overflow: hidden
        padding: 0 10px
        h4
          font-weight bold
          font-size 14px
          margin-bottom 5px
        p
          font-size 12px
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
    .myAccountPH-list
      font-size 12px
      color #181818
      li
        display flex
        align-items center
        justify-content space-between
        padding 15px
        background-color #f0f2f5
        border-radius 3px
        margin-bottom 10px
        .li-lf
          h3
            font-size 12px
            margin-bottom 5px
            color #999999
        .li-rt
          span
            color #003399
            margin-right 2px
          .arrowIcon
            display inline-block
            width: 6px;
            height: 9px;
            background url("../../assets/images/myAccount/right-row.png") no-repeat
            background-size: cover;
        &.li-activity
          display block
          padding 0
          overflow hidden
          h3
            height 35px
            display flex
            align-items center
            font-size 14px
            background-color #e6e8eb
            i
              display block
              width 5px
              height 10px
              background-color #032e43
              margin-right 10px
          .li-activity-bt
            padding 15px
            .activity-item
              display flex
              justify-content space-between
              margin-bottom 10px
              i
                color #181818
              a
                color #181818
                i
                  color #003399
              &:last-child
                margin-bottom 0
                a
                  color #003399
.adressPopup
    width: 100%
    height: 100%
    position: fixed
    left: 0
    top: 0
    z-index: 999
    background-color: rgba(11,27,48, .6)
    opacity: 1
    display flex
    align-items center
    justify-content center
    transition opacity .3s linear
    color #181818
    &.adress-fade-enter-active,&.adress-fade-leave-active
      transition opacity .3s linear
    &.adress-fade-enter,&.adress-fade-leave-to
      opacity: 0
    .adressPopup-box
      position: relative
      width: 560px
      padding: 80px 40px 60px 40px
      border-radius 8px
      box-shadow 0 0 5px #d7d9db
      background-color: #fff
      text-align center
      .closeBtn
        display block
        position absolute
        top 20px
        right 20px
        padding 10px
        cursor pointer
        user-select none
        &:active
          opacity .6
        i
          display block
          width: 24px
          height: 24px
          background: url("../../assets/images/myAccount/myDon/delete.svg") no-repeat center / cover
      h3
        font-size 22px
        margin-bottom 80px
      &.adressPopup-copy
        h3
          margin-bottom 50px
      .qrCodeBox
        display flex
        align-items center
        justify-content center
        width 238px
        height 238px
        margin 0 auto
        background-color #fff
      .address
        font-size 22px
        margin-top 50px
        margin-bottom 60px
        word-break break-all
      .copyBtn
        width 100%
        height 68px
        background-color #fc534c
        color #fff
        outline none
        border none
        cursor pointer
        user-select none
        border-radius 4px
        box-shadow 0 5px 10px #d7d9db
        font-size 16px
        &:active
          opacity .6
</style>

<script>
/* eslint-disable */
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'
import '../../assets/js/jquery.qrcode.min'
export default{
  data () {
    return {
      copyBtn1: null,
      copyBtn2: null,
      copyBtn3: null,
      copyBtn4: null,
      copyBtn5: null,
      copyBtn6: null,
      copyShow: false,
      btcTransfer: '',
      activityRoundShow: true, // 参加吃饼活动时显示
      activityLottoRoundShow: true, // 参加连续吃饼活动时显示
      adressQrCodeFlag: false, // 二维码弹窗
      adressQrCodeNum: 1, // 1,Secret内部交易地址, 2,以太坊交易地址
      roundName: '', // 获取当前参加吃饼活动的期数
      roundSerialName: '', // 获取当前参加连环吃饼活动的期数
      hour: '',
      min: '',
      sce: '',
      endTime: '', // 结束时间戳
      restTime: '', // 还剩活动结束时间戳
      timer: '', // 清除定时器
      pendingNum: '', // 共享交易待提现充值条数
      numTotal:'',
      otherNumTotal: '',
      textBoss: this.$t('myAccount.textBoss'),
      textisBoss: this.$t('myAccount.textBoss'),
      textNoBoss: this.$t('myAccount.textNoBoss'),
      textShow: true,
      textKtShow: false,
      alltime: '',
      btcAddress: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userBalanceUSD',
      'myGameRewardSum',
      'myGameRewardUsdSum',
      'activityRound',
      'activityLottoRound',
      'userBalanceSIE',
      'userBalanceETH',
      'userBalanceBTC',
      'freezeAmountSum'
    ])
  },
  created () {
    this.getEatBread()
    this.getSerialBread()
    this.getBossOrder()
    this.getOtherOrder()
    this.getBtcTransfer()
  },
  mounted () {
    this.$nextTick(() => {
      // this.$store.dispatch('balanceAction') // 登录成功后获取用户信息
      this.copyBtn1 = new this.Clipboard(this.$refs.addressCopy1)
      this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2) // 复制
      this.copyBtn3 = new this.Clipboard(this.$refs.addressCopy3) // 复制
      this.copyBtn4 = new this.Clipboard(this.$refs.addressCopy4) // 复制
      this.copyBtn5 = new this.Clipboard(this.$refs.addressCopy5) // 复制
      this.copyBtn6 = new this.Clipboard(this.$refs.addressCopy6) // 复制
      this.pending()
      this.sharer() // 判断是否开通老板
      this.alltime = setInterval(() => {
          // console.log('shuaxinle')
        this.getEatBread()
        this.getSerialBread()
        this.getBossOrder()
        this.getOtherOrder()
        this.balanceAction() // 用户信息
      }, 15000)
    })
  },
  beforeDestroy () {
    clearInterval(this.alltime)
    clearTimeout(this.timer)
  },
  methods: {
    ...mapActions([
      'balanceAction'
    ]),
    getBtcTransfer() {
      this.$http.post(`${this.$api}/user/getBtcAddress`).then((res) => {
        if (res.data.success === true) {
          this.btcAddress = res.data.data
        }
      })
    },
    sharer () {
      if (this.userInfo.isboss === 2) { // 已经开通
        this.textBoss = this.textisBoss
      }
      if (this.userInfo.isboss === 1) { // 未开通
        this.textBoss = this.textNoBoss
        this.textShow = false
        this.textKtShow = true
      }
    },
    postRequest (url, params) {
      return this.$http({
        method: 'post',
        url: `${this.$api}${url}`,
        data: params,
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            if (data.hasOwnProperty(it) === true) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    getBossOrder () {
    this.postRequest('/boss/queryBossOrders', {
      type: 1,
      queryType: 1,
      page: 1,
      pagesize: '10'
    }).then(res => {
      if (res.data.success === true) {
        this.numTotal = res.data.mapData.countdoing
        // console.log(res.data.mapData)
      }
    }).catch(err => {
      console.log(err)
    })
  },
    getOtherOrder () {
      this.postRequest('/boss/queryBossOrders', {
        type: 2,
        queryType: 1,
        page: 1,
        pagesize: '10'
      }).then(res => {
        if (res.data.success === true) {
          this.otherNumTotal = res.data.mapData.countdoing
          // console.log(res.data.mapData)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    pending () {
        this.$http.post(`${this.$api}/deposit/queryDepositList`).then((res) => {
          if (res.data.success === true) {
            this.pendingNum = res.data.mapData.count
          }
        })
    },
    changTIme (time) {
      if (!this.roundName && !this.endTime) {
        this.activityRoundShow = false  // 没参加吃饼活动时影藏
      } else {
        this.activityRoundShow = true
        return this.$changeDate(time, ':', 7)
      }
    },
    checkTime (i) {
      if (Number(i) < 10) {
        i = '0' + i
      }
      return i
    },
    commonChangeTime (TimeStamp) { // 将时间戳分割成时分秒
      if (TimeStamp <= 0) {
       this.hour = '00';
       this.min = '00';
       this.sce = '00'
      } else {
        let hour = parseInt(TimeStamp / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
        let min = parseInt(TimeStamp / 1000 / 60 % 60, 10) // 计算剩余的分钟
        let sce = parseInt(TimeStamp / 1000 % 60, 10) // 计算剩余的秒数
        this.hour = this.checkTime(hour)
        this.min = this.checkTime(min)
        this.sce = this.checkTime(sce)
      }
    },
    getEatBread () { // 获取吃饼活动相关信息
      this.$http.post(`${this.$api}/danRobot/danRewardDetail?pageIndex=1&pageSize=10`).then((res) => {
        if (res.data.success === true) {
          let rewardRound = res.data.data.rewardRound
          this.roundName = rewardRound.roundName
          this.endTime = rewardRound.endAt // 获取活动结束时间戳
          // console.log(this.endTime)
          this.count()
        }
      })
    },
    count() { // 倒计时
      let nowTime = Date.parse(new Date()) // 获取当前时间戳
      // console.log(nowTime)
      if (this.endTime - nowTime >= 0) {
          this.timer = setTimeout(() => {
          this.restTime = this.endTime - nowTime
          this.restTime--
          this.count()
        }, 1000)
        this.commonChangeTime(this.restTime)
      }  else {
        this.hour = '00';
        this.min = '00';
        this.sce = '00'
        clearTimeout(this.timer)
      }
    },
    getSerialBread () {
      this.$http.post(`${this.$api}/lottoReward/lottoRewardDetail`).then((res) => {
        if (res.data.success === true) {
          let rewardRound = res.data.data.rewardRound // rewardRound活动内容对象
          this.roundSerialName = rewardRound.roundName
        }
      })
    },
    copyAddress (num) {
      if (num === 1) {
        let clipboard = this.copyBtn1
        clipboard.on('success', () => {
          // alert('复制成功')
          this.copyShow = true
          clipboard.destroy()
          this.copyBtn1 = new this.Clipboard(this.$refs.addressCopy1) // 复制
        })
      } else if (num === 2) {
        let clipboard = this.copyBtn2
        clipboard.on('success', () => {
          // alert('复制成功')
          this.copyShow = true
          clipboard.destroy()
          this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2) // 复制
        })
      } else if (num === 5) {
        let clipboard = this.copyBtn6
        clipboard.on('success', () => {
          // alert('复制成功')
          this.copyShow = true
          clipboard.destroy()
          this.copyBtn6 = new this.Clipboard(this.$refs.addressCopy6) // 复制
        })
      }
    },
    popupCopyAddress (num) { // 弹窗复制地址
      this.closeQrPopup()
      if (num === 1) {
        let clipboard = this.copyBtn3
        clipboard.on('success', () => {
          // alert('复制成功')
          this.copyShow = true
          clipboard.destroy()
          this.copyBtn3 = new this.Clipboard(this.$refs.addressCopy3) // 复制
        })
      } else if (num === 2) {
        let clipboard = this.copyBtn4
        clipboard.on('success', () => {
          // alert('复制成功')
          this.copyShow = true
          clipboard.destroy()
          this.copyBtn4 = new this.Clipboard(this.$refs.addressCopy4) // 复制
        })
      }
    },
    closeQrPopup () { // 关闭二维码
      this.adressQrCodeFlag = false
      $('#qrCodeBox').html('')
    },
    showQrPopup (val) { // 显示二维码
      this.adressQrCodeFlag = true
      let downloadUrl
      if (val === 1) {
        if (this.userInfo.address !== '') {
          this.adressQrCodeNum = 1
          // 绘制二维码
          downloadUrl = this.$utf16to8(this.userInfo.address)
        }
      } else if (val === 2) {
        if (this.userInfo.systemAddress !== '') {
          this.adressQrCodeNum = 2
          // 绘制二维码
          downloadUrl = this.$utf16to8(this.userInfo.systemAddress)
        }
      } else if (val === 5) {
        if (this.btcAddress !== '') {
          this.adressQrCodeNum = 3
          // 绘制二维码
          downloadUrl = this.$utf16to8(this.btcAddress)
        }
      }
      $('#qrCodeBox').qrcode({
        render: 'canvas', //     table方式
        width: 228, //            宽度
        height: 228, //            高度
        text: downloadUrl //      任意内容
      })
    }
  }
}
</script>
