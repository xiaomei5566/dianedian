<template>
  <div class="header">
    <div class="content-wrapper" @click="showDetail">
      <div class="avatar">
        <img class="logo" :src="seller.avatar" width="100px" height="100px">
      </div>
      <div class="value-wrapper">
        <div class="name">{{seller.name}}</div>
        <div v-if="seller.supports" class="discounts">
          <icon :index_num="seller.supports[0].type" :icon_num="2"></icon>
          <span class="support">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="!seller.supports" class="discounts">
          <span class="support">暂无优惠</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-content" @click="showDetail">
        <span class="count">{{seller.supports.length}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="background">
      <img class="background-img" :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="5"></star>
            </div>
            <title_line title_font="优惠信息" v-if="seller.supports"></title_line>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item,index) in seller.supports" class="supports-item">
                <icon :index_num="seller.supports[index].type" :icon_num="2"></icon>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <title_line title_font="商家公告"></title_line>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from "components/icon/icon"
  import star from 'components/star/star'
  import title_line from 'components/title_line/title_line'

  export default {
    props: {
      seller: {}
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      /*展示隐藏的详细商家信息*/
      showDetail() {
        this.detailShow = true
      },
      /*展示隐藏的详细商家信息*/
      hideDetail() {
        this.detailShow = false
      }
    },
    components: {
      star,
      title_line,
      icon
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    position absolute
    left 0
    top 0
    width 100%
    height 100px
    color #fff
    font-size 0
    background rgba(7, 17, 27, 0.5)
    .content-wrapper
      position absolute
      padding 10px 0px 0px 10px
      z-index 11
      .avatar
        display inline-block
        .logo
          border-radius 50%
          background-repeat no-repeat
      .value-wrapper
        display inline-block
        vertical-align top
        margin-left 10px
        .name
          font-size 18px
          margin-top 40px
        .discounts
          margin-top 10px
          font-size 14px
          line-height 16px
          .support
            position absolute
      .support-content
        position fixed
        right 10px
        top 68px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0, 0, 0, 0.2)
        text-align center
        .count
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size 10px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      overflow hidden
      filter blur(10px)
      background-repeat no-repeat

    .detail
      position: fixed
      z-index 101
      top 0
      left 0
      width 100%
      height 100%
      overflow auto
      background rgba(7, 17, 27, 0.8)
      /*背景模糊（只支持IOS）*/
      backdrop-filter blur(10px)
      /*定义过渡状态*/
      &.fade-enter-active, &.fade-leave-active
        transition all 0.5s
      /*定义开始和结束状态  */
      &.fade-enter, &.fade-leave-to
        opacity 0
        background rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 16px
            padding 2px 0
            text-align center
          .supports
            width 80%
            margin 0 auto
            .supports-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .text
                font-size 12px
                line-height 16px
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              font-size 12px
              line-height 24px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
