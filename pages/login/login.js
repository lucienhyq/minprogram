// pages/login/login.js
const app = getApp();
var int = app.globalData.statusBarHeight * 2 + 40;
const menuButtonObject = wx.getMenuButtonBoundingClientRect().height;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: int + menuButtonObject,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  getUserProfileTap(e) {
    console.log(e)
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (_info) => {
        let info = {
          'nickName': _info.userInfo.nickName,
          'avatarUrl': "",
          'gender': _info.userInfo.gender
        };
        console.log("info:", info);
        this.loginbtn(info);
      },
      fail: (err) => {
        console.log(err)
        wx.hideLoading({
          success: (res) => {},
        });
      }
    });
  },
  loginbtn(_info){
    wx.login({
      success: (_json) => {
        console.log(_json,_info)
        wx.request({
          // url: 'http://localhost:3000/apitest/wxMiniLogin',
          url: 'https://lucien.freehk.svipss.top/apitest/wxMiniLogin',
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          data: {
            code: _json.code,
            info: _info,
          },
          success: (res)=> {
            console.log(res)
            let resData = res.data;
            wx.setStorageSync('uid', resData.data.id)
            wx.redirectTo({
              url: '/pages/index/index',
            })
          },
          fail:(err)=>{
            console.log(err)
          }
        })
      },
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

  }
})