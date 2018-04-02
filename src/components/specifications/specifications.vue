<template>
  <div class="specifications" v-if="food">
    <div class="header">
      <div class="back" @click="back">
        <i class="icon-arrow_lift"></i>
      </div>
      <h1 class="name">{{food.name}}</h1>
    </div>
    <div class="select" v-if="food.weight">
      <div class="title">分量:</div>
      <div class="value">
        <div>
          <div class="selectValue" :class="{'click':weight.point}" v-for="(weight,index) in food.weight"
                @click="point('count',index)">
            <span class="price">{{weight.size}}￥{{weight.price}}</span>
            <span class="oldPrice">￥{{weight.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="select" v-if="food.taste.type">
      <div class="title">味道: {{food.taste.type}}</div>
      <div class="value">
        <div>
            <div class="selectValue" v-for="(extent,index) in food.taste.extents"
                 :class="{'click':extent.point}" @click="point('taste',index)">{{extent.extent}}</div>
        </div>
      </div>
    </div>
    <div class="select" v-if="food.matchs">
      <div class="title">加臊子:</div>
      <div class="value">
        <div>
          <div class="selectValue" v-for="(match,index) in food.matchs" :class="{'click':match.point}"
                @click="point('match',index)">
            <span class="price">{{match.name}}+￥{{match.price}}</span>
            <span class="oldPrice">￥{{match.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="select">
      <div class="title">
        数量:
      </div>
      <div class="count">
        <cartcontrol :food="food"></cartcontrol>
      </div>
    </div>
    <div class="select">
      <div class="title">
        打包:
        <span class="annotation">(注:打包和不打包请分开下单)</span>
      </div>
      <div class="value">
        <div>
          <div class="selectValue" :class="{'click':food.package.type}"
                @click="point('package',0)">打包+￥{{food.package.price}}</div>
        </div>
      </div>
    </div>
    <div class="select">
      <div class="title">
        备注:
      </div>
      <div class="textArea">
        <textarea v-model="remark"></textarea>
      </div>
    </div>
    <div class="sure" v-if="food.count>0">
      <div class="content" @click="sure">确定</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  import cartcontrol from "components/cartcontrol/cartcontrol"

  export default {
    props: {
      food: {}
    },
    data() {
      return {
        extent: "合适",
        matchPrice: 0,
        countPrice: 0,
        weight: "小份",
        remark: "无",
        initFood: {
          weight: [],
          taste: []
        }
      }
    },
    methods: {
      /*返回主页面*/
      back(event) {
        this.$emit('back', event.target)
      },
      /*点击定义的规格按钮触发对应的事件*/
      point(type, num) {
        if (type == 'count') {
          let i = 0
          /*清空食物分量*/
          this.food.weight.forEach((weight) => {
            /*设置数据还原的值*/
            this.initFood.weight[i] = false
            if (weight.point) {
              this.initFood.weight[i] = true
            }
            weight.point = false
            i++
          })
          this.food.weight[num].point = true
          /*获取被点击的食物分量和价格*/
          this.food.weight.forEach((weight) => {
            if (weight.point) {
              this.countPrice = weight.price
              this.weight = weight.size
            }
          })
        }
        if (type == 'taste') {
          let i = 0
          /*清空食物味道*/
          this.food.taste.extents.forEach((extent) => {
            /*设置数据还原的值*/
            this.initFood.taste[i] = false
            if (extent.point) {
              this.initFood.taste[i] = true
            }
            extent.point = false
            i++
          })
          this.food.taste.extents[num].point = true
          this.food.taste.extents.forEach((extent) => {
            if (extent.point) {
              this.extent = extent.extent
            }
          })
        }
        if (type == 'match') {
          this.food.matchs[num].point = !this.food.matchs[num].point
          if (this.food.matchs[num].point) {
            this.matchPrice += this.food.matchs[num].price
          } else {
            this.matchPrice -= this.food.matchs[num].price
          }
        }
        if (type == 'package') {
          this.food.package.type = !this.food.package.type
        }
      },
      /*确定按钮 并将该食物添加到购物车以及还原食物数据*/
      sure() {
        /*给默认设值*/
        if (this.countPrice == 0) {
          this.countPrice = this.food.weight[0].price
        }
        this.food.taste.extents.forEach((extent) => {
          if (extent.point) {
            this.extent = extent.extent
          }
        })
        /*给打包价格赋值*/
        let packagePrice = 0
        let packageType = "不打包"
        if (this.food.package.type) {
          packageType = "打包"
          packagePrice = this.food.package.price
        }
        /*计算总价格*/
        this.food.price = this.matchPrice + this.countPrice + packagePrice
        /*添加臊子*/
        let matchs = []
        this.food.matchs.forEach((match) => {
          if (match.point) {
            matchs.push(match.name)
          }
        })
        /*给备注设定默认值*/
        if (this.remark == "无" || this.remark == null || this.remark == "") {
          this.remark = "无"
        }
        /*定义新对象防止双向绑定*/
        let meal = {
          id: this.food.id,
          name: this.food.name,
          count: this.food.count,
          price: this.food.price,
          weight: this.weight,
          match: matchs,
          taste: this.extent,
          remark: this.remark,
          package: packageType
        }
        console.log(meal)
        /*食物数据还原*/
        if (!this.initFood.weight.length == 0) {
          let a = 0
          this.food.weight.forEach((weight) => {
            weight.point = false
          })
          this.initFood.weight.forEach((food) => {
            if (food) {
              this.food.weight[a].point = true
            }
            a++
          })
        }
        if (!this.initFood.taste.length == 0) {
          let b = 0
          this.food.taste.extents.forEach((extents) => {
            extents.point = false
          })
          this.initFood.taste.forEach((food) => {
            if (food) {
              this.food.taste.extents[b].point = true
            }
            b++
          })
        }
        if (this.matchPrice) {
          this.food.matchs.forEach((match) => {
            match.point = false
          })
        }
        this.food.package.type = false
        this.food.count = 1
        this.remark = "无"
        this.matchPrice = 0
        this.countPrice = 0
        this.weight = "小份"
        this.$emit('sure', meal)
      }
    },
    computed: {},
    components: {
      cartcontrol
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .specifications
    .header
      position relative
      top 0
      left 0
      padding-top 12px
      background rgba(221, 221, 221, 0.1)
      height 25px
      margin-bottom 20px
      color #000
      border-radius 0 0 10px 10px
      z-index 10
      .back
        position absolute
        padding 0px 10px 5px 10px
        font-size 16px
        line-height 16px
      .name
        text-align center
        font-size 16px
        font-weight 700
        line-height 16px
        vertical-align top
        width 100%
    .select
      margin 0px 0px 20px 20px
      .title
        font-size 14px
        font-weight 700
        .annotation
          font-size 12px
          color #7e8c8d
      .value
        position relative
        margin 5px 0 0 0
        font-size 14px
        font-weight 200
        .selectValue
          display inline-block
          padding 5px 10px
          margin 10px 10px 0 0
          border 1px solid rgba(0, 0, 0, 0.3)
          border-radius 2px
          .oldPrice
            font-size 12px
            color #7e8c8d
            text-decoration line-through
        .click
          border 1px solid #f01414
          color #f01414
      .textArea > textarea
        padding 2px
        margin-top 12px
        width 91%
        height 50px
        border 1px solid #7e8c8d
        border-radius 5px
        /*禁止拖动*/
        resize none
        /*取消默认点击颜色*/
        outline none
        /*取消默认上边框阴影*/
        -webkit-appearance: none
    .count
      margin-top 3px
      margin-bottom 10px
    .sure
      margin-top 20px
      width 100%
      padding-bottom 25px
      .content
        width 100px
        padding 10px 20px
        margin 0 auto
        background #00b43c
        text-align center
        font-size 14px
        font-weight 400
        color #fff
        border-radius 20px

</style>
