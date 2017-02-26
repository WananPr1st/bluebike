var bikeShowObj = Object.create(playObj);
var obj = {
	dom:$('.havefun'),
	slide:function(){
		var oUl = $('.slideCir').get(0);
		var oLi = oUl.getElementsByTagName('li');
		var num = 0;
		var num01 = 0;
		var nWidth = 530;
		//var oBtn = $('.iconarea');
		function fnMove(){
			fnAddSpeed(oUl,(-num*nWidth),"left");
		};
		function fnPrev(){
				num--;
				
				if(num <0){
					num = oLi.length-2;
					oUl.style.left = -(num+1)*nWidth + "px";	
				}
				
				fnMove();
				
				
			}
		function fnNext(){
				num++;
				if(num >= oLi.length){
					num = 2;
					oUl.style.left = 0;	
				}
				fnMove();
			}	
		this.timer = setInterval(fnNext,3000);
		var _this = this;
		
		for(var i=0;i<oLi.length;i++){
			
			oLi[i].onmouseover = function(){
				clearInterval(_this.timer);
			}
			oLi[i].onmouseleave = function(){
				_this.timer = setInterval(fnNext,1200);
			}
		}
	},
	render:function(){
		$('.lineContain li').css({'opacity':1});
		fnAddSpeed($('.coverline').get(0),-250,"right");
	},
	leave:function(){
		$('.lineContain li').css({'opacity':0});
		fnAddSpeed($('.coverline').get(0),0,"right");
	}

}
$.extend(bikeShowObj,obj)
bikeShowObj.slide();