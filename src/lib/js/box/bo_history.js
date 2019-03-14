/**
	箱子管理:箱子记录  
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
	   			data: JSON.stringify({pagination:{rows:limitAllAppoint, page:startAllAppoint,sord:"desc",sidx:"createdate"},queryJson:{}})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_box_history/GetPageListJsonToken"
	   			,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
					   }
	   			,success:function(data,status){	
	   				layui.use(['table','layedit','form','layer','admin','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
					  	  admin=layui.admin,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象			  	  	  
					  //展示已知数据
					  laypage.render({
						     elem: 'BoxHistorypaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: JSON.stringify({pagination:{rows:obj.limit, page:firstIndex,sord:"desc",sidx:"createdate"},queryJson:{}})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_box_history/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }									   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_Boxmessage'
									     ,cols: [[
//									       {field:'id', title: '历史ID', sort: true, align:'center'}	
//									      ,{field:'boxid', title: '箱子ID', align:'center'}
//									      ,{field:'stackid', title: '栈板ID', align:'center'}
//									      ,{field:'positionid', title:'库位ID',align:'center'}
										   {field:'boxbarcode', title: '箱号',width:160, align:'center'}
									      ,{field:'stackbarcode', title: '所属栈板',width:160, align:'center'}
									      ,{field:'positionbarcode', title: '所属库位',width:160, align:'center'}										   
									      ,{field:'acount', title: '产品数量', align:'center'}
									      ,{field:'operationtype', title: '操作类型',width:160,align:'center',toolbar: '#OperationType_Box'}
									      ,{field:'createdate', title: '创建时间',width:160, align:'center'}
//									      ,{field:'createusername', title: '创建者ID', align:'center'}
									      ,{field:'createuserid', title: '操作人', align:'center'}
									      ,{field:'modifydate', title: '修改时间',width:160, align:'center'}
//									      ,{field:'modifyusername', title: '修改者名字', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}								      

									    ]]
									    ,even:true
									    ,data: data.resultdata.rows
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
    elem: '#BoxH_date'
  });
  laydate.render({
    elem: '#BoxH_date1'
  });
});

$("#Box_history_query").click(function(){
	var  data1 =$("#Box_history_Barcode").val(),
 	  	 data2 =$("#Box_history_select").val();
 	  	 data3 =$("#BoxH_date").val(),
 	  	 data4 =$("#BoxH_date1").val(),
 	 	 Data=JSON.stringify({Barcode:data1,ProductionID:data2,StartTime:data3,EndTime:data4}).replace(/\"/g,"'");
 	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({pagination:{rows:limitAllAppoint, page:startAllAppoint,sord:"desc",sidx:"createdate"},queryJson:Data})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_box_history/GetPageListJsonToken"
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
						     elem: 'BoxHistorypaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						    	console.log(obj.curr);
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: JSON.stringify({pagination:{rows:obj.limit, page:firstIndex,sord:"desc",sidx:"createdate"},queryJson:Data})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_box_history/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }					   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_Boxmessage'
									     ,cols: [[
//									       {field:'id', title: '历史ID', sort: true, align:'center'}	
//									      ,{field:'boxid', title: '箱子ID', align:'center'}
//									      ,{field:'stackid', title: '栈板ID', align:'center'}
//									      ,{field:'positionid', title:'库位ID',align:'center'}
										   {field:'boxbarcode', title: '箱号',width:160, align:'center'}
									      ,{field:'stackbarcode', title: '所属栈板',width:160, align:'center'}
									      ,{field:'positionbarcode', title: '所属库位',width:160, align:'center'}										   
									      ,{field:'acount', title: '产品数量', align:'center'}
									      ,{field:'operationtype', title: '操作类型',width:160,align:'center',toolbar: '#OperationType_Box'}
									      ,{field:'createdate', title: '创建时间',width:160, align:'center'}
//									      ,{field:'createusername', title: '创建者ID', align:'center'}
									      ,{field:'createuserid', title: '操作人', align:'center'}
									      ,{field:'modifydate', title: '修改时间',width:160, align:'center'}
//									      ,{field:'modifyusername', title: '修改者名字', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}	
									    ]]
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit //每页默认显示的数量
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