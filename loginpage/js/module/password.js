var passTest = Object.create(numberTest);
//密码输入框
var inputObj03 = Object.create(inputObj);
var input03 = {
	dom:$('.pstest').get(0),
	test:/^\w{6,18}$/,
	bindEvent:function(obj){
		var _this = this;
		this.dom.oninput = function(){
			if(!_this.test.test(this.value)){
				if(this.value.length > 18){
					//$(obj).css('background','#e2e2e2');
					this.value = this.value.slice(0,18);
				}
			}else{

				$(obj).css('background','#0090ff');
			}
			

		}
	
		var _this = this;
		this.dom.onblur = function(){
			if(!_this.test.test(this.value)){
				this.value ='';
				_this.addClass();
			}
		}
	},
	addClass:function(){
		$(this.dom).addClass('active').attr({'placeholder':'请输入6-18位密码'});
	}
}
$.extend(inputObj03,input03);
//立即注册
var obj03 = {
	dom:$('#password'),
	name:'设置密码',
	bindEvent:function(){
		var _this = this;
		
		$('.pass_nest').click(function(){
			
			var valc = hex_md5($('.pstest').val());
			var valb =  store(ajson).num;
			
			if(valc){
				console.log(valb,valc);
				
				var data = {data:JSON.stringify({data:{
						mobile:valb,
						deviceId:store(ajson).deviceId,
						password:valc,
						ticket:'fc8880ca-723e-4d00-a665-01eadf78769a'
					},
						clientInfo:store(ajson).clientInfo+','+store(ajson).appName+',2',
						token:'',
						version:1
					})}


				var respon = _this.sendPost(data);
				if(respon == 'OK'){
					location.hash = 'loginSuccess';
				}else{
					console.log(respon)
				}
				
			}else{

			}
			
		})
		inputObj03.init('.pass_nest');
	},
	sendPost:function(da){
		var respon;
		$.ajax({
				url: '/bluegogo_backend_http/h5/account/register',
				type: "post",
				data:da,
				async:false,
				dataType: 'text/plain',
				success: function(red){
					respon = JSON.parse(red).errorMsg;
					for(var key in JSON.parse(red).data){
						store(key,JSON.parse(red).data[key])
						credit[key] = JSON.parse(red).data[key];

					}
				},
				error:function(){
					console.log('filed')
				}
			});
		console.log(respon)
		return respon;
	}
}
$.extend(passTest,obj03);