<template>
<div :class="['lucky-truntable',smailView?'smail-truntable':'']">
    <div :class="['lucky-plate', begin==1?`level${level}`:'', begin==2?`level${level}-restore no-trs`:'']">
      <div class="lev lev1">
        <img src="https://img5.168trucker.com/topic/images/worldCup/turntable-all.png" alt="">
        <span>京东100元</span>
      </div>
      <div class="lev lev2">
        <img src="https://img5.168trucker.com/topic/images/worldCup/turntable-all.png" alt="">
        <span>京东100元</span>
      </div>
      <div class="lev lev3">
        <img src="https://img5.168trucker.com/topic/images/worldCup/turntable-all.png" alt="">
        <span>京东100元</span>
      </div>
      <div class="lev lev4">
        <img src="https://img5.168trucker.com/topic/images/worldCup/turntable-all.png" alt="">
        <span>京东100元</span>
      </div>
      <div class="lev lev5">
        <img src="https://img5.168trucker.com/topic/images/worldCup/turntable-all.png" alt="">
        <span>京东100元</span>
      </div>
      <div class="lev lev7">
        <img src="https://img5.168trucker.com/topic/images/worldCup/turntable-all.png" alt="">
        <span>京东100元</span>
      </div>
      <div class="lev lev8">
        <img src="https://img5.168trucker.com/topic/images/worldCup/turntable-all.png" alt="">
        <span>京东100元</span>
      </div>
    </div>
    <span class="pointer" @click="luck">抽奖</span>
</div>
</template>

<script>
export default {
  props: ['smailView', 'level', 'begin'],
  data () {
    return {
    }
  },
  methods: {
    luck () {
      this.$emit('luck')
    }
  }
}
</script>

<style scoped lang="less">
.lucky-truntable{
  width: 712px;
  height: 712px;
  margin: 0 auto;
  position: relative;
  &.smail-truntable{
    width: 650px;
    height: 650px;
  }
  .lucky-plate{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: url('https://img5.168trucker.com/topic/images/worldCup/lucky-plate.png') no-repeat;
    background-size: cover;
    transition: -webkit-transform 3s ease-in-out;
    transition: transform 3s ease-in-out;
    transition: transform 3s ease-in-out,-webkit-transform 3s ease-in-out;
    &.no-trs{
      transition: none
    }
    &.level0{
      transform: rotate(3420deg)
    }
    &.level0-restore{
      transform: rotate(-180deg)
    }
    &.level1{
      transform: rotate(3510deg)
    }
    &.level1-restore{
      transform: rotate(-90deg)
    }
    &.level2{
      transform: rotate(3285deg)
    }
    &.level2-restore{
      transform: rotate(-315deg)
    }
    &.level3{
      transform: rotate(3330deg)
    }
    &.level3-restore{
      transform: rotate(-270deg)
    }
    &.level4{
      transform: rotate(3555deg)
    }
    &.level4-restore{
      transform: rotate(-45deg)
    }
    &.level5{
      transform: rotate(3375deg)
    }
    &.level5-restore{
      transform: rotate(-225deg)
    }
    &.level6{
      transform: rotate(3465deg)
    }
    &.level6-restore{
      transform: rotate(-135deg)
    }
    &.level7{
      transform: rotate(3600deg)
    }
    &.level7-restore{
      transform: rotate(0deg)
    }
    .lev{
      position: absolute;
      width: 223px;
      height: 205px;
      text-align: center;
      img{
        width: 143px;
        height: 75px;
        margin-top: 20px;
        margin-bottom: 3px;
      }
      span{
        font-size: 24px;
        color: rgb(206, 87, 14);
        font-weight: bold;
        line-height: 30px;
        text-align: center;
        width: 115px;
        display: block;
        margin:0 auto;
      }
    }
    .lev1{
      left:435px;
      top:250px;
      transform: rotate(90deg)
    }
    .lev2{
      left: 112px;
      top: 108px;
      transform: rotate(-45deg);
    }
  }
  .pointer{
    position: absolute;
    background: url('https://img5.168trucker.com/topic/images/worldCup/pointer.png') no-repeat;
    width: 394px;
    height: 394px;
    left: 50%;
    margin-left: -196px;
    top: 155px;
    font-size: 0;
  }
}
</style>
