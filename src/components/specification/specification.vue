<template>
  <div class="specification" @click.stop.prevent="point">
    <span class="font">选规格</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      /*点击选规格按钮 并返回食物的ID*/
      point(event) {
        if (!event._constructed) {
          return
        }
        this.food.count = 1
        this.$emit('point', this.food.id)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .specification
    padding 2px
    border 1px solid #f01414
    border-radius 2px
    line-height 12px
    .font
      font-size 10px
      color #f01414
</style>
