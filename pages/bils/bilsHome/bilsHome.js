// pages/bils/bilsHome/bilsHome.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tap: '1',
    popupShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FF8924',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
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
    this.getData();

  },
  tapBtn() {
    this.setData({
      popupShow: true
    })
  },
  closePopup() {
    this.setData({
      popupShow: false
    })
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
  tapSelect(e) {
    let {
      key
    } = e.currentTarget.dataset;
    this.setData({
      tap: key
    })
  },
  confirm(){
    this.setData({
      popupShow:false
    })
    this.getData();
  },
  getData() {
    app._postNetWork({
      url: "apitest/Bills_index",
      success: (resdata) => {
        let res = resdata.data;
        this.setData({
          info: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }
})