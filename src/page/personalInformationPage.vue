<template>
    <div>
      <headernav></headernav>
      <div class="mainBox">
        <div class="title">
          <div>个人基本信息</div>
          <el-row>
            <el-button type="info" plain @click="flag=true">编辑</el-button>
            <router-link to="/"><el-button type="danger" plain>取消</el-button></router-link>
            <el-button type="primary" plain @click="submit1">更改</el-button>
          </el-row>
        </div>
        <div class="userImg">
          <div>头像:</div>
          <div class="headImg img" :style="'background-image: url('+ mediaUrl +userMessage.avatar+')'"></div>
          <div class="img img1">
            <el-upload
              action=""
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :data="resData"
              ref="upload"
              name="imgUrl"
              :http-request="handleHttpRequest"
              :limit="1">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <div class="message">
          <div class="fl">
            <div class="f2">用户名：{{userMessage.username}}</div>
            <div  v-show="flag" class="fl">
              <textarea name="edit" class="edit editDiv" v-model="userName"></textarea>
              <div class="f3">{{userName}}</div>
            </div>
          </div>
          <div class="fl">
            <div class="f2">用户身份：{{userMessage.identity}}</div>
            <div  v-show="flag" class="fl">
              <textarea name="edit" class="edit editDiv" v-model="userId"></textarea>
              <div class="f3">{{userId}}</div>
            </div>
          </div>
          <div class="fl">
            <div class="f2">密码：{{userMessage.password}}</div>
            <div  v-show="flag" class="fl">
              <textarea name="edit" class="edit editDiv" v-model="userPassword"></textarea>
              <div class="f3">{{userPassword}}</div>
            </div>
          </div>
          <div class="fl">
            <div class="f2">电话：{{userMessage.telephone}}</div>
            <div  v-show="flag" class="fl">
              <textarea name="edit" class="edit editDiv" v-model="userTp"></textarea>
              <div class="f3">{{userTp}}</div>
            </div>
          </div>
          <div class="fl">
            <div class="f2">出生日期：{{userMessage.birth}}</div>
            <div  v-show="flag" class="fl">
              <textarea name="edit" class="edit editDiv" v-model="userBrith"></textarea>
              <div class="f3">{{userBrith}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import headernav from '../components/headerNav'
    export default {
        name: "personalInformationPage",
        components:{headernav},
        data(){
          return{
            mediaUrl: sessionStorage.mediaUrl,
            userMessage:'',
            flag:false,

            //编辑后的信息
            userName:'',
            userId:'',
            userPassword:'',
            userTp:'',
            userBrith:'',

            // 头像
            file:'',
            dialogImageUrl: '',
            dialogVisible: false,
            imgUrl:'',
            userId: '',
            uid:'',
            // 上传图片时附带的额外参数userId
            resData:{
              userId: window.localStorage["userId"]
            },
            promiseArr: []

          }
        },
        methods:{
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          // 点击发送按钮上传图片
          submit1(){
            this.$refs.upload.submit();
            Promise.all(this.promiseArr).then(res => {
              this.imgUrl = res[0];
              this.fn();
            });
          },
          fn(){
            if (this.userName =='' &&this.userId=='' &&this.userPassword=='' &&this.userTp=='' &&this.userBrith=='' && this.imgUrl == ''){
              alert('请将所有信息填写完整！');
            } else {
              this.axios.post('/updateInf',{
                userid:sessionStorage.getItem("userId"),
                username:this.userName,
                itdentity:this.userId,
                password:this.userPassword,
                telephone:this.userTp,
                brith:this.userBrith,
                avatar:this.imgUrl,
              }).then(res => {
                if (res.request.responseText) {
                  this.$router.push({path:'/'});
                }
              })
            }
          },
          //覆盖默认的上传行为，自定义上传行为
          handleHttpRequest(a){
            this.promiseArr.push(new Promise((resolve, reject) => {
              var formdata = new FormData();
              formdata.append('file',a.file);
              let config = {
                headers:{
                  'Content-Type':'multipart/form-data'
                }
              }
              this.axios.post('/upload',formdata,config).then(res => {
                if(res.status==200){
                  resolve(res.data.imgUrl);
                }
              })
            }));
          }
        },


        created() {
          this.axios.post('/usermessage',{userid:sessionStorage.getItem('userId')})
            .then(res => {
              this.userMessage = JSON.parse(res.request.responseText)[0];
              this.userName=this.userMessage.username;
              this.userId=this.userMessage.identity;
              this.userPassword=this.userMessage.password;
              this.userTp=this.userMessage.telephone;
              this.userBrith=this.userMessage.birth;
              this.imgUrl = this.userMessage.avatar;
            })
        }
    }
</script>

<style scoped>
  .mainBox {
    margin: 100px 200px 0 200px;
    display: flex;
    flex-direction: column;
    background-color: #EEEEEE;
    padding: 0 20px 0 20px;
  }
  .title {
    height: 70px;
    line-height: 70px;
    font-size: 30px;
    letter-spacing: 2px;
    color: #666666;
    border-bottom: 1px solid #000000;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .userImg {
    height: 200px;
    line-height: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .headImg {
    width: 100px;
    height: 100px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 100px;
  }
  .img {
    margin-left: 50px;
  }
  .img1 {
    padding-top: 100px;
  }
  /*上传头像的组件样式*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  /*编辑信息的样式*/
  .fl {
    display: flex;
    flex-direction: row;
    height: 50px;
    line-height: 50px;
  }
  .f2 {
    width: 220px;
  }
  .f3 {
    margin-left: 30px;
  }
  .editDiv {
    margin-top: 10px;
    border: 1px solid #AAAAAA;
    border-radius: 10px;
    background-color: #EEEEEE;
  }
  .edit {
    margin-left: 10px;
    padding: 5px 0 0 5px;
    /*margin: 5px;*/
    width: 150px;
    height: 30px;
    /*border: none;*/
    outline: none;
    font-size: 20px;
    background-color: #FFFFFF;
    resize: none;
  }
</style>
