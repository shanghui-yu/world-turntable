<template>
  <div class="waaper">
    <img src="https://img5.168trucker.com/topic/images/worldCup/login.png" alt="" class="log">
    <div class="win-user" ref="loop">
      <div class="wraper">
        <ul  ref="loopMain">
          <li>恭喜<span>xxx</span>获得<span>1</span></li>
          <li>恭喜<span>xxx</span>获得<span>2</span></li>
          <li>恭喜<span>xxx</span>获得<span>3</span></li>
        </ul>
        <ul>
         <li>恭喜<span>xxx</span>获得<span>1</span></li>
          <li>恭喜<span>xxx</span>获得<span>2</span></li>
          <li>恭喜<span>xxx</span>获得<span>3</span></li>
        </ul>
      </div>
    </div>
    <h2 :class="['title',smailView?'smail-title':'']"></h2>
    <turntableLock
      :smailView="smailView"
      :level="level"
      :begin="begin"
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
      @toggletoase="toggletoase"></truntableToase>
  </div>
</template>

<script>
import storage from '../store/storage.js'
import turntableLock from '../components/turntable-lock'
import truntableToase from '../components/truntable-toase'
import XHR from '../api'
import toast from '../components/toast'
export default {
  data () {
    return {
      smailView: false,
      toggletoaseStatus: false,
      initLeft: '315px',
      level: 0,
      begin: 0,
      userinfo: {
        num: 5, // 剩余次数
        integral: 100 // 剩余次数
      }
    }
  },
  components: {
    turntableLock,
    truntableToase
  },
  computed: {
  },
  created () {
    this.getWxconfig()
    this.hideshare()
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
    toggletoase () {
      this.toggletoaseStatus = !this.toggletoaseStatus
    },
    luck () {
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
