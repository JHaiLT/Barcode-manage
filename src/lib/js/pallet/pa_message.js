/**
	栈板管理:栈板管理  
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
	   			data: {
	   				rows:limitAllAppoint,
	   				page:startAllAppoint,
	   				sord:"desc",
	   				sidx:"CreateDate"
	   			}
    			,dataType: "json"
    			 ,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				  }	
//  			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_stack/GetPageListJsonTokenV2"
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
													$("#Production").append(optionStr);
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
						    elem: 'palletManagepaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data:  {
					   				rows:obj.limit,
					   				page:firstIndex,
					   				sord:"desc",
					   				sidx:"CreateDate"
					   			}
				    			,dataType: "json"
				    		    ,beforeSend: function(request) {
										 request.setRequestHeader("token",localStorage.getItem("token"));
									  }	
//				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_stack/GetPageListJsonTokenV2"
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_Pamessage'
									     ,cols: [[
									       {field:'barcode', title: '栈号', width:140 ,sort: true, align:'center'}
									      ,{field:'workclass', title: '生产班别', align:'center',templet: '#workclass'}
//									      ,{field:'productionid', title: '物料编码', align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'suppliername', title: '供货商', align:'center'}
									      ,{field:'acount', title: '数量', align:'center'}
									      ,{field:'statusname', title:'状态',align:'center',width:140,templet: '#statusname'}
//									      ,{field:'modifyusername', title: '修改人', align:'center'}
									      ,{field:'createdate', title: '创建时间', width:160, align:'center'}
									      ,{field:'modifydate', title: '修改时间', width:160, align:'center'}
 									      ,{title:'操作', width:120, align:'center', toolbar: '#pallet_operate'}
									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit //每页默认显示的数量
										,height: 'full-300'										
							  });
						 table.on('tool(user)', function(obj){
							    var data = obj.data;
							 if(obj.event === 'cancel'){
							      layer.confirm('确定注销么?', function(index){
							      	$.ajax({
							      		 type:"post"
							      		,url:layui.setter.Test_url+"/WMSManage/wms_stack/CancelStack"
							      		,data:JSON.stringify({
							      		   StackID:data.id
							      		})
							      		,dataType: "json"
		    							,contentType:"application/json"
		    							 ,beforeSend: function(request) {
											 request.setRequestHeader("token",localStorage.getItem("token"));
										  }	
		    							,success:function(data){
		    								layer.msg(data.message);
		    								getcompleteInfo();
		    							}
							      	});
							      });
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

layui.use('laydate', function(){
  var laydate = layui.laydate;
 //日期
  laydate.render({
    elem: '#me_date'
  });
  laydate.render({
    elem: '#me_date1'
  });
				
});

$("#pa_manageSerch").click(function(){
	var  data1 =$("#barcode_ma").val(),
 	  	 data2 =$("#me_date").val(),
 	  	 data4=$("#Production").val(),
 	 	 data3 =$("#me_date1").val();
 	 	 console.log(data3);
 	 	 Data={Barcode:data1,ProductID:data4,StartTime:data2,EndTime:data3};
 	 	 console.log(Data.Barcode);
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: {
	   				rows:limitAllAppoint,
	   				page:startAllAppoint,
	   				sord:"desc",
	   				sidx:"CreateDate",
	   				queryJson:JSON.stringify(Data)
	   			}
	   			 ,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				  }	
    			,dataType: "json"
//  			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_stack/GetPageListJsonTokenV2"
	   			,success:function(data,status){	
	   				layui.use(['table','layedit','form','layer','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象
					  //展示已知数据
					  laypage.render({
						    elem: 'palletManagepaged'
						    ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data:  {
					   				rows:obj.limit,
					   				page:firstIndex,
					   				sord:"desc",
					   				sidx:"CreateDate",
					   				queryJson:JSON.stringify(Data)
					   			}
				    			,dataType: "json"
//				    			,contentType:"application/json"
								 ,beforeSend: function(request) {
													 request.setRequestHeader("token",localStorage.getItem("token"));
												  }	
					   			,url:layui.setter.Test_url+"/WMSManage/wms_stack/GetPageListJsonTokenV2"
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_Pamessage'
									     ,cols: [[
									       {field:'barcode', title: '栈号', width:140 ,sort: true, align:'center'}
									      ,{field:'workclass', title: '生产班别', align:'center',templet: '#workclass'}
//									      ,{field:'productionid', title: '物料编码', align:'center'}
									      ,{field:'productionname', title: '产品名称', align:'center'}
									      ,{field:'suppliername', title: '供货商', align:'center'}
									      ,{field:'acount', title: '数量', align:'center'}
									      ,{field:'statusname', title:'状态',align:'center',width:140,templet: '#statusname'}
//									      ,{field:'modifyusername', title: '修改人', align:'center'}
									      ,{field:'createdate', title: '创建时间', width:160, align:'center'}
									      ,{field:'modifydate', title: '修改时间', width:160, align:'center'}
									      ,{title:'操作', width:120, align:'center', toolbar: '#pallet_operate'}
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