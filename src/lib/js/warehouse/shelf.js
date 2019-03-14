/**
	仓库管理:货架管理  
 */
	var shelfID=0;
    var Code=0;
	var Barcode=0;
    var Text=0;
    var ProductionID=0;
    var SelectState=false;
	layui.use(['tree', 'layer', 'form'], function() {
		var layer = layui.layer,
			$ = layui.jquery,
			form = layui.form;
			getTreeinfo();			
	  function getTreeinfo(){
				$.ajax({
//					url: "./json/tresss.json",
					url:layui.setter.Test_url+"/wms_position/GetPositionTree",
					dataType: "json",
					async: false,
					type: "POST",
					contentType:"application/json",
					 data:JSON.stringify({WarehouseID:"008-成品"}),
			   		 beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				 	 },					
					success: function(data) {
						TreeViewInit ([data.resultdata.PositionTree])
					},
					error: function() {}
				});
		};
//遍历树形结构
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
	
//监听单个增加按钮		
	$('.demoTable .addOne-btn').on('click', function() {
			if(SelectState==false){
				layer.msg('请选择节点！', {
						offset: '45px',
						icon: 5,
						time: 2000
				});				
			}else{		
		     layer.open({
			   type: 2,
			   title: '添加单个库位',
			   content: '../src/views/temp/add_oneShelf.html',
			   shade: false,
			   btnAlign: 'c',
			   offset: ['100px', '30%'],
				area: ['500px', '255px'],
				maxmin: true,
				btn: ['提交', '关闭'],
				yes: function(index, layero) {
				var body = layer.getChildFrame('body', index); // 重点0
				var iframeWin = window[layero.find('iframe')[0]['name']];
        	    var submited = iframeWin.document.getElementById("submited");        			   
     			   submited.click();    			   
 				   setTimeout(function(){ 
						$.ajax({
		//					url: "./json/tresss.json",
							url:layui.setter.Test_url+"/wms_position/GetPositionTree",
							dataType: "json",
							async: false,
							type: "POST",
							contentType:"application/json",
							 data:JSON.stringify({WarehouseID:"008-成品"}),
					   		 beforeSend: function(request) {
							 request.setRequestHeader("token",localStorage.getItem("token"));
						 	 },					
							success: function(data) {
								TreeViewInit ([data.resultdata.PositionTree])
							},
							error: function() {}
						});
					layer.closeAll();
					 }, 1000); 
				},
				btn2: function() {
					layer.closeAll();
				},
				success: function(layero, index) {
				var body = layer.getChildFrame('body', index);
				var iframeWin = window[layero.find('iframe')[0]['name']]
				body.find(".FatherID").val(shelfID);
				},				
			});	
		}
	});
//监听批量增加按钮		
	$('.demoTable .add-btn').on('click', function() {
			if(SelectState==false){
				layer.msg('请选择节点！', {
						offset: '45px',
						icon: 5,
						time: 2000
				});				
			}else{		
		     layer.open({
			   type: 2,
			   title: '批量添加库位',
			   content: '../src/views/temp/add_shelf.html',
			   shade: false,
			   btnAlign: 'c',
			   offset: ['100px', '30%'],
				area: ['500px', '255px'],
				maxmin: true,
				btn: ['提交', '关闭'],
				yes: function(index, layero) {
				var body = layer.getChildFrame('body', index); // 重点0
				var iframeWin = window[layero.find('iframe')[0]['name']];
        	    var submited = iframeWin.document.getElementById("submited");        			   
     			   submited.click();    			        			  
 					 setTimeout(function(){ 
						$.ajax({
		//					url: "./json/tresss.json",
							url:layui.setter.Test_url+"/wms_position/GetPositionTree",
							dataType: "json",
							async: false,
							type: "POST",
							contentType:"application/json",
							 data:JSON.stringify({WarehouseID:"008-成品"}),
					   		 beforeSend: function(request) {
							 request.setRequestHeader("token",localStorage.getItem("token"));
						 	 },					
							success: function(data) {
								TreeViewInit ([data.resultdata.PositionTree])
							},
							error: function() {}
						});
						layer.closeAll();
							   }, 1000); 
				},
				btn2: function() {
					layer.closeAll();
				},
				success: function(layero, index) {
				var body = layer.getChildFrame('body', index);
				var iframeWin = window[layero.find('iframe')[0]['name']]
				body.find(".FatherID").val(shelfID);
				body.find(".WarehouseID").val(1);
				},				
			});	
		}
	});

//监听修改按钮		
	$('.demoTable .edit-btn').on('click', function() {
		if(SelectState==false){
				layer.msg('请选择节点！', {
						offset: '45px',
						icon: 5,
						time: 2000
				});				
			}else{		
		     layer.closeAll();
		     layer.open({
			   type: 2,
			   title: '修改库位',
			   content: '../src/views/temp/edit_shelf.html?value='+ProductionID,
			   shade: false,
			   btnAlign: 'c',
			   offset: ['100px', '30%'],
				area: ['500px', '255px'],
				maxmin: true,
				btn: ['提交', '关闭'],
				yes: function(index, layero) {
				var body = layer.getChildFrame('body', index); // 重点0
				var iframeWin = window[layero.find('iframe')[0]['name']];
        	    var submited = iframeWin.document.getElementById("submited");    
     			    submited.click();	
 					 setTimeout(function(){ 
						$.ajax({
		//					url: "./json/tresss.json",
							url:layui.setter.Test_url+"/wms_position/GetPositionTree",
							dataType: "json",
							async: false,
							type: "POST",
							contentType:"application/json",
							 data:JSON.stringify({WarehouseID:"008-成品"}),
					   		 beforeSend: function(request) {
							 request.setRequestHeader("token",localStorage.getItem("token"));
						 	 },					
							success: function(data) {
								TreeViewInit ([data.resultdata.PositionTree])
							},
							error: function() {}
						});
						layer.closeAll();
							   }, 1000);    			    
				},
				btn2: function() {
				layer.closeAll();
				},
				success: function(layero, index) {
				var body = layer.getChildFrame('body', index);
				var iframeWin = window[layero.find('iframe')[0]['name']]
				body.find(".ID").val(shelfID);
				body.find(".ProductionNameS").val(ProductionID);
//				body.find(".Barcode").val(Barcode);
				body.find(".Name").val(Text);
				},				
			});	
		}	
	});


//监听删除按钮		
		$('.demoTable .remove-btn').on('click', function() {
			if(SelectState==false){
				layer.msg('请选择节点！', {
						offset: '45px',
						icon: 5,
						time: 2000
				});				
			}else{
			 layer.confirm('真的删除行么', function(index){	
			 	delet(shelfID);
			 });

			}
			
		});
		
//删除节点
		function delet(d){
				$.ajax({
					url:layui.setter.Test_url+"/WMSManage/wms_position/DelPosition",
					dataType: "json",
					async: false,
					type: "POST",
					contentType:"application/json",
					data:JSON.stringify({PositionID:d}),
			   		 beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				 	 },					
					success: function(data) {
						if(data.type==3){
							layer.msg(data.message, {
										offset: '45px'
										,icon: 5
										,time: 2000
								}); 														
							 return false;
						}else{							
							layer.msg('删除成功！', {
										offset: '45px'
										,icon: 1
										,time: 2000
							});
 					 setTimeout(function(){ 
						$.ajax({
		//					url: "./json/tresss.json",
							url:layui.setter.Test_url+"/wms_position/GetPositionTree",
							dataType: "json",
							async: false,
							type: "POST",
							contentType:"application/json",
							 data:JSON.stringify({WarehouseID:"008-成品"}),
					   		 beforeSend: function(request) {
							 request.setRequestHeader("token",localStorage.getItem("token"));
						 	 },					
							success: function(data) {
								TreeViewInit ([data.resultdata.PositionTree])
							},
							error: function() {}
						});
							   }, 1000); 							
						}
					},
					error: function() {}
				});			
			
		};

	});	
	