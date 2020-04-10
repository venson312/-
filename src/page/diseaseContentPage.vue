<template>
  <div class="bodyBox">
    <headernav></headernav>
    <div class="mainBox">
      <div class="type"><span>{{diseaseObj.diseaseName}}</span></div>
      <div class="bigBox">
        <div class="rightBox">基本资料</div>
        <div class="leftBox">
          <div class="leftP1">
            <p class="p1">科属：</p>
            <p class="p2">{{diseaseObj.genera}}</p>
          </div>
          <div class="leftP2">
            <p class="p1">症状：</p>
            <p class="p2">{{diseaseObj.symptom}}</p>
          </div>
        </div>
      </div>
      <div class="bigBox">
        <div class="rightBox">简要概述</div>
        <div class="leftBox">
          <p class="leftP">{{diseaseObj.overview}}</p>
        </div>
      </div>
      <div class="bigBox">
        <div class="rightBox">发病原因</div>
        <div class="leftBox">
          <p class="leftP">{{diseaseObj.reason}}</p>
        </div>
      </div>
      <div class="bigBox">
        <div class="rightBox">主要症状</div>
        <div class="leftBox">
          <p class="leftP">{{diseaseObj.cardinal_symptom}}</p>
        </div>
      </div>
      <div class="bigBox">
        <div class="rightBox">诊断标准</div>
        <div class="leftBox">
          <p class="leftP">{{diseaseObj.diagnostic_criteria}}</p>
        </div>
      </div>
      <div class="bigBox">
        <div class="rightBox">治疗方法</div>
        <div class="leftBox">
          <p class="leftP">{{diseaseObj.therapies}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import headernav from '../components/headerNav'
    export default {
        name: "diseaseContentPage",
        components:{headernav,},
        data(){
          return{
            diseaseObj:{},
          }
        },
        mounted() {
          this.axios.post('/diseaseContent',{
            diseaseName:this.$route.query.diseaseName
          }).then(res => {
            this.diseaseObj = JSON.parse(res.request.responseText);
            this.diseaseObj = this.diseaseObj[0];
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
    margin: 10px 40px 10px 40px;
  }
  .type span {
    display: inline-block;
    height: 50px;
    font-size: 24px;
    line-height: 50px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .bigBox {
    display: flex;
    flex-direction: row;
    margin: 0 40px 0 40px;
  }
  .rightBox {
    flex: 1;
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 1px;
  }
  .leftBox {
    flex: 13;
    margin: 10px 0 0 0;
    border-top: 1px dashed #AAAAAA;
    display: flex;
    flex-direction: column;
  }
  .leftP1 {
    display: flex;
    flex-direction: row;
    margin: 30px 0 10px 20px;
  }
  .leftP2 {
    display: flex;
    flex-direction: row;
    margin: 5px 0 30px 20px;
  }
  .p1 {
    color: #969696;
  }
  .p2 {
    margin-left: 20px;
  }
  .leftP {
    margin: 50px 0 40px 20px;
    line-height: 30px;
  }
</style>
