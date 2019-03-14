//编辑箱子

layui.use(['layer','form','table'], function(){
		  var layer = layui.layer,
		  	   form = layui.form,
		  	   table=layui.table;
		  	   getBoards();
		  	   
		  	   
		function getquery(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
					r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
		  	   		  	   
		 form.on('submit(form_box)', function(data){   
         data2={
							BoxType:data.field.BoxType,
							MaxAcount:data.field.MaxAcount,
							ProductID:data.field.ProductID,
						keyValue:data.field.ID}
				  $.ajax({
					type:"post"
					,url:parent.layui.setter.Test_url+"/WMSManage/wms_product_boxtype/SaveFormToken"
					,data:JSON.stringify(data2)
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
						}else{							
								var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
								parent.layer.close(index);	
								parent.getBoxTypeInfo();
					      layer.msg('修改成功！');
						}						
					   }
				 });
			    return false;
			  });
			  
			  function getBoards(){
					$.ajax({
						url :parent.layui.setter.Test_url+"/WMSManage/wms_product/GetDropDownBox",
						type : 'post',
						dataType: "json",
						data:{token:localStorage.getItem("token")},
						success: function(result){
							$.each(result.resultdata, function (index, item) {
										var optionStr = "";
										optionStr += "<option value='" + item.ID + "'>"
												+ item.Name + "</option>";
										 //alert(optionStr);debugger
										 $("#ProductID").append(optionStr);
										 $("#ProductID").val(getquery("productid"));
										 layui.form.render('select');
							});									
						},
						error : function(data) {
							alert('查找板块报错');
						}
					});
				};
				
		}); 		