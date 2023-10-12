const app = getApp();

Page({
  data: {
      init_player_socre:0,
      init_AI_socre:0,
      player_name: '111',
      game_pattern:3,
      expect_list: [],
      player: "player1",
      number: 1,
      count: 0,
      jettonPlayer1: 1000,
      jettonPlayer2: 1000,
      multiplierOptions: [0, 1, 2, 3],
      sum: 1,
      isMultiplierEnabled: false,
      tem_playerDice1: [1,2,3,4,5],
      playerDice1: [], // 玩家1的骰子，每个骰子包括 value 属性
      playerLock1: [], // 玩家1锁定的骰子，每个骰子包括 value 属性
      playerHaveLock1: 0,
      hasThrownDice1: false, // 重置投掷标志
      player1Multiplier: 0,
      
      tem_playerDice2: [6,5,4,3,2],
      playerDice2: [], // 玩家2的骰子，每个骰子包括 value 属性
      playerLock2: [], // 玩家2锁定的骰子，每个骰子包括 value 属性
      playerHaveLock2: 0,
      hasThrownDice2: false, // 重置投掷标志
      player2Multiplier: 0,

      diceImages: { // 存储骰子图片地址的字典
          1: '/images/骰子/dice-1.png',
          2: '/images/骰子/dice-2.png',
          3: '/images/骰子/dice-3.png',
          4: '/images/骰子/dice-4.png',
          5: '/images/骰子/dice-5.png',
          6: '/images/骰子/dice-6.png',
      },
      rounds: 0, // 回合计数
  },

  onLoad: function (option) {
      this.showGameSettingsModal();
      this.initGame();
      this.Cal_E(); 
  },

  showGameSettingsModal() {
      wx.showToast({
        title: '匹配成功',
        icon: 'none',
        duration: 1000,  // 显示时间为2秒
        mask: true,  // 显示透明蒙层
        iconColor: '#333333', // 设置图标和文字颜色为黑色
      });
    },

  initGame: function () {
      // 初始化玩家和对手的骰子数据
        this.setData({
          playerDice1: this.data.tem_playerDice1, // 示例数据，根据实际情况设置骰子的值
          playerLock1: [], // 玩家1锁定的骰子，每个骰子包括 value 属性
          playerHaveLock1: 0,
          hasThrownDice1: false, // 重置投掷标志
          player1Multiplier: 0,
          count : this.data.count + 1,

          playerDice2: this.data.tem_playerDice2, // 示例数据，根据实际情况设置骰子的值
          playerLock2: [], // 玩家2锁定的骰子，每个骰子包括 value 属性
          playerHaveLock2: 0,
          player2Multiplier: 0,

          rounds:1,
          sum: 1,
          isMultiplierEnabled: false,
      });
  },


  // 玩家投掷骰子逻辑
  throwDicePlayer1: function () {
    if(this.warning1('player1') || this.warning3 (this.data.hasThrownDice1)){
      return;
    }

    if(this.data.isMultiplierEnabled){
      wx.showToast({
        title: '请先选择倍率',
        icon: 'none',
        duration: 2000,
    });
    return;
    }
      // 实现玩家投掷骰子的逻辑，更新玩家骰子数据
      const playerDice1 = this.generateRandomDiceValues(this.data.playerDice1.length);
      const sum = this.data.sum + this.data.player1Multiplier + this.data.player2Multiplier;
      this.setData({
          playerDice1,
          sum,
          player1Multiplier: 0,
          player2Multiplier: 0,
          hasThrownDice1: true, // 标记为已投掷
          isMultiplierEnabled: false,
      });

      if (this.data.rounds == 3) {
          this.endTurn_player1;
      }
  },


  // 实现锁定骰子的逻辑，将骰子从投掷区移动到锁定区
  lockDicePlayer1: function (e) {
      if (this.warning1('player1') || this.warning2(this.data.hasThrownDice1)) 
          return;

      // 示例代码，根据实际情况处理骰子的锁定
      const id = e.currentTarget.dataset.id;
      const idx = e.currentTarget.dataset.key;

      // 从玩家骰子中移除该值的骰子并加入玩家锁定区
      const playerDice1 = this.data.playerDice1.filter((val, index, arr) => {
          return index !== idx;
      })
      const playerLock1 = this.data.playerLock1;
      playerLock1.push(id);

      this.setData({
          playerDice1,
          playerLock1
      });
  },

  // 解锁骰子
  unlockDicePlayer1: function (e) {
      if (this.warning1('player1') || this.warning2(this.data.hasThrownDice1)) 
          return;


      // 示例代码，根据实际情况处理骰子的锁定
      const id = e.currentTarget.dataset.id;
      const idx = e.currentTarget.dataset.key;

      if (idx < this.data.playerHaveLock1) {
          wx.showToast({
              title: '已锁定！',
              icon: 'none',
              duration: 2000,
          });
          return;
      }

      // 从玩家骰子中移除该值的骰子并加入玩家锁定区
      const playerLock1 = this.data.playerLock1.filter((val, index, arr) => {
          return index !== idx;
      })
      const playerDice1 = this.data.playerDice1;
      playerDice1.push(id);

      this.setData({
          playerDice1,
          playerLock1
      });
  },

  // 结束回合逻辑
  endTurn_player1: function () {
      if (this.warning1('player1') || this.warning2(this.data.hasThrownDice1)) 
          return;
      
      wx.showToast({
          title: '您的回合结束',
          icon: 'none',
          duration: 2000,
      });

      if (this.data.rounds == 3) {
          const currentPage = getCurrentPages().pop();
          const playerLock1 = this.data.playerLock1
          playerLock1.push(...currentPage.data.playerDice1);
          this.setData({   
              tem_playerDice1: this.data.playerLock1,
              playerDice1: [],
              playerLock1
          });
      }

      // 实现结束回合逻辑，切换玩家并更新游戏状态
      const player = this.data.player == 'player1' ? 'player2' : 'player1';
      const playerHaveLock1 = this.data.playerLock1.length;
      this.setData({
          player,
          playerHaveLock1,
          hasThrownDice1: false
      });
  },

  endTurn_player1_and_throwDicePlayer2(){
    if(this.data.isMultiplierEnabled){
      wx.showToast({
        title: '请先选择倍率',
        icon: 'none',
        duration: 2000,
    });
    return;
    }
    if (this.warning2(this.data.hasThrownDice1)) 
          return;
    
    this.endTurn_player1();
    if(this.data.playerLock2.length == 5){
      this.throwDicePlayer2();
    }
    else{
      setTimeout(() => {
        this.throwDicePlayer2();
    }, 2500); 
    }
  },
  // 玩家投掷骰子逻辑
  throwDicePlayer2: function () {
      const playerDice2 = this.generateRandomDiceValues(this.data.playerDice2.length);
      this.setData({
          playerDice2,
          hasThrownDice2: true, // 标记为已投掷
      });

      if (this.data.rounds == 3) {
        if(this.data.playerLock2.length == 5)
        {
          this.lockDicethird_player2();
        }
        else{
          setTimeout(() => {
            this.lockDicethird_player2();
        }, 1000); 
        }
      setTimeout(() => {
        this.endTurn_player2();
    }, 2500); 
      }
      else{
        if(this.data.playerLock2.length == 5){
          this.lockDicePlayer2();
        }
        else{
          setTimeout(() => {
            this.lockDicePlayer2();
        }, 1000); 
        }
        
      setTimeout(() => {
        this.endTurn_player2();
    }, 2500); 
      }
      
    
    
  },
  lockDicethird_player2(){
    const playerLock2 = this.data.playerLock2;
    const playerDice2 = []
    playerLock2.push(...this.data.playerDice2)
    this.setData({
      playerDice2,
      playerLock2,
    })
  },
  // 实现锁定骰子的逻辑，将骰子从投掷区移动到锁定区
  lockDicePlayer2: function (e) {
      let part_len = this.data.playerDice2.length;
      let all_possiblies = [];
      for (let i = 0; i < part_len + 1; i++) {
          const possibly = this.Combinations(this.data.playerDice2, i); // 生成i个骰子的组合
          all_possiblies.push(...Array.from(possibly));
      }
      let init_index = 0;
      for (let i of this.data.playerLock2) {
          init_index = init_index * 6 + i;
      }
      let min_init_index = init_index;
      let min_value = 100;
      let min_temp_list = [];
      let min_index = 0;
      let max_value = 0;
      let max_index = 0;
      let temp_list = [];
      let medium_index = parseInt(Math.random()*all_possiblies.length,10);
      let medium_list = all_possiblies[medium_index];
      for (let possibly of all_possiblies) {
          let current_index = init_index;
          for (let i of possibly) {
              current_index = current_index * 6 + i;
          }
          if (this.data.expect_list[current_index] > max_value) {
              max_value = this.data.expect_list[current_index];
              max_index = current_index;
              temp_list = possibly;
          }
          if(this.data.expect_list[current_index] < min_value){
            min_value = this.data.expect_list[current_index];
            min_index = current_index;
            min_temp_list = possibly;
          }
      }
      const new_playerDice = [];
        var flag_list = new Array(10).fill(0);
        for(let i = 0; i < this.data.playerDice2.length;i++){
          let flag = true;
          for(let j = 0;j < temp_list.length ; j++){
            if(this.data.playerDice2[i]==temp_list[j] && flag_list[j] == 0){
              flag = false;
              flag_list[j] = 1;
              break;
            }
          }
          if(flag == true){
            new_playerDice.push(this.data.playerDice2[i])
          }
      }
      for(let i = 0; i < temp_list.length;i++)
      {
        const index = this.data.playerDice2.indexOf(temp_list[i]);
        var playerDice2 = this.data.playerDice2;
        var playerLock2 = this.data.playerLock2;
        playerDice2.splice(index, 1);
        playerLock2.push(temp_list[i]);
        var num = 0;
        while(true)
        {
          num = num + 1;
          console.log(num)
          if(num == 2500) break;
        }
        this.setData({
            playerDice2,
            playerLock2
        });
        }
      },
      // const playerDice2 = new_playerDice;
      // const playerLock2 = this.data.playerLock2;
      // if(this.data.game_pattern == 3)
      //    this.data.playerLock2.push(...temp_list);
      // this.setData({
      //     playerDice2,
      //     playerLock2
      // });

Combinations(arr, n) {
    const result = [];
    const f = function (prefix, arr, n) {
        if (n === 0) {
            result.push(prefix);
        } else {
            for (let i = 0; i < arr.length; i++) {
                f(prefix.concat(arr[i]), arr.slice(i + 1), n - 1);
            }
        }
    }
    f([], arr, n);
    return result;
},
  // 解锁骰子
unlockDicePlayer2: function (e) {
      if (this.warning1('player2') || this.warning2(this.data.hasThrownDice2)) 
          return;

      // 示例代码，根据实际情况处理骰子的锁定
      const id = e.currentTarget.dataset.id;
      const idx = e.currentTarget.dataset.key;
      
      if (idx < this.data.playerHaveLock2) {
          wx.showToast({
              title: '已锁定！',
              icon: 'none',
              duration: 2000,
          });
          return;
      }

      // 从玩家骰子中移除该值的骰子并加入玩家锁定区
      const playerLock2 = this.data.playerLock2.filter((val, index, arr) => {
          return index !== idx;
      })
      const playerDice2 = this.data.playerDice2;
      playerDice2.push(id);

      this.setData({
          playerDice2,
          playerLock2
      });
  },

  // 结束回合逻辑
  endTurn_player2: function () {
    
      if (this.data.rounds != 3){
        wx.showToast({
          title: '当前回合结束，请选择倍率',
          icon: 'none',
          duration: 2000,
      });
      }

      // 实现结束回合逻辑，切换玩家并更新游戏状态
      const player = this.data.player == 'player2' ? 'player1' : 'player2';
      const playerHaveLock2 = this.data.playerLock2.length;
      
      this.setData({
          player,
          playerHaveLock2,
          hasThrownDice2: false,
      });

      if (this.data.rounds == 3) {
          const currentPage = getCurrentPages().pop();
          const playerLock2 = this.data.playerLock2;
          const playerHaveLock2 = this.data.playerLock2.length;
          playerLock2.push(...currentPage.data.playerDice2);
          this.setData({
              tem_playerDice2: this.data.playerLock2,
              playerHaveLock2,
              playerDice2: [],
              playerLock2
          });
          //游戏结算
          this.calcScore();

          if (this.data.count == this.data.number || this.data.jettonPlayer1 <= 0 || this.data.jettonPlayer2 <= 0) {
              if (this.data.jettonPlayer1 != this.data.jettonPlayer2) {
                  const flag = this.data.jettonPlayer1 > this.data.jettonPlayer2 ? 1 : 2; 
                  wx.showModal({
                      title: '游戏结算',
                      content: '恭喜您' + '获得本局游戏的胜利!\r\n您的筹码：' + this.data.jettonPlayer1 + '\r\n对方的筹码：' + this.data.jettonPlayer2 + '\r\n局数：' + (this.data.count),
                      confirmText: '再来一局',
                      confirmColor: '#007bff',
                      cancelText: '返回主页', // 显示取消按钮
                      cancelColor: '#333',
                      success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '/pages/wifi_pk/wifi_pk',
                              });
                          } else if (res.cancel) {
                              wx.navigateTo({
                                  url: '/pages/home/home',
                              });
                          }
                      },
                  });
              } else {
                  wx.showModal({
                      title: '游戏结算',
                      content: '本局游戏平局！\r\n玩家的筹码：' + this.data.jettonPlayer1 + '\r\n对方的筹码：' + this.data.jettonPlayer2 + '\r\n局数：' + (this.data.count),
                      confirmText: '再来一局',
                      confirmColor: '#007bff',
                      cancelText: '返回主页', // 显示取消按钮
                      cancelColor: '#333',
                      success: function (res) {
                          if (res.confirm) {
                              wx.navigateTo({
                                  url: '/pages/vsgame/vsgame',
                              });
                          } else if (res.cancel) {
                              wx.navigateTo({
                                  url: '/pages/home/home',
                              });
                          }
                      },
                  });
              }
              return;
          }
          
          this.initGame();
          return;
      }

      this.setData({
          isMultiplierEnabled: true,
          rounds: this.data.rounds+1
      });


  },

  //倍率选择
  handleMultiplierChange: function (e) {
      const playerIndex = e.currentTarget.dataset.id; // 获取是哪个玩家的选择器
      const selectedMultiplier = this.data.multiplierOptions[e.detail.value];
  
      // 根据玩家选择的倍率，更新对应玩家的倍率数据
      if (playerIndex === '1') {
        this.setData({
          player1Multiplier: selectedMultiplier,
        });
      } 
    let AIMul = 0;
    let AIIndex = 0;
    for (const i of this.data.playerLock2) {
        AIIndex = AIIndex * 6 + i;
    }
    let player_index = 0;
    for (const i of this.data.playerLock1) {
      player_index = player_index * 6 + i;
    }
    if(this.data.game_pattern == 3){
      if (this.data.expect_list[AIIndex] > this.data.expect_list[player_index]) {
        AIMul = 3;
      }
      else{
        AIMul = 0;
      }
    }
    const player2Multiplier = AIMul;
    this.setData({
      player2Multiplier,
      isMultiplierEnabled: false,
    })
    },

  // 生成随机骰子值
  generateRandomDiceValues(numDice) {
      var randomValues = [];
      for (let i = 0; i < numDice; i++) {
          // 生成1到6之间的随机整数作为骰子值
          randomValues.push(parseInt(Math.random()*6,10)+1);
      }
      return randomValues;
  },

  //算分
  calcScore () {
      const score1 = this.get_total_score(this.data.playerLock1);
      const score2 = this.get_total_score(this.data.playerLock2);

      if (score1 > score2) {
          const temp = (score1-score2) * this.data.sum;
          const jettonPlayer1 = this.data.jettonPlayer1 + temp;
          const jettonPlayer2 = this.data.jettonPlayer2 - temp;
          wx.showToast({
              title: '玩家胜，得'+ temp + '筹码',
              icon: 'none',
              duration: 2000,
          });
          this.setData({
              jettonPlayer1,
              jettonPlayer2,
          });
      } else if (score1 < score2) {
          const temp = (score2-score1) * this.data.sum;
          const jettonPlayer1 = this.data.jettonPlayer1 - temp;
          const jettonPlayer2 = this.data.jettonPlayer2 + temp;
          wx.showToast({
              title: '对方胜，得'+ temp + '筹码',
              icon: 'none',
              duration: 2000,
          });
          this.setData({
              jettonPlayer1,
              jettonPlayer2,
          });
      } else {
          wx.showToast({
              title: '平局',
              icon: 'none',
              duration: 2000,
          });
      }
      this.setData({
          sum: 1
      });
  },

  get_total_score(alist) {
      alist.sort((a, b) => a - b);
      let total_score = alist.reduce((sum, val) => sum + val, 0);
      total_score += this.extra_bonus(alist);
      return total_score;
  },
  
  extra_bonus(arr) {
      let num = Array(7).fill(0);
      for (let i = 0; i < 5; i++) {
          num[arr[i]] += 1;
      }
      let arr_dist = [];
      for (let i = 0; i < arr.length - 1; i++) {
          arr_dist.push(arr[i + 1] - arr[i]);
      }
      if (arr_dist.filter(item => item === 0).length === 4) {
          return 100;
      } else if (arr_dist.filter(item => item === 1).length === 4) {
          return 60;
      } else if (arr_dist.filter(item => item === 0).length === 3 && (arr[1] === arr[3])) {
          return 40;
      } else if ([1, 2, 3, 4].every(i => num[i] >= 1)) {
          return 30;
      } else if ([2, 3, 4, 5].every(i => num[i] >= 1)) {
          return 30;
      } else if ([3, 4, 5, 6].every(i => num[i] >= 1)) {
          return 30;
      } else if (arr_dist.filter(item => item === 0).length === 3 && (arr[1] !== arr[3])) {
          return 20;
      } else if (arr_dist.filter(item => item === 0).length === 2) {
          return 10;
      } else {
          return 0;
      }
  },
  
  warning1 (player) {
      if (this.data.player != player) {
          wx.showToast({
              title: '现在不是您的回合！',
              icon: 'none',
              duration: 2000,
          });
          return true; // 如果在上一回合锁定的骰子列表中，直接返回
      }
      return false;
  },

  warning2 (hasThrownDice) {
      if (!hasThrownDice) {
          wx.showToast({
              title: '请先投掷！',
              icon: 'none',
              duration: 2000,
          });
          return true; // 如果在上一回合锁定的骰子列表中，直接返回
      }
      return false;
  },
  
  warning3 (hasThrownDice) {
      if (hasThrownDice) {
          wx.showToast({
              title: '本回合已投掷！',
              icon: 'none',
              duration: 2000,
          });
          return true; // 如果在上一回合锁定的骰子列表中，直接返回
      }
      return false;
  },
  Cal_E(){
    this.setData({
      expect_list: new Array(10000).fill(0), // 初始化为包含 10000 个元素的数组，并用 0 填充
  });
    this.leaves();
    this.cal_expect_list(0,0);
  },
  leaves(){
      for (var i = 1; i <= 6; i++) {
        for (var j = 1; j <= 6; j++) {
          for (var k = 1; k <= 6; k++) {
            for (var m = 1; m <= 6; m++) {
              for (var n = 1; n <= 6; n++) {
                var total_score = this.get_total_score([i, j, k, m, n]);
                var index = ((((0 * 6 + i) * 6 + j) * 6 + k) * 6 + m) * 6 + n;
                
                this.push_Hexary_Tree(index, total_score);
              }
            }
          }
        }
      }
  },
  push_Hexary_Tree(index, score) {
    this.data.expect_list[index] = score;
  },
  cal_expect_list(depth,index){
    if (depth >= 5) {
      return;
    }
    for (var i = 1; i <= 6; i++) {
      this.cal_expect_list(depth + 1, index * 6 + i);
      this.data.expect_list[index] += this.data.expect_list[index * 6 + i];
    }
    this.data.expect_list[index] /= 6.0;
  }
});
