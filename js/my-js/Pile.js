var Pile = {
	//获取所有充电站信息
	getPileList: function(url) {
		url = url + "mapSearchPile/findSMPByList";
		var res = false;
		mui.ajax(url, {
			data: {
				longitude: 121,
				latitude: 31,
			},
			type: "GET",
			async: false,
			timeout: 10000,
			dataType: "json",
			crossDomain: true,
			success: function(data) {
				//mui.alert(JSON.stringify(data));
				if(data.returnCode == 0) {
					var detail = data.detail;
					res = detail.csList;
				} else {
					//获取数据失败
					mui.alert("获取数据失败");
				}
			},
			error: function(jqXHR) {
				mui.alert("网络请求列表发生错误");
			},
		});
		return res;
	},
	//:根据扫码的设备号获取枪的状态
	pileState: function(url, cpid,callback) {
		var mask = mui.createMask();
		url = url + "scanCharge/isChargePile";
		window.res = 0;
		mui.ajax(url, {
			data: {
				deviceId: cpid
			},
			dataType: "JSON",
			type: "GET",
			crossDomain: true,
			crossDomain: true,
			async: false, // 使用同步操作
			beforeSend: function() {  
		        plus.nativeUI.showWaiting("加载中...", {});  
		        mask.show();//显示遮罩层  
		    },  
		    complete: function() {  
		        plus.nativeUI.closeWaiting();  
		        mask.close();//关闭遮罩层 
		        
		        callback(window.res);
		    },  
			success: function(data) {
				dataObj = JSON.parse(data);
				console.log(dataObj+"==="+JSON.stringify(dataObj));
				if(dataObj.returnCode == 0) {
					var detail = dataObj.detail;
					if(JSON.stringify(detail) == "{}") {
						mui.alert("该桩不在运营范围");
						return;
					} else {
						window.res = dataObj.detail;
						callback(window.res);
					}
				} else if(dataObj.returnCode == 4) {
					mui.alert("没有插枪");
				} else if(dataObj.returnCode == 5) {
					mui.alert("没有授权");

				} else if(dataObj.returnCode == 2) {
					
					mui.alert(dataObj.message);

				} else if(dataObj.returnCode == 3) {
					mui.alert("该枪正在被使用");
				} else {
					mui.alert("参数错误");
				}
			},
			error: function() {
				mui.alert("网络异常，请稍后再试");
				return window.res;
			}
		});
		
//		window.res = true;
		return window.res;
	},
	//当桩正在被使用，则根据用户id，获取该正在充电的桩的信息(cpid)
	pileMsg: function(url, openid) {
		url = url + "scanCharge/getPileBaseInfo";
		var cpid = false;
		mui.ajax(url, {
			data: {
				userId: openid,
				platform: 1
			},
			dataType: "JSON",
			type: "GET",
			crossDomain: true,
			async: false, // 使用同步操作
			timeout: 10000, //超时时间：50秒
			success: function(data) {
				if(data.returnCode == 0) {
					var detail = data.detail;
					if(JSON.stringify(detail) == "{}") {
						mui.alert("没有获取到数据");
					}
					var cp = detail.cp;
					var obj = cp[0];
					cpid = obj.cpid;
				} else {
					mui.alert("没有找到充电桩");
				}
			},
			error: function(xhr, type, error) {
				mui.alert("网络异常");
			}
		});
		return cpid;
	},

	pileStart: function(url, openid) {
		url = url + "scanCharge/startCharge";
		var result = false;
		//		mui.ajax(url,{
		//			data:{
		//				userId:openid,
		//				platform:1
		//			},
		//			dataType:"JSON",
		//			async:false,
		//			crossDomain:true,
		//			async:false,
		//			timeout:10000,
		//			success:function(data){
		//				if(data.returnCode == 0) {
		//                   window.res  = true;
		//               }else if(data.returnCode == 4){
		//                   mui.alert("充电桩没有插枪！");
		//                  
		//               }else if(data.returnCode == 6){
		//                   mui.alert("充电桩离线，稍后再试！");
		//               }else{
		//                   mui.alert("充电桩启动失败,请重试");
		//              }
		//			},
		//			error:function(xhr,type,error){
		//				mui.alert("网络异常");
		//			}
		//		});

		window.res = true;
		return window.res;
	},

	pileStop: function(urlstr, openid) {
		url = urlstr + "scanCharge/stopCharge";
		var result = false;
		mui.ajax(url, {
			data: {
				userId: openid,
				platform: 1
			},
			dataType: "JSON",
			type: "GET",
			async: false,
			crossDomain: true,
			timeout: 10000,
			success: function(data) {
				if(data.returnCode == 0) {
					result = getSerialNo(urlstr, openid);
				} else {
					mui.alert("充电桩停止失败,请重试");
				}
			},
			error: function(xhr, type, error) {
				mui.alert("网络异常");
			}
		});

		return result;
	},

}

function testself() {
	mui.alert("123300");
}

function getSerialNo(url, openid) {
	url = url + "scanCharge/getSerialNo";
	var result = false;
	mui.ajax(url, {
		data: {
			userId: openid,
			platform: 1
		},
		type: "GET",
		dataType: 'json',
		async: false,
		crossDomain: true,
		timeout: 10000,
		success: function(data) {
			//data就是返回的json数据
			if(data.returnCode == 0) {
				result = data.serialNo;
			} else if(data.returnCode == 1) {
				mui.alert(data.message);
			} else {
				mui.alert("网络延迟，账单请查看充电记录");
			}
		},
		error: function(jqXHR) {
			mui.alert("网络异常，账单以充电记录为准");
		},
	});
	return result;
}