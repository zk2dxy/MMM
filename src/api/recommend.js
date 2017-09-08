import jsonp from 'common/js/jsonp'
import * as CONFIG from 'common/js/config'
import axios from 'axios'

export function getRecommend () {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let param = Object.assign({}, CONFIG.commonParam, {
    uin: '356163343',
    platform: 'h5',
    needNewCode: 1,
    g_tk: '1627998191'
  })
  return jsonp(url, param, CONFIG.options)
}

export function getPlaylist () {
  console.log('getPlaylist')
}

export function getDiscList () {
  let url = '/api/getDiscList'
  let param = Object.assign({}, CONFIG.commonParam, {
    rnd: Math.random(),
    g_tk: 5381,
    hostUin: 0,
    loginUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  console.error(param)
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}
