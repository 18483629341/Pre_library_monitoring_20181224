$(document).ready(function () {
	//blocksit define
	$(window).load(function () {
		initHtmlByJson();
	});
});
    /**
	 * 相关的所有数据
	 */
	function initHtmlByJson() {
		/*$.getJSON("index.json", "", function(data) {
			//console.log(data);
			var objArr=data.monitorData;
			initHtml(objArr);
		});*/
		var objArr=obj.monitorData;
		initHtml(objArr);

	}