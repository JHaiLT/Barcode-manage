
		layui.use(['layer','form','table'], function(){
		  var layer = layui.layer,
		  	   form = layui.form,
		  	   table=layui.table;
		  	   getBoards();
		  	   form.on('submit(form_box_type)', function(data){
					  $.ajax({
						type:"post"
						,url:parent.layui.setter.Test_url+"/WMSManage/wms_product_boxtype/SaveFormToken"
						,data:{							
							ProductID:data.field.ProductionName,
							BoxType:data.field.BoxType,
							MaxAcount:data.field.MaxAcount,
							keyValue:null
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
										 $("#ProductionName").append(optionStr);
										 layui.form.render('select');
									});
						},
						error : function(data) {
							alert('查找板块报错');
						}
					});
				};
				
//表单校验

		form.verify({
		  username: function(value, item){ //value：表单的值、item：表单的DOM对象
		    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
		      return '用户名不能有特殊字符';
		    }
		    if(/(^\_)|(\__)|(\_+$)/.test(value)){
		      return '用户名首尾不能出现下划线\'_\'';
		    }
		    if(/^\d+\d+\d$/.test(value)){
		      return '用户名不能全为数字';
		    }
		  }
		  
		  //我们既支持上述函数式的方式，也支持下述数组的形式
		  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
		  ,pass: [
		    /^[\S]{6,12}$/
		    ,'密码必须6到12位，且不能出现空格'
		  ] 
		});  
}); 