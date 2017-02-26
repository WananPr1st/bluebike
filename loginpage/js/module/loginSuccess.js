var loginTest = Object.create(numberTest);
var obj04 = {
	dom:$('#loginSuccess'),
	name:'注册成功',
	bindEvent:function(){
		
	},
	init:function(){
		this.bindEvent();
		this.render();

	},
	render:function(){
		if(store('invalidDate')){
			var data = new Date(store('invalidDate')).getFullYear();
			var data02 = new Date(store('invalidDate')).getMonth()+1;
			var data03 = new Date(store('invalidDate')).getDate();
			this.dom.html('<div class="lg_main"><h2>注册成功</h2><p class="lg_youhui">一张<b>'+store('amount')/100+'</b>元优惠卷已放入您的账户</p><p>赶紧下载应用骑行吧</p></div><div class="lg_tag"><div class="lg_tag_left"><p class="lg_tit">'+store('title')+'</p><dl><dt>有效期至'+data+'年'+data02+'月'+data03+'日</dt><dd>'+store('desc')+'</dd><dd>新用户奖励优惠用券</dd></dl></div><div class="lg_tag_right"><p><span class="lg_price">'+store('amount')/100+'</span><span>元</span></p></div></div>'+'<div class="lg_download"><div class="dl_cover"></div><div class="dl_main"><div class="dl_main_left"><ul><li class="dl_logo"></li><li><div class="logo_text"><span></span><span>小蓝单车</span></div></li></ul></div><div class="dl_main_right">立即下载</div></div></div>')
		}else{
			var data = new Date(credit['invalidDate']).getFullYear();
			var data02 = new Date(credit['invalidDate']).getMonth()+1;
			var data03 = new Date(credit['invalidDate']).getDate();
			
			$('.lg_pri').html(credit['amount']/100);
			$('.lg_price').html(credit['amount']/100);
			$('.lg_tit').html(credit['title']);
			$('.lg_time').html('有效期至'+data+'年'+data02+'月'+data03+'日')
			$('.lg_desc01').html(credit['desc']);

		}
		//
	// 	var data = new Date(store('invalidDate')).getYear()+1900;
	// 		var data02 = new Date(store('invalidDate')).getMonth();
	// 		var data03 = new Date(store('invalidDate')).getDate();
	// 		this.dom.html('<div class="lg_main"><h2>注册成功</h2><p class="lg_youhui">一张<b>'+store('amount')/100+'</b>元优惠卷已放入您的账户</p><p>赶紧下载应用骑行吧</p></div><div class="lg_tag"><div class="lg_tag_left"><p class="lg_tit">'+store('title')+'</p><dl><dt>有效期至'+data+'年'+data02+'月</dt><dd>'+store('desc')+'</dd><dd>新用户奖励优惠用券</dd></dl></div><div class="lg_tag_right"><p><span class="lg_price">'+store('amount')/100+'</span><span>元</span></p></div></div>')
	// }
		$('.dl_main_right').click(function(){
			location.href = 'https://itunes.apple.com/app/id1168657796';
		})	
	}	
	
}
$.extend(loginTest,obj04);
// {"errorCode":0,"errorMsg":"OK","tm":1.4779889E9,"data":{"birthday":"","amount":500,"distance":0,"gender":0,"idCard":"","authStatus":0,"mobile":"15221234124","consume":0,"title":"被邀请人邀请券","invalidDate":1480580900383,"depositPaid":0,"token":"cbffb086-4190-46b2-a5dc-186b66c2366b","nick":"","creditLevel":1,"parkNotification":0,"name":"","avatarImg":"","depositStatus":0,"status":0,"desc":"被邀请人邀请券"}}
// <div class="lg_main"><h2>注册成功</h2><p class="lg_youhui">一张<b>'+credit['amount']/100+'</b>元优惠卷已放入您的账户</p><p>赶紧下载应用骑行吧</p></div><div class="lg_tag"><div class="lg_tag_left"><p class="lg_tit">'+credit['title']+'</p><dl><dt>有效期至'+data+'年'+data02+'月'+data03+'日</dt><dd>'+credit['desc']+'</dd><dd>新用户奖励优惠用券</dd></dl></div><div class="lg_tag_right"><p><span class="lg_price">'+credit['amount']/100+'</span><span>元</span></p></div></div>
//下载应用
