// pages/rules/rules.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    // 在规则页面的.js文件中

    goBack: function () {
      // 返回主页
      wx.redirectTo({
        url: '/pages/home/home' // 规则页面的路径，根据实际路径进行调整
        });
    },
    startGame: function () {
      // 开始游戏逻辑
      // 可以在这里添加开始游戏的逻辑
      wx.redirectTo({
        url: '/pages/modes/modes' // 规则页面的路径，根据实际路径进行调整
        });
    },
  

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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