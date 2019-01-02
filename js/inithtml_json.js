
	//根据拿到的对象数组初始化html  （勿动）
	function initHtml(arr,callback){
		//console.log('执行initHtml');
	  	var ahtml="";
	  	for(let i in arr){
		  	let item=arr[i];
          	ahtml+='<div class="InlineBlock ListLi" data-name="'+item['chiTitle']+'">'+
						'<div class="listLiHeader">'+
							'<div class="InlineBlock listLiHeaderLeft">'+
								'<i class="icon '+item['icon']+'"></i>'+
								'<b class="ChiTitle">'+item['chiTitle']+'</b>'+
							'</div>';
			let a1h=		'<div class="InlineBlock iconTalkBox">'+
								'<i class="iconTalk pointer"></i>'+
							'</div>';
			ahtml+=item['isAnormalNumber']==true?a1h:'';	//talkIcon是否显示
			ahtml+=			'<div class="InlineBlock iconMoreBox">'+
								'<i class="iconMore pointer"></i>'+
							'</div>'+
						'</div>';//listLiHeader   end
			var subArr=item['groupsLists'];
			for(let j in subArr){
				let	subItem=subArr[j];	
				var contenH='';
				contenH+= '<p class="EngTitle"> <span class="icon iconList"></span>'+subItem['subTitle'] +'</p>'+
						'<div class="listLiContent" data-contentId="'+j+'">'+	
							'<div class="InlineBlock liContentLeftBox" >'+
								'<div class="Content">'+
									'<p class="clockP">'+
										'<i class="iconClock"></i>'+
										'<span class="timeSpan">'+subItem['lastRecordTime']+'</span>'+
									'</p>'+
									'<p class="mountP">'+
										'<span>最新数据量：</span>'+
										'<b class="MonitorMount">'+subItem['lastRecordMount']+'</b>'+
										'<span class="classifier">条</span>'+
									'</p>'+
									'<p class="AddressP">'+
										'<span>地址：</span>'+
										'<b class="MonitorAddress">'+subItem['lastRecordUrl']+'</b>'+
									'</p>'+
								'</div>'+
							'</div>'+//.liContentLeftBox end
							'<div class="InlineBlock liContentCenter">'+
								'<div class="CenterTopDiv">'+
									'<p class="Center CenterTop">'+
										'<span>监控数量：</span>'+
										'<b class="Mouneter">'+subItem['monitorMount']+'</b>'+
									'</p>'+
								'</div>';
					let a2h=subItem['abnormalNumber']!=0?'<div class="iconPoint warn"></div>':'<div class="iconPoint"></div>';
					contenH+=a2h;
					contenH+=	'<div class="CenterBottomDiv">'+
									'<p class="Center CenterTop">'+
										'<span>异常表数：</span>'+
										'<b class="Mouneter">'+subItem['abnormalNumber']+'</b>'+
									'</p>'+
								'</div>'+
							'</div>';//.liContentCenter end
					let a3h=subItem['abnormalNumber']!=0?'<div class="InlineBlock liContentRightBox warn">':'<div class="InlineBlock liContentRightBox">';
					contenH+=a3h;	
					contenH+=	'<div class="Content">'+
									'<p class="clockP">'+
										'<i class="iconClock"></i>'+
										'<span class="timeSpan">'+subItem['persentRecordTime']+'</span>'+
									'</p>'+
									'<p class="mountP">'+
										'<span>最新数据量：</span>'+
										'<b class="MonitorMount">'+subItem['persentRecordMount']+'</b>'+
										'<span class="classifier">条</span>'+
									'</p>'+
									'<p class="AddressP">'+
										'<span>地址：</span>'+
										'<b class="MonitorAddress">'+subItem['persentRecordUrl']+'</b>'+
									'</p>'+
								'</div>'+
							'</div>'+//.liContentRightBox end*
						'</div>';//.listLiContent end
					//console.log(contenH);
			    ahtml=ahtml+contenH;
			}
			ahtml+='</div>';// ListLi end
		}
		$('#listBox').html(ahtml);
         //如果回调参数是一个方法，就执行方法
		if(Object.prototype.toString.call(callback) ==='[object Function]'){
			callback();
		}
		
	}

	//window resize 当页面屏幕变化时 重置瀑布流

	var currentWidth = 1043; //resize后的总宽度
	var col=2;
	$(window).resize(function () {
		initBlock()
	});
	//初始化瀑布流
	function initBlock(){
		var winWidth = $(window).width();
		//console.log('winWidth：'+winWidth);
		var conWidth;
		if (winWidth > 2500) {
			conWidth=winWidth-237-16*4;
			//conWidth = 2180;
			col = 4
		}else if (winWidth > 1884 && winWidth<2499) {
			conWidth=winWidth-237-16*3;
			//conWidth = 1642;
			col = 3;
		} else {
			conWidth=winWidth-237-16*2;
			if(conWidth<1043){
				conWidth = 1043;
			}
			col = 2
		}
        //console.log('conWidth:'+conWidth+',col:'+col);
		if (conWidth != currentWidth) {
			currentWidth = conWidth;
			//console.log(conWidth);
			$('#listBox').width(conWidth);
			$('#listBox').BlocksIt({
				numOfCol: col,
				offsetX: -7,
				offsetY: 8
			});
		}
		changeBack()
	}

	//根据宽度大小换每列中间箭头的背景
	function changeBack(){
		var centerWidth=$('.liContentCenter').width();
		var iconPointWidth=parseInt(centerWidth*0.75);
		if(centerWidth>222){
          	$('.iconPoint').css({
			  	"width":iconPointWidth+"px",
			 	"background": "url(./img/jt_2.png) no-repeat",
				"background-size":"100% 100%"
				}
			);
			$('.iconPoint.warn').css({
				"width":iconPointWidth+"px",
			   "background": "url(./img/jt_warn_2.png) no-repeat",
			  "background-size":"100% 100%"
			  }
		  );
		}else{
			$('.iconPoint').css({
				"width":"116px",
				"background": "url(./img/jt.png) no-repeat",
				"background-size":"100% 100%"
				}
			);
			$('.iconPoint.warn').css({
				"width":"116px",
				"background": "url(./img/jt_warn.png) no-repeat",
				"background-size":"100% 100%"
				}
			);
		}

	}
	//定义数据源
	var obj={
		"monitorData":[
			{
				"type":"Trash",
				"icon":"iconTrash",
				"isAnormalNumber":false,//该模块是否有异常表数不为0的
				"chiTitle":" 固体废物",
				"groupsLists":[
					{
						"subTitle":"TSOILD.TRA",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"EREDETAIL",
						"isWarn":true,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"TSOILD.TRA",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Zhyw",
				"icon":"iconZhyw",
				"isAnormalNumber":true,//该模块是否 含有异常的表数，即groupsLists数组中任意一个异常，此处都为true
				"chiTitle":" 综合业务",
				"groupsLists":[
					{
						"subTitle":"D.TRANF",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":1,//有异常
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}	
				]
			},
			{
				"type":"Fshj",
				"icon":"iconFshj",
				"isAnormalNumber":true,
				"chiTitle":"辐射环境",
				"groupsLists":[
					{
						"subTitle":"SOILD.TRA",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":1,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"RANFERED",
						"isWarn":true,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Jsxm",
				"icon":"iconJsxm",
				"isAnormalNumber":false,
				"chiTitle":" 建设项目",
				"groupsLists":[
					{
						"subTitle":"TSOILD.TRANFEREDETAIL",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"TSOILD.TRANFEREDETAIL",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"TSOILD.TRANFEREDETAIL",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Hjyj",
				"icon":"iconHjyj",
				"isAnormalNumber":false,
				"chiTitle":"环境应急",
				"groupsLists":[
					{
						"subTitle":"ZHYWPT.SURVEY_QUESTION",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"ZHYWPT.SURVEY_QUESTION",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"ZHYWPT.SURVEY_QUESTION",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Pwxk",
				"icon":"iconPwxk",
				"isAnormalNumber":false,
				"chiTitle":"排污许可",
				"groupsLists":[
					{
						"subTitle":"ZHYWPT.SURVEY_QUESTION",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Pwsb",
				"icon":"iconPwsb",
				"isAnormalNumber":false,
				"chiTitle":"排污申报",
				"groupsLists":[
					{
						"subTitle":"Sewage declaration",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"Sewage declaration2",
						"isWarn":true,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"101.202.14.108",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Xfts",
				"icon":"iconXfts",
				"isAnormalNumber":false,
				"chiTitle":"信访投诉",
				"groupsLists":[
					{
						"subTitle":"Complaint complaint",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Shhj",
				"icon":"iconShhj",
				"isAnormalNumber":false,
				"chiTitle":"上海环境",
				"groupsLists":[
					{
						"subTitle":"ZHYWPT.SURVEY_QUESTION",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"ZHYWPT.SURVEY_QUESTION",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Zxjc",
				"icon":"iconZxjc",
				"isAnormalNumber":false,
				"chiTitle":"在线监测",
				"groupsLists":[
					{
						"subTitle":"Online Monitoring",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"ZHYWPT.SURVEY_QUESTION",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Xzxk",
				"icon":"iconXzxk",
				"isAnormalNumber":false,
				"chiTitle":"行政许可",
				"groupsLists":[
					{
						"subTitle":"Online Monitoring",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					},
					{
						"subTitle":"ZHYWPT.SURVEY_QUESTION",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			},
			{
				"type":"Ydzf",
				"icon":"iconYdzf",
				"isAnormalNumber":false,
				"chiTitle":"移动执法",
				"groupsLists":[
					{
						"subTitle":"ZHYWPT.SURVEY_QUESTION",
						"isWarn":false,
						"lastRecordTime":"2018.12.20",
						"lastRecordMount":2000,
						"lastRecordUrl":"10.202.4.34",
						"monitorMount":59,
						"abnormalNumber":0,
						"persentRecordTime":"2018.12.20",
						"persentRecordMount":2000,
						"persentRecordUrl":"10.202.4.34"
					}
				]
			}
		]
	}
	
	