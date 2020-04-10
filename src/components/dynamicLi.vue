<template>
  <div id="a-dynamic">
    <div id="userMsg">
      <div id="headImg">
        <router-link :to="{path:'/homepage',query: {id:userMessage.user_id}}">
          <img :src="mediaUrl + userMessage.avatar"/>
        </router-link>
      </div>
      <div id="nameTime">
        <router-link :to="{path:'/homepage',query: {id:userMessage.user_id}}" style="text-decoration: none">
          <p id="userName">{{ userMessage.username }}</p>
        </router-link>
        <p id="userTime"> {{ userMessage.publishtime }}</p>
      </div>
    </div>
    <div id="content-dynamic" class="contentDynamicBox">
      <router-link :to="{path:'/dynamicpage',query:{id:userMessage.dynamic_id}}" class="content-dynamic">
        <span>{{ userMessage.textcontent }}</span>
      </router-link>
    </div>
    <div id="img-dynamic">
      <div v-for="(item,i) in userMessage.image" :key="i" id="imgShow">
        <img :src="mediaUrl + item" >
      </div>
    </div>
    <div id="comment-dynamic">
      <div id="like" @click="click">
        <i class="el-icon-check icon" v-if="isClick==0"></i>
        <i class="el-icon-check icon" style="color: #EE715B" v-if="isClick==1"></i>
        <span class="sum">{{ likeNum }}</span>
      </div>
      <router-link :to="{path:'/dynamicpage',query:{id:userMessage.dynamic_id}}" class="comment" style="text-decoration: none">
        <div class="comment"><i class="el-icon-edit icon"></i><span class="sum">{{ commentNum }}</span></div>
      </router-link>
      <div id="collect" @click="collectEvent">
        <i class="el-icon-star-off icon" v-if="isCollect==0"></i>
        <i class="el-icon-star-off icon" style="color: #EE715B" v-if="isCollect==1"></i>
        <span class="sum">{{ collectNum }}</span>
      </div>
      <!--<div id="forward"><i class="el-icon-share icon"></i><span class="sum">{{ forwardNum }}</span></div>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "dynamicLi",
        data(){
          return{
            mediaUrl: sessionStorage.mediaUrl,
            isClick:0,
            isCollect:0,
            likeNum:'',
            commentNum:'',
            collectNum:'',
            forwardNum:'',
          }
        },
      props:['userMessage'],
      created(){
          this.show();
          this.$socket.on('likeSum',(msg) => {
            msg = JSON.parse(msg);
            if(msg[0].dynamicId == this.userMessage.dynamic_id){
              this.likeNum = msg[0].like_sum;
            }
          });
          this.$socket.on('collectSum',(msg) => {
            msg = JSON.parse(msg);
            if(msg[0].dynamicId == this.userMessage.dynamic_id){
              this.collectNum = msg[0].collect_sum;
            }
          });
      },
      methods:{
          show(){
            this.userMessage.textcontent = this.userMessage.textcontent.substring(0,100) + "......[全文]";
            this.likeNum = this.userMessage.like_sum;
            this.commentNum = this.userMessage.comment_sum;
            this.collectNum = this.userMessage.collect_sum;
            this.forwardNum = this.userMessage.forward_sum;
          },
          click(){
            if(sessionStorage.getItem("userId")){
              //点赞
              if(this.isClick == 0){
                this.isClick = 1;
                this.$socket.emit('like', {
                  dynamicId:this.userMessage.dynamic_id,
                  promulgatorId:this.userMessage.user_id,
                  userId:sessionStorage.getItem('userId'),
                })
              }else{
                //取消点赞
                this.isClick = 0;
                this.$socket.emit('unlike', {
                  dynamicId:this.userMessage.dynamic_id,
                  promulgatorId:this.userMessage.user_id,
                  userId:sessionStorage.getItem('userId'),
                })
              }
            }else{
              alert('请先登录！');
            }
          },
          collectEvent(){
            if(sessionStorage.getItem("userId")){
              //收藏
              if(this.isCollect == 0){
                this.isCollect = 1;
                this.$socket.emit('collect', {
                  dynamicId:this.userMessage.dynamic_id,
                  promulgatorId:this.userMessage.user_id,
                  userId:sessionStorage.getItem('userId'),
                })
              }else{
                //取消收藏
                this.isCollect = 0;
                this.$socket.emit('uncollect', {
                  dynamicId:this.userMessage.dynamic_id,
                  promulgatorId:this.userMessage.user_id,
                  userId:sessionStorage.getItem('userId'),
                })
              }
            }else{
              alert('请先登录！');
            }
          },
      }
    }
</script>

<style scoped>
  #a-dynamic {
  background-color: #FFFFFF;
  margin-bottom: 20px;
  border-top: 1px solid #DDDDDD;
  display: flex;
  flex-direction: column;
}
  #userMsg {
    background-color: #FFFFFF;
    margin-top: 20px;
  }
  /*动态头部样式*/
  #userMsg {
    display: flex;
    flex-direction: row;
  }
  #headImg {
    height: 40px;
    width: 40px;
  }
  #headImg img {
    display: block;
    width: 100%;
    height: 100%;
  }
  #headImg img:hover {
    cursor: pointer;
  }
  #nameTime {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }
  #userName {
    color: #EA6F5A;
    font-size: 15px;
  }
  #userName:hover {
    cursor: pointer;
  }
  #userTime {
    color: #777777;
    font-size: 12px;
    margin-top: 3px;
  }
  /*w文字样式*/
  .contentDynamicBox {
    margin: 10px 50px 0 50px;
    text-indent: 25px;
  }
  .content-dynamic {
    line-height: 25px;
    color: #666666;
    background-color: #ffffff;
  }
  .content-dynamic:hover {
    cursor: pointer;
    text-decoration: underline;
    color: #434343;
  }
  /*图片布局和样式*/
  #img-dynamic {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin:20px 0 0 50px;
  }
  #imgShow {
    width: 150px;
    height: 150px;
    margin: 4px 0 0 4px;
  }
  #imgShow img {
    display: block;
    width: 100%;
    height: 100%;
  }
  /*点赞，评论，转发，收藏*/
  .sum {
    color:#EE715B;
    margin-left: 7px;
  }
  #comment-dynamic {
    display: flex;
    flex-direction: row;
    margin: 15px 80px 0 50px;
  }
  #like,
  .comment,
  #collect,
  #forward {
    flex: 1;
    height: 27px;
    line-height: 27px;
    text-align: center;
  }
  #like,
  .comment,
  #collect{
    border-right: 1px solid #969696;
  }
  .icon {
    font-size: 22px;
    color: #333333;
  }
  .icon:hover {
    cursor: pointer;
    color: #EE715B;
  }
</style>
