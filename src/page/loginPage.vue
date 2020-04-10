<template>
    <div id="bgi">
      <img src="../assets/image/login.jpg">
      <div id="login">
        <form>
          <div id="loginNav">
            <a href="" id="a-login" @click.prevent="">登录</a>
            <span id="a-span">•</span>
            <router-link to="/register" id="a-register">注册</router-link>
          </div>
          <component :is="'login'" ></component>
        </form>
      </div>
    </div>
</template>

<script>
  import login from '../components/login'
    export default {
      name: "loginPage",
      components:{login},
      data(){
        return{
        }
      },
      methods: {
      }
    }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  #bgi {
    position: relative;
    background-color: #DDDDDD;
  }
  #bgi img {
    width: 100%;
    height: 100%;
  }
  #login {
    display: inline-block;
    border: 1px solid #969696;
    border-radius: 5%;
    position: absolute;
    left: 320px;
    top: 110px;
    box-shadow: 0 0 15px #969696;
    background-color: #EEEEEE;
  }
#loginNav {
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: #969696;
}
  #a-span {
    margin: 0 30px;
    padding: 8px 0;
  }
  #a-login,
  #a-register {
    color: #969696;
    text-decoration: none;
    font-size: 18px;
    padding: 4px 10px;
  }
  #a-login {
    color: #EA6F5A;
    font-weight: bolder;
    border-bottom: 2px solid #EA6F5A;
  }
  #a-register:hover{
    border-bottom: 2px solid #EA6F5A;
  }
</style>
