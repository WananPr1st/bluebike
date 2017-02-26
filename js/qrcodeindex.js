//关闭提示按钮
var showBtn = {
	dom:$('.cover'),
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		  

		this.dom.click(function(){
			$(this).hide();
		})
	},
	show:function(){
		this.dom.show();
	}
}

//下载按钮
var downBtn = {
	dom:$('.dl_main_right'),
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		 //判断是安卓手机还是苹果
			// var u = navigator.userAgent;

			// 	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
			// 	//安卓手机
				

			// 	} else if (u.indexOf('iPhone') > -1) {
			// 	//苹果手机
			// 		var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
			// 		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			// 				//在微信中打开
			// 				 this.dom.click(function(){
			// 				 	showBtn.show();
			// 				 });
			// 				return;
			// 			}
			// 	}
		this.dom.click(function(){
			location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.beastbike.bluegogo";
		})
	}
}
//判断打开方式


window.onload = function(){

	showBtn.init();
	downBtn.init();
	if (browser.versions.mobile) {//判断是否是移动设备打开。
		  var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
		  if (ua.match(/MicroMessenger/i) == "micromessenger") {
		    //在微信中打开
		  }
		 
		} else {
		  //否则就是PC浏览器打开
	}
}