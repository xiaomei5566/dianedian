<template>
  <transition name="move">
    <div class="pay-wrapper" ref="payWrapper">
      <div ref="order">
        <div class="place">
          <span class="title">座位号:</span>
          <span class="content">{{seat}}</span>
        </div>
        <div class="food-wrapper">
          <p class="title">已点菜品:</p>
          <div class="content" v-for="(food,index) in selectFoods">
            <span class="name">{{food.name}}</span>
            <span class="name">(</span><span class="name">{{food.weight}}</span><span
            class="name" v-if="food.package=='打包'">,{{food.package}}</span><span class="name">)</span>
            <div class="right">
              <span class="money">￥{{food.price}}</span>
              <span class="count">x {{food.count}}</span>
            </div>
          </div>
          <div class="totalPrice" ref="totalPrice">
            <div class="payPrice">总价:{{totalPrice}}元</div>
            <div class="discounts" v-if="seller.supports">
              <span>原价:</span><span class="oldPrice">{{oldTotalPrice}}元</span>
              <span>优惠:</span><span class="discount">{{discountsPrice}}元</span>
            </div>
          </div>
        </div>
        <div class="remark">
          <div class="title">备注:</div>
          <input class="remarkValue" type="text" name="remark" v-model="goods.remark"
                 placeholder="请输入特殊要求">
        </div>
        <div class="pay">
          <p class="title">支付方式:</p>
          <div class="method">
            <div class="weixin" @click="payMethod(1)">
              <i class="icon-微信 ic"></i>
              <p>微信支付</p>
              <i class="icon-check_circle universal" :class="{'sure':payMethods === 1}"></i>
            </div>
            <div class="zhifubao" @click="payMethod(2)">
              <i class="icon-支付宝 ic"></i>
              <p>支付宝支付</p>
              <i class="icon-check_circle universal" :class="{'sure':payMethods === 2}"></i>
            </div>
          </div>
        </div>
        <div class="hidden"></div>
      </div>
      <div class="foot">
        <div class="left">
          <i class="icon-shopping_cart"></i>
          <span class="value">￥{{totalPrice}}元</span>
          <span v-if="seller.supports" class="discountPrice">已优惠{{discountsPrice}}元</span>
        </div>
        <div class="right" @click="pay">
          <span>提交订单</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"

  export default {
    props: {
      goods: {},
      seller: {},
      seat: {},
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      totalPrice: {},
      oldTotalPrice: {},
      discountsPrice: {},
      payMoney: Boolean
    },
    data() {
      return {
        payMethods: 1
      }
    },
    methods: {
      /*选则哪种支付方式*/
      payMethod(num) {
        /*微信支付*/
        if (num == 1) {
          this.payMethods = 1
        }
        /*支付宝支付*/
        if (num == 2) {
          this.payMethods = 2
        }
      },
      /*提交订单按钮*/
      pay() {
        console.log(this.goods)
      }
    },
    watch: {
      /*初始化better-scroll*/
      'payMoney' () {
        this.$nextTick(() => {
          if (!this.payScroll) {
            this.payScroll = new BScroll(this.$refs.payWrapper, {
              click: true
            })
          }
        })
      }
    },
    mounted() {
      /*设置价格的样式(高度)*/
      if (!this.seller.supports) {
        this.$refs.totalPrice.style.height = "20px"
      } else {
        this.$refs.totalPrice.style.height = "35px"
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pay-wrapper
    position fixed
    top 0
    left 0
    z-index 110
    background #EEEEEE
    width 100%
    height 100%
    overflow hidden
    &.move-enter-active, &.move-leave-active
      transition all 0.4s
    &.move-enter, &.move-leave-to
      top -100%
    .place, .pay, .food-wrapper, .price ,.remark
      width 100%
      background #fff
      padding 15px 10px
      border none
      margin-bottom 10px
      .title
        padding 0 5px 8px 0
        color #222222
        font-size 14px
        font-weight 700
      .content
        color #777777
        font-size 14px
        font-weight 400
        padding 5px 0px
        &:last-child
          margin-bottom 0px
      .totalPrice
        .payPrice
          float right
          margin-right 20px
          margin-top 5px
          font-size 16px
          color #FF0000
        .discounts
          clear both
          float right
          margin-right 20px
          margin-top 5px
          font-size 12px
          color #777777
          .oldPrice
            text-decoration line-through
            color #FF0000
          .discount
            color #FF0000
    .food-wrapper
      .content
        .right
          display inline-block
          position absolute
          right 20px
    .remark
      .title
        display inline-block
        padding 0
        color #222222
        font-size 14px
        font-weight 700
      .remarkValue
        display inline-block
        padding 2px
        width 81%
        font-size 14px
        outline none
        -webkit-appearance: none
        line-height 14px
    .pay
      .method
        font-size 12px
        font-weight 400
        .weixin > .ic
          font-size 28px
          width 28px
          height 28px
          margin-left 10px
        .zhifubao > .ic
          font-size 28px
          width 28px
          height 28px
          margin-left 17px
        .weixin
          display inline-block
          padding 5px 5px 20px 5px
          margin-right 10px
          .universal
            position absolute
            font-size 18px
            color #f3f5f7
            margin-top 2px
            margin-left 16px
          .sure
            color #FF0000
        .zhifubao
          display inline-block
          padding 5px 5px 20px 5px
          .universal
            position absolute
            font-size 18px
            color #f3f5f7
            margin-top 2px
            margin-left 22px
          .sure
            color #FF0000
    .hidden
      height 60px
      width 100%
    .foot
      position fixed
      display flex
      width 100%
      height 50px
      left 0
      bottom 0
      line-height 50px
      color #fff
      .left
        flex 1
        display inline-block
        background #141d27
        padding-left 10px
        .icon-shopping_cart
          font-size 32px
          line-height 50px
          margin-right 10px
        .value
          vertical-align top
          line-height 50px
          font-size 18px
          font-weight 700
          border-left 1px solid rgba(255, 255, 255, 0.1)
          padding-left 10px
        .discountPrice
          margin-left 2px
          vertical-align top
          line-height 50px
          font-size 12px
          font-weight 400
          color #DDDDDD
      .right
        flex 0 0 72px
        display inline-block
        padding 0 20px 0 20px
        position absolute
        font-size 18px
        right 0px
        width 72px
        background #00b43c
        font-weight 200
</style>
