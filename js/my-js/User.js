var User = {

	//	out_trade_no:
	//判断用户当前状态
	UserState: function(url, userid,callback) {
		var mask = mui.createMask();
		url = url + "wechatUserManager/getUserState";
		var result = false;
		mui.ajax(url, {
			data: {
				openId: userid
			},
			dataType: 'json',
			type: 'get',
			async: false, //
			timeout: 10000,
			beforeSend: function() {  
		        plus.nativeUI.showWaiting("加载中...", {});  
		        mask.show();//显示遮罩层  
		    },  
		    complete: function() {  
		        plus.nativeUI.closeWaiting();  
		        mask.close();//关闭遮罩层  
		    },  
			success: function(e) {
				var data = e
				if(data == null) {
					mui.alert("网络故障");
					return;
				}
				if(data.returnCode == 0) {
					result = data.chargeState;
					callback(result);
				} else {
					mui.alert("登录账号异常");
					console.log(JSON.stringify(data));
					result = 99;
				}
			},
			error: function(xhr, type, error) {
				console.log("==="+JSON.stringify(xhr)+"===="+error);
				mui.alert("服务器响应异常" + "没有找到该用户");
				result = 99;
				callback(result);
			}
		});
		
	},
	//改变用户状态，取消用户标记
	UserChange: function(url, userid) {
		url = url + "scanCharge/resetOpenIdState";
		var result = "0";
		mui.ajax(url, {
			data: {
				openId: userid,
				platform: 1
			},
			dataType: "JSON",
			type: "GET",
			corssDomain: true,
			async: false,
			timeout: 10000,
			success: function(data) {
				data = JSON.parse(data);
				if(data.returnCode == 0) {
					var detail = data.detail;
					var info = detail.info;
					var out_trade_no = info[0].tradeNo;
					var money = info[0].payMoney;
					var chargeState = 0;
					var Order = new Object();
					Order.out_trade_no = out_trade_no;
					Order.total = money;
					Order.user_state = chargeState;
					//			         Order.order_state=
					result = Order;

				} else {
					alert("取消订单异常");
					this.chargeState = 1;
				}
			},
			error: function(xhr, type, error) {
				mui.alert("服务器响应失败" + JSON.stringify(xhr) + "===:" + error + "===:" + type);
			}
		});
		return Order;
	},

	getPileChargeData: function(url, userid) {
		url = url + "/scanCharge/getChargeStatus";
		//		window.chargeData = false;
		window.chargeData = new Object();
		chargeData.va = GetRandomNum(230, 120);
		chargeData.vb = GetRandomNum(230, 120);
		chargeData.vc = GetRandomNum(230, 120);
		chargeData.aa = GetRandomNum(5.0, 1.0);
		chargeData.ab = GetRandomNum(5.0, 1.0);
		chargeData.ac = GetRandomNum(5.0, 1.0);
		chargeData.chargeDuration = GetRandomNum(3, 1);
		var quantity = Math.random()*10;
		chargeData.quantity = quantity.toFixed(2);
		var price = Math.random()*2;
		chargeData.price = price.toFixed(2);
		var fee = Math.random()*10;
		chargeData.fee = fee.toFixed(2);
		chargeData.dateTime = getDateString();

//		mui.ajax(url, {
//			data: {
//				userId: userid,
//				platform: 1
//			},
//			type: "GET",
//			dataType: 'json',
//			async: false,
//			timeout: 10000,
//			success: function(data) {
//				var detail = data.detail;
//				var chargeInfo = detail.chargeInfo;
//				if(data.returnCode == 0) {
//					var dataInfo = chargeInfo[0];
//					var DataObj = new Object();
//					DataObj.finish = dataInfo.command;
//					if(dataInfo.voltageB && dataInfo.voltage && dataInfo.voltageA) {
//						//检测到离线
//						mui.confirm("是否退出，强制退出则取消对本次充电的监控，同时可重新扫码开启", "检测到桩离线", ["是", "否"],
//							function(e) {
//								DataObj.on_off = e.index;
//							}, "div");
//					} else {
//						DataObj.on_off = false;
//						//未检测到离线
//						if(DataObj.finish == "finish") {
//							//检测到充电结束
//							DataObj.serialNo = dataInfo.serialNo;
//							location.href = "chargeFinish.html?serialNo=" + serialNo;
//						} else {
//							//检测到充电未结束
//							DataObj.va = dataInfo.voltageA;
//							DataObj.vb = dataInfo.voltageB;
//							DataObj.vc = dataInfo.voltageC;
//							DataObj.aa = dataInfo.currentA;
//							DataObj.ab = dataInfo.currentB;
//							DataObj.ac = dataInfo.currentC;
//							DataObj.chargeDuration = dataInfo.chargeDuration;
//							DataObj.quantity = dataInfo.quantity;
//							DataObj.price = dataInfo.price;
//							DataObj.fee = dataInfo.fee;
//							DataObj.dateTime = getDateString();
//						}
//					}
//					window.chargeData = DataObj;
//
//				} else if(data.returnCode == 1) {
//					mui.alert("数据未更新")
//					return;
//				} else if(data.returnCode == 2) {
//					mui.alert("您登录的账号异常");
//					return;
//				} else if(data.returnCode = 13) {
//					alert("充电桩设备号有误");
//					return;
//				} else {
//					alert("充电桩通信数据异常");
//					return;
//				}
//			},
//			error: function(jqXHR) {
//				alert("网络通信出现异常,未获取到实时数据!");
//			}
//		});

		return window.chargeData;
	},

	userIsLogin: function() {
		plus.storage.setItem('user', 'oR9d21lZxSloF2iQtPHjdRAdy-2o');//本地存储登录用户信息
		var user = plus.storage.getItem('user');//获取本地存储的登录用户信息
		var user = localStorage.getItem('user') || "{}";
		//      user=null;

		if(user != "" && user != null) {
			return user;
		} else {
			//      		mui.alert("您还未登录");
			return false;
		}
	},

	getUserChargeData: function(url, userid, serialNo) {
		//		window.res = false;
		var mydate = new Date();
		window.res=new Object();
		res.cpId = "14010700000000"+parseInt(GetRandomNum(90,60));
		res.chargeStartTime = CurentTime();
		res.chargeTimeSpan = Math.random()*10;
		var chargeQuantity = Math.random()*15;
		res.chargeQuantity = chargeQuantity.toFixed(2);
		var chargeMoney = Math.random()*15;
		res.chargeMoney = chargeMoney.toFixed(2);
		res.transationId = "14010700000000"+mydate.getMilliseconds();
		var totalfee = Math.random()*20;
		res.totalfee = totalfee.toFixed(2);
		res.serviceTip = Math.random()*10;
		var refund = totalfee - chargeMoney;

					if(parseFloat(refund) > 0) {
						res.refund = refund.toFixed(2);
					} else {
						res.refund = 0;
					}
		url = url + "/scanCharge/chargeRecorder";
		mui.ajax(url, {
			data: {
				userid: userid,
				serrialNo: serialNo
			},
			dataType: "JSON",
			type: "GET",
			asyns: false,
			corssDomain: true,
			timeout: 10000,
			success: function(data) {
				if(data.returnCode == 0) {
					var dto = data.dto;
					var dataInfo = dto;
					dataInfo.cpId = dto.cpId;
					dataInfo.chargeStartTime = dto.chargeStartTime;
					dataInfo.chargeTimeSpan = dto.chargeTimeSpan;
					dataInfo.chargeQuantity = dto.chargeQuantity;
					dataInfo.chargeMoney = dto.chargeMoney;
					dataInfo.transationId = dto.transationId;
					dataInfo.totalfee = dto.totalFee;
					dataInfo.serviceTip = dto.serviceTip;
					var chargeMoney = parseFloat(dataInfo.chargeMoney) + parseFloat(dataInfo.serviceTip);
					var refund = parseFloat(dataInfo.totalfee) - chargeMoney;

					if(parseFloat(refund) > 0) {
						dataInfo.refund = refund.toFixed(2);
					} else {
						dataInfo.refund = 0;
					}
					var chargeTimeSpan = dataInfo.chargeTimeSpan;
					if(chargeTimeSpan > 60) {
						var min = chargeTimeSpan / 60;
						var h = 0;
						if(min > 60) {
							min = min % 60;
							h = min / 60;
							h = h.toFixed(0);
						}
						var s = chargeTimeSpan % 60;
						var ts = min + h * 60;
						var t = ts.toFixed(0);
						dataInfo.chargeTimeSpan = t;

					} else {
						var t = chargeTimeSpan / 60;
						t = t.toFixed(0);
						dataInfo.chargeTimeSpan = t;
					}
					window.res = dataInfo;
				} else if(data.returnCode == 1) {
					alert("充电桩超时，订单将会以充电记录的形式出现");
				} else {

				}
			},
			error: function(xhr, type, error) {
				mui.alert("网络通信故障");
			}
		});

		return window.res;
	}

}

function getDateString() {
	var ts = new Date();
	var td = ts.getDate(); //day
	var ty = ts.getFullYear(); //
	var tm = ts.getMonth() + 1;
	var th = ts.getHours();
	var tmin = ts.getMinutes();
	var tsd = ts.getSeconds();
	var dtime = ty + "-" + (tm < 10 ? "0" + tm : tm) + "-" + (td < 10 ? "0" + td : td) + "&nbsp" + (th < 10 ? "0" + th : th) + ":" + (tmin < 10 ? "0" + tmin : tmin) + ":" + (tsd < 10 ? "0" + tsd : tsd);
	return dtime;
}

function CurentTime() {
	var now = new Date();

	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	var day = now.getDate(); //日

	var hh = now.getHours(); //时
	var mm = now.getMinutes() - GetRandomNum(3.0, 1.0); //分

	var clock = year + "-";

	if(month < 10)
		clock += "0";

	clock += month + "-";

	if(day < 10)
		clock += "0";

	clock += day + " ";

	if(hh < 10)
		clock += "0";

	clock += hh + ":";
	if(mm < 10) clock += '0';
	clock += mm;
	return(clock);
}

//随机数
function GetRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return(Min + Math.round(Rand * Range));
}