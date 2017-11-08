var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    searchUrl:"",
    addNum: 2,
    addIndex: 0,
    book: [],
    reqone:true
  },

  search:function(ev){
   var val=ev.detail.value.trim();
   var that=this;
   //返回原来的高度
   this.setData({
     scrollTop:0
   })
   if (val.length){
     wx.request({
       url: app.globalData.doubanBaseUrl + app.globalData.bookSearch + "?" + "q=" + val +"&start=0&count=5",
       data:{},
       header:{
         'Content-Type': 'json'  //豆瓣的API的格式一定是要json
       },
       success:function(res){
         that.data.book = [];
         var list = that.data.book;
         for (let i = 0; i < res.data.books.length; i++) {
           list.push(res.data.books[i]);
         }
        that.data.searchUrl=val;
        that.data.addIndex=0;
        that.data.addNum=2;
        that.setData({
          searchBook:list
        })
       }
     })
   }
    this.setData({
      inputValue:''
    })
  },
  goto:function(ev){
    app.globalData.bookIdName = ev.currentTarget.id;
    wx.navigateTo({
      url: '../details/details',
    })
  },
  download:function(){
    var that=this;
    this.setData({
      searchLoading: true,
      searchLoadingComplete: false
    })
    if(that.data.reqone){
      that.data.reqone=false;
      setTimeout(function(){
        wx.request({
          url: app.globalData.doubanBaseUrl + app.globalData.bookSearch + "?" + "q=" + that.data.searchUrl + "&start=" + (5 + that.data.addIndex * that.data.addNum) + "&count=" + that.data.addNum,
          data: {},
          header: {
            'Content-type': 'json'
          },
          success: function (res) {
            console.log(that.data.addNum, that.data.addIndex)
            var list = that.data.book;
            for (let i = 0; i < res.data.books.length; i++) {
              list.push(res.data.books[i]);
            }
            that.data.addIndex++;
            that.setData({
              searchBook: list,
              searchLoading: false
            })
          },
          complete:function(){
            that.data.reqone = true;
            that.setData({
              searchLoadingComplete:true
            })
          }
        })
      },1000)
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loadingHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})