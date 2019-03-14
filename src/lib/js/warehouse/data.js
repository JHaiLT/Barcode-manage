/**
	仓库管理:库存数据  
 */

	//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
		      getWareDataInfo();
		     
   });
  	   	
	   	function getWareDataInfo(){
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({pagination:{rows:limitAllAppoint, page:startAllAppoint,sord:"desc",sidx:"positionbarcode"},queryJson:{}})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_position/GetStock"
			    ,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				  }	   			
	   			,success:function(data,status){	
	   				layui.use(['table','layedit','form','layer','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象
						  	  	  getBoards();
  					//产品下拉框				  	  	  
					  function getBoards(){
						$.ajax({
								url:layui.setter.Test_url+"/WMSManage/wms_product/GetDropDownBox",
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
											  $("#boards_data").append(optionStr);
											 layui.form.render('select');
											});
											},
										error : function(data) {
											alert('查找板块报错');
										}
								});
							};			  	  	  
					  //展示已知数据
					  laypage.render({
						    elem: 'WareDatapaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data:JSON.stringify({pagination:{rows:obj.limit, page:firstIndex,sord:"desc",sidx:"positionbarcode"},queryJson:{}})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_position/GetStock"
							    ,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }					   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_data'
									     ,cols: [[
									       {field:'positionbarcode', title: '库位条码', align:'center'}									      	
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'productionsum', title: '总数量', align:'center'}									      
									      ,{field:'boxcount', title: '箱子数', align:'center'}
									      ,{field:'stackcount', title: '栈板数',align:'center'}
									    ]]
									    ,id:'testReload'
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
};
//查询
$("#data_query").click(function(){
	var  data1 =$("#PositionBarcode").val(),
 	  	 data2 =$("#boards_data").val();
 	 	 Data=JSON.stringify({PositionBarcode:data1,ProductionID:data2}).replace(/\"/g,"'");
 	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({pagination:{rows:limitAllAppoint, page:startAllAppoint,sord:"asc",sidx:"positionbarcode"},queryJson:JSON.stringify({PositionBarcode:data1,ProductionID:data2}).replace(/\"/g,"'")})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_position/GetStock"
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
						     elem: 'WareDatapaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: JSON.stringify({pagination:{rows:obj.limit, page:firstIndex,sord:"asc",sidx:"positionbarcode"},queryJson:JSON.stringify({PositionBarcode:data1,ProductionID:data2}).replace(/\"/g,"'")})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_position/GetStock"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }					   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_data'
									     ,cols: [[
									       {field:'positionbarcode', title: '库位条码', align:'center'}									      	
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'productionsum', title: '总数量', align:'center'}									      
									      ,{field:'boxcount', title: '箱子数', align:'center'}
									      ,{field:'stackcount', title: '栈板数',align:'center'}
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