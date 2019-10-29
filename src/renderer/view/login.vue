<template>
  <div class="lottery-user-login">
    <div class="user-login-input">
      <el-input
        class="login-user-name"
        prefix-icon="el-icon-user"
        placeholder="请输入用户名"
        v-model="userName"
        clearable
      ></el-input>
      <el-input
        class="login-password"
        prefix-icon="el-icon-s-cooperation"
        placeholder="请输入密码"
        v-model="password"
        show-password
      ></el-input>
      <el-select :disabled="userTypeRadio==='1'" class="lotteryNameChoose" v-model="lotteryID" placeholder="请选择抽奖名称">
        <el-option
          v-for="item in lotteryOptions"
          :key="item.id"
          :label="item.lotteryName"
          :value="item.id">
        </el-option>
      </el-select>
      <div class="userTypeRadio">
        <el-radio v-model="userTypeRadio" label="1">管理</el-radio>
        <el-radio :disabled="lotteryOptions.length==0" v-model="userTypeRadio" label="2">抽奖</el-radio>
      </div>
      
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
import toIndexedDB from '@/util/util'
// eslint-disable-next-line new-cap
const toIndexedDBClass = new toIndexedDB('lottery')
export default {
  data () {
    return {
      userName: '',
      password: '',
      lotteryOptions: [],
      lotteryID: '',
      userTypeRadio: '1'
    }
  },
  created () {
    toIndexedDBClass.readAllTableData('lotterysetting').then((res) => {
      if (res && res.length > 0) {
        this.lotteryOptions = res
        this.lotteryID = res[0].id
      }
    })
  },
  methods: {
    login () {
      toIndexedDBClass.readDBData('userManager', 1).then((res) => {
        if (res && this.userName === res.name && this.password === res.JobNumber) {
          if (this.userTypeRadio === '1') {
            this.$message({
              message: '登录成功',
              type: 'success',
              onClose: () => {
                this.$router.push({path: '/admin'})
              }
            })
          } else {
            this.$message({
              message: '登录成功',
              type: 'success',
              onClose: () => {
                this.$router.push({path: '/lottery', query: {lotteryid: this.lotteryID}})
              }
            })
          }
        } else {
          this.$message.error('密码或用户名错误')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.lottery-user-login{
    position:fixed;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    background-color: #FA8BFF;
    background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);

}
.user-login-input{
    position:absolute;
    width:468px;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    text-align: center;
}
.login-user-name,.login-password {
    margin:20px 0;
}
.lotteryNameChoose{
  width:100%;
  @extend .login-user-name
}
.userTypeRadio{
  width:100%;
  margin:10px 0 20px;
  height: 30px;
}
</style>