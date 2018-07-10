<template>
<transition name="fade">
  <div class="rule-pop">
    <div class="flex"></div>
    <div class="rule-main">
      <div class="main">
      <!-- 关闭 -->
        <img src="https://s.kcimg.cn/wap/images/game/sailboat/code.png" alt="">
        <p>请扫码关注此公众号进行抽奖</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  .rule-pop{
    position: fixed;
    z-index: 1000;
    top:0;
    width: 100%;
    height: 100%;
    left: 0;
    background: rgba(0, 0, 0, 0.69);
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 100;
  }
  .flex{
    flex: 1;
  }
  .rule-main{
    margin:150px 30px 0;
    position: relative;
    width: 690px;
    background: url('https://img5.168trucker.com/topic/images/worldCup/model-bg.png');
    height: 758px;
    overflow: visible;
    .main{
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      height: 728px;
      margin-top: 30px;
      padding-bottom: 30px;
      box-sizing: border-box;
      text-align: center;
      img{
        margin:80px auto 60px;
        pointer-events: auto;
      }
      p{
        color: #fff;
        font-size: 30px;
        margin-top: 15px;
        animation:eye 1s infinite linear;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: transform .5s;
     transform: translate(0, 0);
  }
  .fade-enter, .fade-leave-active {
    transform: translate(0, 100%);
  }
</style>
