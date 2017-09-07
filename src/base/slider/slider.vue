<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots" v-if="dots>0">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item,index) in dots"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { addClass } from 'common/js/dom.js'

  export default {
    name: 'slider',
    data () {
      return {
        children: {
          type: Array,
          default: []
        },
        currentPageIndex: {
          type: Number,
          default: 0
        },
        dots: {
          type: Number,
          default: 0
        }
      }
    },
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
        type: Number,
        default: 4000
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
      window.addEventListener('load', () => {
        setTimeout(() => {
          this._initSliderLayer()
          this._initSlider()
        }, 20)
      })
      window.addEventListener('resize', () => {
        this._initSliderLayer(true)
        this._refresh()
      })
    },
    methods: {
      _initSliderLayer (isResize) {
        this.children = this.$refs.sliderGroup.children // Dom => child
        let sliderWidth = this.$refs.slider.clientWidth
        this.dots = this.children.length
        let width = 0
        for (let child of this.children) {
          addClass(child, 'slider-item') // Add class 'slider-item'
          child.style.width = sliderWidth + 'px' // Set single slider width
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth // Slider two more width for copy slider
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        })
        this.slider.on('scrollEnd', () => {
          this._onScrollEnd()
        })
      },
      _play () {
        let pageIndex = this.slider.getCurrentPage().pageX + 1
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      },
      _refresh () {
        if (this.slider) {
          this._initSliderLayer(true)
          this.slider.refresh()
        }
      },
      _onScrollEnd () {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      }
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
