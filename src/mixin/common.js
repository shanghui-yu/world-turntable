import XHR from '../api'
import storage from '../store/storage.js'
var wx = require('weixin-js-sdk')
export default {
  computed: {},
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    back () {
      if (this.$router) {
        this.$router.back()
      }
    },
    setCookie (name, value) {
      var curDate = new Date()
      // 当前时间戳
      var curTamp = curDate.getTime()
      // 当前日期
      var curDay = curDate.toLocaleDateString()
      var curWeeHours = 0
      curWeeHours = new Date(curDay).getTime() - 1
      // 当日已经过去的时间（毫秒）
      var passedTamp = curTamp - curWeeHours
      // 当日剩余时间
      var leftTamp = 24 * 60 * 60 * 1000 - passedTamp
      var leftTime = new Date()
      leftTime.setTime(leftTamp + curTamp)
      // 创建cookie
      document.cookie = name + '=' + value + ';expires=' + leftTime.toGMTString() + ';path=/'
    },
    getCookie (name) {
      // name 为想要取到的键值的键名
      var reg = /\s/g
      var result = document.cookie.replace(reg, '')
      var resultArr = result.split(';')
      for (var i = 0; i < resultArr.length; i++) {
        var nameArr = resultArr[i].split('=')
        if (nameArr[0] == name) {
          return nameArr[1]
        }
      }
    },
    getQueryString (name) {
      /* eslint-disable */
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
       /* eslint-enable */
    },
    getUid () {
      let userinfo = storage.get('userInfoWorldCup')
      if (userinfo) {
        return JSON.parse(userinfo).uid
      } else {
        return ''
      }
    },
    fRandomBy (under, over) { // 从任意值开始至任意值结束 随机数
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * under + 1)
        case 2:
          return parseInt(Math.random() * (over - under + 1) + under)
        default:
          return 0
      }
    },
    getWxconfig () {
      XHR.getWechat({
        url: `${window.location.href.split('#')[0]}`
      }).then((res) => {
        let { data } = res.data
        try {
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showAllNonBaseMenuItem', 'hideMenuItems']
          })
        } catch (e) {}
      })
    },
    hideshare () {
      wx.ready(function () {
        wx.hideAllNonBaseMenuItem()
        wx.hideMenuItems({
          menuList: ['menuItem:editTag', 'menuItem:delete', 'menuItem:copyUrl', 'menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:QZone', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:weiboApp'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        })
      })
    },
    share () {
      wx.ready(() => {
        wx.showAllNonBaseMenuItem()
        wx.hideMenuItems({
          menuList: ['menuItem:editTag', 'menuItem:delete', 'menuItem:copyUrl', 'menuItem:share:qq', 'menuItem:share:QZone', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:weiboApp'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        })
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: '',
          link: location.href,
          imgUrl: 'https://img5.168trucker.com/topic/images/worldCup/share.png',
          success: (res) => {
          },
          cancel: () => {
            // 用户取消分享后执行的回调函数
          }
        })
        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: '',
          desc: '',
          link: location.href,
          imgUrl: 'https://img5.168trucker.com/topic/images/worldCup/share.png',
          success: () => {
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
      })
    }
  }
}
