<template>
  <div>
    <div class="common-operate">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddUser" plain>添加</el-button>
    </div>
    <table class="common-table" cellspacing="0" cellpadding="0" border="0">
      <thead>
        <tr>
          <th>姓名</th>
          <th>联系方式</th>
          <th>工号</th>
          <th>部门</th>
          <th>操作</th>
        </tr>  
      </thead>
      <tbody>
        <tr v-for="(data,index) in staffData" :key=index>
          <td width="20%">{{data.name}}</td>
          <td width="20%">{{data.phone}}</td>
          <td width="20%">{{data.JobNumber}}</td>
          <td width="20%">{{data.department}}</td>
          <td width="20%">
            <el-button
              size="mini"
              @click="handleEditUser(data.id)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="data.id===1"
              @click="handleDeleteUser(data)">删除
            </el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog
      title="添加人员"
      :visible.sync="userAddDialogVisible"
      width="30%"
      :modal="false"
      :destroy-on-close="true"
      center>
      <el-form label-position="right" label-width="80px" :model="formUser" ref="userInfo">
        <el-form-item label="姓名"
        :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
        prop="name"
        >
          <el-input v-model="formUser.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" 
        :rules="{ required: true, message: '请输入联系方式', trigger: 'blur' }"
        prop="phone"
        >
          <el-input v-model="formUser.phone"></el-input>
        </el-form-item>
        <el-form-item label="工号" 
        :rules="{ required: true, message: '请输入工号', trigger: 'blur' }"
        prop="JobNumber"
        >
          <el-input v-model="formUser.JobNumber"></el-input>
        </el-form-item>
         <el-form-item label="部门" 
         :rules="{ required: true, message: '请输入部门', trigger: 'blur' }"
         prop="department"
         >
          <el-input v-model="formUser.department"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userAddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureHandleAddUser(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
   
</template>

<script>
import toIndexedDB from '@/util/util'
// eslint-disable-next-line new-cap
const toIndexedDBClass = new toIndexedDB('lottery')
export default {
  data () {
    return {
      staffData: [],
      formUser: {
        id: '',
        name: '',
        phone: '',
        JobNumber: '',
        department: ''
      },
      userAddDialogVisible: false,
      isAddUser: true
    }
  },
  created () {
    toIndexedDBClass.readAllTableData('userManager').then((res) => {
      if (res) {
        this.staffData = res
      }
    })
  },
  methods: {
    handleDeleteUser (data) {
      toIndexedDBClass.deleteTableData('userManager', data.id).then((res) => {
        if (res) {
          this.staffData.forEach((value, index) => {
            if (value.id === data.id) {
              this.staffData.splice(index, 1)
            }
          })
        }
      })
    },
    handleEditUser (id) {
      this.isAddUser = false
      this.staffData.forEach((value, index) => {
        if (value.id === id) {
          this.formUser = {
            id: value.id,
            name: value.name,
            phone: value.phone,
            JobNumber: value.JobNumber,
            department: value.department
          }
        }
      })
      this.userAddDialogVisible = true
    },
    handleAddUser () {
      this.isAddUser = true
      this.userAddDialogVisible = true
      this.formUser = {
        name: '',
        phone: '',
        JobNumber: '',
        department: ''
      }
    },
    sureHandleAddUser () {
      this.$refs['userInfo'].validate((valid) => {
        if (valid) {
          let isSuccess = false
          let editUserPromise
          if (this.isAddUser === true) {
            let nowTime = new Date().getTime()
            this.formUser.id = nowTime
            editUserPromise = toIndexedDBClass.addTableData('userManager', this.formUser).then((res) => {
              if (res) {
                isSuccess = true
                this.staffData.push(this.formUser)
              }
            })
          } else {
            editUserPromise = toIndexedDBClass.updateTableData('userManager', this.formUser).then((res) => {
              if (res) {
                this.userAddDialogVisible = false
                isSuccess = true
                let $this = this
                this.staffData.forEach((value, index) => {
                  if (value.id === $this.formUser.id) {
                    this.$set(this.staffData, index, $this.formUser)
                  }
                })
              }
            })
          }
          editUserPromise.then(() => {
            if (isSuccess === true) {
              this.$message({
                message: '设置成功',
                type: 'success'
              })
            } else {
              this.$message.error('添加失败,可能存在工号相同的员工')
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.common-operate{
  margin-bottom: 10px;
}
</style>