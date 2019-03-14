
		layui.use(['layer','form','table'], function(){
		  var layer = layui.layer,
		  	   form = layui.form,
		  	   table=layui.table;		  	   
  		form.on('select(IsDay)', function(data){ 					
  				IsDay=data.value;					 
		   		$.ajax({
		   			type:"post"
		   			,async:false
	    			,dataType: "json"
	    			,contentType:"application/json"
	    			,data:JSON.stringify({
	    				Class:IsDay
	    			})
		   			,url:parent.CherUrl+"/WMSManage/wms_checker/GetDropDownByClass"
		   			,beforeSend: function(request) {
						 request.setRequestHeader("token",localStorage.getItem("token"));
					  }	
		   			,success:function(data,status){	
			            	$("#checker").empty();
			            	var optionStre = "";
			            	    optionStre += '<option value="0" >请选择</option>';
			            	$("#checker").append(optionStre);
							$.each(data.resultdata, function (index, item) {
								var optionStr = "";								    
								    optionStr += "<option value='" + item.ID + "'>"
											  + item.Name + "</option>";											   
											   $("#checker").append(optionStr);											   
									        	layui.form.render('select');
										});			            	
			            }
			          })   					
  				});		  	   
		  	   form.on('submit(form_box_type)', function(data){
					  $.ajax({
						type:"post"
						,url:parent.CherUrl+"/WMSManage/wms_edgetrimmer/FormAdd"
						,data:{			
							EdgetrimmerID:data.field.EdgetrimmerID,
							CheckerID:data.field.checker,
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