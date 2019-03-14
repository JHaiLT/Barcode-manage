//添加角色

layui.use(['layer','form'], function(){
		  var  layer = layui.layer,
		  	   form = layui.form;
		  	   form.on('submit(form_role)', function(data){
			    //layer.msg(JSON.stringify(data.field));
			    if(data.field.EnabledMark==1){
				    	 data1=1
				    }else{
				    	 data1=0
				    };
			  $.ajax({
					type:"post"
					,url:parent.layui.setter.Test_url+"/BaseManage/Role/SaveFormV1"
					,data:{
						EnCode:data.field.EnCode,
						FullName:data.field.FullName,
						Description:data.field.Description,
						EnabledMark:data1,
						ClientType:data.field.ClientType
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
//							 layer.msg();
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