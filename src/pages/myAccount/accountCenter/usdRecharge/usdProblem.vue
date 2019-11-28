<template>
  <div class="usd-problem">
    <!--  USD申诉 -->
    <h3 id="record-title">
      <span class="line"></span>
      <div>
        <router-link to="/account/usdOrder">{{$t('usdMoney.text1')}}</router-link>
        <span>&gt;</span>
        <span @click="backOrder" class="point">{{$t('usdMoney.text2')}}</span>
        <span>&gt;</span>
        <span>{{$t('usdMoney.text3')}}</span>
      </div>
    </h3>
    <div id="fixed-top-header">
      <div class="back" @click="$router.go(-1)"><div class="icon"></div></div>
      <h3 class="fixed-title">{{$t('usdMoney.text4')}}</h3>
      <div class="padding">
        <div class="dashed-line margin"></div>
      </div>
    </div>
    <div class="mobile-money">
      <p class="label-title">{{$t('usdMoney.text4')}}：</p>
      <h3 class="moneys">{{orderData.receiveAmount}} {{orderData.depositCurrency}}</h3>
      <div class="dashed-line"></div>
    </div>
    <div id="order-table">
      <div class="pc-table">
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text5')}}</div>
          <div>{{orderid}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text6')}}</div>
          <div class="await-status processed-status">{{orderStatus(orderData.status, orderData.payStatus, orderData.problemStatus)}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text7')}}</div>
          <div>{{orderData.receiveAmount}} {{orderData.depositCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text8')}}</div>
          <div>{{orderData.depositCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text9')}}</div>
          <div>{{orderData.receiveAmount}} {{orderData.depositCurrency}}</div>
        </div>
      </div>
      <div class="mobile-table">
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text10')}}：</div>
          <div>{{orderData.depositCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text11')}}：</div>
          <div>{{orderData.receiveAmount}} {{orderData.depositCurrency}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text6')}}</div>
          <div class="await-status processed-status">{{orderStatus(orderData.status, orderData.payStatus, orderData.problemStatus)}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text12')}}：</div>
          <div>{{orderid}}</div>
        </div>
        <div class="flex-item">
          <div class="text-left">{{$t('usdMoney.text13')}}：</div>
          <div>{{$changeDate(orderData.createAt)}}</div>
        </div>
      </div>
    </div>
    <div class="shensu-cont">
      <div class="shensu-cont-w">
        <h5 class="label-title">1、{{$t('usdMoney.text14')}}：</h5>
        <div class="text-box">
          <textarea class="textarea tradingCenter-input" :placeholder="$t('usdMoney.text15')"  v-model="problemContent" @input="textareaVal"></textarea>
          <div class="warm-num"><span class="text-count">{{descNum}}</span>/<span>500</span></div>
        </div>
        <p class="err-class">{{noneContent}}</p>
      </div>
      <div  class="upload-wrapper">
        <div class="img-lis" @click="fullscreenImg(item)" v-for="(item, index) in imgDataObj" :key="index">
          <img :src="item" alt="" @error="errorImg(item, index)">
          <div class="delete" @click.stop.prevent="deleteIndex(index)"><span class="icon"></span></div>
        </div>
        <div  class="img-loading-box" v-show="isLoading">
          <img  src="../../../../assets/images/login/loading.gif" alt="" class="img-loading">
        </div>
        <div  class="img-box" v-show="isMaxLoading">
          <input @change="fileChange()" ref="uploadFile" accept="image/*" placeholder="" type="file" id="upload_file"/>
          <div  class="text"><img class="upload_add" src="../../../../assets/images/myAccount/upload_add.svg" alt=""></div>
        </div>
      </div>
      <div  class="err-class">{{noneImg}}</div>
    </div>
    <div id="btn-red-submit" @click="submitShensu">{{$t('usdMoney.text_31')}}</div>
    <!-- 弹窗 -->
    <div class="pay-dialog-transfer" v-show="showDialog" @click="showDialog = false">
      <div class="dialog-content" @click.stop>
        <div class="close-confirm" @click="showDialog = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-box">
          <div class="confirmShow" v-show="confirmShow">
            <div class="dialog-title">{{$t('usdMoney.text16')}}</div>
            <div class="dialog-text">{{$t('usdMoney.text17')}}?</div>
          </div>
          <div class="text-error" v-show="!confirmShow">{{errMsg}}</div>
          <div class="pay-confim-btn" @click="shensuConfim">{{$t('dialog.text5')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {compress, dataURItoBlob} from '../../../../assets/js/upload'
export default {
  data () {
    return {
      showDialog: false,
      errMsg: '',
      confirmShow: true,
      isLoading: false,
      noneImg: '',
      descNum: 0,
      problemContent: '',
      imagesArr: [],
      isMaxLoading: true,
      orderData: [],
      fenhang: [],
      shouKuanData: [],
      orderid: this.$route.query.id,
      noneContent: '',
      imgDataObj: []
    }
  },
  created () {
    this.getOrderDetails()
  },
  methods: {
    async fileChange (e) {
      this.noneImg = ''
      let imgVal = this.$refs.uploadFile
      let imgObj = imgVal.files[0]
      if (imgObj) {
        let isLt2M = imgObj.size / 1024 / 1024 <= 5
        let isType = /(jpg|png|JPG|PNG|jpeg)$/g.test(imgObj.type)
        if (!(isLt2M && isType)) {
          this.noneImg = this.$t('usdMoney.text18')
          imgVal.value = ''
          return
        }
      } else {
        return
      }
      if (this.imgDataObj.length > 3) {
        this.noneImg = this.$t('usdMoney.text18')
        imgVal.value = ''
        return
      }
      this.isLoading = true
      if (this.imgDataObj.length > 2) {
        this.num = 4
        this.isMaxLoading = false
      } else {
        this.num = -1
        this.isMaxLoading = true
      }
      let reader = new FileReader()
      let self = this
      reader.readAsDataURL(imgObj)
      reader.onloadend = function () {
        let result = this.result
        let img = new Image()
        img.src = result
        img.onload = function () {
          let formData = new FormData()
          let data = compress(img)
          self.imgUrl = result
          let blob = dataURItoBlob(data)
          let reader2 = new FileReader()
          reader2.readAsArrayBuffer(blob)
          reader2.onloadend = function () {
            // let f = new File([this.result], imgObj.name)
            formData.append('file', self.$refs.uploadFile.files[0])
            formData.append('sourceType', 2)
            let config = {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
            self.$http.post(`${self.$api}/uploadfile/uploadimg`, formData, config).then((res) => {
              let rets = res.data
              if (rets.success === true && rets.status === 'success') {
                self.isLoading = false
                self.noneImg = ''
                // let srcData = JSON.parse(rets.data)
                // let src = srcData.baseimgurl[0] + srcData.key
                let src = rets.data[0].fileUrl
                self.imgDataObj.push(src)
                self.imagesArr.push({
                  imageKey: imgObj.name,
                  imageUrl: rets.data[0].fileName
                })
              } else {
                self.noneImg = rets.msg
              }
              //  可上传重复的图片
              imgVal.value = ''
            }).catch((err) => {
              self.isLoading = false
              console.log(err)
              imgVal.value = ''
              self.noneImg = this.$t('usdMoney.text20')
            })
          }
        }
      }
    },
    // 订单详情
    getOrderDetails () {
      this.postRequest('/deposit/depositDetail', {
        depositId: this.orderid
      }).then(res => {
        if (res.data.success === true) {
          this.orderData = res.data.data
          this.fenhang = this.orderData.remark.split(',')
          this.shouKuanData = JSON.parse(this.orderData.bossBankAccount)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 返回订单详情
    backOrder () {
      this.$router.push({
        path: '/account/usdOrder/usdRechargeInfo',
        query: {id: this.orderid}
      })
    },
    fullscreenImg () {},
    errorImg (item, index) {
      this.num = -1
      this.isMaxLoading = true
      this.imgDataObj.splice(index, 1)
      this.imagesArr.splice(index, 1)
    },
    deleteIndex (index) {
      this.num = -1
      this.isMaxLoading = true
      this.imgDataObj.splice(index, 1)
      this.imagesArr.splice(index, 1)
    },
    // 提交申诉
    submitShensu () {
      this.noneContent = ''
      this.noneImg = ''
      if (this.problemContent === '') {
        this.noneContent = this.$t('usdMoney.text15')
      }
      if (this.imgDataObj.length === 0) {
        this.noneImg = this.$t('usdMoney.text21')
      }
      if (this.problemContent !== '' && this.imgDataObj.length !== 0) {
        this.showDialog = true
        this.confirmShow = true
      }
      // this.$router.push('/account/usdRecharge/usdRechargeInfo')
    },
    // 申诉确认提交
    shensuConfim () {
      if (this.confirmShow === false) {
        this.showDialog = false
        this.errMsg = ''
      } else {
        this.postRequest('/problem/createProblem', {
          orderId: this.orderid, // 订单ID，选填
          resourceId: '1', // 申诉来源，1.充值，2:提现
          images: JSON.stringify(this.imagesArr), // 申诉图片数组
          content: this.problemContent // 申诉内容
        }).then(res => {
          console.log(res)
          if (res.data.success === true) {
            this.$router.push({
              path: '/account/usdOrder/usdRechargeInfo',
              query: {id: this.orderid}
            })
          } else {
            this.confirmShow = false
            this.errMsg = res.data.msg
          }
        }).catch(err => {
          console.log(err)
          this.confirmShow = false
          this.errMsg = this.$t('dialog.text12')
        })
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
    },
    // 订单状态
    orderStatus (type, payStatus, proStatus) { //  充值状态
      if (type === 1) {
        return this.$t('usdMoneyStatus.text1') // 待接单
      } else if (type === 2) {
        return this.$t('usdMoneyStatus.text2') // 老板拒绝接单
      } else if (type === 3 && payStatus === 3) {
        return this.$t('usdMoneyStatus.text3') // 等待完成打款
      } else if (type === 4) {
        return this.$t('usdMoneyStatus.text4') // 订单已取消
      } else if (type === 3 && payStatus === 4 && proStatus === null) {
        return this.$t('usdMoneyStatus.text5') // 等待对方确认收款
      } else if (type === 5 && payStatus === 6) {
        return this.$t('usdMoneyStatus.text6') // 订单已完成
      } else if (type === 3 && payStatus === 5 && proStatus === null) {
        return this.$t('usdMoneyStatus.text7') // 等待系统处理中
      } else if (proStatus !== null && (proStatus === 0 || proStatus === 1)) {
        return this.$t('usdMoneyStatus.text8') // 申诉中
      } else if (proStatus !== null && proStatus === 2) {
        return this.$t('usdMoneyStatus.text9') // 申诉已处理
      }
    },
    // 输入文字控制
    textareaVal () {
      this.descNum = this.problemContent.length
      this.noneContent = ''
      if (this.problemContent.length > 500) {
        this.descNum = 500
        this.problemContent = this.problemContent.substring(0, 500)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.point
  cursor pointer
.usd-problem
  padding-top: 70px;
  padding-left: 92px;
  max-width: 1070px;
  box-sizing: content-box;
  @media screen and (max-width: 1600px)
    padding: 0 50px
    max-width 100%
  @media screen and (max-width: 1200px)
    padding: 0
  #record-title
    a
      color #181818
  #fixed-top-header
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
    margin: 60px 0
  .shensu-cont
    @media screen and (max-width 1200px)
      padding: 0 15px 50px
    .shensu-cont-w
      @media screen and (max-width 1200px)
        background-color: #edeff1
    .label-title
      font-size: 20px
      color #181818
      padding-left: 22px
      margin-bottom: 20px
      @media screen and (max-width 1200px)
        padding: 15px
        margin-bottom: 0
        font-size: 17px
        font-weight:bold
    .text-box
      position: relative
      .textarea
        width: 100%
        line-height: 1.3
        height 340px
        border-radius 4px
        font-size: 20px
        color #181818
        font-family "Microsoft YaHei UI"
        padding: 40px 50px
        box-sizing border-box
        background-color: #fafbfc;
        border: 1px solid #d9d9d9
        @media screen and (max-width 1200px)
          border none
          height: 200px
          background-color: #edeff1
          padding: 0 20px 20px 20px
      .warm-num
        font-size: 16px
        color #181818
        position: absolute
        z-index: 30
        right: 20px
        bottom: 19px
    .upload-wrapper
      position: relative;
      margin-top: 30px;
      display: flex;
      align-items center
      .img-lis
        width: 88px
        height: 88px
        position: relative
        margin-right: 50px
        margin-bottom: 20px
        cursor pointer
        border: 1px solid #d9d9d9
        border-radius 4px
        background-color: #fbfbfb
        &:last-child
          margin-right: 0
        @media screen and (max-width 1200px)
          margin-right: 20px
          width: 60px
          height: 60px
        img
          width: 100%
          height: 100%
        .delete
          width: 20px
          height: 20px
          position: absolute
          right: -10px
          top: -10px
          background: url("../../../../assets/images/myAccount/upload_delete.svg") no-repeat center / cover
      .img-loading-box
        width: 88px;
        height: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        margin-right: 50px
        @media screen and (max-width 1200px)
          margin-right: 20px
          width: 60px
          height: 60px
        .img-loading
          display block
          width: 50px
          height: 50px
      .img-box
        width: 88px;
        height: 88px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px dashed #d9d9d9;
        position: relative;
        background-color: #fbfbfb
        border-radius 4px
        @media screen and (max-width 1200px)
          width: 60px
          height: 60px
        #upload_file
          position: absolute;
          top: 0;
          left: 0;
          width: 88px;
          height: 88px;
          display: block;
          cursor: pointer;
          opacity: 0;
          @media screen and (max-width 1200px)
            width: 60px
            height: 60px
        .text
          width: 44px
          height: 44px
          @media screen and (max-width 1200px)
            width: 20px
            height: 20px
          .upload_add
            display: block
            width:100%
            height:100%
    .err-class
      color: #fc534c;
      font-size: 16px;
  #btn-red-submit
    margin: 80px 0 150px
    @media screen and (max-width 1200px)
      margin: 0
      position: fixed
      left: 0
      bottom: 0
      width: 100%
</style>
