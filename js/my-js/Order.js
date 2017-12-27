var Order = {
	//微信公众号支付下单
	getOrderFromWechat:function(){
		
		//。。。。
	},
	//微信公众号支付
	getOrderFromWechat:function(){
		
		//。。。。
	},
	//微信公众号取消支付，并退款
	getOrderFromWechat:function(){
		
		//。。。。
	},
	//生成后台订单，并记录充电信息
	setMode:function(url,cpid,openid,money,payMode,out_trade_no,dcChargeMode,callback){
		url=url+"scanCharge/setChargeMode";
		var setModeRes = 0;
		mui.ajax(url,{
			data:{
				deviceId:cpid,
				userId:openid,
				payMode:payMode,
			  	payValue:money,
			  	platform:1,
				out_trade_no:out_trade_no,
				dcChargeMode:dcChargeMode
			},
			dataType: 'json',
	        type: 'get',
	        async:false,
	        timeout: 20000,
			success:function(data){
				if(data.returnCode == 0) {
					setModeRes=true;
					callback(setModeRes);
				}else if(data.returnCode == 1){
					mui.alert("桩没有返回数据，操作超时,退出重新试试！！");
                }else if(data.returnCode == 2){
					mui.alert("桩编号错误，退出重新试试");
                }else if(data.returnCode == 13){
                    mui.alert("充电桩通信故障，退出重新试试");
                 }else {
					mui.alert("充电桩通信故障");
				}
			},
			error:function(xhr,type,error){
				if(xhr.readyState==0 || xhr.readyState == 1){
					mui.alert("网络异常，请求未发送");
				}else if((xhr.readyState==2 || xhr.readyState == 3)){
					mui.alert("请求已发送，等待服务器响应");
				}else{
					mui.alert("服务器响应异常");
				}
			}
		});
//		return setModeRes;
	},
	
	
	//获取设置的充电信息
	/*
	 * 根据用户ID，获取设置的充电信息
	 * 
	 * */
	getMode:function(url,openid,callback){
		var res=false;
		
//		mui.ajax(url,{
//			data:{
//				userid:openid
//			},
//			dataType:"JSON",
//			type:"GET",
//			async:false,
//			crossDomain:true,
//			timeout:10000,
//			success:function(data){
//				
//			},
//			error:function(xhr,type,error){
//				
//			}
//		});
		
		res={"cpid":"14010500000001700","userstate":"0","money":10};
		
		callback(res);
		
		return res;
	}
	
	
	
	
	
}
