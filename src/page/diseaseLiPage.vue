<template>
  <div class="bodyBox">
    <headernav></headernav>
    <div class="mainBox">
      <div class="type"><span>{{animalType}}</span></div>
      <div v-for="(item,i) in diseaseLiObj" :key="i" class="diseaseLi">
        <div class="disease">
          <p class="pointer"></p>
          <router-link :to="{path:'/diseasecontentpage',query:{diseaseName:item.diseaseName }}" style="text-decoration: none;color: #000000"><p class="diseaseName">{{item.diseaseName}}</p></router-link>
        </div>
        <div class="overview">{{item.overview}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import headernav from '../components/headerNav'
    export default {
        name: "diseaseLiPage",
        components:{headernav,},
        data(){
          return{
            animalType: this.$route.query.animalType,
            diseaseLiObj:[],
            diseaseName:"",
            overview:"",
            content:"犬牙周炎是涉及到牙周即龈缘、齿周袋、齿周韧带和齿槽骨的急性或慢性炎症过程。如不及时治疗，炎症进一步发展引起齿龈和齿槽骨组织退缩，进而引起齿龈萎缩，齿槽骨骼的再吸收，牙齿松动。另外，齿龈组织损伤和牙齿排列不整，低钙饮食或在发病过程口腔内细菌侵入齿龈，破坏齿根膜组织都易引起本病。",
          }
        },
        mounted() {
          this.axios.post('/diseaseli',{
            animalType:this.animalType,
          }).then(res => {
            this.diseaseLiObj = JSON.parse(res.request.responseText);
          })
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
    border: 1px solid #AAAAAA;
  }
  .type {
    margin: 10px 20px 10px 20px;
    border-bottom: 1px solid #EEEEEE;
  }
  .type span {
    display: inline-block;
    color: #F2473D;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    border-bottom: 2px solid #F2473D;
  }
  .diseaseLi {
    display: flex;
    flex-direction: column;
    margin: 0 20px 0 20px;
    border-bottom: 1px dashed #EEEEEE;
  }
  .disease {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .pointer {
    width: 10px;
    height: 10px;
    background-color: #F2473D;
    border-radius: 5px;
  }
  .diseaseName {
    margin-left: 5px;
    height: 40px;
    line-height: 40px;
  }
  .diseaseName:hover {
    cursor: pointer;
    color: #F2473D;
  }
  .overview {
    line-height: 22px;
    font-size: 15px;
    margin-bottom: 10px;
    color: #666666;
  }
</style>
