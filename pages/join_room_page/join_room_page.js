// pages/create_room_page/create_room_page.js
Page({
data: {
    room_num: null,
    room_secret: null,
},

input_num:function(e){    
    this.data.room_num = e.detail.value;
},
input_secret:function(e){
    this.data.room_secret = e.detail.value;
},

onLoad(options) {

},
contact:function(e){
    console.log(e)
    let socket_status=false;
    let socket_message_queue=["submitType=CreateRoom"+"&roomName="+this.data.RoomName+"&roomPsw="+this.data.RoomPsw+"&ownerName="+this.data.userInfo.nickName+"&initmoney="+this.data.game_money+"&totaltimes="+this.data.game_num];
    wx.connectSocket({
    url: 'ws://127.0.0.1:3001',});
    wx.onSocketOpen((result) => {
    socket_status=true;
    for(let i=0;i<socket_message_queue.length;i++){
        if(socket_status){
        wx.sendSocketMessage({
        data: socket_message_queue[i],
        });
        }else{
            socket_message_queue.push(socket_message_queue[i]);
        }
        }
        socket_message_queue=[];
    });
    
    wx.onSocketMessage((res) => { 
    if(result.data === "dataFormatError"){
        wx.showToast({
            title: '服务器连接失败',
            duration:2000,
        });
        }
        else{
            let dataarr=result.data.split('&');
            if(dataarr[0].split('=')[1] === this.data.RoomName){
            wx.hideLoading({
                complete: (res) => {
                console.log("othername="+dataarr[1].split('=')[1]);
                try {
                    wx.setStorageSync("roomname", this.data.RoomName);
                    wx.setStorageSync( "myname", this.data.userInfo.nickName);
                    wx.setStorageSync("isfirst", true);
                    wx.setStorageSync( "othername", dataarr[1].split('=')[1]);
                } catch (e) { 
                    console.error("设置对局信息错误");
                } finally{
                    wx.navigateTo({
                    url: '/pages/vsgame/vsgame',
                    });
                }
                },
            })
            }
        }
    });   
    },

    onUdpMessage(res) {
        udp.onMessage((res) => {
            //处理接收到的数据
            if (res.remoteInfo.size > 0) {
                //将监听到的消息转换为字符串，必须要转换才能正常显示，因为监听到的消息是二进制的数组
                let unit8Arr = new Uint8Array(res.message)
                let encodedString = String.fromCharCode.apply(null, unit8Arr)
                let decodedString = decodeURIComponent(escape((encodedString)))//没有这一步会出现中文乱码
                console.log('UDP Received message', decodedString)
                var obj = decodedString;
                app.globalData.currMsg = JSON.parse(obj.trim());
                console.log(typeof app.globalData.currMsg)
            } else {
                failure('接收到的信息为空！')
            }

        })
    },
    create_things:function(){
        if(this.data.room_num == null)
        {
            wx.showToast({
            title: '房间号不能为空',
            icon: 'none',
            duration: 2000
            });
            return;
        }
        else if(this.data.room_secret == null)
        {
            wx.showToast({
            title: '房间密码不能为空',
            icon: 'none',
            duration: 2000
            });
            return;
        }
        var random_time = Math.random() * 10000;
        wx.showToast({
        title: '搜寻中',
        icon: 'loading',
        duration: random_time 
        })
        setTimeout(() => {
        wx.showModal({
            title: '提示',
            content: '未找到该房间',
            showCancel: false,
            confirmText: '确定',
            duration: 1000
        });
        }, random_time); 
    },

    goToHomePage: function () {
        wx.redirectTo({
            url: '/pages/modes/modes'
        });
    },
})