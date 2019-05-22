// pages/bind.js
const app = getApp()
Page({
  data: {
    avatar: '../../images/avatar.png',
    message: 'Hello MINA!',
    isRegister: false,
    steps: 1,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(options) {
    var result = wx.getStorageSync('isRegister')
    if (result) {
      this.setData({
        isRegister: true
      })
      wx.getUserInfo({
        success(res) {
          console.log(res)
        }
      })
    } else {
      this.setData({
        isRegister: false
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
    wx.setStorageSync('isLogin', true)
    if (this.data.avatar != this.data.userInfo.avatarUrl) {
      wx.request({
        url: app.globalData.siteUrl + 'user/wxAvatar',
        method: 'POST',
        data: {
          'code': wx.getStorageSync('code'),
          'token': wx.getStorageSync('token'),
          'avatar': this.data.userInfo.avatarUrl
        },
        success() {
          wx.setStorageSync('avatar', this.data.userInfo.avatarUrl)
        }
      })
    }
    wx.reLaunch({
      url: '../home/home',
    })
  },
  onReady: function() {
    this.setData({
      avatar: wx.getStorageSync('avatar')
    })
  },
  toRegister: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  }
})