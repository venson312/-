<template>
    <div id="bodyBox" class="bodyBox">
      <headernav></headernav>
      <div id="mainBox" class="mainBox">
        <div id="leftBox" class="leftBox">
          <div class="userImg" style="background-image: url('../../static/image/headimg/userImg.jpg')"></div>
          <div class="userName">
            <span>自由的小鸟</span>
          </div>
          <div class="msg">
            <div class="msg1">
              <span>11</span>
              <span class="span1">动态</span>
            </div>
            <div class="msg2">
              <span>22</span>
              <span class="span2">关注</span>
            </div>
            <div class="msg3">
              <span>33</span>
              <span class="span3">粉丝</span>
            </div>
          </div>
        </div>
        <div id="rightBox" class="rightBox">
          <div id="rightDiv" class="rightDiv">
            <span>发表动态</span>
            <button class="btn" @click="submit1"><i class="el-icon-share">发表</i></button>
          </div>
          <textarea id="rightTextarea" class="rightTextarea" placeholder="写下您想发表的动态" v-model="content"></textarea>
          <div>
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
              :limit="8">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import headernav from '../components/headerNav'
    export default {
        name: "releasePage",
        components:{headernav,},
        data(){
          return{
            username:"",
            avatar:'',
            content:'',

            file:'',
            dialogImageUrl: '',
            dialogVisible: false,
            imgUrl:[],
            userId: '',
            uid:'',
            // 上传图片时附带的额外参数userId
            resData:{
              userId: window.localStorage["userId"]
            },
            promiseArr: []
          }
        },
        methods: {
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
            this.imgUrl = res;
            this.fn();
          });
        },
        //将图片的存储路径和文字发送给后端
        fn(){
          if (this.content == '' && this.imgUrl.length == 0){
            alert('内容不能为空！');
          } else {
            this.axios.post('/releasepage',{
              userid:sessionStorage.getItem("userId"),
              username:this.username,
              avatar:this.avatar,
              publishtime:new Date(),
              content:this.content,
              image:this.imgUrl,
            }).then(res => {
              // console.log(res.request.responseText);
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
                  resolve(res.data.imgUrl)
                }
              })
            }));
        }
      },
      mounted() {
          console.log(sessionStorage.getItem("userId"));
          // this.axios.post('/usermessage',{
          //   userid:sessionStorage.getItem("userId")
          // }).then(res => {
          //   let result = JSON.parse(res.request.responseText);
          //   this.avatar = result[0].avatar;
          //   this.username = result[0].username;
          // })
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
    margin: 90px 150px 0 150px;
    display: flex;
    flex-direction: row;
    /*height: 530px;*/
  }
  .leftBox {
    flex: 1;
    box-shadow: 0 0 5px #bbbbbb;
    /*background-color: yellow;*/
  }
  .rightBox {
    flex: 3;
    margin-left: 20px;
    /*box-shadow: 0 0 5px #bbbbbb;*/
  }
  /*左边样式*/
  .userImg {
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 80px;
    margin: 0 auto;
    margin-top: 30px;
    border: 2px solid #EEEEEE;
  }
  .userName {
    font-size: 17px;
    color: #EA6F5A;
    letter-spacing: 2px;
    margin-top: 10px;
    text-align: center;
  }
  .msg {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 15px;
    font-size: 16px;
    color: #000000;
  }
  .msg1, .msg2, .msg3 {
    display: flex;
    flex-direction: column;
    width: 55px;
    text-align: center;
  }
  .msg1, .msg2 {
    border-right: 1px solid #EEEEEE;
  }
  .msg2, .msg3 {
    margin-left: 15px;
  }
  .msg .span1,.msg .span2,.msg .span3 {
    color: #969696;
  }
  /*右部样式*/
  .rightDiv {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    /*color: #676767;*/
    border-bottom: 1px solid #DDDDDD;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .btn {
    width: 80px;
    height: 30px;
    font-size: 16px;
    color: #FFFFFF;
    background-color: #42C04E;
    border: none;
    outline: none;
    box-shadow: 0 0 3px #42C04E;
    border-radius: 5px;
  }
  .btn:hover {
    cursor: pointer;
    background-color: #31A03D;
  }
  .rightTextarea {
    border: none;
    outline: none;
    resize: none;
    font-size: 20px;
    width: 100%;
    height: 150px;
    border: 1px solid #EEEEEE;
  }

</style>
