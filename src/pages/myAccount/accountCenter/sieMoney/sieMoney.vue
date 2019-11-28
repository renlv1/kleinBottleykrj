<template>
  <div class="sieMoney">
    <div class="pc">
      <div class="pc-content">
        <div class="property-title">
          <h6>SIE{{$t('sieMoney.text1')}}</h6>
        </div>
        <ul class="property-list">
          <li class="first-li">
            <div class="li-left">
              <h5>SIE{{$t('sieMoney.text2')}}:</h5>
              <p>{{userBalanceSIE | fourNumber}} <i>SIE</i></p>
            </div>
            <div class="li-right">
              <router-link class="transfer" to="/account/transfer">{{$t('sieMoney.text3')}}</router-link>
            </div>
          </li>
          <li>
            <div class="li-left">
              <h5>secret{{$t('sieMoney.text4')}}:</h5>
              <span id="userAddress">{{userInfo.address}}</span>
            </div>
            <div class="li-right">
              <a class="copy-btn " ref="addressCopy1" @click="copyAddress(1)" data-clipboard-action="copy" data-clipboard-target="#userAddress"></a>
              <a class="copy-btn  adress-btn" @click="showQrPopup(1)"></a>
            </div>
          </li>
          <li>
            <div class="li-left">
              <h5>{{$t('sieMoney.text5')}}:</h5>
              <span id="ytfAddress">{{userInfo.systemAddress}}</span>
            </div>
            <div class="li-right">
              <a class="copy-btn " @click="copyAddress(2)" ref="addressCopy2"   data-clipboard-action="copy" data-clipboard-target="#ytfAddress"></a>
              <a class="copy-btn  adress-btn" @click="showQrPopup(2)"></a>
            </div>
          </li>
        </ul>
        <div class="myPopup" v-show="qrPopupShow">
          <div class="myPopup-tip">
            <a class="close" @click="closeQrPopup"><img src="../../../../assets/images/sieMoney/close.svg" alt=""></a>
            <p class="qrCode-p">{{$t('sieMoney.text6')}}</p>
            <div id="qrcodeBox"></div>
            <button class="secret-btn" @click="closeQrPopup()">{{$t('sieMoney.text7')}}</button>
          </div>
        </div>
        <div class="myPopup" v-show="copyShow">
          <div class="myPopup-tip">
            <a class="close" @click="closeQrPopup"><img src="../../../../assets/images/sieMoney/close.svg" alt=""></a>
            <p class="qrCode-p">{{$t('sieMoney.text8')}}</p>
            <button class="secret-btn" @click="closeQrPopup()">{{$t('sieMoney.text7')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="management-head">
        <div class="head">
          <div class="back" @click="$router.push('/account/AssetManagement')"></div>
          <div class="title">SIE {{$t('sieMoney.text1')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="management-content">
        <div class="user-property">
          <div class="property-title">SIE {{$t('sieMoney.text12')}} :</div>
          <div class="property">
            <span>{{userBalanceSIE | fourNumber}}</span> <i>SIE</i>
          </div>
        </div>
        <div class="user-property">
          <div class="property-title">{{$t('sieMoney.text13')}}</div>
          <div class="property">
            <span>{{freezeAmountSum | fourNumber}}</span> <i>SIE</i>
          </div>
        </div>
        <div class="user-information">
          <ul class="user-list">
            <!-- 交易订单记录-->
            <li @click="$router.push('/account/transferRecord')">
              <div class="record">SIE {{$t('sieMoney.text11')}}</div>
              <div class="right-icon"><img src="../../../../assets/images/sieMoney/right.png"></div>
            </li>
            <li @click="$router.push('/account/sieOrder')">
              <div class="record">SIE {{$t('sieMoney.text10')}}</div>
              <div class="right-icon"><img src="../../../../assets/images/sieMoney/right.png"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-wrapper">
        <span class="btn"  @click="$router.push('/account/transfer')">{{$t('sieMoney.text3')}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import $ from 'jquery'
import { mapGetters } from 'vuex'
import '../../../../assets/js/jquery.qrcode.min'
export default {
  data () {
    return {
      copyBtn1: null,
      copyBtn2: null,
      qrPopupShow: false,
      copyShow: false
    }
  },
  mounted () {
    this.copyBtn1 = new this.Clipboard(this.$refs.addressCopy1)
    this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2) // 复制
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo',
      'freezeAmountSum',
      'userBalanceSIE'
    ])
  },
  methods: {
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
      }
    },
    closeQrPopup () { // 关闭二维码
      this.qrPopupShow = false
      $('#qrcodeBox').html('')
      this.copyShow = false
    },
    showQrPopup (val) { // 显示二维码
      this.qrPopupShow = true
      let downloadUrl
      if (val === 1) {
        if (this.userInfo.address !== '') {
          // 绘制二维码
          downloadUrl = this.$utf16to8(this.userInfo.address)
        }
      } else if (val === 2) {
        if (this.userInfo.systemAddress !== '') {
          // 绘制二维码
          downloadUrl = this.$utf16to8(this.userInfo.systemAddress)
        }
      }
      $('#qrcodeBox').qrcode({
        render: 'canvas', //     table方式
        width: 228, //            宽度
        height: 228, //            高度
        text: downloadUrl //      任意内容
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.sieMoney
  .pc
    @media screen and (max-width: 1200px) {
    display: none;
    }
    .pc-content
      margin-left 92px
      margin-right 20px
      max-width 1170px
      .property-title
        margin-bottom 60px
        h6
          background-color #edeff1;
          height: 64px;
          font-size:22px;
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
      .property-list
        li
          height 160px
          margin-bottom 30px
          padding-left 20px
          padding-right 60px
          border-radius 4px
          border 1px solid #d9d9d9
          background-color #fafbfc
          display flex
          justify-content space-between
          align-items center
          .li-left
            margin-left 40px
            h5
              font-size:20px;
              color #605f5f
              margin-bottom 30px
            p
              font-size:28px;
              color #181818
            span
              font-size:20px;
              color #181818
          .li-right
            .transfer
              display inline-block
              margin-top 30px
              font-size:22px;
              color #FC534C
            .copy-btn
              display inline-block
              width 32px
              height 32px
              background-size cover!important
              cursor pointer
              user-select none
              background-image: url("../../../../assets/images/sieMoney/copy.svg")
              &:first-child
                margin-right 50px
              &.adress-btn
                background-image: url("../../../../assets/images/sieMoney/qr.svg")
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
        #qrcodeBox
          display flex
          align-items center
          justify-content center
          width 238px
          height 238px
          margin 0 auto
          background-color #fff
          margin-bottom: 20px
        .qrCode-p
          margin-bottom 50px
          font-size 22px
          color #181818
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
          &:active
            opacity .6
  .mobile
    @media screen and (max-width: 1200px) {
      display: block;
    }
    .management-content
      padding 0 20px
      .user-property
        margin-top 30px
        height 100px
        position relative
        &:before{
          content: '';
          width: 100%;
          height: 1px;
          background-image: url("../../../../assets/images/aiChat/dottedLine.png");
          position: absolute;
          top: 100px;
        }
        .property-title
          font-size 12px
          color #181818
          margin-bottom 15px
        .property
          font-size 24px
          color #181818
          padding-bottom 30px
      .user-information
          margin-top 30px
          .user-list
            li
              display flex
              justify-content space-between
              align-items center
              padding 0 15px
              font-size 16px
              color #181818
              border-radius 4px
              height 50px
              background-color #f0f2f5
              margin-bottom 10px
    .btn-wrapper
      width 100%
      height 100%
      position relative
      .btn
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

</style>
