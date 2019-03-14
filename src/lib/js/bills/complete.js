/**
	单据管理:完工单  
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
	   					sidx:"createdate"
	   					},
	   					queryJson:{}})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_completion/GetPageListJsonToken"
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
						 form.on('select(boardFilter)', function(data){
						  console.log(data);
						}); 					
					  function getBoards(){
								$.ajax({
									url :layui.setter.Test_url+"/WMSManage/wms_product/GetDropDownBox",
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
													$("#complete_boards").append(optionStr);
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
						    elem: 'Completepaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
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
					   					sidx:"id",
					   					sidx:"createdate"
					   					},
					   					queryJson:{}})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_completion/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_complete'
									     ,cols: [[
//									       {field:'id', title: '完工单ID', sort: true, align:'center'}
									       {type: 'numbers', title:"序号",align:'center'}
									      ,{field:'completionno', title: '完工单号',width:160, align:'center'}
//									      ,{field:'completionwarehouseid', title: '完工入库单ID', align:'center'}
//									      ,{field:'productionid', title:'产品ID',align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'acount', title: '数量',align:'center'}
//									      ,{field:'unitid', title: '数量单位',align:'center'}
									      ,{field:'batch', title: '批号', align:'center'}
//									      ,{field:'vision', title: '版本', align:'center'}
//									      ,{field:'worksequence', title: '工序', align:'center'}
									      ,{field:'boxbarcode', title: '箱号',width:160, align:'center'}
									      ,{field:'stackbarcode', title: '栈板号',width:140, align:'center'}
									      ,{field:'workplanno', title: '生产单号', width:140, align:'center'}
									      ,{field:'completionwrarehouseno', title: '完工入库单号',width:160, align:'center'}
									      ,{field:'status', title: '状态', align:'center',width:140,templet: '#Completestatus',style:'background-color: #eee;'}
									      ,{field:'createdate', title: '创建时间',width:160, align:'center'}									      
//									      ,{field:'completetime', title: '完成时间', align:'center'}
//									      ,{field:'createuserid', title: '创建者ID', align:'center'}
//									      ,{field:'createusername', title: '创建者名称', align:'center'}
//									      ,{field:'modifydate', title: '修改时间', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}
//									      ,{field:'modifyusername', title: '修改者名字', align:'center'}
						    
									    ]]
									    ,id:'testReload'
									    ,data: data.resultdata.rows
									    ,limit:obj.limit
										,even:true
										,height: 'full-300'										
							  });
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
    elem: '#co_date'
  });
  laydate.render({
    elem: '#co_date1'
  });
});

$("#bills_complete_query").click(function(){
	var  data1 =$("#co_date").val(),
 	  	 data2 =$("#co_date1").val(),
 	  	 data3=$("#completionno").val(),
 	  	 data4=$("#complete_boards").val();
 	 	 Data=JSON.stringify({CompletionNO:data3,ProductionID:data4,StartTime:data1,EndTime:data2}).replace(/\"/g,"'");
 	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
					   	rows:limitAllAppoint,
					   	page:startAllAppoint,
					   	sord:"desc",
					   	sidx:"id",
					   	sidx:"CreateDate"
	   					},
	   					queryJson:Data
	   			})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_completion/GetPageListJsonToken"
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
						     elem: 'Completepaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: JSON.stringify({pagination:{
					   				rows:obj.limit,
					   				page:firstIndex,
					   				sord:"desc",
					   				sidx:"createdate"
					   				},queryJson:Data})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_completion/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }					   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_complete'
									     ,cols: [[
//									       {field:'id', title: '完工单ID', sort: true, align:'center'}	
									       {type: 'numbers', title:"序号",align:'center'}
									      ,{field:'completionno', title: '完工单号',width:160, align:'center'}
//									      ,{field:'completionwarehouseid', title: '完工入库单ID', align:'center'}
//									      ,{field:'productionid', title:'产品ID',align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'acount', title: '数量',align:'center'}
//									      ,{field:'unitid', title: '数量单位',align:'center'}
									      ,{field:'batch', title: '批号', align:'center'}
//									      ,{field:'vision', title: '版本', align:'center'}
//									      ,{field:'worksequence', title: '工序', align:'center'}
									      ,{field:'boxbarcode', title: '箱号',width:160, align:'center'}
									      ,{field:'stackbarcode', title: '栈板号',width:140, align:'center'}
									      ,{field:'workplanno', title: '生产单号', width:140, align:'center'}
									      ,{field:'completionwrarehouseno', title: '完工入库单号',width:160, align:'center'}
									      ,{field:'status', title: '状态', align:'center',width:140,templet: '#Completestatus',style:'background-color: #eee;'}
									      ,{field:'createdate', title: '创建时间',width:160, align:'center'}									      
//									      ,{field:'completetime', title: '完成时间', align:'center'}
//									      ,{field:'createuserid', title: '创建者ID', align:'center'}
//									      ,{field:'createusername', title: '创建者名称', align:'center'}
//									      ,{field:'modifydate', title: '修改时间', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}
//									      ,{field:'modifyusername', title: '修改者名字', align:'center'}
									    ]]
									    ,id:'testReload'
									    ,data: data.resultdata.rows
										,limit: obj.limit //每页默认显示的数量
										,even:true
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