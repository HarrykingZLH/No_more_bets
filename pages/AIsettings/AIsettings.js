// settings.js
Page({
  data: {
    totalRounds: 3, // 总局数
    player1Chips: 500, // 玩家1的筹码
    player2Chips: 500, // 玩家2的筹码
    player_name: '',
    game_pattern: 1,
  },

  // 提交表单
  submitForm: function (e) {
      console.log(e)
      const formData = e.detail.value;
      // 根据用户输入的值更新游戏变量
      if (formData.player_name.trim() === '') {
        wx.showToast({
          title: '用户名不能为空',
          icon: 'none',
          duration: 2000
        });
        return; // 如果用户名为空，停止继续执行函数
      }
      this.setData({
          totalRounds: formData.totalRounds,
          player1Chips: formData.player1Chips,
          player2Chips: formData.player2Chips,
          player_name: formData.player_name,
      });
      console.log(this.data.game_pattern)
      const url = `/pages/AI/AI?param1=${this.data.totalRounds}&param2=${this.data.player1Chips}&param3=${this.data.player2Chips}&param4=${this.data.game_pattern}&param5=${this.data.player_name}`;

      wx.redirectTo({
          url: url
      });
  },
    // 返回到模式选择页面
    goToHomePage: function () {
        wx.redirectTo({
            url: '/pages/modes/modes' // 规则页面的路径，根据实际路径进行调整
        });
    },

    handleMultiplierChange: function (e) {
        const selected = e.detail.value;
        //注意设置默认值为简单
        if (selected === '0') {
            console.log('简单');
        this.setData({game_pattern: 1})
        } else if (selected === '1') {
            console.log('普通');
        this.setData({game_pattern: 2})
        } else if (selected === '2') {
            console.log('困难');
            this.setData({game_pattern: 3})
        }
    },
});
