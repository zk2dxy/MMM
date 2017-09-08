<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item,index) in dots"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addClass } from 'common/js/dom.js'
  import BScroll from 'better-scroll'

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
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        currentPageIndex: 0, // 当前第几个索引值
        dots: 0 // 轮播点的数量
      }
    },
    activated () { // 组件被激活时的调用轮播事件
      if (this.slider) {
        this.slider.enable()
        this._play()
      }
    },
    deactivated () { // keep-alive 组件停用时调用。
      this.slider.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy () { // 实例销毁之前调用。在这一步，实例仍然完全可用。
      this.slider.disable()
      clearTimeout(this.timer)
    },
    mounted () { // DOM加载完毕后的钩子调用
      setTimeout(() => {
        this._initSliderWidth()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      window.addEventListener('resize', () => { // 窗口事件
        this._initSliderWidth(true)
        clearTimeout(this.resizeTimer)
        this.dots = this.children.length
        this.resizeTimer = setTimeout(() => {
          if (this.slider.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    methods: {
      refresh () { // refresh bscroll
        if (this.slider) {
          this._initSliderWidth(true) // 设置isResize的值。判断是否为resize
          this.slider.refresh()
        }
      },
      _initSliderWidth (isResize) { // 初始化轮播的宽度
        this.children = this.$refs.sliderGroup.children // Dom => child
        let sliderWidth = this.$refs.slider.clientWidth // single slider width
        let width = 0 // sliderGroup width
        for (let child of this.children) {
          addClass(child, 'slider-item') // Add class 'slider-item'
          child.style.width = sliderWidth + `px` // Set single slider width
          width += sliderWidth // calc all slider's width
        }
        // isResize=> 1、true 不复制额外两个slider 2、false 初始化多复制2个slider
        if (this.loop && !isResize) {
          width += 2 * sliderWidth // Slider two more width for copy slider
        }
        // 设置轮播组的总宽度
        this.$refs.sliderGroup.style.width = width + `px`
        // 算slider的点的个数
        if (this.slider) {
          this.dots = this.children.length - 2 // 如果轮播生效 则减去2个slider
        } else {
          this.dots = this.children.length // 如果初始化，则不减去2个复制的slider的个数
        }
      },
      _initSlider () { // 初始化轮播
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 横向scroll
          scrollY: false, // 纵向scroll
          momentum: false, // 轮播惯性
          snap: {
            loop: this.loop, // 是否循环
            threshold: 0.3, // 阈值
            speed: 400 // 轮播速度
          }
        })
        this.slider.on('scrollEnd', this._onScrollEnd) // slider结束
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer) // slider开始的时候。关闭定时器
          }
        })
      },
      _onScrollEnd () { // 轮播结束时候
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      _play () { // 定时轮播方法
        let pageIndex = this.slider.getCurrentPage().pageX + 1
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
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
