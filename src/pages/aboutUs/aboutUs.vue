<template>
  <div class="aboutUs">
    <div class="banner">
      <div class="title">
        <div class="h4">{{$t('aboutUs.text1')}}</div>
        <hr>
        <div class="h2">{{$t('aboutUs.text2')}}</div>
      </div>
    </div>
    <div class="main">
      <div class="titleTab">
        <!--<div class="listTab tabSty"></div>
        <div class="listTab tabSty houTab"><i></i><span></span></div>
        <div class="listTab houTab lastListTab"><i></i><span></span></div>-->
        <div class="listTab tabSty" :class="{'tabSty': index == 0 || index == 1,'houTab': index == 1 || index == 2, 'lastListTab': index == 2,'active': activeIndex == index}"  @mouseover="tabChang(index, 1)" @click="tabChang(index, 3)" v-for="(item,index) in $t('aboutUs.tabData')" :key="index">
          <i></i>
          <span></span>
          {{item.title}}
        </div>
      </div>
      <div class="main-box">
        <div class="textcontent">
            <div class="textP" :class="{'activeColor': activeColor === 0}" id="active0">{{$t('aboutUs.textcontent1')}}</div>
        </div>
        <div class="textcontent">
          <div class="textP" :class="{'activeColor': activeColor === 1}" id="active1">{{$t('aboutUs.textcontent2')}}</div>
        </div>
        <div class="textcontent">
          <div class="textP" :class="{'activeColor': activeColor === 2}" id="active2">{{$t('aboutUs.textcontent3')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
  .aboutUs{
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  .banner{
    width: 100%;
    height: 380px;
    border-bottom: 1px solid #edeff1;
    display: flex;
    align-items: center;
    .title{
      width: auto;
      height: auto;
      color: #181818;
      margin: 0 auto;
      .h4{
        font-size: 14px;
        text-align: center;
      }
      hr{
        width: 20px;
        background-color: #666;
        margin: 20px auto 30px;
      }
      .h2{
        font-size: 30px;
      }
    }
  }
  .main{
    width: 1148px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 120px;
    @media screen and (max-width: 1200px){
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;
    }
    .titleTab{
      width: 100%;
      height: 48px;
      line-height: 48px;
      display: flex;
      font-size: 14px;
      color: #181818;
      background-color: #edeff1;
      margin: 54px auto 40px;
      @media screen and (max-width: 1024px){
        display: block;
        height: auto;
        background-color: #fff;
      }
      .listTab{
        flex: 1;
        float: left;
        height: 100%;
        text-align: center;
        position: relative;
        cursor: pointer;
        @media screen and (max-width: 1024px){
          display: block;
          float: none;
          background-color: #edeff1;
          margin-bottom: 10px;
        }
        &:hover{
          background-color: #032e43;
          color: #fff;
          animation: tabAction .2s ease 1;
          transition: animation 1s;
          @keyframes tabAction {
            0% {transform: scale(1.0); opacity: 1}
            50% {transform: scale(0.999); opacity: 0.8}
            100% {transform: scale(1.0); opacity: 1}
          }
          &:before{
            content: '';
            display: block;
            top: 0;
            right: -25px;
            transform: rotate(180deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #edeff1;
            border-top: 0;
            border-color: #edeff1 transparent;
          }
          &:after{
            content: '';
            display: block;
            bottom: 0px;
            right: -25px;
            transform: rotate(0deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #edeff1;
            border-top: 0;
            border-color: #edeff1 transparent;
          }
          @media screen and (max-width: 1024px){
            &:before{
              display: none;
            }
            &:after{
              display: none;
            }
          }
        }
        &.active{
          background-color: #032e43;
          color: #fff;
          &:before{
            content: '';
            display: block;
            top: 0;
            right: -25px;
            transform: rotate(180deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #edeff1;
            border-top: 0;
            border-color: #edeff1 transparent;
            @media screen and (max-width: 1024px){
              content: '';
              display: block;
              top: 0;
              right: -20px;
              transform: rotate(180deg);
              position: absolute;
              width: 0;
              height: 0;
              border: 20px solid #edeff1;
              border-top: 0;
              border-color: #edeff1 transparent;
            }
          }
          &:after{
            content: '';
            display: block;
            bottom: 0px;
            right: -25px;
            transform: rotate(0deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #edeff1;
            border-top: 0;
            border-color: #edeff1 transparent;
            @media screen and (max-width: 1024px){
              content: '';
              display: block;
              bottom: 0;
              right: -20px;
              transform: rotate(0deg);
              position: absolute;
              border: 20px solid #edeff1;
              border-top: 0;
              border-color: #edeff1 transparent;
            }
          }
          @media screen and (max-width: 1024px){
            &:before{
              display: none;
            }
            &:after{
              display: none;
            }
          }
        }
      }
      .houTab{
        &:hover{
          background-color: #032e43;
          i{
            content: '';
            display: block;
            top: 0;
            left: -25px;
            transform: rotate(180deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #032e43;
            border-top: 0;
            border-color: #032e43 transparent;
            @media screen and (max-width: 1024px){
              display: none;
            }
          }
          span{
            content: '';
            display: block;
            bottom: 0;
            left: -25px;
            transform: rotate(0deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #032e43;
            border-top: 0;
            border-color: #032e43 transparent;
            @media screen and (max-width: 1024px){
              display: none;
            }
          }
        }
        &.active{
          background-color: #032e43;
          i{
            content: '';
            display: block;
            top: 0;
            left: -25px;
            transform: rotate(180deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #032e43;
            border-top: 0;
            border-color: #032e43 transparent;
            @media screen and (max-width: 1024px){
              display: none;
            }
          }
          span{
            content: '';
            display: block;
            bottom: 0;
            left: -25px;
            transform: rotate(0deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #032e43;
            border-top: 0;
            border-color: #032e43 transparent;
            @media screen and (max-width: 1024px){
              display: none;
            }
          }
        }
      }
      .tabSty{
        &:hover{
          &:after{
            content: '';
            display: block;
            bottom: 0px;
            right: -25px;
            transform: rotate(0deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #edeff1;
            border-top: 0;
            border-color: #edeff1 transparent;
          }
          @media screen and (max-width: 1024px){
            &:after{
              display: none;
            }
          }
        }
        &:after{
          content: '';
          display: inline-block;
          width: 33px;
          height: 33px;
          border-top: 1px solid #e0e2e4;
          border-right: 1px solid #e0e2e4;
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%) rotate(45deg);
          @media screen and (max-width: 1024px){
            display: none;
          }
        }
      }
      .lastListTab{
        &:before{
          content: '';
          display: block;
          top: 0;
          right: -25px;
          transform: rotate(180deg);
          position: absolute;
          width: 0;
          height: 0;
          border: 25px solid #fff;
          border-top: 0;
          border-color: #fff transparent;
          @media screen and (max-width: 1024px){
            display: none;
          }
      }
        &:after{
          content: '';
          display: block;
          bottom: 0;
          right: -25px;
          transform: rotate(0deg);
          position: absolute;
          width: 0;
          height: 0;
          border: 25px solid #fff;
          border-top: 0;
          border-color: #fff transparent;
          @media screen and (max-width: 1024px){
            display: none;
          }
        }
        &.active{
          background-color: #032e43;
          &:before{
            content: '';
            display: block;
            top: -2px;
            right: -25px;
            transform: rotate(180deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #fff;
            border-top: 0;
            border-color: #fff transparent;
            @media screen and (max-width: 1024px){
              display: none;
            }
          }
          &:after{
            content: '';
            display: block;
            bottom: -2px;
            right: -25px;
            transform: rotate(0deg);
            position: absolute;
            width: 0;
            height: 0;
            border: 25px solid #fff;
            border-top: 0;
            border-color: #fff transparent;
            @media screen and (max-width: 1024px){
              display: none;
            }
          }
        }
      }
    }
    .main-box{
      width: 100%;
      height: auto;
      overflow: hidden;
      .textcontent{
        width: 100%;
        height: auto;
        box-sizing: content-box;
        float: left;
        .textP{
          display: inline-block;
          height: auto;
          font-size: 14px;
          color: #989898;
          line-height: 2.5;
          padding-bottom: 40px;
          letter-spacing: 2px;
          animation: action .2s ease 1;
          transition: animation 1s;
          @keyframes action {
            0% {transform: scale(1.0); opacity: 1}
            50% {transform: scale(0.9998); opacity: 0.8}
            100% {transform: scale(1.0); opacity: 1}
          }
          @media screen and (max-width: 1024px){
            line-height: 1.5;
          }
          &.activeColor{
            color: #181818;
          }
        }
      }
    }
  }
}
</style>

<script>
export default{
  data () {
    return {
      activeIndex: 0,
      show: true,
      activeColor: 0
    }
  },
  methods: {
    tabChang (index, mohover) {
      if (mohover === 1) {
        this.activeIndex = index
        if (this.activeIndex === 0) {
          this.activeColor = 0
        } else if (this.activeIndex === 1) {
          this.activeColor = 1
        } else if (this.activeIndex === 2) {
          this.activeColor = 2
        }
      } else {
        let divTop
        let flagTime = 0
        /*eslint-disable*/
        function timeFun () {
          const timer = setInterval(function () {
            if (document.body.scrollTop === 0) {
              flagTime++
            }
            // 判断  document.body.scrollTop === 0  的次数，次数多就是pc 端，
            if (flagTime > 3) {
              if (document.documentElement.scrollTop < divTop) {
                document.documentElement.scrollTop += 20
                if (document.documentElement.scrollHeight - document.documentElement.offsetHeight <= document.documentElement.scrollTop) {
                  clearInterval(timer)
                }
                if (Math.abs(divTop - document.documentElement.scrollTop) <= 90) {
                  clearInterval(timer)
                }
              } else if (document.documentElement.scrollTop > divTop) {
                document.documentElement.scrollTop -= 20
                if (Math.abs(divTop - document.documentElement.scrollTop) <= 90) {
                  clearInterval(timer)
                }
              }
            } else {
              // 次数少为移动端
              if (document.body.scrollTop < divTop) {
                document.body.scrollTop += 20
                if (document.documentElement.scrollHeight - document.documentElement.offsetHeight <= document.body.scrollTop) {
                  clearInterval(timer)
                }
                if (Math.abs(divTop - document.body.scrollTop) <= 90) {
                  clearInterval(timer)
                }
              } else if (document.body.scrollTop > divTop) {
                document.body.scrollTop -= 20
                if (Math.abs(divTop - document.body.scrollTop) <= 90) {
                  clearInterval(timer)
                }
              }
            }
          }, 10)
        }
        if (window.innerWidth < 1200) {
          divTop = document.getElementById('active' + index).offsetTop
          timeFun()
        }
      }
    }
  }
}
</script>
