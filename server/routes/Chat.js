const socketIO = require('socket.io');
const UserService = require('../service/UserService');

class Chat{

    constructor(httpServer){
        this.io = socketIO(httpServer);
        this.roomIds = {};//存储roomId
    }

    //监听连接成功的事件，并将socket暴露出
    regChat(){
        let _this = this;
        this.io.on('connection', socket => {
            //客户端加入房间，需要senderId和receiverId
            socket.on('joinRoom', data =>{
                let { senderId, receiverId } = data;
                let roomId = this.generateRoomId(senderId, receiverId);
                socket.join(roomId);
                // console.log('joinRoom', roomId);
            });

            // 客户端调用服务端的sendMsg，服务端监听sendMsg事件
            socket.on('sendMsg', data => {
                let { senderId, receiverId, msg, time } = data;
                // console.log('sendMsg', data);
                socket.broadcast.in(this.generateRoomId(senderId, receiverId)).emit('receiveMsg', {senderId, msg});
                UserService.recordChatHistory(senderId, receiverId, msg, time, 1).then(status => {
                    let result = {...status, msg, senderId, receiverId}
                    console.log(result)
                    socket.emit('checkIsReceived', result);
                });
            });

            // 确认接收者已读取到消息
            socket.on('msgAccept', data => {
                // socket.emit('checkIsReceived', data);
                let {senderId, receiverId} = data;
                UserService.updateChatHistory(senderId, receiverId);
            });

            // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
            socket.on('disconnect', data => {
                console.log('connect disconnect');
                console.log(data);
                let {senderId, receiverId} = data;
                let roomId = this.generateRoomId(senderId, receiverId);
                //if(roomId){
                 //   delete _this.roomIds[roomId];
                //}
            });

        });
    }

    //根据两个用户标志，组成roomId
    generateRoomId(senderId, receiverId){
        let roomId = senderId + '$' + receiverId;
        if(this.roomIds[roomId] !== undefined && this.roomIds[roomId] === 1){//存在
            return roomId;
        }else{//不存在
            roomId = receiverId + '$' + senderId;
            if(this.roomIds[roomId] !== undefined && this.roomIds[roomId] !== 1){//不存在
                this.roomIds[roomId] = 1;
            }
            return roomId;
        }
    }

}


module.exports = Chat;
