// pages/detail/goodsDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
      this.getData();
    }
    if (options.urls) {
      this.setData({
        urls: options.urls
      })
      this.getUrls();
    }
    console.log(this.data.id)
  },
  getUrls() {
    wx.showLoading({
      title: '加载中',
    })
    app._getNetWork({
      url: "apitest/getArticle",
      data: {
        urls: this.data.urls
      },
      success: (resdata) => {
        wx.hideLoading()
        let res = resdata.data;
        let bodyHtml = res.data.bodyHtml.conten;
        // let arr = [];
        // for (let i = 0; i < bodyHtml.length; i++) {
        //   console.log(bodyHtml[i])
        // }
        // console.log(arr)
        this.setData({
          bodyHtml
        })
        console.log(bodyHtml)
      },
      fail: function (res) {
        wx.hideLoading();
        console.log(res);
      }
    });
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
    app._getNetWork({
      url: "apitest/getCourse",
      data: {
        id: this.data.id
      },
      success: (resdata) => {
        wx.hideLoading()
        let res = resdata.data;
        console.log(res.data.data[0])
        this.setData({
          goodInfo: res.data.data[0]
        })
      },
      fail: function (res) {
        wx.hideLoading();
        console.log(res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

})