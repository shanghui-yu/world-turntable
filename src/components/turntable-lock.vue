<template>
<div :class="['lucky-truntable',smailView?'smail-truntable':'']">
    <div :class="['lucky-plate', begin==1?`level${level}`:'', begin==2?`level${level}-restore no-trs`:'']">
      <div :class="`lev lev${index+1}`" v-for="(item,index) in dashboardInit" :key="index">
        <img :src="item.imageurl" alt="">
        <span>{{item.name}}</span>
      </div>
    </div>
    <span class="pointer" @click="luck">抽奖</span>
</div>
</template>

<script>
export default {
  props: ['smailView', 'level', 'begin', 'dashboardInit'],
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
    background: url('../assets/lucky-plate.png') no-repeat;
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
        margin-bottom: 8px;
        background: red;
      }
      span{
        font-size: 24px;
        color: rgb(206, 87, 14);
        font-weight: bold;
        line-height: 30px;
        text-align: center;
        width: 120px;
        display: block;
        margin:0 auto;
      }
    }
    .lev1{
      left: 440px;
      top: 254px;
      transform: rotate(90deg)
    }
    .lev2{
      left: 112px;
      top: 108px;
      transform: rotate(-45deg);
    }
    .lev3{
      left: 245px;
      top: 60px;
    }
    .lev4{
      left: 382px;
      top: 115px;
      transform: rotate(45deg);
    }
    .lev5{
      left: 104px;
      top: 390px;
      transform: rotate(-135deg);
    }
    .lev6{
      left: 384px;
      top: 394px;
      transform: rotate(135deg);
    }
    .lev7{
      left: 48px;
      top: 252px;
      transform: rotate(-90deg);
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
