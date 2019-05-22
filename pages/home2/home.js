import {
  tabbar
} from '../menu/menu.js';
const app = getApp()
Page({
  data: {
    tabs_current: 'tab1',
    tabs_block: 'tab1',
    tab_bar_current: 'home',
    current_scroll: 'tab1',
    campus: getApp().globalData.campus,
    pocket: getApp().globalData.pocket,
    notices: getApp().globalData.notices,
    mine: getApp().globalData.mine,
    background: ['../../images/a1.jpg', '../../images/a2.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 5000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    news: wx.getStorageSync('news')
  },
  tabsChange({
    detail
  }) {
    this.setData({
      tabs_current: detail.key,
      tabs_block: detail.key
    });
  },
  handleChangeScroll({
    detail
  }) {
    this.setData({
      current_scroll: detail.key
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideTabBar();
    tabbar.apply(this, []);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.request({
      url: app.globalData.siteUrl + 'news/getNews',
      data: {
        "news": "news"
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        wx.setStorageSync('news', res.data)
      }
    })
    this.setData({
      news: wx.getStorageSync('news')
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})