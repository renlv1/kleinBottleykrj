<template>
  <div class="home">
    <div class="add" @click="$router.push('/add')">
      <div class="linWrap add-line"><div v-html="addArr" class="add-cont" v-show="addArr.length > 0"></div></div>
    </div>
    <div class="banner">
      <div class="banner-left-wrapper">
        <div class="words-period">{{$t('serialEat.text5')}} <span class="period">{{serialRoundName}}</span> {{$t('serialEat.text6')}}</div>
        <div class="time-wrapper">
          <div class="time" v-if="serialRoundName">
            <span class="days">{{serialDay}}</span>
            <span class="colon">{{$t('serialEat.text2')}}</span>
            <span class="hours">{{serialHour}}</span>
            <span class="colon">{{$t('serialEat.text3')}}</span>
            <span class="mins">{{serialMin}}</span>
            <span class="colon">{{$t('serialEat.text4')}}</span>
            <!--<span class="mins">{{sec}}</span>-->
            <!--<span class="colon">秒</span>-->
          </div>
          <div class="time" v-if="!serialRoundName">
            <span class="days">00</span>
            <span class="colon">{{$t('serialEat.text2')}}</span>
            <span class="hours">00</span>
            <span class="colon">{{$t('serialEat.text3')}}</span>
            <span class="mins">00</span>
            <span class="colon">{{$t('serialEat.text4')}}</span>
            <!--<span class="mins">{{sec}}</span>-->
            <!--<span class="colon">秒</span>-->
          </div>
          <div v-if="serialRoundName" class="time-text">{{isActive(active)}}</div>
        </div>
        <div v-if="serialRoundName" class="time-mobile">{{isActive(active)}} {{serialDay}}{{$t('serialEat.text2')}} {{serialHour}}{{$t('serialEat.text3')}} {{serialMin}}{{$t('serialEat.text4')}}</div>
        <div v-if="!serialRoundName" class="time-mobile">{{isActive(active)}} 00{{$t('serialEat.text2')}} 00{{$t('serialEat.text3')}} 00{{$t('serialEat.text4')}}</div>
        <div class="words-more" @click="toPastRecord">
          <div class="group-more">{{$t('serialEat.text7')}}<img width="9" height="14" src="../../assets/images/eatGame/row.svg"> </div>
        </div>
        <div class="words-wrapper">
          <button class="btn" @click="openDialog">
            <span>{{$t('serialEat.text37')}}</span>
          </button>
          <!--<button class="btn">{{$t('serialEat.text38')}}</button>-->
        </div>
      </div>
    </div>
    <!-- 定时器DOM -->
    <div id="bonus" class="game-one">
      <div class="pool-wrapper">
        <div class="pool">
          <div class="pool-text">
            <p>{{$t('serialEat.text8')}}</p>
            <!--<div class="quest-box">-->
              <!--<p>用户投注后，70%用户的投注金额将进入分红池中</p>-->
            <!--</div>-->
          </div>
          <div class="value">
            <div class="money-count">
              <span class="integer">{{bonusPoolArr[0]}}</span>
              <span class="dot">.</span>
              <span class="decimal">{{bonusPoolArr[1]}}</span>
              <span class="unit">USD</span>
            </div>
            <div class="isClick question">
              <!--<img width="14" height="14" src="../../assets/images/home/question.png">-->
            </div>
          </div>
        </div>
        <div class="btn-wrapper">
          <button class="btn" @click="$router.push({path: '/revenue', query: {roundId: roundId}})">
            <div class="btn-text">
              {{$t('serialEat.text9')}}
            </div>
          </button>
        </div>
        <div class="segmentation"></div>
        <div class="pool">
          <div class="pool-text">
            <p>{{$t('serialEat.text10')}}</p>
            <!--<div class="quest-box">-->
              <!--<p>用户投注后，70%用户的投注金额将进入分红池中</p>-->
            <!--</div>-->
          </div>
          <div class="value">
            <div class="money-count">
              <span class="integer">{{rewardPoolArr[0]}}</span>
              <span class="dot">.</span>
              <span class="decimal">{{rewardPoolArr[1]}}</span>
              <span class="unit">USD</span>
            </div>
            <div class="isClick question">
              <!--<img width="14" height="14" src="../../assets/images/home/question.png">-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-two">
      <div class="game-two-title">{{$t('serialEat.text11')}}</div>
      <div class="words-more" @click="$router.push({path: '/shareBonusDetail',
             query:
               {
                 roundId: roundId,
                 bonusPoolValue: bonusPool
               }
             })">
        <div class="group-more">{{$t('serialEat.text12')}}<img width="9" height="14" src="../../assets/images/eatGame/right_1.png"> </div>
      </div>
      <div class="value">
        <div class="money-count">
          <span class="integer">{{bonusSumArr[0]}}</span>
          <span class="dot">.</span>
          <span class="decimal">{{bonusSumArr[1]}}</span>
          <span class="unit">USD</span>
        </div>
      </div>
      <div class="words-more-mobile" @click="$router.push({path: '/shareBonusDetail',
             query:
               {
                 roundId: roundId,
                 bonusPoolValue: bonusPool
               }
             })">
        <div class="group-more">{{$t('serialEat.text12')}}<img width="9" height="14" src="../../assets/images/eatGame/row.svg"> </div>
      </div>
      <button class="btn" @click="toExchange">
        <div class="btn-text">
          {{$t('serialEat.text13')}}
        </div>
      </button>
    </div>
    <div class="game-three">
      <div class="text-group">
        <div class="group-title">{{$t('serialEat.text22')}}</div>
        <div class="group-description">{{$t('serialEat.text23')}}</div>
      </div>
      <div class="qualifying-list">
        <ul>
          <li v-if="(userInfo.length !== 0 && myNewIndex) && (myNewIndex > playerIndex)">
            <div class="list-value">{{playerIndex}}</div>
            <div>
              <div class="list-text common-text">{{$t('serialEat.text25')}}: <span style="color: #FC534C">{{userName}}</span></div>
              <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{playAmount | fourNumber}} USD</span></div>
            </div>
          </li>
          <li v-if="(userInfo.length !== 0 && myNewIndex) && (myNewIndex <= playerIndex)">
            <div class="list-value">{{myNewIndex}}</div>
            <div class="list-text common-text">{{$t('serialEat.text24')}}: {{userInfo.userName}}</div>
            <div class="list-text common-text" style="color: #666" v-show="isHasBone">{{$t('activityReward.text15')}}</div>
          </li>
          <li v-if="(userInfo.length !== 0 && myNewIndex)" style="display: flex; align-items: center; margin-top: -80px">
            <img src="../../assets/images/eatGame/dots.png">
          </li>
          <li v-if="(userInfo.length !== 0 && myNewIndex) && (myNewIndex > playerIndex)">
            <div class="list-value">{{myNewIndex}}</div>
            <div class="list-text common-text">{{$t('serialEat.text24')}}: {{userInfo.userName}}</div>
            <div class="list-text common-text" style="color: #666" v-show="isHasBone">{{$t('activityReward.text15')}}</div>
          </li>
          <li v-if="myNewIndex <= playerIndex">
            <div class="list-value">{{playerIndex}}</div>
            <div>
              <div class="list-text common-text">{{$t('serialEat.text25')}}: <span style="color: #FC534C">{{userName}}</span></div>
              <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{playAmount | fourNumber}} USD</span></div>
            </div>
          </li>
          <li v-if="(userInfo.length !== 0 && myNewIndex)" style="display: flex; align-items: center; margin-top: -80px">
            <img src="../../assets/images/eatGame/dots.png">
          </li>
          <li>
            <div class="list-value">{{firstPlayerIndex}}</div>
            <div>
              <div class="list-text common-text">{{$t('orderDetail.text25')}}: <span style="color: #FC534C">{{firstUserName}}</span></div>
              <div class="list-text common-text">{{$t('pools.text3')}}: <span style="color: #FC534C">{{firstPlayAmount | fourNumber}} USD</span></div>
            </div>
          </li>
        </ul>
        <div @click="toAllPool" class="group-more isClick" style="color: #FC534C; margin-top: 40px; display: flex; align-items: center; justify-content: center">{{$t('exchange.text31')}}<img style="margin-left: 10px" width="9" height="14" src="../../assets/images/eatGame/row.svg"> </div>
      </div>
      <div class="qualifying-list-mobile">
        <div class="list-mobile-text">
          <ul>
            <li v-if="playerIndex < myNewIndex">
              <div class="list-value last-place">{{playerIndex}}</div>
              <div class="list-text last-text">{{$t('serialEat.text25')}}: <span class="change-#fc534c">{{userName}}</span></div>
              <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{playAmount | fourNumber}} USD</span></div>
            </li>
            <li v-if="userInfo.length !== 0 && myNewIndex && playerIndex < myNewIndex">
              <div class="list-value my-place">{{myNewIndex}}</div>
              <div class="list-text my-text">{{$t('serialEat.text19')}}</div>
              <div class="list-text common-text" style="color: #666" v-show="isHasBone">{{$t('activityReward.text15')}}</div>
            </li>
            <li v-if="userInfo.length !== 0 && myNewIndex && playerIndex >= myNewIndex">
              <div class="list-value my-place">{{myNewIndex}}</div>
              <div class="list-text my-text">{{$t('serialEat.text19')}}</div>
              <div class="list-text common-text" style="color: #666" v-show="isHasBone">{{$t('activityReward.text15')}}</div>
            </li>
            <li v-if="playerIndex >= myNewIndex">
              <div class="list-value last-place">{{playerIndex}}</div>
              <div class="list-text last-text">{{$t('serialEat.text25')}}: <span class="change-#fc534c">{{userName}}</span></div>
              <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{playAmount | fourNumber}} USD</span></div>
            </li>
            <li>
              <div class="list-value last-place">{{firstPlayerIndex}}</div>
              <div class="list-text last-text">{{$t('orderDetail.text25')}}: <span class="change-#fc534c">{{firstUserName}}</span></div>
              <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{firstPlayAmount | fourNumber}} USD</span></div>
            </li>
          </ul>
          <div @click="toAllPool" class="group-more isClick" style="color: #FC534C; margin-top: 40px; display: flex; align-items: center; justify-content: center">{{$t('exchange.text31')}}<img style="margin-left: 10px" width="9" height="14" src="../../assets/images/eatGame/row.svg"> </div>
          <div class="btn-wrapper">
            <button class="btn" @click="toExchange">
              <div class="btn-text">
                {{$t('serialEat.text21')}}
              </div>
            </button>
          </div>
        </div>
      </div>
      <button class="toBtn" @click="toExchange">
        <div class="btn-text">
          {{$t('orderDetail.text11')}}
        </div>
      </button>
    </div>
    <table class="table-container">
      <thead>
      <div class="head-wrapper">
        <div style="display: flex; align-items: center; justify-content: space-between; background: #edeff1">
          <h6 class="form-title">{{$t('serialEat.text9')}}</h6>
          <div style="display: flex; align-items: center">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="date"
                :placeholder="$t('serialEat.text43')"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="aaa2()"
              >
              </el-date-picker>
            </div>
            <span style="margin: 0 10px; color: #666">-</span>
            <div class="block" style="margin-right: 30px">
              <el-date-picker
                v-model="value2"
                type="date"
                :placeholder="$t('serialEat.text44')"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="aaa2()"
              >
              </el-date-picker>
            </div>
            <div class="income commonCheck">
              <div class="text" style="color: #10d1a1">{{$t('revenue.text5')}}</div>
              <div @click="changeStatus(1)" class="check isClick" :class="{change: isIncomeChange}"></div>
            </div>
            <div class="spend commonCheck">
              <div class="text" style="color: #FC534C">{{$t('revenue.text6')}}</div>
              <div @click="changeStatus(2)" class="check isClick" :class="{change: isSpendChange}"></div>
            </div>
          </div>
        </div>
      </div>
      <tr>
        <td class="less-width">{{$t('serialEat.text14')}}</td>
        <td class="less-width">{{$t('home.text24')}}</td>
        <td class="more-width">{{$t('serialEat.text15')}}</td>
        <td class="more-width">{{$t('serialEat.text16')}}</td>
        <td>{{$t('serialEat.text17')}}</td>
        <td class="more-width">{{$t('serialEat.text18')}}</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in bonusLogList" :key="item.index">
        <td class="less-width">{{item.id}}</td>
        <td class="less-width">{{item.userName}}</td>
        <td class="more-width">{{item.changeAmount.toFixed(4)}} USD</td>
        <td class="more-width">{{$changeDate(item.createAt, '/')}}</td>
        <td class="text-color" :class="{red: item.changeType === 2, green: item.changeType === 1}">{{numToTransText(item.changeType)}}</td>
        <td class="more-width">{{item.balanceFinal.toFixed(4)}} USD</td>
      </tr>
      </tbody>
      <span style="color: #999; display: inline-block; margin: 20px 0 10px">{{$t('home.text28')}}</span>
      <div class="error" v-if="bonusLogList.length === 0">
        {{$t('orderManage.text8')}}
      </div>
    </table>
    <v-turnPage class="turnPage" :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage"></v-turnPage>
    <!-- 交易奖励规则弹窗 -->
    <div class="dialog-box" v-if="isDialog">
      <div class="dialog-content">
        <div class="dialog">
          <div class="close" @click="closeIsDialog">
            <img width="30" height="30" src="../../assets/images/eatGame/delete.svg"/>
          </div>
          <div class="dialog-title">{{$t('serialEat.text39')}}</div>
          <div class="rule">
            <p>{{$t('serialEat.text31')}}</p>
            <p>{{$t('serialEat.text32')}}</p>
            <p>{{$t('serialEat.text33')}}</p>
            <p>{{$t('serialEat.text34')}}</p>
            <p>{{$t('serialEat.text35')}}</p>
            <p>{{$t('serialEat.text45')}}</p>
          </div>
          <button class="btn-dialog" @click="closeIsDialog">{{$t('serialEat.text36')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.add-line
  display: flex
.add
  cursor pointer
  width: 100%
  height: 48px;
  background-color: #fc534c;
  @media screen and (max-width: 1200px)
    height: 30px
    line-height: 30px
    font-size: 12px
    margin-top: 50px
  .linWrap
    line-height: 48px;
    height: 48px
    font-size: 16px;
    color: #fff;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    @media screen and (max-width: 1200px)
      height: 30px
      line-height: 30px
      font-size: 12px
.home
  width 100%
  min-height 100vh
  height auto
  background #fff
  padding-bottom 30px
  .banner
    width 100%
    background #fff
    background url("../../assets/images/home/banner.png") no-repeat center / cover
    @media screen and (max-width: 1200px) {
      background url("") no-repeat center / cover
      background-color #1a1a1a
      padding-bottom 0
    }
    .banner-left-wrapper
      display flex
      flex-direction column
      align-items center
      padding-bottom 130px
      width 50%
      color #fff
      @media screen and (max-width: 1200px) {
        width 100%
        padding-bottom 60px
      }
      .words-period
        margin 40px 0 30px
        font-size 40px
        @media screen and (max-width: 1200px) {
          font-size 20px
          text-align center
        }
        .period
          color #fc534c
      .time-mobile
        @media screen and (min-width: 1200px) {
         display none
        }
        margin-bottom 20px
        text-align center
        letter-spacing 2px
        color #fff
      .time-wrapper
        width auto
        display flex
        flex-direction column
        align-items center
        margin-bottom 20px
        @media screen and (max-width: 1024px) {
          display none
        }
        .time
          display flex
          justify-content center
          align-items center
          height auto
          @media screen and (max-width: 1024px) {
            width 75%
          }
          @media screen and (max-width: 414px) {
            width 100%
          }
          .days, .hours, .mins
            min-width 78px
            display flex
            justify-content center
            align-items center
            padding 15px
            width 100%
            font-family "Microsoft YaHei UI Light"
            border 1px solid #363a63
            border-radius 4px
            background #242742
            color #fff
            font-size 38px
            @media screen and (max-width: 414px) {
              padding 20px 10px
              font-size 18px
            }
          .colon
            display inline-block
            text-align center
            height 100%
            width 100%
            font-size 16px
            margin 0 30px
            white-space nowrap
            letter-spacing 2px
            line-height -moz-block-height
            @media screen and (max-width: 414px) {
              font-size 14px
            }
            &:last-child {
              margin-right 0 !important
            }
        .time-text
          margin-top 40px
          font-family "Microsoft YaHei UI Light"
          font-size 18px
          color #fff
      .words-more
        margin-bottom 30px
        font-size 14px
        color #fc534c
        text-align center
        cursor: pointer
        @media screen and (max-width: 1200px) {
          margin 10px 0 28px
        }
        .group-more
          color #fc534c
          font-size: 14px
          font-family: "Microsoft YaHei UI"
          display flex
          align-items center
          letter-spacing 3px
          img
            margin-left 20px
      .words-wrapper
        width 100%
        display flex
        flex-direction column
        align-items center
        justify-content center
        letter-spacing 3px
        .describe
          margin-bottom 20px
          @media screen and (max-width: 1024px) {
            display none
          }
        .btn
          width 30%
          cursor pointer;
          padding: 15px 25px;
          border-radius 4px
          border none
          background-color #5e8ff1
          @media screen and (max-width: 1200px) {
            width 60%
          }
          span
            color #fff
            font-size 14px
            letter-spacing 3px
          &:active{
            opacity 0.6
          }
  .game-one
    .pool-wrapper
      margin 90px 0
      width 90%
      line-height 60px
      display flex
      flex-direction row
      @media screen and (max-width: 1024px) {
        display flex
        flex-direction column
        width 100%
      }
      .pool
        width 50%
        display flex
        flex-direction column
        @media screen and (max-width: 1024px) {
          margin-top 30px
          padding-left 0
          width 100%
          display flex
          flex-direction column
          align-items center
          border-top 1px solid #eee
        }
        .pool-text
          width 100%
          display flex
          flex-direction row
          justify-content center
          align-items center
          @media screen and (max-width: 1024px) {
            justify-content center
          }
          p
            @media screen and (max-width: 1024px) {
              margin-top 30px
              text-align center
              font-size 20px
              font-weight bold
              color #171717
            }
          .quest-box
            margin-left 6%
            width 40%
            height 88px
            border 1px solid #e5e5e5
            box-shadow 0 0 5px #ccc
            border-radius 2px
            z-index 100
            background #fff
            @media screen and (max-width: 1024px) {
              display none
            }
            p
              padding 10px 5px
              margin-right 0
              line-height 1.3
        .value
          display flex
          justify-content center
          margin-top 10px
          .money-count
            font-family "Microsoft YaHei UI"
            text-align center
            font-weight bold
            margin-right 10px
            .integer
              font-size 45px
              color #181818
              @media screen and (max-width: 1024px) {
                font-size 26px
                color #fc534c
              }
            .decimal
              font-size 26px
              @media screen and (max-width: 1024px) {
                color #fc534c
              }
            .dot
              @media screen and (max-width: 1024px) {
                color #fc534c
              }
            .unit
              font-size 26px
              color #fc534c
              @media screen and (max-width: 1024px) {
                color #fc534c
              }
      .segmentation
        width 1px
        height auto
        background #ccc
        @media screen and (max-width: 1024px) {
          display none
        }
      .btn-wrapper
        width 100%
        display flex
        justify-content center
        @media screen and (min-width: 1024px) {
          display none
        }
        button
          margin 40px auto
          padding: 15px 25px;
          background-color #fff
          border-radius 30px
          width 40%
          border 1px solid #fc534c
          @media screen and (max-width: 414px) {
            width 60%
          }
          .btn-text
            color #fc534c
  .game-two
    background #fc534c
    width 100%
    height auto
    padding 86px 0 48px
    display flex
    flex-direction column
    align-items center
    justify-content center
    @media screen and (max-width: 1024px) {
      padding 40px 0 48px
      background #fff
    }
    .game-two-title
      font-size 20px
      color #fff
      @media screen and (max-width: 1024px) {
        font-weight bold
        font-size 20px
        color #000
      }
    .words-more
      margin-top 40px
      font-size 14px
      color #fff
      text-align center
      cursor: pointer
      user-select none
      @media screen and (max-width: 414px) {
        display none
      }
      .group-more
        font-size: 14px
        font-family: "Microsoft YaHei UI"
        display flex
        align-items center
        letter-spacing 3px
        @media screen and (max-width: 1024px) {
          display none
        }
        img
          margin-left 20px
    .words-more-mobile
      margin-top 40px
      font-size 14px
      color #181818
      text-align center
      cursor: pointer
      @media screen and (min-width: 1024px) {
        display none
      }
      @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
        display block
      }
      .group-more
        color #039
        font-size: 14px
        font-family: "Microsoft YaHei UI"
        display flex
        align-items center
        letter-spacing 3px
        img
          margin-left 20px
    .btn
      padding: 15px 25px;
      border: 1px solid #fff;
      margin-right: -1px;
      margin-bottom: -1px;
      outline: none;
      cursor: pointer;
      background: #5e8ff1;
      color: #fff;
      border-radius: 5px;
      &:active{
        opacity: 0.6;
      }
    .value
      display flex
      align-items center
      margin-top 70px
      @media screen and (max-width: 1024px) {
        margin-top 30px
      }
      .money-count
        font-family "Microsoft YaHei UI"
        font-weight bold
        text-align center
      .integer
        font-size 50px
        color #fff
        @media screen and (max-width: 1024px) {
          font-size 26px
          color #fc534c
        }
      .dot
        color #fff
        @media screen and (max-width: 1024px) {
          color #fc534c
        }
      .decimal
        color #fff
        font-size 26px
        @media screen and (max-width: 1024px) {
          color #fc534c
        }
      .unit
        color #fff
        font-size 26px
        @media screen and (max-width: 1024px) {
          color #fc534c
        }
    .btn
      margin-top 100px
      width 25%
      border 0
      background-color #fff
      border-radius 5px
      cursor pointer
      user-select none
      &:active{
        opacity: 0.6
      }
      @media screen and (max-width: 1024px) {
        margin-top 40px
        width 40%
        background-color #fc534c
      }
      @media screen and (max-width: 414px) {
        width 60%
      }
      .btn-text
        color #fc534c
        /*padding 20px 0*/
        font-size 18px
        @media screen and (max-width: 1024px) {
          color #fff
          font-size 14px
        }
  .game-three
    height auto
    width 100%
    padding-bottom 130px
    border 1px solid #edeff1
    display flex
    flex-direction column
    align-items center
    justify-content center
    @media screen and (max-width: 1024px) {
      padding-bottom 0px
    }
    .text-group
      width 100%
      padding-top 130px
      display flex
      flex-direction column
      align-items center
      background #fff
      padding-bottom 130px
      font-family "Microsoft YaHei UI Light"
      @media screen and (max-width: 1024px) {
        padding-bottom 60px
        padding-top 30px
      }
      .group-title
        font-size 22px
        color #181818
        @media screen and (max-width: 1024px) {
          display none
        }
      .group-description
        width 50%
        font-size 18px
        margin-top 40px
        text-align center
        line-height 2
        @media screen and (max-width: 1024px) {
          width 87%
          font-size 16px
          margin-top 0
        }
      .group-more
        margin-top 40px
        color #003399
        font-size 14px
        font-family "Microsoft YaHei UI"
        cursor pointer
        user-select none
        display flex
        flex-direction row
        align-items center
        @media screen and (max-width: 1024px) {
          display none
        }
        img
          margin-left 20px
    .qualifying-list
      width 100%
      @media screen and (min-width: 1024px) {
        display block
      }
      @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
        display none
      }
      ul
        padding 20px 0
        margin 0 auto
        width 50%
        display flex
        flex-direction row
        justify-content space-between
        .isClick
          cursor pointer
          user-select none
          &:active{
            opacity 0.6
          }
        li
          width auto
          .list-value
            margin 0 auto
            width 80px
            height 80px
            border-radius 100%
            background #032e43
            color #fff
            line-height 80px
            text-align center
          .common-text
            margin-top 15px
            text-align center
            font-size 16px
          .list-text
            color #000
          .change-color
            color #fc534c
          .pic
            margin 0 auto
            width 80px
            height 80px
            border-radius 100%
            text-align center
            line-height 80px
            background #fc534c
            img
              line-height 88px
              vertical-align middle
              width 38px
              height 38px
    .qualifying-list-mobile
      width 100%
      display flex
      @media screen and (min-width: 1024px) {
        display none
      }
      @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
        display block
      }
      ul
        margin 0 auto
        width 50%
        display flex
        flex-direction row
        justify-content space-around
        @media screen and (max-width: 768px) {
          width 60%
          font-size 14px
        }
        @media screen and (max-width: 414px) {
          width 90%
          font-size 12px
        }
        li
          width 30%
          .list-value
            margin 0 auto 10px
            width 80px
            height 80px
            border-radius 100%
            text-align center
            line-height 80px
            font-size 23px
            @media screen and (min-width: 414px) and (max-width: 1024px) {
              width 60px
              height 60px
              line-height 60px
              font-size 18px
            }
            @media screen and (max-width: 414px) {
              width 40px
              height 40px
              line-height 40px
              font-size 16px
            }
          .my-place
            border 1px solid #032e43
            color #032e43
          .last-place
            border 1px solid #fc534c
            color #fc534c
          .my-text
            text-align center
            color #FC534C
          .pic
            margin 0 auto 10px
            width 40px
            height 40px
            border-radius 100%
            text-align center
            line-height 40px
            background #fc534c
            @media screen and (min-width: 414px) and (max-width: 1024px) {
              width 60px
              height 60px
              line-height 60px
              font-size 18px
            }
            @media screen and (max-width: 414px) {
              width 40px
              height 40px
              line-height 40px
              font-size 16px
            }
            img
              line-height 40px
              vertical-align middle
              width 20px
              height 20px
          .list-text
            text-align center
            .change-#fc534c
              color #FC534C
      .btn-wrapper
        width 100%
        display flex
        justify-content center
        button
          margin 60px auto 100px
          border 0
          width 40%
          padding: 15px 25px;
          background-color #fc534c
          border-radius 5px
          @media screen and (max-width: 414px) {
            width 60%
          }
          .btn-text
            font-size 14px
            color #fff
    .toBtn
      margin-top: 100px;
      border: 0;
      background-color: #FC534C;
      padding 15px 25px
      font-size 18px
      color #fff
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      @media screen and (max-width: 1024px) {
        display none
      }
  .table-container
    width 80%
    margin-top 110px
    @media screen and (max-width: 1024px) {
      display none
      width 100%
    }
    .head-wrapper
      .form-title
        position relative
      div
        .spend
          right 80px
        .income
          right 180px
        .commonCheck
          display flex
          flex-direction row
          align-items center
          margin-right 30px
          .text
            margin-right 10px
            font-size 16px
          .check
            width 15px
            height 15px
            border 1px solid #ccc
            border-radius 3px
            box-shadow 0 0 5px #d7d9db
            background url('../../assets/images/eatGame/active@2x.png') no-repeat center / cover
            &.change
              background url('')
  .turnPage
    @media screen and (max-width: 1024px) {
      display none
    }
  .dialog-box
    position fixed
    top 0
    width 100%
    height 100%
    display flex
    justify-content center
    align-items center
    background-color:rgba(0,0,0,.5)
    z-index 999
    .dialog-content
      height 60%
      width 50%
      position relative
      @media screen and (max-width: 1024px) {
        width 90%
      }
      .dialog
        overflow: auto
        margin 0 auto
        text-align: center
        border-radius: 8px;
        box-shadow: 0 0 5px #d7d9db;
        width 100%
        // height 100%
        max-height 100%
        height auto
        font-family "Microsoft YaHei UI Light"
        background #fff
        position relative
        @media screen and (max-width: 1024px) {
          width 100%
        }
        .close
          position absolute
          top 30px
          right 20px
          cursor pointer
          user-select none
          @media screen and (max-width: 1024px) {
            top 15px
            right 20px
          }
          img
            @media screen and (max-width: 1024px) {
              width 20px
              height 20px
            }
        .dialog-title
          padding-top 90px
          font-size 22px
          color #181818
          @media screen and (max-width: 1024px) {
            padding-top 30px
          }
        .rule
          width 90%
          text-align: left
          margin: 40px auto 0
          line-height 2
          font-size 16px
          @media screen and (max-width: 1024px) {
            width 80%
          }
        .btn-dialog
          margin-top 100px
          padding 11px 0
          text-align center
          background #fc534c
          border-radius 4px
          border 1px solid #d7d9db
          cursor pointer
          user-select none
          font-family "Microsoft YaHei UI"
          font-size 20px
          color #fff
          width 90%
          margin-bottom 50px
          @media screen and (max-width: 1024px) {
            margin-top 20px
            width: 80%
          }
</style>

<script>
/*eslint-disable*/
import { mapGetters } from 'vuex'
import $ from 'jquery'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
  data () {
    return {
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      value2: '',
      isHasBone: true, // 判断是否能得到奖励
      isRed: false, // 收入类型字体颜色
      isIncomeChange: false, // 收入按钮
      isSpendChange: false, // 支出按钮
      addArr: [],
      flag: false,
      imgUrl: '',
      firsrtFlag: false,
      nextValue: '',
      rewardPlayerList: [], // 本轮活动参与用户列表
      propPage: 1, // 初始化总页数
      pageIndex: 1,
      pageSize: 5,
      totalPage: 0,
      hour: '00',
      min: '00',
      sce: '00',
      timeArr: [],
      lastRewardIndex: '', // 当前奖励排位
      myNewIndex: '', // 我的排位
      NextLastRewardIndex: '',
      preLastRewardIndex: '',
      lastPlayerName: '', // 队尾用户名
      capitalPoolValue: '', // 本轮奖金池总额
      isPool: true,
      isDialog: false,
      currentLastRewardIndex: '',
      roundName: '',
      serialRoundName: '',
      bonusPoolArr: [],
      rewardPoolArr: [],
      bonusSumArr: [],
      firstUserName: '',
      userName: '',
      firstPlayAmount: '',
      playAmount: '',
      playerIndex: '',
      firstPlayerIndex: '',
      active: '',
      bonusLogList: [],
      lastFlag: false,
      serialStartAt: '',
      serialDay: '00',
      serialHour: '00',
      serialMin: '00'
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  created () {
    this._getLottoRewardDetail()
    this.getAdd()
    this.isActive()
    this.getCapitalPool(this.flag, 1)
    this.time1 = setInterval(() => {
      this.getCapitalPool(this.flag, 1)
    }, 5000)
    this.duration()
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
  },
  beforeDestroy () {
    clearInterval(this.time1)
  },
  mounted () {
    this.$nextTick(() => {
      this.getUserInfo()
    })
  },
  methods: {
    aaa2 () {
      if (this.isIncomeChange === false && this.isSpendChange === false) { // 时间不为空，同时勾选收入和支出按钮
        this._getBonusLogList(1)
      } else if (this.isIncomeChange === false && this.isSpendChange === true) { // 时间不为空，只勾选收入按钮
        this._getIncomeList(1)
      } else if (this.isIncomeChange === true && this.isSpendChange === false) { // 时间不为空，只勾选支出按钮
        this._getSpendList(1)
      } else if (this.isIncomeChange === true && this.isSpendChange === false) { // 时间不为空，同时不勾选收入和支出按钮
        this.bonusLogList = []
        this.totalPage = 0
      }
    },
    changeStatus (num) { // 筛选收入和支出
      if (num === 1) {
        this.isIncomeChange = !this.isIncomeChange
        if (this.isIncomeChange === false && this.isSpendChange === false) {
          this._getBonusLogList(1)
        } else if (this.isIncomeChange === false && this.isSpendChange === true) {
          this._getIncomeList(1)
        } else if (this.isIncomeChange === true && this.isSpendChange === false) {
          this._getSpendList(1)
        } else if (this.isIncomeChange === true && this.isSpendChange === true) {
          this.bonusLogList = []
          this.totalPage = 0
        }
      } else if (num === 2) {
        this.isSpendChange = !this.isSpendChange
        if (this.isIncomeChange === false && this.isSpendChange === false) {
          this._getBonusLogList(1)
        } else if (this.isIncomeChange === false && this.isSpendChange === true) {
          this._getIncomeList(1)
        } else if (this.isIncomeChange === true && this.isSpendChange === false) {
          this._getSpendList(1)
        } else if (this.isIncomeChange === true && this.isSpendChange === true) {
          this.bonusLogList = []
          this.totalPage = 0
        }
      }
    },
    numToTransText (num) { // 后端返回的数字转换为对应的文字
      if (num === 1) {
        return this.$t('serialEat.text26')
      } else if (num === 2) {
        this.isRed = true
        return this.$t('serialEat.text27')
      }
    },
    toExchange () {
      this.$router.push('/serialEat')
    },
    toAllPool () { // 查看所有获奖用户
      this.$router.push({path: '/toAllPool', query: {roundId: this.roundId}})
    },
    checkTime (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    openDialog () { // 开启交易奖励规则弹窗
      this.isDialog = true
    },
    closeIsDialog () { // 关闭交易奖励规则弹窗
      this.isDialog = false
    },
    toPastRecord () {
      this.$router.push('/pastRecord')
    },
    isActive (num) { // 判断活动的状态 0已结束/1已开始
      if (num === 0) {
        return this.$t('serialEat.text28')
      } else {
        return this.$t('serialEat.text29')
      }
    },
    getAdd () {
      let baseUrl = 'https://api.kleingame.ai'
      let langadd = 1
      if (localStorage.getItem('kleinLang') === 'EN') {
        langadd = 2
      } else {
        langadd = 1
      }
      let url = `${baseUrl}/notice/noticeListNew?pageSize=10&pageIndex=1&terrace=5&language=${langadd}`
      this.$http.post(url).then((res) => {
        if (res.data.success === true) {
          this.isLoading = false // 加载动画
          let ndata = res.data.data
          if (ndata.totalPage) {
            this.addArr = ndata.noticeList[0].title
          } else {
            let newdata = JSON.parse(ndata)
            this.addArr = newdata.noticeList[0].title
          }
        }
      }).catch(() => {
      })
    },
    getUserInfo () {
      this.$store.dispatch('balanceAction') // 获取用户信息
    },
    _getLottoRewardDetail () { // 连环吃饼
      this.$http.post(`${this.$api}/lottoReward/lottoRewardDetail`).then((res) => {
        if (res.data.success === true) {
          let serialRoundName = res.data.data.rewardRound // rewardRound活动内容对象
          this.serialRoundName = serialRoundName.roundName
          this.roundId = serialRoundName.id
          this.serialStartAt = serialRoundName.startAt
          if (serialRoundName.bonusPool === 0) {
            this.active = 0
          } else {
            this.active = 1
          }
          this.bonusPool = serialRoundName.bonusPool
          let bonusPool = serialRoundName.bonusPool.toFixed(4)
          if (this.flag === true || this.currentValue !== serialRoundName.bonusPool) { // 连续吃饼主页面需要不断轮循环，但分红收支明细需要在奖金池变化之后再轮循环以保证分红明细变化后页码自动回到1
            this.flag = false
            this.currentValue = serialRoundName.bonusPool
            this.isLunXun = true
          }
          this.rewardPool = serialRoundName.rewardPool
          this.bonusPoolArr = bonusPool.split('.')
          let rewardPool = serialRoundName.rewardPool.toFixed(4)
          this.rewardPoolArr = rewardPool.split('.')
          if (res.data.data.bonusSum) { // 如果用户登陆未登录分红奖励为0
            this.bonusSum = res.data.data.bonusSum
          } else {
            this.bonusSum = 0
          }
          this.bonusSum = this.bonusSum.toFixed(4)
          this.bonusSumArr = this.bonusSum.split('.')
          this.myNewIndex = res.data.data.myNewIndex
          let lastPlayer = serialRoundName.endRewardPlayer // 最终获奖内容对象
          this.playerIndex = lastPlayer.playerIndex
          this.userName = lastPlayer.userName
          this.playAmount = lastPlayer.playAmount
          let firstPlayer = serialRoundName.lastPlayer // 首位获奖内容对象
          this.firstUserName = firstPlayer.userName
          this.firstPlayAmount = firstPlayer.playAmount
          this.firstPlayerIndex = firstPlayer.playerIndex
          // console.log(this.myNewIndex, firstPlayer.playerIndex, lastPlayer.playerIndex)
          if (this.myNewIndex > lastPlayer.playerIndex && this.myNewIndex < lastPlayer.playerIndex) {
            this.isHasBone = true
          } else {
            this.isHasBone = false
          }
          if (this.flag === true || this.isLunXun === true) {
            this.isLunXun = false
            // this._getBonusLogList(1) 获取分红池收支明细列表
            if (this.isIncomeChange === false && this.isSpendChange === false) {
              this._getBonusLogList(1)
            } else if (this.isIncomeChange === false && this.isSpendChange === true) {
              this._getIncomeList(1)
            } else if (this.isIncomeChange === true && this.isSpendChange === false) {
              this._getSpendList(1)
            }
            if (this.$refs.turnPage) {
              this.$refs.turnPage.resetPage(1)
            }
          }
        }
      })
    },
    changeTime (time) { // 转换时间的格式
      return this.$changeDate(time, '/', 1)
    },
    getCapitalPool (flag, page) { // 获取吃饼主页面数据
      this.$http.post(`${this.$api}/danRobot/danRewardDetail?pageIndex=${page}&pageSize=10`).then((res) => {
        if (res.data.success === true) {
          // this.rewardPlayerList = res.data.data.rewardPlayerList // 本轮活动参与用户列表
          if (res.data.data.rewardRound) {
            this.roundName = res.data.data.rewardRound.roundName // 获取期数
            this.capitalPool = res.data.data.rewardRound.capitalPool // 获得本轮奖金池总金额
            // this.firsrtFlag = true
            // if (this.firsrtFlag === true) {
            //   this.lastRewardIndex = res.data.data.lastRewardIndex + 1
            //   console.log(this.lastRewardIndex)
            // }
            // let index = this.lastRewardIndex
            if (flag === true || this.currentCapitalPool !== this.capitalPool) {
              this.firsrtFlag = false
              this.currentCapitalPool = this.capitalPool
              this.capitalPoolValue = this.capitalPool.toFixed(4)
              this.roundSumLoopReward = res.data.data.roundSumLoopReward // 获取排位循环奖发放总金额
              this.endAt = res.data.data.rewardRound.endAt
              this.startAt = res.data.data.rewardRound.startAt
              // this.lastRewardIndex = res.data.data.lastRewardIndex
              // this.lastRewardIndex = res.data.data.lastRewardIndex
              // this.nextValue = this.lastRewardIndex + 1
              // $("#slide").children().eq(2).css({"width":"100px","height":"100px","left": "150px"})
              // $("#slide").children().eq(1).css({"width":"60px","height":"60px","left": "0"})
              // $("#slide").children().remove()
              // var txt1=`<div class="img"><div>${index - 1}</div></div>
              //   <div class="img"><div>${index}</div></div>
              //   <div class="img"><div>${index + 1}</div> </div>`
              // setTimeout(() => {
              //   $('#slide').append(txt1)
              // }, 700);
              this.flag = false
              this.countDown()
              this.myRefRanking = res.data.data.myRefRanking // 获取我当前的排名
              this.refRewardAmount = res.data.data.refRewardAmount // 获取我的推广业绩
              if (res.data.data.rewardRound.topRefList.length !== 0) {
                this.refAmount = res.data.data.rewardRound.topRefList[0].refAmount // 获取排名第一的推广业绩
              }
              this.propPage = res.data.data.totalPage // 获取总页数
              if (this.userInfo.length !== 0) {
                this.imgUrl = res.data.data.lastPlayer.headImage // 获取队尾的头像
              } else {
                this.imgUrl = require('../../assets/images/eatGame/avatar.svg')
              }
              this.id = res.data.data.rewardRound.id
              if (this.$refs.turnPage) {
                this.$refs.turnPage.resetPage(page)
              }
            }
          }
        }
      })
    },
    duration () {
      if (this.serialStartAt > 0) {
        let leftTime = (Date.parse(new Date()) - this.serialStartAt) // 计算已经开始的毫秒数
        if (this.bonusSum === 0) {
          this.serialDay = parseInt(Date.parse(new Date()) / 1000 / 60 / 60 / 24, 10) // 结束的天数
          this.serialHour = parseInt(Date.parse(new Date()) / 1000 / 60 / 60 % 24, 10) // 结束的小时
          this.serialMin = parseInt(Date.parse(new Date()) / 1000 / 60 % 60, 10) // 结束的小时
          clearTimeout(this.timer)
        } else {
          let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算已经开始的天数
          let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算已经开始的小时
          let minutes = parseInt(leftTime / 1000 / 60 % 60, 10) // 计算已经开始的分钟
          // let seconds = parseInt(leftTime / 1000 % 60, 10) // 计算已经开始的秒数
          this.serialDay = this.checkTime(days) // 已经开始的天数
          this.serialHour = this.checkTime(hours) // 已经开始的小时
          this.serialMin = this.checkTime(minutes) // 已经开始的分钟
          // this.sec = this.checkTime(seconds) // 已经开始的秒数
          // console.log(days, hours, minutes)
        }
      }
      this.timer = setTimeout(() => this.duration(), 1000)
    },
    countDown () { // 倒计时
      let leftTime = (this.endAt - Date.parse(new Date())) // 计算剩余的毫秒数
      if (Number(leftTime) <= 0) {
        this.day = '00'
        this.hour = '00'
        this.min = '00'
        this.sce = '00'
        clearTimeout(this.timer2)
      } else {
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
        let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
        let minutes = parseInt(leftTime / 1000 / 60 % 60, 10) // 计算剩余的分钟
        let seconds = parseInt(leftTime / 1000 % 60, 10) // 计算剩余的秒数
        let newTimeArr = []
        newTimeArr.push(days, hours, minutes, seconds)
        this.timer2 = setTimeout(() => this.countDown(), 1000)
        this.timeArr = newTimeArr
        this.day = newTimeArr[0]
        if (Number(this.day) === 0) {
          this.day = '00'
        }
        this.hour = newTimeArr[1]
        if (Number(this.hour) === 0) {
          this.hour = '00'
        } else if (Number(this.hour) < 10) {
          this.hour = '0' + this.hour
        } else {
          this.hour = this.hour
        }
        this.min = newTimeArr[2]
        if (Number(this.min) === 0) {
          this.min = '00'
        } else if (Number(this.min) < 10) {
          this.min = '0' + this.min
        } else {
          this.min = this.min
        }
        this.sce = newTimeArr[3]
        if (Number(this.sce) === 0) {
          this.sce = '00'
        } else if (Number(this.sce) < 10) {
          this.sce = '0' + this.sce
        } else {
          this.sce = this.sce
        }
      }
    },
    parentTurnPage (page) { // 页码
      this.currentPage = page
      if (this.isIncomeChange === false && this.isSpendChange === false) {
        this._getBonusLogList(page)
      } else if (this.isIncomeChange === false && this.isSpendChange === true) {
        this._getIncomeList(page)
      } else if (this.isIncomeChange === true && this.isSpendChange === false) {
        this._getSpendList(page)
      }
    },
    closeDialog () {
      this.isDialog = false
    },
    _getBonusLogList (page) {
      this.$http.post(`${this.$api}/lottoReward/getBonusLogList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.roundId}&type=0&queryDate=${this.value1}&queryEndDate=${this.value2}`).then((res) => {
        if (res.data.success === true) {
          this.bonusLogList = res.data.data.bonusLogList // 获取分红池收支明细列表对象
          this.totalPage = res.data.data.totalPage
        }
      })
    },
    _getIncomeList (page) {
      this.$http.post(`${this.$api}/lottoReward/getBonusLogList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.roundId}&type=1&queryDate=${this.value1}&queryEndDate=${this.value2}`).then((res) => {
        if (res.data.success === true) {
          this.bonusLogList = res.data.data.bonusLogList // 获取分红池收支明细列表对象
          this.totalPage = res.data.data.totalPage
        }
      })
    },
    _getSpendList (page) {
      this.$http.post(`${this.$api}/lottoReward/getBonusLogList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.roundId}&type=2&queryDate=${this.value1}&queryEndDate=${this.value2}`).then((res) => {
        if (res.data.success === true) {
          this.bonusLogList = res.data.data.bonusLogList // 获取分红池收支明细列表对象
          this.totalPage = res.data.data.totalPage
        }
      })
    },
    toJoin () {
      // console.log(this.userInfo)
      if (this.userInfo.length !== 0) {
        this.$router.push('/account/myDon')
      } else {
        this.$router.push('/login')
      }
    },
    toOpenDialog () {
      if ($(window).width() > 1024) {
        this.isDialog = false
      } else {
        this.isDialog = true
      }
    },
    aaa () {
      if ($(window).width() > 1024) {
        this.isPool = false
      }
    },
    bbb () {
      if ($(window).width() > 1024) {
        this.isPool = true
      }
    }
  }
}
</script>
