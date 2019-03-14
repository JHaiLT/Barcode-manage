/**
	箱子管理:类型管理  
 */
//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
		      getBoxTypeInfo();
		     
  });	   	
	   	function  getBoxTypeInfo(){
	   		Data=JSON.stringify({Name:''}).replace(/\"/g,"'");
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
	   					rows:limitAllAppoint, 
	   					page:startAllAppoint,
	   					sord:"desc",
	   					sidx:"ID"
	   					},
	   					queryJson:Data
	   					})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_checker/GetPageList"
	   			,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				  }	
	   			,success:function(data,status){	
	   				layui.use(['table','layedit','form','layer','laypage','jquery'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象
					  //展示已知数据
					  laypage.render({
						    elem: 'checker_paged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						     ,curr:startAllAppoint
						    ,jump: function(obj){
						    	startAllAppoint=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: JSON.stringify({
					   				pagination:{
					   					rows:obj.limit,
					   					page:startAllAppoint,
					   					sord:"desc",
					   					sidx:"ID"
					   					},
					   					queryJson:Data
					   					})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_checker/GetPageList"
					   			 ,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }	
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_checker'
									     ,cols: [[
									       {field:'Code', title: '工号',  align:'center'}
									      ,{field:'Name', title: '名称', align:'center'}
									      ,{field:'Class', title:'班别', align:'center',templet:function(d){
								         		var title = '';
								         		if(d.Class==="A"){
								         			title = 'A班'
								         		}else{
								         			title = 'B班'
								         		}
								         		return '<span>'+title+'</span>'									      	
									      }}
									      ,{field:'Status', title:'状态', align:'center',templet:function(d){
								         		var title = '';
								         		if(d.Status==1){
								         			title = '启用'
								         		}else{
								         			title = '停用'
								         		}
								         		return '<span>'+title+'</span>'									      	
									      }}
									      ,{field:'Remark', title:'备注', align:'center'}									      
									      ,{field:'CreateDate', title:'创建时间', align:'center'}
//									      ,{field:'createuserid', title: '创建人ID', align:'center'}
									      ,{field:'CreateUserName', title: '创建人名', align:'center'}								      
//									      ,{field:'modifyuserId', title: '更改人ID', align:'center'}
									      ,{field:'ModifyUserName', title: '更改人名', align:'center'}
										  ,{field:'ModifyDate', title: '更改时间', width:160, align:'center'}					      
									      ,{title:'操作', width:210, align:'center', toolbar: '#box_type'}
									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit//每页默认显示的数量
										,height: 'full-300'										
							  });
						 table.on('tool(checker)', function(obj){
							    var data = obj.data;
							    if(obj.event === 'detail'){
							      layer.msg('ID：'+ data.id + ' 的查看操作');
							    } else if(obj.event === 'del'){
							      layer.confirm('真的删除行么', function(index){
							      	$.ajax({
							      		 type:"post"
							      		,url:layui.setter.Test_url+"/WMSManage/wms_checker/Delete"
							      		,data:JSON.stringify({
							      		   keyValue:data.ID
							      		})
							      		,dataType: "json"
		    							,contentType:"application/json"
		    							 ,beforeSend: function(request) {
											 request.setRequestHeader("token",localStorage.getItem("token"));
										  }	
		    							,success:function(){
		    								layer.msg('删除成功！');
		    								getBoxTypeInfo();
		    							}
							      	});
							      });
							    } else if(obj.event === 'edit'){
							    //layer.alert('编辑行：<br>'+ JSON.stringify(data))
								    layer.open({
										title: '修改检验员',
										maxmin: true,
										type: 2,
										btnAlign: 'c',
										btn: ['提交', '关闭'],
										content: '../src/views/temp/edit_checker.html',
										offset: ['100px', '30%'],
										area: ['500px', '365px'],
										yes:function(index,layero){
										    var body = layer.getChildFrame('body', index);  // 重点0
										    var iframeWin = window[layero.find('iframe')[0]['name']];
											var Editsubmited = iframeWin.document.getElementById("Editsubmited");
  						        			    Editsubmited.click();	
										    layer.msg('修改成功！', {
													 offset: '45px'
													 ,icon: 1
													 ,time: 2000
																 });  						        			    
										},
										btn2: function(){
										      layer.closeAll();
										},
										success: function(layero, index) {
											var body=layer.getChildFrame('body',index);
											body.find(".ID").val(data.ID);
											body.find(".checkerName").val(data.Name);
											body.find(".Remark").val(data.Remark);
											body.find(".Code").val(data.Code);
											body.find('select[name="IsDay"]').val(data.IsDay).attr('selected',true);										   
										},
									});
										}else if(obj.event === 'useOrdisable'){	
											if(data.Status==1){
										      layer.confirm('确定停用？', function(index){
										      	$.ajax({
										      		 type:"post"
										      		,url:layui.setter.Test_url+"/WMSManage/wms_checker/Disabled"
										      		,data:JSON.stringify({
										      		   keyValue:data.ID
										      		})
										      		,dataType: "json"
					    							,contentType:"application/json"
					    							 ,beforeSend: function(request) {
														 request.setRequestHeader("token",localStorage.getItem("token"));
													  }	
					    							,success:function(){
					    								layer.msg('已停用！');
					    								getBoxTypeInfo();
					    							}
										      	});
										      });												
											}else{
										      layer.confirm('确定启用？', function(index){
										      	$.ajax({
										      		 type:"post"
										      		,url:layui.setter.Test_url+"/WMSManage/wms_checker/Enable"
										      		,data:JSON.stringify({
										      		   keyValue:data.ID
										      		})
										      		,dataType: "json"
					    							,contentType:"application/json"
					    							 ,beforeSend: function(request) {
														 request.setRequestHeader("token",localStorage.getItem("token"));
													  }	
					    							,success:function(){
					    								layer.msg('已启用！');
					    								getBoxTypeInfo();
					    							}
										      	});
										      });												
											}
										}
						 			});
					   		}
					    }) 
			          }
				   });
				});
	   		}
	  });
};



$('#add_checker').click(function (){
			layer.open({
				type: 2,
				title: '添加检验员',
				content: '../src/views/temp/add_checker.html',
				btnAlign: 'c',
				offset: ['100px', '30%'],
				area: ['500px', '360px'],
				maxmin: true,
				btn: ['提交', '关闭'],
				yes:function(index,layero){
				       var iframeWin = window[layero.find('iframe')[0]['name']];
				       //console.log(body.html()) //得到iframe页的body内容		   
        	   		   var submited = iframeWin.document.getElementById("submited");        			   
     			        submited.click();
     			        layer.msg('添加成功！', {
								    offset: '45px'
								    ,icon: 1
								    ,time: 2000
						 });   			           			   
				},
				btn2: function(){
				      layer.closeAll();
				},
			});
     });
     

//查询

$("#checker_Serch").click(function() {
	var data1 = $("#checker_name").val(),
		Data=JSON.stringify({Name:data1}).replace(/\"/g,"'");
		$.ajax({
			type: "post",
			async: false,
			data:JSON.stringify( {
				rows: limitAllAppoint,
				page: startAllAppoint,
				sord: "desc",
		     	sidx: "ID",
				queryJson: Data
			}),
			beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				 },
			dataType: "json",
			contentType:"application/json",
			url:layui.setter.Test_url+"/WMSManage/wms_checker/GetPageList",
			success: function(data, status) {
				layui.use(['table', 'layedit', 'form', 'layer', 'laypage'], function() {
					var table = layui.table,
						form = layui.form,
						laypage = layui.laypage,
						layer = layui.layer; //获取当前窗口的layer对象
					//展示已知数据
					laypage.render({
						elem: 'checker_paged',
						count: data.records ,
						layout: ['count', 'prev', 'page', 'next', 'skip'],
						limit: 8,
						jump: function(obj) {
							firstIndex = obj.curr;
							console.log(obj.curr);
							$.ajax({
								type: "post",
								async: false,
								data: JSON.stringify( {
									rows: limitAllAppoint,
									page: startAllAppoint,
									sord: "desc",
							     	sidx: "ID",
									queryJson: Data
								}),
								dataType: "json",
								contentType:"application/json",
								beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								 },
								url:layui.setter.Test_url+"/WMSManage/wms_checker/GetPageList",
								success: function(data, status) {
					   				table.render({
									    elem: '#LAY_table_checker'
									     ,cols: [[
									       {field:'Code', title: '工号',  align:'center'}
									      ,{field:'Name', title: '名称', align:'center'}
									      ,{field:'Class', title:'班别', align:'center',templet:function(d){
								         		var title = '';
								         		if(d.Class==="A"){
								         			title = 'A班'
								         		}else{
								         			title = 'B班'
								         		}
								         		return '<span>'+title+'</span>'									      	
									      }}
  										 ,{field:'Status', title:'状态', align:'center',templet:function(d){
								         		var title = '';
								         		if(d.Status==1){
								         			title = '启用'
								         		}else{
								         			title = '停用'
								         		}
								         		return '<span>'+title+'</span>'									      	
									      }}									      
									      ,{field:'Remark', title:'备注', align:'center'}									      
									      ,{field:'CreateDate', title:'创建时间', align:'center'}
//									      ,{field:'createuserid', title: '创建人ID', align:'center'}
									      ,{field:'CreateUserName', title: '创建人名', align:'center'}								      
//									      ,{field:'modifyuserId', title: '更改人ID', align:'center'}
									      ,{field:'ModifyUserName', title: '更改人名', align:'center'}
										  ,{field:'ModifyDate', title: '更改时间', width:160, align:'center'}					      
									      ,{title:'操作', width:210, align:'center', toolbar: '#box_type'}
									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit//每页默认显示的数量
										,height: 'full-300'										
							  });
								}
							})
						}
					});
				});
			}
		});
});