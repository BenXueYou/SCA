var Car={
//	var urlM = "http://192.168.8.147:8080/sbm2.0/rentCar/findCarInfoBySN";
//"http://116.236.237.244:8080/sbm2.0/rentCar/carlistInfo"
	getCarList:function(url){
		url = url+"rentCar/carlistInfo";
		var dataRes="";
		mui.ajax(url,{
			data:{
				news:null
			},
			type:"GET",
			dataType:"JSON",
			crossDomain:true,
			async: false,    // 使用同步操作
	        timeout:10000, //超时时间：50秒
			success:function(data){
				var dataJson = JSON.parse(data);
				if(dataJson.returnCode == 0 && dataJson.detail.carlist.length > 0){
						dataRes = dataJson.detail.carlist;
				}else{
					mui.alert("未获取到数据");
				}
			},
			error: function(xhr,type,errorThrown) {
		        	mui.alert("未获取到数据");
		    }
		 });
		return dataRes;
	},
	
	getCarDetail:function(url,sn){
		url = url+"rentCar/findCarInfoBySN";
		var result="";
        	mui.ajax(url,{
        		data:{
        			SN:sn
        		},
        		dataType:"JSON",
        		type:"GET",
        		async:false,
        		timeout:10000,
        		success:function(data){
        			result = data;        				
        		},
        		error:function(xhr,type,error){
        			mui.alert("网络信号不稳定，请重试");	
        		}
        	});
        	return result;		
	}
}
