/**
	单据管理:送货单  
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
	   			  sidx:"date"
				 }
    			,dataType: "json"
//  			,contentType:"application/json"
				,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }
	   			,url:layui.setter.Test_url+"/WMSManage/wms_shippingorder/GetPageListJson"
	   			,success:function(data,status){	
                    console.log(data.resultdata.total);
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
											  $("#delivery_Select").append(optionStr);
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
						    elem: 'Deliverypaged'
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
	   							  sidx:"date"
								  }
				    			,dataType: "json"
//				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_shippingorder/GetPageListJson"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }						   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_delivery'
									     ,cols: [[
									       {field:'shippingorderno', title: '送货单号', sort: true,width:160, align:'center'}	
									      ,{field:'product', title: '货物编号', align:'center',width:140,}
//									      ,{field:'custproductid', title: '客户货物编号', align:'center'}
									      ,{field:'batchnumber', title:'批号',align:'center'}
									      ,{field:'amount', title: '数量',align:'center'}
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
									      ,{field:'salesorder', title: '销售单号',width:100, align:'center'}
									      ,{field:'warehouse', title: '仓库', align:'center'}
									      ,{field:'customer', title: '客户', align:'center'}
									      ,{field:'finalbuyer', title: '最终买家', align:'center'}
									      ,{field:'date', title: '日期',width:160, align:'center'}
									      ,{field:'statusname', title: '状态',width:100, align:'center'}
									      ,{title:'操作', width:120, align:'center', toolbar: '#box_type'}
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
		    //监听单元格事件
		    table.on('tool(user)', function(obj){
    			var data = obj.data;
				 if(obj.event === 'edit'){
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
				});
	   		}
	   	});
};

layui.use('laydate', function(){
  var laydate = layui.laydate;
  
 //日期
  laydate.render({
    elem: '#de_date'
  });
  laydate.render({
    elem: '#de_date1'
  });
});


 $('#delivery_Serch').click(function (){
 	var  data1 =$("#shipmentNumber").val(),
 	  	 data2 =$("#de_date").val(),
 	 	 data3 =$("#de_date1").val();
 	 	 data4=$("#delivery_Select").val();
 	 	 Data={Barcode:data1,ProductID:data4,StartTime:data2,EndTime:data3};
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data:{
				  rows:limitAllAppoint,
				  page:startAllAppoint,
				  sord:"asc",
				  queryJson:JSON.stringify(Data)
				 }
    			,dataType: "json"
 				,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
					  }	   			
//  			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_shippingorder/GetPageListJson"
	   			,success:function(data,status){	
                    console.log(data.resultdata.total);
	   				layui.use(['table','layedit','form','layer','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象			  	  	  
					  //展示已知数据
					  laypage.render({
						    elem: 'Deliverypaged'
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
								  sord:"asc",
								  queryJson:JSON.stringify(Data)
								  }
				    			,dataType: "json"
//				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_shippingorder/GetPageListJson"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }						   			
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_delivery'
									     ,cols: [[
									       {field:'shippingorderno', title: '送货单号', sort: true,width:160, align:'center'}	
									      ,{field:'product', title: '货物编号', align:'center',width:140,}
//									      ,{field:'custproductid', title: '客户货物编号', align:'center'}
									      ,{field:'batchnumber', title:'批号',align:'center'}
									      ,{field:'amount', title: '数量',align:'center'}
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
									      ,{field:'salesorder', title: '销售单号',width:100, align:'center'}
									      ,{field:'warehouse', title: '仓库', align:'center'}
									      ,{field:'customer', title: '客户', align:'center'}
									      ,{field:'finalbuyer', title: '最终买家', align:'center'}
									      ,{field:'date', title: '日期',width:160, align:'center'}
									      ,{field:'statusname', title: '状态',width:100, align:'center'}
									      ,{title:'操作', width:120, align:'center', toolbar: '#box_type'}
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