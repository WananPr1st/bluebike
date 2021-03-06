/*验证码输入框*/
var codeTest = Object.create(numberTest);
//验证码输入框
var inputObj02 = Object.create(inputObj);
var input02 = {
	dom:$('.codenext').get(0),
	test:/^\d{4}$/,
	addClass:function(){
		$(this.dom).addClass('active').attr({'placeholder':'请输出正确验证码'});
	}
}
$.extend(inputObj02,input02)
var obj = {
	dom:$('#code'),
	name:'验证码验证',
	bindEvent:function(){
		var _this = this;
		getcode.init();
		$('.code_nest').click(function(){
			var code = $('.codenext').val();
			console.log(code);
			var respon =  _this.sendPost(code);
			console.log(respon)
			if(respon == 'OK'){
				location.hash = '#password';
			}else{

			
				$('.codenext').addClass('active').attr({'placeholder':respon}).val('');
			}
		});
		inputObj02.init('.code_nest',4);
	},
	test:/^\d{4}$/,
	sendPost:function(code){
		console.log(store(ajson).num,store(ajson).clientInfo,store(ajson).appName)
		//获取手机号
		var valb = store(ajson).num;
		var respon;
		var da = {data:JSON.stringify({data:{
							mobile:valb,
							deviceId:store(ajson).deviceId,
							verifyCode:code,
							
						},
							clientInfo:store(ajson).clientInfo+','+store(ajson).appName+',2',
							token:'',
							version:1
						})}



			$.ajax({
				url: '/bluegogo_backend_http/h5/account/checkVerifyCode',
				type: "post",
				data:da,
				async:false,
				dataType: 'text/plain',
				success: function(red){
					respon = JSON.parse(red).errorMsg;
				},
				error:function(){
					console.log('filed')
				}
			});
			return respon;
	}
}
$.extend(codeTest,obj);

/*验证码发送*/
var getcode = {
	dom:$('.getcode'),
	init:function(){
		this.bindEvent();

	},
	/*控制点击时间的全局开关*/
	bSwitch:true,
	bindEvent:function(){
		var _this = this;
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
		//60秒倒计时
		var count = 60;
		var _this = this;
		this.dom.html(count +' s');
		this.timer = setInterval(
				function(){
					count--;
					_this.dom.html(count +' s');
					if(count < 0){
						clearInterval(this.timer);
						_this.dom.html('重新获取');
						_this.dom.css({'background':'#0090ff',"color":'#fff'});
						_this.bSwitch = true;
					}
			},1000)		
		
		
	},
	sendPost:function(){
		var valb = store(ajson).num;
		var da = {data:JSON.stringify({data:{
							mobile:valb,
							deviceId:store(ajson).deviceId,
							flag:'0'
						},
							clientInfo:store(ajson).clientInfo+','+store(ajson).appName+',2',
							token:'',
							version:1
						})}
		$.ajax({
			url: '/bluegogo_backend_http/h5/account/sendVerifyCode',
			type: "post",
			
			data:da,
			dataType: 'text/plain',
			success: function(red){
				console.log(red);
			},
			error:function(){
				console.log('filed')
			}
		})
	}
}
