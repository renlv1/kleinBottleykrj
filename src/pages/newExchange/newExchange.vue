<template>
  <div class="exchange">
    <div class="add add-w-c" @click="$router.push('/add')">
      <div class="linWrap add-line"><div v-html="addArr" class="add-cont" v-show="addArr.length > 0"></div></div>
    </div>
    <div class="exchangePc">
      <div class="linWrapContainer">
        <div class="exchangePc-top">
          <!-- 新增编号，用户名，奖金 -->
          <div class="new">
            <h3 class="new-currency-type">{{$t('exchange.text40')}}</h3>
            <ul class="new-list">
              <li :class="{activeType: currentIndexType === index}" v-for="(item,index) in marketList"
                  :key="index" @click="refresh(item.currency, index)">
                <div class="item-left">
                  <div class="value-group">
                    <i class="dot"></i>
                    <span>{{item.currency}}/USD</span>
                  </div>
                  <span>${{item.price.toFixed(4)}} USD</span>
                </div>
                <div class="item-right">
                  <span :class="{isRed: item.change<0, isNormal: item.change===0, isGreen: item.change>0}">{{item.change}}%</span>
                  <img style="margin: 0 0 2px 5px"
                       v-show="Number(item.change) > 0"
                       width="12"
                       height="7"
                       src="../../assets/images/newExchange/green.png">
                  <img style="margin: 0 0 0 5px"
                       v-show="Number(item.change) < 0"
                       width="12"
                       height="7"
                       src="../../assets/images/newExchange/red.png">
                </div>
              </li>
            </ul>
          </div>
          <!-- 左右两侧的分割线 -->
          <div class="segmentation"></div>
          <!-- K线图新增5个按钮 -->
          <div class="k-group">
            <h3 class="currency-value-type">
              <span style="font-weight: bold">{{toTransCurrency(currency)}}/USD</span>
              <i :class="{isRed: ChangeAmplitude<0, isNormal: ChangeAmplitude===0, isGreen: ChangeAmplitude>0}">{{Number(nowPrice)
                === 0 ? '0.00000000' : nowPrice.toFixed(8)}}USD ≈
                {{exchangePrice.toFixed(8)}}CNY</i>
              <span class="up-img-box"
                    :class="{isRed: ChangeAmplitude<0, isNormal: ChangeAmplitude===0, isGreen: ChangeAmplitude>0}">{{this.ChangeAmplitude === '' ? '0' : this.ChangeAmplitude}}%
              <img style="margin: 0 0 4px 10px"
                   v-show="Number(ChangeAmplitude) > 0"
                   width="12"
                   height="7"
                   src="../../assets/images/newExchange/green.png">
              <img style="margin: 0 0 2px 10px"
                   v-show="Number(ChangeAmplitude) < 0"
                   width="12"
                   height="7"
                   src="../../assets/images/newExchange/red.png">
             </span>
            </h3>
            <div class="btn-group">  <!-- src="../../assets/images/newExchange/up.png" -->
              <p>{{$t('newExchange.text1')}}：</p>
              <span class="isClick" @click="changeK(1)" :class="{'k-active': currentIndex === 1}">15min</span>
              <span class="isClick" @click="changeK(2)" :class="{'k-active': currentIndex === 2}">30min</span>
              <span class="isClick" @click="changeK(3)" :class="{'k-active': currentIndex === 3}">1hour</span>
              <span class="isClick" @click="changeK(4)" :class="{'k-active': currentIndex === 4}">24hour</span>
              <span class="isClick" @click="changeK(5)" :class="{'k-active': currentIndex === 5}">1mon</span>
            </div>
            <div id="pEcharts"></div>
          </div>
        </div>
        <div class="exchangePc-bt">
          <div class="priceBox">
            <div class="priceList-title">
              <span></span>
              <span>{{$t('exchange.text1')}}(USD)</span>
              <span>{{$t('exchange.text2')}}({{toTransCurrency(currency)}})</span>
              <span>{{$t('exchange.text3')}}({{toTransCurrency(currency)}})</span>
            </div>
            <ul id="myPriceList" class="priceList">
              <!-- 卖出从7-1显示，买进从1-7条显示  -->
              <li @click="transformSellPrice(item.price)" v-for="(item, index) in nowOrderList.sell" :key="item.id">
                <span class="redColor">{{$t('exchange.text4')}}{{nowOrderList.sell.length - index}}</span>
                <span>{{item.price.toFixed(8)}}</span>
                <span>{{(item.amount - item.tradeAmount).toFixed(8)}}</span>
                <span>{{item.amount.toFixed(8)}}</span>
              </li>
              <li @click="transformBuyPrice(item.price)" v-for="(item, index) in nowOrderList.buy" :key="item.id">
                <span class="greenColor">{{$t('exchange.text5')}}{{index + 1}}</span>
                <span>{{item.price.toFixed(8)}}</span>
                <span>{{(item.amount - item.tradeAmount).toFixed(8)}}</span>
                <span>{{item.amount.toFixed(8)}}</span>
              </li>
              <!--<li v-if="!nowOrderList.sell.length && !nowOrderList.buy.length" class="priceList-none"-->
              <!--style="background:none">{{$t('exchange.text6')}}-->
              <!--</li>-->
            </ul>
            <div class='error' v-show="nowOrderList.sell.length === 0 && !nowOrderList.buy.length === 0">
              {{$t('orderManage.text8')}}
            </div>
          </div>
          <div class="segmentation"></div>
          <div class="exchangePc-bt-rt">
            <ul class="buySellTab">
              <li :class="{activeTabGreen: isLimitActive === 3}" @click="chooseTabPc(3)">{{$t('exchange.text36')}}</li>
              <li :class="{activeTabRed: isLimitActive === 4}" @click="chooseTabPc(4)">{{$t('exchange.text37')}}</li>
            </ul>
            <div class="buForm">
              <!--买入-->
              <div class="buSellForm">
                <div class="buySellInputBox">
                  <div class="buySellInput-title">
                    <span>{{$t('exchange.text38')}}</span>
                  </div>
                  <!-- 限价买入价格 -->
                  <div class="int-group" v-if="limitPrice">
                    <input onpaste="return false" type="text" v-model.trim="buyPrice"
                           :placeholder="$t('exchange.text14')"
                           @input="checkInput('buyPrice')" @focus="buyPriceTipShow = false">
                    <span>USD</span>
                  </div>
                  <!-- 市价买入价格 -->
                  <input onpaste="return false" v-if="marketPrice" type="text" :placeholder="$t('newExchange.text5')"
                         readonly>
                  <span class="inputTipMsg"
                        :class="{inputTipMsgActive: buyPriceTipShow}">{{$t('exchange.text14')}}</span>
                </div>
                <div class="buySellInputBox">
                  <div class="" v-if="limitPrice">
                    <div class="buySellInput-title">
                      <span>{{$t('exchange.text15')}}</span>
                    </div>
                    <!-- 限价买入数量 -->
                    <div class="int-group">
                      <input onpaste="return false" type="text" v-model.trim="buyNum"
                             :placeholder="$t('exchange.text17')"
                             @input="checkInput('buyNum')" @focus="buyNumTipShow = false">
                      <span>{{toTransCurrency(currency)}}</span>
                    </div>
                    <span class="most-number" v-show="loginFlag">{{$t('sieMoney.text18')}} {{toTransCurrency(currency)}}：<i>{{getMostNum}} {{toTransCurrency(currency)}}</i></span>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: buyNumTipShow}">{{$t('exchange.text17')}}</span>
                  </div>
                  <div class="" v-if="marketPrice">
                    <div class="buySellInput-title">
                      <span>{{$t('newExchange.text16')}}</span>
                    </div>
                    <!-- 限价买入数量 -->
                    <div class="int-group">
                      <input onpaste="return false" type="text" v-model.trim="buyNum"
                             :placeholder="$t('newExchange.text14')"
                             @input="checkInput('buyNum')" @focus="buyNumTipShow = false">
                      <span>USD</span>
                    </div>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: buyNumTipShow}">{{$t('newExchange.text14')}}</span>
                    <span class="most-number" v-show="loginFlag">USD{{$t('sieMoney.text2')}}：<i>{{userBalanceUSD | eightNumber}} USD</i></span>
                  </div>
                </div>
                <div class="buySellInputBox">
                  <div class="" v-if="limitPrice">
                    <div class="buySellInput-title">
                      <span>{{$t('exchange.text18')}}</span>
                      <!--<span-->
                      <!--class="span-balance">{{$t('exchange.text19')}}：<i>{{userBalanceUSD.toFixed(8)}}USD</i></span>-->
                    </div>
                    <input onpaste="return false" type="text" v-model.trim="buyOrderTotal" readonly>
                    <!--<span class="inputTipMsg"-->
                    <!--:class="{inputTipMsgActive: buyOrderTotalTipShow}">{{$t('exchange.text20')}}</span>-->
                  </div>
                </div>
                <!-- 限价买入按钮 -->
                <button v-if="limitPrice" class="buySellBtn buySellBtn-green" @click="buySellFun('pc', 2, 1)"
                        :class="{disable: loadingConfim, maketClass: marketPrice}">
                  <div class="btn-w" v-show="loadingConfim">
                    <div class="img-box">
                      <img src="../../assets/images/aiChat/loading.gif" alt="">
                    </div>
                  </div>
                  <span>{{$t('exchange.text12')}}</span>
                </button>
                <!-- 市价买入按钮 -->
                <button v-if="marketPrice" class="buySellBtn buySellBtn-green" @click="buySellFun('pc', 1, 1)"
                        :class="{disable: loadingConfim, maketClass: marketPrice}">
                  <div class="btn-w" v-show="loadingConfim">
                    <div class="img-box">
                      <img src="../../assets/images/aiChat/loading.gif" alt="">
                    </div>
                  </div>
                  <span>{{$t('exchange.text12')}}</span>
                </button>
              </div>
              <!--卖出-->
              <div class="buSellForm">
                <div class="buySellInputBox">
                  <div class="buySellInput-title">
                    <span>{{$t('exchange.text39')}}</span>
                  </div>
                  <!-- 限价买入价格 -->
                  <div class="int-group" v-if="limitPrice">
                    <input onpaste="return false" type="text" v-model.trim="sellPrice"
                           :placeholder="$t('exchange.text22')"
                           @input="checkInput('sellPrice')" @focus="sellPriceTipShow = false">
                    <span>USD</span>
                  </div>
                  <!-- 市价买入价格 -->
                  <input onpaste="return false" v-if="marketPrice" type="text" :placeholder="$t('newExchange.text2')"
                         readonly>
                  <span class="inputTipMsg"
                        :class="{inputTipMsgActive: sellPriceTipShow}">{{$t('exchange.text22')}}</span>
                </div>
                <div class="buySellInputBox">
                  <div class="buySellInput-title">
                    <span>{{$t('exchange.text23')}}</span>
                  </div>
                  <!-- 限价卖出数量 -->
                  <div class="int-group">
                    <input onpaste="return false" type="text" v-model.trim="sellNum"
                           :placeholder="$t('exchange.text25')"
                           @input="checkInput('sellNum')" @focus="sellNumTipShow = false">
                    <span>{{toTransCurrency(currency)}}</span>
                  </div>
                  <span class="has-number" v-show="loginFlag">{{toTransCurrency(currency)}}{{$t('sieMoney.text2')}}：<i>{{chooseUserBalance}} {{toTransCurrency(currency)}}</i></span>
                  <span class="inputTipMsg"
                        :class="{inputTipMsgActive: sellNumTipShow}">{{$t('exchange.text25')}}</span>
                </div>
                <div class="buySellInputBox">
                  <div class="" v-if="limitPrice">
                    <div class="buySellInput-title">
                      <span>{{$t('exchange.text18')}}</span>
                      <!--<span-->
                      <!--class="span-balance">{{$t('exchange.text26')}}：<i>{{userBalanceSIE.toFixed(8)}}SIE</i></span>-->
                    </div>
                    <input onpaste="return false" type="text" v-model.trim="sellOrderTotal" readonly>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: buyOrderTotalTipShow}">{{$t('exchange.text20')}}</span>
                  </div>
                </div>
                <!--<div class="tips" style="color: #e60000; text-align: left;font-size: 14px;">-->
                <!--{{$t('exchange.text30')}}-->
                <!--</div>-->
                <!-- 限价卖出按钮 -->
                <button v-if="limitPrice" class="buySellBtn buySellBtn-red" @click="buySellFun('pc', 2, 2)"
                        :class="{disable: loadingConfim, maketClass: marketPrice}">
                  <div class="btn-w" v-show="loadingConfim">
                    <div class="img-box">
                      <img src="../../assets/images/aiChat/loading.gif" alt="">
                    </div>
                  </div>
                  <span>{{$t('exchange.text21')}}</span>
                </button>
                <!-- 市价卖出按钮 -->
                <button v-if="marketPrice" class="buySellBtn buySellBtn-red" @click="buySellFun('pc', 1, 2)"
                        :class="{disable: loadingConfim, maketClass: marketPrice}">
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
        <div class="exchangePc-bottom" v-if="loginFlag">
          <div class="exchangePc-bt-lf">
            <h3 class="order-title">
              <span class="order-title-lf">{{$t('newExchange.text3')}}</span>
              <router-link to="/account/exchanges" class="order-title-rt">{{$t('exchange.text8')}}<i></i>
              </router-link>
            </h3>
            <div v-loading.lock="fullscreenLoading" style="margin-top: 30px" center></div>
            <div class="list-group">
              <ul class="order-list">
                <li v-for="item in orderList1" :key="item.index">
                  <div class="li-top">
                    <div class="li-left">
                      <span>{{$t('exchange.text43')}}：</span>
                      <span>{{item.id}}</span>
                    </div>
                    <div class="li-right">
                      <span>{{$t('exchange.text44')}}</span>
                    </div>
                  </div>
                  <div class="li-bottom">
                    <div class="li-left">
                      <span>{{$t('exchange.text45')}}：</span>
                      <span v-if="item.priceType === 2">{{item.price.toFixed(8)}}USD</span>
                      <span v-if="item.priceType === 1">{{$t('newExchange.text4')}}</span>
                    </div>
                    <div class="li-right">
                      <span>{{item.tradeAmount.toFixed(8)}}{{toTransCurrency(currency)}} / {{item.amount.toFixed(8)}}{{toTransCurrency(currency)}}</span>
                    </div>
                  </div>
                </li>
              </ul>
              <span class="order-list-seg"></span>
              <ul class="order-list">
                <li v-for="item in orderList2" :key="item.index">
                  <div class="li-top">
                    <div class="li-left">
                      <span>{{$t('exchange.text43')}}：</span>
                      <span>{{item.id}}</span>
                    </div>
                    <div class="li-right">
                      <span>{{$t('exchange.text44')}}</span>
                    </div>
                  </div>
                  <div class="li-bottom">
                    <div class="li-left">
                      <span>{{$t('exchange.text45')}}：</span>
                      <span v-if="item.priceType === 2">{{item.price.toFixed(8)}}USD</span>
                      <span v-if="item.priceType === 1">{{$t('newExchange.text4')}}</span>
                    </div>
                    <div class="li-right">
                      <span>{{item.tradeAmount.toFixed(8)}}{{toTransCurrency(currency)}} / {{item.amount.toFixed(8)}}{{toTransCurrency(currency)}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class='error' v-show="noOrderListData">
              {{$t('orderManage.text8')}}
            </div>
          </div>
        </div>
        <div class="exchangePc-new-add">
          <div class="new-add-left">
            <div class="left-title">{{$t('newExchange.text6')}}</div>
            <div id="deepCharts"></div>
          </div>
          <div class="new-add-seg"></div>
          <div class="new-add-right">
            <div class="right-title">{{$t('newExchange.text7')}}</div>
            <div class="priceBox">
              <div class="priceList-title">
                <span>{{$t('newExchange.text8')}}</span>
                <span>{{$t('newExchange.text9')}}</span>
                <span>{{$t('newExchange.text10')}}(USD)</span>
                <span>{{$t('newExchange.text11')}}({{toTransCurrency(currency)}})</span>
              </div>
              <ul class="priceList">
                <!-- 卖出从7-1显示，买进从1-7条显示  -->
                <li v-for="(item, index) in realTimeList" :key="index">
                  <span>{{$changeDate(item.createAt, '/')}}</span>
                  <span
                    :class="{changeGreen: item.flag === 1, changeRed: item.flag === 2}">{{changeToText(item.flag)}}</span>
                  <span>{{item.tradePrice.toFixed(8)}}</span>
                  <span>{{item.tradeAmount.toFixed(8)}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--手机端-->
    <div class="exchangeMobile">
      <div class="echartsBox">
        <h3 class="echartsBox-title">
          <span style="width: 70%">{{toTransCurrency(currency)}}/USD
            <i style="color: #10d1a1">
              {{Number(nowPrice) === 0 ? '0.00000000' : nowPrice.toFixed(8)}}USD ≈ {{exchangePrice.toFixed(8)}}CNY</i>
          </span>
          <i class="up-img-box" @click="tosituation()">
            <span
              :class="{isRed: ChangeAmplitude<0, isNormal: ChangeAmplitude===0, isGreen: ChangeAmplitude>0}">{{this.ChangeAmplitude}}%</span>
            <img v-show="ChangeAmplitude > 0" class="up" width="12" height="7"
                 src="../../assets/images/newExchange/green.png">
            <img v-show="ChangeAmplitude < 0" class="up" width="12" height="7"
                 src="../../assets/images/newExchange/red.png">
            <img :class="{marginL: ChangeAmplitude === 0}" width="9" height="14"
                 src="../../assets/images/newExchange/right.png"/>
          </i>
        </h3>
        <div id="mEcharts"></div>
        <div class="btn-group">
          <span @click="changeK(1)" :class="{'k-active': currentIndex === 1}">15min</span>
          <span @click="changeK(2)" :class="{'k-active': currentIndex === 2}">30min</span>
          <span @click="changeK(3)" :class="{'k-active': currentIndex === 3}">1hour</span>
          <span @click="changeK(4)" :class="{'k-active': currentIndex === 4}">24hour</span>
          <span @click="changeK(5)" :class="{'k-active': currentIndex === 5}">1mon</span>
        </div>
      </div>
      <div id="priceBox" class="priceBox">
        <h3 class="priceBox-title">
          <span class="priceBox-title-lf"><i></i>{{$t('exchange.text27')}}</span>
          <router-link to="/account/exchanges" class="priceBox-title-rt">{{$t('exchange.text7')}}
            <i></i></router-link>
        </h3>
        <div class="priceList-title">
          <span></span>
          <span>{{$t('exchange.text1')}}<br>(USD)</span>
          <span>{{$t('exchange.text2')}}<br>({{toTransCurrency(currency)}})</span>
          <span>{{$t('exchange.text3')}}<br>({{toTransCurrency(currency)}})</span>
        </div>
        <ul class="priceList" id="mobilePriceList">
          <!-- 卖出从7-1显示，买进从1-7条显示  -->
          <li v-for="(item, index) in nowOrderList.sell" :key="item.id" class="listitem">
            <span class="redColor">{{$t('exchange.text4')}}{{nowOrderList.sell.length - index}}</span>
            <span>{{item.price.toFixed(8)}}</span>
            <span>{{(item.amount - item.tradeAmount).toFixed(8)}}</span>
            <span>{{item.amount.toFixed(8)}}</span>
          </li>
          <div id="bonus"></div>
          <li v-for="(item, index) in nowOrderList.buy" :key="item.id">
            <span class="greenColor">{{$t('exchange.text5')}}{{index + 1}}</span>
            <span>{{item.price.toFixed(8)}}</span>
            <span>{{(item.amount - item.tradeAmount).toFixed(8)}}</span>
            <span>{{item.amount.toFixed(8)}}</span>
          </li>
          <!--<li v-if="!nowOrderList.sell.length && !nowOrderList.buy.length" class="priceList-none">-->
          <!--{{$t('exchange.text6')}}-->
          <!--</li>-->
        </ul>
        <div class='error' v-show="nowOrderList.sell.length === 0 && !nowOrderList.buy.length === 0">
          {{$t('orderManage.text8')}}
        </div>
      </div>
      <div class="deepEcharts">
        <h3 class="priceBox-title">
          <span class="priceBox-title-lf"><i></i>{{$t('newExchange.text6')}}</span>
        </h3>
        <div id="mobileDeepEcharts"></div>
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
              <ul v-if="buySellFlag === 1" class="buyTab">
                <li :class="{activeTab: isLimit === 3}" @click="chooseTab(3)">{{$t('exchange.text36')}}</li>
                <li :class="{activeTab: isLimit === 4}" @click="chooseTab(4)">{{$t('exchange.text37')}}</li>
              </ul>
              <ul v-if="buySellFlag === 2" class="sellTab">
                <li :class="{activeTab: isLimit === 3}" @click="chooseTab(3)">{{$t('exchange.text36')}}</li>
                <li :class="{activeTab: isLimit === 4}" @click="chooseTab(4)">{{$t('exchange.text37')}}</li>
              </ul>
              <!--手机端限买入-->
              <div class="buSellForm" v-if="buySellFlag === 1">
                <!--限价-->
                <div v-if="isLimit === 3">
                  <div class="buySellInputBox">
                    <input onpaste="return false" v-if="limitPrice" type="text" v-model.trim="buyPrice"
                           :placeholder="$t('exchange.text14')"
                           @input="checkInput('buyPrice')" @focus="buyPriceTipShow = false">
                    <input v-if="marketPrice" type="text" :placeholder="$t('exchange.text14')" readonly>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: buyPriceTipShow}">{{$t('exchange.text14')}}</span>
                  </div>
                  <div class="buySellInputBox">
                    <input onpaste="return false" v-if="limitPrice" type="text" v-model.trim="buyNum"
                           :placeholder="$t('exchange.text17')"
                           @input="checkInput('buyNum')" @focus="buyNumTipShow = false">
                    <input v-if="marketPrice" type="text" :placeholder="$t('exchange.text17')" readonly>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: buyNumTipShow}">{{$t('exchange.text17')}}</span>
                    <span class="most-number" v-show="loginFlag">{{$t('sieMoney.text18')}}{{toTransCurrency(currency)}}：<i>{{getMostNum}} {{toTransCurrency(currency)}}</i></span>
                  </div>
                  <div class="buySellInputBox buySellInputBox-total">
                    <div class="buySellInput-title">
                      <span>{{$t('exchange.text18')}}</span>
                    </div>
                    <input onpaste="return false" type="text" v-model.trim="orderTotal" readonly>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: buyOrderTotalTipShow}">{{$t('exchange.text20')}}</span>
                  </div>
                  <button @click="buySellFun('ph', 2, 1)" class="buySellBtn buySellBtn-green"
                          :class="{disable: loadingConfim}">
                    <div class="btn-w" v-show="loadingConfim">
                      <div class="img-box">
                        <img src="../../assets/images/aiChat/loading.gif" alt="">
                      </div>
                    </div>
                    <span>{{$t('exchange.text12')}}</span>
                  </button>
                </div>
                <!--市价-->
                <div v-if="isLimit === 4">
                  <div class="buySellInputBox">
                    <!--<input type="text" v-model.trim="buyPrice" :placeholder="$t('exchange.text14')"-->
                    <!--@input="checkInput('buyPrice')" @focus="buyPriceTipShow = false">-->
                    <input onpaste="return false" type="text" :placeholder="$t('newExchange.text5')" readonly>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: buyPriceTipShow}">{{$t('exchange.text14')}}</span>
                  </div>
                  <div class="buySellInputBox">
                    <input onpaste="return false" type="text" v-model.trim="buyNum"
                           :placeholder="$t('newExchange.text14')"
                           @input="checkInput('buyNum')" @focus="buyNumTipShow = false">
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: buyNumTipShow}">{{$t('exchange.text17')}}</span>
                    <span class="most-number" v-show="loginFlag">USD{{$t('sieMoney.text2')}}：<i>{{userBalanceUSD | eightNumber}} USD</i></span>
                  </div>
                  <button @click="buySellFun('ph', 1, 1)" class="buySellBtn buySellBtn-green btn-margin"
                          :class="{disable: loadingConfim}">
                    <div class="btn-w" v-show="loadingConfim">
                      <div class="img-box">
                        <img src="../../assets/images/aiChat/loading.gif" alt="">
                      </div>
                    </div>
                    <span>{{$t('exchange.text12')}}</span>
                  </button>
                </div>
              </div>
              <!-- 手机端限价卖出 -->
              <div class="buSellForm" v-if="buySellFlag === 2">
                <!--限价-->
                <div v-if="isLimit === 3">
                  <div class="buySellInputBox">
                    <input onpaste="return false" v-if="limitPrice" type="text" v-model.trim="sellPrice"
                           :placeholder="$t('exchange.text22')"
                           @input="checkInput('sellPrice')" @focus="sellPriceTipShow = false">
                    <input onpaste="return false" v-if="marketPrice" type="text" :placeholder="$t('exchange.text22')"
                           readonly>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: sellPriceTipShow}">{{$t('exchange.text22')}}</span>
                  </div>
                  <div class="buySellInputBox">
                    <input onpaste="return false" type="text" v-model.trim="sellNum"
                           :placeholder="$t('exchange.text25')"
                           @input="checkInput('sellNum')" @focus="sellNumTipShow = false">
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: sellNumTipShow}">{{$t('exchange.text25')}}</span>
                    <span class="has-number" v-show="loginFlag">{{toTransCurrency(currency)}}{{$t('sieMoney.text2')}}：<i>{{chooseUserBalance}} {{toTransCurrency(currency)}}</i></span>
                  </div>
                  <div class="buySellInputBox buySellInputBox-total">
                    <div class="buySellInput-title">
                      <span>{{$t('exchange.text18')}}</span>
                      <!--<span v-show="$route.query.currency === 'SIE'"-->
                            <!--class="span-balance">{{$t('exchange.text26')}}：<i>{{userBalanceSIE.toFixed(8)}}SIE</i></span>-->
                      <!--<span v-show="$route.query.currency === 'ETH'"-->
                            <!--class="span-balance">ETH {{$t('exchanges.text27')}}：<i>{{userBalanceETH.toFixed(8)}}ETH</i></span>-->
                    </div>
                    <input onpaste="return false" type="text" v-model.trim="orderTotal" readonly>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: sellOrderTotalTipShow}">{{$t('exchange.text20')}}</span>
                  </div>
                  <!--<div class="tips" style="text-align: center; color: #e60000; font-size: 14px;line-height: 1.5">-->
                  <!--{{$t('exchange.text30')}}-->
                  <!--</div>-->
                  <button @click="buySellFun('ph', 2, 2)" class="buySellBtn buySellBtn-red"
                          :class="{disable: loadingConfim}">
                    <div class="btn-w" v-show="loadingConfim">
                      <div class="img-box">
                        <img src="../../assets/images/aiChat/loading.gif" alt="">
                      </div>
                    </div>
                    <span>{{$t('exchange.text21')}}</span>
                  </button>
                </div>
                <!--市价-->
                <div v-if="isLimit === 4">
                  <div class="buySellInputBox">
                    <input onpaste="return false" type="text" :placeholder="$t('newExchange.text2')" readonly>
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: sellPriceTipShow}">{{$t('exchange.text22')}}</span>
                  </div>
                  <div class="buySellInputBox">
                    <input onpaste="return false" type="text" v-model.trim="sellNum"
                           :placeholder="$t('exchange.text25')"
                           @input="checkInput('sellNum')" @focus="sellNumTipShow = false">
                    <span class="inputTipMsg"
                          :class="{inputTipMsgActive: sellNumTipShow}">{{$t('exchange.text25')}}</span>
                    <span class="has-number" v-show="loginFlag">{{toTransCurrency(currency)}}{{$t('sieMoney.text2')}}：<i>{{chooseUserBalance}} {{toTransCurrency(currency)}}</i></span>
                  </div>
                  <div class="buySellInputBox buySellInputBox-total">
                  </div>
                  <!--<div class="tips" style="text-align: center; color: #e60000; font-size: 14px;line-height: 1.5">-->
                  <!--{{$t('exchange.text30')}}-->
                  <!--</div>-->
                  <button @click="buySellFun('ph', 1, 2)" class="buySellBtn buySellBtn-red btn-margin"
                          :class="{disable: loadingConfim}">
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
        <div class="confirm-wrapper" @click="closePopup()">
          <div class="confirm-content" @click.stop>
            <div class="close-confirm" @click="closeIcon()">
              <div class="close-icon"></div>
            </div>
            <!-- 支付弹窗 -->
            <div class="dialog-box" v-if="payDialog">
              <h3 class="dialog-title">{{$t('danAI.text7')}}</h3>
              <div class="input-item">
                <input type="password" :placeholder="$t('danAI.text8')" class="inputs" autocomplete="off"
                       v-model="payPassword">
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
              <div class="button-pay-confim" @click="confirmPay()"
                   :class="{'disable-btn': loadingConfim || !payPassword || !payCode}">
                <div class="btn-w">
                  <div class="img-box" v-show="loadingConfim">
                    <img src="../../assets/images/aiChat/loading.gif" alt="">
                  </div>
                  <span>{{$t('danAI.text12')}}</span>
                </div>
              </div>
            </div>
            <!-- 未设置安全密码 -->
            <div v-if="this.LocalLoginFlag === 'false'">
              <p class="error-text">{{$t('newAdd.text10')}}</p>
              <div class="button-confim" @click="closePopup()">{{$t('danAI.text12')}}</div>
            </div>
            <!-- 未设置验证码-->
            <div
              v-else-if="userInfo.openGoogleCode !== 2">
              <p class="error-text">{{$t('dialog.text8')}}</p>
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
    <!-- {{$t('sieMoney.text2')}}不足提示弹框 -->
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
  .add-w-c
    cursor pointer
    width: 100%
    height: 48px;
    background-color: #fc534c;
    @media screen and (max-width: 1200px)
      height: 30px
      line-height: 30px
      font-size: 12px
      margin-top: 50px
    .linWrap
      line-height: 48px;
      height: 48px
      font-size: 16px;
      color: #fff;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      @media screen and (max-width: 1200px)
        height: 30px
        line-height: 30px
        font-size: 12px
  .marginL
    margin-left 10px

  .isRed
    color #FC534C

  .isNormal
    color #000

  .isGreen
    color #10d1a1

  .changeGreen
    color #10d1a1

  .changeRed
    color #FC534C

  .normalText
    color #000

  .exchange
    background-color #f0f1f3
    .exchangePc
      // padding-top 18px
      /*margin-top 150px*/
      margin-top: 10px
      padding-bottom 40px
      // background-color #fff
      @media screen and (min-width 769px) and (max-width 1200px)
        padding-top 10px
      @media screen and (max-width 1200px)
        display none
      .all-action
        cursor: pointer
      .container-top
        width 100%
        height 60px
        line-height 60px
        font-size 12px
        background #fff
        box-shadow 0 0 8px #ccc
        border-radius 5px
        @media screen and (max-width: 1200px) {
          height 30px
          line-height 30px
          margin-top 50px
          background #e5eaec
        }
        .exchangePc-title
          padding-left 60px
          width 100%
          color #181818
          font-size 22px
          // background-color #f0f1f3
          i
            font-style normal
            /*font-size 16px*/
            // color #fc534c
            margin 0 30px 0 18px
          .up-img-box
            // color #10d1a1
            img
              margin-left 10px
      /*.isPCPoll*/
      /*@media screen and (max-width: 1200px) {*/
      /*display none*/
      /*}*/
      .exchangePc-top
        display flex
        flex-direction row
        justify-content space-between
        background-color #fff
        .new
          width 350px
          min-width 320px
          font-size 14px
          .new-currency-type
            padding-left 20px
            height 60px
            line-height 60px
            border-radius 5px
            box-shadow 0 0 5px #ccc
            font-size 18px
            color #181818
          .new-title
            flex 1
            display flex
            flex-direction row
            justify-content space-between
            background-color #edeff1
            padding 10px
            span
              flex 1
              text-align center
              color #181818
          .new-list
            color #181818
            li
              margin 20px
              padding 20px
              display flex
              flex-direction row
              justify-content space-between
              user-select none
              cursor pointer
              border 1px solid #f0f0f0
              border-radius 4px
              box-shadow 0 0 2px #f0f0f0
              &:nth-child(1)
                i
                  background-color #db1212
              &:nth-child(2)
                i
                  background-color #3c218b
              &:nth-child(3)
                i
                  background-color #f7931a
              &.activeType
                border 1px solid rgba(252, 83, 76, .3)
                box-shadow 0 0 2px #FC534C
                li
                  border none
                  box-shadow none
              .item-left
                display flex
                flex-direction column
                align-items flex-start
                > span
                  &:last-child {
                    font-size 14px
                    color #808080
                  }
                .value-group
                  display flex
                  flex-direction row
                  margin-bottom 10px
                  i
                    width 8px
                    height 8px
                    border-radius 100%
                    margin 5px 15px 0 0
                  span
                    letter-spacing 1px
                    font-size 16px
                    margin-bottom 5px
                    font-weight bold
        .segmentation
          width 10px
          background-color #f0f1f3
        .k-group
          // display flex
          float right
          flex 1
          .currency-value-type
            padding-left 20px
            height 60px
            line-height 60px
            border-radius 5px
            box-shadow 0 0 5px #ccc
            i
              margin 0 20px 0 10px
          #pEcharts
            height 514px
            padding-right 30px
          // margin-right 40px
          .btn-group
            display flex
            align-items center
            margin 20px 0 0 30px
            p
              display inline-block
              font-size 16px
              margin-right 20px
              color #999
            /*@media screen and (min-width 769px) and (max-width 1200px)*/
            /*left 41%*/
            /*width 56%*/
            span
              font-size 14px
              margin-right 60px
              color #999
            .k-active
              color #FC534C
              border-bottom 2px solid #FC534C
      .exchangePc-bt
        display flex
        margin-top 40px
        justify-content space-between
        .priceBox
          width 680px
          min-width 400px
          padding 20px 0 15px
          background #fff
          .priceList-title
            padding 10px 0
            font-size 14px
            display flex
            align-items center
            color #181818
            font-weight bold
            span
              display inline-block
              flex 1
              text-align center
              &:first-child
                flex 0.6
          .priceList
            color #181818
            height 410px
            position relative
            overflow-y auto
            &::-webkit-scrollbar {
              width: 8px;
              background: white;
            }
            &::-webkit-scrollbar-corner, /* 滚动条角落 */
            &::-webkit-scrollbar-thumb,
            &::-webkit-scrollbar-track {
              border-radius: 4px;
            }
            &::-webkit-scrollbar-corner,
            &::-webkit-scrollbar-track {
              /* 滚动条轨道 */
              background-color: #fff;
            }
            &::-webkit-scrollbar-thumb {
              /* 滚动条手柄 */
              background-color: #e1e3e5;
            }
            li
              padding 10px 0
              font-size 14px
              display flex
              align-items center
              cursor pointer
              color #505359
              &:hover
                background-color #edeff1
              span
                word-break break-all
                display inline-block
                text-align center
                flex 1
                &:first-child
                  text-align right
                  color #fc534c
                  flex 0.6
                  &.greenColor
                    color #0ac88a
        .segmentation
          width 10px
          background-color #f0f1f3
        .exchangePc-bt-rt
          flex 1
          background #fff
          .buySellTab
            height 60px
            line-height 60px
            display flex
            border-radius 5px
            box-shadow 0 0 5px #ccc
            li
              display flex
              align-items center
              justify-content center
              font-size 18px
              width 180px
              text-align center
              cursor pointer
              user-select none
              color #b3b4bf
              &.activeTabGreen
                background #10d1a1
                color #fff
              &.activeTabRed
                background #FC534C
                color #fff
          .buForm
            display flex
            flex-direction row
            justify-content space-between
            padding 0 30px
            .buSellForm
              width 47%
              margin-top 35px
              position relative
              .buySellInputBox
                padding-bottom 30px
                position relative
                .buySellInput-title
                  font-size 16px
                  color #181818
                  display flex
                  justify-content space-between
                  align-items center
                  margin-bottom 10px
                  span
                    &:nth-child(2)
                      margin-top 1px
                      vertical-align bottom
                      font-size 14px
                      color #000
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
                  left 0
                  z-index 0
                  transition .3s all
                  &.inputTipMsgActive
                    position absolute
                    left 0
                    top 80px
                .most-number
                  display inline-block
                  margin-top 18px
                  font-size 14px
                  color #0ac88a
                .has-number
                  display inline-block
                  margin-top 18px
                  font-size 14px
                  color #fc534c
                .int-group
                  position relative
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
                  span
                    letter-spacing .5px
                    position absolute
                    right 15px
                    top 50%
                    color #605f5f
                    -webkit-transform translateY(-50%)
                    -moz-transform translateY(-50%)
                    -o-transform translateY(-50%)
                    -ms-transform translateY(-50%)
                    transform translateY(-50%)
                    z-index 666
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
                margin-bottom 20px
                margin-top 30px
                width 100%
                text-align center
                height 50px
                line-height 50px
                font-size 16px
                color #fff
                border none
                outline none
                cursor pointer
                user-select none
                border-radius 5px
                box-shadow 0 0 5px #ccc
                &.maketClass
                  cursor pointer !important
                  &:active
                    opacity 1 !important
                &.buySellBtn-green
                  position absolute
                  bottom 0
                  background-color #10d1a1
                &.buySellBtn-red
                  background-color #FC534C
                &:active
                  opacity .6
      .exchangePc-bottom
        margin-top 40px
        background-color #fff
        padding-bottom 60px
        .exchangePc-bt-lf
          flex 1
          .order-title
            height 60px
            display flex
            align-items center
            justify-content space-between
            font-size 20px
            color #181818
            padding 0 30px
            box-shadow 0 0 5px #ccc
            border-radius 5px
            margin-bottom 3px
            // background-color #edeff1
            // padding-right 20px
            .order-title-lf
              font-size 18px
              color #181818
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
          .list-group
            display flex
            flex-direction row
            justify-content space-between
            color #181818
            font-size 14px
            .order-list
              flex .5
              color #181818
              li
                padding 10px 20px
                display flex
                flex-direction column
                justify-content space-between
                line-height 30px
                &:nth-child(odd)
                  background-color #fff
                &:nth-child(even)
                  background-color #fbfbfb
                .li-top, .li-bottom
                  display flex
                  justify-content space-between
            .order-list-seg
              width 20px
              background #fff
      .exchangePc-new-add
        display flex
        flex 1
        margin-top 40px
        .new-add-left
          flex .5
          background #fff
          .left-title
            height 60px
            line-height 60px
            padding-left 30px
            background #fff
            box-shadow 0 0 5px #ccc
            border-radius 5px
            font-size 18px
            color #181818
            margin-bottom 1px
          #deepCharts
            flex .5
            // height 600px
            // width 50%
            background #fff
            canvas
              background #fff
        .new-add-seg
          width 20px
        .new-add-right
          flex .5
          background #fff
          .right-title
            height 60px
            line-height 60px
            padding-left 30px
            background #fff
            box-shadow 0 0 5px #ccc
            border-radius 5px
            font-size 18px
            margin-bottom: 1px;
            color #181818
          .priceBox
            flex 1
            padding 20px 0 15px
            background #fff
            .priceList-title
              padding 10px 0
              font-size 14px
              display flex
              align-items center
              color #181818
              font-weight bold
              span
                display inline-block
                width 20%
                text-align center
                &:last-child
                  text-align center
                  width 30%
                &:first-child
                  width 30%
            .priceList
              color #181818
              height 532px
              overflow-y auto
              &::-webkit-scrollbar {
                width: 8px;
                background: white;
              }
              &::-webkit-scrollbar-corner, /* 滚动条角落 */
              &::-webkit-scrollbar-thumb,
              &::-webkit-scrollbar-track {
                border-radius: 4px;
              }
              &::-webkit-scrollbar-corner,
              &::-webkit-scrollbar-track {
                /* 滚动条轨道 */
                background-color: #fff;
              }
              &::-webkit-scrollbar-thumb {
                /* 滚动条手柄 */
                background-color: #e1e3e5;
              }
              li
                flex 1
                padding 10px 0
                font-size 14px
                display flex
                align-items center
                cursor pointer
                color #505359
                &:hover
                  background-color #edeff1
                /*&:nth-child(even)*/
                /*background-color #edeff1*/
                /*&.priceList-none*/
                /*color #fc534c*/
                /*justify-content center*/
                /*padding-top 30px*/
                /*background-color #fff*/
                span
                  word-break break-all
                  display inline-block
                  text-align center
                  width 20%
                  &:last-child
                    text-align center
                    width 30%
                  &:first-child
                    text-align center
                    width 30%
                    &.greenColor
                      color #0ac88a
    .exchangeMobile
      display none
      margin-top 50px
      padding 0 20px
      background-color #fff
      @media screen and (max-width 1200px)
        display block
        margin-top: 20px
      .echartsBox-title
        width 100%
        padding 15px 0
        color #032e43
        font-weight bold
        font-size 16px
        position relative
        display flex
        justify-content space-between
        align-items center
        @media screen and (max-width 768px)
          font-size 14px
        i
          margin-left 2px
          color #10d1a1
        .up-img-box
          background-size cover
          display flex
          flex-direction row
          align-items center
          justify-content center
          .up
            margin 0 8px 0 5px
      #mEcharts
        width 100%
        height 100%
      .btn-group
        margin-top 10px
        display flex
        flex 1
        justify-content space-around
        @media screen and (max-width 321px)
          margin-top 20px
        span
          padding 5px
          font-size 12px
        .k-active
          color #fff
          background #032e43
      .priceBox
        margin-top 15px
        // padding-bottom 70px
        .priceBox-title
          padding 10px 0
          padding-right 10px
          background-color #edeff1
          font-size 16px
          display flex
          align-items center
          justify-content space-between
          color #181818
          .priceBox-title-lf
            display flex
            align-items center
            font-size 14px
            i
              display inline-block
              width 5px
              height 15px
              background-color #000
              margin-right 15px
          .priceBox-title-rt
            color #003399
            font-size 14px
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
            @media screen and (max-width 321px)
              font-size 12px
        .priceList
          color #181818
          height 350px
          position relative
          overflow-y: auto
          li
            padding 10px 0
            font-size 14px
            display flex
            background-color #edeff1
            @media screen and (max-width 321px)
              font-size 12px
            &.priceList-none
              color #fc534c
              justify-content center
              padding-top 20px
              background-color #fff !important
            &:nth-child(even)
              background-color #fbfbfb
            span
              word-break break-all
              display inline-block
              flex 1
              padding-right 5px
              &:first-child
                text-align center
                color #fc534c
                flex 0.6
                &.greenColor
                  color #0ac88a
      .deepEcharts
        padding-bottom 70px
        margin-top 15px
        .priceBox-title
          padding 10px 0
          padding-right 10px
          background-color #edeff1
          font-size 16px
          display flex
          align-items center
          justify-content space-between
          color #181818
          .priceBox-title-lf
            display flex
            align-items center
            font-size 14px
            i
              display inline-block
              width 5px
              height 15px
              background-color #000
              margin-right 15px
      .buySellBox
        width 100%
        position fixed
        left 0
        bottom 0
        color #fff
        font-size 14px
        display flex
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
        &.buySellPopup-tran-enter-active, &.buySellPopup-tran-leave-active
          transition all .3s linear
        .buySellPopup-mock
          width 100%
          height 100%
          opacity 1
          background-color: rgba(11, 27, 48, .6)
          &.popup-mock-enter-active, &.popup-mock-leave-active
            transition opacity .3s linear
          &.popup-mock-enter, &.popup-mock-leave-to
            opacity: 0
        .buySellPopupBox
          position: absolute
          bottom 15px
          left 6%
          width: 88%
          min-height 400px
          padding: 20px 15px
          border-radius 6px
          box-shadow 0 0 5px #d7d9db
          background-color: #fff
          transition all .3s linear
          &.popup-buySellPopupBox-enter-active, &.popup-buySellPopupBox-leave-active
            transition all .3s linear
          &.popup-buySellPopupBox-enter, &.popup-buySellPopupBox-leave-to
            bottom: -500px
          .buyTab
            width 100%
            display flex
            border-radius 4px
            border 1px solid #10d1a1
            li
              flex 1
              height 40px
              line-height 40px
              text-align center
              font-size 14px
              color #999
              &.activeTab
                border none
                background-color #10d1a1
                color #fff
          .sellTab
            width 100%
            display flex
            border-radius 4px
            border 1px solid #FC534C
            li
              flex 1
              height 40px
              line-height 40px
              text-align center
              font-size 14px
              color #999
              &.activeTab
                border none
                background-color #FC534C
                color #fff
          .buSellForm
            margin-top 30px
            .buySellInputBox
              position relative
              padding-bottom 25px
              .most-number
                margin-top 5px
                color #10d1a1
                font-size 12px
                float right
              .has-number
                margin-top 5px
                display inline-block
                float right
                font-size 12px
                color #fc534c
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
              display flex
              justify-content center
              align-items center
              position absolute
              bottom 20px
              left 50%
              transform translateX(-50%)
              width 90%
              height 50px
              line-height 50px
              text-align center
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
      background-color: rgba(11, 27, 48, .6)
      opacity: 1
      display flex
      align-items center
      justify-content center
      transition opacity .3s linear
      &.confirm-fade-enter-active, &.confirm-fade-leave-active
        transition opacity .3s linear
      &.confirm-fade-enter, &.confirm-fade-leave-to
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
      background-color: rgba(11, 27, 48, .6)
      opacity: 1
      &.confirm-fade-enter-active, &.confirm-fade-leave-active
        transition opacity .3s linear
      &.confirm-fade-enter, &.confirm-fade-leave-to
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
                  color: d7d9db;
                  font-family "Microsoft YaHei UI Light"
                &:-moz-placeholder
                  color: d7d9db;
                  font-family "Microsoft YaHei UI Light"
                &::-moz-placeholder
                  color: d7d9db;
                  font-family "Microsoft YaHei UI Light"
                &:-ms-input-placeholder
                  color: d7d9db;
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
      text-align center
      line-height 50px
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
  import {mapGetters, mapState} from 'vuex'

  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/candlestick')
  export default {
    data() {
      return {
        addArr: [],
        currentIndexType: 0,
        classObject: {
          isRed: false,
          isGreen: false,
          isNormal: false
        },
        isChangeUPFlag: false,
        isChangeNormalFlag: false,
        isChangeFallingFlag: false,
        noOrderListData: false,
        ChangeAmplitude: '',
        ChangeAmplitudeMobile: '',
        isLimitActive: 3,
        isLimit: 3,
        fullscreenLoading: true,
        marketList: [], // 行情列表
        currentIndex: 1, // 默认为1
        type: 1, // 默认为15分钟图类型  1:15分钟图 2:30分钟图 3:60分钟图 4:24小时图 5:1月图
        currency: 1, // 默认为sie类型  1:sie 2:eth 3:btc
        currencyType: 1, // 0:全部订单 1:sie订单 2:eth订单 3:btc订单
        kLineData: [],
        orderList: [], // 我的订单列表
        orderList1: [],
        orderList2: [],
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
        buyOrderTotalTipShow: false,
        sellOrderTotalTipShow: false,
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
        balanceNotEnoughDialog: false, // {{$t('sieMoney.text2')}}不足弹窗
        limitPrice: true, // 限价的input框
        marketPrice: false, // 市价的input框
        buyList: [], // 买数据列表
        newBuyList: [],
        sellList: [], // 卖数据列表
        newSellList: [],
        priceList: [], // 价格列表
        realTimeList: [],
        SIEChangeAmplitude: '',
        ETHChangeAmplitude: '',
        LocalLoginFlag: ''
      }
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'userBalanceUSD',
        'userBalanceSIE',
        'userBalanceETH',
        'chooseUserBalance',
        'loginFlag'
      ]),
      ...mapState({
        count: state => state.userBalanceUSD
      }),
      orderTotal() { // 订单总价
        if (this.buySellFlag === 1) { // 买入
          if (this.buyPrice !== '' && this.buyNum !== '') {
            return (parseFloat(this.buyPrice) * parseFloat(this.buyNum)).toFixed(8)
          }
        } else { // 卖出
          if (this.sellPrice !== '' && this.sellNum !== '') {
            return (parseFloat(this.sellPrice) * parseFloat(this.sellNum)).toFixed(8)
          }
        }
      },
      buyOrderTotal() { // pc端买入
        if (this.buyPrice !== '' && this.buyNum !== '') {
          return (parseFloat(this.buyPrice) * parseFloat(this.buyNum)).toFixed(8)
        }
      },
      sellOrderTotal() { // pc端卖出
        if (this.sellPrice !== '' && this.sellNum !== '') {
          return (parseFloat(this.sellPrice) * parseFloat(this.sellNum)).toFixed(8)
        }
      },
      getMostNum() {
        if (this.buyPrice === '') {
          return '0.00000000'
        } else {
          return (this.userBalanceUSD / this.buyPrice).toFixed(8)
        }
      },
      exchangePrice() { // 兑换后的价
        return (this.nowPrice * this.huiRate)
      }
      // goAnchor() {
      //   console.log(document.getElementById('bonus').offsetTop)
      //   return (document.documentElement.scrollTop = document.getElementById('bonus').offsetTop - 60)
      // }
    },
    beforeDestroy() {
      clearTimeout(this.timer)
      clearInterval(this.pollTimer)
    },
    mounted() {
      this.getMarkt()
      this.mobileRefresh() // 移动端刷新
      this.getCurrencyRate() // 获取汇率
      this.pollFn()
      // this.keepStatus()
      this.$nextTick(() => {
        this.pollTimer = setInterval(() => {
          this.pollFn()
        }, 5000)
        this.getBuySellListScrollTop()
      })
      window.onresize = function () {
        this.refreshLine() // 解决k线在改变视口大小时无法刷新的问题
      }
      this.currency = 1
      // console.log(this.nowOrderList.sell.length)
    },
    created() {
      this.getBuySellList()
      this.getOrderList()
      this.getBuySellList()
      // debugger
      let localCurrency = window.localStorage.getItem('currency')
      let currencyType = window.localStorage.getItem('currencyType')
      if (localCurrency) {
        this.currency = parseInt(localCurrency)
        this.currencyType = (currencyType)
      }
      this.getAdd()
      this.currency = 1
      // this.refreshLine()
    },
    methods: {
      getAdd () {
        let baseUrl = 'https://api.kleingame.ai'
        let langadd = 1
        if (localStorage.getItem('kleinLang') === 'EN') {
          langadd = 2
        } else {
          langadd = 1
        }
        let url = `${baseUrl}/notice/noticeListNew?pageSize=10&pageIndex=1&terrace=5&language=${langadd}`
        this.$http.post(url).then((res) => {
          if (res.data.success === true) {
            this.isLoading = false // 加载动画
            let ndata = res.data.data
            if (ndata.totalPage) {
              this.addArr = ndata.noticeList[0].title
            } else {
              let newdata = JSON.parse(ndata)
              this.addArr = newdata.noticeList[0].title
            }
          }
        }).catch(() => {
        })
      },
      // goAnchor() {
      //   console.log(document.getElementById('bonus').offsetTop + document.body.clientHeight)
      //   document.getElementById('app').scrollTop = 1000
      // },
      transformSellPrice(price) {
        this.buyPrice = price.toFixed(8)
      },
      transformBuyPrice(price) {
        this.sellPrice = price.toFixed(8)
      },
      toTransCurrency(num) {
        if (num === 1) {
          return 'SIE'
        } else if (num === 2) {
          return 'ETH'
        } else if (num === 3) {
          return 'BTC'
        }
      },
      changeToText(num) {
        if (num === 1) {
          return this.$t('newExchange.text12')
        } else if (num === 2) {
          return this.$t('newExchange.text13')
        }
      },
      refresh(currency, index) { // 点击行情列表刷新币种价格以及k线图数据
        this.$store.dispatch('balance')
        this.currentIndexType = index
        if (currency === 'SIE') {
          this.ChangeAmplitude = this.SIEChangeAmplitude
          localStorage.setItem('currency', 1)
          localStorage.setItem('currencyType', 1)
          localStorage.setItem('ChangeAmplitude', this.SIEChangeAmplitude)
        } else if (currency === 'ETH') {
          localStorage.setItem('currency', 2)
          localStorage.setItem('currencyType', 2)
          this.ChangeAmplitude = this.ETHChangeAmplitude
          localStorage.setItem('ChangeAmplitude', this.ETHChangeAmplitude)
        } else if (currency === 'BTC') {
          localStorage.setItem('currency', 3)
          localStorage.setItem('currencyType', 3)
          this.ChangeAmplitude = this.BTCChangeAmplitude
          localStorage.setItem('ChangeAmplitude', this.BTCChangeAmplitude)
        }
        // console.log(window.localStorage.getItem('currency'), window.localStorage.getItem('currencyType'))
        this.currency = Number(window.localStorage.getItem('currency'))
        this.currencyType = Number(window.localStorage.getItem('currencyType'))
        this.refreshInterface()
        // console.log(this.currency, this.currencyType)
      },
      mobileRefresh() {
        if (this.$route.query.currency === 'SIE') {
          this.currency = 1
          this.currencyType = 1
        } else if (this.$route.query.currency === 'ETH') {
          this.currency = 2
          this.currencyType = 2
        } else if (this.$route.query.currency === 'BTC') {
          this.currency = 3
          this.currencyType = 3
        }
        this.refreshInterface()
        this.getChangeAmplitude()
      },
      refreshInterface() {
        this.getOrderList()
        this.getBuySellListScrollTop()
        this.getBuySellList()
        this.getLineData()
        this.pollFn()
      },
      tosituation() {
        this.$router.push('/situation')
      },
      getMarkt() { // 获取行情列表
        this.$http.post(`${this.$api}/newCoinentrustRecord/market?type=1`).then((res) => {
          if (res.data.success === true) {
            this.marketList = res.data.data
            this.marketList.forEach((item) => {
              if (item.currency === 'SIE') {
                this.SIEChangeAmplitude = item.change
              } else if (item.currency === 'ETH') {
                this.ETHChangeAmplitude = item.change
              } else if (item.currency === 'BTC') {
                this.BTCChangeAmplitude = item.change
              }
              if (item.change > 0) {
                this.ChangeAmplitude = item.change
                this.classObject.isGreen = true
                this.classObject.isRed = false
                this.classObject.isNormal = false
                this.isChangeUPFlag = true
                this.isChangeFallingFlag = false
              } else if (item.change === 0) {
                this.ChangeAmplitude = item.change
                this.classObject.isNormal = true
                this.classObject.isGreen = false
                this.classObject.isRed = false
                this.isChangeUPFlag = true
                this.isChangeFallingFlag = false
              } else {
                this.ChangeAmplitude = item.change
                this.classObject.isRed = true
                this.classObject.isNormal = false
                this.classObject.isGreen = false
                this.isChangeUPFlag = false
                this.isChangeFallingFlag = true
              }
            })
            // console.log(this.ChangeAmplitude, this.$route.query.change !== '')
            if (this.currency === 1 || this.currency === '') {
              this.ChangeAmplitude = this.SIEChangeAmplitude
            } else if (this.currency === 2) {
              this.ChangeAmplitude = this.ETHChangeAmplitude
            } else if (this.currency === 3) {
              this.ChangeAmplitude = this.BTCChangeAmplitude
            }
            // console.log(this.ChangeAmplitude)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getChangeAmplitude() {
        if (this.$route.query.change !== '') {
          this.ChangeAmplitude = this.$route.query.change
          this.$store.dispatch('balance')
        }
      },
      changeK(index) {
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
      pollFn() {
        // console.log(this.loginFlag)
        if (this.LocalLoginFlag === true) {
          this.getLineData() // 绘制K线图
          this.getDeepLine() // 绘制深度图
          this.getBuySellList() // 获取买卖列表
          this.getrRealTime()
          this.getOrderList()
        } else {
          this.getLineData() // 绘制K线图
          this.getDeepLine() // 绘制深度图
          this.getBuySellList() // 获取买卖列表
          this.getrRealTime()
        }
      },
      // USD汇率
      getCurrencyRate() {
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
      // 未登录时不调用我的订单接口
      getOrderList() {
        let formData = new FormData()
        formData.append('pageSize', 8)
        formData.append('pageNo', 1)
        formData.append('currencyType', this.currency)
        this.$http.post(this.$api + '/newCoinentrustRecord/getRecord2', formData).then((res) => {
          if (res.data.success) {
            // console.log(res.data.data)
            this.fullscreenLoading = false
            if (res.data.data.results.length === 0) {
              this.noOrderListData = true
              this.orderList1 = []
              this.orderList2 = []
            } else {
              this.noOrderListData = false
              this.orderList = res.data.data.results
              let orderList1 = []
              let orderList2 = []
              for (let i = 0; i < this.orderList.length; i++) {
                if (i % 2 === 0 || i === 0) {
                  orderList1.push(this.orderList[i])
                } else {
                  orderList2.push(this.orderList[i])
                }
              }
              this.orderList1 = orderList1.slice(0, 4)
              this.orderList2 = orderList2.slice(0, 4)
              // console.log(this.orderList1, this.orderList2)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getBuySellListScrollTop() {
        let formData = new FormData()
        formData.append('pageSize', 100)
        formData.append('pageNo', 1)
        formData.append('currencyType', this.currencyType)
        this.$http.post(this.$api + '/newCoinentrustRecord/nowRecord2', formData).then((res) => {
          if (res.data.success) {
            this.nowOrderList = res.data.data
            // 限制长度，卖和买都只显示7条
            if (this.nowOrderList.sell.length > 50) {
              this.nowOrderList.sell.length = 50
            }
            if (this.nowOrderList.buy.length > 50) {
              this.nowOrderList.buy.length = 50
            }
            if (this.nowOrderList.sell.length > 0) {
              // console.log(19 * (this.nowOrderList.sell.length + this.nowOrderList.buy.length), document.getElementById('myPriceList').scrollTop)
              document.getElementById('myPriceList').scrollTop = 38 * (this.nowOrderList.sell.length) - 38 * 6 + 19
              document.getElementById('mobilePriceList').scrollTop = 38 * (this.nowOrderList.sell.length) - 38 * 5
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getBuySellList() {
        let formData = new FormData()
        formData.append('pageSize', 100)
        formData.append('pageNo', 1)
        formData.append('currencyType', this.currencyType)
        this.$http.post(this.$api + '/newCoinentrustRecord/nowRecord2', formData).then((res) => {
          if (res.data.success) {
            this.nowOrderList = res.data.data
            // 限制长度，卖和买都只显示7条
            if (this.nowOrderList.sell.length > 50) {
              this.nowOrderList.sell.length = 50
            }
            if (this.nowOrderList.buy.length > 50) {
              this.nowOrderList.buy.length = 50
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      chooseTabPc(val) {
        this.isLimitActive = val
        this.orderTotalTipShow = false
        this.buyOrderTotalTipShow = false
        this.sellOrderTotalTipShow = false
        this.sellNumTipShow = false
        this.sellPriceTipShow = false
        this.buyNumTipShow = false
        this.buyPriceTipShow = false
        this.sellNumTipShow = false
        this.orderTotalTipShow = false
        this.buyOrderTotalTipShow = false
        this.sellOrderTotalTipShow = false
        this.buyPriceTipShow = false
        this.buyNumTipShow = false
        this.sellPriceTipShow = false
        this.buyNum = ''
        this.buyPrice = ''
        this.sellNum = ''
        this.sellPrice = ''
        if (this.isLimitActive === 3) { // 此时切换的位置为限价Tab
          this.limitPrice = true
          this.marketPrice = false
        } else if (this.isLimitActive === 4) { // 此时切换的位置为市价Tab
          this.limitPrice = false
          this.marketPrice = true
        }
      },
      chooseTab(val) { // tab买入卖出切换
        this.isLimit = val
        this.orderTotalTipShow = false
        this.buyOrderTotalTipShow = false
        this.sellOrderTotalTipShow = false
        this.sellNumTipShow = false
        this.sellPriceTipShow = false
        this.buyNumTipShow = false
        this.buyPriceTipShow = false
        this.sellNumTipShow = false
        this.orderTotalTipShow = false
        this.buyOrderTotalTipShow = false
        this.sellOrderTotalTipShow = false
        this.buyPriceTipShow = false
        this.buyNumTipShow = false
        this.sellPriceTipShow = false
      },
      checkInput(field) {
        let val = this[field]
        if (window.localStorage.getItem('currency') === '3' || window.localStorage.getItem('currency') === '2') {
          if (!/^\d*\.{0,1}\d{0,8}$/.test(val)) { // BTC 不能输入特殊符号+-等,不能输入多个小数点，不能小数点后面超过8位小数
            this[field] = val.substring(0, val.length - 1)
          }
        } else {
          if (!/^\d*\.{0,1}\d{0,4}$/.test(val)) { // 不能输入特殊符号+-等,不能输入多个小数点，不能小数点后面超过4位小数
            this[field] = val.substring(0, val.length - 1)
          }
        }
        if (/^\./.test(this[field])) { // 如果是"."
          this[field] = ''
        }
        this[field] = this[field].replace(/[^0-9/.]/g, '') // 只能是数字或者.
      },
      splitData(rawData) {
        var categoryData = []
        let values = []
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0])
          values.push(rawData[i])
        }
        return {
          categoryData: categoryData,
          values: values
        }
      },
      refreshLine() {
        this.drawDeepLine()
        this.drawLine()
      },
      drawDeepLine() {
        var upColor = '#fc534c'
        // var upBorderColor = '#f3544f'
        var downColor = '#0ac88a'
        var that = this
        // var downBorderColor = '#48be64'
        let deepCharts = echarts.init(document.getElementById('deepCharts'))
        let mobileDeepEcharts = echarts.init(document.getElementById('mobileDeepEcharts'))
        deepCharts.setOption({
          title: {},
          legend: {
            data: [this.$t('newExchange.text12'), this.$t('newExchange.text13')],
            top: '3%'
          },
          toolbox: {
            // y: 'bottom',
            show: false,
            feature: {
              magicType: {},
              dataView: {},
              saveAsImage: {
                pixelRatio: 3
              }
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              var res = '<p> ' + params.seriesName + ' </br> ' + that.$t('invitedRecord.text9') + '：' + Number(params.value).toFixed(8) + ' </br> ' + that.$t('invitedRecord.text8') + '：' + Number(params.name).toFixed(8) + ' </p>'
              return res
            }
          },
          xAxis: {
            data: this.priceList,
            silent: false,
            splitLine: {
              show: false
            }
          },
          yAxis: [{}],
          series: [{
            name: this.$t('newExchange.text12'),
            type: 'bar',
            data: this.newBuyList,
            animationDelay: function (idx) {
              return idx * 10
            },
            lineStyle: {
              width: 1.5,
              opacity: 0.8
            },
            itemStyle: {
              normal: {
                color: downColor,
                color0: downColor,
                borderColor: downColor,
                opacity: 0.9,
                borderColor0: downColor
              }
            }
          },
            {
              name: this.$t('newExchange.text13'),
              type: 'bar',
              data: this.newSellList,
              animationDelay: function (idx) {
                return idx * 10 + 100
              },
              lineStyle: {
                width: 1.5,
                opacity: 0.8
              },
              barGap: '0%',
              barCategoryGap: '0%',
              itemStyle: {
                normal: {
                  color: upColor,
                  color0: upColor,
                  borderColor: upColor,
                  opacity: 0.9,
                  borderColor0: upColor
                }
              }
            }],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
            return idx * 5
          }
        })
        mobileDeepEcharts.setOption({
          title: {},
          legend: {
            data: [this.$t('newExchange.text12'), this.$t('newExchange.text13')],
            top: '3%'
          },
          toolbox: {
            // y: 'bottom',
            show: false,
            feature: {
              magicType: {},
              dataView: {},
              saveAsImage: {
                pixelRatio: 3
              }
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              var res = '<p> ' + params.seriesName + ' </br> ' + that.$t('invitedRecord.text9') + '：' + Number(params.value).toFixed(8) + ' </br> ' + that.$t('invitedRecord.text8') + '：' + Number(params.name).toFixed(8) + ' </p>'
              return res
            }
          },
          xAxis: {
            data: this.priceList,
            silent: false,
            // name: '价格 (SIE)',
            splitLine: {
              show: false
            }
          },
          yAxis: [{}],
          series: [{
            name: this.$t('newExchange.text12'),
            type: 'bar',
            data: this.newBuyList,
            animationDelay: function (idx) {
              return idx * 10
            },
            lineStyle: {
              width: 1.5,
              opacity: 0.8
            },
            itemStyle: {
              normal: {
                color: downColor,
                color0: downColor,
                borderColor: downColor,
                opacity: 0.9,
                borderColor0: downColor
              }
            }
          },
            {
              name: this.$t('newExchange.text13'),
              type: 'bar',
              data: this.newSellList,
              animationDelay: function (idx) {
                return idx * 10 + 100
              },
              lineStyle: {
                width: 1.5,
                opacity: 0.8
              },
              barGap: '0%',
              barCategoryGap: '0%',
              itemStyle: {
                normal: {
                  color: upColor,
                  color0: upColor,
                  borderColor: upColor,
                  opacity: 0.9,
                  borderColor0: upColor
                }
              }
            }],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
            return idx * 5
          }
        })
        window.onresize = function () {
          deepCharts.resize()
          mobileDeepEcharts.resize()
        }
      },
      getDeepLine() {
        document.getElementById('deepCharts').style.height = (document.body.offsetHeight - 120) + 'px' // k线图高度
        document.getElementById('mobileDeepEcharts').style.height = (document.body.offsetHeight - 120) / 2 + 'px' // k线图高度
        document.getElementById('deepCharts').style.background = '#fff' // k线图高度
        // console.log((document.body.offsetWidth - 400) / 2 + 'px')
        this.$http.post(`${this.$api}/newCoinentrustRecord/getDepthData?currency=${this.currency}`).then((res) => {
          // let price3 = []
          let objSell = []
          let objBuy = []
          if (res.data.success) {
            res.data.data.buy.forEach(item => {
              let obj1 = {}
              obj1.price = item.price
              obj1.amount = item.amount
              obj1.type = item.etype
              objSell.push(obj1)
            })
            // // 获得sell中price和amount对象
            res.data.data.sell.forEach(item => {
              let obj2 = {}
              obj2.price = item.price
              obj2.amount = item.amount
              obj2.type = item.etype
              objBuy.push(obj2)
            })
            /* eslint-disable */
            let priceList = [...objSell, ...objBuy]
            let hash = {}
            priceList = priceList.reduce(function (item, next) {
              hash[next.price] ? '' : hash[next.price] = true && item.push(next)
              return item
            }, [])
            let pArr = []
            let newBuyList = []
            let newSellList = []
            let obj = priceList.sort(this.sortId)
            obj.forEach(item => {
              pArr.push(item.price)
              if (item.type === 1) {
                newBuyList.push(item.amount)
                newSellList.push('')
              } else {
                newBuyList.push('')
                newSellList.push(item.amount)
              }
            })
            this.priceList = pArr
            this.newBuyList = newBuyList
            this.newSellList = newSellList
            this.drawDeepLine()
          }
        })
      },
      sortId(obj1, obj2) {
        var val1 = obj1.price
        var val2 = obj2.price
        if (val1 < val2) {
          return -1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      },
      getrRealTime() {
        // let formData = new FormData()
        // formData.append('pageSize', 10)
        // formData.append('pageNo', 1)
        this.$http.post(`${this.$api}/newCoinentrustRecord/getRealTimeData?currency=${this.currency}`).then((res) => {
          if (res.data.success) {
            this.realTimeList = res.data.data.slice(0, 500)
          }
        })
      },
      drawLine() {
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
            left: '9%',
            right: '3%',
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
                str += `${that.$t('exchange.tooltips')[index]}: ${item.toFixed(8)}<br/>`
              })
              return str
            }
          }
        })
        mEcharts.setOption({
          grid: {
            top: '5%',
            left: '18%',
            right: '6%',
            bottom: '15%'
          },
          legend: {
            width: '100%'
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
      getLineData() {
        document.getElementById('mEcharts').style.height = (document.body.offsetWidth - 40) / 2 + 'px' // k线图高度
        this.$http.post(`${this.$api}/newCoinentrustRecord/queryTradeKLine?type=${this.type}&currency=${this.currency}`).then((res) => {
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
            // console.log(this.nowPrice)
          }
        }).catch(() => {
          // console.log(err)
        })
      },
      /*
      *function buySellFun(str, type, val)
      * str 为pc或移动的标识 ('pc'为pc端 'ph'为移动端)
      * type 为限价或市价的标识 (1.为市价 2.为限价)
      * val 为买入或卖出的标识 (1.为买入 2.为卖出)
      */
      buySellFun(str, type, val) {
        if (this.userInfo.length !== 0) { // 用户为登陆状态
          if (type === 2 && val === 1) { // 限价买入
            this.isLimit = 3
            this.buySellFlag = 1
            if (!this.buyPrice) { // 未填写买入价格
              this.buyPriceTipShow = true
              return
            } else if (!this.buyNum) { // 未填写买入数量
              this.buyNumTipShow = true
              return
            }
            if (this.orderTotal > this.userBalanceUSD) { // 超过USD{{$t('sieMoney.text2')}}
              this.buySellPopupFlag = false // 隐藏手机买入/卖出弹框
              this.balanceNotEnoughDialog = true
              return
            }
            if (this.sellNum > this.userBalanceSIE) { // 超过SIE{{$t('sieMoney.text2')}}
              this.sellOrderTotalTipShow = true
              setTimeout(() => {
                this.sellOrderTotalTipShow = false
              }, 1500)
              return
            }
          } else if (type === 2 && val === 2) { // 限价卖出
            this.isLimit = 3
            this.buySellFlag = 2
            if (!this.sellPrice) { // 未填写卖出价格
              this.sellPriceTipShow = true
              return
            } else if (!this.sellNum) { // 未填写卖出金额
              this.sellNumTipShow = true
              return
            }
            if (this.sellNum > this.userBalanceSIE) { // 超过SIE{{$t('sieMoney.text2')}}
              this.buyOrderTotalTipShow = true
              setTimeout(() => {
                this.buyOrderTotalTipShow = false
              }, 1500)
              return
            }
          } else if (type === 1 && val === 1) { // 市价买入
            this.isLimit = 4
            this.buySellFlag = 1
            if (!this.buyNum) { // 未填写买入数量
              this.buyNumTipShow = true
              return
            } else if (this.sellNum > this.userBalanceSIE) {
              this.sellOrderTotalTipShow = true
              setTimeout(() => {
                this.sellOrderTotalTipShow = false
              }, 1500)
              return
            }
          } else if (type === 1 && val === 2) { // 市价卖出
            this.isLimit = 4
            this.buySellFlag = 2
            if (!this.sellNum) {
              this.sellNumTipShow = true
              setTimeout(() => {
                this.buyOrderTotalTipShow = false
              }, 1500)
              return
            }
          }
        } else {
          // this.errorText = '请登录后再进行交易'
        }
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
      },
      confirmPay() {
        if (this.loadingConfim) { // 如果正在提交，返回
          return
        }
        if (this.needCode && (!this.payPassword || !this.payCode)) { // 如果正在需要验证码和交易密码，又没填，返回
          return
        }
        let formData = new FormData()
        if (this.buySellFlag === 1) { // 买入
          if (this.isLimit === 3) { // 限价买入
            this.loadingConfim = true
            formData.append('type', 1)
            formData.append('etype', 2)
            formData.append('amount', this.buyNum)
            formData.append('price', this.buyPrice)
            formData.append('currencyType', this.currency)
            this.loadingConfim = false
          } else if (this.isLimit === 4) { // 市价买入
            this.loadingConfim = true
            formData.append('type', 1)
            formData.append('etype', 1)
            formData.append('amount', this.buyNum)
            formData.append('price', '')
            formData.append('currencyType', this.currency)
            this.loadingConfim = false
          }
        } else if (this.buySellFlag === 2) { // 卖出
          if (this.isLimit === 3) { // 限价卖出
            this.loadingConfim = true
            formData.append('etype', 2)
            formData.append('type', 2)
            formData.append('amount', this.sellNum)
            formData.append('price', this.sellPrice)
            formData.append('currencyType', this.currency)
            this.loadingConfim = false
          } else if (this.isLimit === 4) { // 市价卖出
            this.loadingConfim = true
            formData.append('etype', 1)
            formData.append('type', 2)
            formData.append('amount', this.sellNum)
            formData.append('price', '')
            formData.append('currencyType', this.currency)
            this.loadingConfim = false
          }
        }// formData.append('type', this.buySellFlag)

        if (this.needCode) {
          formData.append('tradePwd', this.payPassword)
          formData.append('code', this.payCode)
        } else {
          formData.append('tradePwd', 'unlock')
          formData.append('code', 'unlock')
        }
        let ajaxLang = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang = 'en'
        }
        this.$http.post(this.$api + '/newCoinentrustRecord/createRecord', formData, {headers: {'secret-language': ajaxLang}}).then((res) => {
          this.payDialog = false
          this.loadingConfim = false
          if (res.data.success) {
            // 支付完成后重新请求账户和订单信息，清空input字段
            this.$store.dispatch('balanceAction')
            if (this.LocalLoginFlag === 'true') {
              this.getOrderList()
            }
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
      allBuy() {
        if (this.buySellFlag === 1) {
          if (!this.buyPrice) {
            this.buyPriceTipShow = true
          } else {
            this.buyNum = parseFloat(this.userBalanceUSD / this.buyPrice).toFixed(8)
          }
        }
      },
      allSell() {
        if (this.buySellFlag === 1) {
          this.sellNum = parseFloat(this.userBalanceSIE).toFixed(8)
        }
      },
      showMobPopup(val) {
        if (this.userInfo.length === 0) {
          this.loginPopupFlag = true
          this.buySellFlag = 1
        } else {
          this.buySellPopupFlag = true
          if (val === 1) {
            this.buySellFlag = 1
          } else if (val === 2) {
            this.buySellFlag = 2
          }
        }
      },
      // 支付验证弹窗
      closePopup() {
        if (this.LocalLoginFlag === 'false') {
          this.$router.push('/login')
        } else {
          if (this.userInfo.openGoogleCode !== 2) {
            this.$router.push('/account/safettingCenter')
          }
        }
        this.payPassword = ''
        this.payCode = ''
        this.recommendName = ''
        this.showFlag = false
      },
      // 关闭img x
      closeIcon() {
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
      errCloseDialog() {
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
      closeVerDialog() {
        this.duanXianDialog = false
        this.duanxinMsg = ''
        this.payDialog = true
      },

      // 发送验证码
      sendCode() {
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
      countDown() {
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
