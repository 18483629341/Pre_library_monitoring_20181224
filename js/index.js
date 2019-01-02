$(document).ready(function () {
	$(window).load(function () {
		initHtmlByJson(initBlock);
        //initBlock是必须在页面根据数据渲染完成后，再执行的方法
	});
});
    /**
	 * 页面根据数据渲染
	 * callback是渲染完成后，才执行的方法
	 */
	function initHtmlByJson(callback) {
		/*$.getJSON("index.json", "", function(data) {    //此处需要后台引入数据
			//console.log(data);
			var objArr=data.monitorData;
			initHtml(objArr,callback);
		});*/
		//由于上面代码需要服务器支持，静态页面不方便，便写了一个对象代替数据来源
		var objArr=obj.monitorData;
		initHtml(objArr,callback);
       
	}