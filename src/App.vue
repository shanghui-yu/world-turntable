<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import XHR from './api'
import storage from './store/storage'
export default {
  name: 'App',
  created () {
    this.alginAuth()
    this.getUserinfo()
    console.log('ceshi')
  },
  methods: {
    alginAuth () {
      let user = storage.get('userInfoWorldCup')
      let againAuth = storage.get('againAuth')
      if (user && !againAuth) {
        storage.remove('userInfoWorldCup')
        storage.set('againAuth', '1')
      }
    },
    getUserinfo () {
      let href = location.href
      if (!storage.get('userInfoWorldCup')) {
        if (href.indexOf('openid') > -1 && href.indexOf('nickname') > -1 && href.indexOf('headimgurl') > -1) {
          let json = {}
          json['uid'] = this.getQueryString('openid')
          json['nickname'] = this.getQueryString('nickname')
          json['headimgurl'] = this.getQueryString('headimgurl')
          storage.set('userInfoWorldCup', JSON.stringify(json))
          this.getUser(json['uid'])
        } else {
          // location.href = 'https://topic.vr0101.com/auth'
        }
      } else {
        let user = JSON.parse(storage.get('userInfoWorldCup'))
        if (!user.uid && !user.nickname && !user.headimgurl) {
          // location.href = 'https://topic.vr0101.com/auth'
        }
      }
    },
    getUser (uid) {
      let time = +new Date()
      let json = {
        uid: `${uid}`,
        time
      }
      XHR.getUser(json).then((res) => {
        let {data, status} = res.data
        if (!status) {
          storage.set('userInfoWorldCup', JSON.stringify(data))
        }
      })
    }
  }
}
</script>

<style>
@import './mixin/publick.css';
#app {
  height: 100%;
  overflow: hidden;
}
</style>
