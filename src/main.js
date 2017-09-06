import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import 'common/stylus/index.styl'

fastClick.attach(document.body) // 300ms

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
