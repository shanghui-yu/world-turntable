<template>
<transition name="fade">
  <div class="mask">
    <div :class="`main level${level}`">
      <h5 class="title">{{msg[level]}}~</h5>
      <span class="img"></span>
      <span class="ok" @click="toggletoase">{{level?'确定':'再来一次'}}</span>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: ['level'],
  data () {
    return {
      msg: [
        '很遗憾，谢谢参与~',
        '恭喜您，获得电视一台',
        '恭喜您，获得俄国世界杯门票一张',
        '恭喜您，获得京东100元礼品卡',
        '恭喜您，获得京东50元礼品卡',
        '恭喜您，获得100积分'
      ]
    }
  },
  methods: {
    toggletoase () {
      this.$emit('toggletoase')
    }
  }
}
</script>

<style scoped lang="less">
  .mask{
    position: fixed;
    z-index: 100;
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
  .main{
   position: absolute;
    z-index: 5000;
    width: 640px;
    height: 381px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    background: url('https://img5.168trucker.com/topic/images/worldCup/turntable-all.png') no-repeat;
    background-position:-2px -571px;
    text-align: center;
    &::before{
      content: '';
      width: 424px;
      height: 107px;
      background: url('https://img5.168trucker.com/topic/images/worldCup/turntable-all.png') no-repeat;
      background-position:-4px -4px;
      margin: -50px auto 0;
      display: block;
    }
    .title{
      font-size: 32px;
      color: rgb(79, 146, 53);
      font-weight: bold;
      text-align: center;
      margin-top: 24px;
      line-height: 36px;
    }
    .img{
      width: 204px;
      height: 104px;
      display: block;
      margin:20px auto;
    }
    .ok{
      width: 350px;
      height: 88px;
      text-align: center;
      color: rgb(255, 249, 72);
      text-shadow: 0px 1px 0px rgba(55, 115, 32, 0.75);
      font-size: 48px;
      font-weight: bold;
      display: inline-flex;
      justify-content: center;
      background: url('https://img5.168trucker.com/topic/images/worldCup/field.png') no-repeat;
    }
    &.level0{
      &:before{
        background: url('https://img5.168trucker.com/topic/images/worldCup/turntable-all.png') no-repeat;
        background-position:-4px -187px;
      }
      .img{
        width: 141px;
        height: 50px;
        margin:45px auto 50px;
        background: url('https://img5.168trucker.com/topic/images/worldCup/thanks.png') no-repeat;
      }
    }
     &.level1{
      .img{
        background: url('https://img5.168trucker.com/topic/images/worldCup/turntable-all.png') no-repeat;
        background-position:-220px -450px;
      }
    }
    &.level2{
      .img{
        background: url('https://img5.168trucker.com/topic/images/worldCup/turntable-all.png') no-repeat;
        background-position:-4px -450px;
      }
    }
    &.level3{
      .img{
        background: url('https://img5.168trucker.com/topic/images/worldCup/turntable-all.png') no-repeat;
        background-position:-3px -328px;
      }
    }
    &.level4{
      .img{
        background: url('https://img5.168trucker.com/topic/images/worldCup/turntable-all.png') no-repeat;
        background-position:-232px -328px;
      }
    }
    &.level5{
      .img{
        background: url('https://img5.168trucker.com/topic/images/worldCup/turntable-all.png') no-repeat;
        background-position:-467px -328px;
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
