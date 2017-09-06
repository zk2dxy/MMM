<template>
  <div id="app">
    <m-header><!--头部--></m-header>
    <tab><!--导航条--></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from '@/components/m-header/m-header'
  import Tab from 'components/tab/tab'

  export default {
    name: 'app',
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
</style>
