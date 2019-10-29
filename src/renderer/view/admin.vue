<template>
  <div class="admin-manager">
    <button @click="back" style="display:none;width:20px;height:20px"></button>
    <el-container class="admin-memu">
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="menuSelect"
        >
          <el-menu-item index="1">
            <i class="el-icon-user"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-star-off"></i>
            <span slot="title">往期</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
   
  </div>
</template>
<script>
import '@/css/common.scss'
export default {
  data () {
    return {}
  },
  mounted () {
    this.$router.push({path: '/admin/userManager'})
  },
  methods: {
    back () {
      this.$router.push({ path: '/' })
    },
    menuSelect (key) {
      switch (key) {
        case '1':
          this.$router.push({path: '/admin/userManager'})
          break
        case '2':
          this.$router.push({path: '/admin/LotterySetting'})
          break
        case '3':
          this.$router.push({path: '/admin/PastDraw'})
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss">
.top-bar {
  background: #52b7ff;
}
.admin-manager {
  position: fixed;
  top: 51px;
  bottom: 0;
  left: 0;
  right: 0;
}
.admin-memu{
  height:100%;
  .el-aside{
    border-right: 1px solid #e6e6e6;
    .el-menu{
      border:none;
    }
  }
}
</style>