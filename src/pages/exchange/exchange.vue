<template>
  <div>
    <div class="exchangePc">
      <div class="linWrap">
        <h3 class="exchangePc-title">SIE/USD<i v-if="nowPrice && exchangePrice">{{nowPrice | fourNumber}}USD ≈ {{exchangePrice | fourNumber}}CNY</i></h3>
        <div class="exchangePc-top">
          <!-- K线图新增5个按钮 -->
          <div class="k-group">
            <div id="pEcharts"></div>
            <div class="btn-group">
              <span class="isClick" @click="changeK(1)" :class="{'k-active': currentIndex === 1}">15min</span>
              <span class="isClick" @click="changeK(2)" :class="{'k-active': currentIndex === 2}">30min</span>
              <span class="isClick" @click="changeK(3)" :class="{'k-active': currentIndex === 3}">1hour</span>
              <span class="isClick" @click="changeK(4)" :class="{'k-active': currentIndex === 4}">24hour</span>
              <span class="isClick" @click="changeK(5)" :class="{'k-active': currentIndex === 5}">1mon</span>
            </div>
          </div>
          <div class="priceBox">
            <div class="priceList-title">
              <span></span>
              <span>{{$t('exchange.text1')}}<br>(USD)</span>
              <span>{{$t('exchange.text2')}}<br>(SIE)</span>
              <span>{{$t('exchange.text3')}}<br>(SIE)</span>
            </div>
            <ul class="priceList">
              <!-- 卖出从7-1显示，买进从1-7条显示  -->
              <li v-for="(item, index) in nowOrderList.sell" :key="item.id">
                <span class="redColor">{{$t('exchange.text4')}}{{nowOrderList.sell.length - index}}</span>
                <span>{{item.price.toFixed(4)}}</span>
                <span>{{item.amount - item.tradeAmount | fourNumber}}</span>
                <span>{{item.amount | fourNumber}}</span>
              </li>
              <li v-for="(item, index) in nowOrderList.buy" :key="item.id">
                <span class="greenColor">{{$t('exchange.text5')}}{{index + 1}}</span>
                <span>{{item.price.toFixed(4)}}</span>
                <span>{{item.amount - item.tradeAmount | fourNumber}}</span>
                <span>{{item.amount | fourNumber}}</span>
              </li>
              <li v-if="!nowOrderList.sell.length && !nowOrderList.buy.length" class="priceList-none" style="background:none">{{$t('exchange.text6')}}</li>
            </ul>
          </div>
        </div>
        <div class="exchangePc-bt">
          <div class="exchangePc-bt-lf">
            <h3 class="order-title">
              <span class="order-title-lf"><i></i>{{$t('exchange.text7')}}</span>
              <router-link v-show="loginFlag" to="/account/sieOrder?orderTab=2" class="order-title-rt">{{$t('exchange.text8')}}<i></i></router-link>
            </h3>
            <ul class="order-list">
              <li>
                <span>{{$t('exchange.text9')}}</span>
                <span>{{$t('exchange.text10')}}</span>
                <span>{{$t('exchange.text32')}}</span>
                <span>{{$t('exchange.text11')}}</span>
              </li>
              <li v-for="item in orderList" :key="item.id">
                <span>{{item.id}}</span>
                <span>{{item.tradeCashAmount | fourNumber}}USD</span>
                <span>{{item.price | fourNumber}}USD</span>
                <span><i>{{item.tradeAmount | fourNumber}}SIE</i> / {{item.amount | fourNumber}}SIE</span>
              </li>
              <li v-if="!orderList.length" class="order-list-none">{{$t('exchange.text6')}}</li>
            </ul>
          </div>
          <div class="exchangePc-bt-rt">
            <ul class="buySellTab">
              <li :class="{activeTabGreen: buySellFlag === 1}" @click="chooseTab(1)">{{$t('exchange.text12')}}</li>
              <li :class="{activeTabRed: buySellFlag === 2}" @click="chooseTab(2)">{{$t('exchange.text21')}}</li>
            </ul>
            <!--买入-->
            <div class="buSellForm" v-if=" buySellFlag === 1">
              <div class="buySellInputBox">
                <div class="buySellInput-title">
                  <span>1.{{$t('exchange.text13')}}</span>
                </div>
                <input onpaste="return false" type="text" v-model.trim="buyPrice" :placeholder="$t('exchange.text14')" @input="checkInput('buyPrice')" @focus="buyPriceTipShow = false">
                <span class="inputTipMsg" :class="{inputTipMsgActive: buyPriceTipShow}">{{$t('exchange.text14')}}</span>
              </div>
              <div class="buySellInputBox">
                <div class="buySellInput-title">
                  <span>2.{{$t('exchange.text15')}}</span>
                  <span class="all-action" @click="allBuy">{{$t('exchange.text16')}}</span>
                </div>
                <input onpaste="return false" type="text" v-model.trim="buyNum" :placeholder="$t('exchange.text17')" @input="checkInput('buyNum')" @focus="buyNumTipShow = false">
                <span class="inputTipMsg" :class="{inputTipMsgActive: buyNumTipShow}">{{$t('exchange.text17')}}</span>
              </div>
              <div class="buySellInputBox">
                <div class="buySellInput-title">
                  <span>3.{{$t('exchange.text18')}}</span>
                  <span class="span-balance">{{$t('exchange.text19')}}：<i>{{$fourNumber2(userBalanceUSD)}} USD</i></span>
                </div>
                <input onpaste="return false" type="text" v-model.trim="orderTotal" readonly>
                <span class="inputTipMsg" :class="{inputTipMsgActive: orderTotalTipShow}">{{$t('exchange.text20')}}</span>
              </div>
              <div class="tips" style="color: #48be64; text-align: right;font-size: 14px;">
                {{$t('exchange.text46')}}
              </div>
              <button class="buySellBtn buySellBtn-green" @click="buySellFun('pc', 1)" :class="{disable: loadingConfim}">
                <div class="btn-w" v-show="loadingConfim">
                  <div class="img-box">
                      <img src="../../assets/images/aiChat/loading.gif" alt="">
                  </div>
                </div>
                <span>{{$t('exchange.text12')}}</span>
              </button>
            </div>
            <!--卖出-->
            <div class="buSellForm" v-if="buySellFlag === 2">
              <div class="buySellInputBox">
                <div class="buySellInput-title">
                  <span>1.{{$t('exchange.text13')}}</span>
                </div>
                <input onpaste="return false" type="text" v-model.trim="sellPrice" :placeholder="$t('exchange.text22')" @input="checkInput('sellPrice')" @focus="sellPriceTipShow = false">
                <span class="inputTipMsg" :class="{inputTipMsgActive: sellPriceTipShow}">{{$t('exchange.text22')}}</span>
              </div>
              <div class="buySellInputBox">
                <div class="buySellInput-title">
                  <span>2.{{$t('exchange.text23')}}</span>
                  <span class="all-action" @click="allSell">{{$t('exchange.text24')}}</span>
                </div>
                <input onpaste="return false" type="text" v-model.trim="sellNum" :placeholder="$t('exchange.text25')" @input="checkInput('sellNum')" @focus="sellNumTipShow = false">
                <span class="inputTipMsg" :class="{inputTipMsgActive: sellNumTipShow}">{{$t('exchange.text25')}}</span>
              </div>
              <div class="buySellInputBox">
                <div class="buySellInput-title">
                  <span>3.{{$t('exchange.text18')}}</span>
                  <span class="span-balance">{{$t('exchange.text26')}}：<i>{{userBalanceSIE | fourNumber}}SIE</i></span>
                </div>
                <input onpaste="return false" type="text" v-model.trim="orderTotal" readonly>
                <span class="inputTipMsg" :class="{inputTipMsgActive: orderTotalTipShow}">{{$t('exchange.text20')}}</span>
              </div>
              <div class="tips" style="color: #e60000; text-align: right;font-size: 14px;">
                {{$t('exchange.text30')}}
              </div>
              <button class="buySellBtn buySellBtn-red" @click="buySellFun('pc', 2)" :class="{disable: loadingConfim}">
                <div class="btn-w" v-show="loadingConfim">
                  <div class="img-box">
                      <img src="../../assets/images/aiChat/loading.gif" alt="">
                  </div>
                </div>
                <span>{{$t('exchange.text21')}}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--手机端-->
    <div class="exchangeMobile">
      <div class="echartsBox">
        <h3 class="echartsBox-title">SIE/USD <i v-if="nowPrice && exchangePrice">{{nowPrice | fourNumber}}USD ≈ {{exchangePrice | fourNumber}}CNY</i></h3>
        <div id="mEcharts"></div>
        <div class="btn-group">
          <span @click="changeK(1)" :class="{'k-active': currentIndex === 1}">15min</span>
          <span @click="changeK(2)" :class="{'k-active': currentIndex === 2}">30min</span>
          <span @click="changeK(3)" :class="{'k-active': currentIndex === 3}">1hour</span>
          <span @click="changeK(4)" :class="{'k-active': currentIndex === 4}">24hour</span>
          <span @click="changeK(5)" :class="{'k-active': currentIndex === 5}">1mon</span>
        </div>
      </div>
      <div class="priceBox">
        <h3 class="priceBox-title">
          <span class="priceBox-title-lf"><i></i>{{$t('exchange.text27')}}</span>
          <router-link v-show="loginFlag" to="/account/transferRecord?orderTab=2" class="priceBox-title-rt">{{$t('exchange.text7')}} <i></i></router-link>
        </h3>
        <div class="priceList-title">
          <span></span>
          <span>{{$t('exchange.text1')}}<br>(USD)</span>
          <span>{{$t('exchange.text2')}}<br>(SIE)</span>
          <span>{{$t('exchange.text3')}}<br>(SIE)</span>
        </div>
        <ul class="priceList">
          <!-- 卖出从7-1显示，买进从1-7条显示  -->
          <li v-for="(item, index) in nowOrderList.sell" :key="item.id">
            <span class="redColor">{{$t('exchange.text4')}}{{7 - index}}</span>
            <span>{{item.price.toFixed(4)}}</span>
            <span>{{item.amount - item.tradeAmount | fourNumber}}</span>
            <span>{{item.amount | fourNumber}}</span>
          </li>
          <li v-for="(item, index) in nowOrderList.buy" :key="item.id">
            <span class="greenColor">{{$t('exchange.text5')}}{{index + 1}}</span>
            <span>{{item.price.toFixed(4)}}</span>
            <span>{{item.amount - item.tradeAmount | fourNumber}}</span>
            <span>{{item.amount | fourNumber}}</span>
          </li>
          <li v-if="!nowOrderList.sell.length && !nowOrderList.buy.length"  class="priceList-none">{{$t('exchange.text6')}}</li>
        </ul>
      </div>
      <div class="buySellBox">
        <button @click="showMobPopup(1)">{{$t('exchange.text12')}}</button>
        <button @click="showMobPopup(2)">{{$t('exchange.text21')}}</button>
      </div>
      <transition name="buySellPopup-tran">
        <div class="buySellPopup" v-show="buySellPopupFlag">
          <transition name="popup-mock">
            <div class="buySellPopup-mock" v-if="buySellPopupFlag" @click="buySellPopupFlag = false"></div>
          </transition>
          <transition name="popup-buySellPopupBox">
            <div class="buySellPopupBox" v-if="buySellPopupFlag">
              <ul class="buySellTab">
                <li :class="{activeTab: buySellFlag === 1}" @click="chooseTab(1)">{{$t('exchange.text12')}}</li>
                <li :class="{activeTab: buySellFlag === 2}" @click="chooseTab(2)">{{$t('exchange.text21')}}</li>
              </ul>
              <!--手机端买入-->
              <div class="buSellForm" v-if="buySellFlag === 1">
                <div class="buySellInputBox">
                  <input onpaste="return false" type="text" v-model.trim="buyPrice" :placeholder="$t('exchange.text14')" @input="checkInput('buyPrice')" @focus="buyPriceTipShow = false">
                  <span class="inputTipMsg" :class="{inputTipMsgActive: buyPriceTipShow}">{{$t('exchange.text14')}}</span>
                </div>
                <div class="buySellInputBox">
                  <input onpaste="return false" type="text" v-model.trim="buyNum" :placeholder="$t('exchange.text17')" @input="checkInput('buyNum')" @focus="buyNumTipShow = false">
                  <span class="inputTipMsg" :class="{inputTipMsgActive: buyNumTipShow}">{{$t('exchange.text17')}}</span>
                </div>
                <div class="buySellInputBox buySellInputBox-total">
                  <div class="buySellInput-title">
                    <span>{{$t('exchange.text18')}}</span>
                    <span class="span-balance">{{$t('exchange.text19')}}：<i>{{$fourNumber2(userBalanceUSD)}}USD</i></span>
                  </div>
                  <input onpaste="return false" type="text" v-model.trim="orderTotal" readonly>
                  <span class="inputTipMsg" :class="{inputTipMsgActive: orderTotalTipShow}">{{$t('exchange.text20')}}</span>
                </div>
                <div class="tips" style="text-align: center; color: #48be64; font-size: 14px;line-height: 1.5">
                  {{$t('exchange.text46')}}
                </div>
                <button @click="buySellFun('ph', 1)" class="buySellBtn buySellBtn-green" :class="{disable: loadingConfim}">
                  <div class="btn-w" v-show="loadingConfim">
                    <div class="img-box">
                        <img src="../../assets/images/aiChat/loading.gif" alt="">
                    </div>
                  </div>
                  <span>{{$t('exchange.text12')}}</span>
                </button>
              </div>
              <!--手机端卖出-->
              <div class="buSellForm" v-if="buySellFlag === 2">
                <div class="buySellInputBox">
                  <input onpaste="return false" type="text" v-model.trim="sellPrice" :placeholder="$t('exchange.text22')" @input="checkInput('sellPrice')" @focus="sellPriceTipShow = false">
                  <span class="inputTipMsg" :class="{inputTipMsgActive: sellPriceTipShow}">{{$t('exchange.text22')}}</span>
                </div>
                <div class="buySellInputBox">
                  <input onpaste="return false" type="text" v-model.trim="sellNum" :placeholder="$t('exchange.text25')" @input="checkInput('sellNum')" @focus="sellNumTipShow = false">
                  <span class="inputTipMsg" :class="{inputTipMsgActive: sellNumTipShow}">{{$t('exchange.text25')}}</span>
                </div>
                <div class="buySellInputBox buySellInputBox-total">
                  <div class="buySellInput-title">
                    <span>{{$t('exchange.text18')}}</span>
                    <span class="span-balance">{{$t('exchange.text26')}}：<i>{{userBalanceSIE | fourNumber}}SIE</i></span>
                  </div>
                  <input onpaste="return false" type="text" v-model.trim="orderTotal" readonly>
                  <span class="inputTipMsg" :class="{inputTipMsgActive: orderTotalTipShow}">{{$t('exchange.text20')}}</span>
                </div>
                <div class="tips" style="text-align: center; color: #e60000; font-size: 14px;line-height: 1.5">
                  {{$t('exchange.text30')}}
                </div>
                <button @click="buySellFun('ph', 2)" class="buySellBtn buySellBtn-red"  :class="{disable: loadingConfim}">
                  <div class="btn-w" v-show="loadingConfim">
                    <div class="img-box">
                        <img src="../../assets/images/aiChat/loading.gif" alt="">
                    </div>
                  </div>
                  <span>{{$t('exchange.text21')}}</span>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
    <transition name="confirm-fade">
      <div class="exchangePopup" v-if="loginPopupFlag">
        <div class="popupBox">
          <a class="popup-close" @click="loginPopupFlag = false"><i></i></a>
          <h3 class="popup-title">{{$t('exchange.text28')}}</h3>
          <router-link tag="button" to="/login" class="popup-btn">{{$t('exchange.text29')}}</router-link>
        </div>
      </div>
    </transition>
    <transition name="confirm-fade">
      <div class="confirm" v-if="showFlag">
        <div class="confirm-wrapper"  @click="closePopup()">
          <div class="confirm-content"  @click.stop>
            <div class="close-confirm" @click="closeIcon()">
              <div class="close-icon"></div>
            </div>
            <!-- 支付弹窗 -->
            <div class="dialog-box" v-if="payDialog">
              <h3 class="dialog-title">{{$t('danAI.text7')}}</h3>
              <div class="input-item">
                <input type="password" :placeholder="$t('danAI.text8')" class="inputs" autocomplete="off" v-model="payPassword">
              </div>
              <!--谷歌-->
              <div class="input-item" v-if="userInfo.openGoogleCode === 2">
                <input type="text" :placeholder="$t('danAI.text9')" class="inputs" v-model="payCode">
              </div>
              <!--短信-->
              <!--<div class="input-item verifiCode-item" v-else>-->
                <!--<input type="text" :placeholder="$t('danAI.text10')" class="inputs" v-model="payCode">-->
                <!--<div class="send" @click="sendCode" :class="{'disable': isDisabled}">{{sendBtnValue}}</div>-->
              <!--</div>-->
              <p class="error-dialgo">{{errDialogText}}</p>
              <div class="button-pay-confim" @click="confirmPay()" :class="{'disable-btn': loadingConfim || !payPassword || !payCode}">
                <div class="btn-w">
                  <div class="img-box" v-show="loadingConfim">
                    <img src="../../assets/images/aiChat/loading.gif" alt="">
                  </div>
                  <span>{{$t('danAI.text12')}}</span>
                </div>
              </div>
            </div>
            <!-- 未设置安全密码 -->
            <div v-if="userInfo.openTradePassword !== 2">
              <p class="error-text">{{$t('danAI.text13')}}</p>
              <div class="button-confim" @click="closePopup()">{{$t('danAI.text12')}}</div>
            </div>
            <!-- 未设置验证码-->
            <div v-else-if="userInfo.openGoogleCode !== 2 && userInfo.openTradePassword === 2">
              <p class="error-text">{{$t('danAI.text14')}}</p>
              <div class="button-confim" @click="closePopup()">{{$t('danAI.text12')}}</div>
            </div>
            <!-- 文字提示-->
            <div v-show="errorDialog">
              <h3 class="dialog-title">{{payResultText}}</h3>
              <p class="error-text-succcess">{{errorText}}</p>
              <div class="button-confim" @click="errCloseDialog">{{$t('danAI.text12')}}</div>
            </div>
            <!-- 短信发送提示-->
            <!--<div v-if="duanXianDialog">-->
              <!--<p class="error-text">{{duanxinMsg}}</p>-->
              <!--<div class="button-confim" @click="closeVerDialog">{{$t('danAI.text12')}}</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </transition>
    <!-- 余额不足提示弹框 -->
    <div class="confirm" v-if="balanceNotEnoughDialog">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <div class="close-confirm">
              <div class="close-icon" @click="balanceNotEnoughDialog = !balanceNotEnoughDialog"></div>
            </div>
            <div>
              <h3 class="dialog-title">{{$t('exchange.text33')}}</h3>
              <p class="error-text-succcess">{{$t('exchange.text34')}}</p>
              <div class="button-confim" @click="$router.push('/account/usdRecharge')">{{$t('exchange.text35')}}</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.exchangePc
  padding-top 18px
  padding-bottom 100px
  background-color #fff
  @media screen and (min-width 769px) and (max-width 1200px)
    padding-top 70px
  @media screen and (max-width 768px)
    display none
  .all-action
    cursor: pointer
  .exchangePc-title
    height 50px
    line-height 50px
    color #181818
    font-size 24px
    padding-left 28px
    background-color #f0f1f3
    i
      font-style normal
      font-size 16px
      color #fc534c
      margin-left 20px
  .exchangePc-top
    display flex
    .k-group
      flex .6
      #pEcharts
        height 514px
        margin-right 40px
      .btn-group
        margin-top 20px
        display flex
        flex-direction row
        flex 1
        justify-content space-around
        span
          padding 4px
          font-size 14px
          color #999
        .k-active
          color #fff
          background #032e43
    .priceBox
      flex .4
      .priceList-title
        padding-top 10px
        padding-bottom 5px
        font-size 14px
        display flex
        align-items center
        color #181818
        span
          display inline-block
          flex 1
          &:first-child
            flex 0.6
      .priceList
        color #181818
        li
          padding 10px 0
          font-size 14px
          display flex
          align-items center
          &.priceList-none
            color #fc534c
            justify-content center
            padding-top 30px
            background-color #fff
          &:hover
            background-color #edeff1
          span
            word-break break-all
            display inline-block
            flex 1
            &:first-child
              text-align center
              color #fc534c
              flex 0.6
              &.greenColor
                color #0ac88a
  .exchangePc-bt
    display flex
    margin-top 40px
    .exchangePc-bt-lf
      flex .6
      margin-right 40px
      .order-title
        height 64px
        display flex
        align-items center
        justify-content space-between
        font-size 20px
        color #181818
        background-color #edeff1
        padding-right 20px
        .order-title-lf
          display flex
          align-items center
          i
            display inline-block
            width 10px
            height 22px
            background-color #032e43
            margin-right 30px
        .order-title-rt
          display flex
          align-items center
          font-size 14px
          color #003399
          cursor pointer
          user-select none
          &:active
            opacity .6
          i
            display inline-block
            width 8px
            height 12px
            background url("../../assets/images/myAccount/right-row.png") no-repeat
            background-size cover
            margin-left 10px
      .order-list
        color #181818
        li
          padding 23px 0
          font-size 14px
          display flex
          background-color #fbfbfb
          &:first-child
            padding-bottom 10px
            font-size 16px
          &:nth-child(even)
            background-color #edeff1
          &.order-list-none
            color #fc534c
            justify-content center
            padding-top 30px
            background-color #fff
          span
            word-break break-all
            display inline-block
            flex 1
            text-align center
            i
              color #fc534c
            &:first-child
              flex 0.35
              &.greenColor
                color #0ac88a
              &.redColor
                color #fc534c
    .exchangePc-bt-rt
      flex .4
      .buySellTab
        height 64px
        display flex
        li
          flex 1
          display flex
          align-items center
          justify-content center
          background-color #edeff1
          font-size 18px
          color #181818
          cursor pointer
          user-select none
          &.activeTabGreen
            background-color #0ac88a
            color #fff
          &.activeTabRed
            background-color #FC534C
            color #fff
      .buSellForm
        margin-top 35px
        .buySellInputBox
          padding-bottom 30px
          position relative
          .buySellInput-title
            font-size 16px
            color #181818
            display flex
            justify-content space-between
            margin-bottom 10px
            span
              &:nth-child(2)
                font-size 14px
                color #003399
              &.span-balance
                color #181818
                i
                  color #FC534C
          input
            display block
            width 100%
            height 48px
            outline none
            border 1px solid #d7d9db
            color #181818
            font-size 16px
            padding 0 30px
            box-sizing border-box
            position relative
            z-index 18
            &::-webkit-input-placeholder
              font-size 16px
              color #605f5f
          .inputTipMsg
            color #FC534C
            font-size 14px
            position absolute
            top 45px
            z-index 0
            transition .3s all
            &.inputTipMsgActive
              top 80px
        .buySellBtn
          margin-top 20px
          width 100%
          height 50px
          color #fff
          border none
          outline none
          cursor pointer
          user-select none
          &.buySellBtn-green
            background-color #0ac88a
            line-height 50px
          &.buySellBtn-red
            background-color #FC534C
            line-height 50px
          &:active
            opacity .6
.exchangeMobile
  display none
  padding 0 20px
  padding-top 0
  @media screen and (max-width 768px)
    display block
  .echartsBox-title
    padding 15px 0
    color #032e43
    font-weight bold
    font-size 16px
    i
      color #10d1a1
  #mEcharts
    width 100%
  .btn-group
    margin-top 10px
    display flex
    flex 1
    justify-content space-around
    @media screen and (max-width 321px)
      margin-top 40px
    span
      padding 5px
      font-size 12px
    .k-active
      color #fff
      background #032e43
  .priceBox
    margin-top 15px
    padding-bottom 70px
    .priceBox-title
      padding 10px 0
      padding-right 10px
      background-color #edeff1
      font-size 14px
      display flex
      align-items center
      justify-content space-between
      color #181818
      .priceBox-title-lf
        display flex
        align-items center
        i
          display inline-block
          width 5px
          height 15px
          background-color #000
          margin-right 15px
      .priceBox-title-rt
        color #003399
        i
          display inline-block
          width 8px
          height 11px
          background url("../../assets/images/myAccount/right-row.png") no-repeat
          background-size cover
          margin-left 2px
    .priceList-title
      padding-top 10px
      padding-bottom 5px
      font-size 14px
      display flex
      color #181818
      span
        display inline-block
        flex 1
        &:first-child
          flex 0.6
    .priceList
      color #181818
      li
        padding 10px 0
        font-size 14px
        display flex
        background-color #edeff1
        &.priceList-none
          color #fc534c
          justify-content center
          padding-top 20px
          background-color #fff!important
        &:nth-child(even)
          background-color #fbfbfb
        span
          word-break break-all
          display inline-block
          flex .9
          &:first-child
            text-align center
            color #fc534c
            flex 0.6
            &.greenColor
              color #0ac88a
  .buySellBox
    width 100%
    position fixed
    left 0
    bottom 0
    color #fff
    font-size 14px
    display flex
    z-index 1
    button
      width 50%
      height 50px
      background-color #10d1a1
      border none
      outline none
      color #fff
      &:last-child
        background-color #fc534c
  .buySellPopup
    width: 100%
    height: 100%
    position: fixed
    left: 0
    top: 0
    z-index: 999
    overflow hidden
    &.buySellPopup-tran-enter-active,&.buySellPopup-tran-leave-active
      transition all .3s linear
    .buySellPopup-mock
      width 100%
      height 100%
      opacity 1
      background-color: rgba(11,27,48, .6)
      &.popup-mock-enter-active,&.popup-mock-leave-active
        transition opacity .3s linear
      &.popup-mock-enter,&.popup-mock-leave-to
        opacity: 0
    .buySellPopupBox
      position: absolute
      bottom 15px
      left 6%
      width: 88%
      padding: 20px 15px
      border-radius 6px
      box-shadow 0 0 5px #d7d9db
      background-color: #fff
      transition all .3s linear
      &.popup-buySellPopupBox-enter-active,&.popup-buySellPopupBox-leave-active
        transition all .3s linear
      &.popup-buySellPopupBox-enter,&.popup-buySellPopupBox-leave-to
        bottom: -500px
      .buySellTab
        width 100%
        display flex
        border-radius 4px
        border 1px solid #032e43
        li
          flex 1
          height 40px
          line-height 40px
          text-align center
          font-size 14px
          color #032e43
          &.activeTab
            border none
            background-color #032e43
            color #fff
      .buSellForm
        margin-top 30px
        .buySellInputBox
          position relative
          padding-bottom 25px
          input
            display block
            width 100%
            height 45px
            outline none
            border 1px solid #d7d9db
            border-radius 4px
            color #181818
            font-size 14px
            padding 0 15px
            box-sizing border-box
            position relative
            z-index 20
            &::-webkit-input-placeholder
              font-size 14px
              color #605f5f
          .inputTipMsg
            color #FC534C
            font-size 14px
            position absolute
            top 13px
            z-index 18
            transition .3s all
            &.inputTipMsgActive
              top 47px
          &.buySellInputBox-total
            .inputTipMsg
              top 40px
              &.inputTipMsgActive
                top 74px
          .buySellInput-title
            display flex
            justify-content space-between
            margin-bottom 10px
            span
              font-size 14px
              color #181818
              @media screen and (max-width 768px)
                font-size 12px !important
        .buySellBtn
          width 100%
          height 50px
          line-height 50px
          text-align center
          display block
          color #fff
          border-radius 4px
          outline none
          border none
          font-size 14px
          &.buySellBtn-green
            background-color #10d1a1
          &.buySellBtn-red
            background-color #FC534C
.exchangePopup
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
  &.confirm-fade-enter-active,&.confirm-fade-leave-active
    transition opacity .3s linear
  &.confirm-fade-enter,&.confirm-fade-leave-to
    opacity: 0
  .popupBox
    position: relative
    width: 600px
    padding: 100px 80px 100px 80px
    border-radius 8px
    box-shadow 0 0 5px #d7d9db
    background-color: #fff
    @media screen and (max-width: 768px)
      width: 90%
      padding: 50px 20px
    .popup-close
      display block
      position absolute
      top 10px
      right 20px
      padding 20px
      cursor pointer
      user-select none
      &:active
        opacity .6
      i
        display block
        width: 24px
        height: 24px
        background: url("../../assets/images/myAccount/myDon/delete.svg") no-repeat center / cover
    .popup-title
      font-size 18px
      color #181818
      text-align center
    .popup-btn
      margin-top: 80px
      width: 100%
      height: 58px
      background-color: #fc534c
      color #fff
      outline none
      border none
      cursor pointer
      user-select none
      border-radius 4px
      box-shadow 0 5px 10px #d7d9db
      font-size: 16px
      &:active
        opacity .6
.confirm
  width: 100%
  height: 100%
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 998
  background-color: rgba(11,27,48, .6)
  opacity: 1
  &.confirm-fade-enter-active,&.confirm-fade-leave-active
    transition opacity .3s linear
  &.confirm-fade-enter,&.confirm-fade-leave-to
    opacity: 0
  .button-confim
    font-size: 16px
    margin-top: 40px
    width: 100%
    height: 58px
    text-align: center
    line-height: 58px
    background-color: #fc534c
    color #fff
    cursor pointer
    border-radius 4px
    box-shadow 0 5px 10px #d7d9db
    @media screen and (max-width: 768px)
      height: 40px
      line-height: 40px
  .mobile-btn
    @media screen and (max-width: 1200px)
      display block
    @media screen and (min-width: 1200px)
      display none
  .pc-btn
    @media screen and (max-width: 1200px)
      display none
    @media screen and (min-width: 1200px)
      display block
  .button-pay-confim
    margin-top: 40px
    width: 100%
    height: 58px
    display flex
    align-items center
    justify-content center
    background-color: #fc534c
    color #fff
    cursor pointer
    border-radius 4px
    box-shadow 0 5px 10px #d7d9db
    font-size: 16px
    &.disable-btn
      background: #ccc
    @media screen and (max-width: 768px)
      height: 40px
    &.disable-btn
      pointer-events none
      cursor auto
    .btn-w
      display flex
      align-items center
      .img-box
        width: 20px
        margin-right: 10px
        img
          display block
          width: 100%
  .error-text
    font-size: 24px
    color #fc534c
    text-align: center
    margin-bottom: 134px
    @media screen and (max-width: 768px)
      font-size: 14px
      margin-top: 20px
      margin-bottom 50px
  .error-dialgo
    font-size: 16px
    color #fc534c
    text-align: center
    margin-bottom: 20px
  .errr-delay
    font-size: 16px
    color #fc534c
    margin-top: 20px
    text-align: center
  .dialog-title
    margin-bottom: 48px
    text-align: center
    font-size: 32px
    color #181818
  .error-text-succcess
    font-size: 24px
    color #fc534c
    text-align: center
    @media screen and (max-width: 768px)
      font-size: 14px
  .confirm-wrapper
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display flex
    align-items center
    justify-content center
    z-index: 999
    .confirm-content
      position: relative
      width: 600px
      padding: 120px 80px 157px 80px
      border-radius 8px
      box-shadow 0 0 5px #d7d9db
      background-color: #fff
      @media screen and (max-width: 768px)
        width: 90%
        padding: 50px 20px
      .close-confirm
        position: absolute
        right: 0
        top: 0
        cursor pointer
        padding: 30px 40px
        @media screen and (max-width: 768px)
          padding: 20px
        .close-icon
          width: 24px
          height: 24px
          background: url("../../assets/images/myAccount/myDon/delete.svg") no-repeat center / cover
      .dialog-box
        width: 100%
        .dialog-title
          margin-bottom: 50px
          font-size: 18px
          color #181818
          font-weight normal
          text-align: center
        .input-item
          width: 100%
          height: 48px
          margin-bottom: 24px
          .inputs
            width: 100%
            display block
            box-sizing border-box
            height 48px
            line-height: 48px
            padding-left: 40px
            border-radius 8px
            font-size: 16px
            color #181818
            border: 1px solid #d7d9db
            &::-webkit-input-placeholder
              color:d7d9db;
              font-family "Microsoft YaHei UI Light"
            &:-moz-placeholder
              color:d7d9db;
              font-family "Microsoft YaHei UI Light"
            &::-moz-placeholder
              color:d7d9db;
              font-family "Microsoft YaHei UI Light"
            &:-ms-input-placeholder
              color:d7d9db;
              font-family "Microsoft YaHei UI Light"
            @media screen and (max-width: 768px)
              padding-left: 10px
              font-size: 12px
        .verifiCode-item
          position: relative
          .send
            position: absolute
            right: 0
            top: 0
            font-size: 16px
            color #fc534c
            height 48px
            padding: 0 20px
            cursor pointer
            line-height: 48px
            &.disable
              pointer-events: none;
              cursor auto
              opacity: 0.5
.buySellBtn
  display flex !important
  justify-content center
  &.disable
    background #999 !important
  .btn-w
    display flex
    align-items center
    .img-box
      width: 20px
      margin-right: 10px
      img
        display block
        width: 100%
</style>

<script>
import { mapGetters } from 'vuex'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/candlestick')
export default{
  data () {
    return {
      currentIndex: 1, // 默认为1
      type: 1, // 默认为第一种类型
      kLineData: [],
      orderList: [], // 我的订单列表
      nowOrderList: {
        sell: [],
        buy: []
      }, // 当前买卖订单
      buySellFlag: 1, // 1买入，2卖出
      buyPrice: '', // 买入价格
      buyPriceTipShow: false,
      buyNum: '', // 买入数量
      buyNumTipShow: false,
      sellPrice: '', // 卖出价格
      sellPriceTipShow: false,
      sellNum: '', // 卖出数量
      sellNumTipShow: false,
      orderTotalTipShow: false,
      loginPopupFlag: false, // 未登录，买入或卖出弹窗
      buySellPopupFlag: false, // 手机端弹窗
      // 支付验证弹窗
      showFlag: false,
      payDialog: true,
      payPassword: '',
      payCode: '',
      isDisabled: false,
      sendBtnValue: this.$t('danAI.text16'),
      errDialogText: '',
      loadingConfim: false,
      notSafecode: false, // 未设置安全密码
      notVerifiCode: false, // 未设置验证码
      payResultText: '', // 文字错误提示
      errorDialog: false, // 支付后弹窗
      errorText: '', // 文字错误提示
      duanXianDialog: false, // 短信发送弹窗
      duanxinMsg: '', // 短信发送弹窗提示
      sendBtnTimes: 60,
      successFlagPay: false, // 支付成功状态,
      pollTimer: null, // 轮询定时器
      needCode: false,
      nowPrice: '', // 当前价
      huiRate: '', // USD汇率
      balanceNotEnoughDialog: false // 余额不足弹窗
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userBalanceUSD',
      'userBalanceSIE',
      'loginFlag'
    ]),
    orderTotal () { // 订单总价
      if (this.buySellFlag === 1) { // 买入
        if (this.buyPrice !== '' && this.buyNum !== '') {
          return (parseFloat(this.buyPrice) * parseFloat(this.buyNum)).toFixed(4)
        }
      } else { // 卖出
        if (this.sellPrice !== '' && this.sellNum !== '') {
          return (parseFloat(this.sellPrice) * parseFloat(this.sellNum)).toFixed(4)
        }
      }
    },
    exchangePrice () { // 兑换后的价
      return (this.nowPrice * this.huiRate).toFixed(4)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    clearInterval(this.pollTimer)
  },
  mounted () {
    this.getCurrencyRate() // 获取汇率
    this.pollFn()
    this.$nextTick(() => {
      this.pollTimer = setInterval(() => {
        this.pollFn()
      }, 5000)
    })
  },
  methods: {
    changeK (index) {
      if (index === 1) {
        this.type = 1
        this.currentIndex = 1
        this.getLineData()
      } else if (index === 2) {
        this.type = 2
        this.currentIndex = 2
        this.getLineData()
      } else if (index === 3) {
        this.type = 3
        this.currentIndex = 3
        this.getLineData()
      } else if (index === 4) {
        this.type = 4
        this.currentIndex = 4
        this.getLineData()
      } else if (index === 5) {
        this.type = 5
        this.currentIndex = 5
        this.getLineData()
      }
    },
    // pollFn () {
    //   this.getLineData() // 绘制K线图
    //   this.getBuySellList() // 获取买卖列表
    //   this.getOrderList() // 获取订单列表
    // },
    pollFn () {
      // console.log(this.loginFlag)
      if (this.loginFlag === true) {
        this.getLineData() // 绘制K线图
        this.getBuySellList() // 获取买卖列表
        this.getOrderList() // 获取订单列表
      } else {
        this.getLineData() // 绘制K线图
        this.getBuySellList() // 获取买卖列表
      }
    },
    // USD汇率
    getCurrencyRate () {
      this.$http.get(`${this.$api}/currencyRate/queryCurrencyRate`, {
        params: {
          payCurreny: 'USD', // 支付币种
          currency: 'CNY' // 充值币种
        }
      }).then(res => {
        if (res.data.success === true) {
          this.huiRate = res.data.data.rate
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 登录时不调用我的订单接口
    getOrderList () {
      let formData = new FormData()
      formData.append('pageSize', 6)
      formData.append('pageNo', 1)
      this.$http.post(this.$api + '/coinentrustRecord/getRecord', formData).then((res) => {
        if (res.data.success) {
          this.orderList = res.data.data.results
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getBuySellList () {
      let formData = new FormData()
      formData.append('pageSize', 14)
      formData.append('pageNo', 1)
      this.$http.post(this.$api + '/coinentrustRecord/nowRecord', formData).then((res) => {
        if (res.data.success) {
          this.nowOrderList = res.data.data
          // 限制长度，卖和买都只显示7条
          if (this.nowOrderList.sell.length > 7) {
            this.nowOrderList.sell.length = 7
          }
          if (this.nowOrderList.buy.length > 7) {
            this.nowOrderList.buy.length = 7
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    chooseTab (val) { // tab买入卖出切换
      this.buySellFlag = val
      this.orderTotalTipShow = false
    },
    checkInput (field) {
      let val = this[field]
      if (!/^\d*\.{0,1}\d{0,4}$/.test(val)) { // 不能输入特殊符号+-等,不能输入多个小数点，不能小数点后面超过4位小数
        this[field] = val.substring(0, val.length - 1)
      }
      if (/^\./.test(this[field])) { // 如果是"."
        this[field] = ''
      }
      this[field] = this[field].replace(/[^0-9/.]/g, '') // 只能是数字或者.
    },
    splitData (rawData) {
      var categoryData = []
      var values = []
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0])
        values.push(rawData[i])
      }
      return {
        categoryData: categoryData,
        values: values
      }
    },
    drawLine () {
      var upColor = '#48be64'
      var upBorderColor = '#48be64'
      var downColor = '#f3544f'
      var downBorderColor = '#f3544f'
      var that = this
      // 基于准备好的dom，初始化echarts实例
      let mEcharts = echarts.init(document.getElementById('mEcharts'))
      let pEcharts = echarts.init(document.getElementById('pEcharts'))
      // 绘制图表
      pEcharts.setOption({
        grid: {
          top: '5%',
          left: '7%',
          right: '0%',
          bottom: '5%'
        },
        xAxis: {
          data: this.kLineData.categoryData,
          axisLine: {
            lineStyle: {
              color: '#373C52',
              width: 1,
              fontSize: '10'
            }
          }
        },
        yAxis: {
          // min: 0,
          // max: 80,
          // splitNumber: 10,
          scale: true, // Y轴起始值为数据的最小值
          splitLine: {
            lineStyle: {
              color: '#292d3d',
              width: 1
            }
          },
          axisLine: {
            lineStyle: {
              color: '#373C52',
              width: 1
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 80,
            end: 100
          }
        ],
        series: [
          {
            type: 'candlestick',
            data: this.kLineData.values,
            itemStyle: {
              normal: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              }
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          showDelay: 0,
          hideDelay: 50,
          transitionDuration: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderColor: 'transparent',
          borderRadius: 8,
          borderWidth: 2,
          padding: 10, // [5, 10, 15, 20]
          position: function (p) {
            // 位置回调
            return [p[0] + 10, p[1] - 10]
          },
          textStyle: {
            color: '#fff',
            decoration: 'none',
            fontSize: 15
          },
          formatter: function (params) {
            let d = [...(params[0].data)]
            let str = ''
            d.shift() // 不显示第一个
            d.forEach((item, index) => {
              str += `${that.$t('exchange.tooltips')[index]}: ${item.toFixed(4)}<br/>`
            })
            return str
          }
        }
      })
      mEcharts.setOption({
        grid: {
          top: '5%',
          left: '16%',
          right: '5%',
          bottom: '15%'
        },
        xAxis: {
          data: this.kLineData.categoryData,
          axisLine: {
            lineStyle: {
              color: '#373C52',
              width: 1
            }
          }
        },
        yAxis: {
          // min: 0,
          // max: 80,
          // splitNumber: 10,
          scale: true, // Y轴起始值为数据的最小值
          splitLine: {
            lineStyle: {
              color: '#292d3d',
              width: 1
            }
          },
          axisLine: {
            lineStyle: {
              color: '#373C52',
              width: 1
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 80,
            end: 100
          }
        ],
        series: [
          {
            type: 'candlestick',
            data: this.kLineData.values,
            itemStyle: {
              normal: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              }
            }
          }
        ]
      })
      window.onresize = function () {
        pEcharts.resize()
        mEcharts.resize()
      }
    },
    getLineData () {
      document.getElementById('mEcharts').style.height = (document.body.offsetWidth - 40) / 2 + 'px' // k线图高度
      this.$http.post(`${this.$api}/coinentrustRecord/queryTradeKLine?type=${this.type}`).then((res) => {
        if (res.data.success) {
          let lineArr = []
          res.data.data.KLine.forEach((item) => {
            let obj = []
            obj.push(this.$changeDate(item.startTime, '.', 4))
            // obj.push(item.openPrice)
            // obj.push(item.closePrice)
            // obj.push(item.minPrice)
            // obj.push(item.highPrice)
            // obj.push(item.volume)

            // 数据push的顺序不能错
            obj.push(item.openingPrice) // 开盘价
            obj.push(item.closingPrice) // 收盘价
            obj.push(item.minPrice) // 最低价
            obj.push(item.maxPrice) // 最高价
            obj.push(item.tradeCashAmount) // 总成交数量
            lineArr.push(obj)
          })
          // lineArr = lineArr.reverse()
          this.kLineData = this.splitData(lineArr)
          this.drawLine()
          this.nowPrice = res.data.data.nowPrice
        }
      }).catch(() => {
        // console.log(err)
      })
    },
    buySellFun (str, val) { // PC手机端买入卖出
      if (this.userInfo.length === 0) {
        this.loginPopupFlag = true
      } else {
        if (val === 1) { // 买入
          if (!this.buyPrice) { // 未填写买入价格
            this.buyPriceTipShow = true
            return
          } else if (!this.buyNum) { // 未填写买入金额
            this.buyNumTipShow = true
            return
          }
          if (this.orderTotal > this.userBalanceUSD) { // 超过USD余额
            this.buySellPopupFlag = false // 隐藏手机买入/卖出弹框
            this.balanceNotEnoughDialog = true
            return
          }
        } else { // 卖出
          if (!this.sellPrice) { // 未填写卖出价格
            this.sellPriceTipShow = true
            return
          } else if (!this.sellNum) { // 未填写卖出金额
            this.sellNumTipShow = true
            return
          }
          if (this.sellNum > this.userBalanceSIE) { // 超过SIE余额
            this.orderTotalTipShow = true
            setTimeout(() => {
              this.orderTotalTipShow = false
            }, 1500)
            return
          }
        }

        this.buySellFlag = val
        this.buySellPopupFlag = false // 隐藏手机买入/卖出弹框

        if (this.userInfo.openTradePassword !== 2) { // 未安全密码
          this.payDialog = false
          this.showFlag = true
        } else if (this.userInfo.openGoogleCode !== 2 && this.userInfo.openTradePassword === 2) { // 未设置验证码
          this.payDialog = false
          this.showFlag = true
        } else {
          if (this.needCode) {
            this.showFlag = true
            this.payDialog = true
          } else {
            this.confirmPay()
          }
        }
      }
    },
    // 确认支付
    confirmPay () {
      if (this.loadingConfim) { // 如果正在提交，返回
        return
      }
      if (this.needCode && (!this.payPassword || !this.payCode)) { // 如果正在需要验证码和交易密码，又没填，返回
        return
      }
      let formData = new FormData()
      if (this.buySellFlag === 1) { // 买入
        formData.append('amount', this.buyNum)
        formData.append('price', this.buyPrice)
      } else { // 卖出
        formData.append('amount', this.sellNum)
        formData.append('price', this.sellPrice)
      }

      formData.append('type', this.buySellFlag)

      if (this.needCode) {
        formData.append('tradePwd', this.payPassword)
        formData.append('code', this.payCode)
      } else {
        formData.append('tradePwd', 'unlock')
        formData.append('code', 'unlock')
      }
      this.loadingConfim = true
      let ajaxLang = ''
      if (localStorage.getItem('kleinLang') === 'EN') {
        ajaxLang = 'en'
      }
      this.$http.post(this.$api + '/coinentrustRecord/createRecord', formData, {headers: {'secret-language': ajaxLang}}).then((res) => {
        this.payDialog = false
        this.loadingConfim = false
        if (res.data.success) {
          // 支付完成后重新请求账户和订单信息，清空input字段
          this.$store.dispatch('balanceAction')
          this.getOrderList()
          this.getBuySellList()
          this.buyPrice = ''
          this.buyNum = ''
          this.sellPrice = ''
          this.sellNum = ''
          this.payPassword = ''
          this.payCode = ''

          this.showFlag = true
          this.errorDialog = true
          this.payResultText = this.$t('danAI.text17')
          this.successFlagPay = true
          this.errorText = ``
          this.needCode = false
        } else {
          if (res.data.msg === 'need_code') { // 不能直接购买，需要验证码和交易码
            this.needCode = true
            this.showFlag = true // 显示验证码弹框
            this.payDialog = true
            return
          } else {
            this.showFlag = true
            this.payResultText = this.$t('danAI.text18')
            this.errorText = res.data.msg
          }
        }
        this.errorDialog = true
      }).catch((err) => {
        console.log(err)
        this.loadingConfim = false
        this.errorDialog = true
        this.payResultText = this.$t('danAI.text18')
        this.errorText = this.$t('danAI.text15')
      })
    },
    allBuy () {
      if (!this.buyPrice) {
        this.buyPriceTipShow = true
      } else {
        this.buyNum = this.$fourNumber2(this.userBalanceUSD / this.buyPrice)
      }
    },
    allSell () {
      this.sellNum = parseFloat(this.userBalanceSIE).toFixed(4)
    },
    showMobPopup (val) {
      if (this.userInfo.length === 0) {
        this.loginPopupFlag = true
      } else {
        this.buySellPopupFlag = true
        this.buySellFlag = val
      }
    },
    // 支付验证弹窗
    closePopup () {
      this.payPassword = ''
      this.payCode = ''
      this.recommendName = ''
      this.showFlag = false
      if (window.innerWidth > 1200) {
        this.$router.push('/account/safettingCenter')
      } else {
        this.$router.push('/account/myAccountPhone')
      }
    },
    // 关闭img x
    closeIcon () {
      this.errDialogText = ''
      if (this.duanXianDialog === true) {
        this.duanXianDialog = false
        this.payDialog = true
      } else if (this.errorDialog === true && this.successFlagPay === false) {
        this.errorDialog = false
        if (this.needCode) {
          this.payDialog = true
        } else {
          this.showFlag = false
        }
      } else if (this.successFlagPay === true) {
        this.$store.dispatch('balanceAction')
        this.showFlag = false
        this.payPassword = ''
        this.payCode = ''
        this.recommendName = ''
      } else {
        this.showFlag = false
        this.payPassword = ''
        this.payCode = ''
        this.recommendName = ''
      }
      this.successFlagPay = false
    },
    // 支付后的弹窗
    errCloseDialog () {
      if (this.successFlagPay === true) {
        this.showFlag = false
        this.errorDialog = false
      } else if (this.errorDialog === true && this.successFlagPay === false) {
        this.errorDialog = false
        if (this.needCode) {
          this.payDialog = true
        } else {
          this.showFlag = false
        }
      } else if (this.duanXianDialog === true) {
        this.duanXianDialog = false
        this.payDialog = true
      }
      this.successFlagPay = false
    },
    // 关掉短信弹窗框
    closeVerDialog () {
      this.duanXianDialog = false
      this.duanxinMsg = ''
      this.payDialog = true
    },

    // 发送验证码
    sendCode () {
      if (this.sendBtnValue === this.$t('danAI.text16')) {
        this.payDialog = false
        this.duanXianDialog = true
        let formData = new FormData()
        formData.append('json', JSON.stringify({'type': 'code'}))
        this.isDisabled = true
        this.duanxinMsg = this.$t('danAI.text19')
        this.countDown()
        let ajaxLang2 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang2 = 'en'
        }
        this.$http.post(this.$api + '/user/sendSmsCode', formData, {headers: {'secret-language': ajaxLang2}}).then((res) => {
          if (res.data.success) {
            this.duanxinMsg = this.$t('danAI.text20')
          } else {
            // 验证码获取失败
            this.duanxinMsg = res.data.msg
            this.sendBtnValue = this.$t('danAI.text16')
            this.sendBtnTimes = 60
            this.isDisabled = false
            clearTimeout(this.timer)
          }
        }).catch((err) => {
          this.sendBtnValue = this.$t('danAI.text16')
          this.sendBtnTimes = 60
          this.isDisabled = false
          clearTimeout(this.timer)
          this.duanxinMsg = this.$t('danAI.text21')
          console.log(err)
        })
      }
    },
    // 短信倒计时
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.sendBtnValue = this.$t('danAI.text16')
        this.sendBtnTimes = 60
        this.isDisabled = false
        clearTimeout(this.timer)
      } else {
        this.sendBtnTimes--
        this.sendBtnValue = this.sendBtnTimes
        this.isDisabled = true
        this.timer = setTimeout(() => this.countDown(), 1000)
      }
    }
  }
}
</script>
