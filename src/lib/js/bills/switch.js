/**
	单据管理:移库单  
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
				  sidx:"starttime",
				  queryJson:"{}"
				 }
    			,dataType: "json"
//  			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_transferorder/GetPageListJson"
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
											  $("#switch_Select").append(optionStr);
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
						    elem: 'switchpaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						     ,curr:startAllAppoint
						    ,jump: function(obj){
						    	startAllAppoint=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: {
								  rows:obj.limit,
								  page:startAllAppoint,
								  sord:"desc",
								  sidx:"starttime",
								  queryJson:"{}"
								  }
				    			,dataType: "json"
//				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_transferorder/GetPageListJson"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_switch'
									     ,cols: [[
									       {field:'transferorderno', title: '转仓单号',width:140, align:'center'}
//									      ,{field:'warehouseid_s', title: '转出仓库', align:'center'}
//									      ,{field:'warehouseid_d', title:'转入仓库',align:'center'}
//									      ,{field:'productid', title: '货物编号',align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'amount', title: '数量', align:'center'}
									      ,{field:'unit', title: '单位', align:'center'}
									      ,{field:'warehousename_s', title: '转出仓库名称', align:'center'}
									      ,{field:'warehousename_d', title: '转入仓库名称', align:'center'}
									      ,{field:'createusername', title: '操作人',width:100, align:'center'}
									      ,{field:'starttime', title: '移仓开始时间',width:160, align:'center'}
									      ,{field:'endtime', title: '移仓结束时间',width:160, align:'center'}
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
    elem: '#sw_date'
  });
  laydate.render({
    elem: '#sw_date1'
  });
});


 $('#switch_Serch').click(function (){
 	var  data1 =$("#TransferOrderNo").val(),
 	  	 data2 =$("#sw_date").val(),
 	 	 data3 =$("#sw_date1").val();
 	 	 data4=$("#switch_Select").val();
 	 	 Data={TransferOrderNo:data1,ProductionID:data4,StartTime:data2,EndTime:data3};
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data:{
				  rows:limitAllAppoint,
				  page:startAllAppoint,
				  sord:"desc",
				  sidx:"starttime",
				  queryJson:JSON.stringify(Data)
				 }
    			,dataType: "json"
//  			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_transferorder/GetPageListJson"
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
						    elem: 'switchpaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						     ,curr:startAllAppoint
						    ,jump: function(obj){
						    	startAllAppoint=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: {
								  rows:obj.limit,
								  page:firstIndex,
								  sord:"desc",
								  sidx:"starttime",
								  queryJson:JSON.stringify(Data)
								  }
				    			,dataType: "json"
//				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_transferorder/GetPageListJson"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_switch'
									     ,cols: [[
									       {field:'transferorderno', title: '转仓单号',width:140, align:'center'}
//									      ,{field:'warehouseid_s', title: '转出仓库', align:'center'}
//									      ,{field:'warehouseid_d', title:'转入仓库',align:'center'}
//									      ,{field:'productid', title: '货物编号',align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'amount', title: '数量', align:'center'}
									      ,{field:'unit', title: '单位', align:'center'}
									      ,{field:'warehousename_s', title: '转出仓库名称', align:'center'}
									      ,{field:'warehousename_d', title: '转入仓库名称', align:'center'}
									      ,{field:'createusername', title: '操作人',width:100, align:'center'}
									      ,{field:'starttime', title: '移仓开始时间',width:160, align:'center'}
									      ,{field:'endtime', title: '移仓结束时间',width:160, align:'center'}
									    ]]
									    ,id:'testReload'
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
 });