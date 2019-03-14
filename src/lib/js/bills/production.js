/**
	单据管理:生产单  
 */
	//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
		      getproductionInfo();
		     
   });
  	   	
   	function getproductionInfo(){
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
	   					rows:limitAllAppoint, 
	   					page:startAllAppoint,
	   					sord:"asc",
	   					sidx:"ID"
	   					},
	   					queryJson:{}
	   					})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_workplan_detail/GetPageListJsonToken"
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
									if(data.type==4){
					   					admin.events.logout();	
					   				}else{}										
										$.each(result.resultdata, function (index, item) {
											var optionStr = "";
											optionStr += "<option value='" + item.ID + "'>"
															+ item.Name + "</option>";
														//alert(optionStr);debugger
													$("#ProductionID").append(optionStr);
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
						    elem: 'paged'
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
					   					sord:"asc",
					   					sidx:"ID"
					   					},
					   					queryJson:{}
					   					})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_workplan_detail/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }						   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_production'
									     ,cols: [[
//									       {field:'id', title: '生产单明细ID', sort: true, align:'center'}	
//									      ,{field:'productionid', title: '物料ID', align:'center'}
									       {field:'id_urp', title: '生产单号',width:140, align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'acount', title: '需求数量', align:'center'}
									      ,{field:'productionacount', title: '生产数量', align:'center'}									      
//									      ,{field:'unitid', title:'物料单位ID',align:'center'}
									      ,{field:'version', title: '产品版本',align:'center'}
//									      ,{field:'producer', title: '生产部门', align:'center'}
//									      ,{field:'warehouseid', title: '仓库ID', align:'center'}
									      ,{field:'expstart', title: '开始时间',width:160, align:'center'}
									      ,{field:'expend', title: '结束时间',width:160, align:'center'}
//									      ,{field:'checkerid', title: '最终检验', align:'center'}
									      ,{field:'modate', title: '有效时间',width:160, align:'center'}									      
//									      ,{field:'createdate', title: '创建时间', align:'center'}
//									      ,{field:'createuserid', title: '创建者ID', align:'center'}
//									      ,{field:'createusername', title: '创建者名称', align:'center'}
//									      ,{field:'modifydate', title: '修改时间', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}
//									      ,{field:'modifyusername', title: '修改者名字', align:'center'}								      
									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit
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
    elem: '#pr_date'
  });
  laydate.render({
    elem: '#pr_date1'
  });
});


$("#bills_production_query").click(function(){
	var  data1 =$("#pr_date").val(),
 	  	 data2 =$("#pr_date1").val(),
 	  	 data3=$("#id_urp").val(),
 	  	 data4=$("#ProductionID").val();
 	 	 Data=JSON.stringify({ID_URP:data3,ProductionID:data4,StartTime:data1,EndTime:data2}).replace(/\"/g,"'");
 	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
					   	rows:limitAllAppoint,
					   	page:startAllAppoint,
					   	sord:"asc",
					   	sidx:"ID"
	   					},
	   					queryJson:Data
	   			})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_workplan_detail/GetPageListJsonToken"
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
						     elem: 'paged'
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
					   					sord:"asc"
					   					},
					   					queryJson:Data
					   			})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_workplan_detail/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }					   			
					   			,success:function(data,status){
					   				table.render({
									      elem: '#LAY_table_production'
									     ,cols: [[
//									       {field:'id', title: '生产单明细ID', sort: true, align:'center'}	
//									      ,{field:'productionid', title: '物料ID', align:'center'}
									       {field:'id_urp', title: '生产单号',width:140, align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'acount', title: '需求数量', align:'center'}
									      ,{field:'productionacount', title: '生产数量', align:'center'}									      
//									      ,{field:'unitid', title:'物料单位ID',align:'center'}
									      ,{field:'version', title: '产品版本',align:'center'}
//									      ,{field:'producer', title: '生产部门', align:'center'}
//									      ,{field:'warehouseid', title: '仓库ID', align:'center'}
									      ,{field:'expstart', title: '开始时间',width:160, align:'center'}
									      ,{field:'expend', title: '结束时间',width:160, align:'center'}
//									      ,{field:'checkerid', title: '最终检验', align:'center'}
									      ,{field:'modate', title: '有效时间',width:160, align:'center'}									      
//									      ,{field:'createdate', title: '创建时间', align:'center'}
//									      ,{field:'createuserid', title: '创建者ID', align:'center'}
//									      ,{field:'createusername', title: '创建者名称', align:'center'}
//									      ,{field:'modifydate', title: '修改时间', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}
//									      ,{field:'modifyusername', title: '修改者名字', align:'center'}								      
									    ]]
									    ,id:'testReload'
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