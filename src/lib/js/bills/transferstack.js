/**
	单据管理:移库栈板单 
 */
	//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
		      getdeliveryInfo();
		     
  });
	   	function getdeliveryInfo(){
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data:{
				  rows:limitAllAppoint,
				  page:startAllAppoint,
				  sord:"desc",
				  sidx:"createdate",
				  queryJson:"{}"
				 }
    			,dataType: "json"
//  			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_transferstack/GetPageListJsonToken"
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
											  $("#trans_Select").append(optionStr);
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
						    elem: 'transpaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: {
								  rows:obj.limit,
								  page:firstIndex,
								  sord:"desc",
								  sidx:"createdate",
								  queryJson:"{}"
								  }
				    			,dataType: "json"
//				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_transferstack/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_trans'
									     ,cols: [[
									       {field:'transferstackno', title: '栈板移库单号',width:140, align:'center'}
									      ,{field:'transferorderno', title: '移库单号',width:140, align:'center'}
									      ,{field:'workplanno', title: '生产单号',width:140, align:'center'}									       
//									      ,{field:'warehouseid_s', title: '转出仓库', align:'center'}
//									      ,{field:'warehouseid_d', title:'转入仓库',align:'center'}
//									      ,{field:'productid', title: '货物编号',align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'boxacount', title: '箱子数量', align:'center'}
//									      ,{field:'unit', title: '单位', align:'center'}
									      ,{field:'status', title: '状态', align:'center',templet: '#Transstatus'}
									      ,{field:'createusername', title: '创建者名称', align:'center'}
									      ,{field:'createdate', title: '移仓开始时间',width:160, align:'center'}
//									      ,{field:'endtime', title: '移仓结束时间', align:'center'}
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

layui.use('laydate', function(){
  var laydate = layui.laydate;
  
 //日期
  laydate.render({
    elem: '#tr_date'
  });
  laydate.render({
    elem: '#tr_date1'
  });
});


 $('#trans_Serch').click(function (){
 	var  data1 =$("#TransferOrderNo").val(),
 	  	 data2 =$("#tr_date").val(),
 	 	 data3 =$("#tr_date1").val();
 	 	 data4=$("#trans_Select").val();
 	 	 Data={TransferOrderNo:data1,ProductionID:data4,StartTime:data2,EndTime:data3};
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data:{
				  rows:limitAllAppoint,
				  page:startAllAppoint,
				  sord:"desc",
				  sidx:"createdate",
				  queryJson:JSON.stringify(Data)
				 }
    			,dataType: "json"
//  			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_transferstack/GetPageListJsonToken"
	   			,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
					   }
	   			,success:function(data,status){	
                    console.log(data.resultdata.total);
	   				layui.use(['table','layedit','form','layer','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象			  	  	  
					  //展示已知数据
					  laypage.render({
						    elem: 'transpaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						    	console.log(obj.curr);
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: {
								  rows:obj.limit,
								  page:firstIndex,
								  sord:"desc",
								  sidx:"createdate",
								  queryJson:JSON.stringify(Data)
								  }
				    			,dataType: "json"
//				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_transferstack/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_trans'
									     ,cols: [[
									       {field:'transferstackno', title: '栈板移库单号',width:140, align:'center'}
									      ,{field:'transferorderno', title: '移库单号',width:140, align:'center'}
									      ,{field:'workplanno', title: '生产单号',width:140, align:'center'}									       
//									      ,{field:'warehouseid_s', title: '转出仓库', align:'center'}
//									      ,{field:'warehouseid_d', title:'转入仓库',align:'center'}
//									      ,{field:'productid', title: '货物编号',align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'boxacount', title: '箱子数量', align:'center'}
//									      ,{field:'unit', title: '单位', align:'center'}
									      ,{field:'status', title: '状态', align:'center',templet: '#Transstatus'}
									      ,{field:'createusername', title: '创建者名称', align:'center'}
									      ,{field:'createdate', title: '移仓开始时间',width:160, align:'center'}
//									      ,{field:'endtime', title: '移仓结束时间', align:'center'}
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
 });