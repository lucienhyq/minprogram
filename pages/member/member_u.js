// pages/member/member_u.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'0'
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
    wx.setNavigationBarTitle({
      title: '会员页',
    })
    this.getData();
    this.getMember();
  },
  tologin() {
    wx.navigateTo({
      url: '/pages/login/login',
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
  getMember() {
    app._postNetWork({
      url: "orderCountList",
      success: (resdata) => {
        let res = resdata.data;
        this.setData({
          orderList : res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  getData() {
    app._getNetWork({
      url: "apitest/getMember",
      success: (resdata) => {
        let res = resdata.data;
        this.setData({
          memberInfo: res.data
        })
        console.log(this.data.memberInfo, 'dddddddd12121')
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }
})