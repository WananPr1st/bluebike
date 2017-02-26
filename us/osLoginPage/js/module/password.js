var passTest = Object.create(numberTest);
//密码输入框
var inputObj03 = Object.create(inputObj);
var input03 = {
	dom:$('.pstest').get(0),
	test:/^\w{6,16}$/,
	bindEvent:function(obj){
		var _this = this;
		this.dom.oninput = function(){
			if(!_this.test.test(this.value)){
				if(this.value.length > 16){
					//$(obj).css('background','#e2e2e2');
					this.value = this.value.slice(0,16);
				}
                if (this.value.length < 6) {
                    $(obj).css('background','#e2e2e2');
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
		$(this.dom).addClass('active').attr({'placeholder':'Please enter a 6-16 digits password'});
	}
}
$.extend(inputObj03,input03);
//立即注册
var obj03 = {
	dom:$('#password'),
	name:'set password',
	bindEvent:function(){
		var _this = this;

		$('.pass_nest').click(function(){

			var valc = hex_md5($('.pstest').val());
			var valb =  store(ajson).num;

			if(valc.length && $('.pstest').val().length > 5 && !flag){
				touchChange(this);
                console.log(valb,valc);
                flag = true;
				var data = {data:JSON.stringify({data:{
						email:valb,
						deviceId:store(ajson).deviceId,
						password:valc,
						ticket: ticket
					},
                        lang: 'en',
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

			}
		})
		inputObj03.init('.pass_nest');
	},
	sendPost:function(da){
		var respon;
		$.ajax({
				url: baseUrl + '/h5/account/register',
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
					console.log('filed');
				},
                complete: function() {
                    flag = false;
                }
			});
		console.log(respon)
		return respon;
	}
}
$.extend(passTest,obj03);