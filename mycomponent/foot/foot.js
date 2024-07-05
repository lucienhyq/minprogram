// mycomponent/foot/foot.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    isPhoneBottom: null
  },
  lifetimes: {
    attached() {
      let isPhoneBottom = wx.getStorageSync('iPhoneBottom');
      this.setData({
        isPhoneBottom: isPhoneBottom
      })
      let pages = getCurrentPages(); //获取加载的页面
      let currentPage = pages[pages.length - 1]; //获取当前页面的对象
      let pathName = currentPage.__route__;
      console.log(pathName)
      if (pathName == 'pages/diyGS/diyGS') {
        this.setData({
          active: 1
        })
      } else if (pathName == 'pages/diyJZ/diyJZ') {
        this.setData({
          active: 2
        })
      } else if (pathName == 'pages/diyZS/diyZS') {
        this.setData({
          active: 3
        })
      } else if (pathName == 'pages/diyHome/diyHome') {
        this.setData({
          active: 0
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapRouterUrl(e) {
      let urlstr = "";
      let {
        ind
      } = e.currentTarget.dataset;
      if (ind == 0) {
        urlstr = "/pages/diyHome/diyHome";
      } else if (ind == 1) {
        urlstr = "/pages/diyGS/diyGS";
      } else if (ind == 2) {
        urlstr = "/pages/diyJZ/diyJZ";
      } else if (ind == 3) {
        urlstr = "/pages/diyZS/diyZS";
      }
      wx.redirectTo({
        url: urlstr,
      })
    },
    onChange(e) {
      // this.setData({
      //   active:e.detail
      // })
      // if (e.detail == 1) {
      //   wx.redirectTo({
      //     url: '/pages/member/member_u',
      //   })
      // } else {
      //   wx.redirectTo({
      //     url: '/pages/index/index',
      //   })
      // }
      // this.setData({
      //   active: e.detail
      // })
    }
  }
})