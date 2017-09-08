import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'

fastClick.attach(document.body) // 300ms

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  error: require('common/image/error.png'),
  loading: require('common/image/default.png'),
  preLoad: 1.3,
  attempt: 1
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  // listenEvents: [ 'scroll' ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
