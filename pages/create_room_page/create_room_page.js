// pages/create_room_page/create_room_page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      room_num: null,
      room_secret: null,
      flag: false
    },

    input_num:function(e){    
      this.data.room_num = e.detail.value;
    },
    input_secret:function(e){
      this.data.room_secret = e.detail.value;
    },
    /**
     * 生命周期函数--监听页面加载
     */
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
        if(res.data === "createFail"){
            wx.showToast({
              title: '房间号已被使用',
              duration:2000,
            });
          }
          else if(result.data === "dataFormatError"){
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
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    create_things:function(){
      if(this.data.flag) 
      {
        wx.showToast({
          title: '请勿重复创建房间',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if(this.data.room_num == null)
      {
        wx.showToast({
          title: '房间号不能为空',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      else if(this.data.room_num.length != 4)
      {
        wx.showToast({
          title: '房间号长度不为4',
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
      else if(this.data.room_secret.length > 8)
      {
        wx.showToast({
          title: '房间密码不应大于8位',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      setTimeout(() => {
        wx.showModal({
          title: '提示',
          content: '创建成功!\r\n等待对方进入您的房间',
          showCancel: false,
          confirmText: '确定',
          duration: 1000
        });
        this.data.flag = true;
    }, 1000); 
      
    },
    
    goToHomePage: function () {
        wx.redirectTo({
            url: '/pages/modes/modes'
        });
    },
})