<template>
    <div id="divBox">
      <div id="userImg" :style="'background-image: url('+ mediaUrl+userMessage.avatar +')'"></div>
      <div id="userMsg">
        <div id="userName">
          {{ userMessage.username }}
        </div>
        <!--<div id="userMessage">-->
          <!--<div id="msg1">-->
            <!--<span id="span1">动态</span>-->
            <!--<span>{{12}}</span>-->
          <!--</div>-->
          <!--<div id="msg2">-->
            <!--<span id="span2">关注</span>-->
            <!--<span>{{13}}</span>-->
          <!--</div>-->
          <!--<div id="msg3">-->
            <!--<span id="span3">粉丝</span>-->
            <!--<span>{{33}}</span>-->
          <!--</div>-->
          <!--<div id="msg4">-->
            <!--<span id="span4">收藏</span>-->
            <!--<span>{{20}}</span>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
</template>

<script>
    export default {
        name: "userCard",
        props:['userMessage'],
        data(){
          return{
            mediaUrl: sessionStorage.mediaUrl,
          }
        },
        created() {
          // console.log(this.userMessage);
        }
    }
</script>

<style scoped>
  #divBox {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #DDDDDD;
  }
  #userImg {
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 70px;
    margin: 15px 0 15px 15px;
  }
  #userMsg {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
  #userName {
    font-size: 18px;
    color: #EA6F5A;
    letter-spacing: 2px;
    margin-top: 10px;
  }
  #userImg:hover,
  #userName:hover {
    cursor: pointer;
  }
  #userMessage {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    font-size: 13px;
    color: #EEEEEE;
  }
  #msg1, #msg2, #msg3, #msg4 {
    display: flex;
    flex-direction: row;
    width: 60px;
    border-right: 1px solid #EEEEEE;
    color: #969696;
  }
  #msg2, #msg3, #msg4 {
    margin-left: 15px;
  }
  #userMessage #span1,#userMessage #span2,#userMessage #span3,#userMessage #span4 {
    color: #969696;
  }
</style>
