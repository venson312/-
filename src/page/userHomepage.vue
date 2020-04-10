<template>
  <div id="bodyBox">
    <headernav></headernav>
    <div id="mainBox">
      <div id="leftBox">
        <div id="homepageMsg">
          <div id="userImg" :style="'background-image: url('+ mediaUrl +userObj.avatar+')'"></div>
          <div id="userMsg">
            <div id="userName">
              {{ userObj.username }}
            </div>
            <div id="msg">
              <div id="msg1">
                <span>11</span>
                <span id="span1">动态</span>
              </div>
              <div id="msg2">
                <span>22</span>
                <span id="span2">关注</span>
              </div>
              <div id="msg3">
                <span>33</span>
                <span id="span3">粉丝</span>
              </div>
              <div id="msg4">
                <span>44</span>
                <span id="span4">收藏</span>
              </div>
            </div>
          </div>
          <div id="talkConcern" v-if="dynamicUser != userId">
            <div id="talk">
              <router-link :to="{path:'/dialogboxpage',query:{id:this.$route.query.id}}" id="talkSpan">
                <span @click="joinRoom">发简信</span>
              </router-link>
            </div>
            <div>
              <div class="Concern" v-if="attention == 0" @click="follower"><span>+ 关注</span></div>
              <div class="Concern" v-if="attention == 1" @click="noFollower"><span>已关注</span></div>
            </div>

          </div>
        </div>
        <div class="dynamicMsg">
          <div id="tags">
            <div id="tags1" @click.prevent="tagsName='dynamicLi'" @click="light1" ref="light1">
              <i class="el-icon-view"></i>
              <span>动态</span>
            </div>
            <div id="tags2" @click.prevent="tagsName='dynamicLi'" @click="light2" ref="light2">
              <i class="el-icon-bell"></i>
              <span>收藏</span>
            </div>
            <div id="tags3" @click.prevent="tagsName='userCard'" @click="light3" ref="light3">
              <i class="el-icon-star-off"></i>
              <span>关注</span>
            </div>
            <div id="tags4" @click.prevent="tagsName='userCard'" @click="light4" ref="light4">
              <i class="el-icon-circle-check-outline"></i>
              <span>粉丝</span>
            </div>
          </div>
          <div v-show="which == 1">
            <div v-for="(item,i) in dynamicObj1" :key="i">
              <component :is="tagsName" :userMessage="item"></component>
            </div>
          </div>
          <div v-show="which == 2">
            <div v-for="(item,i) in dynamicObj2" :key="i">
              <component :is="tagsName" :userMessage="item"></component>
            </div>
          </div>
          <div v-show="which == 3">
            <div v-for="(item,i) in dynamicObj3" :key="i">
              <component :is="tagsName" :userMessage="item"></component>
            </div>
          </div>
          <div v-show="which == 4">
            <div v-for="(item,i) in dynamicObj4" :key="i">
              <component :is="tagsName" :userMessage="item"></component>
            </div>
          </div>

        </div>
      </div>
      <div id="rightBox">
        <div>
          <form id="selfIntroduction">
            <div id="selfIntroductionP">
              <p>个人介绍</p>
              <p id="editP" @click="flag=true"><i class="el-icon-edit"></i>编辑</p>
            </div>
            <div id="selfIntroductionContent">
              {{ editContent }}
            </div>
            <div v-show="flag">
              <div id="editDiv">
                <textarea name="edit" class="edit" v-model="editContent"></textarea>
              </div>
              <div id="save">
                <input type="submit" value="保存" id="sub">
                <button value="取消" id="but" @click.prevent="cancel">取消</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import headernav from "../components/headerNav"
  import dynamicLi from "../components/dynamicLi"
  import userCard from "../components/userCard"
    export default {
        name: "userHomepage",
        components:{headernav,dynamicLi,userCard,},
        data(){
          return {
              mediaUrl: sessionStorage.mediaUrl,
              //编辑的隐藏和显示
              flag:false,
              editContent:"溜爸，简书签约作者，舞枪弄棒 、舞文弄墨的计算机工程师，梦想老婆孩子热炕头上写故事。溜妈，溜溜的大奶牛，北师大教育学硕士牌的，美国认证正面管教讲师、鼓励咨询师，一点一滴分享育儿经验。",
              //tags 标签页的切换
              tagsName:'dynamicLi',
              userObj:{},
              //动态数据
              dynamicObj1:[],
              dynamicObj2:[],
              dynamicObj3:[],
              dynamicObj4:[],
              which:1,

            dynamicUser:this.$route.query.id,
              userId:sessionStorage.getItem('userId'),
              attention:'',
          }
        },
        methods:{
          //编辑的取消按钮事件
          cancel(){
            this.flag = false;
          },
          //获取用户发布的动态信息、
          getDynamic(){
            this.axios.post('/userDynamic',{
              user_id:this.$route.query.id
            }).then(res => {
              this.dynamicObj1 = JSON.parse(res.request.responseText);
              for (let i of this.dynamicObj1){
                i.image = JSON.parse(i.image);
              }
            })
          },
          //获取用户收藏的动态信息
          getCollect(){
            this.axios.post('/collectDynamic',{
              user_id:this.$route.query.id
            }).then(res => {
              this.dynamicObj2 = JSON.parse(res.request.responseText);
              for (let i of this.dynamicObj2){
                i.image = JSON.parse(i.image);
              }
            })
          },
          //高亮样式
          light1(){
            this.$refs.light1.style.borderBottom ="2px solid #646464";
            this.$refs.light1.style.color = "#646464";
            this.$refs.light2.style.borderBottom ="none";
            this.$refs.light2.style.color = "#969696";
            this.$refs.light3.style.borderBottom ="none";
            this.$refs.light3.style.color = "#969696";
            this.$refs.light4.style.borderBottom ="none";
            this.$refs.light4.style.color = "#969696";
            this.getDynamic();
            this.which = 1;
          },
          light2(){
            this.$refs.light2.style.borderBottom ="2px solid #646464";
            this.$refs.light2.style.color = "#646464";
            this.$refs.light1.style.borderBottom ="none";
            this.$refs.light1.style.color = "#969696";
            this.$refs.light3.style.borderBottom ="none";
            this.$refs.light3.style.color = "#969696";
            this.$refs.light4.style.borderBottom ="none";
            this.$refs.light4.style.color = "#969696";
            this.getCollect();
            this.which = 2;
          },
          light3(){
            this.$refs.light3.style.borderBottom ="2px solid #646464";
            this.$refs.light3.style.color = "#646464";
            this.$refs.light2.style.borderBottom ="none";
            this.$refs.light2.style.color = "#969696";
            this.$refs.light1.style.borderBottom ="none";
            this.$refs.light1.style.color = "#969696";
            this.$refs.light4.style.borderBottom ="none";
            this.$refs.light4.style.color = "#969696";
            this.getFollower();
            this.which = 3;
          },
          light4(){
            this.$refs.light4.style.borderBottom ="2px solid #646464";
            this.$refs.light4.style.color = "#646464";
            this.$refs.light2.style.borderBottom ="none";
            this.$refs.light2.style.color = "#969696";
            this.$refs.light3.style.borderBottom ="none";
            this.$refs.light3.style.color = "#969696";
            this.$refs.light1.style.borderBottom ="none";
            this.$refs.light1.style.color = "#969696";
            this.getBeFollower();
            this.which = 4;
          },
          //获取用户基本信息
          getData(){
            this.axios.post('/usermessage',{
              userid:this.$route.query.id
            }).then(res => {
              this.userObj = JSON.parse(res.request.responseText);
              this.userObj = this.userObj[0];
            });
          },
          joinRoom(){
            this.$socket.emit('joinRoom',{
              senderId:sessionStorage.getItem('userId'),
              receiverId:this.$route.query.id
            })
          },
          //关注和取消关注
          follower(){
            this.axios.post('/follower',{
              followerId:this.userId,
              beFollowerId:this.dynamicUser,
            }).then(res=>{
              this.attention = 1;
            })
          },
          noFollower(){
            this.axios.post('/noFollower',{
              followerId:this.userId,
              beFollowerId:this.dynamicUser,
            }).then(res=>{
              this.attention = 0;
            })
          },
          //关注
          getFollower(){
            this.axios.post('/getFollower',{userId:this.dynamicUser}).then(res=>{
              // console.log(JSON.parse(res.request.responseText));
              this.dynamicObj3 = JSON.parse(res.request.responseText);
              // console.log(this.dynamicObj);
            })
          },
          //粉丝
          getBeFollower(){
            this.axios.post('/getBeFollower',{userId:this.dynamicUser}).then(res=>{
              // console.log(JSON.parse(res.request.responseText));
              this.dynamicObj4 = JSON.parse(res.request.responseText);
              // console.log(this.dynamicObj);
            })
          }
        },
        watch:{
          '$route':'getData',
          '$route':'getDynamic'
        },
        mounted() {
          this.getData();
          this.getDynamic();
          //判断是否已经关注
          this.axios.post('/isFollower',{
            followerId:this.userId,
            beFollowerId:this.dynamicUser,
          }).then(res => {
            let a = JSON.parse(res.request.responseText);
            if(a.length == 0){
              this.attention = 0;
            }else{
              this.attention = 1;
            }
          })
        }
    }
</script>

<style scoped>
  /*布局样式*/
  #mainBox {
    margin: 90px 150px 0 150px;
    display: flex;
    flex-direction: row;
  }
  #leftBox {
    flex: 18;
  }
  #rightBox {
    flex: 7;
  }
  /*leftBox上部信息*/
  #homepageMsg {
    display: flex;
    flex-direction: row;
  }
  #userImg {
    width: 100px;
    height: 100px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 100px;
  }
  #userMsg {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
  #userName {
    font-size: 23px;
    color: #EA6F5A;
    letter-spacing: 2px;
    margin-top: 10px;
  }
  #msg {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    font-size: 16px;
    color: #000000;
  }
  #msg1, #msg2, #msg3, #msg4 {
    display: flex;
    flex-direction: column;
    width: 55px;
    border-right: 1px solid #EEEEEE;
  }
  #msg2, #msg3, #msg4 {
    margin-left: 15px;
  }
  #msg #span1,#msg #span2,#msg #span3,#msg #span4 {
    color: #969696;
  }

  #talkConcern {
    display: flex;
    flex-direction: row;
    margin-left: 80px;
  }
  #talk,
  .Concern {
    height: 100px;
    width: 130px;
    /*line-height: 100px;*/
  }
  #talk span,
  .Concern span {
    display: block;
    width: 90px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    text-align: center;
    margin-top: 40px;
    text-decoration: none;
    border-radius: 40px;
    border: 1px solid #3DB922;
  }
  #talkSpan {
    text-decoration: none;
  }
  #talk span {
    color: #3DB922;
    box-shadow: 0 0 7px #777777;
  }
  #talk span:hover {
    background-color: #EEEEEE;
  }
  .Concern span{
    background-color: #3DB922;
    color: #FFFFFF;
    box-shadow: 0 0 7px #777777
  }
  .Concern span:hover{
    cursor: pointer;
    background-color: #2CA811;
  }

  /*tags标签的样式*/
  .dynamicMsg {
    margin-top: 60px;
    margin-bottom: 50px;
  }
  #tags {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #bbbbbb;
  }
  #tags1,#tags2,#tags3,#tags4 {
    width: 100px;
    height: 45px;
    text-align: center;
    color: #969696;
    font-weight: bold;
    letter-spacing: 2px;
  }
  #tags1 {
    border-bottom: 2px solid #646464;
    color: #646464;
  }
  #tags1:hover, #tags2:hover,#tags3:hover,#tags4:hover {
    cursor: pointer;
    border-bottom: 2px solid #646464;
    color: #646464;
  }

  /*rightBox个人介绍样式*/
  #rightBox {
    border-left: 1px solid #EEEEEE;
    margin-left: 30px;
    padding-left: 10px;
  }
  #selfIntroduction {
    display: flex;
    flex-direction: column;
  }
  #selfIntroductionP {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #969696;
  }
  #editP:hover {
    cursor: pointer;
    color: #222222;
  }
  #editDiv {
    margin-top: 10px;
    border: 1px solid #AAAAAA;
    border-radius: 10px;
    background-color: #EEEEEE;
  }
  .edit {
    margin: 5px;
    width: 270px;
    height: 150px;
    border: none;
    outline: none;
    font-size: 20px;
    background-color: #EEEEEE;
    resize: none;
  }

  #selfIntroductionContent {
    margin-top: 10px;
    text-indent:20px;
    line-height: 25px;
  }

  #save {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #sub,
  #but {
    width: 80px;
    height: 35px;
    background-color: #FFFFFF;
    color: #42C02E;
    border: 1px solid #42C02E;
    border-radius: 35px;
    box-shadow: 0 0 5px #999999;
    font-size: 15px;
    letter-spacing: 3px;
  }
  #sub:hover,
  #but:hover {
    cursor: pointer;
    background-color: #EEEEEE;
  }

</style>
