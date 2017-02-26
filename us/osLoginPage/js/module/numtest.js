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
var flag = false;
var baseUrl = '';
 if (location.hostname.indexOf('test') !== -1) {
    baseUrl = 'https://test-api-us.bluegogo.com';
}
else {
    baseUrl = 'https://api-us.bluegogo.com';
}

var ticket = getQueryString(location.search, 'ticket');
if (!ticket) {
    ticket = '';
}
while (client.length < 5) {
    client += '0';
}
var device = (Math.random() * 10000).toFixed(0);
var deviceId = 'deviceId';
//浏览器名称
var appName = navigator.appName;
var json = {
    clientInfo: client,
    deviceId: device,
    appName: appName
}
var ajson = 'ajson';

$('body').on('touchend', function(e) {
    if (e.target.localName.indexOf('input') == -1) {
        $('input').blur();
    }
})

function getQueryString(str, name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = str.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function store(nameSpace, data) {
    //存取操作
    if (data) {
        sessionStorage.setItem(nameSpace, JSON.stringify(data));
    }
    return (nameSpace && JSON.parse(sessionStorage.getItem(nameSpace))) || null;
}

var inputObj = {
        dom: $('.numtest').get(0),
        test: /^[^\u4e00-\u9fa5]*@(\w)+((\.\w{2,3}){1,3})$/,
        init: function(obj) {
            this.bindEvent(obj);
            this.dom.focus();

        },
        bindEvent: function(obj) {
            var _this = this;
            this.dom.onkeypress = function() {

            }
            this.dom.oninput = function() {
                if (!_this.test.test(this.value)) {
                    $(obj).removeClass('active');
                    _this.addClass();
                    return;
                } else {
                    $(obj).addClass('active');
                }
            }
        },
        presentValue: function() {
            console.log(this.value);
        },
        addClass: function() {

        }
    }
    // 手机号验证
var numberTest = {
    dom: $('#Numtest'),
    name: 'email',
    test: /^[^\u4e00-\u9fa5]*@(\w)+((\.\w{2,3}){1,3})$/,
    init: function() {
        this.bindEvent();
        this.render();
    },
    bindEvent: function() {
        var _this = this;
        inputObj.init('.num_nest');
        //不要传this,this指向改变，下面的enter调用this指向的是nextObj
        //Jq click事件添加方法会向原click方法继续添加新方法，需要提前解绑；
        $('.num_nest').unbind("click").click(function() {
                //将带空格的号码做处理，避免服务器不识别
                var vala = $('.numtest').val().split(' ').join('');
                if (_this.test.test(vala) && !flag) {
                    touchChange(this);
                    flag = true;
                    var da = {
                            data: JSON.stringify({
                                data: {
                                    email: vala
                                },
                                lang: 'en',
                                clientInfo: client + ',' + appName + ',2',
                                token: '',
                                version: 1
                            })
                        }
                        //发送请求
                    var register = _this.sendPost(da);
                    if (!register) {

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
                        store(ajson, json)
                    } else {
                        $('.covered').toggle();
                        //判断是安卓手机还是苹果
                        var u = navigator.userAgent;

                        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                            //安卓手机

                            $('.cover_download').html('Download');

                        } else if (u.indexOf('iPhone') > -1) {
                            //苹果手机

                            $('.cover_download').html('Download');
                            $('.cover_download').click(function() {
                                location.href = 'https://itunes.apple.com/app/id1168657796';
                            })

                        }
                        $('.coverbg').click(function() {
                            $('.covered').hide();
                        })
                        return;
                    }
                } else {
                    $('.numIpt .numtest').val('');
                    $('.numIpt .numtest').addClass('active');
                }


        })
    },
    render: function() {

    },
    sendPost: function(da) {
        var data;
        $.ajax({
            url: baseUrl + '/h5/account/checkMobile',
            type: "post",
            async: false,
            data: da,
            cache: false,
            dataType: 'text/plain',
            success: function(res) {
                data = JSON.parse(res)['data']['registered'];
            },
            complete: function() {
                flag = false;
            }
        })

        return data;
    },
    enter: function() {
        this.dom.show();
    },
    leave: function() {
        this.dom.hide();
    }
}

function touchChange(obj) {
    $(obj).removeClass('active');
    setTimeout(
        function() {
            $(obj).addClass('active')
    }, 1000);
}