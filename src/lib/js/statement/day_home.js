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
        type: 'post',
        url:layui.setter.Test_url+'/WMSManage/wms_stock/GetStock',//请求数据的地址
        dataType: "json", //返回数据形式为json
	    data: JSON.stringify({
	   		queryJson:null
	   		}),
    	dataType: "json",
    	contentType:"application/json",      
        beforeSend: function(request) {
		 	request.setRequestHeader("token",localStorage.getItem("token"));
		   },
        success: function (data) {
        	console.log(data.resultdata.rows)
        	tableTotal=data.resultdata.rows;
 						var allArr = [];
						$.each(tableTotal,function(i,v){
						    var flag = true;
						    if(allArr.length > 0){
						        $.each(allArr,function(n,m){
						            if(tableTotal[i].acount==0){flag = false;};
						        });
						    };
						    if(flag){
						        allArr.push(tableTotal[i]);
						    };
						});	
						console.log(allArr)
	   				layui.use(['table','layedit','form','layer','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象	
   				   table.render({
						  elem: '#LAY_table_StateDayHome'
									   ,cols: [[
									       {type:'numbers', title: '序号', align:'center'}
									       ,{field:'productionname', title: '产品名称',align:'center'}				
									      ,{field:'acount', title: '总数量', align:'center'}							      
									      ,{field:'unitname', title:'单位名称',align:'center',templet:function(d){
							         		var title = 'PCS';
							         		return '<span class="red">'+title+'</span>';
			         		
			       			 				}}					      
									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: allArr
										,limit: 10000 //每页默认显示的数量
										,height: 500
							  });   				  	  	  
				  	  })    	
        }
     })
};
	