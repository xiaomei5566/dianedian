<template>
  <div class="title_line">
    <div class="line"></div>
    <div class="text">{{title_font}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title_font: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .title_line
    display flex
    width 80%
    margin 28px auto 24px auto
    .line
      flex 1
      position relative
      top -6px // 14px / 2 = 7px 7px - 1px = 6px
      border-bottom 1px solid rgba(255, 255, 255, 0.2)
    .text
      padding 0 12px
      font-size 14px
      font-weight 700
</style>
