<template>
  <div>
    <div>
      <headernav></headernav>
    </div>
    <div id="mainBox">
      <div id="headerBox">
        <router-link :to="{path:'/homepage',query: {id:dynamicContent.user_id}}">
          <div id="userImg" :style="'background-image: url('+ mediaUrl + dynamicContent.avatar +')'"></div>
        </router-link>
        <div id="userMsg">
          <router-link :to="{path:'/homepage',query: {id:dynamicContent.user_id}}" style="text-decoration: none">
            <div id="userName">{{ dynamicContent.username }}</div>
          </router-link>
          <div class="userMessage">
            {{ dynamicContent.publishtime }}
          </div>
        </div>
      </div>
      <div id="content-dynamic">
        <span>{{ dynamicContent.textcontent }}</span>
      </div>
      <div id="img-dynamic">
        <div v-for="(item,i) in dynamicContent.image" :key="i" id="imgShow">
          <img :src="mediaUrl + item" >
        </div>
      </div>
      <div id="comment-dynamic">
        <div id="like"><i class="el-icon-check icon"></i><span class="sum">{{ likeSum }}</span></div>
        <div id="comment"><i class="el-icon-edit icon"></i><span class="sum">{{ commentSum }}</span></div>
        <div id="collect"><i class="el-icon-star-off icon"></i><span class="sum">{{ collectSum }}</span></div>
        <div id="forward"><i class="el-icon-share icon"></i><span class="sum">{{ forwardSum }}</span></div>
      </div>
      <comment :commentContent = dynamicContent></comment>
    </div>
  </div>
</template>

<script>
  import headernav from '../components/headerNav'
  import comment from '../components/comment'
    export default {
        name: "dynamicPage",
        components:{headernav,comment,},
        provide(){
          return{
            reload:this.reload,
            mediaUrl: sessionStorage.mediaUrl,
          }
        },
        data(){
          return{
            mediaUrl: sessionStorage.mediaUrl,
            dynamicContent:{},
            likeSum:0,
            collectSum:0,
            commentSum:0,
            forwardSum:0,
          }
        },
        methods:{
          reload (){
            this.axios.post('/dynamicpage',{dynamicId:this.$route.query.id}).then(res => {
              this.dynamicContent = JSON.parse(res.request.responseText)[0];
              this.dynamicContent.image = JSON.parse(this.dynamicContent.image);
              this.likeSum = this.dynamicContent.like_sum;
              this.collectSum = this.dynamicContent.collect_sum;
              this.commentSum = this.dynamicContent.comment_sum;
              this.forwardSum = this.dynamicContent.forward_sum;
            })
          }
        },
        mounted() {
          this.reload();
        }
    }
</script>

<style scoped>
  #mainBox {
    margin: 100px 250px 0 250px;
    display: flex;
    flex-direction: column;
  }

  /*header主体头部样式*/
  #headerBox {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #EEEEEE;
  }
  #userImg {
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 80px;
    margin: 15px 0 15px 15px;
  }
  #userMsg {
    display: flex;
    flex-direction: column;
    margin-left: 24px;
  }
  #userName {
    font-size: 22px;
    color: #EA6F5A;
    letter-spacing: 2px;
    margin-top: 10px;
  }
  #userImg:hover,
  #userName:hover {
    cursor: pointer;
  }
  .userMessage {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    font-size: 13px;
    color: #000000;
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

  /*w文字样式*/
  #content-dynamic {
    margin: 10px 50px 0 50px;
    line-height: 25px;
    text-indent: 25px;
    color: #434343;
    background-color: #ffffff;
  }
  /*图片布局和样式*/
  #img-dynamic {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 50px;
  }
  #imgShow {
    width: 240px;
    height: 240px;
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
    padding-top: 10px;
    margin: 15px 80px 0 50px;
    border-top: 1px solid #EEEEEE;
  }
  #like, #comment, #collect, #forward {
    flex: 1;
    height: 27px;
    line-height: 27px;
    text-align: center;
    /*border-left: 1px solid #969696;*/
  }
  #like, #comment, #collect{
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
