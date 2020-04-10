<template>
    <div>
      <headernav></headernav>
      <div id="mainBox" class="mainBox">
        <div id="leftBox" class="leftBox">
          <div id="commentMsg" class="leftLi" @click.prevent="liName='commentmsg'"><i class="el-icon-document istyle" ></i><p>评论</p><span class="isDotLi">{{commentSum}}</span></div>
          <div id="mailTime" class="leftLi" @click.prevent="liName='mailtime'"><i class="el-icon-message istyle"></i><p>简信</p></div>
          <div id="like" class="leftLi" @click.prevent="liName='like'"><i class="el-icon-star-off istyle"></i><p>点赞</p><span class="isDotLi">{{likeSum}}</span></div>
        </div>
        <div id="rightBox" class="rightBox">
          <component :is="liName"></component>
        </div>
      </div>
    </div>
</template>

<script>
    import headernav from '../components/headerNav'
    import like from '../components/like'
    import commentmsg from '../components/commentMsg'
    import mailtime from '../components/mailTime'
    export default {
        name: "messagePage",
        components:{headernav,like,commentmsg,mailtime,},
        data(){
          return{
            liName:this.$route.query.mes,
            commentSum:0,
            mailtimeSum:0,
            likeSum:0,
          }
        },
        methods:{

        },
        created(){
          this.axios.post('msgSum',{promulgatorId:sessionStorage.getItem("userId")}).then(res => {
            this.likeSum = res.data.likeSum;
            this.commentSum = res.data.commentSum;
          })
        },
        beforeRouteUpdate(to,from,next){
          this.liName = to.query.mes;
          next();
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
  .isDotLi {
    background-color: #F56C6C;
    height: 19px;
    width: 30px;
    text-align: center;
    line-height: 19px;
    font-size: 13px;
    color: #FFFFFF;
    border-radius: 13px;
    margin: 20px 0 0 100px;
  }
  /*右边box的样式*/
  .leftBox {
    flex: 4;
  }
  .rightBox {
    flex: 9;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #EEEEEE;
    box-shadow: 0 0 5px #EEEEEE;
  }
</style>
