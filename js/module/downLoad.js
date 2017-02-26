var downloadObj = Object.create(playObj);
var obj02 = {
	dom:$('.download'),
	slide:function(){

	},
	downmashow:function(){
		fnAddSpeedJs($('.bluemashow').get(0),{'opacity':'100'})
		$('.bluemashow').css('display','block');
	},
	downmahide:function(){
		fnAddSpeedJs($('.bluemashow').get(0),{'opacity':'0'})
		$('.bluemashow').css('display','none')
	},
	download:function(){
		$('.dl_icon1').click(function(){
            location.href ='https://itunes.apple.com/cn/app/xiao-lan-dan-che/id1168657796?mt=8';
        });
        $('.dl_icon2').click(function(){
            location.href ='https://static.bluegogo.com/static/apk/app-bgg-release.apk';
        });
        $('.dl_icon11').click(function() {
			location.href ='https://itunes.apple.com/us/app/bluegogo/id1191760393?l=zh&ls=1&mt=8';
		});
		$('.dl_icon22').click(function() {
			location.href ='https://play.google.com/store/apps/details?id=com.beastbike.bluegogog';
		});
	}

}

$.extend(downloadObj,obj02);
downloadObj.download();
