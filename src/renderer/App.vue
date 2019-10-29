<template>
  <div id="app">
    <Top-Header></Top-Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import TopHeader from '@/components/TopHeader'
  export default {
    name: 'lottery-platform',
    components: {TopHeader}
  }
</script>

<style lang='scss'>
  html,body{
    font-family:微软雅黑;
    color:#606266;
    user-select: none;
  }
  html{
    &::-webkit-scrollbar-thumb{
      /*滚动条里面小方块*/
      border-radius: 3px;
      background: rgb(64,158,255);
     // height: 120px;
    }
    &::-webkit-scrollbar{
       /*滚动条整体样式*/
      width: 6px;
      height:6px;
      /*高宽分别对应横竖滚动条的尺寸*/
      background: rgb(64,158,255);
    }
    &::-webkit-scrollbar-track-piece{
       /*滚动条里面轨道*/
      border-radius:0;
      background: #fff;
    }
  }
  div{
    @extend html
  }
  .el-main{
    @extend html
  }
  *{
    margin:0;
    padding:0;
  }
  button {
  -webkit-app-region: no-drag;
  }
</style>
