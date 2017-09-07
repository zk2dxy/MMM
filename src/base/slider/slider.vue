<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <!--
    <div class="dots">-->
    <!--<span class="dot" :class="{active: currentPageIndex === index }" v-for="(item,index) in dots"></span>-->
    <!--</div>
    -->
  </div>
</template>

<script type="text/ecmascript-6">
  import { addClasses } from 'common/js/dom.js'
  // import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Boolean,
        default: true
      }
    },
    activated () {
      // keep-alive 组件激活时调用。
    },
    beforeDestroy () {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
    },
    created () {
      // 实例已经创建完成之后被调用
    },
    destroyed () {
      // Vue 实例销毁后调用
    },
    deactivated () {
      // keep-alive 组件停用时调用。
    },
    mounted () {
      setTimeout(() => {
        this.__initSliderLayer()
      }, 1000)
    },
    methods: {
      // 初始化轮播
      __initSliderLayer (isResize) {
        let sliderWidth = this.$refs.slider.clientWidth
        // console.warn(`sliderWidth = ` + sliderWidth)
        this.children = this.$refs.sliderGroup.children
        // console.warn(this.children)
        for (let i = 0; i < this.children.length; i++) {
          addClasses(this.children[i], 'slider-item')
          this.children[i].style.width = sliderWidth + `px`
        }
      },
      // 初始化轮播
      __initSlider () {},
      // 播放走马灯
      __play () {},
      // 刷新轮播
      __refresh () {},
      // 轮播结束
      __onScrollEnd () {}
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
