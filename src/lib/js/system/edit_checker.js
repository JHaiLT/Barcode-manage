//编辑箱子

layui.use(['layer','form','table'], function(){
		  var layer = layui.layer,
		  	   form = layui.form,
		  	   table=layui.table;		 
		  	    layui.form.render('select');
		 form.on('submit(form_box_type)', function(data){   
       			  data2={
							Name:data.field.checkerName,
							ID:data.field.ID,
							Remark:data.field.Remark,
							Class:data.field.IsDay,
							Code:data.field.Code,
						}
				  $.ajax({
					type:"post"
					,url:parent.layui.setter.Test_url+"/WMSManage/wms_checker/Update"
					,data:JSON.stringify(data2)
					,dataType: "json"
					,contentType:"application/json"
					,beforeSend: function(request) {
							 request.setRequestHeader("token",localStorage.getItem("token"));
							 }
					,success:function(){
								var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
								parent.layer.close(index);	
								parent.getBoxTypeInfo();
					           layer.msg('修改成功！');
					   }
				 });
			    return false;
			 });						   		  
		}); 		