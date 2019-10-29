class toIndexedDB {
  constructor (dbName) {
    this.dbName = dbName
  }
  openDB () {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.dbName)
      request.onerrer = (e) => {
        resolve(false)
      }
      request.onsuccess = (e) => {
        this.db = request.result
        resolve(true)
      }
    })
  }
  initDB (tableNameArr) {
    let request = window.indexedDB.open(this.dbName)
    request.onerrer = (e) => {
      return false
    }
    request.onsuccess = (e) => {
    }
    request.onupgradeneeded = (e) => {
      let thisDB = e.target.result
      if (tableNameArr && Array.isArray(tableNameArr)) {
        tableNameArr.forEach((table, index) => {
          if (!thisDB.objectStoreNames.contains(table.tableName)) {
            let ojectStore = thisDB.createObjectStore(table.tableName, {keyPath: 'id'})
            if (table.indexKeyArr && Array.isArray(table.indexKeyArr)) {
              table.indexKeyArr.forEach((key, index) => {
                ojectStore.createIndex(key.name, key.name, {unique: key.unique})
              })
            }
          }
        })
      }
    }
  }
  async addTableData (tableName, data) {
    await this.openDB()
    return new Promise((resolve) => {
      let request = this.db.transaction([tableName], 'readwrite')
        .objectStore(tableName)
        .add(data)
      request.onsuccess = (e) => {
        resolve(true)
      }
      request.onerror = (e) => {
        resolve(false)
      }
    })
  }
  async readDBData (tableName, index) {
    await this.openDB()
    return new Promise((resolve) => {
      let request = this.db.transaction([tableName])
        .objectStore(tableName)
        .get(index)
      request.onsuccess = (e) => {
        resolve(request.result)
      }
      request.onerror = (e) => {
        resolve(false)
      }
    })
  }
  async readAllTableData (tableName) {
    await this.openDB()
    let cursorArr = []
    return new Promise((resolve) => {
      let request = this.db.transaction([tableName])
        .objectStore(tableName)
        .openCursor()
      request.onsuccess = (e) => {
        let cursor = e.target.result
        if (cursor) {
          let obj = cursor.value
          obj.id = cursor.key
          cursorArr.push(obj)
          cursor.continue()
        } else {
          resolve(cursorArr)
        }
      }
      request.onerrer = (e) => {
        resolve(false)
      }
    })
  }
  async updateTableData (tableName, updateData) {
    await this.openDB()
    return new Promise((resolve) => {
      let request = this.db.transaction([tableName], 'readwrite')
        .objectStore(tableName)
        .put(updateData)
      request.onsuccess = (e) => {
        resolve(true)
      }
      request.onerrer = (e) => {
        resolve(false)
      }
      // 主键与其他数据相同时无法插入时，发现不走onerrer，promise一直为pending，五秒无数据返回时返回false
      setTimeout(() => {
        resolve(false)
      }, 5000)
    })
  }
  async deleteTableData (tableName, deleteKey) {
    await this.openDB()
    return new Promise((resolve) => {
      let request = this.db.transaction([tableName], 'readwrite')
        .objectStore(tableName)
        .delete(deleteKey)
      request.onsuccess = (e) => {
        resolve(true)
      }
      request.onerrer = (e) => {
        resolve(false)
      }
    })
  }
}
export default toIndexedDB
