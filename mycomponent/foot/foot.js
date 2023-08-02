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
    active: 0
  },
  lifetimes: {
    attached() {
      let pages = getCurrentPages(); //获取加载的页面
      let currentPage = pages[pages.length - 1]; //获取当前页面的对象
      let pathName = currentPage.__route__;
      console.log(currentPage, pathName)
      if (pathName == 'pages/member/member_u') {
        this.setData({
          active: 1
        })
      } else [
        this.setData({
          active: 0
        })
      ]
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      console.log(e)
      if (e.detail == 1) {
        wx.redirectTo({
          url: '/pages/member/member_u',
        })
      } else {
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
      this.setData({
        active: e.detail
      })
    }
  }
})