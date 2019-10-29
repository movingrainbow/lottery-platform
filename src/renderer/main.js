import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import toIndexedDB from './util/util'
Vue.use(ElementUI)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
// eslint-disable-next-line new-cap
let createdIndexedDB = new toIndexedDB('lottery')
let tableArr = [
  {
    tableName: 'userManager',
    indexKeyArr: [{
      name: 'JobNumber',
      unique: true
    }]
  },
  {
    tableName: 'pastdraw',
    indexKeyArr: [{
      name: 'lotteryName',
      unique: true
    }]
  },
  {
    tableName: 'lotterysetting',
    indexKeyArr: [{
      name: 'lotteryName',
      unique: true
    }]
  }
]
createdIndexedDB.initDB(tableArr)
createdIndexedDB.addTableData('userManager', {
  id: 1,
  phone: 'admin',
  name: 'admin',
  JobNumber: 'admin',
  department: 'admin'
})
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
