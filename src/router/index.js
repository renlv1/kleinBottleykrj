import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/newExchange'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login/login'], resolve) // 登录
    },
    { // 忘记密码
      path: '/inputEmail',
      name: 'inputEmail',
      component: resolve => require(['@/pages/login/inputEmail'], resolve)
    },
    {
      path: '/forgetPassword',
      name: 'forgetPpassword',
      component: resolve => require(['@/pages/login/forgetPassword'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/login/register'], resolve) // 注册
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/pages/home/home'], resolve) // 首页
    },
    {
      path: '/add',
      name: 'add',
      component: resolve => require(['@/pages/add/add'], resolve) // 首页
    },
    {
      path: '/addDetails',
      name: 'addDetails',
      component: resolve => require(['@/pages/add/addDetails'], resolve) // 首页
    },
    {
      path: '/klein',
      name: 'klein',
      component: resolve => require(['@/pages/klein/klein'], resolve) // 克莱茵瓶
    },
    {
      path: '/serialEat',
      name: 'serialEat',
      component: resolve => require(['@/pages/serialEat/serialEat'], resolve) // 连环吃饼
      // component: resolve => require(['@/pages/exchange/exchange'], resolve) // 交易所
    },
    {
      path: '/situation',
      name: 'situation',
      component: resolve => require(['@/pages/newExchange/situation'], resolve) // 移动端行情
    },
    {
      path: '/pastRecord',
      name: 'pastRecord',
      component: resolve => require(['@/pages/serialEat/pastRecord'], resolve) // 连环吃饼--往期记录
    },
    {
      path: '/giveReward',
      name: 'giveReward',
      component: resolve => require(['@/pages/serialEat/giveReward'], resolve) // 连环吃饼--打赏队列
    },
    {
      path: '/snapQueue',
      name: 'snapQueue',
      component: resolve => require(['@/pages/serialEat/snapQueue'], resolve) // 连环吃饼--抢购队列
    },
    {
      path: '/pastRecordDetail',
      name: 'pastRecordDetail',
      component: resolve => require(['@/pages/serialEat/pastRecordDetail'], resolve) // 连环吃饼--往期记录详情
    },
    {
      path: '/revenue',
      name: 'revenue',
      component: resolve => require(['@/pages/serialEat/revenue'], resolve) // 连环吃饼--分红池收支明细
    },
    {
      path: '/historyWinList',
      name: 'historyWinList',
      component: resolve => require(['@/pages/serialEat/historyWinList'], resolve) // 连环吃饼--历史获奖记录
    },
    {
      path: '/historyDetail',
      name: 'historyDetail',
      component: resolve => require(['@/pages/serialEat/historyDetail'], resolve) // 连环吃饼--历史获奖记录详情（移动端）
    },
    {
      path: '/toAllPool',
      name: 'toAllPool',
      component: resolve => require(['@/pages/serialEat/toAllPool'], resolve) // 连环吃饼--奖金池获奖用户
    },
    {
      path: '/futureBonus',
      name: 'futureBonus',
      component: resolve => require(['@/pages/serialEat/futureBonus'], resolve) // 连环吃饼--预计分红支出
    },
    {
      path: '/shareBonusDetail',
      name: 'shareBonusDetail',
      component: resolve => require(['@/pages/serialEat/shareBonusDetail'], resolve) // 连环吃饼--我的分红明细
    },
    {
      path: '/eatGame',
      name: 'eatGame',
      component: resolve => require(['@/pages/eatGame/eatGameHome'], resolve) // AI游戏--吃饼
    },
    {
      path: '/eatGame/activityLog',
      name: 'activityLog',
      component: resolve => require(['@/pages/eatGame/activityLog'], resolve) // AI游戏--吃饼--往期活动
    },
    {
      path: '/eatGame/activityLogDetail',
      name: 'activityLogDetail',
      component: resolve => require(['@/pages/eatGame/activityLogDetail'], resolve) // AI游戏--吃饼--往期活动详情
    },
    // {
    //   path: '/aiChat',
    //   name: 'aiChat',
    //   component: resolve => require(['@/pages/aiChat/aiChat'], resolve) // AI聊天
    // },
    {
      path: '/exchange',
      name: 'exchange',
      component: resolve => require(['@/pages/exchange/exchange'], resolve) // 交易所
    },
    {
      path: '/newExchange',
      name: 'newExchange',
      component: resolve => require(['@/pages/newExchange/newExchange'], resolve) // 新交易所
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: resolve => require(['@/pages/aboutUs/aboutUs'], resolve) // 关于我们
    },
    {
      path: '/account',
      name: 'account',
      redirect: {name: 'myAccount'},
      component: resolve => require(['@/pages/myAccount/accountNav'], resolve),
      children: [
        {
          path: 'myAccount',
          name: 'myAccount', // 我的账户
          component: resolve => require(['@/pages/myAccount/myAccount'], resolve)
        },
        {
          path: 'safettingCenter',
          name: 'safettingCenter', // 安全设置
          component: resolve => require(['@/pages/myAccount/safeSetting/safeSetting'], resolve)
        },
        {
          path: 'safettingCenter/gogoleSetting',
          name: 'gogoleSetting', // 谷歌解绑
          component: resolve => require(['@/pages/myAccount/safeSetting/gogoleSetting'], resolve)
        },
        {
          path: 'safettingCenter/gogleOne',
          name: 'gogleOne', // 谷歌绑定  1
          component: resolve => require(['@/pages/myAccount/safeSetting/gogleCenter/gogleOne'], resolve)
        },
        {
          path: 'safettingCenter/gogleTwo',
          name: 'gogleTwo', //  谷歌绑定  2
          component: resolve => require(['@/pages/myAccount/safeSetting/gogleCenter/gogleTwo'], resolve)
        },
        {
          path: 'safettingCenter/gogleThree',
          name: 'gogleThree', // 谷歌绑定  3
          component: resolve => require(['@/pages/myAccount/safeSetting/gogleCenter/gogleThree'], resolve)
        },
        {
          path: 'safettingCenter/mobileSetting',
          name: 'mobileSetting', // 手机
          component: resolve => require(['@/pages/myAccount/safeSetting/mobileSetting'], resolve)
        },
        {
          path: 'safettingCenter/safePassword',
          name: 'safePassword', // 安全
          component: resolve => require(['@/pages/myAccount/safeSetting/safePassword'], resolve)
        },
        {
          path: 'myAccountPhone',
          name: 'myAccountPhone', // 我的账户--账户管理（只有手机端有）
          component: resolve => require(['@/pages/myAccount/myAccountPhone'], resolve)
        },
        {
          path: 'transfer',
          name: 'transfer', // 转账
          component: resolve => require(['@/pages/myAccount/accountCenter/sieMoney/transfer'], resolve)
        },
        {
          path: 'transferCopy',
          name: 'transferCopy', // 转账
          component: resolve => require(['@/pages/myAccount/accountCenter/sieMoney/transferCopy'], resolve)
        },
        {
          path: 'transAccountManag',
          name: 'transAccountManag', // 交易账户管理
          component: resolve => require(['@/pages/myAccount/accountCenter/transAccountManag/transAccountManag'], resolve)
        },
        {
          path: 'transAccountManag/addAccount',
          name: 'addAccount', // 添加、编辑交易账户
          component: resolve => require(['@/pages/myAccount/accountCenter/transAccountManag/addAccount'], resolve)
        },
        {
          path: 'usdRecharge',
          name: 'usdRecharge', // USD充值
          component: resolve => require(['@/pages/myAccount/accountCenter/usdRecharge/usdRecharge'], resolve)
        },
        {
          path: 'usdOrder/usdRechargeInfo',
          name: 'usdRechargeInfo', // USD充值详情
          component: resolve => require(['@/pages/myAccount/accountCenter/usdRecharge/usdRechargeInfo'], resolve)
        },
        {
          path: 'btcOrder/btcRechargeInfo',
          name: 'btcRechargeInfo', // BTC充值详情
          component: resolve => require(['@/pages/myAccount/accountCenter/btcRecharge/btcRechargeInfo'], resolve)
        },
        {
          path: 'usdOrder/usdRechargeInfo/usdProblem',
          name: 'usdProblem', // USD充值申诉
          component: resolve => require(['@/pages/myAccount/accountCenter/usdRecharge/usdProblem'], resolve)
        },
        {
          path: 'usdWithdrawMoney',
          name: 'usdWithdrawMoney', // USD提现
          component: resolve => require(['@/pages/myAccount/accountCenter/usdWithdrawMoney/usdWithdrawMoney'], resolve)
        },
        {
          path: 'usdOrder/usdWithSwitchBoss',
          name: 'usdWithSwitchBoss', // USD提现--> 选择老板
          component: resolve => require(['@/pages/myAccount/accountCenter/usdWithdrawMoney/usdWithSwitchBoss'], resolve)
        },
        {
          path: 'btcOrder/btcWithSwitchBoss',
          name: 'btcWithSwitchBoss', // USD提现--> 选择老板
          component: resolve => require(['@/pages/myAccount/accountCenter/btcWithdrawMoney/btcWithSwitchBoss'], resolve)
        },
        {
          path: 'usdOrder/usdWithSwitchBoss/usdWithInfo',
          name: 'usdWithInfo', // USD提现--> 提现详情
          component: resolve => require(['@/pages/myAccount/accountCenter/usdWithdrawMoney/usdWithInfo'], resolve)
        },
        {
          path: 'btcOrder/btcWithSwitchBoss/btcWithInfo',
          name: 'btcWithInfo', // BTC提现--> 提现详情
          component: resolve => require(['@/pages/myAccount/accountCenter/btcWithdrawMoney/btcWithInfo'], resolve)
        },
        {
          path: 'btcOrder/btcWithSwitchBoss/btcWithInfo/btcWithProblem',
          name: 'btcWithProblem', // USD提现--> 申诉
          component: resolve => require(['@/pages/myAccount/accountCenter/usdWithdrawMoney/btcWithProblem'], resolve)
        },
        {
          path: 'usdOrder/usdWithSwitchBoss/usdWithInfo/usdWithProblem',
          name: 'usdWithProblem', // USD提现--> 申诉
          component: resolve => require(['@/pages/myAccount/accountCenter/usdWithdrawMoney/usdWithProblem'], resolve)
        },
        {
          path: 'manageUSD',
          name: 'manageUSD', // USD资产管理
          component: resolve => require(['@/pages/myAccount/accountCenter/manageUSD/manageUSD'], resolve)
        },
        {
          path: 'sieMoney',
          name: 'sieMoney', // SIE资产管理
          component: resolve => require(['@/pages/myAccount/accountCenter/sieMoney/sieMoney'], resolve)
        },
        {
          path: 'sieMoney/sieTransfer',
          name: 'sieTransfer', //  SIE转账
          component: resolve => require(['@/pages/myAccount/accountCenter/sieMoney/sieTransfer'], resolve)
        },
        {
          path: 'sieOrder',
          name: 'sieOrder', //  PC端SIE交易订单
          component: resolve => require(['@/pages/myAccount/orderCenter/sieOrder/sieOrder'], resolve)
        },
        {
          path: 'sieOrder/sieOrderDetail',
          name: 'sieOrderDetail', //  SIE交易订单详情
          component: resolve => require(['@/pages/myAccount/orderCenter/sieOrder/sieOrderDetail'], resolve)
        },
        {
          path: 'transferRecord',
          name: 'transferRecord', //  移动端SIE交易订单
          component: resolve => require(['@/pages/myAccount/orderCenter/sieOrder/transferRecord'], resolve)
        },
        {
          path: 'sieOrder/transferRecordDetail',
          name: 'transferRecordDetail', //  SIE转账记录详情
          component: resolve => require(['@/pages/myAccount/orderCenter/sieOrder/transferRecordDetail'], resolve)
        },
        {
          path: 'sieOrder/turnoverDetail',
          name: 'turnoverDetail', //  移动端SIE订单成交明细
          component: resolve => require(['@/pages/myAccount/orderCenter/sieOrder/turnoverDetail'], resolve)
        },
        {
          path: 'usdOrder',
          name: 'usdOrder', //  USD交易订单
          component: resolve => require(['@/pages/myAccount/orderCenter/usdOrder/usdOrder'], resolve)
        },
        {
          path: 'btcOrder',
          name: 'btcOrder', //  USD交易订单
          component: resolve => require(['@/pages/myAccount/orderCenter/btcOrder/btcOrder'], resolve)
        },
        {
          path: 'usdTransferRecord',
          name: 'usdTransferRecord', //  usd转账记录
          component: resolve => require(['@/pages/myAccount/orderCenter/usdOrder/usdTransferRecord'], resolve)
        },
        {
          path: 'usdOrder/usdTransferDetail',
          name: 'usdTransferDetail', //  usd转账记录详情
          component: resolve => require(['@/pages/myAccount/orderCenter/usdOrder/usdTransferDetail'], resolve)
        },
        {
          path: 'rechargeRecord',
          name: 'rechargeRecord', //  充值记录
          component: resolve => require(['@/pages/myAccount/orderCenter/usdOrder/rechargeRecord'], resolve)
        },
        /* /account/usdOrder/usdWithSwitchBoss/usdWithInfo */
        {
          path: 'usdTradeRecord',
          name: 'usdTradeRecord', //  usd交易记录
          component: resolve => require(['@/pages/myAccount/orderCenter/usdOrder/usdTradeRecord'], resolve)
        },
        {
          path: 'usdOrder/usdTradeDetail',
          name: 'usdTradeDetail', //  usd交易记录详情
          component: resolve => require(['@/pages/myAccount/orderCenter/usdOrder/usdTradeDetail'], resolve)
        },
        {
          path: 'withdrawalRecord',
          name: 'withdrawalRecord', //  提现记录
          component: resolve => require(['@/pages/myAccount/orderCenter/usdOrder/withdrawalRecord'], resolve)
        },
        {
          path: 'InvitedRecord',
          name: 'InvitedRecord', //  邀请记录
          component: resolve => require(['@/pages/myAccount/InvitedRecord/InvitedRecord'], resolve)
        },
        {
          path: 'AssetManagement',
          name: 'AssetManagement', //  资产管理
          component: resolve => require(['@/pages/myAccount/AssetManagement/AssetManagement'], resolve)
        },
        {
          path: 'AssetManagement/ETHAsset',
          name: 'ETHAsset', // ETH资产管理
          component: resolve => require(['@/pages/myAccount/AssetManagement/ETHAsset'], resolve)
        },
        {
          path: 'AssetManagement/BTCAsset',
          name: 'BTCAsset', // BTC资产管理
          component: resolve => require(['@/pages/myAccount/AssetManagement/BTCAsset'], resolve)
        },
        {
          path: 'AssetManagement/ETHAsset/ETHTrans',
          name: 'ETHTrans', // ETH资产管理
          component: resolve => require(['@/pages/myAccount/AssetManagement/ETHTrans'], resolve)
        },
        // {
        //   path: 'accountOrderDetail',
        //   name: 'accountOrderDetail', //  SIE、USD订单详情
        //   component: resolve => require(['@/pages/myAccount/accountCenter/accountOrderDetail/accountOrderDetail'], resolve)
        // },
        // {
        //   path: 'orderComplain',
        //   name: 'orderComplain', //  申诉
        //   component: resolve => require(['@/pages/myAccount/accountCenter/accountOrderDetail/orderComplain'], resolve)
        // },
        // {
        //   path: 'orderComplainDetails',
        //   name: 'orderComplainDetails', //  申诉详情
        //   component: resolve => require(['@/pages/myAccount/accountCenter/accountOrderDetail/orderComplainDetails'], resolve)
        // },
        {
          path: 'orderManage',
          name: 'orderManage', // 订单管理
          component: resolve => require(['@/pages/myAccount/orderManage/orderManage'], resolve)
        },
        {
          path: 'orderDetail',
          name: 'orderDetail', // 订单管理详情
          component: resolve => require(['@/pages/myAccount/orderManage/orderDetail'], resolve)
        },
        {
          path: 'exchanges',
          name: 'exchanges', // 订单管理
          component: resolve => require(['@/pages/myAccount/exchanges/exchanges'], resolve)
        },
        {
          path: 'exchanges/exchangeDetail',
          name: 'exchangeDetail', // 订单管理详情
          component: resolve => require(['@/pages/myAccount/exchanges/exchangeDetail'], resolve)
        },
        {
          path: 'exchanges/mobileDetail',
          name: 'mobileDetail', // 订单管理
          component: resolve => require(['@/pages/myAccount/exchanges/mobileDetail'], resolve)
        },
        {
          path: 'notOpenShareOrder/shareOrder',
          name: 'shareOrder', // 已开通 共享交易订单
          component: resolve => require(['@/pages/myAccount/orderCenter/shareOrder/shareOrder'], resolve)
        },
        {
          path: 'notOpenShareOrder/shareOrder/shareSetting',
          name: 'shareSetting', // 共享设置
          component: resolve => require(['@/pages/myAccount/orderCenter/shareOrder/shareSetting'], resolve)
        },
        {
          path: 'transferRecord/transferRecords',
          name: 'transferRecords', // 转账记录
          component: resolve => require(['@/pages/myAccount/transferRecord/transferRecords'], resolve)
        },
        {
          path: 'transferRecord/transferRecords/transferRecordDetail',
          name: 'transferRecordsDetail', // 转账记录详情
          component: resolve => require(['@/pages/myAccount/transferRecord/transferRecordDetail'], resolve)
        },
        {
          path: 'notOpenShareOrder/shareOrder/shareSetting/shareOrderDetails',
          name: 'shareOrderDetails', // 共享订单详情
          component: resolve => require(['@/pages/myAccount/orderCenter/shareOrder/shareOrderDetails'], resolve)
        },
        {
          path: 'notOpenShareOrder/shareOrder/shareSetting/tiXianShareOrder',
          name: 'tiXianShareOrder', // 共享订单详情
          component: resolve => require(['@/pages/myAccount/orderCenter/shareOrder/tiXianShareOrder'], resolve)
        },
        {
          path: 'notOpenShareOrder/shareOrder/shareSetting/shareOrderDetails/shareProblem',
          name: 'shareProblem', // 共享订单申诉
          component: resolve => require(['@/pages/myAccount/orderCenter/shareOrder/shareProblem'], resolve)
        },
        {
          path: 'notOpenShareOrder/shareOrder/chooseAccount',
          name: 'chooseAccount', // 共享订单详情 - 选择银行卡
          component: resolve => require(['@/pages/myAccount/orderCenter/shareOrder/chooseAccount'], resolve)
        },
        {
          path: 'notOpenShareOrder',
          name: 'notOpenShareOrder', // 未开通 共享交易
          component: resolve => require(['@/pages/myAccount/orderCenter/shareOrder/notOpenShareOrder'], resolve)
        },
        {
          path: 'myDon',
          name: 'myDon', // 我的小单(已经开通)(未开通)(已过期)
          component: resolve => require(['@/pages/myAccount/myDon/myDon'], resolve)
        },
        {
          path: 'myDon/renew',
          name: 'renew', // 我的小单--续费
          component: resolve => require(['@/pages/myAccount/myDon/renew'], resolve)
        },
        {
          path: 'myDon/openDon',
          name: 'openDon', // 我的小单--开通小单(支付)
          component: resolve => require(['@/pages/myAccount/myDon/openDon'], resolve)
        },
        {
          path: 'experiment',
          name: 'experiment', // 实验性功能
          component: resolve => require(['@/pages/myAccount/experiment/experiment'], resolve)
        },
        {
          path: 'experiment/overdue',
          name: 'overdue', // 实验性功能--小单已过期
          component: resolve => require(['@/pages/myAccount/experiment/overdue'], resolve)
        },
        {
          path: 'experiment/qrCode',
          name: 'qrCode', // 实验性功能--扫码二维码
          component: resolve => require(['@/pages/myAccount/experiment/qrCode'], resolve)
        },
        {
          path: 'experiment/setFriends',
          name: 'setFriends', // 实验性功能--扫码成功--设置托管好友
          component: resolve => require(['@/pages/myAccount/experiment/setFriends'], resolve)
        },
        {
          path: 'teamReward',
          name: 'teamReward', // 团队奖励
          component: resolve => require(['@/pages/myAccount/teamReward/teamReward'], resolve)
        },
        {
          path: 'teamReward/teamRewardDetail',
          name: 'teamRewardDetail', // 团队奖励--团队奖励详情
          component: resolve => require(['@/pages/myAccount/teamReward/teamRewardDetail'], resolve)
        },
        {
          path: 'activityReward',
          name: 'activityReward', // 活动推广奖励
          component: resolve => require(['@/pages/myAccount/activityReward/activityReward'], resolve)
        },
        {
          path: 'activityReward/activityRewardDetail',
          name: 'activityRewardDetail', // 活动推广奖励--详情
          component: resolve => require(['@/pages/myAccount/activityReward/activityRewardDetail'], resolve)
        },
        {
          path: 'eatReward',
          name: 'eatReward', // 吃饼奖励
          component: resolve => require(['@/pages/myAccount/eatReward/eatReward'], resolve)
        },
        {
          path: 'eatReward/eatRewardDetail',
          name: 'eatRewardDetail', // 吃饼奖励--详情
          component: resolve => require(['@/pages/myAccount/eatReward/eatRewardDetail'], resolve)
        },
        {
          path: 'eatReward/rewardDetail', // 新吃饼奖励详情
          name: 'rewardDetail', // 吃饼奖励--详情
          component: resolve => require(['@/pages/myAccount/eatReward/rewardDetail'], resolve)
        },
        {
          path: 'rank',
          name: 'rank', // 排位循环奖励
          component: resolve => require(['@/pages/myAccount/rank/rank'], resolve)
        },
        {
          path: 'serialReward',
          name: 'serialReward', // 连环吃饼奖励
          component: resolve => require(['@/pages/myAccount/rewardCenter/serialReward/serialReward'], resolve)
        },
        {
          path: 'serialReward/serialRewardDetails',
          name: 'serialRewardDetails', // 连环吃饼奖励详情
          component: resolve => require(['@/pages/myAccount/rewardCenter/serialReward/serialRewardDetails'], resolve)
        },
        {
          path: 'serialReward/share',
          name: 'share', // 分红奖励明细
          component: resolve => require(['@/pages/myAccount/rewardCenter/serialReward/share'], resolve)
        },
        {
          path: 'serialReward/daShangDetails',
          name: 'daShangDetails', // 打赏奖励明细
          component: resolve => require(['@/pages/myAccount/rewardCenter/serialReward/daShangDetails'], resolve)
        },
        {
          path: 'serialReward/randomDetail',
          name: 'randomDetail', // 随机奖励详情手机端
          component: resolve => require(['@/pages/myAccount/rewardCenter/serialReward/randomDetail'], resolve)
        },
        {
          path: 'serialReward/pools',
          name: 'pools', // 奖金池奖励明细
          component: resolve => require(['@/pages/myAccount/rewardCenter/serialReward/pools'], resolve)
        },
        {
          path: 'serialReward/isTeamReward',
          name: 'isTeamReward', // 团队奖励明细奖励明细
          component: resolve => require(['@/pages/myAccount/rewardCenter/serialReward/isTeamReward'], resolve)
        },
        {
          path: 'serialReward/group',
          name: 'group', // 奖金池奖励明细
          component: resolve => require(['@/pages/myAccount/rewardCenter/serialReward/group'], resolve)
        },
        {
          path: 'rank/rankDetail',
          name: 'rankDetail', // 排位循环奖励
          component: resolve => require(['@/pages/myAccount/rank/rankDetail'], resolve)
        },
        {
          path: 'award',
          name: 'award', // 奖金池奖励明细
          component: resolve => require(['@/pages/myAccount/award/award'], resolve)
        }
      ]
    }
  ]
})
