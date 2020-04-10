<template>
    <div class="bodyBox">
      <headernav></headernav>
      <div class="mainBox">
        <div class="img">
          <p class="mes">{{mes}}</p>
        </div>
        <div class="bgImg">
          <div class="dog"></div>
          <div class="mesStyle">
            <router-link :to="{path:'/diseaselipage',query: {animalType:dog}}" style="text-decoration: none;color: #000000"><p class="p1">狗狗常见病</p></router-link>
            <p class="p2">{{dogMes}}</p>
          </div>
        </div>
        <div class="bgImg">
          <div class="cat"></div>
          <div class="mesStyle">
            <router-link :to="{path:'/diseaselipage',query: {animalType:cat}}" style="text-decoration: none;color: #000000"><p class="p1">猫咪常见病</p></router-link>
            <p class="p2">{{catMes}}</p>
          </div>
        </div>
        <div class="bgImg">
          <div class="murine"></div>
          <div class="mesStyle">
            <router-link :to="{path:'/diseaselipage',query: {animalType:murine}}" style="text-decoration: none;color: #000000"><p class="p1">仓鼠常见病</p></router-link>
            <p class="p2">{{murineMes}}</p>
          </div>
        </div>
        <div class="bgImg">
          <div class="rabbit"></div>
          <div class="mesStyle">
            <router-link :to="{path:'/diseaselipage',query: {animalType:rabbit}}" style="text-decoration: none;color: #000000"><p class="p1">兔子常见病</p></router-link>
            <p class="p2">{{rabbitMes}}</p>
          </div>
        </div>
        <div class="bgImg">
          <div class="tortoise"></div>
          <div class="mesStyle">
            <router-link :to="{path:'/diseaselipage',query: {animalType:tortoise}}" style="text-decoration: none;color: #000000"><p class="p1">乌龟常见病</p></router-link>
            <p class="p2">{{tortoiseMes}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import headernav from '../components/headerNav'
    export default {
        name: "diseasePage",
        components:{headernav,},
        data(){
          return{
            dog:"狗狗常见病",
            cat:"猫咪常见病",
            murine:"仓鼠常见病",
            rabbit:"兔子常见病",
            tortoise:"乌龟常见病",
            mes:"现在，越来越多的人将其饲养的宠物视为家庭中的重要一员。不会说话的宠物在身体不舒服时无法表达，因此各位铲屎官应该了解一些宠物常见疾病的症状和紧急应对方法是很有必要的。那么宠物常见疾病有哪些？下面一起来看看各种常见宠物常见疾病的症状和处理方法。",
            dogMes:"现在狗狗是人们最忠实的伙伴，很多家庭由于狗狗的陪伴变得异常温馨。当狗狗生病了，主人都会比较着急。狗狗有哪些常见病呢？狗狗常见的病有十种，主要是眼病、呼吸道疾病、皮肤病、牙齿疾病、外耳炎、便秘、骨折、难产、心丝虫和一些先天疾病，如刻意改良的迷你小型狗，容易有脑水肿、病气、兔唇。",
            catMes:"危害猫咪身体健康的常见疾病有很多种，比如当猫咪在饮食过程中吃进去的东西可能留在食道内会造成猫咪食道异物。除了可能出现食道异物之外，还会出现胃内异物。感冒也是猫咪最为常见的一种疾病，特别是在寒冷的冬天。日常生活中饲养者应多学习了解猫咪疾病方面的知识，猫咪有异常的身体情况时，就要及时处理或者送去宠物医院。",
            murineMes:"仓鼠一旦出现身体问题，需要通过仔细观察才能发现发现仓鼠有异常状况。所以主人日常要多留意观察它们的状态，一旦发现仓鼠精神状态不好或者有异常举动，要尽早为其解决或者送医，而且日常要保持它们的环境干爽清洁。仓鼠常见病主要有肿瘤、皮肤病、心脏病、咬合不正、便秘、感冒等等。",
            rabbitMes:"兔子非常可爱，作为人们经常饲养的宠物之一，兔子却不像猫狗那般常与人交流，因此主人相对比较难发现兔子身体出现异常情况，因此主人掌握一些兔子常见疾病的知识还是很有必要的。兔子的常见病主要有口齿咬合不良，呼吸器官疾病如鼻炎、消化器官疾病、兔球虫病、兔螨病、兔瘟、兔巴氏杆菌病、兔大肠杆菌病等。",
            tortoiseMes:"人工养殖乌龟的时候，只要注意随时搞好清洁卫生，常常更换饲养池的水，乌龟一般都不会生病。但是也有时候由于受气温、水温、湿度、饵料等环境因素的影响，乌龟易引起各类疾病，严重者将导致死亡。乌龟常见疾病主要有胃肠炎、绿脓假单细胞菌败血症、龟壳变软、腐皮病、白眼病等。不同疾病的乌龟病因不同，主人需要对症下药。"
          }
        }
    }
</script>

<style scoped>
  * {
    padding: 0;
    maring: 0;
  }
  .bodyBox {
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
  }
  .mainBox {
    margin: 90px 150px 50px 150px;
    display: flex;
    flex-direction: column;
    /*height: 800px;*/
    background-color: #F1F4F9;
  }
  .img {
    background: url("../assets/image/disease/diseaseHeader.jpg") no-repeat;
    height: 420px;
    background-size: 100% 100%;
  }
  .mes {
    height: 200px;
    width: 550px;
    text-indent: 20px;
    line-height: 50px;
    margin-top: 115px;
    margin-left: 80px;
  }
  .cat, .dog, .murine, .rabbit, .tortoise {
    height: 270px;
    width: 400px;
    margin: 80px 0 0 90px;
  }
  .dog {
    background: url("../assets/image/disease/dog.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .cat {
    background: url("../assets/image/disease/cat.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .murine {
    background: url("../assets/image/disease/murine.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .rabbit {
    background: url("../assets/image/disease/rabbit.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .tortoise {
    background: url("../assets/image/disease/tortoise.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .bgImg {
    background: url("../assets/image/disease/diseaseImg.png") no-repeat;
    height: 520px;
    background-size: 100% 100%;
    margin: 20px 70px 0 70px;
    display: flex;
    flex-direction: row;
  }
  .mesStyle {
    width: 300px;
    margin: 80px 0 0 30px;
    display: flex;
    flex-direction: column;
  }
  .p1 {
    width: 160px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 2px;
    text-align: center;
    border-radius: 8px;
    background-color: #B6AED3;
    margin: 0 auto;
  }
  .p2 {
    font-size: 14px;
    line-height: 28px;
    text-indent: 20px;
    margin-top: 18px;
    background-color:rgba(244,244,244,0.6) ;
  }
  .p1:hover {
    cursor: pointer;
    text-decoration: underline;
    color: #1B9AF7;
  }
</style>
