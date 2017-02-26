var loginTest = Object.create(numberTest);
var monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var obj04 = {
	dom:$('#loginSuccess'),
	name:'loginSuccess',
	bindEvent:function(){

	},
	init:function(){
		this.bindEvent();
		this.render();

	},
	render:function() {
        if (credit['token']) {
            this.sendPost(credit['token']);
        }

		$('.dl_main_right').click(function() {
            var ua = navigator.userAgent,
                url = null;

            if (ua.indexOf('Android') !== -1 || ua.indexOf('Adr') !== -1) {
                url = 'https://play.google.com/store/apps/details?id=com.beastbike.bluegogog';
            }
            else if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                url = 'https://itunes.apple.com/us/app/bluegogo/id1191760393?l=zh&ls=1&mt=8';
            }

            if (url) {
                location.href = url;
            }
		});
	},
    sendPost: function(token) {
        var data = {data: JSON.stringify(
                        {
                            "con": "US",
                            "data": {},
                            "clientInfo": store(ajson).clientInfo+','+store(ajson).appName+',2',
                            "lang": "en",
                            "version": 1,
                            "uuid": "",
                            "token": token
                        })
                    };
        $.ajax({
            url: baseUrl + '/h5/account/voucherList',
            type: 'post',
            data: data,
            async: false,
            dataType: 'text/plain',
            success: function (res) {
                var voucherList = JSON.parse(res).data.voucherList;
                appendHtml(voucherList);
            },
            error: function() {
                return [];
                console.log('failed');
            }
        })
    }
}

function appendHtml(voucherList) {
    if (voucherList.length) {
        var year = '', month = '', day ='';
        voucherList.forEach(function(item) {
            year = new Date(item.invalidDate*1000).getFullYear();
            month = monthList[new Date(item.invalidDate*1000).getMonth()];
            day = new Date(item.invalidDate*1000).getDate();
            var str = '<div class="lg_tag">' +
                            '<div class="lg_tag_left">' +
                                    '<p class="lg_tit">' + item.title + '</p>' +
                                    '<dl>' +
                                        '<dt class="lg_time">Validuntil ' + month + '&nbsp;' + day + ',' + year + '</dt>' +
                                        '<dd class="lg_desc01">Award new users with discount promo code</dd>' +
                                        '<dd></dd>' +
                                    '</dl>' +
                            '</div>' +
                            '<div class="lg_tag_right">' +
                                '<p>' +
                                    '<span>$</span>' +
                                    '<span class="lg_price">' + item.amount/100 + '</span>' +
                                '</p>' +
                            '</div>' +
                        '</div>';
            $('.lg_main').after(str);
        });
    }
}


$.extend(loginTest,obj04);
// {"errorCode":0,"errorMsg":"OK","tm":1.4779889E9,"data":{"birthday":"","amount":500,"distance":0,"gender":0,"idCard":"","authStatus":0,"mobile":"15221234124","consume":0,"title":"被邀请人邀请券","invalidDate":1480580900383,"depositPaid":0,"token":"cbffb086-4190-46b2-a5dc-186b66c2366b","nick":"","creditLevel":1,"parkNotification":0,"name":"","avatarImg":"","depositStatus":0,"status":0,"desc":"被邀请人邀请券"}}
// <div class="lg_main"><h2>注册成功</h2><p class="lg_youhui">一张<b>'+credit['amount']/100+'</b>元优惠卷已放入您的账户</p><p>赶紧下载应用骑行吧</p></div><div class="lg_tag"><div class="lg_tag_left"><p class="lg_tit">'+credit['title']+'</p><dl><dt>有效期至'+data+'年'+data02+'月'+data03+'日</dt><dd>'+credit['desc']+'</dd><dd>新用户奖励优惠用券</dd></dl></div><div class="lg_tag_right"><p><span class="lg_price">'+credit['amount']/100+'</span><span>元</span></p></div></div>
//下载应用
