<template>
  <div>
    <headernav></headernav>
    <div id="mainBox" class="mainBox">
      <div id="leftBox" class="leftBox">
        <router-link to="/messagepage" style="text-decoration: none;color: #000000"><div id="commentMsg" class="leftLi"><i class="el-icon-document istyle" ></i><p>评论</p></div></router-link>
        <router-link to="/messagepage" style="text-decoration: none;color: #000000"><div id="mailTime" class="leftLi"><i class="el-icon-message istyle"></i><p>简信</p></div></router-link>
         <router-link to="/messagepage" style="text-decoration: none;color: #000000"><div id="like" class="leftLi"><i class="el-icon-star-off istyle"></i><p>点赞</p></div></router-link>
      </div>
      <div id="rightBox" class="rightBox">
        <div id="dialogHeader" class="dialogHeader">
          <router-link :to="{path:'/messagepage',query:{mes:'mailtime'}}" style="text-decoration: none;color: #999999">
            <i class="el-icon-back"></i>返回简信列表
          </router-link>
          <span id="name" class="name">与 某某某 的对话</span>
        </div>
        <div id="talkBox" class="talkBox">
          <div v-for="(item,i) of talkObj" :key="i">
            <div class="receiver" v-if="item.sender_id != senderid">
              <div class="userImg" :style="'background-image: url('+mediaUrl+receiveImg+')'"></div>
              <div class="textbgc">{{item.content}}</div>
            </div>
            <div class="sender" v-if="item.sender_id == senderid">
              <div class="textbgc">{{item.content}}</div>
              <div class="userImg" :style="'background-image: url('+mediaUrl+senderImg+')'"></div>
            </div>
          </div>
        </div>
        <div id="writeBox" class="writeBox">
          <textarea id="ta" class="ta" rows="2" placeholder="请输入内容" v-model="connect"></textarea>
          <div id="delivery" class="delivery">
            <span class="enterDelivery">Enter 直接发送</span>
            <button id="but" class="but" @click="send">发送</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import headernav from '../components/headerNav'
    export default {
        name: "dialogBoxPage",
        components:{headernav},
        data(){
            return{
              mediaUrl: sessionStorage.mediaUrl,
              connect:'',
              talkObj:'',
              senderid:sessionStorage.getItem('userId'),
              receiveImg:'',
              senderImg:'',
          }
        },
        created(){
          this.axios.post('/headImg',{userId:this.$route.query.id}).then(res => {
            this.receiveImg = JSON.parse(res.request.responseText)[0].avatar;
          });
          this.axios.post('/headImg',{userId:sessionStorage.getItem('userId')}).then(res => {
            this.senderImg = JSON.parse(res.request.responseText)[0].avatar;
          });
          this.$socket.on('receiveMsg',msg => {
            this.talkObj = msg;
            console.log(this.talkObj);
          })
        },
        methods:{
          //时间格式方法
          showTime(){
            var dt = new Date();
            var y = dt.getFullYear();
            var m = (dt.getMonth() + 1).toString().padStart(2,'0');
            var d = dt.getDay().toString().padStart(2,'0');
            // return `${y}-${m}-${d}`;
            var hh = dt.getHours().toString().padStart(2,'0');
            var mm = dt.getMinutes().toString().padStart(2,'0');
            var ss = dt.getSeconds().toString().padStart(2,'0');
            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
          },
          //发送信息
          send(){
            this.$socket.emit('sendMsg',{
              senderId:sessionStorage.getItem('userId'),
              receiverId:this.$route.query.id,
              content:this.connect,
              time: this.showTime(new Date()),
              roomId:sessionStorage.getItem('userId')+this.$route.query.id,
            })
            this.connect = '';
          },
        }
    }
</script>

<style scoped>
  .mainBox {
    display: flex;
    flex-direction: row;
    margin: 100px 200px 0 200px;
  }
  .leftLi {
    display: flex;
    flex-direction: row;
    width: 280px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #EEEEEE;
    box-shadow: 0 0 5px #EEEEEE;
  }
  .leftLi:hover {
    background-color: #F0F0F0;
    cursor: pointer;
  }
  .istyle {
    height: 60px;
    width: 30px;
    font-size: 24px;
    line-height: 60px;
    color: #EA6F5A;
    padding-left: 30px;
  }
  .leftLi p {
    padding-left: 10px;
  }
  /*右边box的样式*/
  .leftBox {
    flex: 4;
  }
  .rightBox {
    display: flex;
    flex-direction: column;
    flex: 9;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #EEEEEE;
    box-shadow: 0 0 5px #EEEEEE;
  }
  /*对话窗口*/
  .dialogHeader {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #EEEEEE;
  }
  .name {
    margin-left: 120px;
    font-weight: bold;
  }
  .talkBox {
    height: 360px;
    overflow: auto;
  }
  .writeBox {
    display: flex;
    flex-direction: column;
  }
  .ta {
    font-size: 18px;
    padding: 7px;
    background-color: #F0F0F0;
    resize: none;
  }
  .but {
    margin-top: 5px;
    width: 90px;
    height: 40px;
    font-size: 17px;
    letter-spacing: 4px;
    border-radius: 40px;
    background-color: #3DB922;
    color: #FFFFFF;
    border: none;
    outline: none;
    box-shadow: 0 0 5px #3DB922;
  }
  .but:hover {
    cursor: pointer;
  }
  .delivery {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .enterDelivery {
    color: #999999;
    padding-top: 15px;
  }

  .receiver {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .sender {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .userImg {
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 40px;
    margin: 15px 15px 15px 15px;
    border: 1px solid #DDDDDD;
  }
  .textbgc {
    height: 40px;
    line-height: 40px;
    padding: 0 10px 0 10px;
    background-color: lightpink;
    border-radius: 10px;
  }
</style>
