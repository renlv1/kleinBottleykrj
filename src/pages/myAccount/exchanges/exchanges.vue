<template>
  <div class="exchanges">
    <div class="pc">
      <table class="commonTableList">
        <thead>
        <h6>{{$t('exchanges.text1')}}</h6>
        </thead>
      </table>
      <div class="filter">
        <div class="currency filterBox">
          <div class="left">{{$t('newAdd.text5')}}</div>
          <div class="right" @click="dropDownToggle(1)">
            <p>{{curCurrency.text}}<i :class="{'close': toggle1}"></i></p>
            <ul :style="{'height': ulHeight1 + 'px'}">
              <li v-for="(item, index) in currencyList" :key="index" @click="selectOption(1, item)">{{item.text}}</li>
            </ul>
          </div>
        </div>
        <div class="currency filterBox">
          <div class="left">{{$t('exchanges.text2')}}</div>
          <div class="right" @click="dropDownToggle(2)">
            <p>{{curPrice.text}}<i :class="{'close': toggle2}"></i></p>
            <ul :style="{'height': ulHeight2 + 'px'}">
              <li v-for="(item, index) in priceOption" :key="index" @click="selectOption(2, item)">{{item.text}}</li>
            </ul>
          </div>
        </div>
        <div class="currency filterBox">
          <div class="left">{{$t('exchanges.text2')}}</div>
          <div class="right" @click="dropDownToggle(3)">
            <p>{{curExchanges.text}}<i :class="{'close': toggle3}"></i></p>
            <ul :style="{'height': ulHeight3 + 'px'}">
              <li v-for="(item, index) in exchangesOption" :key="index" @click="selectOption(3, item)">{{item.text}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <table class="commonTableList">
        <thead>
        <tr>
          <td>{{$t('exchanges.text3')}}</td>
          <td>{{$t('exchanges.text4')}}</td>
          <td>{{$t('exchanges.text5')}}</td>
          <td>{{$t('exchanges.text6')}}</td>
          <td>{{$t('exchanges.text7')}}</td>
          <td>{{$t('exchanges.text8')}}</td>
        </tr>
        </thead>
        <tbody>
        <tr @click="toDetail(item)" v-for="(item, index) in list" :key="index">
          <td>{{item.id}}</td>
          <td>{{parseType(item.etype)}}</td>
          <td>{{item.price.toFixed(8)}}</td>
          <td>{{item.cashAmount.toFixed(8)}}</td>
          <td>{{parseState(item.state)}}</td>
          <td style="color: #FC534C; cursor: pointer">{{$t('exchanges.text9')}}</td>
        </tr>
        </tbody>
        <div class='error' v-show="list.length === 0">
          {{$t('orderManage.text8')}}
        </div>
        <v-turnPage class="turnPage" :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"
                    ref="turnPage1"></v-turnPage>
      </table>
    </div>
    <div class="app">
      <div class="mobile-myAccount">
        <div class="myAccountHead">
          <div class="Head-padding">
            <div class="left" @click="$router.push('/account/myAccount')"></div>
            <div class="center">{{$t('exchanges.text10')}}</div>
            <div class="right"></div>
          </div>
        </div>
        <div class="myAccountBody">
          <div class="tab">
            <ul>
              <li @click="dropDownToggle(1)">
                <p><span>{{curCurrency.text}}</span><i></i></p>
                <ul :style="{'height': ulHeight1 + 'px'}">
                  <li v-for="(item, index) in currencyList" :key="index" @click="selectOption(1, item)"
                      :class="{'active': item.tag === curCurrency.tag}">{{item.text}}
                  </li>
                </ul>
              </li>
              <li @click="dropDownToggle(2)">
                <p><span>{{curPrice.text}}</span><i></i></p>
                <ul :style="{'height': ulHeight2 + 'px'}">
                  <li v-for="(item, index) in priceOption" :key="index" @click="selectOption(2, item)"
                      :class="{'active': item.tag === curPrice.tag}">{{item.text}}
                  </li>
                </ul>
              </li>
              <li @click="dropDownToggle(3)">
                <p><span>{{curExchanges.text}}</span><i></i></p>
                <ul :style="{'height': ulHeight3 + 'px'}">
                  <li v-for="(item, index) in exchangesOption" :key="index" @click="selectOption(3, item)"
                      :class="{'active': item.tag === curExchanges.tag}">{{item.text}}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="content">
            <ul>
              <!-- -->
              <li v-for="(item, index) in list" :key="index" @click="toDetail(item)">
                <p><span>{{$t('exchanges.text11')}}：{{item.id}}</span><i>{{$changeDate(item.createAt, '/')}}</i></p>
                <p><span>{{parseType(item.etype)}}{{$t('exchanges.text12')}}：{{item.price.toFixed(8)}} USD</span><span>{{parseState(item.state)}}</span></p>
              </li>
            </ul>
            <div class='error' v-show="list.length === 0">
              {{$t('orderManage.text8')}}
            </div>
            <v-turnPage class="turnPage" :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"
                        ref="turnPage"></v-turnPage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cur: '',
        noData: false,
        toggle1: false,
        toggle2: false,
        toggle3: false,
        ulHeight1: 0,
        ulHeight2: 0,
        ulHeight3: 0,
        currencyList: [ // '全部币种', 'SIE', 'ETH', 'BTC',
          {
            text: this.$t('newAdd.text7'),
            tag: 0
          },
          {
            text: 'SIE',
            tag: 1
          },
          {
            text: 'ETH',
            tag: 2
          },
          {
            text: 'BTC',
            tag: 3
          }
        ],
        curCurrency: {
          text: this.$t('newAdd.text7'),
          tag: 0
        },
        priceOption: [ // '限价', '市价'
          {
            text: this.$t('exchange.text36'),
            tag: 2
          },
          {
            text: this.$t('exchange.text37'),
            tag: 1
          }
        ],
        curPrice: {
          text: this.$t('exchange.text36'),
          tag: 2
        },
        exchangesOption: [ // '买入', '卖出'
          {
            text: this.$t('exchange.text12'),
            tag: 1
          },
          {
            text: this.$t('exchange.text21'),
            tag: 2
          }
        ],
        curExchanges: {
          text: this.$t('exchange.text12'),
          tag: 1
        },
        pageSize: 10,
        totalPage: 0,
        list: []
      }
    },
    mounted() {
      this.getRecordList(1)
    },
    components: {
      vTurnPage: resolve => require(['../../../components/turnPage.vue'], resolve)
    },
    methods: {
      // 交易状态
      tradeStatus(type) {
        if (type === 1 || type === 3) {
          return this.$t('usdOrder.text39')
        } else if (type === 2 || type === 4) {
          return this.$t('usdOrder.text40')
        } else if (type === 5 || type === 6) {
          return this.$t('usdOrder.text41')
        }
      },
      parseType(type) {
        if (type === 1) {
          return this.$t('exchange.text12')
        } else if (type === 2) {
          return this.$t('exchange.text21')
        } else {
          return '--'
        }
      },
      toDetail (item) {
        if (item.etype === 1) { // 买
          this.cur = item.buyCurrency
        } else if (item.etype === 2) { // 卖
          this.cur = item.sellCurrency
        }
        this.$router.push({
          path: '/account/exchanges/exchangeDetail',
          query: {
            obj: JSON.stringify({
              id: item.id,
              currency: this.cur,
              cashAmount: item.cashAmount,
              tradeCashAmount: item.tradeCashAmount,
              createAt: item.createAt,
              etype: item.etype,
              state: item.state,
              price: item.price,
              tradeAmount: item.tradeAmount,
              amount: item.amount,
              actNo: item.actNo,
              tradeFee: item.tradeFee
            })
          }
        })
      },
      // -1删除 1:创建订单 2: 完全成交 3:部分成交 4:部分成交,撤单完成 5:撤单 6:系统异常
      parseState(state) {
        switch (state) {
          case 1:
            return this.$t('exchanges.text22')
          case 2:
            return this.$t('exchanges.text23')
          case 3:
            return this.$t('exchanges.text22')
          case 4:
            return this.$t('exchanges.text24')
          case 5:
            return this.$t('exchanges.text24')
          case 6:
            return this.$t('exchanges.text18')
          case 888: // 888（已退款）
            return this.$t('sieTransfer.text21')
          case -1:
            return this.$t('exchanges.text19')
          default :
            return ''
        }
      },
      dropDownToggle(n) {
        if (n === 1) {
          this.toggle1 = !this.toggle1
          if (!this.toggle1) {
            this.ulHeight1 = 0
          } else {
            this.ulHeight1 = this.currencyList.length * 44
          }
        } else if (n === 2) {
          this.toggle2 = !this.toggle2
          if (!this.toggle2) {
            this.ulHeight2 = 0
          } else {
            this.ulHeight2 = this.priceOption.length * 44
          }
        } else if (n === 3) {
          this.toggle3 = !this.toggle3
          if (!this.toggle3) {
            this.ulHeight3 = 0
          } else {
            this.ulHeight3 = this.exchangesOption.length * 44
          }
        }
      },
      // 获取交易所订单
      getRecordList(page) {
        let url = `${this.$api}/newCoinentrustRecord/getRecord2?pageSize=${this.pageSize}&pageNo=${page}&currencyType=${this.curCurrency.tag}&priceType=${this.curPrice.tag}&etype=${this.curExchanges.tag}`
        this.$http.post(url).then(res => {
          if (res.data.success) {
            this.list = res.data.data.results
            this.totalPage = res.data.data.totalPage
          }
        }).catch(err => {
          console.log(err)
        })
        if (this.$refs.turnPage1) {
          this.$refs.turnPage1.resetPage(page)
        }
        if (this.$refs.turnPage) {
          this.$refs.turnPage.resetPage(page)
        }
      },
      parentTurnPage(page) { // 翻页
        this.currentPage = page
        this.getRecordList(page)
      },
      selectOption(n, item) {
        if (n === 1) {
          this.curCurrency = item
        } else if (n === 2) {
          this.curPrice = item
        } else if (n === 3) {
          this.curExchanges = item
        }
        this.getRecordList(1)
      }
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  .pc {
    display: block;
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

  .app {
    display: none;
    @media screen and (max-width: 1024px) {
      display: block;
    }
  }
  .Head-padding{
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }
  .exchanges {
    h3 {
      margin: 130px 0 40px 80px;
      color: #181818;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .filter {
    display: flex;
    // flex-wrap: wrap;
    margin: 68px 0 40px 0px;
    max-width: 1128px;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    margin-left: 60px;
    .filterBox {
      height: 54px;
      display: flex;
      flex-direction: row;
      /*margin-right: 40px;*/
      &:first-child{
        .right
          p{
          margin-left: 15px;
        }
      }
      &:nth-child(2){
        .right
        p{
          margin-left: 30px;
        }
      }
      .left {
        width: 40%;
        height: 54px;
        background: #FC534C;
        color: #fff;
        text-align: center;
        line-height: 54px;
      }
      .right {
        width: 60%;
        height: 54px;
        color: #fff;
        display: flex;
        border: 1px solid #FC534C;
        position: relative;
        justify-content: center;
        cursor: pointer;
        align-items: center;
        p {
          color: #FC534C;
          font-size: 16px;
          width: 180px;
          height: 52px;
          line-height: 52px;
          margin-left: 43px;
          i {
            position: absolute;
            right: 20px;
            top: 50%;
            display: block;
            width: 10px;
            height: 10px;
            border-bottom: 2px solid #FC534C;
            border-left: 2px solid #FC534C;
            transition: all 0.5s;
            transform: translate(0, -50%) rotate(-45deg);
            background: transparent;
            &.close {
              transform: translate(0, -50%) rotate(-225deg);
            }
          }
        }
        ul {
          position: absolute;
          width: 100%;
          top: 53px;
          left: 0;
          box-shadow: 0 3px 15px #d9d9d9;
          z-index: 99;
          overflow: hidden;
          transition: all 0.5s;
          background: #fff;
          li {
            width: 100%;
            height: 44px;
            color: #181818;
            font-size: 18px;
            text-align: center;
            line-height: 44px;
            &:hover {
              background: rgba(252, 83, 76, 0.4);
              color: #fff;
            }
            &:active {
              opacity: 0.6;
            }
          }
        }
      }
    }
  }

  .myAccountHead {
    border-bottom: 1px dashed #ccc;
    background: #fff;
    z-index: 1;
  }

  .myAccountBody {
    margin-top: 80px;
    background-color: #fff;
  }

  .tab {
    width: 100%;
    height: 45px;
    margin-bottom: 30px;
    & > ul {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      & > li {
        flex: .5;
        height: 44px;
        border: 1px solid #163a4c;
        position: relative;
        p {
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
          i {
            display: block;
            height: 8px;
            width: 8px;
            margin-left: 5px;
            margin-bottom: 5px;
            background-color: transparent;
            border-right: 2px solid #163a4c;
            border-bottom: 2px solid #163a4c;
            transition: all 0.5s;
            transform: rotate(45deg);
          }
          span {
            color: #163a4c;
            font-size: 16px;
            @media screen and (max-width: 321px){
              font-size: 14px;
            }
          }
        }
        ul {
          position: absolute;
          top: 44px;
          left: 0;
          width: 100%;
          overflow: hidden;
          transition: all 0.5s;
          box-shadow: 0px 5px 15px rgba(196, 205, 214, 0.8);
          background-color: #fff;
          li {
            line-height: 44px;
            height: 44px;
            width: 100%;
            text-align: center;
            color: #1a1a1a;
            border-bottom: 1px dashed #163a4c;
            &:last-child{
              border-bottom: none;
            }
            &.active {
              color: #163a4c;
            }
          }
        }
      }
    }
  }

  .turnPage {
    margin-top: 30px;
  }

  .content {
    ul {
      li {
        height: 50px;
        padding: 7px 20px;
        &:nth-child(odd) {
          background-color: #edeff1;
        }
        &:nth-child(even) {
          background-color: #fafafa;
        }
        p {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          line-height: 20px;
          span {
            color: #181818;
          }
          i {
            color: #999999;
          }
        }
      }
    }
  }
</style>
