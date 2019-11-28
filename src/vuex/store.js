/**
 * Created by Ausu on 2018/6/28.
 */
//   公共请求数据
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)
// var $api = 'https://api.kleingame.ai'
var $api = 'http://klein.33333666666.com'

export default new Vuex.Store({
  state: {
    userInfo: [],
    sieMoney: [],
    tixianFei: '',
    activityRound: [], // 当前参与吃饼活动
    activityLottoRound: [], // 当前参与连续吃饼活动
    userAccount: [], // 用户资产
    userBalanceUSD: Number, // USD余额
    userBalanceSIE: Number, // SIE余额
    userBalanceETH: Number, // ETH余额
    userBalanceBTC: Number, // BTC余额
    chooseUserBalance: Number, // 选择种类的余额
    userAddress: '', // 用户地址
    loginFlag: false, // 用户的登陆状态
    myGameRewardSum: '', // 累积收益SIE
    myGameRewardUsdSum: '', // 累积收益USD
    outEthRate: '',
    moveMinEth: '',
    moveEthRate: '',
    siePrice: '',
    freezeAmountSum: '', // 游戏冻结金额SIE
    rewardPage: 1 // 当前奖励页面
  },
  getters: {
    loginFlag: state => state.loginFlag,
    tixianFei: state => state.tixianFei,
    userInfo: state => state.userInfo, // 用戶信息balanceData.user
    sieMoney: state => state.sieMoney,
    activityRound: state => state.activityRound,
    activityLottoRound: state => state.activityLottoRound,
    userAccount: state => state.userAccount,
    userBalanceUSD: state => state.userBalanceUSD,
    userBalanceSIE: state => state.userBalanceSIE,
    userBalanceETH: state => state.userBalanceETH,
    userBalanceBTC: state => state.userBalanceBTC,
    chooseUserBalance: state => state.chooseUserBalance,
    userAddress: state => state.userAddress,
    myGameRewardSum: state => state.myGameRewardSum,
    myGameRewardUsdSum: state => state.myGameRewardUsdSum,
    outEthRate: state => state.outEthRate,
    moveEthRate: state => state.moveEthRate,
    moveMinEth: state => state.moveMinEth,
    siePrice: state => state.siePrice,
    freezeAmountSum: state => state.freezeAmountSum,
    rewardPage: state => state.rewardPage
  },
  actions: {
    logoutAction({state}) { // 退出登录
      axios.get($api + '/user/logout?deviceId=0').then((res) => {
        if (res.data.success) {
          state.loginFlag = false
          state.userInfo = [] // 清空header用户信息
          router.push('/login')
        } else if (res.data.resultCode === 'NOT_LOGGEDIN') {
          router.push('/login')
          state.loginFlag = false
        }
      })
    },
    rewardPageAction({commit}) { // 获得当前奖励页
      axios.post($api + '/lottoReward/getAwardList?pageIndex=1&pageSize=10').then((res) => {
        if (res.data.success) {
          commit('rewardPage', res.data.data)
        }
      })
    },
    balance({commit}) {
      axios.post($api + '/user/balance').then((res) => {
        if (res.data.success) {
          commit('balanceMut', res.data.data)
        }
      })
    },
    balanceAction({commit}) {
      axios.post($api + '/user/balance').then((res) => { // 用戶信息
        if (res.data.success) {
          commit('balanceMut', res.data.data)
          commit('SIEMONEY', res.data.data.userAccount.SIE.balance)
          commit('GET_LOGIN_FLAG', res.data)
        } else if (res.data.resultCode === 'NOT_LOGGEDIN' && (window.location.hash !== '#/add' && window.location.hash.indexOf('/addDetails') === -1 && window.location.hash !== '#/home' && window.location.hash.indexOf('forgetPassword') < 0 && window.location.hash !== '#/inputEmail' && window.location.hash !== '#/register' && window.location.hash !== '#/newExchange')) {
          router.push('/login')
        }
      })
    }
  },
  mutations: {
    balanceMut(state, data) {
      state.tixianFei = data.drawrate
      state.userInfo = data.user
      state.userBalanceUSD = data.userAccount.USD.balance
      state.userBalanceSIE = data.userAccount.SIE.balance
      state.userBalanceETH = data.userAccount.ETH.balance
      state.userBalanceBTC = data.userAccount.BTC.balance
      state.userAddress = data.user.address
      localStorage.setItem('userAddress', state.userAddress)
      state.activityRound = data.activityRound
      state.activityLottoRound = data.activityLottoRound
      state.userAccount = data.userAccount
      state.myGameRewardSum = data.myGameRewardSum
      state.myGameRewardUsdSum = data.myGameRewardUsdSum
      state.outEthRate = data.outEthRate
      state.moveEthRate = data.moveEthRate
      state.moveMinEth = data.moveMinEth
      state.siePrice = data.siePrice
      state.freezeAmountSum = data.freezeAmountSum
      if (Number(window.localStorage.currency) === 2) {
        state.chooseUserBalance = state.userBalanceETH.toFixed(8)
      } else if (Number(window.localStorage.currency) === 3) {
        state.chooseUserBalance = state.userBalanceBTC.toFixed(8)
      } else {
        state.chooseUserBalance = state.userBalanceSIE.toFixed(8)
      }
    },
    rewardPage(state, data) {
      console.log('acn')
      if (data.rewardPage > 1) {
        state.rewardPage = data.rewardPage
        localStorage.setItem('rewardPage', data.rewardPage)
      } else {
        state.rewardPage = 1
        localStorage.setItem('rewardPage', 1)
      }
    },
    GET_LOGIN_FLAG(state, data) {
      if (data.resultCode === 'NOT_LOGGEDIN') {
        state.loginFlag = false
        router.push('/login')
      } else if (data.success) {
        state.loginFlag = true
        state.user = data
      }
    },
    SIEMONEY(state, data) {
      state.sieMoney = data
    }
  }
})
