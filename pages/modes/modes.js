Page({
    data: {

    },
    localMode: function () {
        wx.redirectTo({
            url: '/pages/settings/settings',
        });
    },

    aiMode: function () {
        wx.redirectTo({
          url: '/pages/AIsettings/AIsettings',
      });
    },

    onlineMode: function () {
      // 处理选择困难模式的逻辑
      // 可以跳转到困难模式游戏页面
      const app = getApp();
      if(app.globalData.userInfo == null){
        this.get_user_data();
      }
      else{
        wx.showToast({
          title: '已授权用户信息',
        })
      }
    },
    get_user_data(){
      wx:wx.getUserProfile({
        desc: '用于进入联机对战',
        lang: 'zh_CN',
        success: (result) => {
          console.log('用户授权成功');
          wx.navigateTo({
            url: '/pages/wifi_pk/wifi_pk'
          })
        },
        fail: (res) => {
          console.log('用户取消授权');
        },
        complete: (res) => {
          console.log('选择完毕');
        },
      })
    },
    goToHomePage: function () {
        wx.redirectTo({
            url: '/pages/home/home'
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