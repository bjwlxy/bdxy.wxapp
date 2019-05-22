//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //判断是否登录
    var isLogin = wx.getStorageSync('isLogin')
    /*
    if (isLogin) {
      wx.reLaunch({
        url: "/pages/home/home",
      });
    } else {
      wx.login({
        success(res) {
          if (res.code) {
            console.log(res.code)
            wx.request({
              url: "https://boss.tinywo.com/v1/api/user/wxOpenid",
              method: "POST",
              data: {
                js_code: res.code
              },
              success(res) {
                console.log(res.data)
                if (res.data['state'] == "not") {
                  wx.setStorageSync('isRegister', false)
                  wx.setStorage({
                    key: 'openid',
                    data: res.data['openid']
                  })
                  wx.reLaunch({
                    url: "/pages/register/register",
                  });
                } else if (res.data['state'] == "yes") {
                  console.log(res.data['userinfo'])
                  var result = res.data['userinfo']
                  wx.setStorageSync('isRegister', true)
                  wx.setStorageSync('code', result['u_code'])
                  wx.setStorageSync('token', result['u_token'])
                  wx.setStorageSync('avatar', result['u_wxavatar'])
                  wx.reLaunch({
                    url: "/pages/bind/bind",
                  });
                }
              }
            })
          }
        }
      })
    }
    */
  },
  globalData: {
    siteUrl: 'https://boss.tinywo.com/v1/api/',
    userInfo: null,
    notices: null,
    isIphoneX: false
  },
  onShow: function() {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        //console.log('手机信息res' + res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }
      }
    })
  },
})