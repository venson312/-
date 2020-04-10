<template>
  <div id="commentBox">
    <div>
      <div id="selfIntroductionP">
        <p>评论</p>
      </div>
      <div>
        <div id="parentEditDiv" class="editDiv">
          <textarea name="sonEdit" id="parentEdit" class="edit" @click="flag=true" placeholder="写下你的评论...." v-model="comment1Content"></textarea>
        </div>
        <div id="parenrSave" class="save" v-show="flag">
          <button value="发送" id="parentBut1" class="but1" @click.prevent="cancel" @click="send">发送</button>
          <button value="取消" id="parentBut2" class="but2" @click.prevent="cancel">取消</button>
        </div>
      </div>
    </div>
    <div id="parentCommentLi" class="commentLi" v-for="(item,i) in content" :key="i">
      <div id="parentHeaderBox" class="headerBox">
        <div id="parentUserImg" class="userImg" :style="'background-image: url('+mediaUrl+item.avatar +')'"></div>
        <div id="parentNameTime" class="nameTime">
          <p id="parentUserName" class="userName">{{ item.username }}</p>
          <p id="parentUserTime" class="userTime"> {{ item.time }}</p>
        </div>
        <!--回复按钮弹框-->
        <el-popover id="replyBut" class="replyBut" placement="bottom-end" width="720" trigger="click">
          <div v-show="visible2">
            <div id="sonEditDiv" class="sonEditDiv" v-show="visible2">
              <textarea name="edit" id="sonEdit" class="sonEdit" placeholder="写下你的回复...." v-model="comment2Content"></textarea>
            </div>
            <button value="发送" id="sonBut" class="sonBut" @click="reply(item.comment1_id)" v-show="visible2">发送</button>
          </div>
          <el-button slot="reference" class="replyButP" @click="replyBtn">回复</el-button>
        </el-popover>

      </div>
      <!--回复的信息-->
      <div id="parentCommentContent" class="commentContent">
        <p>{{ item.content }}</p>
      </div>
      <!--二级回复div-->
      <div id="replyBox" class="replyBox">
        <div id="reply" class="reply" v-for="(replyitem,j) in item.comment2" :key="j">
          <div id="sonHeaderBox"  class="headerBox">
            <div id="sonUserImg" class="userImg" :style="'background-image: url('+mediaUrl+replyitem.avatar+')'"></div>
            <div id="sonNameTime" class="nameTime">
              <p id="sonUserName" class="userName">{{ replyitem.username }}</p>
              <p id="sonUserTime" class="userTime"> {{ replyitem.time }} </p>
            </div>
          </div>
          <div id="sonCommentContent" class="commentContent">
            <p>{{ replyitem.content }}</p>
          </div>
        </div>
      </div>

    </div>
    <div id="bottomBox" class="bottomBox">

    </div>
  </div>
</template>

<script>
    export default {
        name: "comment",
        props:['commentContent'],
        inject:['reload'],
        data(){
          return{
            mediaUrl: sessionStorage.mediaUrl,
            visible2: false,
            flag:false,
            content:"",
            comment1Content:"",
            comment2Content:"",
          };
        },
        watch:{
          commentContent(){
            this.content = this.commentContent.comment1;
          }
        },
        methods:{
          cancel(){
            this.flag = false;
          },
          replyBtn(){
            this.visible2 = true;
          },
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
          //一级评论
          send(){
            this.axios.post('/comment1',{
              dynamicId:this.commentContent.dynamic_id,
              promulgatorId:this.commentContent.user_id,
              userId:sessionStorage.getItem("userId"),
              content:this.comment1Content,
              time:this.showTime(new Date()),
            }).then(res => {
              this.reload();
            });
            this.comment1Content="";
          },
          //二级评论
          reply(comment1Id){
            this.axios.post('/comment2',{
              dynamicId:this.commentContent.dynamic_id,
              comment1_id:comment1Id,
              promulgatorId:this.commentContent.user_id,
              userId:sessionStorage.getItem("userId"),
              content:this.comment2Content,
              time:this.showTime(new Date()),
            }).then(res => {
              this.visible2 = false;
              this.reload();
            })
            this.comment2Content = "";
          }
        },
    }
</script>

<style scoped>
  /*评论样式*/
  #commentBox {
    margin-top: 20px;
    height: 300px;
    border-top: 1px solid #DDDDDD;
  }
  #selfIntroductionP p {
    padding: 20px 20px 10px 25px;
    color: #444444;
    font-size: 20px;
    letter-spacing: 4px;
    font-weight: bold;
  }
  .editDiv {
    margin-top: 10px;
    border: 1px solid #AAAAAA;
    border-radius: 10px;
    background-color: #EEEEEE;
    margin-left: 20px;
    margin-right: 20px;
  }
  .edit {
    resize: none;
    margin: 5px;
    width: 793px;
    height: 100px;
    border: none;
    outline: none;
    font-size: 20px;
    background-color: #EEEEEE;
  }
  .save {
    margin: 10px 20px 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .but1, .but2 {
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
  .but1:hover, .but2:hover {
    cursor: pointer;
    background-color: #EEEEEE;
  }
  /*回复弹框的样式*/
  .sonEditDiv {
    margin-top: 10px;
    border: 1px solid #AAAAAA;
    border-radius: 10px;
    background-color: #EEEEEE;
    margin-left: 20px;
    margin-right: 20px;
  }
  .sonEdit {
    margin: 5px;
    width: 665px;
    height: 100px;
    border: none;
    outline: none;
    font-size: 20px;
    background-color: #EEEEEE;
  }
  .sonBut {
    width: 80px;
    height: 35px;
    background-color: #FFFFFF;
    color: #42C02E;
    border: 1px solid #42C02E;
    border-radius: 35px;
    box-shadow: 0 0 5px #999999;
    font-size: 15px;
    letter-spacing: 3px;
    margin-top: 15px;
    margin-left: 620px;
  }
  .sonBut:hover {
    cursor: pointer;
    background-color: #EEEEEE;
  }

  /*评论显示样式*/
  .commentLi {
    border-bottom: 1px solid #EEEEEE;
  }
  .headerBox {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
  }
  .userImg {
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 40px;
    margin: 15px 0 15px 15px;
    border: 1px solid #DDDDDD;
  }
  .nameTime {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }
  .userName {
    color: #EA6F5A;
    font-size: 15px;
    padding-top: 13px;
  }
  .userImg, .userName:hover {
    cursor: pointer;
  }
  .userTime {
    color: #777777;
    font-size: 12px;
    margin-top: 3px;
  }

  .replyBut {
    margin-left: 550px;
    margin-top: 20px;
  }
  .replyButP {
    width: 80px;
    height: 35px;
    background-color: #FFFFFF;
    color: #42C02E;
    border: 1px solid #42C02E;
    border-radius: 35px;
    box-shadow: 0 0 5px #999999;
    font-size: 15px;
    letter-spacing: 3px;
    text-align: center;
  }
  .replyButP:hover {
    cursor: pointer;
    background-color: #EEEEEE;
  }

  .commentContent {
    padding-left: 70px;
    padding-bottom: 10px;
  }

  .replyBox {
    margin-left: 55px;
    border-left: 1px solid #CCCCCC;
  }
  .reply {
    border-bottom: 1px solid #EEEEEE;
  }

  .bottomBox {
    height: 100px;
  }
</style>
