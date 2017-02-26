// var map = new AMap.Map('map', {
//       resizeEnable: true,
//       zoom:17,
//       center: [116.48143, 39.997612]
         
//     });
//     orderId:'1478254845524897',
//    	var orderId ='1478499316144741';
//	var ticket ='0f6a9868-f52a-4361-8cad-208914a24e85';
var client = navigator.appVersion.split(' ')[0].split('.')[0]; 
var clientInfo = 'clientInfo';
if(location.search){
	//var ary = location.search.split('&')[1].split('=')[1]
	// var orderId = location.search.split('&')[1].split('=')[1];
	// var ticket = location.search.split('&')[0].split('=')[1];
	var arr = location.search.split('?')
	arr.shift();
	var ary = arr[0].split('&');
	for(var i=0;i<ary.length;i++){
	    if(ary[i].indexOf('ticket')!==-1){
	     var ticket = ary[i].split('=')[1];
		}else if(ary[i].indexOf('orderId')!==-1){
			var orderId =ary[i].split('=')[1];
		}
	}
}else{
   	var orderId ='1478499316144741';
	var ticket ='0f6a9868-f52a-4361-8cad-208914a24e85';
}


while(client.length < 5){
	client += '0';
}
var credit = {};

//var tiket = location.hash.slice(16,52);
var appName = navigator.appName;
var data = {data:JSON.stringify({data:{
						orderId:orderId,
						isForce:0,
						ticket:ticket
					},
						clientInfo:client+','+appName+',2',
						token:'',
						version:1
					})}

//订单详情请求
function getPost(){
		$.ajax({
				url:'/bluegogo_backend_http/h5/account/orderDetail',
				type: "post",
				async:true,
				data:data,
				cache: false,
				dataType: 'text/plain',
				success: function(res){
					var data = JSON.parse(res);
					if(data.errorMsg == 'OK'){
						//获取时间
						var atime = data.data.order.beginTime
						
						var aMonth = new Date(atime).getMonth() + 1;
						var aDate = new Date(atime).getDate();
						var aHour = new Date(atime).getHours()
						var aMin = new Date(atime).getMinutes()
						if(aMin < 10){
							aMin = '0' +aMin;
						}
						$('.logotime_date').html(aMonth+'月'+aDate+'日');
						$('.logotime_hour').html(aHour+':'+aMin);


						if(data.data.order.path){
							var lineArr = data.data.order.path.slice(0,-1).split(';').join(',').split(',');
							var lngMax = 0;
							var lngMin = lineArr[0];
							var latMax = 0;
							var latMin = lineArr[1];
							var arr = []; 
							for(var i =0;i<lineArr.length;i+=2){
								if(lngMax < lineArr[i]){
									lngMax = lineArr[i];
								 	
								}
								if(latMax < lineArr[i+1]){
									latMax = lineArr[i+1]
								}
								if(lngMin > lineArr[i]){
									lngMin = lineArr[i]
								}
								if(latMin > lineArr[i+1]){
									latMin = lineArr[i+1]
								}
									arr.push([Number(lineArr[i]),Number(lineArr[i+1])])
									//画地图
						  
						  		 var map = new AMap.Map('map', {
						     	 resizeEnable: true,
						     	 zoom:19,
						     	 center: arr[0]
						         
						   		 });

								if(arr.length == 1){
						    		marker = new AMap.Marker({
									    position: arr[0],
									    title: '',
									    map:map,
									    draggable:false,
									    content: '<div class="marker-route marker-marker-bus-from"><div class="amap-end amap-point">终</div></div>'

									});
									
						    	}else if(arr.length == 2){
						    		marker = new AMap.Marker({
									    position: arr[0],
									    title: '起点',
									    map:map,
									    draggable:false,
									    content: '<div class="marker-route marker-marker-bus-from"><div class="amap-start amap-point">起</div></div>'

									});
									marker02 = new AMap.Marker({
									    position: arr[1],
									    title: '终点',
									    map:map,
									    draggable:false,
									    content: '<div class="marker-route marker-marker-bus-from"><div class="amap-end amap-point">终</div></div>'
									});
									map.setFitView();

						    }else{
						    	marker = new AMap.Marker({
									    position: arr[0],
									    title: '起点',
									    map:map,
									    draggable:false,
									    offset: new AMap.Pixel(-12,-12),
									    content: '<div class="marker-route marker-marker-bus-from"><div class="amap-start amap-point">起</div></div>'
									    //animation:'AMAP_ANIMATION_BOUNCE'

									});
									marker02 = new AMap.Marker({
									    position: arr[arr.length-1],
									    offset: new AMap.Pixel(-12,-12),
									    title: '终点',
									    map:map,
									    draggable:false,
									    content: '<div class="marker-route marker-marker-bus-from"><div class="amap-end amap-point">终</div></div>'
									});
							    var newCenter = map.setFitView();
						    	var polyline = new AMap.Polyline({
							        path: arr,          //设置线覆盖物路径
							        strokeColor: "#3366FF", //线颜色
							        strokeOpacity: 1,       //线透明度
							        strokeWeight: 5,        //线宽
							        strokeStyle: "solid",   //线样式
							        strokeDasharray: [10, 5] //补充线样式
							    });
							    polyline.setMap(map);
						    }
						  
								
						 }
						}else{
							var lineArr = [116.38,39.90];
							var map = new AMap.Map('map', {
						     	 resizeEnable: true,
						     	 zoom:18,
						     	 center: lineArr
						         
						   		 });

							
						}
						

						var mes = data.data.order;
						
						// for(var i =0;i<lineArr.length;i+=2){
						// 	if(lngMax == lineArr[i]){
						// 		console.log(lineArr[i],lineArr[i+1])
						// 		lineArr.splice(i,2);
							 	
						// 	}
						// 	if(latMax == lineArr[i+1]){

						// 		lineArr.splice(i,2);
						// 	}
						// 	if(lngMin == lineArr[i]){
						// 		lineArr.splice(i,2);
						// 	}
						// 	if(latMin == lineArr[i+1]){
						// 		lineArr.splice(i,2);
						// 	}
							
						// 	arr.push([Number(lineArr[i]),Number(lineArr[i+1])])
							
						// }
						

						//渲染分享信息
						renderHtml.init(mes);
						//渲染分享头像
						var imgUrl = data.data.order.avatarImg;
						var relname =  data.data.order.realName || '';
						
						if(imgUrl.indexOf('null')==-1){
							$('.usericon').css({'backgroundImage':'url('+imgUrl+')'});
						}else{
							$('.usericon').css({'backgroundImage':'url(images/defaulticon.png)'})
						}
						//渲染分享姓名
						$('.username').html(relname)
												  		
							
						    
							  

						return mes;
							

					}else{
						alert(data.errorMsg)
					}
				
				 }
			})
}

var renderHtml = {
	dom:$('.shareMsg'),
	init:function(data){
		this.render(data);
	},
	render:function(data){
		var meter = Number(data['distance']);
		if(meter == 0){
			meter = 0;
		}else if(meter%10 !== 0){
			meter = Math.ceil(meter/10)/100;
		}else{
			meter = meter/1000;
		}
		var useTime = Math.ceil(data['useTime']/60);
		if(useTime < 1 && useTime > 0){
			useTime = 1;
		}
		this.dom.html('<div class="shareContain"><div class="share_up"><div class="share_up_left left"><em class="icon left"></em><div class="tips left"><h3>'+meter+'</h3><p>里程(km)</p></div></div><div class="share_up_right right"><div class="tips right"><h3>'+useTime+'</h3><p>时长(min)</p></div><em class="icon right icon2"></em></div></div><div class="share_down"><div class="share_up_left left"><em class="icon left icon3"></em><div class="tips left"><h3>'+data['calorie']+'</h3><p>消耗(Cal)</p></div></div><div class="share_up_right right"><div class="tips right"><h3>'+data['carbon']+'</h3><p>减少碳排(g)</p></div><em class="icon right icon4"></em></div></div></div>')
	}
}


getPost();
//立即下载
 $('.dl_main_right').click(function(){
 	 var ua = navigator.userAgent.toLowerCase();//获取判断用的对象

    //  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //      //在微信中打开
    //      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.beastbike.bluegogo';
    // }else{
    // 	//不是在微信打开
    // 	location.href = 'http://www.bluegogo.com/';
    // }
     if (browser.versions.iPhone && ua.match(/WeiBo/i) == "weibo"){
    	 //是否在ios下微博打开
    	 
	    	

     	 location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.beastbike.bluegogo';

   	}else{
   		location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.beastbike.bluegogo';
   	}
 	
 });