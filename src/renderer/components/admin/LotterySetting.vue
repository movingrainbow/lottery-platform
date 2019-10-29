<template>
  <div class="lottery-setting">
    <el-steps :active="stepActive" finish-status="success" simple>
      <el-step title="抽奖名称"></el-step>
      <el-step title="奖项设置"></el-step>
      <el-step title="参与人员"></el-step>
    </el-steps>
    <div class="lottery-setting-content">
      <div class="lottery-name-setting" v-show="stepActive==0">
        <el-input v-model="lotteryName" placeholder="请输入抽奖名称"></el-input>
      </div>
      <div class="lottery-award-setting" v-show="stepActive==1">
        <div class="lottery-award-inputs-setting">
          <div class="lottery-award-input-list">
            奖品名称:
            <el-input class="lottery-award-input-setting" placeholder="请输入奖品名称,如一等奖" v-model="awardName"></el-input>
          </div>
          <div class="lottery-award-input-list">
            奖&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品:
            <el-input class="lottery-award-input-setting" placeholder="请输入奖品,如电脑" v-model="award"></el-input>
          </div>
          <div class="lottery-award-input-list">
            奖品数量:
            <el-input-number v-model="awardNumber" :min="1"></el-input-number>
          </div>
          <el-button @click="handleAddAward" class="add-award-comfir" type="text">确定</el-button>
        </div>
        <div class="lottery-award-finish-setting">
          <ul>
            <li v-for="(awardData,index) in awardList" :key="index">
              <span class="margin5">{{awardData.awardName}}</span>
              <span class="margin5">{{awardData.award}}</span>
              <span class="margin5">{{awardData.awardNumber}}个</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="lottery-user-setting" v-show="stepActive==2">
        <el-transfer class="lottery-user-choose-setting" v-model="UserchooseID" :data="userData" :titles="['可选人员', '参与人员']" ></el-transfer>
      </div>
    </div>
    <div class="button-step">
      <el-button-group>
        <el-button :disabled="stepActive==0" type="primary" icon="el-icon-arrow-left" @click="stepClick('prestep')">上一步</el-button>
        <el-button :disabled="stepActive==2" type="primary" @click="stepClick('nextstep')">
          下一步
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
        <el-button type="primary" @click="stepComfir">完成</el-button>
      </el-button-group>
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
      stepActive: 0,
      lotteryName: '',
      user: [],
      UserchooseID: [],
      awardName: '',
      award: '',
      awardNumber: 1,
      awardList: []
    }
  },
  computed: {
    userData () {
      let userArr = []
      this.user.forEach((value) => {
        let obj = {}
        obj.label = value.name
        obj.key = value.id
        obj.disabled = false
        userArr.push(obj)
      })
      return userArr
    }
  },
  created () {
    toIndexedDBClass.readAllTableData('userManager').then((res) => {
      if (res) {
        this.user = res
      }
    })
  },
  methods: {
    stepClick (type) {
      if (type === 'prestep' && this.stepActive > 0) {
        this.stepActive--
      } else if (type === 'nextstep' && this.stepActive < 2) {
        this.stepActive++
      }
    },
    handleAddAward () {
      if (this.awardName && this.award && this.awardNumber > 0) {
        let awardObj = {
          awardName: this.awardName,
          award: this.award,
          awardNumber: this.awardNumber
        }
        this.awardList.push(awardObj)
      } else {
        this.$message.error('请填写完整信息')
      }
    },
    stepComfir () {
      let tipWord = null
      if (this.awardList.length === 0) {
        tipWord = '请完成奖项设置'
      } else if (this.lotteryName === '') {
        tipWord = '请填写抽奖名称'
      } else if (this.UserchooseID.length === 0) {
        tipWord = '请选择参与抽奖人员'
      } else {
        let obj = {
          id: new Date().getTime(),
          lotteryName: this.lotteryName,
          awardList: this.awardList,
          UserchooseID: this.UserchooseID
        }
        toIndexedDBClass.addTableData('lotterysetting', obj).then((res) => {
          if (res) {
            this.$message({
              message: '设置成功',
              type: 'success',
              onClose: () => {
                this.stepActive = 0
              }
            })
            this.lotteryName = ''
            this.awardList = []
            this.UserchooseID = []
            this.award = ''
            this.awardName = ''
            this.awardNumber = 1
          } else {
            tipWord = '设置失败，可能存在相同的抽奖名称'
          }
        })
      }
      if (tipWord !== null) {
        this.$message.error(tipWord)
      }
    }
  }
}
</script>
<style lang="scss">
.lottery-setting {
  position: relative;
  height: 100%;
  .lottery-setting-content {
    position: absolute;
    bottom: 40px;
    top: 46px;
    width: 100%;
    overflow: auto;
  }
  .button-step {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    text-align: center;
  }
}
.lottery-name-setting {
  width: 50%;
  margin: 20px auto;
}
.lottery-award-inputs-setting{
  position: absolute;
  left: 0;
  top:10px;
  bottom: 10px;
  display: inline-block;
  width:300px;
  margin-top:10px;
  border:1px solid #ddd;
}
.lottery-award-input-setting{
  width: 215px;
}
.lottery-award-setting{
  position: relative;
  height: 100%;
}
.lottery-award-finish-setting{
  position: absolute;
  right: 0;
  top:10px;
  bottom:10px;
  display: inline-block;
  width:300px;
  border:1px solid #ddd;
}
.lottery-award-input-list{
  margin-top:10px;
  padding-left: 5px;
}
.add-award-comfir{
  display: block;
  margin: auto;
}
.lottery-award-finish-setting{
  ul{
    list-style-type: none;
    text-align: center;
    li{
      height: 20px;
      line-height: 20px;
    }
  }
  overflow: auto;
}
.lottery-user-choose-setting{
  display: block;
  width:500px;
  margin:20px auto;
}
.margin5{
  margin:5px;
}
</style>