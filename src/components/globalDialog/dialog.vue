<template>
  <transition name="dialog">
    <div class="g-dialog" v-if="visible">
      <div class="g-dialog-mask"></div>
      <div class="g-dialog-wrap">
        <i class="g-dialog-close" @click="visible = false"></i>
        <div class="g-dialog-title">{{title}}</div>
        <div class="g-dialog-content" :style="{textAlign: align}">{{msg}}</div>
        <div class="g-dialog-btn-wrap">
          <button v-if="type !== 'alert'" class="g-dialog-btn g-dialog-cancel" @click="cancelCallback">{{cancelText}}</button>
          <button class="g-dialog-btn g-dialog-ok" @click="okCallback">{{okText}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  props: {
    type: String,
    title: String,
    msg: String,
    okFn: Function,
    okText: String,
    cancelFn: Function,
    cancelText: String,
    align: String
  },
  methods: {
    okCallback () {
      this.visible = false
      this.okFn && this.okFn()
    },
    cancelCallback () {
      this.visible = false
      this.cancelFn && this.cancelFn()
    }
  }
}
</script>

<style lang="less">
  @btnColor: #fc534c;
  .full () {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .g-dialog{
    .full();
    position: fixed;
    color: #333333;
    z-index: 999;
    &-mask{
      .full();
      position: absolute;
      background: rgba(0,0,0,.5)
    }
    &-wrap{
      position: absolute;
      width: 600px;
      transform: translate(-50%,-50%);
      left: 50%;
      top: 50%;
      background: #fff;
      padding: 100px 80px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      @media screen and (max-width:1200px) {
        width: 90%;
        padding: 50px 40px;
      }
    }
    &-close{
      position: absolute;
      right: 20px;
      top: 20px;
      width: 20px;
      height: 20px;
      background: url(~@/assets/images/header/close.png) no-repeat center;
      background-size: 20px;
      cursor: pointer;
    }
    &-title{
      font-size: 32px;
      line-height: 1;
      margin-bottom: 40px;
    }
    &-content{
      font-size: 24px;
      color: #f75050;
    }
    &-btn-wrap{
      padding-top: 60px;
      text-align: center;
      display: flex;
      justify-content: space-between;
    }
    &-btn{
      display: inline-block;
      height: 48px;
      border: 1px solid @btnColor;
      cursor: pointer;
      font-size: 20px;
      color: #fff;
      border-radius: 4px;
    }
    &-ok{
      width: 100%;
      background: @btnColor;
      transition: .4s;
      &:hover{
        background: darken(@btnColor, 10%);
      }
    }
    &-cancel{
      width: 45%;
      color: @btnColor;
      & + button{
        width: 100%;
        width: 45%;
      }
    }
  }
  .dialog-enter,.dialog-leave-to{
    opacity: 0;
    .g-dialog-wrap{
      transform: translate(-50%, -55%)
    }
  }
  .dialog-enter-active{
    transition: .3s;
    .g-dialog-wrap{
      transition: .3s
    }
  }
  .dialog-leave-active{
    transition: .1s;
    .g-dialog-wrap{
      transition: .1s
    }
  }
</style>
