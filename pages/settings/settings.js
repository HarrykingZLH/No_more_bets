// settings.js
Page({
    data: {
      totalRounds: 10, // 总局数
      player1Chips: 500, // 玩家1的筹码
      player2Chips: 500, // 玩家2的筹码
    },
  
    // 提交表单
    submitForm: function (e) {
        const formData = e.detail.value;
        // 根据用户输入的值更新游戏变量
        this.setData({
            totalRounds: formData.totalRounds,
            player1Chips: formData.player1Chips,
            player2Chips: formData.player2Chips,
        });
      
        wx.redirectTo({
            url: '/pages/vsgame/vsgame?param1='+ this.data.totalRounds + '&param2=' + this.data.player1Chips + '&param3=' + this.data.player2Chips,
        });
    },

    goToHomePage: function () {
        wx.redirectTo({
            url: '/pages/modes/modes'
        });
    },
  });
  