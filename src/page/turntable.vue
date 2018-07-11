<template>
  <div class="waaper">
    <img src="https://img5.168trucker.com/topic/images/worldCup/login.png" alt="" class="log">
    <div class="win-user" ref="loop">
      <div class="wraper">
        <ul ref="loopMain">
          <li v-for="(item, index) in WinnerList" :key="index">
            恭喜<span>{{item.name}}</span>获得<span>{{item.award}}</span>
          </li>
        </ul>
        <ul>
          <li v-for="(item, index) in WinnerList" :key="index">
            恭喜<span>{{item.name}}</span>获得<span>{{item.award}}</span>
          </li>
        </ul>
      </div>
    </div>
    <h2 :class="['title',smailView?'smail-title':'']"></h2>
    <turntableLock
      :smailView="smailView"
      :level="level"
      :begin="begin"
      :dashboardInit="dashboardInit"
      @luck="luck">
    </turntableLock>
    <footer>
      <p class="tip">你有可能中华为手机哦~</p>
      <div class="me">
        <span>剩余次数：{{userinfo.num}}</span>
        <span>余额：{{userinfo.integral}}积分</span>
      </div>
    </footer>
    <truntableToase
      v-show="toggletoaseStatus"
      :level='level'
      :luckInfo="luckInfo[0]"
      @toggletoase="toggletoase"></truntableToase>

    <toast :msg="toastMsg" v-if="toastState"></toast>
    <Code v-show="!userinfo.followed"></Code>
  </div>
</template>

<script>
import storage from '../store/storage.js'
import turntableLock from '../components/turntable-lock'
import truntableToase from '../components/truntable-toase'
import Code from '../components/code'
import XHR from '../api'
import toast from '../components/toast'
export default {
  data () {
    return {
      toastMsg: '', // toast文案
      toastState: false, // toast状态
      smailView: false,
      toggletoaseStatus: false,
      level: 4, // 中奖等级
      begin: 0, // 转盘状态
      userinfo: {
        num: 5, // 剩余次数
        integral: 100, // 剩余次数
        followed: 1 // 用户是否已关注公众号，1:关注，0：未关注弹出二维码
      },
      uid: '', // 用户uid
      dashboardInit: [
        {
          awarId: 1,
          level: 1,
          imageurl: 'https://img5.168trucker.com/images/roulette/1/1.png',
          name: '华为手机'
        },
        {
          awarId: 1,
          level: 2,
          imageurl: 'https://img5.168trucker.com/images/roulette/1/1.png',
          name: '华为手机2'
        },
        {
          awarId: 1,
          level: 3,
          imageurl: 'https://img5.168trucker.com/images/roulette/1/1.png',
          name: '华为手机3'
        },
        {
          awarId: 1,
          level: 4,
          imageurl: 'https://img5.168trucker.com/images/roulette/1/1.png',
          name: '华为手机4'
        },
        {
          awarId: 1,
          level: 5,
          imageurl: 'https://img5.168trucker.com/images/roulette/1/1.png',
          name: '华为手机5'
        },
        {
          awarId: 1,
          level: 4,
          imageurl: 'https://img5.168trucker.com/images/roulette/1/1.png',
          name: '华为手机4'
        },
        {
          awarId: 1,
          level: 5,
          imageurl: 'https://img5.168trucker.com/images/roulette/1/1.png',
          name: '华为手机5'
        }
      ], // 表盘信息
      WinnerList: [ // 中奖用户列表
        {
          name: '郭志君',
          award: '200元油卡'
        },
        {
          name: '郭志君',
          award: '200元油卡'
        }
      ],
      luckInfo: [] // 中奖信息
    }
  },
  components: {
    turntableLock,
    toast,
    truntableToase,
    Code
  },
  computed: {
  },
  created () {
    // this.getWxconfig()
    // this.hideshare()
    if (window.innerHeight < 1182) {
      this.smailView = true
    }
    let userinfo = storage.get('userInfoWorldCup')
    if (userinfo) {
      this.userinfo = JSON.parse(userinfo)
    }
  },
  mounted () {
    this.loop()
  },
  methods: {
    showToast (msg) {
      if (this.toastState) return
      this.toastMsg = msg
      this.toastState = true
      setTimeout(() => {
        this.toastState = false
      }, 2e3)
    },
    toggletoase () {
      this.toggletoaseStatus = !this.toggletoaseStatus
    },
    // 获取用户积分和剩余次数信息
    getUserInfo () {
      let json = {
        uid: this.uid
      }
      XHR.getUserInfo(json).then(res => {
        let {status, data, errMsg} = res.data
        if (!status) {
          this.userinfo = data
        } else {
          this.showToast(errMsg)
        }
      })
    },
    // 获取中奖名单
    getWinnerListFun () {
      let json = {
        date: '2018/07/16'
      }
      XHR.getWinnerList(json).then(res => {
        let {status, data} = res.data
        if (!status) {
          this.WinnerList = data
        }
      })
    },
    getDashboardInit () { // 获取表盘信息
      let json = {
        ts: +new Date()
      }
      XHR.dashboardInit(json).then(res => {
        let {status, data} = res.data
        if (!status) {
          this.dashboardInit = data
        }
      })
    },
    getPrize () { // 开始转盘
      let json = {
        uid: this.uid
      }
      XHR.getWinnerList(json).then(res => {
        let {status, data, errMsg} = res.data
        if (!status) {
          this.level = data.awarId
        } else {
          this.showToast(errMsg)
        }
      })
    },
    luck () {
      if (this.userinfo.num === 0) {
        this.showToast('今天抽奖次数已用完请明天再来')
        return
      }
      if (this.userinfo.integral === 0) {
        this.showToast('积分不足')
        return
      }
      this.luckInfo = this.dashboardInit.filter((item) => {
        if (item.level === this.level) {
          return true
        } else {
          return false
        }
      })
      console.log(this.luckInfo)
      this.begin = 1
      setTimeout(() => {
        this.begin = 2
        this.toggletoase()
        this.userinfo.num--
        this.userinfo.integral--
      }, 4e3)
    },
    loop () {
      let loops = this.$refs.loop
      let loopMain = this.$refs.loopMain
      this.times = setInterval(() => {
        if (loops.scrollLeft >= loopMain.clientWidth) {
          loops.scrollLeft = 0
        } else {
          loops.scrollLeft++
        }
      }, 10)
    }
  }
}
</script>

<style scoped lang="less">
  .waaper{
    height: 100%;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: url('https://img5.168trucker.com/topic/images/worldCup/truntable-bg.jpg') 50% 50% no-repeat;
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x:hidden;
    .title{
      width: 430px;
      height: 163px;
      background: url('https://img5.168trucker.com/topic/images/worldCup/turntable.png') 50% 50% no-repeat;
      background-size: contain;
      margin: 50px auto 15px;
      &.smail-title{
        margin: 20px auto 15px;
      }
    }
    .log{
      width: 169px;
      height: 60px;
      margin:40px 0 0 40px;
    }
    .win-user{
      position: absolute;
      top: 46px;
      height: 46px;
      overflow: hidden;
      width: 100%;
      .wraper{
        width: 10000%;
        overflow: hidden;
      }
      ul{
        overflow: hidden;
        float: left;
        display: block;
      }
      li{
        border-style: solid;
        border-width: 3px;
        border-color: rgb(252, 255, 0);
        background-color: rgba(95, 189, 0, 0.502);
        height: 40px;
        border-radius: 20px;
        padding: 0 13px;
        font-size: 24px;
        color: #fff;
        margin-right: 38px;
        float: left;
        span{
          color: #fcff00;
          margin:0 10px;
          display: inline-block;
        }
      }
    }
    footer{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .tip{
        font-size: 30px;
        color: rgb(246, 250, 2);
        font-weight: bold;
        line-height: 1;
        text-align: center;
        line-height: 50px;
        margin-bottom: 10px;
      }
      .me{
        font-size: 36px;
        color: rgb(206, 87, 14);
        font-weight: bold;
        line-height: 0.833;
        text-align: center;
        display: flex;
         border-top-left-radius: 12px;
         border-top-right-radius: 12px;
         background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUEBAUEAwUFBAUGBgUGCA4JCAcHCBEMDQoOFBEVFBMRExMWGB8bFhceFxMTGyUcHiAhIyMjFRomKSYiKR8iIyL/2wBDAQYGBggHCBAJCRAiFhMWIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiL/wgARCABhABwDAREAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAABAIDAQAH/8QAGgEBAQEBAQEBAAAAAAAAAAAAAgMBAAQGCP/aAAwDAQACEAMQAAAA+8fmv6+c1VYTirSad5zVUhgaopMs65l+3NdCKTMK7qY531QS5Y870jleuOXNdZVxHP0buRTVjjohzNxyhRRSkbLNpDIohtpojm9+eOV6RC0YnPzzq53Bl6O93//EACUQAAIDAAEDAwUBAAAAAAAAAAECAAMRMSEiQRAyUQQSM2FxE//aAAgBAQABPwC2sodHtiWGs6OPIiuGGiGtWOkQ4R+pbX9p0e2JYazo48iK6sNBlVudr8eDCAR+pbX/AJnR7ZsZShwyq7O1uPB+IcIw9QY1B+7tPSOgsGHnwYylDhlV2drceD8TZVcLBh90sQWDDz4MZSpw8xL3VcBgJB0dCJVcLBh90sQOMPPgxgyNhEup3uTnyPmAkHR0IlVwsGH3eiuHTRxLqd7k58j5gJB0dCIn1S/b3g7+pXY1b6OPIiOGTQekup3uTnyPn0uqNZ0dVMrtat9HHkRHV00cRqEdiSIQCMPUGXUms6OqmV2NW2jjyIjq66DKvwr/ACXfhf8AnoJ//8QAGREBAAMBAQAAAAAAAAAAAAAAAQAQEQIS/9oACAECAQE/AOucg5BmV1zkHJs56rrnKScteImxJy0OxNiTaHYmzI80NEea9QchEpINZSQZsI3/AP/EABwRAAMBAQEAAwAAAAAAAAAAAAABAhIQEQMhMv/aAAgBAwEBPwCK0OdDWSW/ORWhzocv0qeRWuJ6Knk39CeRPRUcqcieRPQ4mn7ypyJ5JzS9IrlTnjWSK4/j+xzoayRXJrRU6Gsk/JUrzk1oqdD1L8K/RH67/9k=) repeat-x;
         width: 660px;
         margin:0 auto;
         line-height: 80px;
         height: 80px;
        span{
          flex:1;
          display: block;
        }
      }
    }
  }
</style>
