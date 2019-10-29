<template>
<div>
  <div class="pastDrawTableContent" v-if="pastdraw.length>0">
   <p>已过期</p>
   <div class="pastDraw-table">
   <table class="common-table" cellspacing="0" cellpadding="0" border="0">
      <thead>
        <tr>
          <th width="20%">抽奖名称</th>
          <th width="20%">参与人员</th>
          <th width="20%">中奖人员</th>
          <th width="20%">创建时间</th>
          <th width="20%">操作</th>
        </tr>  
      </thead>
    </table>
    <div class="pastdraw-tbody">
      <table class="common-table tbodyTable">
        <tbody>
          <tr v-for="(pastdrawData,index) in pastdraw" :key=index>
            <td width="20%">{{pastdrawData.lotteryName}}</td>
            <td width="20%">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
              <div class="popoverDiv">
                  <p v-for="(ChooseUser,j) in pastdrawData.ChooseUsers" :key="j">
                    <span>{{ChooseUser.name}}</span>
                    <span>{{ChooseUser.JobNumber}}</span>
                  </p>
              </div>
                <el-button slot="reference">{{pastdrawData.ChooseUsers.length}}人</el-button>
              </el-popover>
            </td>
            <td width="20%">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
              <div class="popoverDiv"> 
                  <p v-for="(awardUser,index) in pastdrawData.awardUserList" :key="index">
                    <span>{{awardUser.name}}</span>
                    <span>{{awardUser.JobNumber}}</span>
                    <span>{{awardUser.award}}</span>
                  </p>
              </div>
                <el-button slot="reference">{{pastdrawData.awardUserList.length}}人</el-button>
              </el-popover>
            </td>
            <td width="20%">{{new Date(pastdrawData.id).getFullYear()+"-"+(new Date(pastdrawData.id).getMonth()+1)+"-"+new Date(pastdrawData.id).getDate()}}</td>
            <td width="20%">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(1,index,pastdrawData.id)">删除
              </el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   </div>
  </div>
  <div class="pastDrawTableContent" v-if="notPastDraw.length>0">
   <p>未开始</p>
   <div class="pastDraw-table">
   <table class="common-table" cellspacing="0" cellpadding="0" border="0">
      <thead>
        <tr>
          <th width="20%">抽奖名称</th>
          <th width="20%">参与人员</th>
          <th width="20%">奖项设置</th>
          <th width="20%">创建时间</th>
          <th width="20%">操作</th>
        </tr>  
      </thead>
    </table>
    <div class="pastdraw-tbody">
      <table class="common-table tbodyTable">
        <tbody>
          <tr v-for="(notPastData,index) in notPastDraw" :key=index>
            <td width="20%">{{notPastData.lotteryName}}</td>
            <td width="20%">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
              <div class="popoverDiv">
                  <p v-for="(ChooseUser,index) in notPastData.chooseUsers" :key="index">
                    <span>{{ChooseUser.name}}</span>
                    <span>{{ChooseUser.JobNumber}}</span>
                  </p>
              </div>
                <el-button slot="reference">{{notPastData.chooseUsers.length}}人</el-button>
              </el-popover>
            </td>
            <td width="20%">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
              <div class="popoverDiv">
                  <p v-for="(award,j) in notPastData.awardList" :key="j">
                    <span>{{award.award}}</span>
                    <span>{{award.awardName}}</span>
                    <span>{{award.awardNumber}}个</span>
                  </p>
              </div>
                <el-button slot="reference">{{notPastData.awardList.length}}个</el-button>
              </el-popover>
            </td>
            <td width="20%">{{new Date(notPastData.id).getFullYear()+"-"+(new Date(notPastData.id).getMonth()+1)+"-"+new Date(notPastData.id).getDate()}}</td>
            <td width="20%">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(2,index,notPastData.id)">删除
              </el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
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
      pastdraw: [],
      notPastDraw: []
    }
  },
  created () {
    toIndexedDBClass.readAllTableData('pastdraw').then((res) => {
      if (res) {
        this.pastdraw = res
      }
    })
    let userData = null
    let chooseUsers = []
    let lotterySettingData = []
    toIndexedDBClass.readAllTableData('userManager').then((res) => {
      if (res) {
        userData = res
      }
    }).then(() => {
      toIndexedDBClass.readAllTableData('lotterysetting').then((res) => {
        if (res) {
          lotterySettingData = res
          this.notPastDraw = res
          lotterySettingData.forEach((lotterySetting, index) => {
            chooseUsers = []
            userData.forEach((user) => {
              if (lotterySettingData[index].UserchooseID.indexOf(user.id) > -1) {
                chooseUsers.push(user)
              }
            })
            this.notPastDraw[index].chooseUsers = chooseUsers
          })
        }
      })
    })
  },
  methods: {
    handleDelete (type, index, id) {
      if (type === 1) {
        toIndexedDBClass.deleteTableData('pastdraw', id).then((res) => {
          if (res) {
            this.pastdraw.splice(index, 1)
          }
        })
      } else {
        toIndexedDBClass.deleteTableData('lotterysetting', id).then((res) => {
          if (res) {
            this.notPastDraw.splice(index, 1)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.popoverDiv{
  max-height: 200px;
  white-space:nowrap;
  overflow:auto;
  padding:12px;
  text-align: center;
}
.el-popover{
  padding:0;
}
.pastDrawTableContent{
  text-align: center;
  p{
    line-height: 30px;
    color:chocolate;
  }
  .pastDraw-table{
    border:1px solid #ebeef5;
    .common-table {
      border:none;
      border-bottom: 1px solid #ebeef5;
    }
    .tbodyTable{
      border:none;
    }
  }
  .pastdraw-tbody{
    width:100%;
    max-height: 200px;
    overflow:scroll;
    table{
      border:none
    }
  }
}

</style>