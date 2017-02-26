window.onload = function(){
	var router = new Router({
		':yshashName': function(hashname){
			routerControl(hashname)
		}
	});
	router.init('Numtest');	
}