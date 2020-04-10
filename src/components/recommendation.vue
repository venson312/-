<template>
    <div>
      <p>作者推荐</p>
      <div id="hotLi">
        <div v-for="(item,i) in hotUsers" :key="i" id="li">
          <div id="userImg">
            <img :src="item.userImg" />
          </div>
          <div id="nameMsg">
            <div id="userName">{{ item.userName }}</div>
            <div id="userMsg">发表了{{item.dt}}条动态，被{{item.bgz}}人关注 </div>
          </div>
          <div id="addConcern">
            <p>+ 关注</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "recommendation",
        props:['hotUsers'],
        methods:{

        }
    }
</script>

<style scoped>
p {
  color: #555555;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #DDDDDD;
}
  #li {
    display: flex;
    flex-direction: row;
    height: 80px;
    border-bottom: 1px solid #DDDDDD;
  }
  #nameMsg {
    margin-left: 10px;
  }
  #userImg {
    height: 55px;
    width: 55px;
    margin-top: 15px;
  }
  #userImg img {
    display: block;
    width: 100%;
    height: 100%;
  }
  #nameMsg {
    display: flex;
    flex-direction: column;
    width: 160px;
  }
  #userName {
    color: #EA6F5A;
    font-size: 15px;
    padding-top: 10px;
  }
  #userMsg {
    font-size: 13px;
    color: #666666;
    padding-top: 10px;
  }
  #addConcern {
    width: 70px;
    height: 80px;
    line-height: 80px;
  }
  #addConcern p {
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #42C04E;
  }

  #userImg img:hover ,
  #userName:hover ,
  #addConcern p:hover {
    cursor: pointer;
  }
</style>
