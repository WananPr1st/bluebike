// 手机号验证
var numberTest = {
	dom:$('.mobelnum').find('input')[0],
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		this.dom.oninput = function(){
			if(isNaN(Number(this.value))){
				this.value ='';
				_this.addClass();
			}

		}
		this.dom.onblur = function(){
			if(!_this.test.test(this.value)){
			}
		}
	},
	test:/^\d{11}$/,
	addClass:function(){
		$(this.dom).addClass('active');
	}

}
numberTest.init();



/*验证码输入框*/
var codeTest = Object.create(numberTest);
var obj = {
	dom:$('.codearea').find('input')[0]
}
$.extend(codeTest,obj);
codeTest.init();

/*验证码发送*/
var getcode = {
	dom:$('.getcode'),
	init:function(){
		this.bindEvent();
	},
	/*控制点击时间的全局开关*/
	bSwitch:true,
	bindEvent:function(){
		var _this = this
		var bSwitch = true;
		this.dom.click(function(){
			if(!_this.bSwitch){
				return;
			}
			$(this).css({'background':'#e2e2e2',"color":'#707070'})
			_this.bSwitch = false
			_this.timeCount();
			_this.sendPost();
		})
	},
	timeCount:function(){
		clearInterval(this.timer);
		var count = 3;
		var _this = this;
		this.dom.html(count +'s');
		this.timer = setInterval(
				function(){
					count--;
					_this.dom.html(count +'s');
					if(count < 0){
						clearInterval(this.timer);
						_this.dom.html('重新获取');
						_this.dom.css({'background':'#0090ff',"color":'#fff'});
						_this.bSwitch = true;
					}
			},1000)		
		
		
	},
	sendPost:function(){
		var da = {data:JSON.stringify({data:{
							mobile:'15210217572'
						},
							clientInfo:'2',
							token:'',
							version:1
				})}
		$.ajax({
			url: '/bluegogo_backend_http/h5/account/checkMobile',
			type: "post",
			data:da,
			dataType: 'text/plain',
			success: function(res){
				console.log(res);
			}
		})
	}
}
getcode.init()
