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
        name: "searchPage",
        components: {headernav,dynamicli},
        data(){
          return{
            searchObj:[],
          }
        },
        created() {
          this.getDynamic();
        },
        watch:{
          '$route':'getDynamic',
        },
        methods:{
          getDynamic(){
            this.axios.post('/searchDynamic',{key:this.$route.query.Key}).then(res => {
              this.searchObj = JSON.parse(res.request.responseText);
              for (let i of this.searchObj){
                i.image = JSON.parse(i.image);
              }
            })
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
