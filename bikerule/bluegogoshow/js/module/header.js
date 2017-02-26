
var headerObj = {
	dom:$('.head'),
	init:function(){
		this.render();
		this.bindEvent();
		this.controller();
	},
	childs:function(){
		return this.dom.find('li');
	},
	height:function(){
		return this.dom.height();
	},
	render:function(){

	},
	bindEvent:function(){
		var _this = this;
		yshuai.event.addEventListener(window,'scroll',function(){
			var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
		 	 scrollT>0?_this.dom.css({'position':'fixed','top':'0'}):_this.dom.css({'position':'relative'})
		 	 var scrollTrue = scrollT + _this.height();
		 	 if(scrollTrue >= playObj.ownHeight() && scrollTrue < bikeShowObj.ownHeight()){
		 	 	_this.changeStyle(_this.childs()[0]);
		 	 	bikeShowObj.leave();
		 	 }else if(scrollTrue >= playObj.ownHeight() && scrollTrue < downloadObj.ownHeight()){
		 	 	_this.changeStyle(_this.childs()[1]);
		 	 	bikeShowObj.render();
		 	 }else if(scrollTrue >=downloadObj.ownHeight()){
		 	 	_this.changeStyle(_this.childs()[2]);
		 	 	bikeShowObj.leave();
		 	 }else{
		 	 	$(_this.childs()).css({'background':'#fff','color':'#6e6e6e'})
		 	 }
		})
	},
	controller:function(){
		var oLi = this.childs();
		var num = this.height();
		var _this = this;
		for(var i=0;i<oLi.length;i++){
			switch(i){
				case 0:
				oLi[i].onclick = function(){
					playObj.init(num);
				}
				
				break;
				case 1:
				oLi[i].onclick = function(){
					bikeShowObj.init(num);
				}
				break;
				case 2:
				oLi[i].onclick = function(){
					downloadObj.init(num);
				}
				break;
			}
		}
	},
	changeStyle:function(obj){
		$(obj).css({'background':'#007bd7','color':'#fff'}).siblings().css({'background':'#fff','color':'#6e6e6e'})
	}

}
headerObj.init()