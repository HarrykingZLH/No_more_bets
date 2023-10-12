// pages/ranks/ranks.js
Page({
    data: {
        ranks: []
    },

    onLoad: function() {
        const app = getApp();
        const ranks = app.globalData.ranks;
        this.setData({ranks})
    },

    goBack: function () {
        wx.redirectTo({
        url: '/pages/home/home'
        });
    },
})