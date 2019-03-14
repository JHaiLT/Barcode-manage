/**
	单据管理:生产单  
 */
	//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	var currentdate;
	   	var Pid=null;
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
	   		  getNowFormatDate();
		      getproductionInfo(currentdate,Pid);		      		     
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
   	function getproductionInfo(dataDay,id){
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
					   	ProductionID:id,
					   	ReportDate:dataDay,
					   	WarehouseID:"008-成品"
	   					})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_stockreport/GetStockChangeReport"
	   			,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
					   }	   			
	   			,success:function(data,status){	
	   				layui.use(['table','layedit','form','layer','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象				  	  	 
				  	 var colData=new Array();
					//产品下拉框		
					var obj=data.resultdata.rows[0]
					var arr = Object.keys(obj);
					var len = arr.length;
					console.log(len)
					Reflect.ownKeys(obj).forEach(function(key){			
						col={field:key, title: obj[key], align:'center'};
					    colData.push(col)
					});					  	  	  				  	  	 				  	  	  				  	  	  				  	  					  	  	  				  	  	  
					  //展示已知数据
					  laypage.render({
						    elem: 'Purchasepaged'
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
									   	ProductionID:id,
									   	ReportDate:dataDay,
					   					WarehouseID:"008-成品"
					   					})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_stockreport/GetStockChangeReport"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
									   }						   			
					   			,success:function(data,status){
									var pe=data.resultdata.rows;
									var dr = Object.keys(pe);
									console.log(dr)
									var len = dr.length;  
									var MDate=new Array();
									console.log(data.resultdata)
									console.log(len)
									for(var i=1;i<len;i++){
										MDate.push(data.resultdata.rows[i])
									}
									console.log(MDate)
					   				table.render({
									    elem: '#LAY_table_Purchase'
									    ,cols: [colData]									    
									    ,id:'testReload'
									    ,even:true
									    ,data: MDate
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
	layui.use(['laydate','form'], function(){
	  var laydate = layui.laydate,
	  	  form = layui.form;
	      getBoards();
	 //日期
	laydate.render({
	    elem: '#Purchase_dateP'	   
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
									$("#ProductionID").append(optionStr);
								 layui.form.render('select');
								});
								},
						   error : function(data) {
						 	console.log(data)
							}
					});
				};
	});	
	
	//查找
		$("#Purchase_query").click(function(){
			var Cdata=$("#Purchase_dateP").val();
			var Pid=$("#ProductionIDP").val();
			if(Cdata.toString()==0){
		     	layer.msg('请选择日期')
		     }else{
	          getproductionInfo(Cdata,Pid);	     	 
		     }
			
		});
		$("#bills_production_query2").click(function(){
			var Cdata=$("#Purchase_dateP").val();
			var Pid=$("#ProductionIDP").val();
			if(Cdata.toString()==0){
		     	layer.msg('请选择日期')
		     }else{
	          window.location.href =layui.setter.Test_url+"/wms_stockreport/GetStockChangeReport_Excel?ReportDate="+Cdata+"&ProductionID="+Pid+"&WarehouseID=" + "008-成品";   	 
		     }
			
		});
	
	     
	// 	 	 Data=JSON.stringify({ID_URP:data3,ProductionID:data4,StartTime:data1,EndTime:data2}).replace(/\"/g,"'");
	//         // console.log("/Report/toDaySellGatherExcel?day=" + _time + "&param=" + _param)
	//          window.location.href =layui.setter.Test_url+"/WMSManage/wms_stockreport/GetStockReport_Excel?ReportDate="+"2018-05-20" 
		 
 