
		layui.use(['layer','form','table'], function(){
		  var layer = layui.layer,
		  	   form = layui.form,
		  	   table=layui.table;
		  	   form.on('submit(form_box_type)', function(data){
					  $.ajax({
						type:"post"
						,url:parent.layui.setter.Test_url+"/WMSManage/wms_checker/Add"
						,data:{			
							Code:data.field.Code,
							Name:data.field.checkerName,
							Remark:data.field.Remark,
							Class:data.field.IsDay,
						}
						,dataType: "json"
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
						}else{							
								var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
								parent.layer.close(index);
								parent.getBoxTypeInfo();
							}
						  }												
					 });
				    return false;		  	   			
		  });
			  		
}); 