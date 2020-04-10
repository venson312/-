<template>
  <div id="loginMsg">
    <div id="msgdiv">
      <div id="un" class="inputBox">
        <label>
          <span>账号：</span><input type="text" name="userName" id="userName" placeholder="请输入账号" v-model="userName">
        </label>
      </div>
      <div id="id" class="inputBox">
        <label>
          <span>身份：</span><input type="text" name="password" id="identity" placeholder="请您的身份" v-model="idenTity">
        </label>
      </div>
      <div id="ph" class="inputBox">
        <label>
          <span>电话：</span><input type="text" name="telephone" id="phone" placeholder="请输入手机号码" v-model="telePhone">
        </label>
      </div>
      <div id="pw" class="inputBox">
        <label>
          <span>密码：</span><input type="text" name="password" id="password" placeholder="请输入密码" v-model="passWord">
        </label>
      </div>
    </div>
    <div id="butLogin">
      <input type="button" value="注册" @click="loginfn">
    </div>
  </div>
</template>

<script>
    export default {
        name: "register",
        data(){
          return{
            userName:'',
            passWord:'',
            telePhone:'',
            idenTity:'',
          }
        },
        methods:{
          loginfn(){
            if (this.userName == '' || this.passWord == '' || this.telePhone == '' || this.idenTity == ''){
              alert('请将信息填写完整！');
            }else{
              this.axios.post('/register',{
                username:this.userName,
                password:this.passWord,
                telephone:this.telePhone,
                identity:this.idenTity})
                .then(res => {
                  let result = JSON.parse(res.request.responseText);
                  if (result){
                    alert('注册成功！');
                    this.$router.push({path:'/login'});
                  }else{
                    alert('用户名已存在！');
                  }
              })
            }
          }
        }
    }
</script>

<style scoped>
  #loginMsg {
    width: 300px;
    height: 310px;
    color: #777777;
  }
  #msgdiv {
    padding: 50px 30px 10px 30px;
  }
  .inputBox {
    height: 40px;
    background-color: #F8F8F8;
  }
  #un {
    border-bottom: 1px solid #DDDDDD;
    border-radius: 5px 5px 0 0;
  }
  #id {
    border-bottom: 1px solid #DDDDDD;
  }
  #pw {
    border-top: 1px solid #DDDDDD;
    border-radius: 0 0 5px 5px;
  }
  label {
    line-height: 40px;
    margin: 0 auto;
    padding-left: 10px;
  }
  input[type='text'] {
    height: 23px;
    border: none;
    outline: none;
    background-color: #F8F8F8;
  }
  #butLogin {
    padding : 20px 0 0 30px;
  }
  input[type='button'] {
    width: 240px;
    height: 38px;
    border-radius: 40px;
    outline: none;
    border: none;
    background-color: #42C02E;
    color: #FFFFFF;
    font-size: 18px;
  }
  input[type='button']:hover {
    background-color: #2CA811;
    cursor: pointer;
  }
</style>
