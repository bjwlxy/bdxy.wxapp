import {
  tabbar
} from '../menu/menu.js';
//index.js
var sliderWidth = 42; // 设置slider的宽度，用于计算中间位置（为了在不同设备间的适配，其值需和 weui-navbar__slider 的 width 相同，且单位均为 px ，原因是下面代码使用的是 wx.getSystemInfo 获得的设备数据，即 res.windowWidth 使用 px 单位）

const newsTypeMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}

Page({
  data: {
    tab_bar_current: 'home',
    tabs: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    newsList: []
  },
  onLoad: function() {
    wx.hideTabBar();
    tabbar.apply(this, []);
    var that = this;
    this.getNewsData();

    //设置导航栏的 Slider 移动参数
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    //设置导航栏的颜色
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      animation: {
        duration: 200,
        timingFunc: 'easeIn'
      }
    })
  },
  getNewsData: function() {
    let newsList = []
    for (let i = 0; i < this.data.tabs.length; i += 1) {
      let newsTypeCN = this.data.tabs[i]
      let newsTypeID = newsTypeMap[newsTypeCN]
      newsList.push({
        typeCN: newsTypeCN,
        typeID: newsTypeID,
        newsInfo: []
      })
    }

    this.setData({
      newsList: newsList
    })

    let currentPage = this.data.newsList[this.data.activeIndex]
    this.getNewsDataOfType(currentPage.typeID)
  },
  getNewsDataOfType(newsType, completeCallback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType,
      },
      success: (res) => {
        // 更新指定新闻类型的数据 - 对应的是当前页面的新闻数据
        let currentPageNewsList = []
        let news = res.data.result
        let defaultImagePath = "/images/default-image.jpg"
        for (let i = 0; i < news.length; i += 1) {
          let formatDate = new Date(news[i].date)
          let dateText = `${formatDate.getFullYear()}-${formatDate.getMonth()}-${formatDate.getDate()}`
          let sourceText = (news[i].source == "") ? "未知来源" : news[i].source
          let imagePath = (news[i].firstImage == "") ? defaultImagePath : news[i].firstImage
          currentPageNewsList.push({
            title: news[i].title,
            date: dateText,
            source: sourceText,
            imagePath: imagePath,
            id: news[i].id
          })
        }

        let currentPageIndex = this.data.activeIndex
        let settingArraySTR = `newsList[${currentPageIndex}].newsInfo`
        let settingFrontPageSTR = `newsList[${currentPageIndex}].frontPage`
        this.setData({
          [settingArraySTR]: currentPageNewsList.slice(0, news.length - 1),
          [settingFrontPageSTR]: currentPageNewsList[news.length - 1]
        })
      },
      complete: () => {
        completeCallback && completeCallback()
      }
    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    // 判断当前页面是否有数据，有数据就不再调用 API，除非用户下拉刷新
    let currentPage = this.data.newsList[this.data.activeIndex]
    if (currentPage.newsInfo.length === 0) { // 此判断空数组的逻辑虽不严谨但已足够，这是 JS 语言的垃圾性决定的
      this.getNewsDataOfType(currentPage.typeID);
    }

  },
  tabToNavigate: function(event) {
    let currentPage = this.data.newsList[this.data.activeIndex]
    let targetID = event.target.dataset.id
    let newsID = (targetID === -1) ? currentPage.frontPage.id : currentPage.newsInfo[targetID].id
    wx.navigateTo({
      url: '/pages/article/article?newsid=' + newsID
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let currentPage = this.data.newsList[this.data.activeIndex]
    this.getNewsDataOfType(currentPage.typeID, function() {
      wx.stopPullDownRefresh()
    })
  }
});