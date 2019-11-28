<template>
  <div class="eatGame-container">
    <div class="eatGame">
      <div class="banner">
        <img src="../../assets/images/eatGame/banner.svg"/>
        <div class="text-group">
          <h3>{{$t('eatGameHome.text1')}}</h3>
          <p>{{$t('eatGameHome.text2')}}</p>
        </div>
      </div>
      <div class="content-container">
        <!-- 定时器的相关DOM结构 -->
        <div class="game-one">
          <div class="time-wrapper" v-if="timeArr">
            <div class="time">
              <span class="hour">{{hour}}</span>
              <span class="colon">:</span>
              <span class="min">{{min}}</span>
              <span class="colon">:</span>
              <span class="seconds">{{sce}}</span>
            </div>
            <div class="time-text">{{$t('eatGameHome.text3')}}</div>
          </div>
          <div class="words-wrapper">
            <div class="words-period">{{$t('myAccountNav.text12')}}{{roundName}}{{$t('myAccountNav.text13')}}</div>
            <div class="words-more" v-if="durationCountDown">
              <span>{{$t('eatGameHome.text4')}}</span>
              <span class="end-time" v-if="!(this.hour === '00' && this.min === '00' && this.sce === '00')">{{dayDur}}{{$t('eatGameHome.text46')}}{{hourDur}}:{{minDur}}:{{secDur}}</span>
              <span class="end-time" v-if="this.hour === '00' && this.min === '00' && this.sce === '00'">00{{$t('eatGameHome.text46')}}00:00:00</span>
            </div>
            <div class="record" @click="toDetail">{{$t('eatGameHome.text5')}}</div>
          </div>
          <div class="money-wrapper">
            <div class="money-count">
              <span class="integer">{{capitalPoolArr[0]}}</span>
              <span class="dot">.</span>
              <span class="decimal">{{capitalPoolArr[1]}}</span>
              <span class="unit">SIE</span>
            </div>
            <div class="money-text">{{$t('eatGameHome.text6')}}</div>
          </div>
          <div class="group-more" @click="underPool">{{$t('eatGameHome.text54')}}<img width="9" height="14" src="../../assets/images/eatGame/row.svg"> </div>
        </div>
        <!-- 当前活动排位的DOM结构 -->
        <div class="game-two">
          <div class="text-group">
            <div class="group-title">{{$t('eatGameHome.text7')}}</div>
            <div class="group-description">{{$t('eatGameHome.text50')}}</div>
            <div class="group-more" @click="loginMore">{{$t('eatGameHome.text8')}}<img width="9" height="14" src="../../assets/images/eatGame/row.svg"> </div>
          </div>
          <div class="qualifying-list">
            <ul>
              <li>
                <div class="value">{{lastRewardIndex}}</div>
                <div class="list-text current">{{$t('eatGameHome.text9')}}<span>{{lastUserName}}</span></div>
              </li>
              <li class="dots" v-if="loginFlag && myNewIndex">
                <img width="100%" height="15%" src="../../assets/images/eatGame/dots.png">
              </li>
              <li class="list-text party" v-if="loginFlag && myNewIndex">
                <div style="width: 100px; height: 100px; border-radius: 100%; background-color: #032e43;display: flex; align-items: center; justify-content: center; color: #fff; font-size: 30px;">{{myNewIndex}}</div>
                <span class="mypaiwei">{{$t('eatGameHome.text31')}}</span></li>
              <li class="dots">
                <img width="100%" height="15%" src="../../assets/images/eatGame/dots.png">
              </li>
              <li>
                <div class="rob" style="background: #032e43 !important;">
                  <img style="border-radius: 100%" width="100" height="100" :src="imgUrl"/>
                </div>
                <div class="list-text party">{{$t('eatGameHome.text10')}} <span style="color: #fc534c">{{lastPlayerName}}</span></div>
              </li>
              <li class="not" v-if="!(this.hour === '00' && this.min === '00' && this.sce === '00')"></li>
              <li v-if="!(this.hour === '00' && this.min === '00' && this.sce === '00')" @click="toRob" style="cursor: pointer">
                <div class="rob">
                  <img width="100" height="100" src="../../assets/images/eatGame/rob.svg"/>
                </div>
                <div v-if="!this.playerIndex" class="list-text party">{{$t('eatGameHome.text11')}}</div>
                <div v-if="this.playerIndex" class="list-text party">{{$t('eatGameHome.text51')}}</div>
              </li>
            </ul>
          </div>
          <div class="qualifying-list-mobile">
            <ul>
              <li>
                <div class="value">{{lastRewardIndex}}</div>
                <div class="list-text current">{{$t('eatGameHome.text9')}}<span>{{lastUserName}}</span></div>
              </li>
              <li class="dots">
                <img width="100%" height="15%" src="../../assets/images/eatGame/dots.png">
              </li>
              <li v-if="loginFlag && myNewIndex">
                <div class="value">{{myNewIndex}}</div>
                <span class="mypaiwei">{{$t('eatGameHome.text31')}}</span>
              </li>
              <li class="dots" v-if="loginFlag && myNewIndex">
                <img width="100%" height="15%" src="../../assets/images/eatGame/dots.png">
              </li>
              <li>
                <div class="rob" style="background: #032e43 !important;">
                  <img style="border-radius: 100%" width="100" height="100" :src="imgUrl"/>
                </div>
                <div class="list-text party">{{$t('eatGameHome.text10')}} <span style="color: #fc534c">{{lastPlayerName}}</span></div>
              </li>
            </ul>
            <div v-if="!(this.hour === '00' && this.min === '00' && this.sce === '00')" style="cursor: pointer" class="mobile-li" @click="toRob">
              <div class="rob">
                <img width="34" height="28" src="../../assets/images/eatGame/run.png"/>
              </div>
              <div v-if="!this.playerIndex" class="list-text party">{{$t('eatGameHome.text11')}}</div>
              <div v-if="this.playerIndex" class="list-text party">{{$t('eatGameHome.text51')}}</div>
            </div>
          </div>
        </div>
        <!-- 当前推广排行的DOM结构 -->
        <div class="game-three">
          <div class="text-group">
            <div class="group-title">{{$t('eatGameHome.text13')}}</div>
            <div class="group-description">{{$t('eatGameHome.text48')}}</div>
            <div class="group-more" @click="more">{{$t('eatGameHome.text8')}}<img width="9" height="14" src="../../assets/images/eatGame/row.svg"/></div>
          </div>
          <!-- 未登录状态下的promote-list -->
          <div class="promote-list-no-login" v-if="!loginFlag">
            <div class="promote-left">NO.1</div>
            <div class="promote-right">
              <p>{{$t('eatGameHome.text47')}}：{{topUserName}}</p>
              <P>{{refAmount}} SIE</P>
            </div>
          </div>
          <!-- 登录状态下的promote-list -->
          <div class="promote-list-login" v-if="loginFlag">
            <div class="current-rank">
              <div class="text">NO: {{myRefRanking}}</div>
              <div class="rank-value">
                <div class="name">{{userName}}</div>
                <div class="value">{{refRewardAmount}} SIE</div>
              </div>
            </div>
            <div class="need">
              <div class="text">{{$t('eatGameHome.text32')}}</div>
              <div class="text-value">{{refAmount - refRewardAmount}} SIE</div>
              <div class="dots">
                <img width="79" height="14" src="../../assets/images/eatGame/dots.png"/>
              </div>
            </div>
            <div class="target">
              <div class="text">NO: 1</div>
              <div class="target-value">
                <div class="name">{{topUserName}}</div>
                <div class="value">{{refAmount}} SIE</div>
              </div>
            </div>
          </div>
        </div>
        <div class="game-four">
          <div class="text-title">{{$t('eatGameHome.text14')}}</div>
          <div class="text-value">
            <span class="integer">{{roundSumLoopRewardArr[0]}}</span>
            <span class="dot">.</span>
            <span class="decimal">{{roundSumLoopRewardArr[1]}}</span>
            <span class="unit">SIE</span>
          </div>
        </div>
        <!-- 我的排位奖励DOM结构在未登录状态下隐藏 -->
        <div class="game-five" v-if="loginFlag">
          <div class="text-group">
            <div class="group-title">{{$t('eatGameHome.text33')}}</div>
            <div class="group-description">{{$t('eatGameHome.text39')}}</div>
            <div class="group-more" @click="reward">{{$t('eatGameHome.text45')}}<img width="9" height="14" src="../../assets/images/eatGame/row.svg"/></div>
          </div>
          <div class="table-container">
            <div class="table-title"><i></i>{{$t('eatGameHome.text17')}}</div>
            <div class="table-name">
              <ul>
                <li>{{$t('eatGameHome.text34')}}</li>
                <li>{{$t('eatGameHome.text35')}}</li>
                <li>{{$t('eatGameHome.text36')}}</li>
              </ul>
            </div>
            <div class="table-value">
              <ul v-for="item in recordList" :key="item.index">
                <li>
                  <span class="rank">{{item.playerIndex}}</span>
                  <span class="count">{{item.rewardCount}}</span>
                  <span class="cumulative">{{item.rewardSum}} SIE</span>
                </li>
              </ul>
            </div>
            <v-turnPage v-show="this.recordList !== ''" class="pagesList" :propsPage="recordListPropPage" @getRecordList="parentTurnPageOther" ref="turnPage"></v-turnPage>
          </div>
        </div>
        <!-- 本轮活动参与用户的DOM结构 -->
        <div class="game-six">
          <div class="text-group">
            <div class="group-title">{{$t('eatGameHome.text15')}}</div>
            <div class="group-description">{{$t('eatGameHome.text49')}}</div>
          </div>
          <div>
            <div class="table-container">
              <div class="table-title"><i></i>{{$t('eatGameHome.text16')}}</div>
              <div class="table-name">
                <ul>
                  <li>{{$t('eatGameHome.text17')}}</li>
                  <li>{{$t('eatGameHome.text18')}}</li>
                  <li>{{$t('eatGameHome.text19')}}</li>
                </ul>
              </div>
              <div class="table-value">
                <ul v-for="item in rewardPlayerList" :key="item.index">
                  <li>
                    <span class="rank">{{item.playerIndex}}</span>
                    <span class="count">{{item.userName}}</span>
                    <span class="cumulative">{{changeTime(item.createAt)}}</span>
                  </li>
                </ul>
              </div>
              <v-turnPage v-if="rewardPlayerList.length !== 0" class="pagesList" :propsPage="propPage" @eatGameHome="parentTurnPage" ref="turnPage"></v-turnPage>
            </div>
          </div>
        </div>
      </div>
      <!-- 了解游戏规则弹窗 -->
      <div class="dialog-box" v-if="isDialog">
        <div class="dialog-content">
          <div class="dialog">
            <div class="close" @click="closeIsDialog">
              <img width="30" height="30" src="../../assets/images/eatGame/delete.svg"/>
            </div>
            <!-- 了解游戏规则弹窗的title -->
            <div class="dialog-title" v-if="loginIsShow">{{$t('eatGameHome.text20')}}</div>
            <!-- 了解排行规则弹窗title -->
            <div class="dialog-title" v-if="isShow">{{$t('eatGameHome.text27')}}</div>
            <!-- 了解排位奖励弹窗title -->
            <div class="dialog-title" v-if="isReward">{{$t('eatGameHome.text27_1')}}</div>
            <!-- 了解奖金池弹窗title -->
            <div class="dialog-title" v-if="isPool">{{$t('eatGameHome.text55')}}</div>
            <!-- 了解游戏规则弹窗的rule -->
            <div class="rule" v-if="loginIsShow">
              <p>{{$t('eatGameHome.text21')}}</p>
              <p>{{$t('eatGameHome.text22')}}</p>
              <img width="100%" height="auto" src="../../assets/images/klein/game.svg"/>
              <p>{{$t('eatGameHome.text23')}}</p>
              <p>{{$t('eatGameHome.text24')}}</p>
            </div>
            <!-- 了解排行规则弹窗的rule -->
            <div class="rule" v-if="isShow">
              <p>{{$t('eatGameHome.text28')}}</p>
              <p>{{$t('eatGameHome.text29')}}</p>
              <p>{{$t('eatGameHome.text30')}}</p>
            </div>
            <!-- 了解排位奖励弹窗的rule -->
            <div class="rule" v-if="isReward">
              <p>{{$t('eatGameHome.text41')}}</p>
              <p>{{$t('eatGameHome.text42')}}</p>
              <p>{{$t('eatGameHome.text43')}}</p>
            </div>
            <!-- 了解奖金池弹窗rule -->
            <div class="rule" v-if="isPool">
              <p>{{$t('eatGameHome.text56')}}</p>
            </div>
            <div v-if="loginIsShow" class="qualifying-list">
              <ul>
                <li>
                  <div class="value">{{lastRewardIndex}}</div>
                  <div class="list-text current">{{$t('eatGameHome.text9')}}</div>
                </li>
                <li class="dots" v-if="this.playerIndex">
                  <img width="100%" height="15%" src="../../assets/images/eatGame/dots.png">
                </li>
                <li v-if="this.playerIndex">
                  <div class="rob">
                    <img src="../../assets/images/eatGame/avatar.svg"/>
                  </div>
                  <div v-if="this.playerIndex" class="list-text party">{{$t('eatGameHome.text31')}}：<span style="color: #fc534c">{{myNewIndex}}</span></div>
                </li>
                <li class="dots">
                  <img width="100%" height="15%" src="../../assets/images/eatGame/dots.png">
                </li>
                <li>
                  <div class="rob">
                    <img width="100" height="100" src="../../assets/images/eatGame/avatar.svg"/>
                  </div>
                  <div class="list-text party">{{$t('eatGameHome.text10')}} <span style="color: #fc534c">{{lastPlayerName}}</span></div>
                </li>
                <li class="not" v-if="this.hour === '00' && this.min === '00' && this.sce === '00'"></li>
                <li v-if="this.hour === '00' && this.min === '00' && this.sce === '00'">
                  <div class="rob">
                    <img width="100" height="100" src="../../assets/images/eatGame/rob.svg"/>
                  </div>
                  <div class="list-text party">{{$t('eatGameHome.text51')}}</div>
                </li>
              </ul>
            </div>
            <div v-if="loginIsShow" class="qualifying-list-mobile">
              <ul>
                <li>
                  <div class="value">{{lastRewardIndex}}</div>
                  <div class="list-text current">{{$t('eatGameHome.text9')}}<span>{{lastUserName}}</span></div>
                </li>
                <li class="dots" v-if="this.playerIndex">
                  <img width="100%" height="15%" src="../../assets/images/eatGame/dots.png">
                </li>
                <li v-if="this.playerIndex">
                  <div class="rob">
                    <img src="../../assets/images/eatGame/avatar.svg"/>
                  </div>
                  <div v-if="this.playerIndex" class="list-text party">{{$t('eatGameHome.text31')}}：<span style="color: #fc534c">{{myNewIndex}}</span></div>
                </li>
                <li class="dots">
                  <img width="100%" height="15%" src="../../assets/images/eatGame/dots.png">
                </li>
                <li>
                  <div class="rob" style="background: #032e43 !important;">
                    <img width="100" height="100" src="../../assets/images/eatGame/avatar.svg"/>
                  </div>
                  <div class="list-text party">{{$t('eatGameHome.text10')}} <span style="color: #fc534c">{{lastPlayerName}}</span></div>
                </li>
              </ul>
              <div class="mobile-li">
                <div class="rob">
                  <img width="34" height="28" src="../../assets/images/eatGame/run.png"/>
                </div>
                <div v-if="!this.playerIndex" class="list-text party">{{$t('eatGameHome.text11')}}</div>
                <div v-if="this.playerIndex" class="list-text party">{{$t('eatGameHome.text51')}}</div>
              </div>
            </div>
            <div v-if="loginIsShow" class="description">{{$t('eatGameHome.text25')}}</div>
            <div v-if="isReward" class="description">{{$t('eatGameHome.text44')}}</div>
            <button class="btn" @click="closeIsDialog">{{$t('eatGameHome.text26')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mypaiwei
    color: #181818;
    margin-top: 30px;
    text-align: center;
    font-size: 18px;
    font-family:'Microsoft YaHei UI Light';
    @media screen and (max-width: 1200px)
      font-size:14px;
  .eatGame-container
    .eatGame
      background #edeff1
      width 100%
      height auto
      position relative
      .banner
        width 100%
        height 780px
        background url("../../assets/images/eatGame/bg.svg") no-repeat
        background-color #020204
        background-size cover
        background-position center
        display flex
        flex-direction column
        justify-content center
        align-items center
        img
          width 343px
          height 405px
          @media screen and (max-width: 414px) {
            width 100%
          }
        .text-group
          margin-top 40px
          width 46%
          align-items center
          display flex
          flex-direction column
          align-items center
          color #fff
          font-size 18px
          font-family "Microsoft YaHei UI"
          @media screen and (max-width: 414px) {
            width 66%
          }
          p
            margin-top 47px
            text-align center
            font-size 14px
            line-height 2.5
      .content-container
        margin 56px 4% 0px 4%
        padding-bottom 150px
        .game-one
          display flex
          flex-direction column
          align-items center
          background #fff
          padding-bottom 130px
          border 1px solid #edeff1
          .time-wrapper
            margin-top 70px
            width 30%
            display flex
            flex-direction column
            align-items center
            @media screen and (max-width: 1024px) {
              width 75%
            }
            .time
              display flex
              justify-content center
              @media screen and (max-width: 1024px) {
                width 75%
              }
              width 80%
              .day, .hour, .min, .seconds
                display flex
                justify-content center
                align-items center
                height 88px
                width 100%
                font-family "Microsoft YaHei UI Light"
                border 1px solid #d3d4d4
                border-radius 4px
                background #edeff1
                color #181818
                font-size 38px
                padding 0 10px
                @media screen and (max-width: 414px) {
                  padding 0 3px
                }
              .colon
                text-align center
                margin-top 32px
                height 100%
                width 100%
                font-size 20px
                @media screen and (max-width: 414px) {
                  width 20%
                  padding 0 10px
                }
            .time-text
              margin-top 20px
              font-family "Microsoft YaHei UI Light"
              font-size 18px
              color #181818
          .words-wrapper
            margin-top 68px
            display flex
            flex-direction column
            align-items center
            justify-content center
            .words-period
              font-size 28px
              color #181818
              text-align center
              @media screen and (max-width: 414px) {
                font-size 22px
              }
              span
                color #fc534c
            .words-more
              margin-top 30px
              font-size 14px
              color #181818
              text-align center
              @media screen and (max-width: 414px) {
                font-size 14px
              }
              .end-time
                margin-left 5px
            .record
              margin-top 30px
              font-size 14px
              font-family "Microsoft YaHei UI"
              color #003399
              cursor pointer
              user-select none
          .money-wrapper
            margin-top 80px
            display flex
            flex-direction column
            align-items center
            .money-count
              font-family "Microsoft YaHei UI"
              font-weight bold
              .integer
                font-size 58px
                color #181818
                @media screen and (max-width: 1024px) {
                  font-size: 30px
                }
              .decimal
                font-size 24px
              .unit
                font-size 24px
                color #fc534c
            .money-text
              margin-top 30px
              font-family "Microsoft YaHei UI Light"
              font-size 18px
              color #181818
          .group-more
            margin-top 40px
            color #039
            font-size: 14px
            font-family: "Microsoft YaHei UI"
            cursor: pointer
            display flex
            align-items center
            img
              margin-left 20px
        .game-two
          background #fff
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
              padding-top 60px
            }
            .group-title
              font-size 22px
              color #181818
            .group-description
              width 50%
              font-size 18px
              margin-top 40px
              text-align center
              line-height 2
              @media screen and (max-width: 1024px) {
                width 86%
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
              img
                margin-left 20px
          .qualifying-list
            margin-top 90px
            width 100%
            display flex
            flex-direction row
            align-items center
            justify-content center
            @media screen and (min-width: 1024px) {
              display block
            }
            @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
              display none
            }
            ul
              width 60%
              margin 0 auto
              display flex
              flex-direction row
              justify-content space-between
              li
                width auto
                display flex
                flex-direction column
                align-items center
                .value
                  width 100px
                  height 100px
                  border-radius 100%
                  background #032e43
                  color #fff
                  font-size 30px
                  text-align center
                  line-height 100px
                  @media screen and (max-width: 769px) {
                    width 60px
                    height 60px
                    font-size 18px
                    line-height 60px
                  }
                .rob
                  width 100px
                  height 100px
                  border-radius 100%
                  text-align center
                  font-size 30px
                  color #fff
                  line-height 100px
                  @media screen and (max-width: 769px) {
                    width 60px
                    height 60px
                    line-height 60px
                  }
                  img
                    @media screen and (max-width: 769px) {
                      width 60px
                      height 60px
                      line-height 60px
                    }
                .list-text
                  margin-top 30px
                  font-family "Microsoft YaHei UI Light"
                  font-size 18px
                  display flex
                  flex-direction column
                  align-items center
                .current
                  color #181818
                .party
                  color #181818
              .dots
                height 100px
                display flex
                flex-direction row
                align-items center
                justify-content center
                @media screen and (max-width: 769px) {
                  width 60px
                  height 60px
                  line-height 60px
                }
              .not
                width 15%
          .qualifying-list-mobile
            margin 40px auto
            width 100%
            display flex
            flex-direction column
            justify-content center
            align-items center
            @media screen and (min-width: 1024px) {
              display none
            }
            @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
              display block
            }
            ul
              width 60%
              margin 0 auto
              display flex
              flex-direction row
              justify-content space-between
              @media screen and (max-width: 769px) {
                width 80%
              }
              li
                width auto
                display flex
                flex-direction column
                align-items center
                .value
                  width 100px
                  height 100px
                  border-radius 100%
                  background #032e43
                  color #fff
                  font-size 30px
                  text-align center
                  line-height 100px
                  @media screen and (max-width: 769px) {
                    width 60px
                    height 60px
                    font-size 18px
                    line-height 60px
                  }
                .rob
                  width 100px
                  height 100px
                  border-radius 100%
                  text-align center
                  font-size 30px
                  color #fff
                  line-height 100px
                  @media screen and (max-width: 769px) {
                    width 60px
                    height 60px
                    line-height 60px
                  }
                  img
                    @media screen and (max-width: 769px) {
                      width 60px
                      height 60px
                      line-height 60px
                    }
                .list-text
                  margin-top 30px
                  font-family "Microsoft YaHei UI Light"
                  font-size 14px
                  display flex
                  flex-direction column
                  align-items center
                  text-align center
                .current
                  color #181818
                  @media screen and (max-width: 1200px)
                    font-size: 14px
                .party
                  color #181818
              .dots
                height 100px
                display flex
                flex-direction row
                align-items center
                justify-content center
                @media screen and (max-width: 769px) {
                  width 60px
                  margin-right: 10px
                  height 60px
                  line-height 60px
                }
              .not
                width 9%
            .mobile-li
              display flex
              flex-direction row
              justify-content center
              align-items center
              margin 50px auto
              padding 10px 0
              width 220px
              border-radius 5px
              border 2px dotted #fc534c
              .rob
                margin-right 15px
              .list-text
                color #fc534c
        .game-three
          padding-top 130px
          width 100%
          height auto
          background #fff
          padding-bottom 90px
          border-bottom 1px solid #edeff1
          @media screen and (max-width: 1024px) {
            border-bottom 1px dotted #fc534c
            padding-bottom 60px
          }
          .text-group
            width 100%
            display flex
            flex-direction column
            align-items center
            background #fff
            padding-bottom 130px
            font-family "Microsoft YaHei UI Light"
            @media screen and (max-width: 1024px) {
              padding-bottom 90px
            }
            .group-title
              font-size 22px
              color #181818
            .group-description
              width 50%
              font-size 18px
              margin-top 40px
              text-align center
              line-height 2
              @media screen and (max-width: 1024px) {
                width 86%
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
              img
                margin-left 20px
          .promote-list-no-login
            display flex
            flex-direction row
            justify-content space-between
            width 30%
            margin 0 auto
            @media screen and (max-width: 1024px) {
              width 80%
            }
            .promote-left
              width 25%
              height 100px
              background #fc534c
              border-radius 5px
              font-size 30px
              color #fff
              text-align center
              line-height 100px
              @media screen and (max-width: 1024px) {
                font-size 20px
              }
            .promote-right
              width 75%
              height 100px
              border 2px dotted #fc534c
              border-radius 5px
              text-align center
              font-size 20px
              line-height 50px
              @media screen and (max-width: 1024px) {
                font-size 20px
                line-height 50px
              }
          .promote-list-login
            display flex
            flex-direction row
            justify-content space-between
            /*width 70%*/
            margin 0 auto
            @media screen and (max-width: 414px) {
              width 100%
            }
            .current-rank
              width 100%
              display flex
              flex-direction column
              align-items center
              .text
                font-family "Microsoft YaHei UI"
                font-size 18px
                color #181818
              .rank-value
                display flex
                flex-direction column
                justify-content center
                margin-top 24px
                width 50%
                height 88px
                background #edeff1
                border-radius 4px
                text-align center
                @media screen and (max-width: 414px) {
                  width 80%
                }
                .name
                  word-wrap break-word
            .need
              margin-top 12px
              height auto
              line-height 2.1
              display flex
              flex-direction column
              align-items center
              justify-content center
              width 100%
              @media screen and (max-width: 414px) {
                /*width 15%*/
                line-height 1.4
              }
              .text
                margin-top 24px
                font-size 18px
                font-family "Microsoft YaHei UI"
                color #181818
                @media screen and (max-width: 414px) {
                  font-size 14px
                }
              .text-value
                letter-spacing 2
                color #fc534c
                text-align center
              .dots
                margin-top 10px
                display flex
                flex-direction row
                align-items center
                justify-content center
                img
                  @media screen and (max-width: 414px) {
                    width 60px
                    height 10px
                  }
            .target
              display flex
              flex-direction column
              align-items center
              width 100%
              .text
                font-family "Microsoft YaHei UI"
                font-size 18px
                color #fc534c
              .target-value
                display flex
                flex-direction column
                align-items center
                justify-content center
                margin-top 24px
                width 50%
                height 88px
                background #fc534c
                color #fff
                border-radius 4px
                @media screen and (max-width: 414px) {
                  width 80%
                }
        .game-four
          background #fc534c
          display flex
          flex-direction column
          align-items center
          justify-content center
          font-size 20px
          color #fff
          padding-top 30px
          padding-bottom 30px
          @media screen and (max-width: 1024px) {
            background #fff
            padding: 10px 0
            border-bottom 1px dotted #fc534c
          }
          .text-title
            text-align center
            margin-bottom 10px
            @media screen and (max-width: 1024px) {
              color #fc534c
              font-weight bold
            }
          .text-value
            padding-top 15px
            font-family "Microsoft YaHei UI"
            font-weight bold
            color #fff
            @media screen and (max-width: 1024px) {
              font-size 30px
              color #fc534c
            }
            .integer
              color #fff
              font-size 58px
              @media screen and (max-width: 1024px) {
                font-size 30px
                color #fc534c
              }
            .decimal
              font-size 24px
              @media screen and (max-width: 1024px) {
                font-size 18px
              }
            .unit
              font-size 24px
              @media screen and (max-width: 1024px) {
                font-size 18px
              }
        .game-five
          padding-top 90px
          background #fff
          width 100%
          height auto
          padding-bottom 100px
          border 1px solid #edeff1
          i
            display inline-block
            width 10px
            height 22px
            margin-right 30px
            background-color #032e43
          .text-group
            width 100%
            display flex
            flex-direction column
            align-items center
            background #fff
            padding-bottom 130px
            font-family "Microsoft YaHei UI Light"
            .group-title
              font-size 22px
              color #181818
            .group-description
              width 50%
              font-size 18px
              margin-top 40px
              text-align center
              line-height 2
              @media screen and (max-width: 414px) {
                width 76%
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
              img
                margin-left 20px
          .table-container
            margin 0 auto
            width 56%
            @media screen and (max-width: 1024px) {
              width 86%
            }
            .table-title
              height 64px
              width 100%
              line-height 64px
              background #edeff1
              display flex
              align-items center
              i
                display inline-block
                width 10px
                height 22px
                margin-right 30px
                background-color #032e43
            .table-name
              height 64px
              padding-top 30px
              ul
                display flex
                flex-direction row
                width 100%
                justify-content flex-start
                font-family "Microsoft YaHei UI Light"
                font-size 14px
                color #181818
                li
                  text-align center
                  &:first-child
                    width 25%
                  &:nth-child(2)
                    width 30%
                  &:last-child
                    width 45%
            .table-value
              width 100%
              ul
                display flex
                flex-direction column
                font-family "Microsoft YaHei UI Light"
                font-size 14px
                color #181818
                justify-content flex-start
                li
                  height 64px
                  display flex
                  flex-direction row
                  align-items center
                  text-align center
                  .rank
                    width 25%
                  .count
                    width 30%
                  .cumulative
                    width 45%
                &:nth-of-type(odd)
                  background #edeff1
        .game-six
          padding-top 90px
          background #fff
          padding-bottom 100px
          .text-group
            width 100%
            display flex
            flex-direction column
            align-items center
            background #fff
            padding-bottom 130px
            font-family "Microsoft YaHei UI Light"
            .group-title
              font-size 22px
              color #181818
              text-align center
            .group-description
              width 50%
              font-size 18px
              margin-top 40px
              text-align center
              line-height 2
              @media screen and (max-width: 414px) {
                width 100%
                padding: 0 15px
                font-size: 14px
              }
            .group-more
              margin-top 40px
              color #003399
              font-size 14px
              font-family "Microsoft YaHei UI"
              cursor pointer
              user-select none
          .table-container
            margin 0 auto
            width 56%
            @media screen and (max-width: 1024px) {
              width 86%
            }
            .table-title
              height 64px
              width 100%
              line-height 64px
              background #edeff1
              display flex
              align-items center
              i
                display inline-block
                width 10px
                height 22px
                margin-right 30px
                background-color #032e43
            .table-name
              height 64px
              padding-top 30px
              ul
                display flex
                flex-direction row
                width 100%
                justify-content flex-start
                font-family "Microsoft YaHei UI Light"
                font-size 14px
                color #181818
                li
                  &:first-child
                    width 20%
                    text-align center
                  &:nth-child(2)
                    width 33%
                    text-align center
                  &:last-child
                    width 47%
                    text-align center
            .table-value
              width 100%
              ul
                display flex
                flex-direction column
                font-family "Microsoft YaHei UI Light"
                font-size 14px
                color #181818
                li
                  height 64px
                  display flex
                  flex-direction row
                  align-items center
                  justify-content flex-start
                  .rank
                    width 20%
                    text-align center
                  .count
                    width 33%
                    text-align center
                  .cumulative
                    width 46%
                    text-align center
                &:nth-of-type(odd)
                  background #edeff1
      .dialog-box
        position fixed
        top 0
        width 100%
        height 100%
        display flex
        justify-content center
        align-items center
        background-color:rgba(0,0,0,.5)
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
            .qualifying-list
              margin-top 90px
              width 100%
              display flex
              flex-direction row
              justify-content center
              @media screen and (min-width: 1024px) {
                display block
              }
              @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
                display none
              }
              ul
                width 60%
                margin 0 auto
                display flex
                flex-direction row
                justify-content space-between
                li
                  width auto
                  display flex
                  flex-direction column
                  align-items center
                  .value
                    width 100px
                    height 100px
                    border-radius 100%
                    background #032e43
                    color #fff
                    font-size 30px
                    text-align center
                    line-height 100px
                    @media screen and (max-width: 769px) {
                      width 60px
                      height 60px
                      font-size 18px
                      line-height 60px
                    }
                  .rob
                    width 100px
                    height 100px
                    border-radius 100%
                    text-align center
                    font-size 30px
                    color #fff
                    line-height 100px
                    @media screen and (max-width: 769px) {
                      width 60px
                      height 60px
                      line-height 60px
                    }
                    img
                      @media screen and (max-width: 769px) {
                        width 60px
                        height 60px
                        line-height 60px
                      }
                  .list-text
                    margin-top 30px
                    font-family "Microsoft YaHei UI Light"
                    font-size 18px
                    display flex
                    flex-direction column
                    align-items center
                  .current
                    color #181818
                  .party
                    color #181818
                .dots
                  height 100px
                  display flex
                  flex-direction row
                  align-items center
                  justify-content center
                  @media screen and (max-width: 769px) {
                    width 60px
                    height 60px
                    line-height 60px
                  }
                .not
                  width 16%
            .qualifying-list-mobile
              margin-top 90px
              width 100%
              display flex
              flex-direction column
              justify-content center
              align-items center
              @media screen and (min-width: 1024px) {
                display none
              }
              @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
                display block
              }
              ul
                width 60%
                margin 0 auto
                display flex
                flex-direction row
                justify-content space-between
                @media screen and (max-width: 769px) {
                  width 75%
                }
                li
                  width auto
                  display flex
                  flex-direction column
                  align-items center
                  .value
                    width 100px
                    height 100px
                    border-radius 100%
                    background #ccc
                    color #fff
                    font-size 30px
                    text-align center
                    line-height 100px
                    @media screen and (max-width: 769px) {
                      width 60px
                      height 60px
                      font-size 18px
                      line-height 60px
                    }
                  .rob
                    width 100px
                    height 100px
                    border-radius 100%
                    text-align center
                    font-size 30px
                    color #fff
                    line-height 100px
                    @media screen and (max-width: 769px) {
                      width 60px
                      height 60px
                      line-height 60px
                    }
                    img
                      @media screen and (max-width: 769px) {
                        width 60px
                        height 60px
                        line-height 60px
                      }
                  .list-text
                    margin-top 30px
                    font-family "Microsoft YaHei UI Light"
                    font-size 18px
                    display flex
                    flex-direction column
                    align-items center
                  .current
                    color #181818
                  .party
                    color #181818
                .dots
                  height 100px
                  display flex
                  flex-direction row
                  align-items center
                  justify-content center
                  @media screen and (max-width: 769px) {
                    width 60px
                    height 60px
                    line-height 60px
                  }
                .not
                  width 9%
              .mobile-li
                display flex
                flex-direction row
                justify-content center
                align-items center
                margin 50px auto
                padding 10px 0
                width 220px
                border-radius 5px
                border 2px dotted #fc534c
                .rob
                  margin-right 15px
                .list-text
                  color #fc534c
            .description
              width 57%
              margin: 60px auto 0
              text-align center
              font-size 18px
              font-family "Microsoft YaHei UI Light"
              line-height 2
              color #003399
              @media screen and (max-width: 1024px) {
                width 80%
                font-size: 14px
                margin-top 30px
              }
            .btn
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

<script type="text/ecmascript-6">
export default{
  data () {
    return {
      isShow: false, // 用户未登录点击了解的弹窗
      loginIsShow: false, // 用户登录后点击了解游戏规则的弹窗
      loginFlag: false,
      isReward: false, // 了解排位奖励
      isPool: false, // 了解奖金池
      roundName: '', // 活动名称
      durationCountDown: true,
      timerCountDown: true,
      capitalPool: '', // 本轮奖金池总金额
      alreadyTime: '', // 已经开始时间
      startAt: '', // 活动开始时间
      endAt: '', // 活动结束时间
      timeArr: [], // 倒计时数组
      timer: null, // 清除定时器
      addArr: [],
      capitalPoolArr: [],
      lastRewardIndex: '', // 当前奖励排位
      playerIndex: '',
      myNewIndex: '',
      myRefRanking: '', // 我的排位
      refRewardAmount: '', //  获取我的推广业绩
      refAmount: '', // 获取排名第一的推广业绩
      userName: '', // 获取用户名
      topUserName: '', // 获取排名第一的用户名
      roundSumLoopReward: '', // 获取排位循环奖发放总金额
      roundSumLoopRewardValue: '', // 保留四位小数
      roundSumLoopRewardArr: [], // 将获取排位循环奖发放总金额分割数组
      recordList: [], // 获取用户排位奖励列表
      rewardPlayerList: [], // 本轮活动参与用户列表
      lastPlayerName: '', // 获取队尾的用户名
      rewardIndex: '', // 获得当前排位奖励的位置
      lastUserName: '', // 获得当前排位奖励的用户名
      propPage: 1, // 总页数
      currentPage: '', // 当前页
      currentPageOther: '',
      id: '', // 活动id
      recordListPropPage: '',
      time1: '',
      timer2: '',
      Multiplied: '',
      day: '',
      hour: '',
      min: '',
      sce: '',
      dayDur: '', // 已经开始的天数
      hourDur: '', // 已经开始的小时
      minDur: '', // 已经开始的分钟
      secDur: '', // 已经开始的秒数
      currentCapitalPool: '',
      flag: false,
      isDialog: false, // 公共的弹窗框
      avatar: '',
      lastFlag: false,
      imgUrl: '' // 头像
    }
  },
  created () {
    this._getLoginFlag()
    if (this.LocalLoginFlag === 'true') {
      this._getRecordList(1)
    }
    this.getCapitalPool(this.flag, 1)
    this.time1 = setInterval(() => {
      this.getCapitalPool(this.flag, 1)
    }, 5000)
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    clearInterval(this.time1)
  },
  methods: {
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
    checkTime (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    // 计时器
    duration () {
      let leftTime = (Date.parse(new Date()) - this.startAt) // 计算已经开始的毫秒数
      if (Date.parse(new Date()) === this.endAt) {
        this.dayDur = parseInt(this.endAt / 1000 / 60 / 60 / 24, 10) // 结束的天数
        this.hourDur = parseInt(this.endAt / 1000 / 60 / 60 % 24, 10) // 结束的小时
        this.minDur = parseInt(this.endAt / 1000 / 60 % 60, 10) // 结束的小时
        this.secDur = parseInt(this.endAt / 1000 % 60, 10) // 结束的秒数
        setTimeout(this.timer)
      } else {
        leftTime++
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算已经开始的天数
        let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算已经开始的小时
        let minutes = parseInt(leftTime / 1000 / 60 % 60, 10) // 计算已经开始的分钟
        let seconds = parseInt(leftTime / 1000 % 60, 10) // 计算已经开始的秒数
        days = this.checkTime(days)
        hours = this.checkTime(hours)
        minutes = this.checkTime(minutes)
        seconds = this.checkTime(seconds)
        let addTimeArr = []
        addTimeArr.push(days, hours, minutes, seconds)
        this.timer = setTimeout(() => this.duration(), 1000)
        this.addArr = addTimeArr
        this.dayDur = this.addArr[0] // 已经开始的天数
        this.hourDur = this.addArr[1] // 已经开始的小时
        this.minDur = this.addArr[2] // 已经开始的分钟
        this.secDur = this.addArr[3] // 已经开始的秒数
      }
    },
    getCapitalPool (flag, page) { // 获取吃饼主页面数据
      this.$http.post(`${this.$api}/danRobot/danRewardDetail?pageIndex=${page}&pageSize=10`).then((res) => {
        if (res.data.success === true) {
          if (res.data.data.rewardRound) {
            this.roundName = res.data.data.rewardRound.roundName // 获取期数
            this.capitalPool = res.data.data.rewardRound.capitalPool // 获得本轮奖金池总金额
            if (flag === true || this.currentCapitalPool !== this.capitalPool) {
              this.flag = false
              this.currentCapitalPool = this.capitalPool
              this.capitalPoolValue = this.capitalPool.toFixed(4)
              this.capitalPoolArr = this.capitalPoolValue.split('.')
              this.roundSumLoopReward = res.data.data.roundSumLoopReward // 获取排位循环奖发放总金额
              this.roundSumLoopRewardValue = this.roundSumLoopReward.toFixed(4)
              this.roundSumLoopRewardArr = this.roundSumLoopRewardValue.split('.')
              // console.log(this.capitalPoolArr)
              // this.remaining = (res.data.data.rewardRound.endAt) - (res.data.data.rewardRound.startAt) // 获得本轮剩余时间
              this.endAt = res.data.data.rewardRound.endAt
              this.startAt = res.data.data.rewardRound.startAt
              this.lastRewardIndex = res.data.data.lastRewardIndex
              this.countDown()
              this.duration()
              this.alreadyTime = Date.parse(new Date()) - (res.data.data.rewardRound.startAt) // 获得已经开始时间
              if (res.data.data.rewardPlayer) {
                this.playerIndex = res.data.data.rewardPlayer[0].playerIndex
              }
              this.myRefRanking = res.data.data.myRefRanking // 获取我当前的排名
              this.refRewardAmount = res.data.data.refRewardAmount // 获取我的推广业绩
              if (res.data.data.rewardRound.topRefList.length !== 0) {
                this.refAmount = res.data.data.rewardRound.topRefList[0].refAmount // 获取排名第一的推广业绩
              }
              this.topUserName = res.data.data.rewardRound.topRefList[0].userName // 获取排名第一的用户名
              this.rewardPlayerList = res.data.data.rewardPlayerList // 本轮活动参与用户列表
              this.lastPlayerName = res.data.data.lastPlayer.userName // 获取队尾的用户名
              if (this.lastFlag === true) {
                this.imgUrl = res.data.data.lastPlayer.headImage // 获取队尾的头像
              } else {
                this.imgUrl = require('../../assets/images/eatGame/avatar.svg')
              }
              this.rewardIndex = res.data.data.rewardRound.rewardIndex // 获得当前排位奖励的位置
              this.lastUserName = res.data.data.rewardRound.lastUserName // 获得当前排位奖励的用户名
              this.propPage = res.data.data.totalPage // 获取总页数
              this.id = res.data.data.rewardRound.id
              this._getRecordList(1)
              this.myNewIndex = res.data.data.myNewIndex
              if (this.$refs.turnPage) {
                this.$refs.turnPage.resetPage(page)
              }
              // console.log(this.roundId)
              if (this.LocalLoginFlag === 'true') {
                this._getRecordList(1)
              }
            }
          }
        }
      })
    },
    _getLoginFlag () {
      this.$http.post(`${this.$api}/user/balance`).then((res) => {
        if (res.data.success === true) {
          this.lastFlag = true
          this.userName = res.data.data.user.userName // 获取用户名
          // this.imgUrl = res.data.data.user.imgUrl
          this.loginFlag = true
        } else {
          this.lastFlag = false
          this.loginFlag = false
        }
      }).catch(err => {
        console.log(err)
        this.lastFlag = false
        this.loginFlag = false
      })
    },
    changeTime (time) { // 转换时间的格式
      return this.$changeDate(time, '/', 1)
    },
    _getRecordList (page) {
      this.$http.post(`${this.$api}/danRobot/mySortRewardList?pageIndex=${page}&pageSize=10&roundId=${this.id}`).then((res) => {
        if (res.data.success === true) {
          this.recordList = res.data.data.rewardPlayer // 获取用户排位奖励列表
          console.log(this.recordList)
          this.recordListPropPage = res.data.data.totalPage // 获取总页数
        }
      })
    },
    parentTurnPage (page) { // 页码
      this.flag = true
      this.currentPage = page
      this.getCapitalPool(this.flag, page)
    },
    parentTurnPageOther (page) {
      this.currentPageOther = page
      this._getRecordList(page)
    },
    loginMore () {
      this.isDialog = true
      this.loginIsShow = true
    },
    closeIsDialog () {
      this.isDialog = false
      this.loginIsShow = false
      this.isShow = false
      this.isReward = false
      this.isPool = false
    },
    more () {
      this.isDialog = true
      this.isShow = true
    },
    underPool () {
      this.isDialog = true
      this.isPool = true
    },
    reward () {
      this.isDialog = true
      this.isReward = true
    },
    toDetail () {
      this.$router.push('/eatGame/activityLog')
    },
    toRob () {
      if (this.loginFlag === true) {
        this.$router.push('/account/myDon')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
