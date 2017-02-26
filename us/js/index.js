
window.onload = function(){
    // yshuai.event.addEventListener($('.down_btn').get(0),'touchstart',function(e){
    //     e.preventDefault?e.preventDefault():e.returnValue=false;
    //     $('.down_btn').addClass('down_visited');
    //     e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;
    // })
    // yshuai.event.addEventListener($('.down_btn').get(0),'touchend',function(e){
    //     e.preventDefault?e.preventDefault():e.returnValue=false;

    //     location.href ='http://a.app.qq.com/o/simple.jsp?pkgname=com.beastbike.bluegogo';

    //     e.stopPropagation()?e.stopPropagation():e.cancelBubble=true;
    // })

    $('.down_btn').on('click', function () {
        var ua = navigator.userAgent;
        if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        // if (/iPhone/.test(navigator.userAgent)) {
            location.href = 'https://itunes.apple.com/us/app/bluegogo/id1191760393?l=zh&ls=1&mt=8';
        }
        else {
            location.href = 'https://play.google.com/store/apps/details?id=com.beastbike.bluegogog';
        }
    });

    //swiper初始化；

    var swiper = new Swiper('.swiper-container01', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
    var toggleBtn = $('.toggleBtn li');
     var swiper2 = new Swiper('.swiper-container02', {
        paginationClickable: false,
        nextButton: '.leftbtntt',
        prevButton: '.rightbtntt',
        onSlideChangeStart: function(swiper){
            if(swiper.activeIndex){
                // $('.leftbtntt').css({'backgroundImage':'url(../image/rightclick.png)'});
                $('.leftbtntt').css({'backgroundImage':'url(../image/rightclick.png)'}).siblings().css({'backgroundImage':'url(../image/rightclick.png)'});
                // toggleBtn.css({'backgroundImage':'url(../imaage/leftclick.png)'});
                // $('.leftbtntt').show().siblings().hide();
            }else{
                // $('.leftbtntt').css({'backgroundImage':'url(../image/leftclick.png)'});
                $('.rightbtntt').css({'backgroundImage':'url(../image/leftclick.png)'}).siblings().css({'backgroundImage':'url(../image/leftclick.png)'});
                // toggleBtn.css({'backgroundImage':'url(../image/rightclick.png)'});
                // $('.rightbtntt').show().siblings().hide();
            }
        }
    });

     var swiper3 = new Swiper('.swiper-container03', {
        paginationClickable: false,
        nextButton: '.swsBtn02',
        prevButton: '.swsBtn01' ,
        onSlideChangeStart: function(swiper){
            var num = swiper.activeIndex;
            if(num>=3){
                $('.dstext01').addClass('out').removeClass('in');
                $('.dstext02').addClass('in').removeClass('out');
            }else{
                $('.dstext01').addClass('in').removeClass('out');
                $('.dstext02').addClass('out').removeClass('in');

            }
        },
        onTransitionStart:function(swiper){
            var num = swiper.activeIndex;
            if(num==5){
                $('.swsBtn02').addClass('swsBtnDisabled');
            }else if(num==0){
                $('.swsBtn01').addClass('swsBtnDisabled');
            }else{
                $('.swsBtn02').removeClass('swsBtnDisabled');
                $('.swsBtn01').removeClass('swsBtnDisabled')
            }
        }
    });
    // $('.leftbtntt').on('click',function(){


    // })
    // $('.rightbtntt').on('click',function(){



    // })
    //创造iscroll实例
    //

    //菜单下拉
    yshuai.event.addEventListener($('.headMenu').get(0),'touchend',function(e){
        var e  = window.event||e;
        e.preventDefault();

        $('.menuList').toggleClass('active01');



        e.stopPropagation?e.stopPropagation():e.cancelBubble = true;

    })

    // yshuai.event.addEventListener($('body').get(0),'touchstart',function(e){
    //  //e.preventDefault?e.preventDefault():e.returnValue=false;
    //  var e  = window.event||e;
    //  $('.menuList').removeClass('active01')
    //  alert('b');
    //  e.stopPropagation?e.stopPropagation():e.cancelBubble = true;


    // })
    $('body').on('tap',function(){
        $('.menuList').removeClass('active01')
    })
        //遗留问题
        //滚动距离 offetTop
        //自行车适配
        //
        //
        //
//手机菜单按钮
var headHeight = $('.headContain').height()/2-1;
var padHeight  = parseInt($('.slider').css('padding-top'));

var playHeight = $('.slider').get(0).offsetTop-headHeight;
var fanHeight  = $('.bike-info').get(0).offsetTop-headHeight;
var safetyHeight  = $('.safety-phone').get(0).offsetTop-headHeight;
var priceHeight  = $('.price-phone').get(0).offsetTop-headHeight;
var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
yshuai.event.addEventListener($('.menuList').get(0),'touchend',function(e){
    e.preventDefault?e.preventDefault():e.returnValue=false;
        switch(e.target.innerHTML){
            case 'HOME':
                $('html, body').animate({scrollTop:0},1000);
                $('.menuList').removeClass('active01')
            break;
            case 'HOW IT WORKS':
                $('html, body').animate({scrollTop:playHeight},1000);
                $('.menuList').removeClass('active01')
            break;
            case 'MEET THE BIKE':
                $('html, body').animate({scrollTop:fanHeight},1000);
                $('.menuList').removeClass('active01')
            break;
            case 'SAFETY':
                $('html, body').animate({scrollTop:safetyHeight},1000);
                $('.menuList').removeClass('active01')
            break;
            case 'PRICE':
                $('html body').animate({scrollTop:priceHeight},1000);
                $('.menuList').removeClass('active01')
            break;
        };
});

$("#language").on('mouseenter', function (e) {
    $("#language li:last").show();
    $('#language li:first img:last').attr('src', '../image/up1.png');
});

$("#language").on('mouseleave', function (e) {
    $("#language li:last").hide();
    $('#language li:first img:last').attr('src', '../image/down.png');
});

$("#language li:first").on('click', function (e) {
    window.location.href = "https://www.bluegogo.com/us/";
    return false;
});

$("#language li:last").on('click', function (e) {
    window.location.href = "https://www.bluegogo.com/cn/";
    return false;
});

$(".phone_language li").on('touchstart', function (e) {
    $(".bg").css({
        display: 'block',
        height: $(document).height()
    });
    $(".phone_language_modal").slideDown();
    // if does not change dom, do not use display-none, in case of bottom-text-jitter
    $(".phone_language li").css('visibility', 'hidden');
    // $(".phone_language li").hide();
});

$(".bg").on('touchstart', function (e) {
    $(".phone_language_modal").slideUp();
    $(".bg").hide();
    $(".phone_language li").css('visibility', 'visible');
    // $(".phone_language li").show();
})

$(".phone_language_modal li:first").on('touchstart', function (e) {
    $(".phone_language_modal").slideUp();
    $(".bg").hide();
    $(".phone_language li").css('visibility', 'hidden');
    // $(".phone_language li").show();
})

}