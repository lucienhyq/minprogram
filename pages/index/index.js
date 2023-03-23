// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    canIUseOpenData: false// 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.getNews();
    wx.setNavigationBarTitle({
      title: '篮球新闻',
    })
  },
  onShareAppMessage:function(e){
    return{
      title:'篮球新闻'
    }
  },
  toDetail(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/goodsDetail?id='+id,
    })
  },
  toWebView(e){
    console.log(e)
    let urls = e.currentTarget.dataset.url;
    wx.showToast({
      title: '暂未开通',
      duration:1000,
      icon:'none'
    })
    wx.navigateTo({
      url: '/pages/detail/goodsDetail?urls='+urls,
    })
  },
  getNews(){
    wx.showLoading({
      title: '加载中',
    })
    app._getNetWork({
      url: "apitest/firstHome",
      success: (resdata)=> {
        wx.hideLoading()
        let res = resdata.data;
        console.log(res)
        this.setData({
          newsList : res.data.json,
          course:res.data.course,
          referee:res.data.referee
        })
      },
      fail: function(res) {
        wx.hideLoading();
        console.log(res);
      }
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
