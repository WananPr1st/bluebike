//存储各个模块与hash值之间映射关系
var pageHashMap = {
	'Numtest': numberTest,
	'code': codeTest,
	'password':passTest,
	'loginSuccess':loginTest
}
var pageCacheMap = {} //表示页面有没有被初始化成功过
var pre_module = null; //前一个模块
var cur_module = null; //当前模块
function routerControl(hashname, flag, type){
	
	//想让每个模块init方法有且只执行一次
	var module = pageHashMap[hashname];
	//得到当前hash下对应的模块，比如home就得到homeObj
	if(flag) {
		module = formObj;
	}
	if(type == 'list') {
		module = listObj;
	}
	if(typeof pageCacheMap[hashname] === 'undefined') {
		module.enter(); //进入该页面
		module.init(hashname); //执行对应页面的初始化操作
		pageCacheMap[hashname] = true;//对已经初始化过模块进行标记操作
		//对当前模块以及前一个模块 进行有次序的赋值操作
		//location.hash = "#rank"
		//hashname --> home
		pre_module = cur_module; //null homeObj
		cur_module = module; // homeObj rankObj
		if(pre_module) {
			pre_module.leave(); //homeObj.leave()
		}
	}else {
		console.log(hashname, '我已经被初始化过了+222');
		module.enter();
		pre_module = cur_module;
		cur_module = module;
		if(pre_module) {
			pre_module.leave();
		}
	}

	if(flag) {
		module.changeCity(hashname);
	}
	//console.log(pageHashMap[hashname].name);
	//pageHashMap[hashname].init();
}
