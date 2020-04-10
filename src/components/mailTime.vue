<template>
  <div id="mailTimeBox" class="mailTimeBox">
    <p id="mailTimeP" class="mailTimeP">全部简信</p>
    <div id="mailTimeLi" class="mailTimeLi" v-for="(item,i) in commentLiObj" :key="i">
      <router-link to="/dialogboxpage" style="text-decoration: none">
        <div id="liShow" class="liShow">
          <div id="liImg" class="liImg" :style="'background-image: url('+ item.headImg +')'"></div>
          <div id="liMsg" class="liMsg">
            <p id="liP" class="liP">{{ item.name }}</p>
            <p id="liComment" class="liComment">评论：{{ item.content }}</p>
          </div>
          <div id="liTime" class="liTime">
            <el-dropdown trigger="click" class="time">
              <span class="el-dropdown-link">{{ item.time }}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><i class="el-icon-delete"></i>删除会话</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </router-link>
    </div>
    <div id="bottomBox" class="bottomBox" ></div>
  </div>
</template>

<script>
    export default {
        name: "mailTime",
      data(){
        return{
          commentLiObj:[
            {
              headImg:require('../assets/image/userImg.jpg'),
              name:"自由的小鸟",
              time:"2019-03-03 18:12:33",
              content:"如果一个人说喜欢你，请等到他对你百般照顾时再相信",
            },
            {
              headImg:require('../assets/image/userImg.jpg'),
              name:"自由的小鸟",
              time:"2019-03-03 18:12:33",
              content:"如果一个人说喜欢你，请等到他对你百般照顾时再相信",
            },
            {
              headImg:require('../assets/image/userImg.jpg'),
              name:"自由的小鸟",
              time:"2019-03-03 18:12:33",
              content:"如果一个人说喜欢你，请等到他对你百般照顾时再相信",
            },
            {
              headImg:require('../assets/image/userImg.jpg'),
              name:"自由的小鸟",
              time:"2019-03-03 18:12:33",
              content:"如果一个人说喜欢你，请等到他对你百般照顾时再相信",
            },
          ]
        }
      }
    }
</script>

<style scoped>
  .mailTimeBox {
    display: flex;
    flex-direction: column;
  }
  .mailTimeP {
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #EEEEEE;
  }
  .liShow {
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    flex-direction: row;
  }
  .liShow:hover {
    cursor: pointer;
  }
  .liImg {
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 40px;
    margin: 10px 0 10px 10px;
    border: 1px solid #EEEEEE;
  }
  .liMsg {
    display: flex;
    flex-direction: column;
    width: 400px;
  }
  .liP {
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    color: #EA6F5A;
    letter-spacing: 2px;
    margin-left: 10px;
  }
  .liComment {
    font-size: 14px;
    color: #999999;
    margin-left: 10px;
  }
  .liTime {
    padding-top: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #999999;
    font-size: 13px;
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 13px;
  }
  .bottomBox {
    height: 100px;
  }
</style>
