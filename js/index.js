
window.onload = function(){
	// var oLi = $('.head_nav li');
	// for(var i=0;i<oLi.length;i++){
	// 	oLi[i].onmouseover = function(e){
	// 		this.style.color = 'rgb(0, 123, 215)';
	// 		$(this).siblings().css('color','#6e6e6e');
	// 		 var e = window.event||e;
	// 		e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;
	// 	}
	// }
	$('.dlwx_dlow').get(0).onmouseenter = function(e){


		downloadObj.downmashow();
		var e = window.event || e;
		this.style.backgroundImage ='url(image/linkwxLight001.png)';
		this.style.backgroundSize = '43px 43px';
		e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;

	}
	//微博的悬停

	$('.dlwx_dlow').get(1).onmouseenter = function(){
		this.style.backgroundImage ='url(image/linkwbLight.png)';
		this.style.backgroundSize = '43px 43px';
	}
	$('.dlwx_dlow').get(1).onmouseleave = function(){
		this.style.backgroundImage ='url(image/linkwb2.png)';
		this.style.backgroundSize = '43px 43px';
	}
	$('.dlwx_dlow').get(0).onmouseleave = function(e){
		downloadObj.downmahide();
		this.style.backgroundImage ='url(image/linkwx2.png)';
		this.style.backgroundSize = '43px 43px';
		e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;
	}
	$('.dlwx_dlow2').click(function(){
		location.href = 'http://weibo.com/u/6013446297'
	})
	//手机悬停

	// $('.ph_wx').click(function(e){
	// 	alert(1)
	//
	// 	var e = window.event||e;
	// 	e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;
	// 	//location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.beastbike.bluegogo'
	// })
	yshuai.event.addEventListener($('.ph_wx').get(0),'touchend',function(e){
		e.preventDefault?e.preventDefault():e.returnValue=false;
		$('.wxcode').css('display','block');
		$('.ph_wx').addClass('ph_wxLight');
		e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;
	})
	yshuai.event.addEventListener($('.phone_down01').get(0),'touchend',function(e){
		e.preventDefault?e.preventDefault():e.returnValue=false;
		$('.wxcode').css('display','none')
		$('.ph_wx').removeClass('ph_wxLight');
	})
	// $(document).click(function(){
	// 	alert(2)
	// 	$('.ph_wx').unbind("click");
	// 	$('.wxcode').css('display','none');
	// })
	yshuai.event.addEventListener($('.ph_wb').get(0),'touchend',function(e){
		e.preventDefault?e.preventDefault():e.returnValue=false;
		location.href = 'http://weibo.com/u/6013446297'
		e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;
	})
	//点击下载
	yshuai.event.addEventListener($('.down_btn').get(0),'touchstart',function(e){
		e.preventDefault?e.preventDefault():e.returnValue=false;
		$('.down_btn').addClass('down_visited');
		e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;
	})
	yshuai.event.addEventListener($('.down_btn').get(0),'touchend',function(e){
		e.preventDefault?e.preventDefault():e.returnValue=false;

		location.href ='http://a.app.qq.com/o/simple.jsp?pkgname=com.beastbike.bluegogo';

		e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;
	})

	//swiper初始化；

	var swiper = new Swiper('.swiper-container01', {
	    pagination: '.swiper-pagination',
	    paginationClickable: true
	});
	 var swiper2 = new Swiper('.swiper-container02', {
	    paginationClickable: false,
	    nextButton: '.leftbtntt',
   		prevButton: '.rightbtntt',
   		onSlideChangeStart: function(swiper){
      		console.log(swiper.activeIndex);
      		if(swiper.activeIndex==1){
      			$('.leftbtntt').css({'backgroundImage':'url(image/rightclick.png)'}).siblings().css({'backgroundImage':'url(image/rightclick.png)'});
      		}else{
      			$('.rightbtntt').css({'backgroundImage':'url(image/leftclick.png)'}).siblings().css({'backgroundImage':'url(image/leftclick.png)'});
      		}
    	}
	});

	 var swiper3 = new Swiper('.swiper-container03', {
	    paginationClickable: false,
	    nextButton: '.swsBtn02',
   		prevButton: '.swsBtn01' ,
   		onSlideChangeStart: function(swiper){
   			var num = swiper.activeIndex;
   			if(num>=3){

   				$('.dstext01').addClass('out').removeClass('in');
   				$('.dstext02').addClass('in').removeClass('out');
   			}else{

   				$('.dstext01').addClass('in').removeClass('out');
   				$('.dstext02').addClass('out').removeClass('in');

   			}
   		},
   		onTransitionStart:function(swiper){
   			var num = swiper.activeIndex;
   			if(num==4){
   				$('.swsBtn02').addClass('swsBtnDisabled');
   			}else if(num==0){
   				$('.swsBtn01').addClass('swsBtnDisabled');
   			}else{
   				$('.swsBtn02').removeClass('swsBtnDisabled');
   				$('.swsBtn01').removeClass('swsBtnDisabled')
   			}
   		}
	});
	// $('.leftbtntt').on('click',function(){


	// })
	// $('.rightbtntt').on('click',function(){



	// })
	//创造iscroll实例
	//

	//菜单下拉
	yshuai.event.addEventListener($('.headMenu').get(0),'touchend',function(e){
		var e  = window.event||e;
		e.preventDefault();

		$('.menuList').toggleClass('active01');



		e.stopPropagation?e.stopPropagation():e.cancelBubble = true;

	})

	// yshuai.event.addEventListener($('body').get(0),'touchstart',function(e){
	// 	//e.preventDefault?e.preventDefault():e.returnValue=false;
	// 	var e  = window.event||e;
	// 	$('.menuList').removeClass('active01')
	// 	alert('b');
	// 	e.stopPropagation?e.stopPropagation():e.cancelBubble = true;


	// })
	$('body').on('tap',function(){
		$('.menuList').removeClass('active01')
	})
		//遗留问题
		//滚动距离 offetTop
		//自行车适配
		//
		//
		//
//手机菜单按钮
var headHeight = $('.headContain').height()/2-1;
var padHeight  = parseInt($('.slider').css('padding-top'));

var playHeight = $('.slider').get(0).offsetTop-headHeight;
var fanHeight  = $('.bike-info').get(0).offsetTop-headHeight;
var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
yshuai.event.addEventListener($('.menuList').get(0),'touchend',function(e){
	e.preventDefault?e.preventDefault():e.returnValue=false;
		switch(e.target.innerHTML){
			case '首页':

				$('html, body').animate({scrollTop:0},1000);
				$('.menuList').removeClass('active01')
			break;
			case '玩转小蓝':
				$('html, body').animate({scrollTop:playHeight},1000);
				$('.menuList').removeClass('active01')
			break;
			case '有范儿':
				$('html, body').animate({scrollTop:fanHeight},1000);
				$('.menuList').removeClass('active01')
			break;

		};
});

$("#language").on('mouseenter', function (e) {
    $("#language li:last").show();
    $('#language li:first img:last').attr('src', 'image/up1.png');
});

$("#language").on('mouseleave', function (e) {
    $("#language li:last").hide();
    $('#language li:first img:last').attr('src', 'image/down.png');
});

$("#language li:first").on('click', function (e) {
    window.location.href = "http://www.bluegogo.com/cn";
})

$("#language li:last").on('click', function (e) {
    window.location.href = "http://www.bluegogo.com/us";
})

$(".phone_language li").on('touchstart', function (e) {
    $(".bg").css({
        display: 'block',
        height: $(document).height()
    });
    $(".phone_language_modal").slideDown();
    $(".phone_language li").hide();
});

$(".bg").on('touchstart', function (e) {
    $(".phone_language_modal").slideUp();
    $(".bg").hide();
    $(".phone_language li").show();
})

$(".phone_language_modal li:first").on('touchstart', function (e) {
    $(".phone_language_modal").slideUp();
    $(".bg").hide();
    $(".phone_language li").show();
})

}