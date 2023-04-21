// app.js
// const host = "http://localhost:3000/"
const host = "https://lucien.freehk.svipss.top/"
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.statusBarHeight = res.statusBarHeight;
        this.globalData.navBarHeight = 44 + res.statusBarHeight;
      },
    });
  },
  data: {
    login_type: 1, //1无请求，2正在请求 状态锁
    login_fun_list: [], // 需要登录后再请求的接口队列
  },
  onShow(options) {
    this.data.login_type = 1;
  },
  globalData: {
    userInfo: null,
    statusBarHeight: '',
    navBarHeight: ''
  },
  /**
   * url 请求地址
   * data 请求的参数
   * success 成功的回调
   * fail 失败的回调
   * complete 结束的回调函数（调用成功、失败都会执行）
   */
  _getNetWork: function (_ObjData) {
    console.log('dddddddddddd',this.data.login_type)
    return this._Request(_ObjData, 'GET');
  },
  /**
   * url 请求地址
   * success 成功的回调
   * fail 失败的回调
   * complete 结束的回调函数（调用成功、失败都会执行）
   */
  _postNetWork: function (_ObjData) {
    return this._Request(_ObjData, 'POST');
  },
  _Request(obj, method) {
    return new Promise((resolve, reject) => {
      obj.resolve = resolve;
      obj.reject = reject;
      obj.method = method;
      //1就发起第一次请求，2加入队列数组
      if (this.data.login_type == 1) {
        this.toRequestNetWork(obj);
      } else {
        this.data.login_fun_list.push(obj);
      }
    });
  },
  toRequestNetWork(_ObjData) {
    let url = _ObjData.url;
    let data = _ObjData.data || {};
    let method = _ObjData.method;
    let params = _ObjData.data;
    let resolve = _ObjData.resolve;
    let reject = _ObjData.reject;
    var success = _ObjData.success;
    var fail = _ObjData.fail;
    // data.min = "1";
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    console.log(url)
    url += '?i=1'
    if (method === 'GET' && params) {
      let paramsArray = [];
      console.log(params)
      Object.keys(params).forEach(key =>
        paramsArray.push(key + "=" + params[key])
      );
      url += "&" + paramsArray.join("&");
    }
    console.log(url)
    this.data.login_type = 2;
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: headers,
      timeout: 10000,
      success: (res) => {
        if (res.data.result == 0 && (res.data.msg === "请登录" || res.data.msg === "未登录")) {
          this.login_state(_ObjData, "get");
          return;
        }
        console.log(res.data.result)
        if (res.data.result == 1) {
          success && success(res);
          resolve(res);
          this.data.login_type = 1;
          if (this.data.login_fun_list.length > 0) {
            let obj = this.data.login_fun_list.shift();
            this.toRequestNetWork(obj);
            // console.log(obj,"-------------------------------------------------success")
          }
        }

      },
      fail: (err) => {
        this.data.login_type = 1;
        if (fail && typeof fail === "function") {
          fail(err);
        }
        reject(err);
        wx.showToast({
          title: "数据获取失败！",
          icon: "loading",
          duration: 2000,
        });
        console.log("数据获取失败:", url, res);
      }
    })
  },
  login_state(ObjData, requestType) {
    let that = this;
    wx.login({
      success: (_json) => {
        wx.request({
          url: 'http://localhost:3000/apitest/wxMiniLogin',
          method: requestType,
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          data: {
            code: _json.code,
          },
          success: (res) => {
            console.log(res)
            this.data.login_type = 1;
            var _data = res.data;
            console.log(_data.result,ObjData.method)
            if (_data.result == 1) {
              console.log("登录后", ObjData);
              if (ObjData.method == 'POST') {
                that._postNetWork(ObjData);
              } else {
                that._getNetWork(ObjData);
              }
            } else {
              wx.setStorageSync('uid', _data.data.id)
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }
          },
          fail: (err) => {
            console.log(err)
          }
        })
      },
    })
  },

})