//单个添加货架

		layui.use(['layer','form','table'], function(){
		  var layer = layui.layer,
		  	   form = layui.form,
		  	   table=layui.table,
		  	   $ = layui.jquery;
		  	   getBoards();
		   function getBoards(){
					$.ajax({
						url :parent.layui.setter.Test_url+"/WMSManage/wms_product/GetDropDownBox",
						type : 'post',
						dataType: "json",
						beforeSend: function(request) {
							 request.setRequestHeader("token",localStorage.getItem("token"));
							 },
						success: function(result){
							$.each(result.resultdata, function (index, item) {
										var optionStr = "";
										optionStr += "<option value='" + item.ID + "'>"
												+ item.Name + "</option>";
										 //alert(optionStr);debugger
										 $("#ProductionNameS").append(optionStr);
										 layui.form.render('select');
									});
						},
						error : function(data) {
							alert('查找板块报错');
						}
					});
				};
		  	   form.on('submit(form_shelf)', function(data){
		  	   	if(data.field.ProductionNameS==0){
		  	   		proData=null;
		  	   	}else{
		  	   		proData=data.field.ProductionNameS;
		  	   	}
					  $.ajax({
						type:"post"
						,url:parent.layui.setter.Test_url+"/WMSManage/wms_position/NewPosition"
						,data:JSON.stringify({
							FatherID:data.field.FatherID,
							ProductionID:proData,
							Sequence:Number(data.field.Quantity)
						})
						,dataType: "json"
						,contentType:"application/json"
			   			,beforeSend: function(request) {
					 		request.setRequestHeader("token",localStorage.getItem("token"));
				 	 	}							
						,success:function(data){
							if(data.type==3){
								layer.msg(data.message, {
											  offset: '45px'
											  ,icon: 5
											 ,time: 2000
										}); 														
										 return false;
							}else{									
								layer.msg(data.message, {
											  offset: '45px'
											  ,icon: 1
											 ,time: 2000
										});										
							}	    
						  }
					 });
				    return false;		  	   			
		  });
			  
}); 