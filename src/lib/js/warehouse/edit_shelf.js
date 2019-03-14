//修改货架



layui.use(['layer','form','table','tree'], function(){
		  var layer = layui.layer,
		  	   form = layui.form,
		  	   table=layui.table,
		  	   $ = layui.jquery;	
		  	   getBoards();
			function getquery(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
					r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}		  	    	  	    	  	    
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
										 $("#ProductionNameS").val(getquery("value"));
									     layui.form.render('select');
									});
							 		
						},
						error : function(data) {
							alert('查找板块报错');
						}
					});
				};		  	   
		  	   form.on('submit(form_shelf)', function(data){
					  $.ajax({
						type:"post"
						,url:parent.layui.setter.Test_url+"/WMSManage/wms_position/EditPosition"
						,data:JSON.stringify({
							ID:data.field.ID,
							Name:data.field.Name,
							ProductionID:data.field.ProductionNameS,
							Barcode:data.field.Barcode
						})
						,dataType: "json"
						,contentType:"application/json"
			   		,beforeSend: function(request) {
					 		request.setRequestHeader("token",localStorage.getItem("token"));
				 	 	}							
						,success:function(data){
							console.log(data)
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
							 setTimeout(function(){ 
							 	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
								parent.layer.close(index); 
							   }, 1500);							   
							}							
						   }
					 });
				    return false;		  	   			
		  });
  
		function TreeViewInit (d) {
	            // console.log(d)
				$('#treeview').treeview({
		 		    color: "#428bca",
		            expandIcon: 'glyphicon glyphicon-chevron-right',
		            collapseIcon: 'glyphicon glyphicon-chevron-down',
		            nodeIcon: 'glyphicon glyphicon-bookmark',
					showTags: true,
					data: d,
					onNodeSelected: function(event, node) {
						//console.log(event)
						console.log(node.state.selected)				
						shelfID=node.ID;
						Code=node.code;
						Barcode=node.Barcode;
					    Text=node.text;
					    ProductionID=node.ProductionID
						console.log(shelfID)
						SelectState=node.state.selected;
					},
					onNodeUnselected: function(event, node){
						console.log(node.state.selected)
						SelectState=node.state.selected;
					}
				});
				
		};			  
}); 