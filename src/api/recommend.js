import jsonp from 'common/js/jsonp'
import * as CONFIG from 'common/js/config'

export function getRecommend () {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let param = Object.assign({}, {
    uin: '356163343',
    platform: 'h5',
    needNewCode: 1
  }, CONFIG.commonParam)
  return jsonp(url, param, CONFIG.options)
}
