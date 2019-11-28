<template>
  <div class="turnPage" v-if="pages !== 0">
    <div class="pagelist">
      <span class="phTurnPage" :class="{disabled: pstart}" @click="jumpPage(--current_page)">&lt; {{$t('myAccount.text5')}}</span>
      <span class="jump" :class="{disabled: pstart}" @click="jumpPage(--current_page)">&lt;</span>
      <span v-show="current_page > 5 && pages !== 7 && pages !== 6" class="jump" @click="jumpPage(1)">1</span>
      <span class="ellipsis" v-show="efont">...</span>
      <span class="jump" v-for="num in indexs" :key="num" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
      <span class="ellipsis" v-show="ebehind">...</span>
      <span v-show="current_page > 5 && current_page <= pages - 5" class="jump" @click="jumpPage(pages)">{{pages}}</span>
      <span :class="{disabled: pend}" class="jump" @click="jumpPage(++current_page)">&gt;</span>
      <span class="phTurnPage" :class="{disabled: pend}" @click="jumpPage(++current_page)">{{$t('myAccount.text6')}} &gt;</span>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$btn31 = #FC534C // 按钮颜色
.turnPage
  text-align center
  @media screen and (max-width 768px)
    margin-bottom 20px
  .pagelist
    user-select none
    @media screen and (max-width 768px)
      display flex
      justify-content space-around
    .ellipsis
      @media screen and (max-width 768px)
        display none
    .jump
      font-size 20px
      padding 5px 8px
      cursor pointer
      margin-left 5px
      &.disabled
        pointer-events none
      @media screen and (max-width 768px)
        display none
      &.bgprimary
        display inline-block
        color $btn31
        @media screen and (max-width 768px)
          font-size 14px
    .phTurnPage
      display none
      font-size 14px
      padding 5px
      &.disabled
        pointer-events none
        color #ccc
      @media screen and (max-width 768px)
        display inline-block
</style>

<script>
export default{
  props: [
    'propsPage'
  ],
  data () {
    return {
      current_page: 1, // 当前页
      nowIndex: 0
    }
  },
  mounted () {
    // console.log(this.$store.state.rewardPage)
  },
  computed: {
    pages () {
      return this.propsPage
    },
    show () {
      return this.pages && this.pages !== 1
    },
    pstart () {
      return this.current_page === 1
    },
    pend () {
      return this.current_page === this.pages
    },
    efont () {
      if (this.pages <= 7) return false
      return this.current_page > 5
    },
    ebehind () {
      if (this.pages <= 7) return false
      var nowAy = this.indexs
      return nowAy[nowAy.length - 1] !== this.pages
    },
    indexs () {
      var left = 1
      var right = this.pages
      var ar = []
      if (this.pages >= 7) {
        if (this.current_page > 5 && this.current_page < this.pages - 4) {
          left = Number(this.current_page) - 3
          right = Number(this.current_page) + 3
        } else {
          if (this.current_page <= 5) {
            left = 1
            right = 7
          } else {
            right = this.pages
            left = this.pages - 6
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    jumpPage (page) {
      this.current_page = page
      this.$emit('achievementTrunPage', page) // 查看业绩
      this.$emit('orderLogTrunPage', page) // 订单记录
      this.$emit('discountTrunPage', page) // 优惠券兑换记录
      this.$emit('noticeTrunPage', page) // 公告列表
      this.$emit('activityLog', page) // 往期活动
      this.$emit('activityLogDetail', page) // 往期活动详情
      this.$emit('eatGameHome', page) // 吃饼游戏
      this.$emit('getRecordList', page) // 我的排位奖励
      this.$emit('rechargeTrun', page) // 充值
      this.$emit('withdrawTrun', page) // 提现
      this.$emit('usdTradeTrun', page) // USD交易
      this.$emit('finishedTrun', page) // USD已完成交易列表
      this.$emit('sieTradeTrun', page) // 交易
      this.$emit('transferTrun', page) // 转账
      this.$emit('finishedTrun1', page) // USD提现已完成交易列表
    },
    resetPage (val) {
      this.current_page = val
    }
  }
}
</script>
