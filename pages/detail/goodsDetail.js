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
    }
    console.log(this.data.id)
    this.getData();
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
    app._getNetWork({
      url: "apitest/getCourse",
      data: {
        id:this.data.id
      },
      success: (resdata) => {
        wx.hideLoading()
        let res = resdata.data;
        console.log(res.data.data[0])
        this.setData({
          goodInfo:res.data.data[0]
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