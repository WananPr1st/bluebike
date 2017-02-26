
var headerObj = {
    dom:$('.head'),
    init:function(){
        this.render();
        this.bindEvent();
        this.controller();
    },
    childs:function(){
        return this.dom.find('li');
    },
    height:function(){
        return this.dom.height();
    },
    render:function(){

    },
    bindEvent:function(){
        var _this = this;
        yshuai.event.addEventListener(window,'scroll',function(){
            var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
             scrollT>0?_this.dom.css({'position':'fixed','top':'0'}):_this.dom.css({'position':'relative'})
             var scrollTrue = scrollT + _this.height();
             // if(scrollTrue >= playObj.ownHeight() && scrollTrue < $('.safety').offset().top){
             //    _this.changeStyle(_this.childs()[1]);
             //    bikeShowObj.leave();
             // }else if(scrollTrue >= $('.safety').offset().top && scrollTrue < downloadObj.ownHeight()){
             // // }else if(scrollTrue >= playObj.ownHeight() && scrollTrue < downloadObj.ownHeight() - $('.price').height() - 250){
             //    _this.changeStyle(_this.childs()[2]);
             //    bikeShowObj.render();
             // // }else if(scrollTrue >= priceObj.ownHeight() - $('.price').height() - 250 && scrollTrue < priceObj.ownHeight()){
             // // }else if(scrollTrue >= $('.price').offset().top && scrollTrue <= $('.price').offset().top + $('.price').height()){
             //    // _this.changeStyle(_this.childs()[3]);
             //    // bikeShowObj.render();
             // }else if(scrollTrue >=downloadObj.ownHeight()){
             //    _this.changeStyle(_this.childs()[3]);
             //    bikeShowObj.leave();
             // }else{
             //    _this.changeStyle(_this.childs()[0]);
             // }
             if(scrollTrue >= playObj.ownHeight() && scrollTrue < bikeShowObj.ownHeight()){
                _this.changeStyle(_this.childs()[1]);
                bikeShowObj.leave();
             }else if(scrollTrue >= bikeShowObj.ownHeight() && scrollTrue < $('.price').offset().top){
             // }else if(scrollTrue >= playObj.ownHeight() && scrollTrue < downloadObj.ownHeight()){
                _this.changeStyle(_this.childs()[2]);
                bikeShowObj.render();
             }else if(scrollTrue >=  $('.price').offset().top && scrollTrue < $('.download').offset().top){
                _this.changeStyle(_this.childs()[3]);
                bikeShowObj.leave();
             }else if(scrollTrue >=$('.download').offset().top){
                _this.changeStyle(_this.childs()[4]);
             }else{
                _this.changeStyle(_this.childs()[0]);
             }
        })
    },
    controller:function(){
        var oLi = this.childs();
        var num = this.height();
        var _this = this;
        for(var i=0;i<oLi.length;i++){
            switch(i){
                case 1:
                oLi[i].onclick = function(){
                    $('html, body').animate({scrollTop: $('.play_bluegogo').offset().top},1000)
                    // playObj.init(num);
                }
                break;
                case 2:
                oLi[i].onclick = function(){
                    // bikeShowObj.init(num);
                    $('html, body').animate({scrollTop: $('.safety').offset().top},1000)
                }
                break;
                case 3:
                oLi[i].onclick = function(){
                    // priceObj.init(num);
                    $('.head span').removeClass('spantext');
                    $('.head-price span').addClass('spantext');
                    $('html, body').animate({scrollTop:$('.price').offset().top},1000)
                }
                break;
                case 4:
                oLi[i].onclick = function(){
                    // downloadObj.init(num);
                    $('html, body').animate({scrollTop: $('.download').offset().top},1000)
                }
                break;
                default:
                oLi[i].onclick = function(){
                    $('html, body').animate({scrollTop:0},1000)
                }
            }

        }
    },
    changeStyle:function(obj){
                    $('.head span').removeClass('spantext');
                    $(obj).find('span').addClass('spantext');
    }

}
headerObj.init()






