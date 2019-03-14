/**
	单据管理:生产单  
 */
	//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	var currentdate;
	   	var Did=null;
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
	   		  getNowFormatDate();
		      getproductionInfo(currentdate,Did);		      		     
   });
 function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    } 	   	
   	function getproductionInfo(dataDay,Did){
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
	   					ProductionID:Did,
	   					ReportDate:dataDay
	   					})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_stockreport/GetStockReport"
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
						    elem: 'StateDaypaged1'
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
					   					ProductionID:Did,
					   					ReportDate:dataDay
					   					})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_stockreport/GetStockReport"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }						   			
					   			,success:function(data,status){
					   				console.log(data.resultdata.rows)
					   				table.render({
									    elem: '#LAY_table_StateDay'
									     ,cols: [[
//									       {field:'id', title: '报表ID', sort: true, align:'center'}
									       {field:'reportdate', title: '报表日期', align:'center'}	
									      ,{field:'productionname', title: '产品名称',align:'center'}									       
//									      ,{field:'productionid', title: '产品ID', align:'center'}
									      ,{field:'quantityperbox', title: '每箱数量', align:'center'}
									      ,{field:'quantity', title: '总数量', align:'center'}							      
									      ,{field:'unitname', title:'单位名称',align:'center'}
									      ,{field:'postionbarcodes', title: '库位条码', align:'center'}								      
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
	//查找
		$("#StateDay_query").click(function(){
			var Cdata=$("#State_dateD").val();
			var Pid=$("#ProductionIDD").val();
			if(Cdata.toString()==0){
		     	layer.msg('请选择日期')
		     }else{
	          getproductionInfo(Cdata,Pid);	     	 
		     }			
		});
	//日期调用
	layui.use(['laydate','form'], function(){
	  var laydate = layui.laydate,
	  	  form = layui.form;
	      getBoards();
	laydate.render({
	    elem: '#State_dateD'
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
													$("#ProductionIDD").append(optionStr);
												 layui.form.render('select');
											});
											},
									  error : function(data) {
											console.log(data)
										}
								});
							};
	});	

		$("#bills_production_query1").click(function(){
			var Cdata=$("#State_dateD").val();
			var Pid=$("#ProductionIDD").val();
		     if(Cdata.toString()==0){
		     	layer.msg('请选择日期')
		     }else{
		     	window.location.href =layui.setter.Test_url+"/WMSManage/wms_stockreport/GetStockReport_Excel?ReportDate="+Cdata+"&ProductionID="+Pid+"&WarehouseID=" + "008-成品"; 
		     }
		 
 });