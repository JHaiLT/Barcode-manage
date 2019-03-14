//添加用户

layui.use(['layer','form'], function(){
		  var layer = layui.layer,
		  	   form = layui.form;
		  	 form.on('submit(form_role)', function(data){
				  $.ajax({
					type:"post"
					,url:parent.layui.setter.Test_url+"/BaseManage/User/UserAdd"
					,data:{
						Account:data.field.Account,
						EnCode:data.field.EnCode,
						RealName:data.field.RealName,
						Description:data.field.Description
					}
					 ,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				  }	
					,dataType: "json"
//					,contentType:"application/json"
					,success:function(data){
					if(data.message=="角色名称重复！"){
					layer.msg(data.message, {
								  offset: '45px'
								  ,icon: 5
								 ,time: 2000
							}); 														
							 return false;
					}else{							
							var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
							parent.layer.close(index);
							
						}
					   }
				 });
			    return false;
			  });
			
			
		}); 			