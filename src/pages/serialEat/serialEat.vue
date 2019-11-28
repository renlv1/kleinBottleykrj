<template>
  <div class="eatGame-container">
    <div class="eatGame">
      <div class="container-top linWrap isClick" @click="goAnchor('#bonus')">{{$t('serialEat.text62')}} {{roundName}}
        {{$t('serialEat.text6')}} <span class="isPCPoll">- {{$t('pastRecord.text15')}} <span style="color: #FC534C">{{bonusPool | fourNumber}}</span> USD/{{$t('pastRecord.text14')}} <span
          style="color: #FC534C">{{rewardPool | fourNumber}}</span> USD
      ——</span><span style="color: #003399"> {{$t('pastRecord.text16')}} >></span>
      </div>
      <div class="content-container">
        <div class="isClick icon" @click="backTop">
          <img width="20" height="22" src="../../assets/images/eatGame/backTop.png"/>
          <div class="back-text">{{$t('pastRecord.text17')}}</div>
        </div>
        <!-- 交易所 -->
        <v-changes></v-changes>
        <!-- 定时器DOM -->
        <div id="bonus" class="game-one">
          <div class="words-period">{{$t('serialEat.text5')}} <span class="period">{{roundName}}</span>
            {{$t('serialEat.text6')}}
          </div>
          <div class="time-wrapper">
            <div class="time" v-if="roundName">
              <span class="days">{{day}}</span>
              <span class="colon">{{$t('serialEat.text2')}}</span>
              <span class="hours">{{hour}}</span>
              <span class="colon">{{$t('serialEat.text3')}}</span>
              <span class="mins">{{min}}</span>
              <span class="colon">{{$t('serialEat.text4')}}</span>
              <!--<span class="mins">{{sec}}</span>-->
              <!--<span class="colon">秒</span>-->
            </div>
            <div class="time" v-if="!roundName">
              <span class="days">00</span>
              <span class="colon">{{$t('serialEat.text2')}}</span>
              <span class="hours">00</span>
              <span class="colon">{{$t('serialEat.text3')}}</span>
              <span class="mins">00</span>
              <span class="colon">{{$t('serialEat.text4')}}</span>
              <!--<span class="mins">{{sec}}</span>-->
              <!--<span class="colon">秒</span>-->
            </div>
            <div v-if="roundName" class="time-text">{{isActive(active)}}</div>
          </div>
          <div v-if="roundName" class="time-mobile">{{isActive(active)}} {{day}}{{$t('serialEat.text2')}}
            {{hour}}{{$t('serialEat.text3')}} {{min}}{{$t('serialEat.text4')}}
          </div>
          <div v-if="!roundName" class="time-mobile">{{isActive(active)}} 00{{$t('serialEat.text2')}}
            00{{$t('serialEat.text3')}} 00{{$t('serialEat.text4')}}
          </div>
          <div class="words-more" @click="toPastRecord">
            <div class="group-more">{{$t('serialEat.text7')}}<img width="9" height="14"
                                                                  src="../../assets/images/eatGame/row.svg"></div>
          </div>
          <div class="words-wrapper">
            <div class="btn-group">
              <button class="btn" @click="openDialog">
                <span>{{$t('serialEat.text37')}}</span>
              </button>
              <!--<button class="btn">{{$t('serialEat.text38')}}</button>-->
            </div>
          </div>
          <div class="new-bet">
            <div class="new-bet-text">{{$t('eatGameHome.text57')}}</div>
            <div class="new-bet-panel">
              <vue-seamless-scroll :data="listData" :class-option="classOption" class="warp">
                <ul class="item">
                  <li v-for="item in listData" :key="item.index">{{item}}</li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
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
                  <div class="list-text common-text">{{$t('serialEat.text25')}}: <span style="color: #FC534C">{{userName}}</span>
                  </div>
                  <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{playAmount | fourNumber}} USD</span>
                  </div>
                </div>
              </li>
              <li v-if="(userInfo.length !== 0 && myNewIndex) && (myNewIndex <= playerIndex)">
                <div class="list-value">{{myNewIndex}}</div>
                <div class="list-text common-text">{{$t('serialEat.text24')}}: {{userInfo.userName}}</div>
                <div class="list-text common-text" style="color: #666" v-show="isHasBone">
                  {{$t('activityReward.text15')}}
                </div>
              </li>
              <li v-if="(userInfo.length !== 0 && myNewIndex)"
                  style="display: flex; align-items: center; margin-top: -80px">
                <img src="../../assets/images/eatGame/dots.png">
              </li>
              <li v-if="(userInfo.length !== 0 && myNewIndex) && (myNewIndex > playerIndex)">
                <div class="list-value">{{myNewIndex}}</div>
                <div class="list-text common-text">{{$t('serialEat.text24')}}: {{userInfo.userName}}</div>
                <div class="list-text common-text" style="color: #666" v-show="isHasBone">
                  {{$t('activityReward.text15')}}
                </div>
              </li>
              <li v-if="myNewIndex <= playerIndex">
                <div class="list-value">{{playerIndex}}</div>
                <div>
                  <div class="list-text common-text">{{$t('serialEat.text25')}}: <span style="color: #FC534C">{{userName}}</span>
                  </div>
                  <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{playAmount | fourNumber}} USD</span>
                  </div>
                </div>
              </li>
              <li v-if="(userInfo.length !== 0 && myNewIndex)"
                  style="display: flex; align-items: center; margin-top: -80px">
                <img src="../../assets/images/eatGame/dots.png">
              </li>
              <li>
                <div class="list-value">{{firstPlayerIndex}}</div>
                <div>
                  <div class="list-text common-text">{{$t('orderDetail.text25')}}: <span style="color: #FC534C">{{firstUserName}}</span>
                  </div>
                  <div class="list-text common-text">{{$t('pools.text3')}}: <span style="color: #FC534C">{{firstPlayAmount | fourNumber}} USD</span>
                  </div>
                </div>
              </li>
            </ul>
            <div @click="toAllPool" class="group-more isClick"
                 style="color: #FC534C; margin-top: 40px; display: flex; align-items: center; justify-content: center">
              {{$t('exchange.text31')}}<img style="margin-left: 10px" width="9" height="14"
                                            src="../../assets/images/eatGame/row.svg"></div>
          </div>
          <div class="qualifying-list-mobile">
            <div class="list-mobile-text">
              <ul>
                <li v-if="playerIndex < myNewIndex">
                  <div class="list-value last-place">{{playerIndex}}</div>
                  <div class="list-text last-text">{{$t('serialEat.text25')}}: <span
                    class="change-#fc534c">{{userName}}</span></div>
                  <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{playAmount | fourNumber}} USD</span>
                  </div>
                </li>
                <li v-if="userInfo.length !== 0 && myNewIndex && playerIndex < myNewIndex">
                  <div class="list-value my-place">{{myNewIndex}}</div>
                  <div class="list-text my-text">{{$t('serialEat.text19')}}</div>
                  <div class="list-text common-text" style="color: #666" v-show="isHasBone">
                    {{$t('activityReward.text15')}}
                  </div>
                </li>
                <li v-if="userInfo.length !== 0 && myNewIndex && playerIndex >= myNewIndex">
                  <div class="list-value my-place">{{myNewIndex}}</div>
                  <div class="list-text my-text">{{$t('serialEat.text19')}}</div>
                  <div class="list-text common-text" style="color: #666" v-show="isHasBone">
                    {{$t('activityReward.text15')}}
                  </div>
                </li>
                <li v-if="playerIndex >= myNewIndex">
                  <div class="list-value last-place">{{playerIndex}}</div>
                  <div class="list-text last-text">{{$t('serialEat.text25')}}: <span
                    class="change-#fc534c">{{userName}}</span></div>
                  <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{playAmount | fourNumber}} USD</span>
                  </div>
                </li>
                <li @click="toAllPool" class="isClick">
                  <div class="list-value last-place">{{firstPlayerIndex}}</div>
                  <div class="list-text last-text">{{$t('orderDetail.text25')}}: <span class="change-#fc534c">{{firstUserName}}</span>
                  </div>
                  <div class="list-text common-text">{{$t('shareBonusDetail.text5')}}: <span style="color: #FC534C">{{firstPlayAmount | fourNumber}} USD</span>
                  </div>
                </li>
              </ul>
              <div @click="toAllPool" class="group-more isClick"
                   style="color: #FC534C; margin-top: 40px; display: flex; align-items: center; justify-content: center">
                {{$t('exchange.text31')}}<img style="margin-left: 10px" width="9" height="14"
                                              src="../../assets/images/eatGame/row.svg"></div>
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
        <div class="new-game-panel">
          <div class="game-panel-title">
            {{$t('eatGameHome.text60')}}
          </div>
          <div v-if="futureBonusShow" class="words-more" @click="$router.push({path: '/futureBonus', query: {roundId: roundId}})">
            <div class="group-more">{{$t('futureBonus.text1')}}<img width="9" height="14"
                                                                    src="../../assets/images/eatGame/row.svg"></div>
          </div>
          <div class="pool-wrapper">
            <div class="pool">
              <div class="pool-text">
                <p>{{$t('serialEat.text8')}}</p>
              </div>
              <div v-if="futureBonusShow" class="words-more-mobile" @click="$router.push({path: '/futureBonus', query: {roundId: roundId}})">
                <div class="group-more">{{$t('futureBonus.text1')}}<img width="9" height="14"
                                                                        src="../../assets/images/eatGame/row.svg"></div>
              </div>
              <div class="value">
                <div class="money-count">
                  <span class="integer">{{bonusPoolArr[0]}}</span>
                  <span class="dot">.</span>
                  <span class="decimal">{{bonusPoolArr[1]}}</span>
                  <span class="unit">USD</span>
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
              </div>
              <div class="value">
                <div class="money-count">
                  <span class="integer">{{rewardPoolArr[0]}}</span>
                  <span class="dot">.</span>
                  <span class="decimal">{{rewardPoolArr[1]}}</span>
                  <span class="unit">USD</span>
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
            <div class="group-more">{{$t('serialEat.text12')}}<img width="9" height="14"
                                                                   src="../../assets/images/eatGame/right_1.png"></div>
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
            <div class="group-more">{{$t('serialEat.text12')}}<img width="9" height="14"
                                                                   src="../../assets/images/eatGame/row.svg"></div>
          </div>
          <button class="btn" @click="toExchange">
            <div class="btn-text">
              {{$t('serialEat.text13')}}
            </div>
          </button>
        </div>
        <div class="random-container" v-if="hourJobShow">
          <div class="random-head">
            <div class="head-tilte">{{$t('snapQueue.text10')}}</div>
            <div class="random-description">
              {{$t('serialEat.text47')}}
              <span @click="readAll" class="reader-more isClick">{{$t('serialEat.text51')}} <img width="9" height="14"
                                                                                                 src="../../assets/images/eatGame/row.svg"/></span>
            </div>
            <div class="before-win-user">{{$t('serialEat.text52')}}：<span class="active-text">{{lastJobUser}}</span>
            </div>
            <div class="mobile-random-rewards">
              <div class="top-rewards-container">
                <div class="common">
                  <div class="random-title">{{$t('serialEat.text53')}}</div>
                  <div class="random-value">{{timingHour}}:{{timingMin}}:{{timingSce}}</div>
                </div>
                <div class="common">
                  <div class="random-title">{{$t('serialEat.text54')}}</div>
                  <div class="random-value">{{rewardPre}}00%</div>
                </div>
                <div class="common">
                  <div class="random-title">{{$t('serialEat.text55')}}</div>
                  <div class="random-value">{{randomHour}}:{{randomMin}}:{{randomSce}}</div>
                </div>
              </div>
              <div class="bottom-rewards-container">
                <div class="expect-avatar">
                  <img width="70" height="70" style="border-radius: 100%; box-shadow: 0 0 5px #ccc"
                       :src="hourJobUserAvatar"/>
                </div>
                <div class="expect-title">{{$t('serialEat.text48')}}</div>
                <div class="expect-name active-text">{{hourJobUserName}}</div>
              </div>
            </div>
            <div class="btns-group">
              <button class="btns isClick" @click="$router.push('/snapQueue')">
                <span>{{$t('serialEat.text56')}}</span>
              </button>
              <button class="btns isClick" @click="$router.push('/historyWinList')">
                <span>{{$t('serialEat.text57')}}</span>
              </button>
            </div>
            <!--<div class="words-more" @click="$router.push('/snapQueue')">-->
            <!--<div class="group-more">{{$t('snapQueue.text11')}} <img width="9" height="14" src="../../assets/images/eatGame/row.svg"> </div>-->
            <!--</div>-->
          </div>
          <div class="pc-random-rewards">
            <div class="ing-time common">
              <div class="random-title">{{$t('serialEat.text61')}}</div>
              <div class="random-value">{{timingHour}}:{{timingMin}}:{{timingSce}}</div>
            </div>
            <!-- segmentation 起分割线的作用 -->
            <div class="segmentation"></div>
            <div class="random-left common">
              <div class="random-title">{{$t('serialEat.text46')}}</div>
              <div class="random-value">{{randomHour}}:{{randomMin}}:{{randomSce}}</div>
            </div>
            <div class="segmentation"></div>
            <div class="multiple common">
              <div class="random-title">{{$t('serialEat.text59')}}</div>
              <div class="random-value">{{rewardPre}}00%</div>
            </div>
            <div class="segmentation"></div>
            <div class="random-right common">
              <div class="expect-avatar">
                <img width="70" height="70" style="border-radius: 100%; box-shadow: 0 0 5px #ccc"
                     :src="hourJobUserAvatar"/>
              </div>
              <div class="expect-title">{{$t('serialEat.text48')}}</div>
              <div class="expect-name">{{hourJobUserName}}</div>
            </div>
          </div>
          <!--<button class="btn" @click="$router.push('/snapQueue')">-->
          <!--<div class="btn-text">-->
          <!--{{$t('snapQueue.text12')}}-->
          <!--</div>-->
          <!--</button>-->
        </div>
        <div class="dashang-money">
          <p class="dashang-title">{{$t('daShang.text7')}}</p>
          <div class="money-count">
            <span class="integer">{{awardSum.split('.')[0]}}</span>
            <span class="dot">.</span>
            <span class="decimal">{{awardSum.split('.')[1]}}</span>
            <span class="unit">USD</span>
          </div>
          <p class="dashang-desc">{{$t('daShang.text8')}}</p>
          <div class="dashang-btn" @click="$router.push({path: '/giveReward'})">{{$t('daShang.text9')}}</div>
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
                    @change="aaa()"
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
                    @change="aaa()"
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
            <td class="text-color" :class="{red: item.changeType === 2, green: item.changeType === 1}">
              {{numToTransText(item.changeType)}}
            </td>
            <td class="more-width">{{item.balanceFinal.toFixed(4)}} USD</td>
          </tr>
          </tbody>
          <span style="color: #999; display: inline-block; margin-top: 30px">{{$t('home.text28')}}</span>
          <div class="error" v-if="bonusLogList.length === 0">
            {{$t('orderManage.text8')}}
          </div>
        </table>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"
                    ref="turnPage"></v-turnPage>
      </div>
      <!--<div class="banner">-->
      <!--<div class="linWrap">-->
      <!--<div class="banner-left">-->
      <!--<div class="words-period">{{$t('serialEat.text5')}} <span class="period">{{roundName}}</span> {{$t('serialEat.text6')}}</div>-->
      <!--<div class="description">-->
      <!--<h3>{{$t('serialEat.text1')}}</h3>-->
      <!--<p>{{$t('serialEat.text30')}}</p>-->
      <!--</div>-->
      <!--<div class="words-more" @click="toPastRecord">-->
      <!--<div class="group-more">{{$t('serialEat.text7')}}<img width="9" height="14" src="../../assets/images/eatGame/row.svg"> </div>-->
      <!--</div>-->
      <!--<div class="btn-group">-->
      <!--<button class="btn" @click="openDialog">{{$t('serialEat.text37')}}</button>-->
      <!--<button class="btn">{{$t('serialEat.text38')}}</button>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="banner-right">-->
      <!--<img src="../../assets/images/eatGame/bannerTwo.png"/>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!-- 交易奖励规则弹窗 -->
      <div class="dialog-box" v-if="isDialog">
        <div class="dialog-content">
          <div class="dialog">
            <div class="close" @click="closeIsDialog">
              <img width="30" height="30" src="../../assets/images/eatGame/delete.svg"/>
            </div>
            <div class="dialog-title" v-if="tradingRules">{{$t('serialEat.text39')}}</div> <!-- 交易规则title -->
            <div class="dialog-title" v-if="promoteRules">{{$t('serialEat.text58')}}</div> <!-- 推广规则title -->
            <div class="rule" v-if="tradingRules">
              <p>{{$t('serialEat.text31')}}</p>
              <p>{{$t('serialEat.text32')}}</p>
              <p>{{$t('serialEat.text33')}}</p>
              <p>{{$t('serialEat.text34')}}</p>
              <p>{{$t('serialEat.text35')}}</p>
              <p>{{$t('serialEat.text45')}}</p>
            </div>
            <div class="rule" v-if="promoteRules">
              <p>{{$t('serialEat.text47')}}</p>
              <p>{{$t('serialEat.text60')}}</p>
            </div>
            <button class="btn-dialog" @click="closeIsDialog">{{$t('serialEat.text36')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dashang-money
    display flex
    align-items center
    justify-content center
    flex-direction column
    padding: 130px 0
    border-bottom: 1px solid #edeff1
    background-color: #fff
    @media screen and (max-width: 1200px)
      padding: 50px 0 90px
    .dashang-title
      font-size: 22px;
      color: #181818;
      @media screen and (max-width: 1200px)
        font-weight bold
        text-align center
    .money-count
      font-family: "Microsoft YaHei UI";
      font-weight: bold;
      text-align: center;
      color #181818
      margin: 60px 0 50px
      @media screen and (max-width: 1200px)
        margin: 20px 0
        color #FC534C
      .integer
        font-size: 50px;
        @media screen and (max-width: 1200px)
          font-size: 26px
      .decimal, .unit
        font-size: 26px;
    .dashang-desc
      width: 50%;
      font-size: 18px;
      text-align: center;
      line-height: 2;
      @media screen and (max-width: 1200px)
        width: 87%
        font-size: 16px
    .dashang-btn
      width: 263px
      margin-top: 60px;
      background-color: #fc534c;
      padding: 15px 25px;
      display flex
      align-items center
      justify-content center
      font-size: 18px;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      @media screen and (max-width: 1200px)
        width: 60%
        font-size: 14px

  .webBtn {
    @media screen and (max-width: 1200px) {
      display none
    }
  }

  /* 按钮样式 */
  .btn {
    padding: 15px 25px;
    border: 1px solid #fff;
    margin-right: -1px;
    margin-bottom: -1px;
    outline: none;
    cursor: pointer;
    background: #5e8ff1;
    color: #fff;
    border-radius: 5px;
    &:active {
      opacity: 0.6;
    }
  }

  .eatGame-container
    .eatGame
      width 100%
      height auto
      position relative
      .container-top
        height 34px
        line-height 34px
        font-size 12px
        @media screen and (max-width: 1200px) {
          height 30px
          line-height 30px
          margin-top 50px
          background #e5eaec
        }
        .isPCPoll
          @media screen and (max-width: 1200px) {
            display none
          }
      .banner
        padding 50px 0 88px
        background #fff
        display flex
        justify-content space-between
        margin-bottom 20px
        @media screen and (max-width: 1200px) {
          margin-top 0
          padding-bottom 0
        }
        .linWrap
          display flex
          flex-direction row
          justify-content space-between
          @media screen and (max-width: 1200px) {
            height auto
            flex-direction column
            align-items center
            justify-content center
            margin-top 50px
          }
          .banner-left
            width 50%
            @media screen and (max-width: 1200px) {
              display flex
              flex-direction column
              align-items center
              width 100%
              margin-bottom 30px
            }
            .words-period
              font-size 40px
              color #181818
              @media screen and (max-width: 1024px) {
                font-size 20px
                text-align center
              }
              .period
                color #fc534c
            .description
              margin-top 48px
              h3
                font-weight bold
                @media screen and (max-width: 1024px) {
                  text-align center
                }
              p
                margin-top 10px
                color #000
                font-size 16px
                font-family "Microsoft YaHei"
                font-weight bold
                @media screen and (max-width: 1024px) {
                  line-height 25px
                  text-align center
                }
            .words-more
              margin 40px 0 68px
              font-size 14px
              color #181818
              text-align center
              cursor: pointer
              @media screen and (max-width: 414px) {
                margin-top 40px
                font-size 14px
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
            .btn-group
              @media screen and (max-width: 1024px) {
                display flex
                flex-direction row
                justify-content center
                width 100%
              }
              .btn
                margin-right 35px
                @media screen and (max-width: 1024px) {
                  margin-right 0px
                }
          .banner-right
            width 50%
            @media screen and (max-width: 1200px) {
              width 100%
            }
            img
              float right
              width 478px
              height auto
              @media screen and (max-width: 1200px) {
                display none
              }
      .content-container
        position relative
        // background #fff
        // padding-bottom 150px
        height auto
        @media screen and (max-width: 1024px) {
          margin-top 0
          padding-bottom 0
        }
        .icon
          position absolute
          display flex
          flex-direction column
          justify-content center
          align-items center
          bottom 150px
          right 30px
          @media screen and (max-width: 1024px) {
            display none
          }
          .back-text
            margin-top 10px
        .game-one
          display flex
          flex-direction column
          align-items center
          padding-bottom 130px
          border 1px solid #edeff1
          background #fff
          @media screen and (max-width: 1200px) {
            padding-bottom 0
            border-bottom none
          }
          .words-period
            margin 40px 0 30px
            font-size 40px
            color #181818
            @media screen and (max-width: 1200px) {
              font-size 20px
              text-align center
            }
            .period
              color #fc534
          .time-mobile
            margin 30px 0 20px
            text-align center
            @media screen and (min-width: 1024px) {
              display none
            }
            letter-spacing 2px
            color #181818
          .time-wrapper
            width 40%
            display flex
            flex-direction column
            align-items center
            @media screen and (max-width: 1024px) {
              display none
            }
            .time
              display flex
              justify-content center
              align-items center
              height auto
              width 80%
              @media screen and (max-width: 1024px) {
                width 75%
              }
              @media screen and (max-width: 414px) {
                width 100%
              }
              .days, .hours, .mins
                display flex
                justify-content center
                align-items center
                padding 20px 15px
                width 100%
                font-family "Microsoft YaHei UI Light"
                border 1px solid #d3d4d4
                border-radius 4px
                background #edeff1
                color #181818
                font-size 38px
                @media screen and (max-width: 414px) {
                  padding 20px 10px
                  font-size 18px
                }
              .colon
                text-align center
                height 100%
                width 100%
                font-size 18px
                @media screen and (max-width: 414px) {
                  font-size 14px
                }
            .time-text
              margin-top 30px
              font-family "Microsoft YaHei UI Light"
              font-size 18px
              color #181818
          .words-more
            margin 20px 0
            font-size 14px
            color #181818
            text-align center
            cursor: pointer
            @media screen and (max-width: 1200px) {
              margin 10px 0 28px
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
          .words-wrapper
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
          .new-bet
            margin-top 70px
            @media screen and (max-width: 1024px) {
              padding-top 20px
              border-top 1px solid #ccc
            }
            .new-bet-text
              margin-bottom 30px
              text-align center
              font-size 18px
              color #FC534C
              @media screen and (max-width: 1024px) {
                font-weight bold
              }
            .new-bet-panel
              height 60px
              width 720px
              background url("../../assets/images/eatGame/gradient.png")
              @media screen and (max-width: 1024px) {
                margin 0 auto
                width 100%
                height 40px
              }
              .warp
                height 60px
                width 720px
                overflow hidden
                @media screen and (max-width: 1024px) {
                  margin 0 auto
                  width 100%
                  height 40px
                }
                ul
                  list-style none
                  padding 0
                  margin 0 auto
                  li
                    font-size 22px
                    color #FC534C
                    font-weight bold
                    letter-spacing 2px
                    line-height 60px
                    text-align center
                    @media screen and (max-width: 1024px) {
                      font-size 16px
                    }
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
            display flex
            align-items center
            justify-content center
            font-size 14px
            color #fff
            cursor: pointer
            user-select none
            @media screen and (max-width: 414px) {
              display none
            }
            .group-more
              font-size: 14px
              font-family: "Microsoft YaHei UI"
              display flex
              margin-top 30px
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
            &:active {
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
        .random-container
          background #fff
          padding 130px 0 160px
          border-top 1px solid #eee
          display flex
          flex-direction column
          justify-content center
          @media screen and (max-width: 1200px) {
            padding 70px 0 90px
            align-items center
          }
          .random-head
            display flex
            flex-direction column
            align-items center
            margin-bottom 80px
            @media screen and (max-width: 1024px) {
              margin-bottom 0px
            }
            .head-tilte
              font-size 22px
              color #181818
            .random-description
              width 50%
              font-size 16px
              color #032e43
              margin 70px 0 30px 0
              text-align center
              line-height 2
              letter-spacing 1px
              @media screen and (max-width: 1200px) {
                width 100%
                margin 20px 0 25px 0
                padding 0 20px
                font-size 16px
              }
              .reader-more
                color #003399
                font-size 16px
                @media screen and (max-width: 1200px) {
                  font-size 16px
                }
            .before-win-user
              margin-bottom 40px
            .words-more
              margin 20px 0
              font-size 14px
              color #181818
              text-align center
              cursor: pointer
              @media screen and (max-width: 1200px) {
                display none
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
            .btns-group
              @media screen and (max-width: 1200px) {
                display flex
                flex-direction column
                align-items center
              }
              .btns
                min-width 220px
                border-radius 5px
                background-color #FC534C
                outline-style none
                margin 0 10px
                @media screen and (max-width: 1200px) {
                  min-width 180px
                  margin 10px 0
                }
                span
                  display inline-block
                  padding 15px 25px
                  font-size 18px
                  color #fff
                  @media screen and (max-width: 1200px) {
                    font-size 14px
                    padding 15px 15px
                  }
          .mobile-random-rewards
            width 100%
            display flex
            flex-direction column
            align-items center
            justify-content center
            @media screen and (min-width: 1200px) {
              display none
            }
            .top-rewards-container
              width 100%
              display flex
              flex-direction row
              justify-content space-around
              .common
                display flex
                flex-direction column
                align-items center
                font-size 14px
                flex 1
                .random-title
                  margin-bottom 5px
                .random-value
                  color #181818
                  font-size 16px
                  font-weight bold
            .bottom-rewards-container
              margin 30px
              display flex
              flex-direction column
              justify-content center
              align-items center
              .expect-title
                margin 10px 0 15px
                font-size 16px
          .pc-random-rewards
            display flex
            flex-direction row
            align-items center
            justify-content center
            @media screen and (max-width: 1200px) {
              display none
              flex-direction column
              padding-top 40px
            }
            .common
              width 300px
              display flex
              flex-direction column
              align-items center
              .random-title
                font-size 22px
                color #181818
                text-align center
                margin-bottom: 30px
                @media screen and (max-width: 1024px) {
                  color #000
                  font-weight bold
                  font-size 20px
                }
              .random-value
                font-size 42px
                color #181818
                font-weight bold
                @media screen and (max-width: 1024px) {
                  font-size 32px
                  margin-bottom 50px
                  letter-spacing 2px
                }
            .segmentation
              width 1px
              height 120px
              background-color #c5c5c5
              @media screen and (max-width: 1200px) {
                display none
              }
            .random-right
              width: 300px
              .expect-avatar
                width 100px
                height 100px
                display flex
                justify-content center
                align-items stretch
              // background-color #FC534C
              .expect-title
                margin-bottom 3px
                font-size 16px
                color #262626
              .expect-name
                font-size 16px
                color #FC534C
        .game-three
          height auto
          width 100%
          padding-bottom 130px
          border 1px solid #edeff1
          display flex
          flex-direction column
          align-items center
          justify-content center
          background-color #fff
          @media screen and (max-width: 1200px) {
            padding-bottom 0px
            border-top none
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
                width 90%
                font-size 14px
                margin-top 0
              }
              @media screen and (max-width: 321px) {
                font-size 12px
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
                &:active {
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
                    width 60px
                    height 60px
                    line-height 60px
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
                background-color #fc534c
                border-radius 5px
                width 40%
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
        .new-game-panel
          padding 70px 0 120px
          background-color #fff
          @media screen and (max-width: 1024px) {
            padding 30px 0 30px
            border-bottom 1px solid #edeff1
          }
          .game-panel-title
            font-size 22px
            color #181818
            text-align center
            margin-bottom 40px
            @media screen and (max-width: 1024px) {
              width 80%
              color #171717
              font-weight bold
              margin 0 auto
            }
          .words-more
            font-size 14px
            display flex
            justify-content center
            cursor: pointer
            user-select none
            @media screen and (max-width: 414px) {
              display none
            }
            .group-more
              color #039
              font-size 14px
              font-family "Microsoft YaHei UI"
              display flex
              align-items center
              letter-spacing 3px
              @media screen and (max-width: 1024px) {
                display none
              }
              img
                margin-left 20px
          .pool-wrapper
            margin-top 30px
            line-height 60px
            display flex
            flex-direction row
            flex 1
            @media screen and (max-width: 1024px) {
              display flex
              flex-direction column
              width 100%
            }
            .pool
              flex .5
              width 100%
              /*padding-left 15%*/
              /*width 50%*/
              display flex
              flex-direction column
              align-items center
              @media screen and (max-width: 1024px) {
                padding-left 0
                width 100%
                display flex
                flex-direction column
                align-items center
                margin-bottom 1px solid #edeff1
              }
              .pool-text
                font-size 18px
                color #181818
                p
                  text-align left
                  @media screen and (max-width: 1024px) {
                    margin-top 10px
                    text-align center
                    font-size 20px
                    font-weight bold
                    color #171717
                  }
              .words-more-mobile
                margin 10px auto
                font-size 14px
                color #181818
                text-align center
                width 100%
                cursor: pointer
                @media screen and (min-width: 1024px) {
                  display none
                }
                @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
                  display block
                }
                .group-more
                  color #039
                  margin 0 auto
                  font-size: 14px
                  font-family: "Microsoft YaHei UI"
                  display flex
                  justify-content center
                  align-items center
                  letter-spacing 3px
                  @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
                    width 95%
                    letter-spacing 0
                    line-height 20px
                  }
                  img
                    margin-left 20px
                    @media screen and (max-width: 1024px), handheld and (orientation: landscape) {
                      margin-left 5px
                    }
              .value
                display flex
                align-items center
                margin-top 10px
                .money-count
                  font-family "Microsoft YaHei UI"
                  text-align center
                  font-weight bold
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
              border-bottom 1px solid #ccc
              @media screen and (min-width: 1024px) {
                display none
              }
              button
                margin 40px auto
                background-color #fff
                border-radius 30px
                width 40%
                border 1px solid #fc534c
                font-size 14px
                @media screen and (max-width: 414px) {
                  width 60%
                }
                .btn-text
                  color #fc534c
        .table-container
          // width 80%
          padding 110px 10% 50px 10%
          background-color #fff
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
          padding-bottom 150px
          background-color #fff
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
        background-color: rgba(0, 0, 0, .5)
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
  import {mapGetters} from 'vuex'
  import vueSeamless from 'vue-seamless-scroll'

  export default {
    data() {
      return {
        futureBonusShow: Number,
        listData: [],
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        lastJobUser: '',
        hourJobShow: false,
        endAt: '', // 随机奖励剩余时间
        startAt: '', // 随机奖励开始时间
        randomHour: '',
        randomMin: '',
        randomSce: '',
        restTime: '', // 时间差
        awardSum: '',
        value1: '',
        value2: '',
        isHasBone: true, // 判断是否能得到奖励
        isRed: false, // 收入类型字体颜色
        isIncomeChange: false, // 收入按钮
        isSpendChange: false, // 支出按钮
        isDialog: false,
        tradingRules: false, // 交易规则
        promoteRules: false, // 推广规则
        active: '', // 活动是否结束 0已结束/1已开始  由分红池的金额是否为0来判断
        roundName: '', // 活动名称
        startAtTiming: '', // 活动开始创建的时间
        bonusPool: '', // 分红池金额
        bonusPoolArr: [], // 分红奖金池金额通过处理后的数组
        rewardPool: '',
        rewardPoolArr: [], // 奖金池金额通过处理后的数组
        bonusSum: '', // 本期活动已获得分红金额
        bonusSumArr: [], // 本期活动已获得分红金额通过处理后的数组
        myNewIndex: '', // 我的排位
        playerIndex: '', // 队尾的位置
        userName: '', // 队尾用户名
        pageIndex: 1,
        pageSize: 5,
        totalPage: 0,
        currentPage: 1, // 默认当前页为1
        bonusLogList: [], // 获取分红池收支明细列表对象
        timer: '', // 定义一个定时器
        day: '00',
        hour: '00',
        min: '00',
        timers: '',
        // sec: ''
        flag: true, // 利用flag作为轮循的辅助条件
        currentValue: '', // 临时存放奖励池金额
        isLunXun: false, // 判断列表接口是否轮循
        roundId: '',
        allList: [],
        incomeList: [],
        spendList: [],
        playAmount: '',
        firstUserName: '', // 首位用户名
        firstPlayAmount: '', // 首位投注金额
        firstPlayerIndex: '',
        firstPlayAvatar: '', // 预计获奖人的头像
        hourJobUserAvatar: '',
        hourJobUserName: '', // 预计获奖人姓名
        newTimeArr: '',
        restTiming: '',
        timingHour: '00',
        timingMin: '00',
        timingSce: '00',
        rewardPre: '', // 奖励倍数
        nowDate: '' // 当前时间
      }
    },
    computed: {
      ...mapGetters([
        'userInfo' // 用户信息
      ]),
      classOption() {
        return {
          step: 0.5,
          limitMoveNum: 5,
          waitTime: 1000,
          openTouch: false
        }
      }
    },
    components: {
      vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve),
      vChanges: resolve => require(['.././exchange/exchange'], resolve),
      vueSeamless
    },
    beforeCreate() {
    },
    created() {
      this._getLottoRewardDetail() // 连环吃饼游戏主页面
      this.isActive()
      this.duration() // 计时器
      this.timers = setInterval(() => {
        this._getLottoRewardDetail()
      }, 5000)
    },
    mounted() {
    },
    beforeDestroy() {
      clearInterval(this.timers) // 清除轮循的定时器
      clearTimeout(this.timer) // 清除已开始的计时器
    },
    methods: {
      getNewPlayerList(page) {
        this.$http.post(`${this.$api}/lottoReward/getNewPlayerList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.roundId}`).then((res) => {
          if (res.data.success) {
            let dataList = res.data.data.list
            // let totalPage = res.data.data.totalPage
            let obj = []
            dataList.forEach((item) => {
              obj.push(this.$t('eatGameHome.text58') + ' ' + item.userName + this.$t('eatGameHome.text59') + ' ' + item.playAmount.toFixed(4) + item.playCurrency)
            })
            this.listData = obj
          }
        })
      },
      aaa() {
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
      toAllPool() { // 查看所有获奖用户
        this.$router.push({path: '/toAllPool', query: {roundId: this.roundId}})
      },
      backTop() {
        // document.documentElement.scrollTop = 0
        // document.body.scrollTop = 0
        var timer = setInterval(function () {
          // 获取滚动条距离顶部高度
          var osTop = document.documentElement.scrollTop || document.body.scrollTop
          var ispeed = Math.floor(-osTop / 10)

          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          // 到达顶部，清除定时器
          if (osTop === 0) {
            clearInterval(timer)
          }
        }, 30)
      },
      changeStatus(num) { // 筛选收入和支出
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
      // getData () {
      //   if (this.isIncomeChange === false && this.isSpendChange === false) {
      //     this.bonusLogList = this.allList
      //   } else if (this.isIncomeChange === false && this.isSpendChange === true) {
      //     this.bonusLogList = this.incomeList
      //   } else if (this.isIncomeChange === true && this.isSpendChange === false) {
      //     this.bonusLogList = this.spendList
      //   }
      // },
      goAnchor(selector) { // 跳转到相应的锚点
        let anchor = this.$el.querySelector(selector)
        document.documentElement.scrollTop = anchor.offsetTop
        document.body.scrollTop = anchor.offsetTop
      },
      openDialog() { // 开启交易奖励规则弹窗
        this.isDialog = true
        this.tradingRules = true // 交易规则
        this.promoteRules = false // 推广规则
      },
      readAll() {
        this.isDialog = true
        this.tradingRules = false // 交易规则
        this.promoteRules = true // 推广规则
      },
      closeIsDialog() { // 关闭交易奖励规则弹窗
        this.isDialog = false
      },
      numToTransText(num) { // 后端返回的数字转换为对应的文字
        if (num === 1) {
          return this.$t('serialEat.text26')
        } else if (num === 2) {
          this.isRed = true
          return this.$t('serialEat.text27')
        }
      },
      isActive(num) { // 判断活动的状态 0已结束/1已开始
        if (num === 0) {
          return this.$t('serialEat.text28')
        } else {
          return this.$t('serialEat.text29')
        }
      },
      parentTurnPage(page) { // 页码
        this.currentPage = page
        if (this.isIncomeChange === false && this.isSpendChange === false) {
          this._getBonusLogList(page)
        } else if (this.isIncomeChange === false && this.isSpendChange === true) {
          this._getIncomeList(page)
        } else if (this.isIncomeChange === true && this.isSpendChange === false) {
          this._getSpendList(page)
        }
      },
      commonChangeTime(TimeStamp) { // 将时间戳分割成时分秒
        //  console.log(TimeStamp)
        if (TimeStamp <= 0) {
          this.randomHour = '00'
          this.randomMin = '00'
          this.randomSce = '00'
        } else {
          let hour = parseInt(TimeStamp / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
          let min = parseInt(TimeStamp / 1000 / 60 % 60, 10) // 计算剩余的分钟
          let sce = parseInt(TimeStamp / 1000 % 60, 10) // 计算剩余的秒数
          this.randomHour = this.checkTime(hour)
          this.randomMin = this.checkTime(min)
          this.randomSce = this.checkTime(sce)
        }
      },
      count() { // 倒计时
        let nowTime = this.nowDate // 获取当前时间戳
        if (this.endAt - nowTime >= 0) {
          this.timer = setTimeout(() => {
            this.restTime = this.endAt - nowTime
            this.restTime--
            this.count()
          }, 1000)
          this.commonChangeTime(this.restTime)
        } else {
          this.randomHour = '00'
          this.randomMin = '00'
          this.randomSce = '00'
          clearTimeout(this.timer)
        }
      },
      commonChangeTime1(TimeStamp) { // 将时间戳分割成时分秒
        //  console.log(TimeStamp)
        if (TimeStamp <= 0) {
          this.timingHour = '00'
          this.timingMin = '00'
          this.timingSce = '00'
        } else {
          let days = parseInt(TimeStamp / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
          let hour = parseInt(TimeStamp / 1000 / 60 / 60 % 24, 10) + days * 24 // 计算剩余的小时
          let min = parseInt(TimeStamp / 1000 / 60 % 60, 10) // 计算剩余的分钟
          let sce = parseInt(TimeStamp / 1000 % 60, 10) // 计算剩余的秒数
          this.timingHour = this.checkTime(hour)
          this.timingMin = this.checkTime(min)
          this.timingSce = this.checkTime(sce)
        }
      },
      timing() {
        let nowTime = this.nowDate // 获取当前时间戳
        if (nowTime - this.startAtTiming >= 0) {
          this.timer = setTimeout(() => {
            this.restTiming = nowTime - this.startAtTiming
            this.restTiming++
            this.timing()
          }, 1000)
          this.commonChangeTime1(this.restTiming)
        } else {
          this.timingHour = '00'
          this.timingMin = '00'
          this.timingSce = '00'
          clearTimeout(this.timer)
        }
      },
      countDown() { // 倒计时
        if (this.startAt > 0) {
          let rest = this.nowDate - this.startAt
          let days = parseInt(rest / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
          let hours = parseInt(rest / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
          let minutes = parseInt(rest / 1000 / 60 % 60, 10) // 计算剩余的分钟
          // let seconds = parseInt(leftTime / 1000 % 60, 10) // 计算已经开始的秒数
          this.day = this.checkTime(days) // 已经开始的天数
          this.hour = this.checkTime(hours) // 已经开始的小时
          this.min = this.checkTime(minutes) // 已经开始的分钟
          this.timer = setTimeout(() => this.countDown(), 1000)
        }
      },
      checkTime(i) {
        if (i < 10) {
          i = '0' + i
        }
        return i
      },
      duration() {
        if (this.startAt > 0) {
          let leftTime = (this.nowDate - this.startAt) // 计算已经开始的毫秒数
          if (this.bonusSum === 0) {
            this.day = parseInt(Date.parse(new Date()) / 1000 / 60 / 60 / 24, 10) // 结束的天数
            this.hour = parseInt(Date.parse(new Date()) / 1000 / 60 / 60 % 24, 10) // 结束的小时
            this.min = parseInt(Date.parse(new Date()) / 1000 / 60 % 60, 10) // 结束的小时
            clearTimeout(this.timer)
          } else {
            let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算已经开始的天数
            let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算已经开始的小时
            let minutes = parseInt(leftTime / 1000 / 60 % 60, 10) // 计算已经开始的分钟
            // let seconds = parseInt(leftTime / 1000 % 60, 10) // 计算已经开始的秒数
            this.day = this.checkTime(days) // 已经开始的天数
            this.hour = this.checkTime(hours) // 已经开始的小时
            this.min = this.checkTime(minutes) // 已经开始的分钟
            // this.sec = this.checkTime(seconds) // 已经开始的秒数
            // console.log(days, hours, minutes, seconds)
          }
        }
        this.timer = setTimeout(() => this.duration(), 1000)
      },
      toExchange() {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      },
      toPastRecord() {
        this.$router.push('/pastRecord')
      },
      _getLottoRewardDetail() {
        this.$http.post(`${this.$api}/lottoReward/lottoRewardDetail`).then((res) => {
          if (res.data.success === true) {
            let rewardRound = res.data.data.rewardRound // rewardRound活动内容对象   // && rewardRound.bonusPoolSum >= 1200000
            /* if (rewardRound.bonusPool <= 1000000 && rewardRound.bonusPoolSum >= 1200000) {
               this.futureBonusShow = 1
            } else {
              this.futureBonusShow = 0
            } */
            if (rewardRound.bonusPool <= 1000000) {
              this.futureBonusShow = 1
            } else {
              this.futureBonusShow = 0
            }
            this.roundName = rewardRound.roundName
            this.roundId = rewardRound.id
            this.startAt = rewardRound.startAt
            this.nowDate = res.data.data.nowDate
            this.getNewPlayerList(1)
            // console.log(res.data.data.hourJob !== '' && res.data.data.hourJob)
            if (res.data.data.hourJob !== '' && res.data.data.hourJob && res.data.data.hourJobUser !== '' && res.data.data.hourJobUser) {
              this.hourJobShow = true
              this.endAt = res.data.data.hourJob.endAt
              this.startAtTiming = res.data.data.hourJob.startAt
              this.rewardPre = res.data.data.hourJob.rewardPre
              this.lastJobUser = res.data.data.lastJobUser.userName
              this.count()
              this.timing()
            } else {
              this.hourJobShow = false
            }
            if (res.data.data.hourJobUser !== '' && res.data.data.hourJobUser) {
              let hourJobUser = res.data.data.hourJobUser
              this.hourJobUserName = hourJobUser.userName
              this.hourJobUserAvatar = hourJobUser.headImage
            }
            // console.log(this.endAt)
            if (rewardRound.bonusPool === 0) {
              this.active = 0
            } else {
              this.active = 1
            }
            this.bonusPool = rewardRound.bonusPool
            var bonusPool
            if (rewardRound.bonusPool === 0) {
              bonusPool = 0.0000
            } else {
              bonusPool = rewardRound.bonusPool.toFixed(4)
            }
            if (this.flag === true || this.currentValue !== rewardRound.bonusPool) { // 连续吃饼主页面需要不断轮循环，但分红收支明细需要在奖金池变化之后再轮循环以保证分红明细变化后页码自动回到1
              this.flag = false
              this.currentValue = rewardRound.bonusPool
              this.isLunXun = true
            }
            this.rewardPool = rewardRound.rewardPool
            if (bonusPool > 0) {
              this.bonusPoolArr = bonusPool.split('.')
            }
            let rewardPool = rewardRound.rewardPool.toFixed(4)
            this.rewardPoolArr = rewardPool.split('.')
            if (res.data.data.bonusSum) { // 如果用户登陆未登录分红奖励为0
              this.bonusSum = res.data.data.bonusSum
            } else {
              this.bonusSum = 0
            }
            this.awardSum = res.data.data.awardSum.toFixed(4)
            this.bonusSum = this.bonusSum.toFixed(4)
            this.bonusSumArr = this.bonusSum.split('.')
            this.myNewIndex = res.data.data.myNewIndex
            let lastPlayer = rewardRound.endRewardPlayer // 最终获奖内容对象
            this.playerIndex = lastPlayer.playerIndex
            this.userName = lastPlayer.userName
            this.playAmount = lastPlayer.playAmount
            let firstPlayer = rewardRound.lastPlayer // 首位获奖内容对象
            this.firstUserName = firstPlayer.userName
            this.firstPlayAmount = firstPlayer.playAmount
            this.firstPlayerIndex = firstPlayer.playerIndex
            this.firstPlayAvatar = firstPlayer.headImage
            // console.log(this.firstPlayAvatar)
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
      _getBonusLogList(page) {
        this.$http.post(`${this.$api}/lottoReward/getBonusLogList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.roundId}&type=0&queryDate=${this.value1}&queryEndDate=${this.value2}`).then((res) => {
          if (res.data.success === true) {
            this.bonusLogList = res.data.data.bonusLogList // 获取分红池收支明细列表对象
            this.totalPage = res.data.data.totalPage
          }
        })
      },
      _getIncomeList(page) {
        this.$http.post(`${this.$api}/lottoReward/getBonusLogList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.roundId}&type=1&queryDate=${this.value1}&queryEndDate=${this.value2}`).then((res) => {
          if (res.data.success === true) {
            this.bonusLogList = res.data.data.bonusLogList // 获取分红池收支明细列表对象
            this.totalPage = res.data.data.totalPage
          }
        })
      },
      _getSpendList(page) {
        this.$http.post(`${this.$api}/lottoReward/getBonusLogList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.roundId}&type=2&queryDate=${this.value1}&queryEndDate=${this.value2}`).then((res) => {
          if (res.data.success === true) {
            this.bonusLogList = res.data.data.bonusLogList // 获取分红池收支明细列表对象
            this.totalPage = res.data.data.totalPage
          }
        })
      }
    }
  }
</script>
