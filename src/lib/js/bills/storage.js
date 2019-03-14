/**
	单据管理:完工入库单  
 */

	//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
		      getcompleteInfo();
		     
   });

	  	   	
	   	function getcompleteInfo(){
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
	   					rows:limitAllAppoint,
	   					page:startAllAppoint,
	   					sord:"desc",
	   					sidx:"starttime"
	   					},
	   					queryJson:{}})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_completion_warehouse/GetPageListV2"
	   			,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
					   }	   			
	   			,success:function(data,status){	
//                  console.log(data.resultdata.total);
	   				layui.use(['table','layedit','form','layer','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象
				  	  	  getBoards();
				  	  	  
  					//产品下拉框				  	  	  
					  function getBoards(){
								$.ajax({
									url :layui.setter.Test_url+"/WMSManage/wms_product/GetDropDownBox",
									type : 'post',
									dataType: "json",
									beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									 },
									success: function(result){
									if(data.type==4){
					   					admin.events.logout();	
					   				}else{}										
										$.each(result.resultdata, function (index, item) {
											var optionStr = "";
											optionStr += "<option value='" + item.ID + "'>"
															+ item.Name + "</option>";
														//alert(optionStr);debugger
													$("#storage_bord").append(optionStr);
												 layui.form.render('select');
											});
											},
									  error : function(data) {
											console.log(data)
										}
								});
							};				  	  	  
				  	  	  
					  //展示已知数据
					  laypage.render({
						    elem: 'storagepaged'
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
					   					sidx:"starttime"
					   					},
					   					queryJson:{}
					   					})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_completion_warehouse/GetPageListV2"
								,beforeSend: function(request) {
													 request.setRequestHeader("token",localStorage.getItem("token"));
													   }					   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_storage'
									     ,cols: [[
//									       {field:'id', title: '完工入库单ID', sort: true, align:'center'}	
									       {field:'completionwarehouseno', title: '完工入库单号',width:160,align:'center'}
//									      ,{field:'productiontypeid', title: '物料类型ID', align:'center'}
//									      ,{field:'productionid', title:'物料ID',align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center',width:120}
									      ,{field:'acount', title: '数量',align:'center',width:90}
//									      ,{field:'batch', title: '批号', align:'center'}
//									      ,{field:'vision', title: '版本', align:'center'}
//									      ,{field:'worksequence', title: '工序', align:'center'}
//									      ,{field:'workplanid', title: '生产单ID', align:'center'}
//									      ,{field:'warehouseid', title: '仓库ID', align:'center'}
//									      ,{field:'status', title: '状态', align:'center'}
									      ,{field:'createdate', title: '创建时间',width:160, align:'center'}
									      ,{field:'toerpstatus', title: '同步状态', align:'center',width:100,templet:function(d){
									         		var title = '';
									         		if(d.toerpstatus == null){
									         			title = '待同步'
									         		}else if(d.toerpstatus == 1){
									         			title = '同步成功'
									         		}else if(d.toerpstatus == 2){
									         			title = '同步失败'
									         		}else if(d.toerpstatus == 0){
									         			title = '待同步'
									         		}
									         		return '<span>'+title+'</span>'
									        }}
									      ,{field:'toerpstatus', title: '同步详情', align:'center',width:100, event:'getDetail',templet:function(d){
			        								 return '<a href="javascript:void(0);" style="color:#337ab7;text-decoration: underline;">查看详情</a>'
			        	  					}}
//									      ,{field:'createusername', title: '创建者名称', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}
//									      ,{field:'modifyusername', title: '修改者名字', align:'center'}
									      ,{field:'workplanno', title: '生产单号',width:140, align:'center'}
									      ,{field:'warehousename', title: '仓库名称', align:'center',width:100}
									      ,{field:'productiontypename', title: '产品类型名称', align:'center',width:120}
									      ,{field:'createdate', title: '创建时间',width:160, align:'center'}									      
									      ,{field:'modifydate', title: '同步时间', align:'center',width:160}
									      ,{field:'starttime', title: '开始时间',width:160, align:'center',sort:true}
									      ,{field:'endtime', title: '结束时间',width:160, align:'center'}
									      ,{title:'操作', width:120, align:'center', toolbar: '#box_type'}									      
									    ]]
									    ,id:'testReload'
									    ,data: data.resultdata.rows
									    ,even:true
										,limit: obj.limit //每页默认显示的数量
										,height: 'full-300'											
							  });
		    //监听单元格事件
		    table.on('tool(user)', function(obj){
    			var data = obj.data;
		    	 if(obj.event === 'getDetail'){
		    	 	console.log(data.toerplog)
						 var index=layer.open({
							        type: 1
							        ,title: false //不显示标题栏
							        ,closeBtn: true
							        ,area: ['600px','400px']
							        ,shade: 0
							        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
									,offset: '20%'	
									,move:true
							        ,moveType: 1 //拖拽模式，0或者1
							        ,content: '<div class="layui-input-block">'+									
												'<textarea class="layui-textarea" style="width:100%;height:380px">'+data.toerplog +'</textarea>'+
											  '</div>'
							        ,success: function(layero){
							          var btn = layero.find('.layui-layer-btn');
							        }
							  });			    				    	
					}else if(obj.event === 'edit'){
						if(data.toerpstatus==2){
							      layer.confirm('确定手工同步吗？', function(index){
							      	url=layui.setter.Test_url+"/WMSManage/erp/BatchGenaratePC?ID="+data.id;
							      	window.open(url);							      	 
//							      	$.ajax({
//							      		 type:"post"
//							      		,url:layui.setter.Test_url+"/WMSManage/erp/BatchGenaratePC?ID="+data.id
//							      		,dataType: "json"
//		    							,contentType:"application/json"
//		    							 ,beforeSend: function(request) {
//											 request.setRequestHeader("token",localStorage.getItem("token"));
//										  }	
//		    							,success:function(data){
//		    								layer.msg(data.message);
//		    								getcompleteInfo();
//		    							}
//							      	});
							      });							
						}else{
							layer.msg('不能同步');
						}
					}
    		})							  
							  
					   		}
					    }) 
			          }
				   });
				});
	   		}
	   	});
};

//日期调用

layui.use('laydate', function(){
  var laydate = layui.laydate;
  
 //日期
  laydate.render({
    elem: '#st_date'
  });
  laydate.render({
    elem: '#st_date1'
  });
});


$("#bills_storage_query").click(function(){
	var  data1 =$("#st_date").val(),
 	  	 data2 =$("#st_date1").val(),
 	  	 data3=$("#completionwarehouseno").val(),
 	  	 data4=$("#storage_bord").val();
 	  	 data5=$("#workplanno").val();
 	  	 data6=$("#ToERPStatus").val();
 	 	 Data=JSON.stringify({CompletionWarehouseNO:data3,ToERPStatus:data6,WorkPlanNO:data5,ProductionID:data4,StartTime:data1,EndTime:data2}).replace(/\"/g,"'");
 	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
					   	rows:limitAllAppoint,
					   	page:startAllAppoint,
					   	sord:"desc",
					   	sidx:"starttime"
	   					},
	   					queryJson:Data
	   			})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_completion_warehouse/GetPageListV2"
				,beforeSend: function(request) {
					request.setRequestHeader("token",localStorage.getItem("token"));
				 }	   			
	   			,success:function(data,status){	
	   				layui.use(['table','layedit','form','layer','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象			  	  	  
					  //展示已知数据
					  laypage.render({
						     elem: 'storagepaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: JSON.stringify({
					   				pagination:{
					   					rows:obj.limit,
					   					page:firstIndex,
					   					sord:"desc",
					   					sidx:"starttime"
					   					},
					   					queryJson:Data
					   			})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_completion_warehouse/GetPageListV2"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }					   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_storage'
									     ,cols: [[
//									       {field:'id', title: '完工入库单ID', sort: true, align:'center'}	
									       {field:'completionwarehouseno', title: '完工入库单号',width:160,align:'center'}
//									      ,{field:'productiontypeid', title: '物料类型ID', align:'center'}
//									      ,{field:'productionid', title:'物料ID',align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center',width:120}
									      ,{field:'acount', title: '数量',align:'center',width:90}
//									      ,{field:'batch', title: '批号', align:'center'}
//									      ,{field:'vision', title: '版本', align:'center'}
//									      ,{field:'worksequence', title: '工序', align:'center'}
//									      ,{field:'workplanid', title: '生产单ID', align:'center'}
//									      ,{field:'warehouseid', title: '仓库ID', align:'center'}
//									      ,{field:'status', title: '状态', align:'center'}
									      ,{field:'toerpstatus', title: '同步状态', align:'center',width:100,templet:function(d){
									         		var title = '';
									         		if(d.toerpstatus == null){
									         			title = '待同步'
									         		}else if(d.toerpstatus == 1){
									         			title = '同步成功'
									         		}else if(d.toerpstatus == 2){
									         			title = '同步失败'
									         		}else if(d.toerpstatus == 0){
									         			title = '待同步'
									         		}
									         		return '<span>'+title+'</span>'
									        }}
									      ,{field:'toerpstatus', title: '同步详情', align:'center',width:100, event:'getDetail',templet:function(d){
			        								 return '<a href="javascript:void(0);" style="color:#337ab7;text-decoration: underline;">查看详情</a>'
			        	  					}}
//									      ,{field:'createusername', title: '创建者名称', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}
//									      ,{field:'modifyusername', title: '修改者名字', align:'center'}
									      ,{field:'workplanno', title: '生产单号',width:140, align:'center'}
									      ,{field:'warehousename', title: '仓库名称', align:'center',width:100}
									      ,{field:'productiontypename', title: '产品类型名称', align:'center',width:120}
									      ,{field:'createdate', title: '创建时间',width:160, align:'center'}									      
									      ,{field:'modifydate', title: '同步时间', align:'center',width:160}
									      ,{field:'starttime', title: '开始时间',width:160, align:'center',sort:true}
									      ,{field:'endtime', title: '结束时间',width:160, align:'center'}
									      ,{title:'操作', width:120, align:'center', toolbar: '#box_type'}									      
									    ]]
									    ,id:'testReload'
									    ,data: data.resultdata.rows
									    ,even:true
										,limit:obj.limit //每页默认显示的数量
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