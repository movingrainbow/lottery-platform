<template>
  <div class="top-bar">
    <div class="custom-name">lottery</div>
    <div class="custom-button-show">
      <svg title="登出" t="1571921749093" @click="outLogin" v-if="$route.name!=='login'"  class="custom-button" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1579" width="16" height="16"><path d="M990.410486 511.991814 990.410486 511.991814 990.410486 511.991814 990.410486 511.991814zM488.481865 1022.310521 488.481865 1022.310521c-251.226788 0-454.892351-207.077266-454.892351-462.47812 0-193.325054 116.707049-358.866321 282.341437-427.981445l0 0.154519c4.923126-1.77339 10.184967-2.740414 15.69854-2.740414 25.977651 0 47.031153 21.429055 47.031153 47.840588 0 20.836561-13.0799 38.527478-31.363312 45.099151l0 0.063445c-129.070634 55.844889-219.614813 185.943946-219.614813 337.563132 0 202.576765 161.52786 366.796944 360.800369 366.796944 199.215204 0 360.739994-164.220179 360.739994-366.796944 0-151.620209-90.512457-281.719266-219.582067-337.563132l0-0.063445c-18.252713-6.571672-31.365358-24.26259-31.365358-45.099151 0-26.412556 21.086248-47.840588 47.062875-47.840588 5.480828 0 10.774391 0.964978 15.665795 2.740414l0-0.154519c165.66918 69.115124 282.343483 234.657414 282.343483 427.981445C943.346587 815.232233 739.7107 1022.310521 488.481865 1022.310521zM488.481865 527.937994c-26.00528 0-47.060829-21.428032-47.060829-47.839565L441.421037 197.038632l0 0L441.421037 100.329033l0 0L441.421037 49.529043c0-26.41358 21.055548-47.840588 47.060829-47.840588 25.977651 0 47.033199 21.428032 47.033199 47.840588l0 143.522788 0 95.681176 0 191.364399C535.515065 506.509962 514.459516 527.937994 488.481865 527.937994z" p-id="1580" fill="#ffffff"></path></svg>
      
      <span @click="customTopButtonClick(1)" class="min-custom-button custom-button el-icon-minus"></span>
      <svg
        t="1570756181039"
        class="custom-button"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1575"
        width="16"
        height="16"
        @click="customTopButtonClick(2)"
      >
        <path
          d="M734.814692 691.402973 884.428198 691.402973 884.428198 77.888951 258.144338 77.888951 258.144338 284.1005 294.983361 284.1005 294.983361 118.847805 847.589175 118.847805 847.589175 650.443096 734.814692 650.443096Z"
          p-id="1576"
          fill="#ffffff"
        />
        <path
          d="M108.530832 284.1005l626.28386 0 0 613.515045-626.28386 0L108.530832 284.1005 108.530832 284.1005zM145.369855 325.060377l0 531.59529 552.605813 0L697.975668 325.060377 145.369855 325.060377z"
          p-id="1577"
          fill="#ffffff"
        />
      </svg>
      <span
        @click="customTopButtonClick(3)"
        class="close-custom-button custom-button el-icon-close"
      ></span>
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
      fullScreen: false
    }
  },
  methods: {
    customTopButtonClick (index) {
      switch (index) {
        case 1:
          ipcRenderer.send('min')
          break
        case 2:
          if (!this.fullScreen) {
            ipcRenderer.send('enter-full-screen')
            this.fullScreen = true
          } else {
            ipcRenderer.send('leave-full-screen')
            this.fullScreen = false
          }
          break
        case 3:
          ipcRenderer.send('close')
          break
        default:
          break
      }
    },
    outLogin () {
      this.$router.push({path: '/login'})
    }
  }
}
</script>
<style lang="scss">
.top-bar {
  -webkit-app-region: drag;
  position: relative;
  height: 50px;
  width: 100%;
  background: transparent;
  border-bottom: 1px solid #fbfbfb;
  color: #fff;
  z-index: 1;
  div{
    color:#fff
  }
}
.custom-button {
  margin-left: 8px;
  -webkit-app-region: no-drag;
  &:hover {
    background: #ddd;
  }
}
.custom-button-show,
.custom-name {
  padding-left: 30px;
  display: inline-block;
  position: absolute;
  line-height: 50px;
  vertical-align: middle;
}
.custom-button-show {
  right: 10px;
  top: 3px;
}
</style>