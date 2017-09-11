import jsonp from 'common/js/jsonp'
import * as CONFIG from 'common/js/config'
// import axios from 'axios'

export function getSingerList () {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let param = Object.assign({}, CONFIG.commonParam, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, param, CONFIG.options)
}
