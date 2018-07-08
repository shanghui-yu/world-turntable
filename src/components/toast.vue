<template lang="html">
  <div class="toast-wraper">
    <div class="toast">{{msg}}</div>
  </div>
</template>

<script>
export default {
  props: ['msg'],
  data () {
    return {}
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="css" scoped>
  @keyframes fade {
    0%   {opacity: 0;}
    15%  {opacity: 1;}
    85%  {opacity: 1;}
    100% {opacity: 0;}
  }
  .toast-wraper {
    width: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 0;
    z-index: 1000;
  }
  .toast {
    max-width: 80%;
    padding: 16px 14px;
    background-color: rgba(0,0,0,0.70);
    border-radius: 5px;
    font-size: 32px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 32px;
    text-shadow: 1.5px 1.5px 0 #555555;
    transform: translate(-50%,-50%);
    opacity: 0;
    animation: fade 2s;
    display: table;
  }
</style>
