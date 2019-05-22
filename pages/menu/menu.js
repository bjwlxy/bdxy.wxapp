function tabbar() {
  this.tabbarChange = function({
    detail
  }) {
    if (detail.key == 'home')
      wx.switchTab({
        url: '/pages/home/home',
      })
    else if (detail.key == 'pocket')
      wx.switchTab({
        url: '/pages/pocket/pocket',
      })
    else if (detail.key == 'notice')
      wx.switchTab({
        url: '/pages/notice/notice',
      })
    else if (detail.key == 'mine')
      wx.switchTab({
        url: '/pages/mine/mine',
      })
    else
      false
  }
}
export {
  tabbar
};