<template>
  <div class="share-setting">
    <!-- 共享设置-->
    <div class="pc-share-setting">
      <h3 id="record-title">
        <span class="line"></span>
        <div>
          <router-link to="/account/notOpenShareOrder/shareOrder">{{$t('myAccount.text21')}}</router-link>
          <span>&gt;</span>
          <span>{{$t('shareOrderCenter.text19')}}</span>
        </div>
      </h3>
      <div class="setting-cont">
        <div class="form-item">
          <h5 class="label">1.{{$t('shareOrderCenter.text20')}}：</h5>
          <div class="flex-c">
            <div class="flex-item">
              <span>{{$t('shareOrderCenter.text21')}}：</span>
              <span>{{bossInfo.realName}}</span>
            </div>
            <div class="flex-item">
              <span>{{$t('shareOrderCenter.text22')}}：</span>
              <span v-if="bossInfo.mobile">+{{bossInfo.mobileCode}}  {{bossInfo.mobile}}</span>
            </div>
            <div class="flex-item">
              <span>{{$t('shareOrderCenter.text23')}}：</span>
              <span v-if="bossInfo.location">{{bossInfo.location}}</span>
              <span v-else>-</span>
            </div>
          </div>
        </div>
        <div class="form-item">
          <h5 class="label">2.{{$t('shareOrderCenter.text24')}}：</h5>
          <p class="form-desc">{{$t('shareOrderCenter.text31')}}<span class="cursor" @click="showPayDialog">{{$t('shareOrderCenter.text32')}}</span></p>
          <div class="flex-c">
            <div class="flex-item">
              <span>{{$t('shareOrderCenter.text25')}}：</span>
              <!-- PC端支持服务增加switch -->
              <div class="switch-group">
                <div class="switch" @click="changeTargetStatus" :class="{'checked-switch': checkFlag}">
                  <div class="circle"></div>
                </div>
                <div class="switch-text">{{moneyStatus(supportDeposit)}}</div>
              </div>
            </div>
            <div class="flex-item">
              <span>{{$t('shareOrderCenter.text26')}}：</span>
              <div class="switch-group">
                <div class="switch" @click="changeStatus" :class="{'checked-switch': otherCheckFlag}">
                  <div class="circle"></div>
                </div>
                <div class="switch-text">{{moneyStatus(supportDraw)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-item">
          <h5 class="label">3.{{$t('usdMoney.text26')}}：</h5>
          <div class="btn-switch">
            <div class="btn" @click="orderStatus(0)" :class="{'btn-checked': currentIndex === 0}">CNY（{{bankBindArr.length}}）</div>
            <div class="btn" @click="orderStatus(1)" :class="{'btn-checked': currentIndex === 1}">USD（{{bankBindArr2.length}}）</div>
          </div>
        </div>
        <div class="account-w">
          <ul id="account-banduls">
            <!-- CNY-->
            <li class="account-band-list" v-for="(list, index) in bankBindArr" :key="index" v-if="currentIndex === 0">
              <div class="list-cont">
                <p class="desc number"><span class="name">{{list.realName}}</span></p>
                <p class="desc">{{list.bankNumber}}</p>
                <p class="desc"><span class="bankname">{{list.bankName}}</span><span v-if="list.subBankName && list.subBankName !== 'null'">{{list.subBankName}}</span></p>
                <p class="desc" v-if="list.bankAddress && list.bankAddress !== 'null'">{{$t('transAccountManag.text4')}}: {{list.bankAddress}}</p>
                <p class="desc" v-else>{{$t('transAccountManag.text4')}}: -</p>
                <p class="desc" v-if="list.iban && list.iban !== 'null'">IBAN: {{list.iban}}</p>
                <p class="desc" v-else>IBAN: -</p>
                <div class="btn-info">
                  <div class="btns" @click="editorBank(list.id)">{{$t('transAccountManag.text2')}}</div>
                  <div class="btns" @click="deleteBank(list.id)">{{$t('transAccountManag.text3')}}</div>
                </div>
              </div>
            </li>
            <!--USD-->
            <li class="account-band-list" v-for="(list, index) in bankBindArr2" :key="index" v-if="currentIndex === 1">
              <div class="list-cont">
                <p class="desc number"><span class="name">{{list.realName}}</span></p>
                <p class="desc">{{list.bankNumber}}</p>
                <p class="desc"><span class="bankname">{{list.bankName}}</span><span v-if="list.subBankName && list.subBankName !== 'null'">{{list.subBankName}}</span></p>
                <p class="desc" v-if="list.bankAddress && list.bankAddress !== 'null'">{{$t('transAccountManag.text4')}}: {{list.bankAddress}}</p>
                <p class="desc" v-else>{{$t('transAccountManag.text4')}}: -</p>
                <p class="desc" v-if="list.iban && list.iban !== 'null'">IBAN: {{list.iban}}</p>
                <p class="desc" v-else>IBAN: -</p>
                <div class="btn-info">
                  <div class="btns" @click="editorBank(list.id)">{{$t('transAccountManag.text2')}}</div>
                  <div class="btns" @click="deleteBank(list.id)">{{$t('transAccountManag.text3')}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div id="btn-red-submit" @click="$router.push('/account/transAccountManag/addAccount')">{{$t('shareOrderCenter.text27')}}</div>
      </div>
    </div>
    <div class="mobile-share-setting">
      <div id="fixed-top-header">
        <div class="back" @click="$router.go(-1)">
          <div class="icon"></div>
        </div>
        <h3 class="fixed-title">{{$t('myAccount.text21')}}</h3>
        <div class="padding">
          <div class="dashed-line margin"></div>
        </div>
      </div>
      <div class="mobile-share-w">
        <div class="form-item margin-one">
          <span>{{$t('shareOrderCenter.text25')}}</span>
          <div class="switch" @click="changeTargetStatus" :class="{'checked-switch': checkFlag}">
            <div class="circle"></div>
          </div>
        </div>
        <div class="form-item margin-two">
          <span>{{$t('shareOrderCenter.text26')}}</span>
          <div class="switch"  @click="changeStatus" :class="{'checked-switch': otherCheckFlag}">
            <div class="circle"></div>
          </div>
        </div>
        <div class="form-item odd-item">
          <span>{{$t('shareOrderCenter.text21')}}</span>
          <span>{{bossInfo.realName}}</span>
        </div>
        <div class="form-item even-item">
          <span>{{$t('shareOrderCenter.text22')}}</span>
          <span v-if="bossInfo.mobile">+{{bossInfo.mobileCode}}  {{bossInfo.mobile}}</span>
        </div>
        <div class="form-item-address margin-two odd-item">
          <p>{{$t('shareOrderCenter.text23')}}：</p>
          <span v-if="bossInfo.location">{{bossInfo.location}}</span>
          <span v-else>-</span>
        </div>
        <div class="flex-betwen" @click="showPayDialog">
          <div class="left">{{$t('shareOrderCenter.text30')}}</div>
          <div class="icon"></div>
        </div>
        <div class="account-band">
          <div class="jiaoyi">{{$t('usdMoney.text26')}}：</div>
          <div class="right" @click="showMoney = !showMoney">
            <span class="money">{{currentMoney}}</span>
            <span class="select-icon" :class="{'rotate-icon': showMoney}"></span>
          </div>
          <ul class="money-uls" :class="{'option-heigth': showMoney}">
            <li class="money-list" :class="{'current-money-list': indexMoney === index}" v-for="(item, index) in moneyCurrent" :key="index" @click="checkOne(item, index)">{{item}}</li>
          </ul>
        </div>
        <ul class="account-uls">
          <!-- CNY-->
          <li class="account-list" v-for="(list, index) in bankBindArr" :key="index" v-if="indexMoney === 0">
            <div class="list-cont">
              <p class="desc number"><span class="name">{{list.realName}}</span></p>
              <p class="desc">{{list.bankNumber}}</p>
              <p class="desc"><span class="bankname">{{list.bankName}}</span><span>{{list.subBankName}}</span></p>
              <p class="desc" v-if="list.bankAddress && list.bankAddress !== 'null'">{{list.bankAddress}}</p>
              <p class="desc" v-if="list.iban && list.iban !== 'null'">IBAN: {{list.iban}}</p>
            </div>
            <div class="dashed-line" v-show="bankBindArr.length > 1"></div>
          </li>
          <!--USD-->
          <li class="account-list" v-for="(list, index) in bankBindArr2" :key="index" v-if="indexMoney === 1">
            <div class="list-cont">
              <p class="desc number"><span class="name">{{list.realName}}</span></p>
              <p class="desc">{{list.bankNumber}}</p>
              <p class="desc"><span class="bankname">{{list.bankName}}</span><span>{{list.subBankName}}</span></p>
              <p class="desc" v-if="list.bankAddress">{{list.bankAddress}}</p>
              <p class="desc" v-if="list.iban && list.iban !== 'null'">IBAN: {{list.iban}}</p>
            </div>
            <div class="dashed-line" v-show="bankBindArr2.length > 1"></div>
          </li>
        </ul>
        <div class="btn-red-add" @click="$router.push('/account/transAccountManag/addAccount')">{{$t('transAccountManag.text5')}}</div>
      </div>
    </div>
    <pay-money-dialog :tuiMoney="true" ref="dialog"></pay-money-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import payMoneyDialog from '@/components/payMoneyDialog'
export default {
  data () {
    return {
      currentIndex: 0,
      indexMoney: 0,
      showMoney: false,
      checkFlag: false,
      otherCheckFlag: false,
      currentMoney: 'CNY',
      bossInfo: '',
      bankBindArr: [],
      bankBindArr2: [],
      moneyCurrent: ['CNY', 'USD'],
      supportDeposit: '', // 默认不支持充值
      supportDraw: '' // 默认不支持提现
    }
  },
  created () {
    this.getBankInfo()
    this.getBankInfo2()
    this.getBossInfo()
  },
  methods: {
    showPayDialog () {
      this.$refs.dialog.show()
    },
    // 删除银行卡信息
    deleteBank (id) {
      let url = `${this.$api}/bank/delBankInfo?bankInfoId=${id}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          if (this.indexMoney === 0) {
            this.getBankInfo()
          } else if (this.indexMoney === 1) {
            this.getBankInfo2()
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    editorBank (id) {
      this.$router.push({
        path: '/account/transAccountManag/addAccount',
        query: {id: id}
      })
    },
    // 判断初始状态
    drugeStatus () {
      if (this.supportDeposit === 0) {
        this.checkFlag = false
      } else {
        this.checkFlag = true
      }
    },
    drugeStatusOther () {
      if (this.supportDraw === 0) {
        this.otherCheckFlag = false
      } else {
        this.otherCheckFlag = true
      }
    },
    // 查询钱老板信息
    getBossInfo () {
      this.postRequest('/boss/queryBossInfoByAddress').then(res => {
        // console.log(res.data.data)
        if (res.data.success === true) {
          this.bossInfo = res.data.data
          this.supportDeposit = this.bossInfo.supportDeposit
          this.drugeStatus()
          this.supportDraw = this.bossInfo.supportDraw
          this.drugeStatusOther()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 订单状态切换
    orderStatus (index) {
      if (index === 0) {
        this.currentMoney = 'CNY'
      } else {
        this.currentMoney = 'USD'
      }
      this.currentIndex = index
    },
    // 切换提现开关
    changeStatus () {
      let fom = new FormData()
      let data = {}
      let dataBTC = {}
      data.currency = 'CNY'
      dataBTC.currency = 'BTC'
      if (this.supportDraw === 1) {
        data.supportDraw = 0
        dataBTC.supportDraw = 0
      } else {
        data.supportDraw = 1
        dataBTC.supportDraw = 1
      }
      data.bossInfoId = this.bossInfo.id
      dataBTC.bossInfoId = this.bossInfo.id
      data.drawRate = '0'
      dataBTC.drawRate = '0'
      let str = `[${JSON.stringify(data)}, ${JSON.stringify(dataBTC)}]`
      console.log(str)
      fom.append('drawSet', str)
      this.$http.post(`${this.$api}/boss/editBossInfo`, fom).then((res) => {
        if (res.data.success) {
          // console.log(this.supportDraw)
          if (this.supportDraw === 0) {
            this.otherCheckFlag = true
            this.supportDraw = 1
            this.getBossInfo()
          } else if (this.supportDraw === 1) {
            this.otherCheckFlag = false
            this.supportDraw = 0
            this.getBossInfo()
          }
        }
      })
    },
    // 切换充值提现
    changeTargetStatus () {
      let fom = new FormData()
      let data = {}
      let dataBTC = {}
      data.currency = 'CNY'
      dataBTC.currency = 'BTC'
      // data.supportDeposit = `${this.supportDeposit}`
      data.depositRate = '0'
      dataBTC.depositRate = '0'
      data.bankInfoIds = '2'
      dataBTC.bankInfoIds = '2'
      if (this.supportDeposit === 1) {
        data.supportDeposit = 0
        dataBTC.supportDeposit = 0
      } else {
        data.supportDeposit = 1
        dataBTC.supportDeposit = 1
      }
      let str = `[${JSON.stringify(data)}, ${JSON.stringify(dataBTC)}]`
      fom.append('depositeSet', str)
      fom.append('bossInfoId', this.bossInfo.id)
      this.$http.post(`${this.$api}/boss/editBossInfo`, fom).then((res) => {
        if (res.data.success) {
          if (this.supportDeposit === 0) {
            this.checkFlag = true
            this.supportDeposit = 1
            this.getBossInfo()
          } else if (this.supportDeposit === 1) {
            this.checkFlag = false
            this.supportDeposit = 0
            this.getBossInfo()
          }
        } else {
          return null
        }
      })
    },
    // 银行卡信息详情
    getBankInfo () {
      this.postRequest('/bank/queryBankInfoList', {
        currency: 'CNY', // 币种
        pageIndex: '1', // 页数
        pageSize: '20' // 每页条数
      }).then(res => {
        if (res.data.success === true) {
          this.bankBindArr = res.data.data
          if (this.bankBindArr.length > 0) {
            this.bankAccountId = this.bankBindArr[0].id
            this.comfirmBankName = this.bankBindArr[0].bankName
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getBankInfo2 () {
      this.postRequest('/bank/queryBankInfoList', {
        currency: 'USD', // 币种
        pageIndex: '1', // 页数
        pageSize: '20' // 每页条数
      }).then(res => {
        if (res.data.success === true) {
          this.bankBindArr2 = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
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
    // 添加新交易账户
    addNewAccount () {},
    // 选择币种
    checkOne (item, index) {
      this.indexMoney = index
      this.showMoney = false
      this.currentMoney = item
      if (index === 1) {
        this.getBankInfo2()
      } else {
        this.getBankInfo()
      }
    },
    // 充值、提现 状态
    moneyStatus (status) {
      if (status === 0) {
        return this.$t('shareOrderCenter.text28')
      } else {
        return this.$t('shareOrderCenter.text29')
      }
    }
  },
  components: {
    payMoneyDialog
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.flex-betwen
  display flex
  align-items center
  justify-content space-between
  background-color: #edeff1
  margin: 30px 0
  height 50px
  padding-right: 15px
  .left
    line-height: 1;
    color: #181818;
    border-left: 6px solid #032e43;
    padding-left: 10px;
  .icon
    width: 9px
    height: 14px
    background: url("../../../../assets/images/myAccount/myDon/row-link-red.svg") no-repeat center / cover
.form-desc
  font-size: 16px
  color #595959
  margin: 10px 0 20px
  .cursor
    cursor pointer
    line-height: 1
    border-bottom: 1px solid #FC534C
    color #FC534C
.share-setting
  padding-top: 70px;
  padding-left: 92px;
  max-width: 1000px;
  box-sizing content-box
  #record-title
    a
      color #181818
  @media screen and (max-width 1600px)
    padding-left: 50px
    padding-right: 50px
  @media screen and (max-width 1200px)
    padding: 0
    max-width 100%
  #fixed-top-header
    @media screen and (max-width 1200px)
      border-bottom: none
  .setting-cont
    margin-top: 60px
    .form-item
      .label
        font-size: 20px
        color #181818
        margin: 40px 0 20px
      .flex-c
        .flex-item
          height: 64px
          display: flex
          align-items center
          justify-content space-between
          padding: 0 50px 0 40px
          .switch-group
            display flex
            height auto
            min-width 100px
            flex-direction column
            align-items flex-end
            position: relative
            .switch
              width: 48px
              height: 25px
              background-color: #cdd0d1
              border-radius 25px
              position: relative
              cursor pointer
              &.checked-switch
                background-color: #10d1a1
                .circle
                  left: 24px
              .circle
                width: 23px
                height: 23px
                background-color: #fff
                position: absolute
                left: 1px
                top: 1px
                border-radius 50%
                transition left .3s linear
          &:nth-child(even)
            background-color: #fcfcfc
          &:nth-child(odd)
            background-color: #f5f6f7
    .account-w
      padding-top: 60px
      border-top: 1px dashed #bbb
  #btn-red-submit
    margin: 80px 0 100px
  .pc-share-setting
    @media screen and (max-width 1200px)
      display none
    @media screen and (min-width 1200px)
      display block
  .mobile-share-setting
    @media screen and (max-width 1200px)
      display block
    @media screen and (min-width 1200px)
      display none
    .mobile-share-w
      padding: 80px 15px 50px
      .form-item
        width: 100%
        height: 50px
        background-color: #edeff1
        padding: 0 15px
        font-size: 14px
        display: flex
        align-items center
        justify-content space-between
      .form-item-address
        padding: 10px 15px
        p
          line-height: 1.5
      .margin-one
        margin-bottom: 10px
      .margin-two
        margin-bottom: 30px
      .odd-item
        background-color: #edeff1
      .even-item
        background-color: #fbfbfb
      .switch
        width: 48px
        height: 25px
        background-color: #cdd0d1
        border-radius 25px
        position: relative
        cursor pointer
        &.checked-switch
          background-color: #10d1a1
          .circle
            left: 24px
        .circle
          width: 23px
          height: 23px
          background-color: #fff
          position: absolute
          left: 1px
          top: 1px
          border-radius 50%
          transition left .3s linear
      .account-band
        position: relative
        background-color: #edeff1
        padding-right: 15px
        height: 50px
        display: flex
        align-items center
        justify-content space-between
        font-size: 16px
        .money-uls
          position: absolute
          top: 100%
          left: 0
          width: 100%
          max-height 0
          overflow: hidden
          transition max-height .3s linear
          &.option-heigth
            max-height 200px
          .money-list
            cursor pointer
            background-color: #f0f2f5
            color: #656464;
            display flex
            align-items center
            padding-left: 15px;
            height: 40px;
            font-size: 14px;
            &.current-money-list
              color: #4e4f4f;
              font-weight: bold;
        .jiaoyi
          line-height: 1
          color #181818
          border-left: 6px solid #032e43
          padding-left: 10px
        .right
          display flex
          align-items center
          cursor pointer
          .money
            color #181818
            margin-right: 10px
          .select-icon
            display: block
            width: 9px
            height: 14px
            transform rotate(90deg)
            transition transform .3s linear
            background: url("../../../../assets/images/myAccount/myDon/row-link-red.svg") no-repeat center / cover
            &.rotate-icon
              transform rotate(-90deg)
      .account-uls
        background-color: #FAFAFA
        margin-bottom: 80px
        .account-list
          &:last-child
            .dashed-line
              display none
          .list-cont
            padding: 20px 15px
          .desc
            font-size: 16px
            color #181818
            margin-bottom: 10px
            word-break: break-all;
            word-wrap:break-word;
            &:last-child
              margin-bottom: 0
            .marginleft
              margin-right: 20px
      .btn-red-add
        cursor pointer
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        height: 46px
        line-height: 46px
        color #fff
        text-align: center
        background-color: #fc534c
</style>
