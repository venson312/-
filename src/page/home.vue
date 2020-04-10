<template>
  <div id="bodyBox">
    <headerNav></headerNav>
    <div id="mainBox">
      <div id="leftBox">
        <div id="carouset">
          <div class="block">
            <el-carousel height="300px">
              <el-carousel-item v-for="(item,i) in carousetImage" :key="i">
                <img :src="item.img" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div id="dynamic">
          <div id="dynamicLi" v-for="(item,i) of dynamicObj" :key="i">
            <dynamicLi :userMessage="item" ></dynamicLi>
          </div>
        </div>
      </div>
      <div id="rightBox">
        <div id="hotDynamic ">
          

          
        </div>
        
                    <p><a href="http://localhost:8080/static/html/index/index.html" target="_blank">传送门</a> , 
                    韦恩泽维尔服装网站</p>
               
        <!--<div id="hotUser">-->
          <!--<recommendation :hotUsers="RecommendationObj"></recommendation>-->
        <!--</div>-->
      </div>
    </div>

  </div>
</template>
<!--
<script>
  import headerNav from '../components/headerNav';
  import dynamicLi from "../components/dynamicLi";
  import recommendation from "../components/recommendation"
  export default {
        name: "home",
        data(){
          return {
            //轮播图数据
            dynamicObj:[],
            carousetImage:[{id:0,img:require('../assets/image/carousetImage/9.jpg')},
                          {id:1,img:require('../assets/image/carousetImage/5.jpg')},
                          {id:2,img:require('../assets/image/carousetImage/7.jpg')},
                          {id:3,img:require('../assets/image/carousetImage/8.jpg')}],
          //  推荐列表
            RecommendationObj:[
              {userImg:require('../assets/image/userImg.jpg'),userName:"自由的小鸟",dt:200,bgz:1000},
              {userImg:require('../assets/image/userImg.jpg'),userName:"自由的小鸟",dt:200,bgz:1000},
              {userImg:require('../assets/image/userImg.jpg'),userName:"自由的小鸟",dt:200,bgz:1000},
              {userImg:require('../assets/image/userImg.jpg'),userName:"自由的小鸟",dt:200,bgz:1000},
              {userImg:require('../assets/image/userImg.jpg'),userName:"自由的小鸟",dt:200,bgz:1000}
            ]
          }
        },
        components:{headerNav,dynamicLi,recommendation},
        created(){
          this.axios.post('/').then(res => {
            this.dynamicObj = JSON.parse(res.request.responseText);
            for (let i of this.dynamicObj){
              i.image = JSON.parse(i.image);
            }
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
          }
        }
</script>
-->
<style scoped>
  * {
    padding: 0;
    maring: 0;
  }
  #bodyBox {
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    /*height: 1800px;*/
  }
  #mainBox {
    margin: 90px 150px 0 150px;
    display: flex;
    flex-direction: row;
    /*height: 800px;*/
  }
  #leftBox {
    flex: 8;
    height: 800px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    border-radius: 10px 10px 0 0;
    margin-right: 20px;
  }
  #rightBox {
    flex: 3;
    height: 800px;
    /*background-color: green;*/
    display: flex;
    flex-direction: column;
  }
  /*轮播图样式*/
  .el-carousel__item {
    border-radius: 10px;
  }
  .el-carousel__item img {
    height: 330px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  #dynamic {
    margin-top: 30px;
  }

  /*rightBox热门推荐样式*/
  #likeHot,
  #commentHot,
  #collectHot {
    display: block;
    height: 60px;
    text-decoration: none;
    line-height: 60px;
    text-align: center;
    margin-bottom: 10px;
    font-size: 18px;
    letter-spacing: 3px;
    color: #FFFFFF;
    border-radius: 5px;
  }
  #likeHot {
    background-color: #FFB84F;
  }
  #commentHot {
    background-color: #F8855B;
  }
  #collectHot {
    background-color: #F69581;
  }
  #likeHot:hover,
  #commentHot:hover,
  #collectHot:hover {
    box-shadow: 0 0 20px #969696;
    font-size: 19px;
  }
  /*推荐列表样式*/
  #hotUser {
    margin-top: 20px;
  }
</style>
