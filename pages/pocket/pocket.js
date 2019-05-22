import {tabbar} from '../menu/menu.js';
const app = getApp()
var bmap = require('../../libs/bmap-wx.min.js')
Page({
  data: {
    tab_bar_current: 'pocket',
    weatherData: '',
    course: wx.getStorageSync('course') || []
  },
  onLoad: function(options) {
    wx.hideTabBar();
    tabbar.apply(this, []);
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: "7LYWXsSahSWPUSZ8tpq7Pl2828K0czaI"
    });
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      var weatherData = data.currentWeather[0];
      console.log(data)
      that.setData({
        weatherData: weatherData
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },
  onReady: function() {
    wx.request({
      url: app.globalData.siteUrl + 'course/personal',
      data: {
        "code": wx.getStorageSync('code')
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        try {
          JSON.parse(res.data);
          wx.setStorageSync('course', res.data);
        } catch (e) {
          wx.setStorageSync('course', '');
        }
      }
    })
  }
})