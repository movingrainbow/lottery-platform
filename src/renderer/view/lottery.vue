<template>
  <div>
    <div class="lottery-name-content">
      {{lotteryName}}
    </div>
    <div class="lottery-content">
      <div class="lottery-award-content">
        <ul>
          <li v-for="(award,index) in lotterySetting.awardList" :key="index">
              <span>{{award.awardName}}</span>
              <span>{{award.award}}</span>
              <span>{{award.awardNumber}}</span>
            </li>
        </ul>
      </div>
      <div class="lottery-turntable-content">
        <div class="lottery-turntable">
          <ul>
            <li v-for="(liBgColor,index) in liArr" :key="index" :style="{background:liBgColor}"></li>
          </ul>
          <div class="outside-turntable-bg">

          </div>
          <div class="inside-turntable-bg">
            <div class="turntableBtn">
              <el-button type="primary" @click="toLottery" round v-show="!isLoadingAward">{{currentAwardName}}</el-button>
              <span style="cursor:pointer" :class="afterAward" @click="stoplottery" v-show="isLoadingAward">{{awardUser.name}}</span>
            </div>
          </div>
        </div>
        
      </div>
      <div class="lotteried-user-content">
        <ul ref="awardUser">
          <li v-for="(awardUser,index) in awardUserList" :key="index">
            <span>{{awardUser.name}}</span>
            <span>{{awardUser.phone}}</span>
            <span>{{awardUser.award}}</span>
          </li>
          </ul>
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
      isLoadingAward: false,
      liArr: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
      lotteryInterval: null,
      awardUser: '',
      afterAward: '',
      userData: '',
      hasChooseUsers: [],
      awardUserList: [],
      lotterySetting: '',
      currentAwardName: '',
      awardList: [],
      lotteryThrottle: null,
      lotteryName: '',
      ChooseUsers: []
    }
  },
  created () {
    let lotterySettingData = null
    let lotteryID = parseInt(this.$route.query.lotteryid)
    toIndexedDBClass.readAllTableData('userManager').then((res) => {
      if (res) {
        this.userData = res
      }
    }).then(() => {
      toIndexedDBClass.readDBData('lotterysetting', lotteryID).then((res) => {
        if (res) {
          lotterySettingData = res
          this.lotterySetting = res
        }
      }).then(() => {
        if (lotterySettingData) {
          this.lotteryName = lotterySettingData.lotteryName
          this.userData.forEach((value) => {
            if (lotterySettingData.UserchooseID.indexOf(value.id) > -1) {
              this.hasChooseUsers.push(value)
              this.ChooseUsers.push(value)
            }
          })
          lotterySettingData.awardList.forEach((value) => {
            let obj = {}
            obj.awardName = value.awardName
            obj.awardNumber = value.awardNumber
            obj.remainAwardNumber = value.awardNumber
            this.awardList.push(obj)
          })
          this.currentAwardName = this.awardList[0].awardName
        } else {
          this.$message.error('已过期')
        }
      })
    })
  },
  methods: {
    turnbgCircleBg () {
      if (this.hasChooseUsers.length > 0 && this.currentAwardName !== '抽光了') {
        this.isLoadingAward = true
        this.lotteryInterval = setInterval(() => {
          this.liArr = []
          let len = this.hasChooseUsers.length
          let index = Math.floor(Math.random() * len)
          this.awardUser = this.hasChooseUsers[index]
          for (let i = 0; i < 9; i++) {
            this.liArr.push(this.randomColor())
          }
        }, 50)
      } else {
        this.$message.error('无人可抽或者奖品已抽完')
      }
    },
    randomColor () {
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)
      return `rgb(${r},${g},${b})`
    },
    toLottery () {
      this.turnbgCircleBg()
    },
    stoplottery () {
      if (!this.lotteryThrottle) {
        this.lotteryThrottle = setTimeout(() => {
          this.lotteryThrottle = null
          this.isLoadingAward = false
          let nowAwardIndex = -1
          this.awardUser.award = this.currentAwardName
          this.awardList.every((value, index) => {
            if (value.remainAwardNumber > 0) {
              this.awardList[index].remainAwardNumber -= 1
              nowAwardIndex = (this.awardList[index].remainAwardNumber > 0) ? index : index + 1
              return false
            } else {
              return true
            }
          })
          this.hasChooseUsers.forEach((value, index) => {
            if (value.id === this.awardUser.id) {
              this.hasChooseUsers.splice(index, 1)
            }
          })
          this.awardUserList.push(this.awardUser)
          if (nowAwardIndex >= 0 && nowAwardIndex < this.awardList.length) {
            this.currentAwardName = this.awardList[nowAwardIndex].awardName
          } else {
            let obj = {
              id: this.lotterySetting.id,
              lotteryName: this.lotteryName,
              ChooseUsers: this.ChooseUsers,
              awardUserList: this.awardUserList
            }
            this.currentAwardName = '抽光了'
            toIndexedDBClass.addTableData('pastdraw', obj).then((res) => {
            })
            toIndexedDBClass.deleteTableData('lotterysetting', obj.id).then((res) => {

            })
          }
        }, 5000)
        window.clearInterval(this.lotteryInterval)
      }
    }
  }
}
</script>
<style lang="scss">
@mixin turnbg($bg,$width,$height){
  position:absolute;
  width:$width;
  height:$height;
  border-radius: 50%;
  background:$bg;
}
@mixin absoluteCenter($width){
  left:50%;
  margin-left:-($width)
}
ul{
  list-style:none;
}
.lottery-name-content{
  height: 36px;
  line-height: 36px;
  font-size: 25px;
  text-align: center
}
.lottery-content{
  overflow: hidden;
  display: flex;
}
.lottery-award-content,.lottery-turntable-content,.lotteried-user-content{
  position: relative;
  height: 500px;
  padding-top:50px;
  border:1px solid #ddd;
  text-align: center;
}
.lottery-award-content{
  left:0;
  width:300px;
}
.lotteried-user-content{
 width:300px;
}
.lottery-turntable-content{
  flex:1;
  margin:auto;
}

.lottery-turntable-content ul{
  position:relative;
  width:300px;
  border-radius:50%;
  li{
    background:#fff;
    position:absolute;
    left:185px;
    width:20px;
    height:20px;
    @include absoluteCenter(10px);
    border-radius:50%;
    transform-origin:12px 148px;
    z-index: 2
  };
  @for $i from 1 through 8 {
    li:nth-child(#{$i}) {
     transform: rotate(45deg * $i);
     }
  }
}
.outside-turntable-bg{
  @include turnbg(red,300px ,300px );
  top:48px;
  @include absoluteCenter(150px);
  z-index: 1
}
.inside-turntable-bg{
  @include turnbg(#fff,230px ,230px );
  @include absoluteCenter(115px);
  top: 83px;
  z-index: 1;
}
.turntableBtn{
  line-height: 230px;
}
.lottery-turntable{
  width:300px;
  margin:auto;
}
</style>