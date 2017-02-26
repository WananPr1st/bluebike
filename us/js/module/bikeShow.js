var bikeShowObj = Object.create(playObj);
var obj = {
	dom:$('.havefun'),
	slide:function(){

		var oUl = $('.slideCir');
		var num = 0;
		//var oBtn = $('.iconarea');
		var firstTit = null,secondTit = null;
		titList = $('.hfb_title');
		// 确定第一个tit和第二个tit
		var funBackOrFront = function() {
		    titList.each(function() {
		        if ($(this).hasClass("out")) {
		            firstTit = $(this);

		        } else {
		            secondTit = $(this);

		        }
		    });
		};
		funBackOrFront();
		function fnMove(){


            firstTit.addClass("in").removeClass('out');
      		      setTimeout(function() {
		        secondTit.addClass("out").removeClass('in');
		        // 重新确定正反元素
		         funBackOrFront();
		    }, 15);

		    $('.slide2Contain').animate({'left':-num*1200},500);

		};
		function fnPrev(){


				num--;

				if(num <0){
					$('.slide2Contain').css('left',-2400);
					num = oUl.length-2;

				}

				fnMove();


			}
		function fnNext(){
				num++;

				if(num >= oUl.length){
					$('.slide2Contain').css('left',0);
					num = 1;

				}
				fnMove();
			}
		// this.timer = setInterval(fnNext,5000);
		// var _this = this;



		// 	$('.hfb_contain').get(0).onmouseover = function(){
		// 		clearInterval(_this.timer);
		// 	}
		// 	$('.hfb_contain').get(0).onmouseleave = function(){
		// 		_this.timer = setInterval(fnNext,5000);
		// 	}

		$('.leftbtn').unbind('click').click(function(){

			if($(this).attr('disabled') !== 'disabled'){
				fnNext();
			}
			$(this).attr("disabled", "disabled");
			var _this = this;
			setTimeout(function(){

				$(_this).removeAttr("disabled");
			},500)

		})
		$('.rightbtn').unbind('click').click(function(){
			if($(this).attr('disabled') !== 'disabled'){
					fnPrev();
				}
				$(this).attr("disabled", "disabled");
				var _this = this;
				setTimeout(function(){
					$(_this).removeAttr("disabled");
				},500)
			})
	},
	render:function(){
		$('.lineContain li').css({'opacity':1});
		//人体工学可调节座椅
		fnAddSpeed($('.lineguide-cover').get(0),-250,"right");
		//智能锁
		fnAddSpeed($('.zns-cover').get(0),-250,"right");
		//双面螺旋设计脚踏
		fnAddSpeed($('.sml-cover').get(0),250,"right");
		//铝合金加固车篮
		fnAddSpeed($('.lhj-cover').get(0),250,"right");
		//一体式车铃
		fnAddSpeed($('.yts-cover').get(0),250,"right");
		//壁虎式手柄
		fnAddSpeed($('.bhs-cover').get(0),-250,"right");

	},
	leave:function(){
		$('.lineContain li').css({'opacity':0});
		//人体工学可调节座椅
		fnAddSpeed($('.lineguide-cover').get(0),0,"right");
		//智能锁
		fnAddSpeed($('.zns-cover').get(0),0,"right");
		//双面螺旋设计脚踏
		fnAddSpeed($('.sml-cover').get(0),0,"right");
		//	铝合金加固车篮
		fnAddSpeed($('.lhj-cover').get(0),0,"right");
		//一体式车铃
		fnAddSpeed($('.yts-cover').get(0),0,"right");
		//壁虎式手柄
		fnAddSpeed($('.bhs-cover').get(0),0,"right");
	},
	childsShow:function(){
		var swiperPC01 = new Swiper('.swiper-containerPC01', {
		    paginationClickable: true,
		    autoplay:3000,
		    speed:3000
		});
	}

}
$.extend(bikeShowObj,obj)
bikeShowObj.slide();
bikeShowObj.childsShow();