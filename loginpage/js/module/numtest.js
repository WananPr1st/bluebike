//点击下一步按钮
// function nextObj(id,hashname,url,data){
// 	this.dom = $(id);
// 	this.init = function(){
// 		this.bindEvent();
// 		this.render();
// 	};
// 	this.bindEvent = function(){
// 		var _this = this;
// 		this.dom.click(function(){
// 			location.hash = hashname;
// 			_this.sendPost();
// 		}) 
// 	};
// 	this.sendPost = function(){
		
		
// 	};
// 	this.render = function(){
// 		// console.log(2);
// 	};
// 	this.init();
// }
// 获取clientInfo
//input输入区域
//Navigator
// navigator.appCodeName  浏览器代号
// "Mozilla"
// navigator.appName      浏览器名称
// "Netscape"
// navigator.appVersion    浏览器版本:
// "5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
// navigator.cookieEnabled   启用Cookies
// true
// navigator.platform        硬件平台
// "Win32"
// navigator.userAgent       用户代理
// "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"  
// 数据模型
var client = navigator.appVersion.split(' ')[0].split('.')[0]; 
var clientInfo = 'clientInfo';
var credit = {};
var tiket = location.hash.slice(16,52);
if(!tiket){
	tiket = '';
}
while(client.length < 5){
	client += '0';
}
var device = (Math.random()*10000).toFixed(0);
var deviceId = 'deviceId';
//浏览器名称
var appName = navigator.appName;
var json = {
	clientInfo:client,
	deviceId:device,
	appName:appName
}
var ajson = 'ajson'
function store(nameSpace, data){
	//存取操作
	if(data) {
		sessionStorage.setItem(nameSpace, JSON.stringify(data));
	}
	return (nameSpace && JSON.parse(sessionStorage.getItem(nameSpace))) || null;
}

var inputObj =	{
	dom:$('.numtest').get(0),
	test:/^[\d,\s]{13}$/,
	init:function(obj,numlength,flag){
		this.bindEvent(obj,numlength,flag);
		this.dom.focus();
		
	},
	bindEvent:function(obj,numlength,flag){
		$('.numtest').click(function(){
			$('.num_nest').addClass('come')
		})
		var _this = this;
		this.dom.onkeypress = function(){
			// if(isNaN(Number(this.value))){
			// 	this.value ='';
			// 	_this.addClass();
			// 	return;
			// }
			console.log(this.value.length)
			if(flag){
				if(this.value.length ==3 ||this.value.length == 8){
					this.value += ' ';
				}
			}
			
			

		}
		this.dom.oninput = function(){
			//将value值先去除空格在判断是不是数字
			if(isNaN(Number(this.value.split(' ').join('')))){
				this.value ='';
				_this.addClass();
				return;
			}
			if(this.value.length > numlength){
				//$(obj).css('background','#e2e2e2');
				this.value = this.value.slice(0,numlength);
				return
			}
			if(!_this.test.test(this.value)){

				return;
			}else{
				$(obj).css('background','#0090ff');
			}
		}
	},
	presentValue:function(){
		console.log(this.value);
	},
	addClass:function(){
		$(this.dom).addClass('active').attr({'placeholder':'请输出正确手机号'});
		
	}

}
// 手机号验证
var numberTest = {
	dom:$('#Numtest'),
	name:'手机号',
	init:function(){
		this.bindEvent();
		this.render();
	},
	bindEvent:function(){
		var _this = this;
		inputObj.init('.num_nest',13,true);
		//不要传this,this指向改变，下面的enter调用this指向的是nextObj
		//Jq click事件添加方法会向原click方法继续添加新方法，需要提前解绑；
		$('.num_nest').unbind("click").click(function(){
				//将带空格的号码做处理，避免服务器不识别
				var vala = $('.numtest').val().split(' ').join('');
				if(vala){
						var da = {data:JSON.stringify({data:{
							mobile:vala
						},
							clientInfo:client+','+appName+',2',
							token:'',
							version:1
						})}
						//发送请求
						_this.sendPost(da);
						var register = _this.sendPost(da);
						if(!register){

							/*
							
							跳转页面
							 */
							location.hash = '#code';
							/*
							
								判断手机号是否相同，不同的话开启验证码发送按钮  可用  状态
							 */
							// var pre_num = 
							
							json.num = vala;
							//验证通过，开始存储数据
							store(ajson,json)
						}else{
							$('.covered').toggle();
							//判断是安卓手机还是苹果
							var u = navigator.userAgent;

								if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
								//安卓手机

								  $('.cover_download').html('下载APP');

								} else if (u.indexOf('iPhone') > -1) {
								//苹果手机

								    $('.cover_download').html('下载APP');
								    $('.cover_download').click(function(){
								    	location.href = 'https://itunes.apple.com/app/id1168657796';
								    })

								} 
							$('.coverbg').click(function(){
								$('.covered').hide();
							})
							return;
						}
						
						
					}
				
		})

	},
	render:function(){

	},
	sendPost:function(da){
		var data ;
		$.ajax({
					url: '/bluegogo_backend_http/h5/account/checkMobile',
					type: "post",
					async:false,
					data:da,
					 cache: false,
					dataType: 'text/plain',
					success: function(res){
						data = JSON.parse(res)['data']['registered'];
						
					}
				})

		return data;
	},
	enter:function(){
		this.dom.show();
	},
	leave:function(){
		this.dom.hide();
	}
}

