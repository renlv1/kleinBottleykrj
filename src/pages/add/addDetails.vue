<template>
  <div class="add">
    <div class="add-wrap">
      <div class="add-cont">
        <div class="title-add">
          <div class="left">{{addDetails.title}}</div>
          <div class="right" v-show="addDetails.createTime">{{$changeDate(addDetails.createTime, '.', 4)}}</div>
        </div>
        <div class="desc" v-html="addDetails.content"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      addDetails: []
    }
  },
  created () {
    this.getAddInfo()
  },
  methods: {
    getAddInfo () {
      let id = this.$route.query.id
      let baseUrl = 'https://api.kleingame.ai'
      this.$http({
        url: baseUrl + '/notice/noticeDetailNew',
        method: 'post',
        data: {
          id: id
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
          if (res.data.data.title) {
            this.addDetails = res.data.data
          } else {
            let infoObj = JSON.parse(res.data.data)
            this.addDetails = infoObj.data
          }
        }
      })
    }
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
    .add-wrap
      width: 1128px
      margin: 0 auto
      @media screen and (max-width: 1200px)
        width: 100%
        padding: 50px 20px 0
      .add-cont
        padding-top: 88px
        @media screen and (max-width: 1200px)
          padding-top: 40px
      .title-add
        width: 100%
        height: 48px
        background-color: #edeff1
        font-size: 20px
        margin-bottom: 40px
        display: flex
        align-items center
        padding-right: 30px
        color #181818
        justify-content space-between
        @media screen and (max-width: 1200px)
          height: 36px
          padding-right: 5px
        .left
          font-size: 20px
          padding-left: 18px
          border-left: 10px solid #032e43
          @media screen and (max-width: 1200px)
            font-size: 16px
            padding-left: 5px
        .right
          font-size: 16px
      .desc
        min-height 24px
        font-size: 16px
        padding-bottom: 100px
        color #181818
        line-height: 1.5
</style>
