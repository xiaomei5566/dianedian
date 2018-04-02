<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li @click="selectMenu(index,$event)" ref="menuList" v-for="(item,index) in goods"
              class="menu-item" :class="{'current':currentIndex===index}">
          <span class="text">
            <icon v-show="item.type>0" class="icon" :index_num='item.type' :icon_num="3"></icon>
            <span>{{item.name}}</span>
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img class="icon_img" width="57px" height="57px" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.weight[0].price}}起</span>
                    <span v-if="food.weight[0].oldPrice" class="old">￥{{food.weight[0].oldPrice}}起</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <specification @point="point" :food="food"></specification>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <transition name="move">
        <div class="specifications-wrapper" ref="specificationsWrapper" v-show="!flag">
          <specifications @sure="sure" @back="back" :food="pointFood"></specifications>
        </div>
      </transition>
      <shopcart :seat="seat" @empty="empty" ref="shopcart"
                :select-foods="selectFoods" :minPrice="1" :goods="goods" :seller="seller"></shopcart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from 'components/icon/icon'
  import BScroll from "better-scroll"
  import shopcart from "components/shopcart/shopcart"
  import cartcontrol from "components/cartcontrol/cartcontrol"
  import specification from "components/specification/specification"
  import specifications from "components/specifications/specifications"

  export default {
    props: {
      goods:{},
      seller:{},
      seat: {}
    },
    data(){
      return {
        foods: [],
        listHeight: [],
        scrollY: 0,
        flag: true,
        foodID: 0
      }
    },
    created()
    {
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    }
    ,
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          /*实时监测滚动位置*/
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          /*判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）*/
          /*获取滚动y值*/
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y))
          }
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      /*菜单栏初始化better-scroll并设置点击之后选中到指定食物类型*/
      selectMenu(index, event) {
        /*当触发自带click事件则不调用此函数，此函数是better-scroll(会重写浏览器自带事件)中的点击事件*/
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      /*控制规格和主页面的互相显示与隐藏*/
      _updateFlag() {
        this.flag = !this.flag
      },
      /*控制点击规格组件之后显示规格页面并初始化better-scroll*/
      point(id) {
        this.foodID = id
        this._updateFlag()
        this.$nextTick(() => {
          if (!this.specificationsScroll) {
            this.specificationsScroll = new BScroll(this.$refs.specificationsWrapper, {
              click: true
            })
          }
        })
      },
      /*规格页面返回至主页面*/
      back(event) {
        this._updateFlag()
      },
      /*规格页面的确定按钮被点击所触发的事件*/
      sure(obj) {
        if (obj.count) {
          this.foods.push(obj)
        } else {
          alert("请选择数量!")
        }

      },
      /*清空购物车*/
      empty() {
        this.foods = []
      }
    }
    ,
    computed: {
      currentIndex()
      {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
      ,
      /*给购物车传递foods*/
      selectFoods()
      {
        let foodArr = []
        for (let i = 0; i < this.foods.length; i++) {
          if (this.foods[i].count) {
            foodArr.push(this.foods[i])
          }
        }
        return foodArr
      },
      /*传输点击的食物*/
      pointFood(id)
      {
        let foodOK
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.id == this.foodID) {
              foodOK = food
            }
          })
        })
        return foodOK
      }
    }
    ,
    components: {
      icon,
      shopcart,
      cartcontrol,
      specification,
      specifications
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display flex
    position absolute
    top 100px
    bottom 46px
    overflow hidden
    width 100%
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #fff
      .menu-item
        display table
        padding 4px 12px
        width 56px
        height 42px
        line-height 14px
        &.current
          position relative
          z-index 10
          background #f3f5f7
          font-weight 700
        .text
          display table-cell
          width 54px
          vertical-align middle
          font-size 12px
    .foods-wrapper
      flex 1
      border-left 1px solid #d9dde1
      .food-list
        .title
          padding-left 14px
          height 26px
          background #f3f5f7
          line-height 26px
          font-size 12px
          color rgb(147, 153, 159)
        .food-item
          display flex
          margin 18px
          padding-bottom 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none
            padding-bottom 0px
          .icon
            flex 0 0 57px
            margin-right 10px
          .content
            flex 1
            .name
              margin-top 2px
              font-size 14px
              line-height 14px
              color rgb(7, 17, 27)
            .desc, .extra
              margin-top 8px
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
            .desc
              line-height 14px
            .extra
              .count
                margin-right 12px
            .price
              font-weight 700
              .now
                margin-right 4px
                font-size 14px
                color rgb(240, 20, 20)
                line-height 24px
              .old
                font-size 10px
                color rgb(147, 153, 159)
                line-height 20px
                text-decoration line-through
            .cartcontrol-wrapper
              position absolute
              right 0
              bottom 12px
    .specifications-wrapper
      position absolute
      top 0px
      bottom 0px
      left 0
      overflow hidden
      width 100%
      background #fff
      &.move-enter-active, &.move-leave-active
        transition all 0.4s
      &.move-enter, &.move-leave-to
        left 100%
</style>
