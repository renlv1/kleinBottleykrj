<template>
  <div class="sieTransfer">
    <div class="pc">
      <div class="pc-content">
        <div class="property-title">
          <h6>{{$t('sieMoney.text3')}}</h6>
        </div>
        <div class="padding-tab">
          <div class="transfer-title">
            <span>{{$t('newAdd.text14')}}:</span>
          </div>
          <div class="inputBox inputTipBox-select">
            <input class="transfer-input  select-input" type="text" readonly disabled :placeholder="currencyValue">
            <a class="discount-btn" ref="discountBtn" @click="currencySelectShow = !currencySelectShow">
              <i class="arrowDown" :class="{arrowActive: currencySelectShow}"></i>
            </a>
            <ul class="selectMenu" :class="{currency: currencySelectShow}">
              <li :class="{liActive: currentIndex === index}" v-for="(item, index) in currencyType" :key="item.name"
                  @click="chooseCurrency(item.name, index)">{{item.name}}
              </li>
            </ul>
          </div>
        </div>
        <!--SIE转账-->
        <div class="SIE-transfer" v-if="tabTwoIndex === 0">
          <div class="transfer-account">
            <div class="transfer-title">
              <span>{{$t('sieTransfer.text1')}}:</span>
            </div>
            <div class="inputBox inputTipBox-select">
              <input class="transfer-input  select-input" type="text" readonly disabled :placeholder="transferValue">
              <a class="discount-btn" ref="discountBtn" @click="transferSelectShow = !transferSelectShow">
                <i class="arrowDown" :class="{arrowActive: transferSelectShow}"></i>
              </a>
              <ul class="selectMenu" :class="{selectMenuActive: transferSelectShow}">
                <li :class="{liActive: transferIndex === index}" v-for="(item, index) in transferType" :key="item.name"
                    @click="chooseTransfer(item.name, index)">{{item.name}}
                </li>
              </ul>
            </div>
          </div>
          <div class="transfer-account">
            <div class="transfer-title">
              <span>{{$t('sieTransfer.text2')}}:</span>
            </div>
            <div class="inputBox common-inputBox">
              <input v-if="transferIndex === 0" class="transfer-input common-input" type="text"
                     v-model.trim="transferAddress" ref="inputOne" :placeholder="$t('sieTransfer.text3')"
                     @focus="focusInput(1)">
              <input v-if="transferIndex === 1" class="transfer-input common-input" type="text"
                     v-model.trim="transferAddress" ref="inputThird" :placeholder="$t('sieTransfer.text3')"
                     @focus="focusInput(1)">
            </div>
            <span class="inputTipMsg" v-if="addressTip">{{addressMsg}}</span>
          </div>
          <div class="transfer-account">
            <div class="transfer-title" v-if="userBalanceSIE > -1">
              <span v-if="transferIndex === 0">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE | fourNumber}} SIE)</span>
              <span v-if="transferIndex === 1">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE | fourNumber}} SIE)</span>
            </div>
            <div class="inputBox common-inputBox">
              <input class="transfer-input common-input " type="text" v-model.trim="transferMoney"
                     @input="checkTransferMoney" :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
          <p class="fee" v-if="transferIndex === 1">
            {{$t('sieTransfer.text7')}}: <span style="color: #FC534C">{{feeNumber | fourNumber}} SIE</span>
            <span>,{{$t('sieTransfer.text9')}}：<span style="color: #FC534C">{{getPaySum | fourNumber}} SIE</span></span>
          </p>
        </div>
        <!--USD转账-->
        <div class="USD-transfer" v-if="tabTwoIndex === 1">
          <div class="transfer-account">
            <div class="transfer-title">
              <span>{{$t('sieMoney.text14')}}:</span>
            </div>
            <div class="inputBox common-inputBox">
              <input class="transfer-input common-input" type="text" v-model.trim="transferAddress" ref="inputOne"
                     :placeholder="$t('sieTransfer.text15')" @focus="focusInput(1)">
            </div>
            <span class="inputTipMsg" v-if="addressTip">{{addressMsg}}</span>
          </div>
          <div class="transfer-account">
            <div class="transfer-title">
              <span>{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceUSD}} USD)</span>
            </div>
            <div class="inputBox common-inputBox">
              <input class="transfer-input common-input " type="text" v-model.trim="transferMoney"
                     @input="checkTransferMoney" :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
        </div>
        <!-- ETH转账 -->
        <div class="ETH-transfer" v-if="tabTwoIndex === 2">
          <div class="transfer-account">
            <div class="transfer-title">
              <span>{{$t('sieTransfer.text1')}}:</span>
            </div>
            <div class="inputBox inputTipBox-select">
              <input class="transfer-input  select-input" type="text" readonly disabled :placeholder="transferValue">
              <a class="discount-btn" ref="discountBtn" @click="transferSelectShow = !transferSelectShow">
                <i class="arrowDown" :class="{arrowActive: transferSelectShow}"></i>
              </a>
              <ul class="selectMenu" :class="{selectMenuActive: transferSelectShow}">
                <li :class="{liActive: transferIndex === index}" v-for="(item, index) in transferType" :key="item.name"
                    @click="chooseTransfer(item.name, index)">{{item.name}}
                </li>
              </ul>
            </div>
          </div>
          <div class="transfer-account">
            <div class="transfer-title">
              <span>{{$t('sieTransfer.text2')}}:</span>
            </div>
            <div class="inputBox common-inputBox">
              <input v-if="transferIndex === 0" class="transfer-input common-input" type="text"
                     v-model.trim="transferAddress" ref="inputOne" :placeholder="$t('sieTransfer.text3')"
                     @focus="focusInput(1)">
              <input v-if="transferIndex === 1" class="transfer-input common-input" type="text"
                     v-model.trim="transferAddress" ref="inputThird" :placeholder="$t('sieTransfer.text3')"
                     @focus="focusInput(1)">
            </div>
            <span class="inputTipMsg" v-if="addressTip">{{addressMsg}}</span>
          </div>
          <div class="transfer-account">
            <div class="transfer-title" v-if="userBalanceETH > -1">
              <span v-if="transferIndex === 0">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceETH.toFixed(8)}} ETH)</span>
              <span v-if="transferIndex === 1">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceETH.toFixed(8)}} ETH)</span>
            </div>
            <div class="inputBox common-inputBox">
              <input class="transfer-input common-input " type="text" v-model.trim="transferMoney"
                     @input="checkTransferMoney" :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
          <p class="fee" v-if="transferIndex === 1">
            {{$t('sieTransfer.text7')}}: <span style="color: #FC534C">{{feeNumber1 | eightNumber}} ETH</span>
            <span>,{{$t('sieTransfer.text9')}}：<span
              style="color: #FC534C">{{getPaySum1}} ETH</span></span>
          </p>
        </div>
        <!-- BTC转账 -->
        <div class="ETH-transfer" v-if="tabTwoIndex === 3">
          <div class="transfer-account">
            <div class="transfer-title">
              <span>{{$t('sieTransfer.text1')}}:</span>
            </div>
            <div class="inputBox inputTipBox-select">
              <input class="transfer-input  select-input" type="text" readonly disabled :placeholder="transferValue">
              <a class="discount-btn" ref="discountBtn" @click="transferSelectShow = !transferSelectShow">
                <i class="arrowDown" :class="{arrowActive: transferSelectShow}"></i>
              </a>
              <ul class="selectMenu" :class="{selectMenuActive: transferSelectShow}">
                <li :class="{liActive: transferIndex === index}" v-for="(item, index) in transferType" :key="item.name"
                    @click="chooseTransfer(item.name, index)">{{item.name}}
                </li>
              </ul>
            </div>
          </div>
          <div class="transfer-account">
            <div class="transfer-title">
              <span>{{$t('sieTransfer.text2')}}:</span>
            </div>
            <div class="inputBox common-inputBox">
              <input v-if="transferIndex === 0" class="transfer-input common-input" type="text"
                     v-model.trim="transferAddress" ref="inputOne" :placeholder="$t('sieTransfer.text3')"
                     @focus="focusInput(1)">
              <input v-if="transferIndex === 1" class="transfer-input common-input" type="text"
                     v-model.trim="transferAddress" ref="inputThird" :placeholder="$t('sieTransfer.text3')"
                     @focus="focusInput(1)">
            </div>
            <span class="inputTipMsg" v-if="addressTip">{{addressMsg}}</span>
          </div>
          <div class="transfer-account">
            <div class="transfer-title" v-if="userBalanceBTC > -1">
              <span v-if="transferIndex === 0">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceBTC.toFixed(8)}} BTC)</span>
              <span v-if="transferIndex === 1">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceBTC.toFixed(8)}} BTC)</span>
            </div>
            <div class="inputBox common-inputBox">
              <input class="transfer-input common-input " type="text" v-model.trim="transferMoney"
                     @input="checkTransferMoneyBTC" :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
          <p class="fee" v-if="transferIndex === 1">
            {{$t('sieTransfer.text7')}}: <span style="color: #FC534C">{{getBTCFree > 0 ? getBTCFree : '0.00000000' | eightNumber}} BTC</span>
            <span>,{{$t('sieTransfer.text9')}}：<span
              style="color: #FC534C">{{getBTCAll > 0 ? getBTCAll : '0.00000000' | eightNumber}} BTC</span></span>
          </p>
        </div>
        <button class="sure-btn" @click="confirm()">{{$t('sieTransfer.text10')}}</button>
      </div>
    </div>
    <!--移动端结构-->
    <div class="mobile">
      <div class="management-head">
        <div class="head">
          <div class="back" @click="$router.go(-1)"></div>
          <div class="title">{{$t('sieMoney.text3')}}</div>
          <div class="right"></div>
        </div>
      </div>
      <ul class="mobile-tab">
        <!--<li :class="{tabActive: tabTwoIndex === 0}" @click="changeType(0)">SIE{{$t('sieMoney.text3')}}</li>-->
        <!--<li :class="{tabActive: tabTwoIndex === 1}" @click="changeType(1)">USD{{$t('sieMoney.text3')}}</li>-->
        <!--<li :class="{tabActive: tabTwoIndex === 2}" @click="changeType(2)">ETH{{$t('sieMoney.text3')}}</li>-->
        <div class="transfer-title">
          <span>{{$t('newAdd.text3')}}:</span>
        </div>
        <div class="inputBox inputTipBox-select">
          <input class="transfer-input  select-input" type="text" readonly disabled :placeholder="currencyValue">
          <a class="discount-btn" ref="discountBtn" @click="currencySelectShow = !currencySelectShow">
            <i class="arrowDown" :class="{arrowActive: currencySelectShow}"></i>
          </a>
          <ul class="selectMenu" :class="{currency: currencySelectShow}">
            <li :class="{liActive: currentIndex === index}" v-for="(item, index) in currencyType" :key="item.name"
                @click="chooseCurrency(item.name, index)">{{item.name}}
            </li>
          </ul>
        </div>
      </ul>
      <div class="transfer-content">
        <div class="mobile-SIE" v-if="tabTwoIndex === 0">
          <div class="transfer-type">
            <div class="type-title">{{$t('sieTransfer.text1')}}:</div>
            <div class="type-box first-input">
              <input class="input-type" type="text" readonly disabled :placeholder="transferValue">
              <a class="type-btn" @click="transferSelectShow = !transferSelectShow">
                <i class="arrowDown" :class="{arrowActive: transferSelectShow}"></i>
              </a>
              <ul class="selectMenu" :class="{selectMenuActive: transferSelectShow}">
                <li :class="{liActive: transferIndex === index}" v-for="(item,index) in transferType" :key="item.index"
                    @click="chooseTransfer(item.name, index)">{{item.name}}
                </li>
              </ul>
            </div>
          </div>
          <div class="transfer-type">
            <div class="type-title">
              <span>{{$t('sieTransfer.text2')}}:</span>
            </div>
            <div class="type-box">
              <input v-if="transferIndex === 0" class="input-mobile " type="text" v-model.trim="transferAddress"
                     :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
              <input v-if="transferIndex === 1" class="input-mobile " type="text" v-model.trim="transferAddress"
                     ref="inputThird" :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
            </div>
            <p class="inputTipMsg" v-if="addressTip">{{addressMsg}}</p>
          </div>
          <div class="transfer-type">
            <div class="type-title" v-if="userBalanceSIE > -1">
              <span v-if="transferIndex === 0">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE.toFixed(4)}} SIE)</span>
              <span v-if="transferIndex === 1">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceSIE.toFixed(4)}} SIE)</span>
            </div>
            <div class="type-box">
              <input class="input-mobile " type="text" v-model.trim="transferMoney" @input="checkTransferMoney"
                     :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
          <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text11')}}: <span style="color: #FC534C">{{feeNumber | fourNumber}} SIE</span>
          </p>
          <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text12')}}：<span style="color: #FC534C">{{getPaySum | fourNumber}} SIE</span>
          </p>
        </div>
        <div class="mobile-USD" v-if="tabTwoIndex === 1 ">
          <div class="transfer-type">
            <div class="type-title">
              <span>{{$t('sieMoney.text14')}}:</span>
            </div>
            <div class="type-box">
              <input class="input-mobile " type="text" v-model.trim="transferAddress"
                     :placeholder="$t('sieTransfer.text15')" @focus="focusInput(1)">
            </div>
            <p class="inputTipMsg" v-if="addressTip">{{addressMsg}}</p>
          </div>
          <div class="transfer-type">
            <div class="type-title">
              <span>{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceUSD}} USD)</span>
            </div>
            <div class="type-box">
              <input class="input-mobile " type="text" v-model.trim="transferMoney" @input="checkTransferMoney"
                     :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
        </div>
        <div class="mobile-ETH" v-if="tabTwoIndex === 2">
          <div class="transfer-type">
            <div class="type-title">{{$t('sieTransfer.text1')}}:</div>
            <div class="type-box first-input">
              <input class="input-type" type="text" readonly disabled :placeholder="transferValue">
              <a class="type-btn" @click="transferSelectShow = !transferSelectShow">
                <i class="arrowDown" :class="{arrowActive: transferSelectShow}"></i>
              </a>
              <ul class="selectMenu" :class="{selectMenuActive: transferSelectShow}">
                <li :class="{liActive: transferIndex === index}" v-for="(item,index) in transferType" :key="item.index"
                    @click="chooseTransfer(item.name, index)">{{item.name}}
                </li>
              </ul>
            </div>
          </div>
          <div class="transfer-type">
            <div class="type-title">
              <span>{{$t('sieTransfer.text2')}}:</span>
            </div>
            <div class="type-box">
              <input v-if="transferIndex === 0" class="input-mobile " type="text" v-model.trim="transferAddress"
                     :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
              <input v-if="transferIndex === 1" class="input-mobile " type="text" v-model.trim="transferAddress"
                     ref="inputThird" :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
            </div>
            <p class="inputTipMsg" v-if="addressTip">{{addressMsg}}</p>
          </div>
          <div class="transfer-type">
            <div class="type-title" v-if="userBalanceETH > -1">
              <span v-if="transferIndex === 0">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceETH}} ETH)</span>
              <span v-if="transferIndex === 1">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceETH}} ETH)</span>
            </div>
            <div class="type-box">
              <input class="input-mobile " type="text" v-model.trim="transferMoney" @input="checkTransferMoney"
                     :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
          <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text11')}}: <span style="color: #FC534C">{{feeNumber1 | eightNumber}} ETH</span>
          </p>
          <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text12')}}：<span style="color: #FC534C">{{getPaySum1}} ETH</span>
          </p>
        </div>
        <div class="mobile-BTC" v-if="tabTwoIndex === 3">
          <div class="transfer-type">
            <div class="type-title">{{$t('sieTransfer.text1')}}:</div>
            <div class="type-box first-input">
              <input class="input-type" type="text" readonly disabled :placeholder="transferValue">
              <a class="type-btn" @click="transferSelectShow = !transferSelectShow">
                <i class="arrowDown" :class="{arrowActive: transferSelectShow}"></i>
              </a>
              <ul class="selectMenu" :class="{selectMenuActive: transferSelectShow}">
                <li :class="{liActive: transferIndex === index}" v-for="(item,index) in transferType" :key="item.index"
                    @click="chooseTransfer(item.name, index)">{{item.name}}
                </li>
              </ul>
            </div>
          </div>
          <div class="transfer-type">
            <div class="type-title">
              <span>{{$t('sieTransfer.text2')}}:</span>
            </div>
            <div class="type-box">
              <input v-if="transferIndex === 0" class="input-mobile " type="text" v-model.trim="transferAddress"
                     :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
              <input v-if="transferIndex === 1" class="input-mobile " type="text" v-model.trim="transferAddress"
                     ref="inputThird" :placeholder="$t('sieTransfer.text3')" @focus="focusInput(1)">
            </div>
            <p class="inputTipMsg" v-if="addressTip">{{addressMsg}}</p>
          </div>
          <div class="transfer-type">
            <div class="type-title" v-if="userBalanceBTC > -1">
              <span v-if="transferIndex === 0">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceBTC}} BTC)</span>
              <span v-if="transferIndex === 1">{{$t('sieTransfer.text4')}}: {{$t('sieTransfer.text5')}}: {{userBalanceBTC}} BTC)</span>
            </div>
            <div class="type-box">
              <input class="input-mobile " type="text" v-model.trim="transferMoney" @input="checkTransferMoneyBTC"
                     :placeholder="$t('sieTransfer.text6')" @focus="focusInput(2)">
            </div>
            <p class="inputTipMsg" v-if="moneyTip">{{$t('sieTransfer.text6')}}</p>
          </div>
          <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text11')}}: <span style="color: #FC534C">{{getBTCFree > 0 ? getBTCFree : '0.00000000' | eightNumber}} BTC</span>
          </p>
          <p class="fee" v-if="transferIndex === 1">{{$t('sieTransfer.text12')}}：<span style="color: #FC534C">{{getBTCAll > 0 ? getBTCAll : '0.00000000' | eightNumber}} BTC</span>
          </p>
        </div>
        <button class="sure-btn" @click="confirm()">{{$t('sieTransfer.text10')}}</button>
      </div>
    </div>
    <!--确定弹窗-->
    <div class="myPopup" v-show="payPopupShow">
      <div class="myPopup-box">
        <a class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></a>
        <div class="formDiv">
          <h3 class="title">{{$t('dialog.text14')}}{{receiveUser}}{{$t('dialog.text15')}}</h3>
          <input class="payPassword tradingCenter-input" type="password" v-model.trim="payPassword" value=""
                 :placeholder="$t('dialog.text2')">
          <div class="shortMsg" v-show="!isgogoleDuanxin">
            <div class="payMsg-box">
              <input class="payMsg tradingCenter-input" v-model.trim="payCode" :placeholder="$t('dialog.text4')"
                     type="text" value="">
            </div>
          </div>
          <div class="errmsg-tips">{{payFailTip}}</div>
<!--          <button class="tradingCenter-btn pay-btn" @click="confirmPay()" v-if="tabTwoIndex === 0">-->
<!--            {{$t('dialog.text5')}}-->
<!--          </button>-->
<!--          <button class="tradingCenter-btn pay-btn" @click="usdConfirmPay()" v-if="tabTwoIndex === 1">-->
<!--            {{$t('dialog.text5')}}-->
<!--          </button>-->
<!--          <button class="tradingCenter-btn pay-btn" @click="ETHConfirmPay()" v-if="tabTwoIndex === 2">-->
<!--            {{$t('dialog.text5')}}-->
<!--          </button>-->
<!--          <button class="tradingCenter-btn pay-btn" @click="BTCConfirmPay()" v-if="tabTwoIndex === 3">-->
<!--            {{$t('dialog.text5')}}-->
<!--          </button>-->
          <div class="tradingCenter-btn pay-btn" @click="confirmPay" :class="{disable: loadingConfim0}"  v-if="tabTwoIndex === 0">
            <div class="btn-w" v-show="loadingConfim0">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>

          <div class="tradingCenter-btn pay-btn" @click="usdConfirmPay" :class="{disable: loadingConfim1}"  v-if="tabTwoIndex === 1">
            <div class="btn-w" v-show="loadingConfim1">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>

          <div class="tradingCenter-btn pay-btn" @click="ETHConfirmPay" :class="{disable: loadingConfim2}"  v-if="tabTwoIndex === 2">
            <div class="btn-w" v-show="loadingConfim2">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>

          <div class="tradingCenter-btn pay-btn" @click="BTCConfirmPay" :class="{disable: loadingConfim3}"  v-if="tabTwoIndex === 3">
            <div class="btn-w" v-show="loadingConfim3">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>

        </div>
      </div>
    </div>
    <div class="myPopup" v-show="payPopupShow1">
      <div class="myPopup-box">
        <a class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></a>
        <div class="formDiv">
          <h3 class="title">{{$t('dialog.text15')}}</h3>
          <input class="payPassword tradingCenter-input" type="password" v-model.trim="payPassword" value=""
                 :placeholder="$t('dialog.text2')">
          <div class="shortMsg">
            <div class="payMsg-box">
              <input class="payMsg tradingCenter-input" v-model.trim="payCode" :placeholder="$t('dialog.text4')"
                     type="text" value="">
            </div>
          </div>
          <div class="errmsg-tips">{{payFailTip}}</div>
<!--          <button class="tradingCenter-btn pay-btn" @click="confirmPay()" v-if="tabTwoIndex === 0">-->
<!--            {{$t('dialog.text5')}}-->
<!--          </button>-->
          <div class="tradingCenter-btn pay-btn" @click="confirmPay" :class="{disable: loadingConfim0}"  v-if="tabTwoIndex === 0">
            <div class="btn-w" v-show="loadingConfim0">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>

          <div class="tradingCenter-btn pay-btn" @click="usdConfirmPay" :class="{disable: loadingConfim1}"  v-if="tabTwoIndex === 1">
            <div class="btn-w" v-show="loadingConfim1">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>

          <div class="tradingCenter-btn pay-btn" @click="ETHConfirmPay" :class="{disable: loadingConfim2}"  v-if="tabTwoIndex === 2">
            <div class="btn-w" v-show="loadingConfim2">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>

          <div class="tradingCenter-btn pay-btn" @click="BTCConfirmPay" :class="{disable: loadingConfim3}"  v-if="tabTwoIndex === 3">
            <div class="btn-w" v-show="loadingConfim3">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>

<!--          <button class="tradingCenter-btn pay-btn" @click="usdConfirmPay()" v-if="tabTwoIndex === 1">-->
<!--            {{$t('dialog.text5')}}-->
<!--          </button>-->
<!--          <button class="tradingCenter-btn pay-btn" @click="ETHConfirmPay()" v-if="tabTwoIndex === 2">-->
<!--            {{$t('dialog.text5')}}-->
<!--          </button>-->
<!--          <button class="tradingCenter-btn pay-btn" @click="BTCConfirmPay()" v-if="tabTwoIndex === 3">-->
<!--            {{$t('dialog.text5')}}-->
<!--          </button>-->
        </div>
      </div>
    </div>
    <!--完成弹窗-->
    <div class="myPopup" v-show="confirmShow">
      <div class="myPopup-box">
        <a class="close" @click="successClose"><img src="../../../../assets/images/myAccount/myDon/delete.svg"
                                                    alt=""></a>
        <!--支付成功弹窗-->
        <div v-show="isSuccess">
          <h3 class="title">{{$t('dialog.text6')}}</h3>
          <button class="tradingCenter-btn" @click="successPay">{{$t('dialog.text5')}}</button>
        </div>
        <!--支付失败弹窗-->
        <div v-show="!isSuccess">
          <h3 class="title">{{$t('dialog.text7')}}</h3>
          <div class="errinMsg">{{errinMsgText}}</div>
          <button class="tradingCenter-btn" @click="failedDialog">{{$t('dialog.text5')}}</button>
        </div>
      </div>
    </div>
    <!-- 未设置验证码-->
    <div class="myPopup" v-if="setSafeVerific">
      <div class="myPopup-box">
        <div class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt="">
        </div>
        <p class="error-text">{{$t('dialog.text8')}}</p>
        <div class="tradingCenter-btn mobile-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>
        <div class="tradingCenter-btn pc-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>
      </div>
    </div>
    <div class="myPopup" v-show="emailPrefixShow">
      <div class="myPopup-box">
        <a class="close" @click="closeIcon"><img src="../../../../assets/images/myAccount/myDon/delete.svg" alt=""></a>
        <div class="formDiv">
          <h3 class="title">{{$t('dialog.text16')}}</h3>
          <input class="payPassword tradingCenter-input" type="text" v-model.trim="emailPrefix" value=""
                 :placeholder="$t('dialog.text17')">
          <div class="errmsg-tips">{{payFailTip}}</div>
<!--          <button class="tradingCenter-btn pay-btn" @click="confirmEmail()">{{$t('dialog.text5')}}</button>-->
          <div class="tradingCenter-btn pay-btn" @click="confirmEmail" :class="{disable: loadingConfim5}">
            <div class="btn-w" v-show="loadingConfim5">
              <div class="img-box">
                <img src="../../../../assets/images/aiChat/loading.gif" alt="">
              </div>
            </div>
            <span>{{$t('dialog.text5')}}</span>
          </div>

        </div>
      </div>
    </div>
    <!--请先绑定手机号码-->
    <!--<div class="myPopup" v-show="noBindPhoneShow">-->
    <!--<div class="myPopup-box">-->
    <!--<h3 class="error-text">{{$t('dialog.text9')}}</h3>-->
    <!--<div class="tradingCenter-btn mobile-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>-->
    <!--<div class="tradingCenter-btn pc-btn" @click="gotoSafe">{{$t('dialog.text5')}}</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        loadingConfim0: false,
        loadingConfim1: false,
        loadingConfim2: false,
        loadingConfim3: false,
        loadingConfim5: false,
        transferValue: this.$t('sieTransfer.name1'), // 所选择的转账类型
        transferAddress: '', // 转账地址
        transferMoney: '', // 转账金额
        transferSelectShow: false, // 下拉框
        transferIndex: 0,
        currentIndex: 0,
        usdUsername: ['SIE', 'USD', 'ETH'],
        tabTwoIndex: 0,
        transferUSD: '',
        transferType: [
          {name: this.$t('sieTransfer.name1')},
          {name: this.$t('sieTransfer.name2')}
        ],
        currencyType: [
          {name: 'SIE'},
          {name: 'USD'},
          {name: 'ETH'},
          {name: 'BTC'}
        ],
        addressTip: false, // 转账地址错误提示
        moneyTip: false, // 转账金额错误提示
        payPopupShow: false, // 确定弹窗
        payPopupShow1: false, // 确定弹窗
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
        codeType: '', // 验证码类型（谷歌验证码。手机验证码）
        data: '',
        addressMsg: '',
        emailPrefixShow: false, // 验证邮箱弹窗
        emailPrefix: '', // 邮箱前四位
        receiveUser: '', // 转账用户
        transferNum: 1,
        currencySelectShow: false,
        currencyValue: 'SIE',
        systemFee: '', // 系统要收的手续费
        btcFee: '', // btc矿工手续费
        minFee: '' // 最低手续费
      }
    },
    computed: {
      ...mapGetters([
        'userAccount',
        'userInfo',
        'outEthRate',
        'moveMinEth',
        'moveEthRate',
        'siePrice',
        'userBalanceSIE',
        'userBalanceUSD',
        'userBalanceETH',
        'userBalanceBTC'
      ]),
      // 打包费
      feeNumber() {
        if (this.transferMoney === '' || this.transferMoney === 0) {
          return 0
        }
        // console.log(((parseFloat(this.transferMoney) * this.outEthRate) / this.siePrice).toFixed(4))
        if (((Number(this.transferMoney) * Number(this.outEthRate) / 100) * Number(this.siePrice)).toFixed(4) >= 3) {
          return parseFloat(this.transferMoney) * Number(this.outEthRate) / 100
        } else {
          return 3 / Number(this.siePrice)
        }
      },
      // 打包费
      feeNumber1() {
        if (this.transferMoney === '' || this.transferMoney === 0) {
          return 0
        }
        // console.log(((parseFloat(this.transferMoney) * this.outEthRate) / this.siePrice).toFixed(4))
        if (this.transferMoney * this.moveEthRate / 100 < this.moveMinEth) {
          return this.moveMinEth
        } else {
          return this.transferMoney * this.moveEthRate / 100
        }
      },
      getPaySum() {
        return Number((Number(this.feeNumber) + Number(this.transferMoney)).toFixed(4))
      },
      getPaySum1() {
        return Number(Number(this.feeNumber1) + Number(this.transferMoney)).toFixed(8)
      },
      getBTCAll() {
        return Number(Number(this.getBTCFree) + Number(this.transferMoney))
      },
      getBTCFree() {
        let btcFree
        let allFree = Number(this.transferMoney) * Number(this.systemFee)
        if (allFree > 0) {
          if (allFree <= Number(this.minFee)) {
            btcFree = Number(this.minFee) + Number(this.btcFee)
            console.log(btcFree)
          } else {
            btcFree = Number(allFree) + Number(this.btcFee)
          }
          return btcFree
        }
      }
    },
    mounted() {
      this.getFree()
    },
    created() {
    },
    watch: {
      transferIndex: function () {
        this.transferAddress = ''
        this.transferMoney = ''
        this.addressTip = false
        this.moneyTip = false
      }
    },
    methods: {
      getFree() { // 获取btc的手续费
        this.$http.post(`${this.$api}/btc/fee`).then((res) => {
          if (res.data.success) {
            let data = res.data.data
            this.systemFee = data.systemFee // 系统要收的手续费
            this.btcFee = data.btcFee // btc矿工手续费
            this.minFee = data.minFee // 最低手续费
          }
        })
      },
      gotoSafe() {
        if (window.innerWidth > 1200) {
          this.$router.push('/account/safettingCenter')
        } else {
          this.$router.push('/account/myAccountPhone')
        }
      },
      // closeUnitMenu (event) {
      //   if (!this.$refs.discountBtn.contains(event.target)) {
      //     this.transferSelectShow = false
      //   }
      // },
      // inputTrade () {
      //   if (this.$refs.inputThird.length < 42) {
      //     alert('提示地址不合法，请检查转账地址')
      //   }
      // },
      changeType(num) {
        if (num === 0) {
          this.tabTwoIndex = 0
          this.transferAddress = ''
          this.transferMoney = ''
          this.transferValue = this.$t('sieTransfer.name1')
        } else if (num === 1) {
          this.tabTwoIndex = 1
          this.transferAddress = ''
          this.transferMoney = ''
        } else if (num === 2) {
          this.tabTwoIndex = 2
          this.transferAddress = ''
          this.transferMoney = ''
          this.transferValue = this.$t('sieTransfer.name1')
        }
      },
      // tab切换
      changeTab(index) {
        this.tabTwoIndex = index
        if (index === 0 || index === 2) {
          this.transferAddress = ''
          this.transferMoney = ''
          this.transferIndex = 0
          this.transferValue = this.$t('sieTransfer.name1')
        } else {
          this.transferAddress = ''
          this.transferMoney = ''
        }
      },
      focusInput(n) {
        if (n === 1) {
          this.addressTip = false
          this.addressMsg = ''
        } else if (n === 2) {
          this.moneyTip = false
          this.addressMsg = ''
        }
      },
      // 转账币种下拉
      chooseCurrency(val, index) {
        // console.log('123')
        this.currencyValue = val
        this.currentIndex = index
        this.tabTwoIndex = index
        this.currencySelectShow = false
        if (this.transferIndex === 0) {
          this.transferNum = 1
        } else if (this.transferIndex === 1) {
          this.transferNum = 2
        }
      },
      // 点击下拉框
      chooseTransfer(val, index) {
        this.transferValue = val
        this.transferIndex = index
        this.transferSelectShow = false
        if (this.transferIndex === 0) {
          this.transferNum = 1
        } else if (this.transferIndex === 1) {
          this.transferNum = 2
        }
      },
      // 判断转账金额
      checkTransferMoney() {
        // this.transferMoney = this.transferMoney.replace(/\D/g, '')
        // if (!/^\d*.{0,1}\d{0,4}$/.test(this.transferMoney)) {
        //   this.transferMoney = ''
        // }
        if (this.tabTwoIndex === 0) {
          if (!/^[0-9]+\.?[0-9]{0,4}$/.test(this.transferMoney)) {
            this.transferMoney = ''
          } else if (this.transferMoney <= 0) {
            this.transferMoney = ''
          }
          if (this.transferIndex === 1) {
            if (((Number(this.transferMoney) * Number(this.outEthRate) / 100) * Number(this.siePrice)).toFixed(4) >= 3) {
              this.maxInput = Number(this.userBalanceSIE) / (1 + Number(this.outEthRate) / 100)
            } else if (((Number(this.transferMoney) * Number(this.outEthRate) / 100) * Number(this.siePrice)).toFixed(4) < 3) {
              this.maxInput = Number(this.userBalanceSIE) - Number(3 / Number(this.siePrice))
            }
            // this.maxInput = Number(this.userBalanceSIE) / (1 + Number(this.outEthRate))
            // this.maxInput = Number(this.userBalanceSIE) - Number(3 / Number(this.siePrice))
            if (this.transferMoney >= this.maxInput) {
              this.transferMoney = this.maxInput.toFixed(4)
            }
          } else {
            if ((this.userBalanceSIE).toFixed(4) < parseFloat(this.transferMoney)) {
              this.transferMoney = (Number(this.userBalanceSIE)).toFixed(4)
            } else if (this.transferMoney < 1 || (this.transferMoney >= 1) === false) {
              this.transferMoney = ''
            }
          }
        } else if (this.tabTwoIndex === 1) {
          if (!/^[0-9]+\.?[0-9]{0,4}$/.test(this.transferMoney)) {
            this.transferMoney = ''
          } else if (this.transferMoney <= 0) {
            this.transferMoney = ''
          }
          if ((this.userBalanceUSD).toFixed(4) < parseFloat(this.transferMoney)) {
            this.transferMoney = (Number(this.userBalanceUSD)).toFixed(4)
          }
        } else if (this.tabTwoIndex === 2 || this.tabTwoIndex === 3) {
          if (!/^[0-9]+\.?[0-9]{0,8}$/.test(this.transferMoney)) {
            this.transferMoney = ''
          } else if (this.transferMoney <= 0) {
            this.transferMoney = ''
          }
        }
      },
      checkTransferMoneyBTC() {
        let error = false
        let money = this.transferMoney
        if (!/^([0-9])+\.?[0-9]{0,8}$/.test(money)) {
          error = true
        }
        if (money.includes('.')) {
          let val = money.split('.')[1]
          let threeVal = parseInt(val[3])
          if (val[3] && !threeVal) {
            error = true
          }
        } else {
          if (money.charAt(0) === '0' && money.length > 1) {
            error = true
          }
        }
        if (error) {
          this.transferMoney = money.slice(0, -1)
        }
      },
      // 确定按钮弹窗
      confirmEmail() {
        if (!this.emailPrefix) {
          this.payFailTip = this.$t('dialog.text17')
          return false
        }
        this.loadingConfim5 = true
        let fmData3 = new FormData()
        fmData3.append('receiveUser', this.transferAddress)
        fmData3.append('emailPrefix', this.emailPrefix)
        let ajaxLang1 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang1 = 'en'
        }
        this.$http.post(`${this.$api}/transferRecord/checkMailTransfer`, fmData3, {headers: {'secret-language': ajaxLang1}}).then(res => {
          if (res.data.success) {
            this.receiveUser = res.data.data.receiveUser
            this.payment()
            this.emailPrefixShow = false
          } else {
            this.payFailTip = res.data.msg
          }
          this.loadingConfim5 = false
        }).catch(err => {
          console.log(err)
          this.loadingConfim5 = false
        })
      },
      payment() {
        this.payFailTip = ''
        if (this.userInfo.openTradePassword !== 2) {
          this.setSafeVerific = true
        } else if (this.userInfo.openGoogleCode !== 2) {
          this.setSafeVerific = true
        } else {
          this.payPopupShow = true
          // 有谷歌
          if (this.userInfo.openGoogleCode === 2) {
            this.isgogoleDuanxin = false
            this.codeType = '2'
            // 如果只有短信
          }
          // else if (this.userInfo.openMobileCode === 2 && this.userInfo.openGoogleCode !== 2) {
          //   this.isgogoleDuanxin = true
          //   this.codeType = '1'
          //   // 都开通用谷歌
          // }
        }
      },
      confirm() {
        this.emailPrefix = ''
        this.payPassword = ''
        this.payCode = ''
        if (this.transferAddress === '') {
          this.addressTip = true
          this.addressMsg = this.$t('sieTransfer.text14')
          return false
        }
        if (this.transferIndex === 3) {
          if (this.$refs.inputThird.value.length < 42) {
            this.addressTip = true
            this.addressMsg = this.$t('sieTransfer.text13')
            return false
          }
        }
        if (this.transferMoney === '') {
          this.moneyTip = true
          return false
        }
        // if (this.transferIndex === 0) {
        //   if (this.$refs.inputOne.value.length < 32) {
        //     this.addressTip = true
        //     this.addressMsg = this.$t('sieTransfer.text13')
        //     return false
        //   }
        // }
        if (this.transferAddress !== '' && this.transferMoney !== '') {
          if (this.transferIndex === 1) {
            this.payPopupShow1 = true
          } else {
            this.emailPrefixShow = true
          }
          // if (this.userInfo.openTradePassword !== 2) {
          //   this.setSafeVerific = true
          // } else if (this.userInfo.openGoogleCode !== 2) {
          //   this.setSafeVerific = true
          // } else {
          //   this.payPopupShow = true
          //   // 有谷歌
          //   if (this.userInfo.openGoogleCode === 2) {
          //     this.isgogoleDuanxin = false
          //     this.codeType = '2'
          //     // 如果只有短信
          //   }
          //   // else if (this.userInfo.openMobileCode === 2 && this.userInfo.openGoogleCode !== 2) {
          //   //   this.isgogoleDuanxin = true
          //   //   this.codeType = '1'
          //   //   // 都开通用谷歌
          //   // }
          // }
        }
      },
      // 支付确定按钮
      confirmPay() {
        this.errinMsgText = ''
        if (this.payPassword === '') {
          this.payFailTip = this.$t('dialog.text2')
          return false
        } else if (this.payCode === '') {
          this.payFailTip = this.$t('dialog.text11')
          return false
        }
        this.loadingConfim0 = true
        let fmData = new FormData()
        fmData.append('receiveAddress', this.transferAddress)
        fmData.append('amount', this.transferMoney)
        fmData.append('type', this.transferNum) // 1:内部转出 2：转出第三方
        fmData.append('tradePwd', this.payPassword)
        fmData.append('codeType', this.codeType) // 1：手机验证码 2：谷歌验证码
        fmData.append('code', this.payCode)
        fmData.append('emailPrefix', this.emailPrefix)
        let ajaxLang1 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang1 = 'en'
        }
        this.$http.post(`${this.$api}/transferRecord/transferOut`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
          if (res.data.success) {
            // console.log(res.data)
            // console.log(res.data.data)
            this.data = res.data.data
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.payPopupShow1 = false
            this.isSuccess = true
          } else {
            this.errinMsgText = res.data.msg
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.payPopupShow1 = false
            this.confirmShow = true
            this.isSuccess = false
          }
          this.loadingConfim0 = false
        }).catch(err => {
          console.log(err)
          this.loadingConfim0 = false
          this.confirmShow = true
          this.isSuccess = false
          this.errinMsgText = this.$t('dialog.text12')
        })
      },
      usdConfirmPay() {
        this.errinMsgText = ''
        if (this.payPassword === '') {
          this.payFailTip = this.$t('dialog.text2')
          return false
        } else if (this.payCode === '') {
          this.payFailTip = this.$t('dialog.text11')
          return false
        }
        this.loadingConfim1 = true
        let fmData = new FormData()
        fmData.append('receiveUser', this.transferAddress)
        fmData.append('amount', this.transferMoney)
        fmData.append('currency', 'USD') // 1:USD 2：ETH
        fmData.append('tradePwd', this.payPassword)
        fmData.append('codeType', this.codeType) // 1：手机验证码 2：谷歌验证码
        fmData.append('code', this.payCode)
        fmData.append('emailPrefix', this.emailPrefix)
        let ajaxLang1 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang1 = 'en'
        }
        this.$http.post(`${this.$api}/transferRecord/transferOutInner`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
          if (res.data.success) {
            // console.log(res.data)
            // console.log(res.data.data)
            this.data = res.data.data
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = true
          } else {
            this.errinMsgText = res.data.msg
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = false
          }
          this.loadingConfim1 = false
        }).catch(err => {
          console.log(err)
          this.loadingConfim1 = false
          this.confirmShow = true
          this.isSuccess = false
          this.errinMsgText = this.$t('dialog.text12')
        })
      },
      ETHConfirmPay() {
        this.errinMsgText = ''
        if (this.payPassword === '') {
          this.payFailTip = this.$t('dialog.text2')
          return false
        } else if (this.payCode === '') {
          this.payFailTip = this.$t('dialog.text11')
          return false
        }
        this.loadingConfim2 = true
        let fmData = new FormData()
        fmData.append('receiveAddress', this.transferAddress)
        fmData.append('amount', this.transferMoney)
        fmData.append('type', this.transferNum) // 1:内部转出 2：转出第三方
        fmData.append('tradePwd', this.payPassword)
        fmData.append('codeType', 2) // 1：手机验证码 2：谷歌验证码
        fmData.append('code', this.payCode)
        fmData.append('emailPrefix', this.emailPrefix)
        let ajaxLang1 = ''
        if (localStorage.getItem('kleinLang') === 'EN') {
          ajaxLang1 = 'en'
        }
        this.$http.post(`${this.$api}/transferRecord/transferOutETH`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
          if (res.data.success) {
            // console.log(res.data)
            // console.log(res.data.data)
            this.data = res.data.data
            this.noBindPhoneShow = false
            this.payPopupShow = false
            this.payPopupShow1 = false
            this.confirmShow = true
            this.isSuccess = true
          } else {
            this.errinMsgText = res.data.msg
            this.noBindPhoneShow = false
            this.payPopupShow1 = false
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = false
          }
          this.loadingConfim2 = false
        }).catch(err => {
          console.log(err)
          this.loadingConfim2 = false
          this.confirmShow = true
          this.isSuccess = false
          this.errinMsgText = this.$t('dialog.text12')
        })
      },
      BTCConfirmPay() {
        this.errinMsgText = ''
        if (this.payPassword === '') {
          this.payFailTip = this.$t('dialog.text2')
          return false
        } else if (this.payCode === '') {
          this.payFailTip = this.$t('dialog.text11')
          return false
        }
        this.loadingConfim3 = true
        if (this.transferIndex === 0) { // btc内部转账
          let fmData = new FormData()
          fmData.append('receiveUser', this.transferAddress)
          fmData.append('amount', this.transferMoney)
          fmData.append('currency', 'BTC') // 1:USD 2：ETH
          fmData.append('tradePwd', this.payPassword)
          fmData.append('codeType', 2) // 1：手机验证码 2：谷歌验证码
          fmData.append('code', this.payCode)
          fmData.append('emailPrefix', this.emailPrefix)
          let ajaxLang1 = ''
          if (localStorage.getItem('kleinLang') === 'EN') {
            ajaxLang1 = 'en'
          }
          this.$http.post(`${this.$api}/transferRecord/transferOutInner`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
            if (res.data.success) {
              // console.log(res.data)
              // console.log(res.data.data)
              this.data = res.data.data
              this.noBindPhoneShow = false
              this.payPopupShow = false
              this.confirmShow = true
              this.isSuccess = true
            } else {
              this.errinMsgText = res.data.msg
              this.noBindPhoneShow = false
              this.payPopupShow = false
              this.confirmShow = true
              this.isSuccess = false
            }
            this.loadingConfim3 = false
          }).catch(err => {
            console.log(err)
            this.confirmShow = true
            this.isSuccess = false
            this.errinMsgText = this.$t('dialog.text12')
            this.loadingConfim3 = false
          })
        } else { // btc第三方转账
          let fmData = new FormData()
          fmData.append('to', this.transferAddress)
          fmData.append('amount', this.transferMoney)
          fmData.append('tradePwd', this.payPassword)
          fmData.append('code', this.payCode)
          let ajaxLang1 = ''
          if (localStorage.getItem('kleinLang') === 'EN') {
            ajaxLang1 = 'en'
          }
          this.$http.post(`${this.$api}/btc/transfer`, fmData, {headers: {'secret-language': ajaxLang1}}).then(res => {
            if (res.data.success) {
              this.data = res.data.data
              this.noBindPhoneShow = false
              this.payPopupShow = false
              this.payPopupShow1 = false
              this.confirmShow = true
              this.isSuccess = true
            } else {
              this.errinMsgText = res.data.msg
              this.noBindPhoneShow = false
              this.payPopupShow = false
              this.payPopupShow1 = false
              this.confirmShow = true
              this.isSuccess = false
            }
            this.loadingConfim3 = false
          }).catch(err => {
            console.log(err)
            this.loadingConfim3 = false
            this.confirmShow = true
            this.isSuccess = false
            this.errinMsgText = this.$t('dialog.text12')
          })
        }
      },
      // 发送短信按钮
      getCode() {
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
      countDown() {
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
      closeIcon() {
        this.payPopupShow = false
        this.payPopupShow1 = false
        this.payFailTip = ''
        this.addressTip = false
        this.moneyTip = false
        this.setSafeVerific = false
        this.emailPrefixShow = false
        this.emailPrefix = ''
      },
      // 支付成功按钮
      successPay() {
        if (this.tabTwoIndex === 0) {
          this.$router.push({
            path: '/account/sieOrder/transferRecordDetail',
            query: {
              id: this.data
            }
          })
        } else if (this.tabTwoIndex === 1) {
          this.$router.push({
            path: '/account/usdOrder/usdTransferDetail',
            query: {
              id: this.data
            }
          })
        } else {
          this.$router.push({
            path: '/account/transferRecord/transferRecords/transferRecordDetail',
            query: {
              id: this.data
            }
          })
        }
      },
      // 支付失败按钮
      successClose() {
        this.payPassword = ''
        this.payCode = ''
        this.payFailTip = ''
        this.confirmShow = false
      },
      // 支付失败按钮
      failedDialog() {
        this.payPassword = ''
        this.payCode = ''
        this.payFailTip = ''
        this.confirmShow = false
      }
    }
    // destroyed () {
    //   document.removeEventListener('click', this.closeUnitMenu) // 组件摧毁时关闭监听
    // }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  input[type=number] {
    -moz-appearance: textfield;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }

  .transfer-title
    margin-bottom 20px
    margin-left 22px
    font-size 20px
    color #181818

  .sieTransfer
    .pc
      @media screen and (max-width: 1200px) {
        display: none;
      }
      .pc-content
        margin-left 92px
        margin-right 20px
        max-width 1000px
        .property-title
          margin-bottom 60px
          h6
            background-color #edeff1;
            height: 64px;
            font-size: 22px;
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
              font-size: 22px;
              color: #181818;
        .transfer-account
          padding-bottom 40px
          position relative
          /*overflow hidden*/
          overflow inherit
          .transfer-title
            margin-bottom 20px
            margin-left 22px
            font-size 20px
            color #181818
          .inputTipBox-select
            position relative
          .inputBox
            z-index 10
            .transfer-input
              display block
              width 100%
              height 68px
              padding 0 30px
              padding-right 60px
              border-radius 4px
              font-size 22px
              background-color #edeff1
              color #181818
              outline none
              border 1px solid #edeff1
              box-sizing border-box
              transition: border-color .15s ease-in-out
            input:
            :-webkit-input-placeholder {
              color: #181818
            }
            input:
            :-moz-placeholder { /* Mozilla Firefox 19+ */
              color: #181818
            }
            input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color: #181818
            }
            input:-ms-input-placeholder { /* Internet Explorer 10-11 */
              color: #181818
            }
            .common-input
              background-color #fff
              border 1px solid #d9d9d9
              font-size 20px
            .discount-btn
              right 0
              background-color #fc534c
              border-bottom-right-radius 6px
              border-top-right-radius 6px
              width 100px
              height 100%
              position absolute
              font-size 0
              top 0
              display flex
              align-items center
              justify-content center
              cursor pointer
              user-select none
              .arrowDown
                background url("../../../../assets/images/sieTransfer/arrow_down_white.png") no-repeat
                display inline-block
                width 13px
                height 8px
                background-size cover !important
                transition .2s
                &.arrowActive
                  transform rotate(180deg)
            .selectMenu
              width 100%
              height 0
              position absolute
              top 68px
              left 0
              background-color #f7f9fa
              border-bottom-right-radius 6px
              border-bottom-left-radius 6px
              transition all 0.3s linear
              z-index 20
              overflow hidden
              &.selectMenuActive
                height 140px
                padding 20px 0
              li
                font-size 22px
                height 50px
                line-height 50px
                padding 0 20px
                color #A7A7A7
                user-select none
                cursor pointer
                &.liActive
                  color #181818
          .inputTipMsg
            display inline-block
            font-size 18px
            color #fc534c
            margin-top 10px
        .sure-btn
          display block
          width 100%
          height 48px
          background-color #fc534c
          color #fff
          border-radius 6px
          font-size 18px
          outline none
          border none
          user-select none
          cursor pointer
          margin-top 60px
          &:active
            opacity .6
          @media screen and (max-width 1200px)
            margin-bottom 60px

  /*移动端样式*/
  .mobile
    padding 0 15px
    @media screen and (max-width: 1200px) {
      display: block;
    }
    .transfer-content
      .transfer-type
        margin-bottom 20px
        .type-title
          font-size 14px
          color #181818
          margin-bottom 10px
        .first-input
          position relative
          width 100%
        .type-box
          z-index 20
          .input-type
            display block
            height 48px
            width 100%
            padding 0 20px
            box-sizing border-box
            border-radius 4px
            font-size 14px
            background-color #fff
            border 1px solid #f0f2f5
          .input-mobile
            display block
            height 48px
            width 100%
            padding 0 20px
            box-sizing border-box
            border-radius 4px
            font-size 14px
            background-color #fff
            border 1px solid #f0f2f5
          ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color: #181818;
          }
          :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #181818;
            opacity: 1;
          }
          ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #181818;
            opacity: 1;
          }
          :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #181818;
          }
          ::-ms-input-placeholder { /* Microsoft Edge */
            color: #181818;
          }
          .type-btn
            position absolute
            right 0
            top 0
            height 100%
            width 50px
            background-color #fc534c
            border-bottom-right-radius 6px
            border-top-right-radius 6px
            font-size 0
            display flex
            justify-content center
            align-items center
            cursor pointer
            user-select none
            .arrowDown
              background url("../../../../assets/images/sieTransfer/arrow_down_white.png") no-repeat
              display inline-block
              width 13px
              height 8px
              background-size cover !important
              transition .2s
              &.arrowActive
                transform rotate(180deg)
          .selectMenu
            width 100%
            height 0
            position absolute
            top 48px
            left 0
            background-color #f7f9fa
            border-bottom-right-radius 6px
            border-bottom-left-radius 6px
            transition all 0.3s linear
            z-index 20
            overflow hidden
            &.selectMenuActive
              height 100px
              padding 10px 0
            li
              height 40px
              line-height 40px
              padding 0 20px
              color #A7A7A7
              cursor pointer
              user-select none
              -webkit-tap-highlight-color: transparent; // 兼容
              &.liActive
                color #181818
        .inputTipMsg
          display inline-block
          font-size 16px
          color #fc534c
          margin-top 10px
    .fee
      font-size 14px
      color #181818
      margin-bottom 10px
    .sure-btn
      display block
      width 100%
      height 48px
      background-color #fc534c
      color #fff
      border-radius 6px
      font-size 18px
      outline none
      border none
      user-select none
      cursor pointer
      margin-top 50px
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
    background-color: rgba(0, 0, 0, 0.5);
    @media screen and (max-width: 768px) {
      .myPopup .myPopup-box {
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
    .myPopup .myPopup-box {
      width: 80%;
      padding 20px
    }
  }

  .error-text
    font-size: 24px
    text-align: center

  .myPopup .myPopup-box .close {
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
    .myPopup .myPopup-box .close {
      top: 13px;
      right: 13px;
      width: 10px;
      height: 10px;
    }
  }

  .myPopup .myPopup-box .close:active {
    opacity: 0.6;
  }

  .myPopup .myPopup-box .close img {
    display: block;
    width: 15px;
    height: 20px;
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
      margin-bottom: 30px;
    }
  }

  .myPopup .myPopup-box .errinMsg
    font-size: 24px;
    color: #fc534c
    text-align center
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }

  .myPopup .myPopup-box input {
    height: 48px;
    width 100%
    font-size 16px
    border 1px solid #d7d9db
    margin-bottom 30px
    position: relative;
    border-radius 8px
    @media screen and (max-width: 768px) {
      width 100%
      margin-bottom 20px
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
    .tradingCenter-btn {
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
  .tradingCenter-btn
    display flex !important
    justify-content center
    border none !important
    &.disable
      pointer-events none
      background #999 !important
    .btn-w
      padding-bottom: 0 !important
      display flex
      align-items center
      .img-box
        width: 30px
        margin-right: 10px
        img
          display block
          width: 100%
  .tradingCenter-input {
    display: block;
    border-radius: 4px;
    padding: 0 10px;
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
      font-size: 12px !important;
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

  .padding-tab
    padding: 20px 0 36px
    @media screen and (max-width 1200px)
      padding: 30px 0
    .inputTipBox-select
      position relative
    .inputBox
      z-index 20
      .transfer-input
        display block
        width 100%
        height 68px
        padding 0 30px
        padding-right 60px
        border-radius 4px
        font-size 22px
        background-color #edeff1
        color #181818
        outline none
        border 1px solid #edeff1
        box-sizing border-box
        transition: border-color .15s ease-in-out
      input:
      :-webkit-input-placeholder {
        color: #181818
      }
      input:
      :-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #181818
      }
      input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #181818
      }
      input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #181818
      }
      .common-input
        background-color #fff
        border 1px solid #d9d9d9
        font-size 20px
      .discount-btn
        right 0
        background-color #fc534c
        border-bottom-right-radius 6px
        border-top-right-radius 6px
        width 100px
        height 100%
        position absolute
        font-size 0
        top 0
        display flex
        align-items center
        justify-content center
        cursor pointer
        user-select none
        .arrowDown
          background url("../../../../assets/images/sieTransfer/arrow_down_white.png") no-repeat
          display inline-block
          width 13px
          height 8px
          background-size cover !important
          transition .2s
          &.arrowActive
            transform rotate(180deg)
      .selectMenu
        width 100%
        height 0
        position absolute
        top 68px
        left 0
        background-color #f7f9fa
        border-bottom-right-radius 6px
        border-bottom-left-radius 6px
        transition all 0.3s linear
        z-index 100
        overflow hidden
        &.currency
          height 220px
          padding 20px 0
        li
          font-size 22px
          height 50px
          line-height 50px
          padding 0 20px
          color #A7A7A7
          user-select none
          cursor pointer
          &.liActive
            color #181818

  .trading-tab
    display flex
    align-items center
    border-radius 4px
    border: none
    @media screen and (max-width 1200px)
      border: 1px solid #fc534c
    .table-item
      height 68px
      font-size: 20px
      flex 1
      display flex
      align-items center
      justify-content center
      cursor pointer
      background-color: #edeff1
      color #181818
      @media screen and (max-width 1200px)
        height: 46px
        color #fc534c
        background-color: #fff
      &.active
        background-color: #fc534c
        color #fff
      &:nth-child(1)
        border-radius 4px 0 0 4px
      &:nth-child(2)
        border-radius 0 4px 4px 0

  .mobile-tab
    position relative
    margin-top 20px
    margin-bottom 20px
    display flex
    flex-direction column
    width 100%
    .transfer-title
      font-size 14px
      color #181818
      margin-bottom 10px
      margin-left 0 !important
    .inputTipBox-select
      width 100%
      position relative
      .transfer-input
        border-bottom-left-radius 6px
        border-top-left-radius 6px
        font-size 14px
        background-color #fff
        border 1px solid #f0f2f5
        padding 0 20px
        display inline-block
        box-sizing border-box
        width 100%
        height 40px
      :-moz-placeholder
        color #181818
      ::-moz-placeholder
        color #181818
      :-ms-input-placeholder
        color #181818
      ::-webkit-input-placeholder
        color #181818
      .discount-btn
        position absolute
        right 0
        top 0
        height 40px
        width 50px
        background-color #fc534c
        border-bottom-right-radius 6px
        border-top-right-radius 6px
        font-size 0
        display flex
        justify-content center
        align-items center
        cursor pointer
        user-select none
        .arrowDown
          background url("../../../../assets/images/sieTransfer/arrow_down_white.png") no-repeat
          display inline-block
          width 13px
          height 8px
          background-size cover !important
          transition .2s
          &.arrowActive
            transform rotate(180deg)
    .selectMenu
      position absolute
      top 40px
      width 100%
      height 0
      background-color #f7f9fa
      transition all 0.3s linear
      z-index 100
      overflow hidden
      &.currency
        height 160px
      li
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        cursor pointer
        color #a7a7a7
        &.liActive
          color: #181818;

  /*li*/
  /*flex 1*/
  /*height 40px*/
  /*line-height 38px*/
  /*text-align center*/
  /*border 1px solid #FC534C*/
  /*color #FC534C*/
  /*font-size 16px*/
  /*&:first-child*/
  /*border-bottom-left-radius 4px*/
  /*border-top-left-radius 4px*/
  /*&:last-child*/
  /*border-bottom-right-radius 4px*/
  /*border-top-right-radius 4px*/
  /*&.tabActive*/
  /*background-color #FC534C*/
  /*color #fff*/
</style>
