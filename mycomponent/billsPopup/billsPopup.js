// mycomponent/billsPopup/billsPopup.js
const app = getApp();
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    radio: 'income',
    selectInd: null,
    billsTag: [{
        name: '交通',
        class: 'icon-gongjiao',
        id: 1
      },
      {
        name: '餐饮',
        class: 'icon-canyin',
        id: 2
      },
      {
        name: '生活用品',
        class: 'icon-shenghuoyongpin',
        id: 3
      },
      {
        name: '医疗',
        class: 'icon-tubiao22',
        id: 4
      },
      {
        name: '话费',
        class: 'icon-24huafei',
        id: 5
      },
      {
        name: '美容',
        class: 'icon-meirong-heicopy',
        id: 6
      },
      {
        name: '娱乐',
        class: 'icon-yule',
        id: 7
      },
      {
        name: '烟酒',
        class: 'icon-aircooking-i',
        id: 8
      },
      {
        name: '旅游',
        class: 'icon-lvyou',
        id: 9
      },
      {
        name: '学习',
        class: 'icon-xuexi',
        id: 10
      },
      {
        name: '运动',
        class: 'icon-aircooking-i',
        id: 11
      },
      {
        name: '住房',
        class: 'icon-aircooking-i',
        id: 12
      },
      {
        name: '幼儿',
        class: 'icon-aircooking-i',
        id: 13
      },
      {
        name: '工资',
        class: 'icon-gongzi',
        id: 14
      },
      {
        name: '其他',
        class: 'icon-qita',
        id: 0
      },
    ],
    note: '',
    amount: ''
  },

  pageLifetimes: {
    show: function () {
      this.setData({
        selectInd: null
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent('close')
    },
    onClick(event) {
      const {
        name
      } = event.currentTarget.dataset;
      this.setData({
        radio: name,
      });
    },
    onChange(event) {
      this.setData({
        radio: event.detail,
        amount: ''
      });
    },
    tapSelectId(e) {
      let {
        id
      } = e.currentTarget.dataset;
      this.setData({
        selectInd: id
      })
    },
    countPost() {
      let json = {
        type_us: this.data.radio,
        amount: this.data.amount,
        noteType: this.data.selectInd,
        note: this.data.note,
      }
      app._postNetWork({
        url: "apitest/Bills_count",
        data: json,
        success: (resdata) => {
          let res = resdata.data;
          console.log(res)
          if (res.result) {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
            this.triggerEvent('confirm')
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }

        },
        fail: function (res) {
          console.log(res);
        }
      });
    }
  }
})