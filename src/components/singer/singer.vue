<template>
  <div class="singer">
    <list-view v-if="singer.length" :data="singer"></list-view>
    <div class="loading-container">
      <loading v-if="!singer.length"></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'common/js/config'
  import Singer from 'common/js/singer'
  import listView from 'base/listView/listView'
  import Loading from 'base/loading/loading'

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    components: {
      listView,
      Loading
    },
    data () {
      return {
        singer: {
          type: Array,
          default: []
        }
      }
    },
    name: `singer`,
    created () {},
    mounted () {
      this._getSingerList()
    },
    methods: {
      _getSingerList () {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singer = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid, name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid, name: item.Fsinger_name
          }))
        })
        let hot = []
        let ret = []
        for (let key in map) {
          if (map[key].title.match(/[a-zA-Z]/)) {
            ret.push(map[key])
          } else if (map[key].title === HOT_NAME) {
            hot.push(map[key])
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        // console.error(`this.singer=>`)
        // console.error(hot.concat(ret))
        return hot.concat(ret)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%

  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
