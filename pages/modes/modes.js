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
})