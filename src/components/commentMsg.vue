<template>
    <div id="commentBox" class="commentBox">
      <p id="commentP" class="commentP">收到的评论</p>
      <div id="commentLi" class="commentLi" v-for="(item,i) in commentLiObj" :key="i">
        <div id="liShow" class="liShow">
          <div id="liImg" class="liImg" :style="'background-image: url('+ mediaUrl+item.avatar +')'"></div>
          <router-link :to="{path:'/dynamicpage',query:{id:item.dynamic_id}}" style="text-decoration: none">
            <div id="liMsg" class="liMsg">
            <p id="liP" class="liP">{{ item.username }}</p>
            <p id="liComment" class="liComment">评论：{{ item.content }}</p>
          </div>
          </router-link>
          <div id="liTime" class="liTime">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">{{ item.time }}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><i class="el-icon-delete"></i>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div id="bottomBox" class="bottomBox" ></div>
    </div>
</template>

<script>
    export default {
        name: "commentMsg",
        data(){
          return{
            mediaUrl: sessionStorage.mediaUrl,
            commentLiObj:[],

          }
        },
        created() {
          this.axios.post('/msgComment',{promulgatorId:sessionStorage.getItem('userId')})
            .then(res => {
              this.commentLiObj = JSON.parse(res.request.responseText);
            })
        }
    }
</script>

<style scoped>
  .commentBox {
    display: flex;
    flex-direction: column;
  }
  .commentP {
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
