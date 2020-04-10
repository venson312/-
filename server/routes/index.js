var express = require('express');
var router = express.Router();
var $mysql = require('mysql');
var sql = require('../mysql');
var bodyParser = require('body-parser');
var formidable = require('../node_modules/formidable');
var fs = require('fs');
var path = require('path');
var static = require('express-static');



var app = new express();
//Express 初始化 app 作为 HTTP 服务器的回调函数
// var http = require('http').Server(app);
// var io = require('socket.io')(http);


//创建application/json解析
// var jsonParser = bodyParser.json();
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

//创建application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});

//连接数据库
var $sql = $mysql.createConnection(sql.mysql);
$sql.connect();

// router.get('/', (req, res, next) => {
//   res.send('success!')
// });
/* GET home page. */
//注册请求
router.post('/register',function (req,res,next) {
  let insertSql = 'INSERT INTO sn_user(username,password,telephone,identity) VALUES("'+req.body.username+'","'+req.body.password+'","'+req.body.telephone+'","'+req.body.identity+'")';
  $sql.query(insertSql,function (error,result,fields) {
    if(result){
      let result1 = false;
      res.send(result1);
    }else{
      let result2 = true;
      res.send(result2);
    }
  })
});

//登录验证请求
router.post('/login',function (req,res,next) {
  let selectSql = `SELECT * FROM sn_user WHERE username = '${req.body.username}' and password = '${req.body.password}'`;
  $sql.query(selectSql,function (error,result,fields) {
    if(result.length == 0){
      let result1 = false;
      res.send(result1);
    }else{
      result = JSON.stringify(result);
      // console.log(result);
      res.send(result);
    }
  })
});

//获取用户基本信息
router.post('/usermessage',function (req,res,next) {
  // console.log(req.body.userid);
  let selectSql = 'SELECT * FROM sn_user WHERE user_id = '+ req.body.userid +'';
  $sql.query(selectSql,function (error,result,fields) {
    result = JSON.stringify(result);
    res.send(result);
  })
})

//主页加载的请求
router.post('/', function(req, res, next) {
  let selectSql = `select * from sn_dynamic,sn_user,sn_dynamic_sum where sn_dynamic.user_id=sn_user.user_id AND sn_dynamic.dynamic_id=sn_dynamic_sum.dynamic_id ORDER BY sn_dynamic.dynamic_id DESC`;
  $sql.query(selectSql,function (error, results, fields){
    let dynamic = JSON.stringify(results);
    res.send(dynamic);
  })
});

//用户界面的动态请求
router.post('/userDynamic', function(req, res, next) {
  let selectSql = `select * from sn_dynamic,sn_user,sn_dynamic_sum where sn_dynamic.user_id=sn_user.user_id AND sn_dynamic.dynamic_id=sn_dynamic_sum.dynamic_id AND sn_dynamic.user_id = ${req.body.user_id}`;
  $sql.query(selectSql,function (error, results, fields){
    let dynamic = JSON.stringify(results);
    res.send(dynamic);
  })
});

//动态页面的请求
router.post('/dynamicpage',function (req,res,next) {
  let dynamicId = req.body.dynamicId;
  let selectSql1 = `select * FROM sn_dynamic,sn_user,sn_dynamic_sum WHERE sn_dynamic.user_id=sn_user.user_id AND sn_dynamic.dynamic_id=sn_dynamic_sum.dynamic_id AND sn_dynamic.dynamic_id=${dynamicId}`;
  let selectSql2 = `select * FROM sn_comment1,sn_user WHERE sn_comment1.user_id=sn_user.user_id AND sn_comment1.dynamic_id=${dynamicId} ORDER BY sn_comment1.comment1_id DESC`;
  let selectSql3 = `select * FROM sn_comment2,sn_user WHERE sn_comment2.user_id=sn_user.user_id AND sn_comment2.dynamic_id=${dynamicId} ORDER BY sn_comment2.comment2_id DESC`;
  new Promise(resolve => {
    $sql.query(selectSql1,function (error,result,fields) {
      if(error) throw error
      resolve(result);
    })
  }).then(res => {
      return new Promise(resolve => {
        let dynamic1 = res;
        $sql.query(selectSql2,function (error,result,fields) {
          if(error) throw error
          dynamic1[0].comment1 = result;
          resolve(dynamic1);
        })
    })
  }).then(result => {
      let dynamic2 = result;
      $sql.query(selectSql3,function (error,result,fields) {
        if(error) throw error;
        let comment2 = result;
        for (let i in dynamic2[0].comment1) {
          dynamic2[0].comment1[i].comment2 = [];
          for (let j in comment2) {
            if (dynamic2[0].comment1[i].comment1_id == comment2[j].comment1_id) {
              dynamic2[0].comment1[i].comment2.push(comment2[j]);
            }
          }
        }
        res.send(dynamic2);
      });
  })

});

//图片上传请求,使用formidable模块接收图片
router.post('/upload',function (req,res,next) {
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = "./public/images";
  form.keepExtensions = true;//保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;
  //处理图片
  form.parse(req,function (err,fields,files) {
    // console.log(files.file.name);
    var filename = files.file.name;
    var nameArray = filename.split('.');//将图片名称和图片后缀分割
    var type = nameArray[nameArray.length-1];//获取后缀
    var name = '';
    for (let i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i];
    }
    var date = new Date();
    var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
    var imgName = name + time + '.'+ type;
    var newPath = form.uploadDir + '/' + imgName;
    fs.renameSync(files.file.path,newPath);//重命名
    res.send({imgUrl:"/public/images/"+imgName});
  });
});

//发布动态的请求
router.post('/releasepage',function (req,res,next) {
  let image = JSON.stringify(req.body.image);
  let insertSql = `INSERT INTO sn_dynamic(publishtime,textcontent,image,user_id) VALUES("${req.body.publishtime}","${req.body.content}",'${image}',"${req.body.userid}")`;
  let selectSql = `SELECT MAX(dynamic_id) FROM sn_dynamic`;
  let insertSql2 = ``;
  // let insertSql2 = `INSERT INTO sn_dynamic_sum(dynamic_id) VALUES (100) `
  new Promise(resolve => {
    $sql.query(insertSql,function (error,result,fiedls) {
      if (error) throw error;
      // res.send(result);
      resolve(result);
    })
  }).then(result1=>{
    return new Promise(resolve => {
      $sql.query(selectSql,function (error,result,fiedls) {
        if (error) throw error;
        let maxDynamic = result[0]['MAX(dynamic_id)'];
        insertSql2 = `INSERT INTO sn_dynamic_sum(dynamic_id) VALUES (${maxDynamic})`;
        resolve(result1);
      })
    }).then(result2=>{
      $sql.query(insertSql2,function (error,result,fiedls) {
        if(error)throw error;
        res.send(result);
      })
    })
  })

});

//疾病页面列表请求
router.post('/diseaseli',function (req,res,next) {
  let selectSql = `SELECT * FROM sn_disease WHERE animalType='${req.body.animalType}'`;
  $sql.query(selectSql,function (error,result,fiedls) {
    res.send(JSON.stringify(result));
  })
})

//疾病详情页面请求
router.post('/diseaseContent',function (req,res,next) {
  let selextSql = `SELECT * FROM sn_disease WHERE diseaseName='${req.body.diseaseName}'`;
  $sql.query(selextSql,function (error,result,fiedls) {
    res.send(JSON.stringify(result));
  })
});

//一级评论
router.post('/comment1',function (req,res,next) {
  let insertSql = `INSERT INTO sn_comment1(dynamic_id,user_id,time,content,promulgator_id) VALUES('${req.body.dynamicId}','${req.body.userId}','${req.body.time}','${req.body.content}','${req.body.promulgatorId}')`;
  let updateSql = `update sn_dynamic_sum set comment_sum=comment_sum+1 where dynamic_id = ${req.body.dynamicId}`;
  new Promise(resolve => {
    $sql.query(insertSql,function (error,result,fiedls) {
      if (error) throw error;
      resolve(result);
      // res.send(result);
    })
  }).then(result => {
    $sql.query(updateSql,function (error,result1,fiedls) {
      if (error) throw error;
      res.send(result);
    })
  })
});

//二级评论
router.post('/comment2',function (req,res,next) {
  let insertSql = `INSERT INTO sn_comment2(dynamic_id,comment1_id,user_id,time,content,promulgator_id) VALUES('${req.body.dynamicId}','${req.body.comment1_id}','${req.body.userId}','${req.body.time}','${req.body.content}','${req.body.promulgatorId}')`;
  let updateSql = `update sn_dynamic_sum set comment_sum=comment_sum+1 where dynamic_id = ${req.body.dynamicId}`;
  new Promise(resolve => {
    $sql.query(insertSql,function (error,result,fiedls) {
      if (error) throw error;
      resolve(result);
    })
  }).then(result => {
    $sql.query(updateSql,function (error,result1,fiedls) {
      if (error) throw error;
      res.send(result);
    })
  })
});

//消息提醒
router.post('/msgSum',function (req,res,next) {
  let data = {
    likeSum : 0,
    commentSum : 0,
    mailtimeSum : 0,
    msgSum : 0,
  }
  let selectSql1 = `SELECT COUNT(*) FROM sn_like WHERE like_state=1 AND promulgator_id=${req.body.promulgatorId}`;
  let selectSql2 = `SELECT COUNT(*) FROM sn_comment1 WHERE comment1_state=1 AND promulgator_id=${req.body.promulgatorId}`;
  new Promise(resolve => {
    $sql.query(selectSql1,function (error,result,fiedls) {
      if(error)throw error;
      data.likeSum = result[0]['COUNT(*)'];
      resolve();
    });
  }).then(result1 => {
    return new Promise(resolve => {
      $sql.query(selectSql2,function (error,result,fiedls) {
        if(error)throw error;
        data.commentSum = result[0]['COUNT(*)'];
        res.send(data);
      });
    })
  })

})

//消息界面中的评论
router.post('/msgComment',function (req,res,next) {
  let selectSql = `SELECT * FROM sn_user,sn_comment1 WHERE sn_user.user_id=sn_comment1.promulgator_id AND comment1_state=1 AND promulgator_id=${req.body.promulgatorId}`
  $sql.query(selectSql,function (error,result,fiedls) {
    res.send(JSON.stringify(result));
  })
})

//消息界面中的点赞
router.post('/msgLike',function (req,res,next) {
  let selectSql = `SELECT * FROM sn_user,sn_like WHERE sn_user.user_id=sn_like.promulgator_id AND like_state=1 AND promulgator_id=${req.body.promulgatorId}`
  $sql.query(selectSql,function (error,result,fiedls) {
    res.send(JSON.stringify(result));
  })
})

//获取用户收藏的动态的信息
router.post('/collectDynamic',function (req,res,next) {
  let selectSql = `SELECT * FROM sn_collect,sn_dynamic,sn_user,sn_dynamic_sum WHERE sn_dynamic.user_id=sn_user.user_id AND sn_collect.dynamic_id=sn_dynamic.dynamic_id AND sn_collect.dynamic_id=sn_dynamic_sum.dynamic_id AND sn_collect.user_id=${req.body.user_id}`
  $sql.query(selectSql,function (error,result,fiedls) {
    if(error)throw error;
    res.send(JSON.stringify(result));
  })
})

//用户头像
router.post('/headImg',function (req,res,next) {
  let selectSql = `SELECT avatar FROM sn_user WHERE user_id=${req.body.userId}`;
  $sql.query(selectSql,function (error,result,fiedls) {
    if(error)throw error;
    res.send(JSON.stringify(result));
  })
})

//通过模糊查询搜索相关动态
router.post('/searchDynamic',function (req,res,next) {
  let selectSql = `SELECT * FROM sn_dynamic,sn_user,sn_dynamic_sum where sn_dynamic.user_id=sn_user.user_id AND sn_dynamic.dynamic_id=sn_dynamic_sum.dynamic_id AND sn_dynamic.textcontent LIKE '%${req.body.key}%'`
  $sql.query(selectSql,function (error,result,fiedls) {
    if(error)throw error;
    res.send(JSON.stringify(result));
  })
})

//修改个人基本信息
router.post('/updateInf',function (req,res,next) {
  // console.log(req.body);
  let updateSql = `UPDATE sn_user SET username='${req.body.username}' ,\`password\`='${req.body.password}' ,telephone='${req.body.telephone}' ,identity='${req.body.itdentity}' ,birth='${req.body.brith}' ,avatar='${req.body.avatar}' WHERE user_id=${req.body.userid}`
  // console.log(updateSql);
  $sql.query(updateSql,function (error,result,fiedls) {
    if(error)throw error;
    console.log(result);
    res.send(result);
  })
})

//三大热门推荐
router.post('/likeHot',function (req,res,next) {
  // console.log(req.body);
  let selectSql = `select * from sn_dynamic,sn_user,sn_dynamic_sum where sn_dynamic.user_id=sn_user.user_id AND sn_dynamic.dynamic_id=sn_dynamic_sum.dynamic_id ORDER BY like_sum DESC`;
  $sql.query(selectSql,function (error,result,fiedls) {
    if(error)throw error;
    res.send(JSON.stringify(result));
  })
})
router.post('/commentHot',function (req,res,next) {
  // console.log(req.body);
  let selectSql = `select * from sn_dynamic,sn_user,sn_dynamic_sum where sn_dynamic.user_id=sn_user.user_id AND sn_dynamic.dynamic_id=sn_dynamic_sum.dynamic_id ORDER BY comment_sum DESC`;
  $sql.query(selectSql,function (error,result,fiedls) {
    if(error)throw error;
    res.send(JSON.stringify(result));
  })
})
router.post('/collectHot',function (req,res,next) {
  // console.log(req.body);
  let selectSql = `select * from sn_dynamic,sn_user,sn_dynamic_sum where sn_dynamic.user_id=sn_user.user_id AND sn_dynamic.dynamic_id=sn_dynamic_sum.dynamic_id ORDER BY collect_sum DESC`;
  $sql.query(selectSql,function (error,result,fiedls) {
    if(error)throw error;
    res.send(JSON.stringify(result));
  })
})

//判断是否已经关注
router.post('/isFollower',function (req,res,next) {
  // console.log(req.body);
  let selectSql = `SELECT * FROM sn_attention WHERE follower_id=${req.body.followerId} and be_follower_id=${req.body.beFollowerId}`;
  $sql.query(selectSql,function (error,result,fiedls) {
    if(error)throw error;
    // console.log(result);
    res.send(JSON.stringify(result));
  })
})

//加关注和取消关注
router.post('/follower',function (req,res,next) {
  let insertSql = `INSERT INTO sn_attention(follower_id,be_follower_id) VALUES (${req.body.followerId},${req.body.beFollowerId})`
  $sql.query(insertSql,function (error,result,fiedls) {
    if (error)throw error;
    res.send(JSON.stringify(result));
  })
})
router.post('/noFollower',function (req,res,next) {
  let deleteSql = `DELETE FROM sn_attention WHERE follower_id=${req.body.followerId} AND be_follower_id=${req.body.beFollowerId}`
  $sql.query(deleteSql,function (error,result,fiedls) {
    if(error)throw error;
    res.send(JSON.stringify(result));
  })
})

//获取关注的人和粉丝
router.post('/getFollower',function (req,res,next) {
  let selectSql = `SELECT * FROM sn_attention,sn_user WHERE sn_attention.be_follower_id=sn_user.user_id AND sn_attention.follower_id=${req.body.userId}`
  $sql.query(selectSql,function (error,result,fiedls) {
    if (error)throw error;
    res.send(JSON.stringify(result));
  })
})
router.post('/getBeFollower',function (req,res,next) {
  let selectSql = `SELECT * FROM sn_attention,sn_user WHERE sn_attention.follower_id=sn_user.user_id AND sn_attention.be_follower_id=${req.body.userId}`
  $sql.query(selectSql,function (error,result,fiedls) {
    if(error)throw error;
    res.send(JSON.stringify(result));
  })
})

module.exports = router;
