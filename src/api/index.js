import fetch from './ajax'

export const DEBUG = true // 是否开发模式
const HTTP_DEV = '/bx' // 测试地址

const HTTPS = 'https://topic.168trucker.cn/' // 正式地址

const URLS = DEBUG ? HTTP_DEV : HTTPS
// const URLS = '/bx'
class XHR {
  // 获取微信sdk
  getWechat (json) {
    return fetch({
      url: `${URLS}/getSignature`,
      body: json,
      type: 'POST'
    })
  }
  // 获取用户信息
  getUser (json) {
    return fetch({
      url: `${URLS}/getUser`,
      body: json,
      type: 'GET'
    })
  }
  // 获取表盘信息
  dashboardInit (json) {
    return fetch({
      url: `${URLS}/Roulette/dashboardInit`,
      body: json,
      type: 'GET'
    })
  }
  // 获取中奖名单
  getWinnerList (json) {
    return fetch({
      url: `${URLS}/Roulette/getWinnerList`,
      body: json,
      type: 'GET'
    })
  }
  // 旋转大转盘
  getPrize (json) {
    return fetch({
      url: `${URLS}/Roulette/getPrize`,
      body: json,
      type: 'POST'
    })
  }
  // 获取用户积分和抽奖剩余次数及是否关注公告号
  getUserInfo (json) {
    return fetch({
      url: `${URLS}/Roulette/getUserInfo`,
      body: json,
      type: 'GET'
    })
  }
}
export default new XHR()
