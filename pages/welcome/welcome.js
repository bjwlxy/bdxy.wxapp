var App = getApp();
Page({
  onLoad() {
    this.bindload();
  },
  bindload() {
    setTimeout(this.goIndex, 2000)
  },
  goIndex() {
    wx.switchTab({
      url: '../home/home',
    })
  }
})