(function($, owner) {

	//初始化四个数组
	var allDataArrs = new Array();
	var rentCarArr = new Array();
	var repayCarArr = new Array();
	var restoreCarArr = new Array();

	//获取所有租赁记录，分为三个数组返回
	owner.getData = function(userid, callback) {

		for(var i = 0; i < 20; i++) {
			allDataArrs.push(i);
			if(0 == i % 3) {
				rentCarArr.push(i);
			} else if(1 == i % 3) {
				repayCarArr.push(i);
			} else {
				restoreCarArr.push(i);
			}
		}
	};

	//根据数组装载list-cell
	owner.getRentCarCell = function(className, cell) {
		var li = document.createElement("li");
		li.className = className;
		li.innerHTML = '<div class="mui-card">' +
			'<div class = "mui-card-header no-box">' +
			'预约编号：<p> 20171221036521 </p>' +
			'</div>' +
			'<div class = "mui-card-content">' +
			'<div class = "mui-card-content-inner " >' +
			'<div class="ch"><span >预约车</span><span class="value" style="font-size:14px">1401070000000017</span ></div>' +
			'<div class = "ch"> <span>取车地址： </span><span>上海市杨浦区长阳路1080号国际设计交流中心</span ></div >' +
			'</div>' +
			'</div>' +
			'<div class = "mui-card-footer">预约时间： 2017 - 12 - 21 15: 05: 32 < /div>' +
			'</div > ';
		return li;
	};
	//根据数组装载全部list-cell
	owner.getCells = function(con, list, type) {
		switch(type) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			default:
				break;
		}
	};
	
	
	function getCellsToType(list){
		for(var i = 0; i < list.length; i++) {
			var li = owner.getRentCarCell(className, list[i]);
			con.appendChild(li);
		}
	}

}(mui, window.rent = {}));