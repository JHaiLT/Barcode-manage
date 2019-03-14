/**
	打印管理:打印记录  
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
	   					sidx:"ModifyDate"
	   					},
	   					queryJson:{}})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_printLxx/GetPagePrintLogList"
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
				  	  	  
					  //展示已知数据
					  laypage.render({
						    elem: 'stamppaged'
						    ,count:data.records //数据总数
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
					   					sidx:"ModifyDate"
					   					},
					   					queryJson:{}})
				    			,dataType: "json"
				    			,contentType:"application/json"
				    			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }	
					   			,url:layui.setter.Test_url+"/WMSManage/wms_printLxx/GetPagePrintLogList"
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_stamp'
									     ,cols: [[
//									       {field:'ID', title: '序号', sort: true, align:'center'}	
									       {field:'ObjectType', title: '条码类型', align:'center',templet: function(d){
									        	var title = '未存档';
						        				if(d.ObjectType == "box"){
						        					title = '箱子条码'
						        				}else if(d.ObjectType == "stack"){
						        					title = '栈板条码'
						        				}else if(d.ObjectType == "stock"){
						        					title = '库位条码'
						        				}
						        				return '<span>'+title+'</span>'
						      				}}
									      ,{field:'StackBarcode', title: '栈板号',width:140, align:'center'}
									      ,{field:'BoxBarcode', title: '箱子号',width:140, align:'center'}									      
//									      ,{field:'CreateUserId', title: '创建者ID', align:'center'}
									      ,{field:'ModifyDate', title: '打印时间',width:160, align:'center'}									       
//									      ,{field:'ObjectID', title: '条码类型ID',align:'center'}
									      ,{field:'DYStatus', title: '班别', align:'center',templet: '#DYStatus'}
									      ,{field:'Printer', title: '打印员', align:'center'}
//									      ,{field:'ModifyUserId', title: '修改者ID', align:'center'}
//									      ,{field:'ModifyUserName', title: '修改者名字', align:'center'}
									    ]]
									    ,id:'testReload'
									    ,data: data.rows
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
 	 	 Data=JSON.stringify({ProductionID:data4,StartTime:data1,EndTime:data2}).replace(/\"/g,"'");
 	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
					   	rows:limitAllAppoint,
					   	page:startAllAppoint,
					   	sord:"asc",
					   	sidx:"id"
	   					},
	   					queryJson:Data
	   			})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_print/GetPagePrintLogList"
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
						     elem: 'stamppaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip']
						     ,limit:8
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						    	console.log(obj.curr);
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: JSON.stringify({pagination:{rows:limitAllAppoint, page:firstIndex,sord:"asc"},queryJson:Data})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_print/GetPagePrintLogList"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }					   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_stamp'
									     ,cols: [[
										   {field:'ID', title: '完工单ID', sort: true, align:'center'}	
									      ,{field:'ObjectType', title: '完工单号', align:'center'}
									      ,{field:'ObjectID', title: '数量',align:'center'}
									      ,{field:'Status', title: '批号', align:'center'}
									      ,{field:'Client', title: '版本', align:'center'}
									      ,{field:'CreateDate', title: '创建时间', align:'center'}
									      ,{field:'CreateUserId', title: '创建者ID', align:'center'}
									      ,{field:'CreateUserName', title: '创建者名称', align:'center'}
									      ,{field:'ModifyDate', title: '修改时间', align:'center'}
									      ,{field:'ModifyUserId', title: '修改者ID', align:'center'}
									      ,{field:'ModifyUserName', title: '修改者名字', align:'center'}
									    ]]
									    ,id:'testReload'
									    ,data: data.resultdata.rows
										,limit: 8 //每页默认显示的数量
							  });
					   		}
					    }) 
			          }
				   });
				});
	   		}
	   	});	 	 
 });