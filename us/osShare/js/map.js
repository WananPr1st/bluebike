var client = navigator.appVersion.split(' ')[0].split('.')[0];
// var clientInfo = 'clientInfo';
var ticket = getQueryString(location.search, 'ticket') || '322783f4-07b8-43f9-94aa-9c5a97488fca';
var orderId = getQueryString(location.search, 'orderId') || '1484034643527274';
var mapInfo = null;
var gmap = null;
var ridePathArr = [];
var markers = [];
var getDateUrl = null;
if (location.hostname.indexOf('test') !== -1) {
	getDateUrl = 'https://test-api-us.bluegogo.com/h5/account/orderDetail';
}
else {
	getDateUrl = 'https://api-us.bluegogo.com/h5/account/orderDetail';
}

function getQueryString(str, name) {  
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');  
    var r = str.substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
}

while (client.length < 5) {
	client += '0';
}

var appName = navigator.appName;
var data = {
	data: JSON.stringify({
		data: {
			orderId: orderId,
			isForce: 0,
			ticket: ticket
		},
		clientInfo: client + ',' + appName + ',2',
		lang: 'en',
		token: '',
		version: 1
	})
};


// var res = {
// 	data: {
// 		order: {}
// 	},
// 	errorCode: 0,
// 	errorMsg: 'OK',
// 	tm: 1484027881
// };
// res.data.order = {
// 	actualPrice: 0,
// 	avatarImg: "https://blugogo-image.oss-cn-beijing.aliyuncs.com/null",
// 	beginTime: 1479800929677,
// 	bikeNo: "755001475",
// 	calorie: 39,
// 	carbon: 33,
// 	discount: 300,
// 	distance: 160,
// 	manualModified: 0,
// 	orderId: "1479800929520338",
// 	// path: "116.4745598,39.9952148;116.4745609,39.9952186;",
// 	path: "-119.2009780000,34.2749780000;-119.2377730000,34.2685350000;-119.2305860000,34.2613750000;-119.2188010000,34.2635230000;",
// 	priceRules: "0.5元/半小时",
// 	rawPrice: 50,
// 	realName: "Vic.coeffeffffvdffddfdffvfd",
// 	renewCount: 0,
// 	renewDiscount: 1,
// 	renewPrice: 0,
// 	renewTime: 900,
// 	status: 0,
// 	useDiscount: 1,
// 	useTime: 82
// };
// mapInfo = res.data.order.path;

function initInfo(data) {
	//获取时间
	var atime = data.beginTime;
	var aMonth = new Date(atime).getMonth() + 1;
	var aDate = new Date(atime).getDate();
	var aHour = new Date(atime).getHours();
	var aMin = new Date(atime).getMinutes();
	if(aMin < 10) {
		aMin = '0' +aMin;
	}
	$('.logotime_date').html(aMonth + '/' + aDate);
	$('.logotime_hour').html(aHour + ':' + aMin);

	//渲染分享头像和姓名
	var imgUrl = data.avatarImg;
	var realname =  data.realName || '';	
	if(imgUrl && imgUrl.indexOf('null') === -1) {
		$('.usericon').css({'backgroundImage': 'url(' + imgUrl + ')'});
	}
	else {
		$('.usericon').css({'backgroundImage': 'url(img/defaulticon.png)'});
	}
	$('.username').html(realname);

	//渲染分享信息
	var meter = +data.distance || 0;
	var lengthUnit = 'ft';
	if (meter >= 5280) {
		meter = (meter / 5280).toFixed(2);
		lengthUnit = 'mi';
	}

	var useTime = Math.ceil(data.useTime / 60);
	if(useTime < 1 && useTime > 0){
		useTime = 1;
	}

	var calorie = +data.calorie || 0;
	if (calorie) {
		calorie = Math.ceil(calorie / 10) / 100;
	}

	var carbon = +data.carbon || 0;

	$('#distance').html(meter);
	$('#lengthUnit').html(lengthUnit);
	$('#duration').html(useTime);
	$('#calories').html(calorie);
	$('#carbon').html(carbon);
}

function initMap() {
	// google.maps.event.addDomListener(window, 'load', drawMap);
	setTimeout(drawMap, 2000);
}

function drawMap() {
	if (mapInfo) {
		var pathArr = mapInfo.slice(0, -1).split(';').join(',').split(',');
		var lngMax = +pathArr[0], lngMin = +pathArr[0],
			latMax = +pathArr[1], latMin = +pathArr[1];

		for (var i = 0, len = pathArr.length; i < len; i += 2) {
			if (lngMax < +pathArr[i]) {
				lngMax = +pathArr[i];
			}
			if (latMax < +pathArr[i + 1]) {
				latMax = +pathArr[i+1];
			}
			if (lngMin > +pathArr[i]) {
				lngMin = +pathArr[i];
			}
			if (latMin > +pathArr[i + 1]) {
				latMin = +pathArr[i+1]
			}
			ridePathArr.push(new google.maps.LatLng(+pathArr[i + 1], +pathArr[i]));
		}

		var mapProp = {
			center: new google.maps.LatLng((latMax + latMin) / 2, (lngMax + lngMin) / 2),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		gmap = new google.maps.Map(document.getElementById("map"), mapProp);

		if(ridePathArr.length === 1) {
		    var start = new google.maps.Marker({
		  		position: ridePathArr[0],
		  	});
			start.setMap(gmap);		
		}
		else {
			var startIconUrl = './img/start1.png';
			var start = new google.maps.Marker({
		  		position: ridePathArr[0],
		  		icon: startIconUrl
		  	});
			start.setMap(gmap);
			// MarkerImage startIconImg =　MarkerImage.create(startIconUrl, Size.create(20, 34));
			// start.setIcon(startIconImg); 
			markers.push(start);

			var endIconUrl = './img/end1.png';
			var end = new google.maps.Marker({
		  		position: ridePathArr[ridePathArr.length - 1],
		  		icon: endIconUrl
		  	});
			end.setMap(gmap);
			markers.push(end);

			var ridePath = new google.maps.Polyline({
		  		path: ridePathArr,
		  		strokeColor: '#0090FF',
		  		strokeOpacity: 1,
		  		strokeWeight: 5
		  	});
			ridePath.setMap(gmap);
			setVeiwPort();
		} 		
	}
	else {
		var mapProp = {
			center: new google.maps.LatLng(34.0382070000, -118.2558170000),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		gmap = new google.maps.Map(document.getElementById("map"), mapProp);
	}
}

function setVeiwPort() {  
    var bounds = new google.maps.LatLngBounds();  
    //读取标注点的位置坐标，加入LatLngBounds  
    for(var i = 0, len = markers.length; i < len; i++) {  
        bounds.extend(markers[i].getPosition());  
    }  
    //调整map，使其适应LatLngBounds,实现展示最佳视野的功能  
    gmap.fitBounds(bounds);  
};


//订单详情请求
function getData() {
	$.ajax({
		url: getDateUrl,
		type: 'post',
		async: true,
		data: data,
		cache: false,
		dataType: 'text/plain',
		success: function(res) {
			var data = JSON.parse(res);
			if (data.errorMsg.toLowerCase() === 'ok') {
				initInfo(data.data.order);
				mapInfo = data.data.order.path;
				initMap();
			}
			else {
				alert(data.errorMsg);
			}
		}
	});
}

getData();
// initInfo(res.data.order);
// initMap();

function isAdr() {
	var u = navigator.userAgent;
	return (u.indexOf('Android') !== -1 || u.indexOf('Adr') !== -1);
}

function isIOS() {
	var u = navigator.userAgent;
	return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

//立即下载
$('.dl_main_right').click(function () {
	if (isIOS()) {
		location.href = 'https://itunes.apple.com/us/app/bluegogo/id1191760393?l=zh&ls=1&mt=8';
	}
	else if (isAdr()) {
		location.href = 'https://play.google.com/store/apps/details?id=com.beastbike.bluegogog';
	}
});
