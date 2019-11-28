<template>
  <div class="manageUSD">
    <div id="fixed-top-header">
      <div class="back" @click="$router.push('/account/myAccount')"><div class="icon"></div></div>
      <h3 class="fixed-title">USD资产管理</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="manage-cont">
      <div class="usd-money-w">
        <div class="moeny-t">USD资产：</div>
        <div class="money-num">50000000.0000USD</div>
      </div>
      <div class="dashed-line"></div>
      <div class="ma-r">
        <div class="record-con">
          <span class="text">充提订单记录</span>
          <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
        </div>
        <div class="record-con">
          <span class="text">提现订单记录</span>
          <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
        </div>
        <div class="record-con">
          <span class="text">USD交易订单记录</span>
          <div class="icon"><img src="../../../../assets/images/myAccount/myDon/row-link-red.svg" alt=""></div>
        </div>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="btn btn-recharge" @click="$router.push('/account/usdRecharge')">充值</div>
      <div class="btn btn-deposit" @click="$router.push('/account/usdWithdrawMoney')">提现</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.manageUSD
  #fixed-top-header
    border-bottom none
  .padding
    padding: 0 15px
    .margin
      margin-top: 50px
  .dashed-line
    width: 100%
    height: 1px
    background: url("../../../../assets/images/myAccount/dashed.png") repeat-x
  .manage-cont
    margin-top 50px
    padding: 0 15px
    min-height calc(100vh - 100px)
    .usd-money-w
      padding: 30px 0
      color #181818
      .moeny-t
        font-size: 14px
        margin-bottom: 20px
      .money-num
        font-weight bold
        font-size: 20px
    .ma-r
      padding-top: 30px
      .record-con
        cursor pointer
        display: flex
        align-items center
        justify-content space-between
        padding: 0 15px
        height: 50px
        background-color: #f0f2f5
        margin-bottom: 20px
        &:last-child
          margin-bottom: 0
        .text
          font-size: 14px
          color #181818
        .icon
          width: 9px
          img
            width: 100%
            display block
  .fixed-bottom
    width: 100%
    height: 50px
    display flex
    align-items center
    .btn
      flex 1
      display: flex
      align-items center
      justify-content center
      color #ffffff
      font-size: 18px
      height: 50px
      cursor pointer
    .btn-recharge
      background-color: #fc534c
    .btn-deposit
      background-color: #032e43
</style>
