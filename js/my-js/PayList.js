(function($,owner){
	
	
	
	owner.getPayList = function(userid,callback){
		
		callback = callback || $.noop;
		userid = userid || {};
		var res = "";
		$.ajax({
			type:"get",
			url:"http://47.92.81.38:8080/qianfeng/userManager/loadAccountInfo",
			async:true,
			success:function(data){
				
				if(data.returnCode == 0){
					//返回list
					res = data.detail.recorder;
				}else if(data.returnCode == 1){
					//没有数据
					res = 101;
					
				}else{
					//账号有误
					res = 102;
				}
				
			},
			error:function(xhr){
				//AJAX出错
				res = 104
			}
		});
		return callback(res);
	}
	

	
	
}(mui,window.Pay={}));
