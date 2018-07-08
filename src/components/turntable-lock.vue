<template>
<div :class="['lucky-truntable',smailView?'smail-truntable':'']">
    <div :class="['lucky-plate', begin==1?`level${level}`:'', begin==2?`level${level}-restore no-trs`:'']">
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
      transform: rotate(3390deg)
    }
    &.level2{
      transform: rotate(3390deg)
    }
    &.level3{
      transform: rotate(3390deg)
    }
    &.level4{
      transform: rotate(3390deg)
    }
    &.level5{
      transform: rotate(3390deg)
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
