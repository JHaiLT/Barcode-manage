//编辑用户

layui.use(['layer','form'], function(){
		  var layer = layui.layer,
		  	   form = layui.form;
		  	   getroles();
//		  console.log(getquery("EnabledMark"));
//		   is_radio(getquery("EnabledMark"));
		   form.render();
		  	   form.on('submit(form_role)', function(data){
			    //layer.msg(JSON.stringify(data.field));
			    if(data.field.EnabledMark==1){
				    	 data1=1
				    }else{
				    	 data1=0
				    };
				  $.ajax({
					type:"post"
					,url:parent.layui.setter.Test_url+"/BaseManage/User/UserUpdate"
					,data:{
						UserId:data.field.UserId,
						EnCode:data.field.EnCode,
						RealName:data.field.RealName,
						RoleId:data.field.RoleId,
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
			
		function is_radio(rValue) {
			var rObj = $('input[name="EnabledMark"')
			for(var i = 0; i < rObj.length; i++) {
				if(rObj[i].value == rValue) {
					$(rObj[i]).prop("checked", true)
				}
			}
			
		}
		function getquery(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
				r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return null;
		}		
			
//获得角色
	 function getroles(){
					$.ajax({
						url :parent.layui.setter.Test_url+"/BaseManage/Role/GetDropDownBox",
						type : 'post',
						dataType: "json",
					 beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				   },
						success: function(result){
							$.each(result, function (index, item) {
										var optionStr = "";
										optionStr += "<option value='" + item.RoleId + "'>"
												+ item.FullName + "</option>";
										 //alert(optionStr);debugger
										 $("#RoleId").append(optionStr);
										 layui.form.render('select');
									});
						},
						error : function(data) {
							alert('查找板块报错');
						}
					});
				};
			
		}); 			