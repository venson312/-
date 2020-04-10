<template>
  <div>
    <headernav></headernav>
    <div class="mainBox">
      <div class="dynamic" v-for="(item,i) of searchObj" :key="i">
        <dynamicli :userMessage="item"></dynamicli>
      </div>
    </div>
  </div>
</template>

<script>
  import headernav from '../components/headerNav'
  import dynamicli from '../components/dynamicLi'
    export default {
        name: "hotPage",
        components: {headernav,dynamicli},
        data(){
          return{
            searchObj:[],
          }
        },
        created() {
          // console.log(this.$route.query.hot);
          this.getDynamic(this.$route.query.hot);
        },
        methods:{
          getDynamic(hotKey){
            if(hotKey == 'likeHot'){
              this.axios.post('/likeHot',{likeHot:'likeHot'}).then(res => {
                this.searchObj = JSON.parse(res.request.responseText);
                for (let i of this.searchObj){
                  i.image = JSON.parse(i.image);
                }
              })
            }else if(hotKey == 'commentHot'){
              this.axios.post('/commentHot',{commentHot:'commentHot'}).then(res => {
                this.searchObj = JSON.parse(res.request.responseText);
                for (let i of this.searchObj){
                  i.image = JSON.parse(i.image);
                }
              })
            }else{
              this.axios.post('/collectHot',{collectHot:'collectHot'}).then(res => {
                this.searchObj = JSON.parse(res.request.responseText);
                for (let i of this.searchObj){
                  i.image = JSON.parse(i.image);
                }
              })
            }
          }
        }
    }
</script>

<style scoped>
  .mainBox {
    margin: 100px 250px 0 250px;
    display: flex;
    flex-direction: column;
    height: 300px;
  }
</style>
