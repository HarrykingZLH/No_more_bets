// pages/wifi_pk/wifi_pk.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    goToLastPage: function () {
      wx.navigateTo({
          url: '/pages/modes/modes' // 规则页面的路径，根据实际路径进行调整
      });
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    wx.showModal({
        title: '提示',
        content: '请确保您与您的好友在同一局域网内',
        confirmText: '确定',
        confirmColor: '#007bff',
        cancelText: '返回', // 显示取消按钮
        cancelColor: '#333',
      complete: (res) => {
        if (res.cancel) {
          wx.redirectTo({
            url: '/pages/modes/modes',
          })
        }
        if (res.confirm) {
          return;
        }
      }
    })
    },
    create_room:function(){
      wx.redirectTo({
        url: '/pages/create_room_page/create_room_page',
      })
    },
    join_room:function(){
      wx.redirectTo({
        url: '/pages/join_room_page/join_room_page',
      })
    },
    online_join:function(){
      var flag = true;
      var random_time = Math.random() * 2000;
      wx.showToast({
        title: '正在为您匹配中，请稍后',
        icon: 'loading',
        duration: random_time + 3000
      })
      setTimeout(function() {
        wx.hideLoading();
        wx.redirectTo({
          url: '/pages/online_vs/online_vs',
        })
      }, 3500 + random_time);  // 设置延迟时间，单位为毫秒     
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})