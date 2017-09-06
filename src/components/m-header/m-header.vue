<template>
  <div class="m-header">
    <span class="logo"></span>
    <span class="title">Chicken Music</span>
    <span class="icon icon-mine"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {name: `module`}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    color $color-theme
    text-align center
    height 44px
    font-size 0
    .logo
      vertical-align top
      display inline-block
      bg-image('logo')
      background-size 30px 32px
      margin-top 6px
      margin-right 9px
      width 30px
      height 32px
    .title
      display inline-block
      font-size 16px
      line-height 44px
    .icon-mine
      font-size 20px
      padding 12px
      float right
</style>
