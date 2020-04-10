var $mysql = require('mysql');
var sql = require('../mysql');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var app = new express();
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


//存储roomId
let roomIds = {};
//根据两个用户标志，组成roomId
var generateRoomId = function(senderId, receiverId){
  let roomId = senderId + '$' + receiverId;
  if(roomIds[roomId] !== undefined && roomIds[roomId] === 1){
    //存在
    return roomId;
  }else{
    //不存在
    roomId = receiverId + '$' + senderId;
    if(roomIds[roomId] === undefined && roomIds[roomId] !== 1){//不存在
      roomIds[roomId] = 1;
    }
    return roomId;
  }
}


socket = function(io){
  //实时通讯socket.io

  io.on('connection',function (socket) {
    console.log('websocket连接上了');
    //点赞
    socket.on('like',function (msg) {
      let insertSql = `INSERT INTO sn_like (dynamic_id,user_id,promulgator_id) VALUES (${msg.dynamicId},${msg.userId},${msg.promulgatorId})`;
      let updateSql = `update sn_dynamic_sum set like_sum=like_sum+1 where dynamic_id = ${msg.dynamicId}`;
      let selectSql = `SELECT like_sum FROM sn_dynamic_sum WHERE dynamic_id=${msg.dynamicId}`;
      let selectSql1 = `SELECT COUNT(*) FROM sn_like WHERE like_state=1 AND promulgator_id=${msg.promulgatorId}`;
      new Promise(resolve => {
        $sql.query(insertSql,function (error,result,fields) {
          if (error) throw error;
          resolve();
        })
      }).then(result1 =>{
        return new Promise(resolve => {
          $sql.query(selectSql1,function (error,result,fields) {
            if (error)throw error;
            result[0].userId = msg.promulgatorId;
            io.emit('likeDot',JSON.stringify(result));
            resolve(result);
          })
        })
      }).then(result2 => {
        new Promise(resolve => {
          $sql.query(updateSql,function (error,result,fields) {
            if (error) throw error;
            resolve();
          })
        }).then(result3 => {
          $sql.query(selectSql,function (error,result,fields) {
            if (error) throw error;
            result[0].dynamicId = msg.dynamicId;
            io.emit('likeSum',JSON.stringify(result));
          })
        })
      })
    });
    // 取消点赞
    socket.on('unlike',function (msg) {
      let deleteSql = `DELETE FROM sn_like WHERE dynamic_id = ${msg.dynamicId} AND user_id = ${msg.userId}`;
      let updateSql = `update sn_dynamic_sum set like_sum=like_sum-1 WHERE dynamic_id = ${msg.dynamicId}`;
      let selectSql = `SELECT like_sum FROM sn_dynamic_sum WHERE dynamic_id=${msg.dynamicId}`;
      let selectSql1 = `SELECT COUNT(*) FROM sn_like WHERE like_state=1 AND promulgator_id=${msg.promulgatorId}`
      new Promise(resolve => {
        $sql.query(deleteSql,function (error,result,fields) {
          if (error) throw error;
          resolve();
        })
      }).then(result1 => {
        return new Promise(resolve => {
          $sql.query(selectSql1,function (error,result,fields) {
            if (error) throw error;
            result[0].userId = msg.promulgatorId;
            io.emit('likeDot',JSON.stringify(result));
            resolve(result);
          })
        })
      }).then(result2 => {
        new Promise(resolve => {
          $sql.query(updateSql,function (error,result,fields) {
            if (error) throw error;
            resolve();
          })
        }).then(result3 => {
          $sql.query(selectSql,function (error,result,fields) {
            if (error) throw error;
            result[0].dynamicId = msg.dynamicId;
            io.emit('likeSum',JSON.stringify(result));
          })
        })
      })
    });
    //收藏
    socket.on('collect',(msg) => {
      let insertSql = `INSERT INTO sn_collect (dynamic_id,user_id,promulgator_id) VALUES (${msg.dynamicId},${msg.userId},${msg.promulgatorId})`;
      let updateSql = `update sn_dynamic_sum set collect_sum=collect_sum+1 where dynamic_id = ${msg.dynamicId}`;
      let selectSql = `SELECT collect_sum FROM sn_dynamic_sum WHERE dynamic_id=${msg.dynamicId}`;
      let selectSql1 = `SELECT COUNT(*) FROM sn_collect WHERE collect_state=1 AND promulgator_id=${msg.promulgatorId}`;
      new Promise(resolve => {
        $sql.query(insertSql,function (error,result,fields) {
          if (error) throw error;
          resolve();
        })
      }).then(result1 =>{
        return new Promise(resolve => {
          $sql.query(selectSql1,function (error,result,fields) {
            if (error)throw error;
            result[0].userId = msg.promulgatorId;
            io.emit('collectDot',JSON.stringify(result));
            resolve(result);
          })
        })
      }).then(result2 => {
        new Promise(resolve => {
          $sql.query(updateSql,function (error,result,fields) {
            if (error) throw error;
            resolve();
          })
        }).then(result3 => {
          $sql.query(selectSql,function (error,result,fields) {
            if (error) throw error;
            result[0].dynamicId = msg.dynamicId;
            io.emit('collectSum',JSON.stringify(result));
          })
        })
      })
    });
    //取消收藏
    socket.on('uncollect',(msg) => {
      let deleteSql = `DELETE FROM sn_collect WHERE dynamic_id = ${msg.dynamicId} AND user_id = ${msg.userId}`;
      let updateSql = `update sn_dynamic_sum set collect_sum=collect_sum-1 WHERE dynamic_id = ${msg.dynamicId}`;
      let selectSql = `SELECT collect_sum FROM sn_dynamic_sum WHERE dynamic_id=${msg.dynamicId}`;
      let selectSql1 = `SELECT COUNT(*) FROM sn_collect WHERE collect_state=1 AND promulgator_id=${msg.promulgatorId}`
      new Promise(resolve => {
        $sql.query(deleteSql,function (error,result,fields) {
          if (error) throw error;
          resolve();
        })
      }).then(result1 =>{
        return new Promise(resolve => {
          $sql.query(selectSql1,function (error,result,fields) {
            if (error)throw error;
            result[0].userId = msg.promulgatorId;
            io.emit('collectDot',JSON.stringify(result));
            resolve(result);
          })
        })
      }).then(result2 => {
        new Promise(resolve => {
          $sql.query(updateSql,function (error,result,fields) {
            if (error) throw error;
            resolve();
          })
        }).then(result3 => {
          $sql.query(selectSql,function (error,result,fields) {
            if (error) throw error;
            result[0].dynamicId = msg.dynamicId;
            io.emit('collectSum',JSON.stringify(result));
          })
        })
      })
    });

    //实时通讯聊天
    //客户端加入房间，需要senderId和receiverId
    socket.on('joinRoom', (msg) =>{
      let roomId = generateRoomId(msg.senderId, msg.receiverId);
      let seleteSql = `SELECT * FROM sn_mailtime WHERE room_id=${msg.senderId+msg.receiverId} OR room_id=${msg.receiverId+msg.senderId}`;
      socket.join(roomId);
      $sql.query(seleteSql,function (error,result,fiedls) {
        if(error)throw error;
        io.sockets.in(generateRoomId(msg.senderId, msg.receiverId)).emit('receiveMsg', result);
      })
    });
    // 客户端调用sendMsg事件，服务端监听sendMsg事件
    socket.on('sendMsg', (msg) => {
      console.log(msg);
      let insertSql = `INSERT INTO sn_mailtime(sender_id,receiver_id,content,time,room_id) VALUES(${msg.senderId},${msg.receiverId},'${msg.content}','${msg.time}',${msg.roomId})`
      let seleteSql = `SELECT * FROM sn_mailtime WHERE room_id=${msg.senderId+msg.receiverId} OR room_id=${msg.receiverId+msg.senderId}`;
      new Promise(resolve => {
        $sql.query(insertSql,function (error,result,fiedls) {
          if(error)throw error;
          resolve();
        })
      }).then(result1 => {
        $sql.query(seleteSql,function (error,result,fiedls) {
          if(error)throw error;
          io.sockets.in(generateRoomId(msg.senderId, msg.receiverId)).emit('receiveMsg', result);
        })
      })
    });

    //
    //
    //
    //


  });
}
module.exports.socket = socket;
module.exports.router = router;


