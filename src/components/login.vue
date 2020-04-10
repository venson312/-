<template>
  <div id="loginMsg">
    <div id="msgdiv">
      <div id="un">
        <label>
          <span>账号：</span><input type="text" name="userName" id="userName" placeholder="请输入账号" v-model="userName">
        </label>
      </div>
      <div id="pw">
        <label>
          <span>密码：</span><input type="text" name="password" id="password" placeholder="请输入密码" v-model="passWord">
        </label>
      </div>
    </div>
    <!--<div id="check">-->
      <!--<label>-->
        <!--<input type="checkbox" name="remember"><span id="checkrem">记住我</span>-->
      <!--</label>-->
    <!--</div>-->
    <div id="butLogin">
      <input type="button" value="登录" @click="loginfn">
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return{
            userName:'',
            passWord:'',
          }
        },
        methods:{
          loginfn(){
            if (this.userName == '' || this.passWord == ''){
              alert('请输入账号和密码！')
            }else{
              this.axios.post('/login',{
                username:this.userName,
                password:this.passWord,
              }).then(res => {
                let result = JSON.parse(res.request.responseText);
                if (result) {
                  //将用户id放入sessionstorage
                  sessionStorage.setItem('userId',result[0].user_id);
                  //将用户id放入Vuex
                  this.$store.dispatch('setUser',result[0].user_id);
                  this.$router.push({path:'/'});
                }else{
                  alert('账号或密码错误！');
                }
              });
            }
          }
        }
    }
</script>

<style scoped>
#loginMsg {
  width: 300px;
  height: 250px;
  color: #777777;
}
  #msgdiv {
    padding: 50px 30px 10px 30px;
  }
  #un,
  #pw {
    height: 40px;
    background-color: #F8F8F8;
  }
  #un {
    border-bottom: 1px solid #DDDDDD;
    border-radius: 5px 5px 0 0;
  }
  #pw {
    border-radius: 0 0 5px 5px;
  }
  label {
    line-height: 40px;
    margin: 0 auto;
    padding-left: 10px;
  }
  input[type='text']{
    height: 23px;
    border: none;
    outline: none;
    background-color: #F8F8F8;
  }
  #check {
    padding-left: 25px;
  }
  #checkrem {
    padding-left: 5px;
    font-size: 15px;
  }
  #butLogin {
    padding : 30px 0 0 30px;
  }
  input[type='button'] {
    width: 240px;
    height: 38px;
    border-radius: 40px;
    outline: none;
    border: none;
    background-color: #3194D0;
    color: #FFFFFF;
    font-size: 18px;
  }
  input[type='button']:hover {
    background-color: #187CB7;
    cursor: pointer;
  }
</style>
