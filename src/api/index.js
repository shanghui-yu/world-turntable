import fetch from './ajax'

export const DEBUG = true // 是否开发模式
const HTTP_DEV = '/bx' // 测试地址

const HTTPS = 'https://topic.vr0101.com' // 正式地址

const URLS = DEBUG ? HTTP_DEV : HTTPS
// const URLS = '/bx'
class XHR {
  // 获取微信sdk
  getWechat (json) {
    return fetch({
      url: `${URLS}/getsignature`,
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

  // 获取排行榜
  getRank (json) {
    return fetch({
      url: `${URLS}/getTop`,
      body: json,
      type: 'GET'
    })
  }
}
export default new XHR()
