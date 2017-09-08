<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  export default {
    name: `scroll`,
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {}
    },
    mounted () {
      setTimeout(() => {
        this._initBScroll()
      }, this.refreshDelay)
    },
    methods: {
      _initBScroll () {
        this.$refs.wrapper && (this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
        }))
      },
      _enable () {
        this.scroll && this.scroll.enable()
      },
      _disable () {
        this.scroll && this.scroll.disable()
      },
      _refresh () {
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data () {
        console.log('watch => data')
        setTimeout(() => {
          this._refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
