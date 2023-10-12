// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    ranks:[
      {
        '用户名': 'Jony J',
        '得分': 1000
      },
      {
        '用户名': 'Harryking',
        '得分': 1000
      },
      {
        '用户名': 'woshigaoshou',
        '得分': 289
      },
      {
        '用户名': 'Ack1ing',
        '得分': 100
      },
      {
        '用户名': 'device',
        '得分': 87
      },
      {
        '用户名': 'WeHarry',
        '得分': 73
      },
      {
        '用户名': '墩墩',
        '得分': 62
      },
      {
        '用户名': 'm3',
        '得分': 50
      },
      {
        '用户名': '美式男孩-墩墩',
        '得分': 44
      },
      {
        '用户名': '大聪明',
        '得分': 15
      }
  ]
  }
})
