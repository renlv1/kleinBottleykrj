<template>
  <div class="rewardDetail">
    <div class="pc">
      <div class="rewradDetailBox">
        <h6>{{$t('myAccountNav.text12')}}{{detailData.rewardRound.roundName}}{{$t('myAccountNav.text13')}}</h6>
        <table>
          <tr class="head">
            <td>{{$t('reward.text5')}}</td>
            <td>{{$t('reward.text6')}}</td>
            <td>{{$t('reward.text7')}}</td>
            <td>{{$t('reward.text8')}}</td>
            <td>{{$t('reward.text9')}}</td>
          </tr>
          <tr class="body">
            <td>{{detailData.roundSumRefReward | formattingMoney}} SIE</td>
            <td>{{detailData.roundSumTopRefReward | formattingMoney}} SIE</td>
            <td>{{detailData.roundSumLoopReward | formattingMoney}} SIE</td>
            <td>{{detailData.roundSumLastBuyReward | formattingMoney}} SIE</td>
            <td>{{detailData.roundSumAllReward | formattingMoney}} SIE</td>
          </tr>
        </table>
        <div class="rewardTabBox">
          <div class="rewardTab">
            <ul>
              <li v-for="(item,index) in tabList" :key="index" :class="{'active': curTab === index}" @click="changeTab(index)">{{item.name}}</li>
            </ul>
          </div>
          <div class="rewardItem" >
            <div class="generalize" v-if="curTab === 1">
              <ul>
                <li><span>{{$t('reward.text10')}}</span><i>{{detailData.topRefReward.refAmount | formattingMoney}} SIE</i></li>
                <li><span>{{$t('reward.text11')}}</span><i>{{detailData.topRefReward.rewardAmount | formattingMoney}} SIE</i></li>
                <li><span>{{$t('reward.text12')}}</span><i>{{detailData.topRefReward.remark?detailData.topRefReward.remark:0}}</i></li>
              </ul>
            </div>
            <div class="team" v-if="curTab === 2">
              <div class="team-li"><span>{{$t('reward.text13')}}</span><i>{{detailData.refRecordCount}}</i></div>
            </div>
            <div class="rank" v-if="curTab === 3">
              <h6>{{$t('reward.text14')}}</h6>
              <table>
                <thead>
                <tr>
                  <td>{{$t('reward.text14')}}</td>
                  <td>{{$t('reward.text15')}}</td>
                  <td>{{$t('reward.text16')}}</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in rewardPlayer" :key="index">
                  <td>{{item.playerIndex}}</td>
                  <td>{{item.rewardCount}}</td>
                  <td class="money">{{item.rewardSum | formattingMoney}} SIE</td>
                </tr>
                </tbody>
              </table>
              <v-turnPage :propsPage="totalPage1" @orderLogTrunPage="parentTurnPage1"></v-turnPage>
            </div>
            <div class="itemBox" v-for="(item, index) in rewardItem" :key="index" v-if="curTab === index">
              <h6>{{item.title}}</h6>
              <table>
                <thead>
                <tr>
                  <td>{{item.title1}}</td>
                  <td>{{item.title2}}</td>
                  <td>{{item.title3}}</td>
                  <td v-if="item.title4">{{item.title4}}</td>
                </tr>
                </thead>
                <tbody v-if="curTab === 0">
                <tr v-for="(item, index) in recordList" :key="index">
                  <td>{{item.myIndex}}</td>
                  <td>{{$changeDate(item.createAt)}}</td>
                  <td>{{item.rewardAmount | formattingMoney}} SIE</td>
                  <td>{{item.refAmount | formattingMoney}} SIE</td>
                </tr>
                <v-turnPage :propsPage="totalPage3" @orderLogTrunPage="parentTurnPage3"></v-turnPage>
                </tbody>
                <tbody v-if="curTab === 1">
                <tr  v-for="(item, index) in rewardPlayerList" :key="index">
                  <td>{{item.userName}}</td>
                  <td class="time">{{$changeDate(item.createAt, '-')}}</td>
                  <td>{{item.rewardCount | formattingMoney}} SIE</td>
                </tr>
                <v-turnPage :propsPage="totalPage4" @orderLogTrunPage="parentTurnPage4"></v-turnPage>
                </tbody >
                <tbody v-if="curTab === 2">
                <tr  v-for="(item, index) in recordList" :key="index">
                  <td>{{item.id}}</td>
                  <td>{{item.sourceName}}</td>
                  <td class="time">{{$changeDate(item.updateAt, '-')}}</td>
                  <td>{{item.rewardAmount | formattingMoney}} SIE</td>
                </tr>
                <v-turnPage :propsPage="totalPage5" @orderLogTrunPage="parentTurnPage5"></v-turnPage>
                </tbody >
                <tbody v-if="curTab === 3">
                <tr v-for="(item, index2) in loopRecordList" :key="index2">
                  <td>{{item.myIndex}}</td>
                  <td>{{item.rewardAmount | formattingMoney}} SIE</td>
                  <td>{{$changeDate(item.createAt)}}</td>
                  <td class="money">{{item.rewardLoop}}</td>
                </tr>
                <v-turnPage :propsPage="totalPage2" @orderLogTrunPage="parentTurnPage2"></v-turnPage>
                </tbody >

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="mobile-myAccount">
        <div class="myAccountHead up-box">
          <div class="Head-padding">
            <div class="left" @click="$router.push('/account/eatReward')"></div>
            <div class="center">{{$t('myAccountNav.text12')}}{{detailData.rewardRound.roundName}}{{$t('myAccountNav.text13')}}</div>
            <div class="right"></div>
          </div>
        </div>
        <div style="margin-top: 50px">
          <div class="tab">
            <ul>
              <li v-for="(item, index) in tabList" :key="index" :class="{'active':curTab === index}" @click="changeTab(index)">{{item.name}}</li>
            </ul>
          </div>
          <div class="reward">
            <div class="eatReward" v-if="curTab === 0">
              <h6><span>{{$t('reward.text18')}}</span><span>{{detailData.roundSumLastBuyReward | formattingMoney}} SIE</span></h6>
              <ul v-for="(item, index) in recordList" :key="index">
                <li><span>{{$t('reward.text19')}}</span><span>{{item.myIndex}}</span></li>
                <li><span>{{$t('reward.text20')}}</span><span>{{$changeDate(item.createAt)}}</span></li>
                <li><span>{{$t('reward.text21')}}</span><span>{{item.rewardAmount | formattingMoney}} SIE</span></li>
                <li><span>{{$t('reward.text22')}}</span><span>{{item.refAmount | formattingMoney}} SIE</span></li>
              </ul>
              <v-turnPage :propsPage="totalPage3" @orderLogTrunPage="parentTurnPage3"></v-turnPage>
            </div>
            <div class="tuiguang" v-if="curTab === 1">
              <ul class="tuiguang-top">
                <li><span>{{$t('reward.text6')}}</span><span></span></li>
                <li><span>{{$t('reward.text10')}}</span><span>{{detailData.topRefReward.refAmount | formattingMoney}} SIE</span></li>
                <li><span>{{$t('reward.text11')}}</span><span>{{detailData.topRefReward.rewardAmount | formattingMoney}} SIE</span></li>
                <li><span>{{$t('reward.text12')}}</span><span>{{detailData.topRefReward.remark?detailData.topRefReward.remark:0}}</span></li>
              </ul>
              <div class="tuiguang-buttom">
                <h6>{{$t('reward.text22')}}</h6>
                <ul v-for="(item, index) in rewardPlayerList" :key="index">
                  <li>
                    <p><span>{{item.userName}}</span><i>{{$changeDate(item.createAt, '-')}}</i></p>
                    <span>{{$t('reward.text23')}}：{{item.rewardCount | formattingMoney}} SIE</span>
                  </li>
                </ul>
                <v-turnPage :propsPage="totalPage4" @orderLogTrunPage="parentTurnPage4"></v-turnPage>
              </div>
            </div>
            <div class="team" v-if="curTab === 2">
              <div class="team-top">
                <h6><span>{{$t('reward.text5')}}</span><span>{{detailData.roundSumRefReward | formattingMoney}} SIE</span></h6>
                <p><span>{{$t('reward.text13')}}</span><span>{{detailData.refRecordCount}}</span></p>
              </div>
              <div class="team-bottom">
                <h6>{{$t('reward.text24')}}</h6>
                <ul v-for="(item, index) in recordList" :key="index">
                  <li>
                    <p><span>{{$t('reward.text25')}}：{{item.id}}</span><i>{{$changeDate(item.updateAt, '-')}}</i></p>
                    <p><span>{{item.sourceName}}</span><i>{{item.rewardAmount | formattingMoney}} SIE</i></p>
                  </li>
                </ul>
                <v-turnPage :propsPage="totalPage5" @orderLogTrunPage="parentTurnPage5"></v-turnPage>
              </div>
            </div>
            <div class="rank" v-if="curTab === 3">
              <div class="rank-top">
                <h6><span>{{$t('reward.text26')}}</span><span>5000 SIE</span></h6>
                <table>
                  <tr>
                    <td>{{$t('reward.text26')}}</td>
                    <td>{{$t('reward.text15')}}</td>
                    <td>{{$t('reward.text16')}}</td>
                  </tr>
                  <tr class="tbody" v-for="(item, index) in rewardPlayer" :key="index">
                    <td>{{item.playerIndex}}</td>
                    <td>{{item.rewardCount}}</td>
                    <td>{{item.rewardSum | formattingMoney}} SIE</td>
                  </tr>
                </table>
                <v-turnPage :propsPage="totalPage1" @orderLogTrunPage="parentTurnPage1"></v-turnPage>
              </div>
              <div class="rank-bottom">
                <h6>{{$t('reward.text27')}}</h6>
                <ul>
                  <li v-for="(item, index2) in loopRecordList" :key="index2">
                    <p><span>{{$t('reward.text29')}}{{item.myIndex}}{{$t('reward.text30')}}：</span><i>{{$changeDate(item.createAt)}}</i></p>
                    <p><span>{{$t('reward.text28')}}{{item.rewardLoop}}</span><span>{{item.rewardAmount | formattingMoney}} SIE</span></p>
                  </li>
                </ul>
                <v-turnPage :propsPage="totalPage2" @orderLogTrunPage="parentTurnPage2"></v-turnPage>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      id: this.$route.query.id,
      roundId: this.$route.query.roundId,
      detailData: {
        rewardRound: {},
        lastBuyReward: {}, // 吃饼摘奖统计
        topRefReward: {}
      },
      rewardPlayerList: [], // 推荐用户列表
      tabList: [
        {name: this.$t('reward.text31')},
        {name: this.$t('reward.text32')},
        {name: this.$t('reward.text33')},
        {name: this.$t('reward.text34')}
      ],
      rewardItem: [
        {
          title: this.$t('reward.text35'),
          title1: this.$t('reward.text36'),
          title2: this.$t('reward.text37'),
          title3: this.$t('reward.text38'),
          title4: this.$t('reward.text39')
        },
        {
          title: this.$t('reward.text40'),
          title1: this.$t('reward.text41'),
          title2: this.$t('reward.text42'),
          title3: this.$t('reward.text43')
        },
        {
          title: this.$t('reward.text44'),
          title1: this.$t('reward.text45'),
          title2: this.$t('reward.text46'),
          title3: this.$t('reward.text48'),
          title4: this.$t('reward.text47')
        },
        {
          title: this.$t('reward.text49'),
          title1: this.$t('reward.text50'),
          title2: this.$t('reward.text51'),
          title3: this.$t('reward.text52'),
          title4: this.$t('reward.text53')
        }
      ],
      rewardList: [], // 明细列表
      curTab: 0,
      pageSize: 5,
      topRewardRecord: '',
      recordList: [],
      loopRecordList: [], // 排位循环奖励
      rewardPlayer: [], // 排位循环奖励
      totalPage1: 0, // 排位循环奖励总页数
      currentPage1: 1,
      totalPage2: 0,
      currentPage2: 1,
      totalPage3: 0,
      currentPage3: 1,
      totalPage4: 0,
      currentPage4: 1,
      totalPage5: 0,
      currentPage5: 1
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  },
  mounted () {
    this.getLastBuyRewardDetail(1)
    this.getUserRewardList(1, 2)
  },
  methods: {
    // 排位奖励
    parentTurnPage1 (page) { // 页码
      this.currentPage1 = page
      this.getMySortRewardList(page)
    },
    // 循环奖励
    parentTurnPage2 (page) { // 页码
      this.currentPage2 = page
      this.getUserLoopRewardDetail(page)
    },
    // 吃饼奖励
    parentTurnPage3 (page) { // 页码
      this.currentPage3 = page
      this.getUserRewardList(page, 2)
    },
    // 推广奖励
    parentTurnPage4 (page) { // 页码
      this.currentPage4 = page
      this.getLastBuyRewardDetail(page)
    },
    // 团队奖励
    parentTurnPage5 (page) { // 页码
      this.currentPage5 = page
      this.getUserRewardList(page, 1)
    },
    changeTab (index) {
      this.curTab = index
      this.recordList = []
      if (index === 0) {
        this.getUserRewardList(1, 2)
      } else if (index === 1) {
        this.getLastBuyRewardDetail(1)
      } else if (index === 2) {
        this.getUserRewardList(1, 1)
      } else if (index === 3) {
        this.getUserLoopRewardDetail(1)
        this.getMySortRewardList(1)
      }
    },
    // 排位循环奖励次数
    getUserLoopRewardDetail (page) {
      let url = `${this.$api}/danRobot/getUserLoopRewardDetail?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.roundId}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.loopRecordList = res.data.data.loopRecordList
          this.rewardRound = res.data.data.rewardRound
          this.totalPage2 = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 排位循环奖励
    getMySortRewardList (page) {
      let url = `${this.$api}/danRobot/mySortRewardList?pageIndex=${page}&pageSize=${this.pageSize}&roundId=${this.roundId}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.rewardPlayer = res.data.data.rewardPlayer
          this.totalPage1 = res.data.data.totalPage
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 1.3 用户奖励列表 团队(列表+详情) 推广 吃饼公用
    getUserRewardList (page, type) {
      let url = `${this.$api}/danRobot/getUserRewardList?roundId=${this.roundId}&pageSize=${this.pageSize}&pageIndex=${page}&type=${type}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.recordList = res.data.data.recordList
          if (type === 2) {
            this.totalPage3 = res.data.data.totalPage
          } else if (type === 1) {
            this.totalPage5 = res.data.data.totalPage
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 1.9 吃饼奖励详情
    getLastBuyRewardDetail (page) {
      let url = `${this.$api}/danRobot/lastBuyRewardDetailNew?roundId=${this.roundId}&pageIndex=${page}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          this.detailData = res.data.data
          if (res.data.data.rewardPlayer) {
            this.rewardPlayerList = res.data.data.rewardPlayer
            this.totalPage4 = res.data.data.totalPage
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@odd: #edeff1;
@even: #fbfbfb;
.pc{
  .rewradDetailBox{
    width: 1070px;
    padding: 0 60px ;
    @media screen and (max-width: 1350px) {
      width: 900px;
    }
    h6{
      background-color: @odd;
      height: 64px;
      font-size:20px;
      color: #181818;
      align-items: center;
      display: flex;
      &:before{
        content: '';
        width: 10px;
        height: 22px;
        display: inline-block;
        background-color: #000;
        margin-right: 28px;
      }
    }
    &>table{
      width: 100%;
      margin-top: 30px;
      display: block;
      tr{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        td{
          flex: 1;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size:18px;
          color: #181818;
          border: 1px solid #ccc;
          border-right: none;
          &:nth-child(5){
            border: 1px solid #ccc;
          }
        }
        &.head{
          td{
            border-bottom: none;
          }
        }
      }
    }
    .rewardTabBox{
      width: 100%;
      .rewardTab{
        width: 100%;
        border-bottom: 1px dashed #ccc;
        padding: 40px 0;
        margin-top: 60px;
        ul{
          display: flex;
          li{
            color: #181818;
            font-size: 16px;
            width: 218px;
            height: 58px;
            border-radius: 4px;
            background-color: #edeff1;
            text-align: center;
            line-height: 58px;
            cursor: pointer;
            margin-right: 30px;
            user-select: none;
            &.active{
              background-color: #fc534c;
              color: #fff;
            }
          }
        }
      }
      .rewardItem{
        .itemBox{
          margin: 50px 0;
          h6{
            background-color: @odd;
            height: 64px;
            font-size:20px;
            color: #181818;
            align-items: center;
            display: flex;
            &:before{
              content: '';
              width: 10px;
              height: 22px;
              display: inline-block;
              background-color: #000;
              margin-right: 28px;
            }
          }
          table{
            width: 100%;
            display: block;
            thead{
              display: block;
              width: 100%;
              tr{
                display: flex;
                justify-content: space-between;
                background-color: #FBFBFB;
                td{
                  flex: 1;
                  font-size: 16px;
                  color: #181818;
                  text-align: center;
                  height: 50px;
                  line-height: 50px;
                }
              }
            }
            tbody{
              display: block;
              width: 100%;
              tr{
                display: flex;
                justify-content: space-between;
                td{
                  flex: 1;
                  font-size: 16px;
                  color: #181818;
                  text-align: center;
                  height: 50px;
                  line-height: 50px;
                }
                &:nth-child(odd) {
                  background-color: #EDEFF1;
                }
                &:nth-child(even) {
                  background-color: #FBFBFB;
                }
              }
            }
          }
        }
        .generalize{
          padding: 50px 0;
          ul{
            li{
              display: flex;
              height: 58px;
              line-height: 50px;
              padding: 0 30px;
              span{
                display: block;
                flex: 1;
                text-align: left;
              }
              i{
                flex: 1;
                display: block;
                text-align: left;
              }
              &:nth-child(odd) {
                background-color: #EDEFF1;
              }
              &:nth-child(even) {
                background-color: #FBFBFB;
              }
            }
          }
        }
        .team{
          padding: 50px 0;
          .team-li{
            display: flex;
            height: 58px;
            line-height: 50px;
            padding: 0 30px;
            background-color: #EDEFF1;
            span{
              display: block;
              flex: 1;
              text-align: left;
            }
            i{
              flex: 1;
              display: block;
              text-align: left;
            }
          }
        }
        .rank{
          padding: 50px 0;
          h6{
            background-color: @odd;
            height: 64px;
            font-size:20px;
            color: #181818;
            align-items: center;
            display: flex;
            &:before{
              content: '';
              width: 10px;
              height: 22px;
              display: inline-block;
              background-color: #000;
              margin-right: 28px;
            }
          }
          table{
            width: 100%;
            display: block;
            thead{
              display: block;
              width: 100%;
              tr{
                display: flex;
                justify-content: space-between;
                background-color: #FBFBFB;
                td{
                  flex: 1;
                  font-size: 16px;
                  color: #181818;
                  text-align: center;
                  height: 50px;
                  line-height: 50px;
                }
              }
            }
            tbody{
              display: block;
              width: 100%;
              tr{
                display: flex;
                justify-content: space-between;
                td{
                  flex: 1;
                  font-size: 16px;
                  color: #181818;
                  text-align: center;
                  height: 50px;
                  line-height: 50px;
                }
                &:nth-child(odd) {
                  background-color: #EDEFF1;
                }
                &:nth-child(even) {
                  background-color: #FBFBFB;
                }
              }
            }
          }
        }
      }
    }
  }
}
.mobile{
  .tab{
    ul{
      display: flex;
      justify-content: space-around;
      li{
        width: 70px;
        font-size: 14px;
        color: #181818;
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
        text-align: center;
        border-bottom: 1px solid transparent;
        &.active{
          color: #fc534c;
          border-bottom: 1px solid #fc534c;
        }
      }
    }
  }
  .reward{
    padding: 0 20px;
    margin-top: 30px;
    .eatReward{
      h6{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #181818;
        height: 40px;
        padding: 0 5px;
      }
      ul{
        li{
          display: flex;
          height: 60px;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          span{
            font-size: 16px;
            color: #181818;
          }
          &:nth-child(odd) {
            background-color: #FBFBFB;
          }
          &:nth-child(even) {
            background-color: #EDEFF1;
          }
        }
      }
    }
    .tuiguang{
      .tuiguang-top{
        li{
          display: flex;
          height: 60px;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          span{
            font-size: 16px;
            color: #181818;
          }
          &:nth-child(odd) {
            background-color: #FBFBFB;
          }
          &:nth-child(even) {
            background-color: #EDEFF1;
          }
        }
      }
      .tuiguang-buttom{
        margin-top: 50px;
        h6{
          font-size: 16px;
          color: #181818;
          height: 40px;
          line-height: 40px;
        }
        li{
          height: 70px;
          padding: 0 20px;
          p{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          span{
            font-size: 16px;
            color: #181818;
            line-height: 35px;
          }
          i{
            color: #ccc;
            font-size: 16px;
          }
          &:nth-child(odd) {
            background-color: #EDEFF1;
          }
          &:nth-child(even) {
            background-color: #FBFBFB ;
          }
        }
      }
    }
    .team{
      .team-top{
        h6{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          color: #181818;
          height: 40px;
          padding: 0 5px;
        }
        p{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          color: #181818;
          padding: 0 20px;
          background-color: #EDEFF1;
          height: 60px;
        }
        span{
          font-size: 16px;
          color: #181818;
        }
      }
      .team-bottom{
        margin-top: 50px;
        h6{
          font-size: 16px;
          color: #181818;
          height: 40px;
          padding: 0 5px;
          line-height: 40px;
        }
        ul{
          li{
            height: 70px;
            padding: 0 20px;
            p{
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 16px;
              color: #181818;
              line-height: 35px;
            }
            span{
              font-size: 16px;
              color: #181818;
            }
            i{
              color: #ccc;
              font-size: 16px;
            }
            &:nth-child(odd) {
              background-color: #EDEFF1;
            }
            &:nth-child(even) {
              background-color: #FBFBFB;
            }
          }
        }
      }
    }
    .rank{
      h6{
        font-size: 16px;
        color: #181818;
        height: 40px;
        padding: 0 5px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
      }
      .rank-top{
        table{
          width: 100%;
          tr{
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            td{
              font-size: 16px;
              color: #181818;
              text-align: center;
            }
            &:nth-child(odd) {
              background-color: #EDEFF1 ;
            }
            &:nth-child(even) {
              background-color: #FBFBFB;
            }
            &.tbody{
              td{
                &:nth-child(1) {
                  text-align: left;
                }
                &:nth-child(2) {
                  text-align: center;
                }
                &:nth-child(3) {
                  text-align: right;
                }
              }
            }
          }

        }
      }
      .rank-bottom{
        margin-top: 50px;
        h6{
          font-size: 16px;
          color: #181818;
          height: 40px;
          padding: 0 5px;
          line-height: 40px;
        }
        ul{
          li{
            height: 70px;
            padding: 0 20px;
            p{
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 16px;
              color: #181818;
              line-height: 35px;
            }
            span{
              font-size: 16px;
              color: #181818;
            }
            i{
              color: #ccc;
              font-size: 16px;
            }
            &:nth-child(odd) {
              background-color: #EDEFF1;
            }
            &:nth-child(even) {
              background-color: #FBFBFB;
            }
          }
        }
      }
    }
  }
}
</style>
