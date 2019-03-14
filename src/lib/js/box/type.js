/**
	箱子管理:类型管理  
 */
//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
		      getBoxTypeInfo();
		     
  });	   	
	   	function  getBoxTypeInfo(){
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
	   					rows:limitAllAppoint, 
	   					page:startAllAppoint,
	   					sord:"desc",
	   					sidx:"createdate"
	   					},
	   					queryJson:{}
	   					})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_product_boxtype/GetPageListJsonToken"
	   			,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				  }	
	   			,success:function(data,status){	
	   				layui.use(['table','layedit','form','layer','laypage','jquery'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象
					  //展示已知数据
					  laypage.render({
						    elem: 'Box_type_paged'
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
					   					sord:"desc",
					   					sidx:"createdate"
					   					},queryJson:{}
					   					})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_product_boxtype/GetPageListJsonToken"
					   			 ,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }	
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_type'
									     ,cols: [[
//									       {field:'id', title: 'ID',  sort: true, align:'center'}
									       {field:'boxtype', title: '箱子类别', align:'center'}
//									      ,{field:'productid', title:'产品名称ID', align:'center'}
									      ,{field:'productionname', title:'产品名称', align:'center'}
									      ,{field:'maxacount', title:'箱子大小', align:'center'}
//									      ,{field:'createuserid', title: '创建人ID', align:'center'}
									      ,{field:'createusername', title: '创建人名', align:'center'}
									      ,{field:'createdate', title: '创建时间', width:160, align:'center'}									      
//									      ,{field:'modifyuserId', title: '更改人ID', align:'center'}
									      ,{field:'modifyUsername', title: '更改人名', align:'center'}
										  ,{field:'modifydate', title: '更改时间', width:160, align:'center'}					      
									      ,{title:'操作', width:120, align:'center', toolbar: '#box_type'}
									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit//每页默认显示的数量
										,height: 'full-300'										
							  });
						 table.on('tool(user)', function(obj){
							    var data = obj.data;
							    if(obj.event === 'detail'){
							      layer.msg('ID：'+ data.id + ' 的查看操作');
							    } else if(obj.event === 'del'){
							      layer.confirm('真的删除行么', function(index){
							      	$.ajax({
							      		 type:"post"
							      		,url:layui.setter.Test_url+"/WMSManage/wms_product_boxtype/RemoveFormToken"
							      		,data:JSON.stringify({
							      		   keyValue:data.id
							      		})
							      		,dataType: "json"
		    							,contentType:"application/json"
		    							 ,beforeSend: function(request) {
											 request.setRequestHeader("token",localStorage.getItem("token"));
										  }	
		    							,success:function(){
		    								layer.msg('删除成功！');
		    								getBoxTypeInfo();
		    							}
							      	});
							      });
							    } else if(obj.event === 'edit'){
							    //layer.alert('编辑行：<br>'+ JSON.stringify(data))
								    layer.open({
										title: '修改箱子',
										maxmin: true,
										type: 2,
										btnAlign: 'c',
										btn: ['提交', '关闭'],
										content: '../src/views/temp/edit_box_type.html?productid='+data.productid,
										offset: ['100px', '30%'],
										area: ['500px', '300px'],
										yes:function(index,layero){
										    var body = layer.getChildFrame('body', index);  // 重点0
										    var iframeWin = window[layero.find('iframe')[0]['name']];
											var Editsubmited = iframeWin.document.getElementById("Editsubmited");
  						        			    Editsubmited.click();	 						        			    
										},
										btn2: function(){
										      layer.closeAll();
										},
										success: function(layero, index) {
											var body=layer.getChildFrame('body',index);
											body.find(".ID").val(data.id);
											body.find(".BoxType").val(data.boxtype);
											body.find(".MaxAcount").val(data.maxacount);
										},
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



$('#add_Box').click(function (){
			layer.open({
				type: 2,
				title: '添加箱子',
				content: '../src/views/temp/add_box_type.html',
				btnAlign: 'c',
				offset: ['100px', '30%'],
				area: ['500px', '300px'],
				maxmin: true,
				btn: ['提交', '关闭'],
				yes:function(index,layero){
				       var iframeWin = window[layero.find('iframe')[0]['name']];
				       //console.log(body.html()) //得到iframe页的body内容
					   var data=iframeWin.document.getElementById("ProductionName");
					   var data1=iframeWin.document.getElementById("MaxAcount");
					   var data2=iframeWin.document.getElementById("BoxType");
					   data3 = data1.value;
					   data4 = data2.value;					   
					   if(data.value==0){
						layer.msg('未选择产品名称!', {
								    offset: '45px'
								    ,icon: 5
								    ,time: 2000
						 });						   	
					   }else{	
        	     if(data3.length!=0 && data4.length != 0){
        	   		   var submited = iframeWin.document.getElementById("submited");        			   
     			        submited.click();
     			        layer.msg('添加成功！', {
								    offset: '45px'
								    ,icon: 1
								    ,time: 2000
						 });
     			        }else{
   						layer.msg('未输入正确！', {
								    offset: '45px'
								    ,icon: 5
								    ,time: 2000
						 });  			        	
     			        }
					  }      			   
				},
				btn2: function(){
				      layer.closeAll();
				},
			});
     });