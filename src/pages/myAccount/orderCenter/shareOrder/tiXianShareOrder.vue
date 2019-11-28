<template>
  <div class="usd-info">
    <!--共享订单 提现 详情-->
    <h3 id="record-title">
      <span class="line"></span>
      <div>
        <span @click="goback" class="pointer">{{$t('shareOrderCenter.text17')}}</span>
        <span>&gt;</span>
        <span>{{$t('orderDetail.text2')}}</span>
      </div>
    </h3>
    <div id="fixed-top-header">
      <div class="back" @click="goback"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('usdTixian.text9')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="mobile-money">
      <p class="label-title">{{$t('usdTixian.text2')}}：</p>
      <h3 class="moneys" v-if="chongzhiOrderData.payCurrency === 'BTC'">{{chongzhiOrderData.drawAmount | eightNumber}} {{chongzhiOrderData.payCurrency}}</h3>
      <h3 class="moneys" v-if="chongzhiOrderData.payCurrency !== 'BTC'">{{chongzhiOrderData.drawAmount | fourNumber}} {{chongzhiOrderData.payCurrency}}</h3>
      <div class="dashed-line"></div>
    </div>
    <div id="order-table">
      <!--提现 pc-->
      <div class="pc-table" v-if="Number($route.query.isChongzhi) === 2">
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text5')}}</div>
          <div>{{chongzhiOrderData.id}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text6')}}</div>
          <div class="await-status processed-status">{{orderStatus(chongzhiOrderData.status, chongzhiOrderData.payStatus,chongzhiOrderData.problemStatus, chongzhiOrderData.problemId, chongzhiOrderData.id)}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdTixian.text2')}}</div>
          <div v-if="chongzhiOrderData.payCurrency === 'BTC'">{{chongzhiOrderData.drawAmount | eightNumber}} {{chongzhiOrderData.payCurrency}}</div>
          <div v-if="chongzhiOrderData.payCurrency !== 'BTC'">{{chongzhiOrderData.drawAmount | fourNumber}} {{chongzhiOrderData.payCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text8')}}</div>
          <div>{{chongzhiOrderData.payCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text9')}}</div>
          <div v-if="chongzhiOrderData.drawCurrency !=='BTC'">{{chongzhiOrderData.receiveAmount | fourNumber}} {{chongzhiOrderData.drawCurrency}}</div>
          <div v-if="chongzhiOrderData.drawCurrency ==='BTC'">{{chongzhiOrderData.receiveAmount | eightNumber}} {{chongzhiOrderData.drawCurrency}}</div>
        </div>
      </div>
      <!-- 提现 mobile-->
      <div class="mobile-table">
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoneyStatus.text10')}}：</div>
          <div>{{chongzhiOrderData.payCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoneyStatus.text11')}}：</div>
          <div v-if="chongzhiOrderData.drawCurrency !== 'BTC'">{{chongzhiOrderData.receiveAmount | fourNumber}} {{chongzhiOrderData.drawCurrency}}</div>
          <div v-if="chongzhiOrderData.drawCurrency === 'BTC'">{{chongzhiOrderData.receiveAmount | eightNumber}} {{chongzhiOrderData.drawCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text6')}}</div>
          <div class="await-status processed-status">{{orderStatus(chongzhiOrderData.status, chongzhiOrderData.payStatus,chongzhiOrderData.problemStatus, chongzhiOrderData.problemId, chongzhiOrderData.id)}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text12')}}：</div>
          <div>{{chongzhiOrderData.id}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text13')}}：</div>
          <div v-show="chongzhiOrderData.createAt">{{$changeDate(chongzhiOrderData.createAt)}}</div>
        </div>
      </div>
    </div>
    <div class="order-dakuan-info">
      <ul class="dakuan-uls">
        <!--提现的付款账户-->
        <li class="dakuan-list" :class="{'hidden-account': hiddenAccount1}" v-if="myBankInfo">
          <p class="desc desc-title pc-title">{{$t('usdTixian.text7')}}</p>
          <h3 class="record-title mobile-title">
            <div class="line-title">
              <span class="line"></span>
              <span>{{$t('usdTixian.text7')}}</span>
            </div>
            <div class="icon-img" @click="selecteAccount(1)"><div class="icon" :class="{'rotate-icon': hiddenAccount1}"></div></div>
          </h3>
          <div class="money-info" id="copyAddress_input5">
            <p class="desc">{{myBankInfo.realname}}</p>
            <p class="desc">{{myBankInfo.number}}</p>
            <p class="desc"><span>{{myBankInfo.bankname}}</span><span class="margin-left">{{myBankInfo.subbank}}</span></p>
            <p class="desc" v-if="myBankInfo.subbankaddress && myBankInfo.subbankaddress !== 'null'">{{myBankInfo.subbankaddress}}</p>
            <p class="desc" v-if="myBankInfo.iban !== 'null' && myBankInfo.iban">IBAN：{{myBankInfo.iban}}</p>
          </div>
          <div class="btn-copy" @click="copyAddress()"  data-clipboard-target="#copyAddress_input5" ref="addressCopy1" data-clipboard-action="copy">{{$t('safeSett.text14')}}</div>
        </li>
        <!-- 提现的收款人账户：-->
        <li class="dakuan-list"  :class="{'hidden-account': hiddenAccount2}" v-if="Number($route.query.isChongzhi) === 2 && bossBankInfo">
          <h3 class="record-title mobile-title">
            <div class="line-title">
              <span class="line"></span>
              <span>{{$t('usdMoney.text45')}}</span>
            </div>
            <div class="icon-img" @click="selecteAccount(2)"><div class="icon" :class="{'rotate-icon': hiddenAccount2}"></div></div>
          </h3>
          <p class="desc desc-title pc-title">{{$t('usdMoney.text45')}}：</p>
          <div class="money-info">
            <p class="desc">{{bossBankInfo.realname}}</p>
            <p class="desc">{{bossBankInfo.number}}</p>
            <p class="desc"><span>{{bossBankInfo.bankname}}</span><span class="margin-left">{{bossBankInfo.subbank}}</span></p>
            <p class="desc" v-show="bossBankInfo.subbankaddress && bossBankInfo.subbankaddress !== 'null'">{{bossBankInfo.subbankaddress}}</p>
            <p class="desc" v-show="bossBankInfo.iban && bossBankInfo.iban !== 'null'">IBAN：{{bossBankInfo.iban}}</p>
            <p class="desc" v-show="bossBankInfo.username && bossBankInfo.username !== 'null'">{{$t('usdMoney.text47')}}：{{bossBankInfo.username}}</p>
            <p class="desc tips" v-html="$t('usdOrder.text50')"></p>
          </div>
        </li>
        <div class="no-shoukuan" v-if="chongzhiOrderData.status === 1">
          <p class="label">1.{{$t('usdMoney.text_52')}}：</p>
          <div class="bind-btn" v-if="bankBindArr.length === 0" @click="$router.push('/account/transAccountManag/addAccount')">
            <div class="add-icon"></div>
            <span>{{$t('usdMoney.text53')}}</span>
          </div>
        </div>
        <!--收款人账户 v-if="bankBindArr.length === 0" -->
        <h3 class="record-title mobile-title" v-if="chongzhiOrderData.status === 2">
          <div class="line-title">
            <span class="line"></span>
            <span>{{$t('usdMoney.text45')}}</span>
          </div>
          <div class="icon-img" @click="selecteAccount(2)"><div class="icon" :class="{'rotate-icon': hiddenAccount2}"></div></div>
        </h3>
        <div v-if="chongzhiOrderData.status === 2" class="shoukuan-t" @click="gotoChoose">{{$t('usdTixian.text28')}}</div>
        <li class="dakuan-list mobile-dakaun-list" :class="{'hidden-account2': hiddenAccount2}" v-if="this.$route.query.bankId">
          <div class="money-info">
            <p class="desc">{{shouKunDa.realName}}</p>
            <p class="desc">{{shouKunDa.bankNumber}}</p>
            <p class="desc"><span>{{shouKunDa.bankName}}</span><span class="margin-left">{{shouKunDa.subBankName}}</span></p>
            <p class="desc" v-if="shouKunDa.bankAddress && shouKunDa.bankAddress !== 'null'">{{shouKunDa.bankAddress}}</p>
            <p class="desc" v-show="shouKunDa.iban && shouKunDa.iban !== 'null'">IBAN：{{shouKunDa.iban}}</p>
            <p class="desc" v-show="shouKunDa.username && shouKunDa.username !== 'null'">{{$t('usdMoney.text47')}}：{{shouKunDa.username}}</p>
          </div>
        </li>
        <!-- 1.选择付款账户-->
        <p v-if="chongzhiOrderData.status === 2" class="choose-text">1.{{$t('usdTixian.text14')}}</p>
        <ul class="showkuan-uls-data" v-if="chongzhiOrderData.status === 2" :class="{'hidden-account': hiddenAccount2}">
          <li v-show="isMoreShow1 && bankBindArr.length > 0" class="dakuan-list normal-selected" @click="selectOne(0, bankd0)">
            <div class="money-info">
              <p class="desc number"><span class="name">{{bankd0.realName}}</span></p>
              <p class="desc">{{bankd0.bankNumber}}</p>
              <p class="desc"><span class="bankname">{{bankd0.bankName}}</span><span>{{bankd0.subBankName}}</span></p>
              <p class="desc" v-if="bankd0.bankAddress && bankd0.bankAddress !== 'null'">{{bankd0.bankAddress}}</p>
              <p class="desc" v-show="bankd0.iban && bankd0.iban !== 'null'">IBAN：{{bankd0.iban}}</p>
            </div>
          </li>
          <li v-show="isMoreShow2" class="dakuan-list" @click="selectOne(index, list)" :class="{'normal-selected': currentSelect === index}" v-for="(list, index) in bankBindArr" :key="index">
            <div class="money-info">
              <p class="desc number"><span class="name">{{list.realName}}</span></p>
              <p class="desc">{{list.bankNumber}}</p>
              <p class="desc"><span class="bankname">{{list.bankName}}</span><span>{{list.subBankName}}</span></p>
              <p class="desc" v-if="list.bankAddress && list.bankAddress !== 'null'">{{list.bankAddress}}</p>
              <p class="desc" v-show="list.iban && list.iban !== 'null'">IBAN：{{list.iban}}</p>
            </div>
          </li>
        </ul>
        <li class="dakuan-more-address" @click="isSec2Show" v-if="chongzhiOrderData.status === 2 && bankBindArr.length > 1">
          <span class="address-more" v-if="isMoreShow1">{{$t('usdMoney.text54')}}</span>
          <span class="address-more" v-if="isMoreShow2">{{$t('usdTixian.text30')}}</span>
          <svg class="more-icon" :class="{'icon-more': isMoreShow2}" style="vertical-align: middle;fill: #898B8C;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4923"><path d="M120 936.256c-10.304 0-20.608-3.904-28.416-11.776-15.744-15.68-15.744-41.152 0-56.896L447.104 512 91.584 156.48c-15.744-15.68-15.744-41.152 0-56.896 15.68-15.744 41.152-15.744 56.896 0l384 384c15.744 15.68 15.744 41.152 0 56.896l-384 384C140.608 932.352 130.304 936.256 120 936.256zM520 936.256c-10.304 0-20.608-3.904-28.416-11.776-15.744-15.68-15.744-41.152 0-56.896L847.104 512 491.584 156.48c-15.744-15.68-15.744-41.152 0-56.896 15.68-15.744 41.152-15.744 56.896 0l384 384c15.744 15.68 15.744 41.152 0 56.896l-384 384C540.608 932.352 530.304 936.256 520 936.256z" p-id="4924"></path></svg>

        </li>
        <!-- 申诉内容-->
        <li class="dakuan-list shensu-bg" v-if="chongzhiOrderData.problemId !== null">
          <p class="desc desc-title mobile-title-shengsu">{{$t('usdMoney.text14')}}：</p>
          <p class="desc">{{userProblem.content}}</p>
          <ul class="img-uls">
            <li class="img-list" v-for="(item, index) in userProblem.images" :key="index"><img :src="item.imageUrl" alt=""></li>
          </ul>
        </li>
        <!-- 申诉反馈-->
        <li class="dakuan-list shensu-bg" v-show="managerReply.length > 0">
          <p class="desc desc-title fankui-title">{{$t('usdMoney.text49')}}：</p>
          <div class="desc" v-for="(list, index) in managerReply" :key="index">
            <div class="content-boss">{{list.content}}</div>
            <div class="img-uls">
              <div class="img-list" v-for="(listimg, index) in list.images" :key="index">
                <img :src="listimg.imageUrl" alt="">
              </div>
            </div>
          </div>
        </li>
        <!-- 申诉结果 共享者胜利-->
        <li class="dakuan-list shensu-bg" v-if="chongzhiOrderData.bossAddress === userProblem.backup2">
          <p class="desc desc-title fankui-title">{{$t('usdMoney.text72')}}：</p>
          <p class="desc">{{$t('usdMoney.text71')}}</p>
        </li>
        <!-- 申诉结果 用户胜诉-->
        <li class="dakuan-list shensu-bg" v-if="chongzhiOrderData.userAddress === userProblem.backup2">
          <p class="desc desc-title fankui-title">{{$t('usdMoney.text72')}}：</p>
          <p class="desc">{{$t('usdMoney.text70')}}</p>
        </li>
      </ul>
    </div>
    <div class="btn-w">
      <!-- 同意接单 -->
      <div class="btn" @click="creatChongzhiOrder" v-if="chongzhiOrderData.status === 2">{{$t('orderManage.text19')}}</div>
      <!-- 取消订单-->
      <div class="btn" @click="cancelShowDialog" v-if="chongzhiOrderData.status === 2" :class="{'two-btn': chongzhiOrderData.status === 2}">{{$t('orderManage.text20')}}</div>
      <!--提现打款-->
      <div class="btn" v-if="chongzhiOrderData.status === 5 && chongzhiOrderData.payStatus === 3" @click="daKuanZhuang">{{$t('usdMoney.text57')}}</div>
      <!-- 提现申诉 -->
      <div class="btn" v-if="chongzhiOrderData.status === 4 || (chongzhiOrderData.payStatus === 3 || chongzhiOrderData.payStatus === 4 && chongzhiOrderData.status === 5) && chongzhiOrderData.problemId === null"  :class="{'two-btn': chongzhiOrderData.status === 4 || (chongzhiOrderData.payStatus === 3 || chongzhiOrderData.payStatus === 4 && chongzhiOrderData.status === 5) && chongzhiOrderData.problemId === null}" @click="shenSuBtn">{{$t('usdMoney.text75')}}</div>
      <!-- 二次申诉-->
      <div class="btn" v-if="chongzhiOrderData.problemStatus !== 2 && chongzhiOrderData.problemId !== null && userProblem.userAddress !== '' && userProblem.userAddress !== userInfo.address && managerReply.length === 0" :class="{'two-btn': chongzhiOrderData.status === 3 && chongzhiOrderData.payStatus === 4 && chongzhiOrderData.problemId === null}" @click="shenSuBtn2">{{$t('usdMoney.text76')}}</div>
    </div>
    <!-- 弹窗 -->
    <div class="pay-dialog-transfer" v-show="showDialog" @click="showDialog = false">
      <div class="dialog-content" @click.stop>
        <div class="close-confirm" @click="showDialog = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-box">
          <div v-show="cancelDialog">
            <div v-show="cancelShow">
              <div class="confirmShow">
                <div class="dialog-title">{{$t('usdMoney.text58')}}</div>
                <div class="dialog-text">{{$t('usdMoney.text59')}}?</div>
              </div>
              <div class="pay-confim-btn" @click="cancelConfim">{{$t('sieTransfer.text10')}}</div>
            </div>
            <div v-show="!cancelShow">
              <div class="confirmShow">
                <div class="dialog-text">{{cancelMsg}}</div>
              </div>
              <div class="pay-confim-btn" @click="closeConfim">{{$t('sieTransfer.text10')}}</div>
            </div>
          </div>
          <!-- 打款转账 -->
          <div v-show="dakuanShow">
            <div class="confirmShow">
              <div class="dialog-title">{{$t('usdTixian.text19')}}</div>
              <div class="dialog-text">{{$t('usdTixian.text20')}}？</div>
            </div>
            <div class="pay-confim-btn" @click="daKuanConfim" :class="{disable: loadingConfim2}">
              <div class="btn-w" v-show="loadingConfim2">
                <div class="img-box">
                  <img src="../../../../assets/images/aiChat/loading.gif" alt="">
                </div>
              </div>
              <span>{{$t('sieTransfer.text10')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 确定接单 -->
    <div class="pay-dialog-transfer" v-show="showDialog2" @click="showDialog2 = false">
      <div class="dialog-content" @click.stop>
        <div class="close-confirm" @click="showDialog2 = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-box">
          <div>
            <div v-show="cancelShow2">
              <div class="confirmShow">
                <div class="dialog-text">{{$t('orderManage.text19')}}?</div>
              </div>
              <div class="pay-confim-btn" @click="jieDanConfim" :class="{disable: loadingConfim3}">
                <div class="btn-w" v-show="loadingConfim3">
                  <div class="img-box">
                    <img src="../../../../assets/images/aiChat/loading.gif" alt="">
                  </div>
                </div>
                <span>{{$t('sieTransfer.text10')}}</span>
              </div>
            </div>
            <div v-show="!cancelShow2">
              <div class="confirmShow">
                <div class="dialog-text">{{cancelMsg2}}</div>
              </div>
              <div class="pay-confim-btn" @click="jieDanCancel">{{$t('sieTransfer.text10')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 支付验证弹窗 -->
    <pay-money-dialog :productId="productId" :bankAccountId="bankAccountId" ref="payDialog"></pay-money-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import payMoneyDialog from '@/components/payMoneyDialog'
import Dialog from '@/components/globalDialog/dialog'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      loadingConfim2: false,
      loadingConfim3: false,
      copyBtn: null,
      jieDanSuccess: false,
      problemData: [],
      cancelShow2: true,
      cancelMsg2: '',
      showDialog2: false,
      bankAccountId: '',
      productId: '',
      cancelMsg: '',
      cancelDialog: false,
      showDialog: false,
      currentSelect: 0,
      aggreShow: true,
      rejectShow: false,
      dakuanShow: false,
      shensuShow: true,
      cancelShow: false,
      fenhang: '',
      bankd0: [],
      isMoreShow1: true,
      isMoreShow2: false,
      managerReply: [],
      bankBindArr: [],
      bossBankInfo: [],
      chongzhiOrderData: [],
      userProblem: [],
      hiddenAccount1: false,
      hiddenAccount2: false,
      myBankInfo: [],
      shouKunDa: [],
      orderId: this.$route.query.id
    }
  },
  created () {
    if (this.$route.query.bankId) {
      this.bankAccountId = this.$route.query.bankId
      this.getBanId()
    }
    this.getTixianOrder()
  },
  mounted () {
    this.copyBtn = new this.Clipboard(this.$refs.addressCopy1)
  },
  methods: {
    copyAddress () {
      let clipboard = this.copyBtn
      clipboard.on('success', () => {
        Dialog({
          msg: this.$t('myAccount.text29')
        })
        clipboard.destroy()
        this.copyBtn = new this.Clipboard(this.$refs.addressCopy1) // 复制
      })
    },
    // 返回上一页
    goback () {
      if (Number(this.$route.query.isStatus) > -1) {
        this.$router.push({
          path: '/account/notOpenShareOrder/shareOrder',
          query: {
            isStatus: this.$route.query.isStatus,
            isChongzhi: this.$route.query.isChongzhi,
            pageIndex: this.$route.query.pageIndex
          }
        })
      } else {
        this.$router.push('/account/notOpenShareOrder/shareOrder')
      }
    },
    isSec2Show () {
      this.currentSelect = 0
      if (this.isMoreShow1 === true) {
        this.isMoreShow2 = true
        this.isMoreShow1 = false
      } else {
        this.isMoreShow1 = true
        this.isMoreShow2 = false
      }
    },
    jieDanConfim () {
      this.loadingConfim3 = true
      this.postRequest('/draw/confirmByStep', {
        orderId: this.orderId,
        confirmState: '1',
        bankid: this.bankAccountId
      }).then(res => {
        if (res.data.success === true) {
          this.loadingConfim3 = false
          // this.showDialog2 = false
          this.getTixianOrder()
          this.jieDanSuccess = true
          this.showDialog2 = true
          this.cancelShow2 = false
          this.cancelMsg2 = this.$t('usdTixian.text36')
        } else {
          this.loadingConfim3 = false
          this.showDialog2 = true
          this.cancelShow2 = false
          this.cancelMsg2 = res.data.msg
        }
      }).catch(err => {
        this.loadingConfim3 = false
        console.log(err)
        this.showDialog2 = true
        this.cancelShow2 = false
        this.cancelMsg = this.$t('dialog.text12')
      })
    },
    jieDanCancel () {
      if (this.jieDanSuccess === true) {
        this.$router.push({
          path: '/account/notOpenShareOrder/shareOrder',
          query: {
            isStatus: this.$route.query.isStatus,
            isChongzhi: this.$route.query.isChongzhi,
            pageIndex: this.$route.query.pageIndex
          }
        })
      } else {
        this.showDialog2 = false
        this.cancelShow2 = false
      }
    },
    // 选择银行卡
    gotoChoose () {
      this.$router.push({
        path: '/account/notOpenShareOrder/shareOrder/chooseAccount',
        query: {
          id: this.$route.query.id,
          isChongzhi: this.$route.query.isChongzhi
        }
      })
    },
    selecteAccount (index) {
      if (index === 1) {
        this.hiddenAccount1 = !this.hiddenAccount1
      } else {
        this.hiddenAccount2 = !this.hiddenAccount2
      }
    },
    // 同意接单
    creatChongzhiOrder () {
      if (window.innerWidth < 1200) {
        if (this.$route.query.bankId) {
          this.bankAccountId = this.$route.query.bankId
          this.cancelShow2 = true
          this.showDialog2 = true
        }
      } else {
        this.cancelShow2 = true
        this.showDialog2 = true
      }
    },
    // 确认打款
    daKuanConfim () {
      this.loadingConfim2 = true
      this.postRequest('/draw/confirmByStep', {
        orderId: this.orderId,
        confirmState: '3'
      }).then(res => {
        if (res.data.success === true) {
          this.loadingConfim2 = false
          this.showDialog = false
          this.$router.push({
            path: '/account/notOpenShareOrder/shareOrder',
            query: {
              isStatus: this.$route.query.isStatus,
              isChongzhi: this.$route.query.isChongzhi,
              pageIndex: this.$route.query.pageIndex
            }
          })
          // this.$router.push('/account/notOpenShareOrder/shareOrder')
          this.getTixianOrder()
        } else {
          this.loadingConfim2 = false
          this.cancelDialog = true
          this.showDialog = true
          this.dakuanShow = false
          this.cancelShow = false
          this.cancelMsg = res.data.msg
        }
      }).catch(err => {
        console.log(err)
        this.showDialog = true
        this.dakuanShow = false
        this.cancelShow = false
        this.cancelMsg = this.$t('dialog.text12')
      })
    },
    closeConfim () {
      this.cancelMsg = ''
      this.cancelDialog = false
      this.cancelShow = true
      this.showDialog = false
      this.bossShow = false
    },
    cancelShowDialog () {
      this.cancelDialog = true
      this.showDialog = true
      this.cancelShow = true
    },
    // 弹窗取消订单
    cancelConfim () {
      this.cancelDialog = true
      this.postRequest('/draw/confirmByStep', {
        orderId: this.orderId,
        confirmState: '2'
      }).then(res => {
        this.cancelShow = false
        if (res.data.success === true) {
          this.cancelMsg = this.$t('usdMoneyStatus.text4')
          this.getTixianOrder()
          this.showDialog = false
        } else {
          this.cancelMsg = res.data.msg
        }
      }).catch(err => {
        console.log(err)
        this.cancelShow = false
        this.cancelMsg = this.$t('dialog.text12')
      })
    },
    // 打款
    daKuanZhuang () {
      this.cancelDialog = false
      this.dakuanShow = true
      this.showDialog = true
    },
    // 选择银行卡
    selectOne (index, item) {
      this.currentSelect = index
      this.bankAccountId = item.id
    },
    shenSuBtn () {
      this.$router.push({
        path: '/account/notOpenShareOrder/shareOrder/shareSetting/shareOrderDetails/shareProblem',
        query: {id: this.orderId, isChongzhi: this.$route.query.isChongzhi}
      })
    },
    shenSuBtn2 () {
      this.$router.push({
        path: '/account/notOpenShareOrder/shareOrder/shareSetting/shareOrderDetails/shareProblem',
        query: {id: this.orderId, isChongzhi: this.$route.query.isChongzhi, problemId: this.chongzhiOrderData.problemId}
      })
    },
    // 提现详情
    getTixianOrder () {
      this.postRequest('/draw/queryMyOrderDetail', {
        id: this.orderId
      }).then(res => {
        if (res.data.success === true) {
          this.chongzhiOrderData = res.data.data
          this.myBankInfo = JSON.parse(res.data.data.drawBankAccount)
          this.bossBankInfo = JSON.parse(res.data.data.bossDrawBankAccount)
          this.getBankInfo()
          if (this.chongzhiOrderData.problemId) {
            this.getProblem()
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 充值订单详情
    getOrderDetails () {
      this.postRequest('/deposit/depositDetail', {
        depositId: this.orderId
      }).then(res => {
        if (res.data.success === true) {
          this.chongzhiOrderData = res.data.data
          this.bossBankInfo = JSON.parse(res.data.data.bossBankAccount)
          this.fenhang = this.chongzhiOrderData.remark.split(',')
          if (this.chongzhiOrderData.problemId) {
            this.getProblem()
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 3.1.2 查看申诉问题详情
    getProblem () {
      this.$http.get(`${this.$api}/problem/get?problemId=${this.chongzhiOrderData.problemId}`).then(res => {
        if (res.data.success === true) {
          this.problemData = res.data.data
          this.userProblem = res.data.data.userProblem
          this.managerReply = res.data.data.managerReply
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getBanId () {
      this.postRequest('/bank/bankInfoDetail', {
        bankInfoId: this.$route.query.bankId // 币种
      }).then(res => {
        if (res.data.success === true) {
          this.shouKunDa = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 银行卡信息详情
    getBankInfo () {
      this.postRequest('/bank/queryBankInfoList', {
        currency: this.chongzhiOrderData.drawCurrency, // 币种
        pageIndex: '1', // 页数
        pageSize: '20' // 每页条数
      }).then(res => {
        if (res.data.success === true) {
          this.bankBindArr = res.data.data
          if (this.bankBindArr.length > 0) {
            this.bankAccountId = res.data.data[0].id
            this.bankd0 = this.bankBindArr[0]
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 订单状态
    orderStatus (type, payStatus, proStatus) { // 提现状态
      // Status=2,PayStatus=2可以接单
      // Status=4，PayStatus=3 老板确认打款
      // Status=4，PayStatus=4 用户确认收款
      if (type === 0) { // 提现
        return this.$t('usdOrder.text27') // 等待支付保证金
      } else if (type === 1) {
        return this.$t('usdOrder.text28') // 等待选择老板
      } else if (type === 2 && payStatus === 2) {
        return this.$t('usdOrder.text29') // 待接单
      } else if (type === 3) {
        return this.$t('usdOrder.text30') // 拒绝接单
      } else if (proStatus !== null && (proStatus === 0 || proStatus === 1)) {
        return this.$t('usdOrder.text35') // 申诉中
      } else if (proStatus !== null && proStatus === 2) {
        return this.$t('usdOrder.text36') // 申诉已处理
      } else if (type === 4) {
        return this.$t('usdOrder.text42') // 审核中
      } else if (type === 5 && payStatus === 3) {
        return this.$t('usdOrder.text_37') // 等待完成打款
      } else if (type === 5 && payStatus === 4) {
        return this.$t('usdOrder.text_38') // 等待确认收款
      } else if (type === 6) {
        return this.$t('usdOrder.text44') // 审核不通过
      } else if (type === 7) {
        return this.$t('usdOrder.text45') // 用户超时未支付系统取消
      } else if (type === 8) {
        return this.$t('usdOrder.text46') // 审核不通过给用户退款成功
      } else if (type === 9) {
        return this.$t('usdOrder.text47') // 审核不通过给用户退款失败
      } else if (type === 10) {
        return this.$t('usdOrder.text48') // 打款失败退款给用户
      } else if (type === 13) {
        return this.$t('usdOrder.text49') // 其他原因打款失败
      } else if (type === 12 && payStatus === 6) {
        return this.$t('usdOrder.text33') // 订单已完成
      } else if (type === 11) {
        return this.$t('usdOrder.text34') // 订单已取消
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
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    payMoneyDialog
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .pay-confim-btn
    display flex !important
    justify-content center
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
  .btn-copy
    cursor pointer
    color #FC534C
    margin-top: 10px
    @media screen and (max-width 1200px)
      margin: 0 0 15px 15px
  .content-boss
    margin-bottom: 10px
  .pointer
    cursor pointer
  .shoukuan-t
    padding: 15px
    display none
    @media screen and (max-width 1200px)
      display block
  .choose-text
    margin: 20px 0
    font-size: 20px
    @media screen and (max-width 1200px)
      display none
  .shoukuan-text
    margin: 20px 0
    font-size: 20px
    @media screen and (max-width 1200px)
      display none
  .shoukuan-text-mobile
    display none
    @media screen and (max-width 1200px)
      display block
  .mobile-title.record-title
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content space-between
    height: 60px;
    font-size: 22px;
    color: #181818;
    background-color: #edeff1;
    @media screen and (max-width 1200px)
      display: flex
      height: 46px
    @media screen and (min-width 1200px)
      display: none
    .line
      display: block;
      width: 10px;
      height: 22px;
      margin-right: 30px;
      background-color: #032e43;
    .line-title
      font-size: 18px
      display: flex
    .icon-img
      padding: 15px
      cursor pointer
      .icon
        width: 9px
        height: 14px
        transform rotate(-90deg)
        background: url("../../../../assets/images/myAccount/myDon/row-link-red.svg") no-repeat center / cover
        transition transform .3s linear
        &.rotate-icon
          transform rotate(90deg)
  .usd-info
    padding-top: 70px;
    padding-left: 92px;
    max-width: 1070px;
    box-sizing content-box
    @media screen and (max-width 1600px)
      padding-left: 50px
      padding-right: 50px
    @media screen and (max-width 1200px)
      padding: 0
      max-width 100%
    #fixed-top-header
      @media screen and (max-width 1200px)
        border-bottom none
    .mobile-money
      display: none
      color #181818
      padding: 80px 15px 0
      @media screen and (max-width 1200px)
        display: block
      .label-title
        font-size: 18px
      .moneys
        font-size: 24px
        margin: 20px 0 40px
        font-weight: bold
    #order-table
      margin: 60px 0 80px
      @media screen and (max-width 1200px)
        margin: 30px 0
        padding: 0 15px
      .pc-table
        @media screen and (max-width 1200px)
          display none
        @media screen and (min-width 1200px)
          display block
      .mobile-table
        @media screen and (max-width 1200px)
          display block
        @media screen and (min-width 1200px)
          display none
        .flex-item
          justify-content space-between
          padding: 0 15px
          div
            flex none
          .text-left
            padding: 0
      .await-status
        color #605f5f
      .processed-status
        color #fc534c
    .order-dakuan-info
      padding-bottom: 80px
      @media screen and (max-width 1200px)
        padding: 0 15px 80px 15px
      .dakuan-more-address
        cursor pointer
        display flex
        align-items center
        justify-content center
        height: 68px
        border: 1px solid #d9d9d9
        margin: 30px 0
        background-color: #fafbfc
        border-radius 4px
        @media screen and (max-width 1200px)
          display none
        .address-more
          margin-right: 14px
        .more-icon
          transform rotate(90deg)
          width: 16px
          height: 16px
          &.icon-more
            transform rotate(-90deg)
      .showkuan-uls-data
        cursor pointer
        max-height 8000px
        transition max-height .3s linear
        overflow: hidden
        &.hidden-account
          max-height 0
        @media screen and (max-width 1200px)
          display none
      .dakuan-list
        margin-bottom: 30px
        font-size: 18px
        color #181818
        padding: 30px 30px 30px 50px
        background-color: #fafbfc
        border: 1px solid #d9d9d9
        border-radius 4px
        transition max-height .3s linear
        max-height 800px
        overflow: hidden
        &:last-child
          margin-bottom: 0
        @media screen and (max-width 1200px)
          padding: 0
          border none
        &.hidden-account2
          max-height 0
        &.hidden-account
          max-height 46px
        &.shensu-bg
          @media screen and (max-width 1200px)
            background-color: #edeff1
            padding: 15px
            .mobile-title-shengsu
              font-weight: bold
              font-size: 17px
            .fankui-title
              font-size: 17px
              font-weight:bold
              color #fc534c
        &.normal-selected
          border-color: #fc534c
          box-shadow: 0 2px 10px rgba(252,83,76,0.5);
          @media screen and (max-width 1200px)
            box-shadow none
            border: 1px solid #fc534c
        .money-info
          @media screen and (max-width 1200px)
            padding: 15px
            background-color: #fafafa
        .pc-title
          @media screen and (max-width 1200px)
            display: none
          @media screen and (min-width 1200px)
            display: block
        .desc
          word-break: break-all;
          word-wrap:break-word;
          margin-bottom: 20px
          &:last-child
            margin-bottom: 0
          @media screen and (max-width 1200px)
            font-size: 14px
        .desc-title
          font-size: 20px
          margin-bottom: 30px
        .margin-left
          margin-left: 30px
        .img-uls
          display flex
          align-items center
          .img-list
            width: 88px
            height: 88px
            border: 1px solid #d9d9d9
            border-radius 4px
            margin-right: 30px
            &:last-child
              margin-right: 0
            @media screen and (max-width 1200px)
              margin-right: 10px
              width: 55px
              height: 55px
            img
              display: block
              width: 100%
              height: 100%
      .mobile-dakaun-list
        @media screen and (max-width 1200px)
          display block
        @media screen and (min-width 1200px)
          display none
      .no-shoukuan
        margin-bottom: 40px
        @media screen and (max-width 1200px)
          display none
        .label
          font-size: 20px
          color #181818
          margin: 60px 0 20px
        .bind-btn
          cursor pointer
          border-radius 4px
          width: 100%
          height: 100px
          border: 1px dashed #d9d9d9
          background-color: #fafbfc
          color #181818
          font-size: 20px
          display: flex
          align-items center
          justify-content center
          .add-icon
            width: 20px
            height: 20px
            margin-right: 14px
            background: url("../../../../assets/images/myAccount/upload_add.svg") no-repeat center / cover
    .btn-w
      padding-bottom: 100px
      @media screen and (max-width 1200px)
        padding-bottom: 0
        position: fixed
        left:0
        bottom: 0
        width: 100%
        z-index: 20
        display flex
        align-items center
      .btn
        cursor pointer
        width: 100%
        height: 68px
        border-radius 4px
        display: flex
        align-items center
        justify-content center
        color #fff
        background-color: #fc534c
        margin-bottom: 20px
        margin-top 20px
        @media screen and (max-width 1200px)
          height: 46px
          margin-bottom: 0
          margin-top 0
          border-radius 0
      .two-btn
        margin-top: 30px
        background-color: #edeff1
        color #181818
        @media screen and (max-width 1200px)
          margin-top: 0
          background-color: #032e43
          color #fff
</style>
