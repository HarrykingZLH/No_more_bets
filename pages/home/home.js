// pages/home/home.js
Page({
    data: {
        startImage:"",
        rulesImage:"",
        ranksImage:""
    },

    onLoad: function() {
        this.setData ({
            startImage:"/images/home/开始.png",
            rulesImage:"/images/home/规则.png",
            ranksImage:"/images/home/排行榜.png"
        })
    },

    startGame: function () {
        wx.showModal({
            title: '游戏开始',
            content: '提示：开始前请认真阅读游戏规则！',
            confirmText: '确定',
            confirmColor: '#007bff',
            cancelText: '规则', // 显示取消按钮
            cancelColor: '#333',
            success: function (res) {
                if (res.confirm) {
                    // 用户点击确定按钮后的操作
                    wx.redirectTo({
                    url: '/pages/modes/modes' // 规则页面的路径，根据实际路径进行调整
                    });
                } else if (res.cancel) {
                    // 用户点击取消按钮后的操作，跳转到规则页面
                    wx.redirectTo({
                        url: '/pages/rules/rules' // 规则页面的路径，根据实际路径进行调整
                    });
                }
            }
        });
    },

    changeImage(e) {
        if (e.currentTarget.dataset.id == "开始")
            {const startImage = "/images/home/开始 (1).png";
            this.setData({
                startImage
            });}
        else if (e.currentTarget.dataset.id == "规则")
            {const rulesImage = "/images/home/规则 (1).png";
            this.setData({
                rulesImage
            });}
        else if (e.currentTarget.dataset.id == "排名")
            {const ranksImage = "/images/home/排行榜 (1).png";
            this.setData({
                ranksImage
            });}
    },

    goToModes(e) {
        var url;
        if (e.currentTarget.dataset.id == "开始")
            url = "/pages/modes/modes";
        else if (e.currentTarget.dataset.id == "规则")
            url = "/pages/rules/rules";
        else if (e.currentTarget.dataset.id == "排名")
            url = "/pages/ranks/ranks";
        wx.redirectTo({
          url: url
        })
    }

})