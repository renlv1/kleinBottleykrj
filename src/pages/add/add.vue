<template>
  <div class="add">
    <div class="banner">
      <div class="linWrap">
        <div class="text">{{$t('home.text001')}}</div>
      </div>
    </div>
    <div class="linWrap">
      <div class="add-cont">
        <ul class="add-uls">
          <li v-for="(item, index) in addArr" :key="index" class="add-list" @click="$router.push({path: '/addDetails', query: {id: item.id}})">
            <div class="time" v-show="item.createTime">{{$changeDate(item.createTime, '/', 4)}}</div>
            <div class="add-desc">{{item.title}}</div>
          </li>
        </ul>
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></v-turnPage>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      addArr: [],
      totalPage: 0,
      currentPage: 1
    }
  },
  created () {
    this.getNoticeList2(1)
  },
  methods: {
    // 获取公告列表
    getNoticeList2 (page) {
      let baseUrl = 'https://api.kleingame.ai'
      let langadd = 1
      if (localStorage.getItem('kleinLang') === 'EN') {
        langadd = 2
      } else {
        langadd = 1
      }
      let url = `${baseUrl}/notice/noticeListNew?pageSize=10&pageIndex=${page}&terrace=5&language=${langadd}`
      this.$http.post(url).then((res) => {
        if (res.data.success === true) {
          this.isLoading = false // 加载动画
          let ndata = res.data.data
          if (ndata.totalPage) {
            this.addArr = ndata.noticeList
            this.totalPage = ndata.totalPage
          } else {
            let newdata = JSON.parse(ndata)
            this.addArr = newdata.noticeList
            this.totalPage = newdata.totalPage
          }
        }
      }).catch(() => {
      })
    },
    getAdd (page) {
      let langadd = 1
      if (localStorage.getItem('kleinLang') === 'EN') {
        langadd = 2
      } else {
        langadd = 1
      }
      this.$http({
        url: this.$api + '/notice/noticeList',
        method: 'post',
        data: {
          pageIndex: page,
          pageSize: 10,
          language: langadd
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.success === true) {
          let addObj = JSON.parse(res.data.data)
          this.addArr = addObj.data.results
          this.totalPage = addObj.data.totalPage
        }
      })
    },
    // 分页
    parentTurnPage (page) { // 页码
      this.currentPage = page
      this.getNoticeList2(page)
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.add
  width: 100%
  min-height calc(100vh - 252px)
  background-color: #fff
  @media screen and (max-width: 1200px)
    padding-top: 50px
    min-height calc(100vh - 142px)
  @media screen and (max-width: 768px)
    min-height calc(100vh - 292px)
  .banner
    width: 100%
    height: 168px
    background: url("../../assets/images/home/add_banner.png") no-repeat center / cover
    .linWrap
      height 100%
      display: flex
      align-items center
      font-size: 46px
      color #181818
      @media screen and (max-width: 1200px)
        font-size: 30px
        color #fff
  .linWrap
    .add-cont
      padding-top: 40px
      padding-bottom: 100px
      @media screen and (max-width: 1200px)
        padding-top: 20px
    .add-uls
      .add-list
        display flex
        align-items center
        height: 90px
        border-bottom: 1px solid #edeff1
        cursor pointer
        .time
          font-size: 14px
          color #333333
          margin-right: 60px
          @media screen and (max-width: 1200px)
            margin-right: 10px
        .add-desc
          font-size: 18px
          color #181818
    .title-add
      width: 100%
      height: 48px
      background-color: #edeff1
      font-size: 20px
      margin-bottom: 40px
      display: flex
      align-items center
      color #181818
      justify-content space-between
      @media screen and (max-width: 1200px)
        height: 36px
      .left
        font-size: 20px
        padding-left: 18px
        border-left: 10px solid #032e43
        @media screen and (max-width: 1200px)
          font-size: 16px
    .desc
      font-size: 16px
      color #181818
      line-height: 1.5
      padding-bottom: 80px
</style>
