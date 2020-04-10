<template>
  <div id="header">
    <nav id="navStyle">
      <div id="div1"><img src="../assets/image/navIcon.jpg"></div>
      <div id="div2">
        <ul id="ul1">
          <router-link to="/" style="text-decoration: none">
            <li class="liHover">发现</li>
          </router-link>
          <router-link to="/diseasepage" style="text-decoration: none">
            <li class="liHover">疾病百科</li>
          </router-link>
          <li class="liHover">
            <el-dropdown class="el-dropdown">
              <span  class="el-dropdown-link">
                <router-link :to="{path:'/messagepage',query:{mes:'commentmsg'}}" style="text-decoration: none">
                  <span class="el-dropdown-link spanStyle" style="color: #969696" v-show="isLogin">
                    消息<span class="isDot" v-if="messageSum != 0">{{ messageSum }}</span>
                  </span>
                </router-link>
              </span>
              <el-dropdown-menu slot="dropdown" class="dropDown">
                <router-link :to="{path:'/messagepage',query: {mes:'commentmsg'}}" style="text-decoration: none">
                  <el-dropdown-item icon="el-icon-plus" class="dropDownLi" id="dropDownLi1">评论<span class="isDotLi" v-if="commentSum != 0">{{ commentSum }}</span></el-dropdown-item>
                </router-link>
                <router-link :to="{path:'/messagepage',query: {mes:'mailtime'}}" style="text-decoration: none">
                  <el-dropdown-item icon="el-icon-circle-plus" class="dropDownLi" id="dropDownLi2">简信<span class="isDotLi" v-if="mailtimeSum != 0">{{ mailtimeSum }}</span></el-dropdown-item>
                </router-link>
                <router-link :to="{path:'/messagepage',query: {mes:'like'}}" style="text-decoration: none">
                  <el-dropdown-item icon="el-icon-circle-plus-outline" class="dropDownLi" id="dropDownLi3">喜欢和赞<span class="isDotLi" v-if="likeSum != 0">{{ likeSum }}</span></el-dropdown-item>
                </router-link>
                <el-dropdown-item icon="el-icon-check" class="dropDownLi" id="dropDownLi4">收藏<span class="isDotLi" v-if="collectSum != 0">{{ collectSum }}</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li>
              <div id="search">
                <input type="text" placeholder="搜索" name="keyword" v-model="searchKey">
                <router-link :to="{path:'/searchpage',query:{Key:searchKey}}">
                  <button class="btn"></button>
                </router-link>
              </div>
          </li>
        </ul>
      </div>
      <div id="div3">
        <ul id="ul2">
          <router-link to="/login" style="text-decoration: none"><li class="liHover" v-show="!isLogin">登录</li></router-link>
          <router-link to="/register" style="text-decoration: none"><li class="liHover" v-show="!isLogin">注册</li></router-link>
          <li class="liHover " v-show="isLogin">
            <el-dropdown class="el-dropdown">
              <span class="el-dropdown-link">
                <img :src="mediaUrl+avatar" class="imgStyle" />
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown" class="dropDown">
                  <router-link :to="{path:'/homepage',query:{id:userId}}" style="text-decoration: none">
                    <el-dropdown-item icon="el-icon-plus" class="dropDownLi" id="dropDownLi1">我的主页</el-dropdown-item>
                  </router-link>
                  <router-link to="/personalinformationpage" style="text-decoration: none">
                    <el-dropdown-item icon="el-icon-circle-plus" class="dropDownLi" id="dropDownLi2">个人信息</el-dropdown-item>
                  </router-link>
                  <router-link to="/releasepage" style="text-decoration: none">
                    <el-dropdown-item icon="el-icon-circle-plus-outline" class="dropDownLi" id="dropDownLi3">发表动态</el-dropdown-item>
                  </router-link>
                  <div @click="exit">
                    <el-dropdown-item icon="el-icon-check" class="dropDownLi" id="dropDownLi4">退出</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
    export default {
        name: "headerNav",
        data(){
          return{
            mediaUrl: sessionStorage.mediaUrl,
            userId:'',
            messageSum:0,
            commentSum:0,
            mailtimeSum:0,
            likeSum:0,
            collectSum:0,
            searchKey:'',
            avatar:'',
          }
        },
        created(){
          this.$socket.on('likeDot',(msg) => {
            msg = JSON.parse(msg);
            if(msg[0].userId == sessionStorage.getItem('userId')){
              this.likeSum = msg[0]['COUNT(*)'];
              this.messageSum = this.likeSum + this.commentSum + this.mailtimeSum + this.collectSum;
            }
          });
          this.$socket.on('collectDot',(msg) => {
            msg = JSON.parse(msg);
            if(msg[0].userId == sessionStorage.getItem('userId')){
              this.collectSum = msg[0]['COUNT(*)'];
              this.messageSum = this.likeSum + this.commentSum + this.mailtimeSum + this.collectSum;
            }
          });
          if(sessionStorage.getItem("userId")){
            this.axios.post('msgSum',{promulgatorId:sessionStorage.getItem("userId")}).then(res => {
              // console.log(res.data);
              this.likeSum = res.data.likeSum;
              this.commentSum = res.data.commentSum;
              this.messageSum = this.likeSum + this.commentSum + this.mailtimeSum + this.collectSum;
            })
          };
        },
        methods:{
          exit(){
            this.$store.dispatch("setUser",'');
            this.$router.push({path:'/'});
          },
        },
        computed:{
          //判断是否登录
          isLogin(){
            //通过sessionstorage获取vuex里的isLogin的状态
            if (sessionStorage.getItem("userId")) {
              this.$store.commit("userStatus",sessionStorage.getItem("userId"));
              this.userId = sessionStorage.getItem("userId");
              this.axios.post('/usermessage',{userid:sessionStorage.getItem('userId')}).then(res=>{
                // console.log(JSON.parse(res.request.responseText));
                this.avatar = JSON.parse(res.request.responseText)[0].avatar;
                // console.log(this.avatar);
              })
            }else {
              this.$store.commit("userStatus",'');
            }
            return this.$store.getters.isLogin;
          },
        }
    }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
  }
  /*头部样式*/
  #header {
    height: 56px;
    width: 100%;
    box-sizing: border-box;
    background-color: #FFFFFF;
    border-bottom: 1px solid #f0f0f0;
    position: fixed;
    top: 0;
    z-index: 999;
  }
  #navStyle {
    margin: 0 150px;
    display: flex;
    flex-direction: row;
  }
  #ul1,
  #ul2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 55px;
    margin-left: 30px;
  }
  #ul1 {
    justify-content: flex-start;
  }
  #div2 {
    width: 600px;
  }
  li,.spanStyle {
    color: #969696;
    font-size: 17px;
    padding: 0 15px;
    list-style: none;
    height: 55px;
    line-height: 55px;
  }
  /*小浮点*/
  .isDot {
    background-color: #F56C6C;
    height: 19px;
    width: 30px;
    text-align: center;
    line-height: 19px;
    font-size: 13px;
    color: #FFFFFF;
    border-radius: 13px;
    margin: -20px -20px 0 0;
  }
  .isDotLi {
    background-color: #F56C6C;
    height: 19px;
    width: 30px;
    text-align: center;
    line-height: 19px;
    font-size: 13px;
    color: #FFFFFF;
    border-radius: 13px;
    margin: -20px -20px 0 10px;
    padding: 1px 5px 1px 5px;
  }
  .liHover:hover {
    cursor: pointer;
    background-color: #EEEEEE;
    color: #000000;
  }
  #search {
    border: none;
    outline: none;
    background: #EEEEEE;
    border-radius: 40px;
    height: 40px;
    margin-top: 8px;
    display: flex;
    justify-content: center;
  }
  input, button {
    border: none;
    outline: none;

  }
  .btn {
    height: 40px;
    width: 40px;
    line-height: 55px;
    cursor: pointer;
    border-radius: 40px;
  }
  input[type = 'text'] {
    width: 130px;
    height: 40px;
    background: #EEEEEE;
    transition: 0.3s linear;
    margin-left: 25px;
  }
  input[type = 'text']:focus {
    width: 200px;
  }
  .btn {
    background-image: url("../assets/image/search.png");
    background-repeat: no-repeat;
    right: 20px;
  }
  /*右边个人中心样式*/
  .el-dropdown {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    display: flex;
    align-items: center;
  }
  .el-icon-arrow-down {
    font-size: 20px;
    color: #aaaaaa;
  }
  .imgStyle {
    height: 45px;
    width:45px;
    border-radius: 50%;
    margin-top: 4px;
  }
  /*下拉菜单*/
  .dropDown {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .dropDownLi {
    width: 150px;
    height: 55px;
    line-height: 45px;
    color: #000000;
    font-size: 16px;
  }
  .dropDownLi:hover {
    background-color: #EEEEEE;
    color: #000000;
  }
</style>
