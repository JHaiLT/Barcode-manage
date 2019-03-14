/**
	箱子管理:箱子信息 
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
	   					sidx:"CreateDate"
	   					},
	   					queryJson:{}})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_box/GetPageListJsonToken"
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
													$("#Box_query").append(optionStr);
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
						    elem: 'Box_manage_paged'
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
					   					sidx:"CreateDate"
					   					},queryJson:{}})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_box/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }					   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_MangeBox'
									     ,cols: [[
//									       {field:'id', title: '箱号', sort: true, align:'center'}	
//									      ,{field:'productionboxtypeid', title: '物料包装箱类型ID', align:'center'}
									       {field:'barcode', title:'箱号',width:160,align:'center'}
									      ,{field:'stackbarcode', title:'所属栈',width:160,align:'center'}
									      ,{field:'positionbarcode', title:'所属库位',width:160,align:'center'}		
									      ,{field:'productionname', title:'产品名称',align:'center'}									      
									      ,{field:'acount', title: '数量', align:'center'}
//									      ,{field:'productionid', title:'物料ID',align:'center'}
//									      ,{field:'batch', title:'批号',align:'center'}
//									      ,{field:'customerid', title:'供应商ID',align:'center'}
//									      ,{field:'checkorid', title:'检验员ID',align:'center'}
//									      ,{field:'checkorid', title:'切割机编号',align:'center'}
//									      ,{field:'isday', title:'日夜班',align:'center'}
//									      ,{field:'stackid', title:'栈板条码值',align:'center'}
//									      ,{field:'workplanid', title:'工单ID',align:'center'}
//									      ,{field:'printstatus', title:'打印状态',align:'center'}
									      ,{field:'id_urp', title:'生产单号',align:'center'}
//									      ,{field:'status', title:'出入库状态',align:'center'}
//									      ,{field:'statusname', title:'状态',align:'center'}
//									      ,{field:'productiondate', title:'生产日期',align:'center'}									      
//									      ,{field:'modifydate', title: '修改时间', align:'center'}
//									      ,{field:'createusername', title: '创建人',align:'center'}
//									      ,{field:'createuserid', title: '创建者ID',align:'center'}
									      ,{field:'createdate', title: '创建时间',width:160, align:'center'}
//									      ,{field:'modifyusername', title: '修改人', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}
//									      ,{field:'modifydate', title: '修改时间', align:'center'}
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

//日期调用

layui.use('laydate', function(){
  var laydate = layui.laydate;
  
 //日期
  laydate.render({
    elem: '#BoxM_date'
  });
  laydate.render({
    elem: '#BoxM_date1'
  });
});

//查询
$("#Box_serch").click(function(){
	var  data1 =$("#Barcode").val(),
 	  	 data2 =$("#Box_query").val();
 	  	 data3 =$("#BoxM_date").val(),
 	  	 data4 =$("#BoxM_date1").val(),
 	  	 data5 =$("#ID_URP").val(),
 	 	 Data=JSON.stringify({Barcode:data1,ProductionID:data2,ID_URP:data5,StartTime:data3,EndTime:data4}).replace(/\"/g,"'");
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
	   					rows:limitAllAppoint,
	   					page:startAllAppoint,
	   					sord:"desc",
					   	sidx:"CreateDate"
					   	},
					   	queryJson:Data
	   			})
    			,dataType: "json"
     			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_box/GetPageListJsonToken"
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
						    elem: 'Box_manage_paged'
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
					   					   sidx:"CreateDate"
					   					   },
					   					   queryJson:Data
					   				})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_box/GetPageListJsonToken"
							    ,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }					   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_MangeBox'
									     ,cols: [[
//									       {field:'id', title: '箱号', sort: true, align:'center'}	
//									      ,{field:'productionboxtypeid', title: '物料包装箱类型ID', align:'center'}
									       {field:'barcode', title:'箱号',width:160,align:'center'}
									      ,{field:'stackbarcode', title:'所属栈',width:160,align:'center'}
									      ,{field:'positionbarcode', title:'所属库位',width:160,align:'center'}		
									      ,{field:'productionname', title:'产品名称',align:'center'}									      
									      ,{field:'acount', title: '数量', align:'center'}
//									      ,{field:'productionid', title:'物料ID',align:'center'}
//									      ,{field:'batch', title:'批号',align:'center'}
//									      ,{field:'customerid', title:'供应商ID',align:'center'}
//									      ,{field:'checkorid', title:'检验员ID',align:'center'}
//									      ,{field:'checkorid', title:'切割机编号',align:'center'}
//									      ,{field:'isday', title:'日夜班',align:'center'}
//									      ,{field:'stackid', title:'栈板条码值',align:'center'}
//									      ,{field:'workplanid', title:'工单ID',align:'center'}
//									      ,{field:'printstatus', title:'打印状态',align:'center'}
									      ,{field:'id_urp', title:'生产单号',align:'center'}
//									      ,{field:'status', title:'出入库状态',align:'center'}
//									      ,{field:'statusname', title:'状态',align:'center'}
//									      ,{field:'productiondate', title:'生产日期',align:'center'}									      
//									      ,{field:'modifydate', title: '修改时间', align:'center'}
//									      ,{field:'createusername', title: '创建人',align:'center'}
//									      ,{field:'createuserid', title: '创建者ID',align:'center'}
									      ,{field:'createdate', title: '创建时间',width:160, align:'center'}
//									      ,{field:'modifyusername', title: '修改人', align:'center'}
//									      ,{field:'modifyuserid', title: '修改者ID', align:'center'}
//									      ,{field:'modifydate', title: '修改时间', align:'center'}
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