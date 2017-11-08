Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: {},
    avatarUrl:null,
    picUrl:null,
    imgs:{
      offsetX:0,
      offsetY:0,
      zoom:false,
      scale:1,
      distance:0,
      minScale:1
    }
  },
  /*
  图片实现放缩功能和移动的函数总和
  */
  touchstartCallback:function(e){
    console.log(e)
    if (e.touches.length===1){
      let { clientX, clientY } = e.touches[0];
      this.startX = clientX;
      this.startY = clientY;
      this.touchStartEvent = e.touches;
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      this.setData({
        'imgs.distance': distance,
        'imgs.zoom': true, //缩放状态
      })
    }
  },
  //手移动的时候
  touchmoveCallback:function(e){
    if(e.touches.length===1){
      if (this.data.imgs.zoom || this.data.imgs.scale<=1){return false;}
      let { clientX, clientY } = e.touches[0];
      let offsetX = clientX - this.startX;
      let offsetY = clientY - this.startY;
      this.startX = clientX;
      this.startY = clientY;
      let { imgs } = this.data;
      imgs.offsetX += offsetX;
      imgs.offsetY += offsetY;
      this.setData({
        imgs: imgs
      });
      console.log(imgs)
    }else{
      //双指缩放
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);

      let distanceDiff = distance - this.data.imgs.distance;
      let newScale = this.data.imgs.scale + 0.005 * distanceDiff;

      this.setData({
        'imgs.distance': distance,
        'imgs.scale': newScale,
      })
    }
  },
  touchendCallback: function (e) {
    //触摸结束
    if (e.touches.length === 0) {
      this.setData({
        'imgs.zoom': false,    //重置缩放状态
      })
    }
  },





  /*
  图片自适应的函数
  */
  imageLoad:function(e){
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = wx.getSystemInfoSync().windowWidth*0.8,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = viewWidth / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  /*
  调用图片
  */
  bindViewTap: function () {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count:5,
      sizeType: ['original', 'compressed'],   // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'],         // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        that.data.picUrl = tempFilePaths;
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          avatarUrl: tempFilePaths
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  /*
  图片放大观看
  */
  previewImage:function(e){
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      picUrl = this.data.picUrl;
    wx.previewImage({
      //当前显示下表
      current: picUrl[index],
      //数据源
      urls: picUrl
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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