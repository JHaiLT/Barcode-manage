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
  var CherUrl=parent.layui.setter.Test_url;
  	function getquery(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
			r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	};
    function statusBtn(state){
		 $("#deviceEdit").attr("disabled",state);
	 }
        var option={};
        var Arr=[];
	   	function  getBoxTypeInfo(){
	   		$.ajax({
	   			type:"post"
	   			,async:false
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:parent.layui.setter.Test_url+"/WMSManage/wms_edgetrimmer/GetDetailed?keyValue="+getquery("edgetrimmerId")
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
						    elem: 'checker_paged'
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						     ,curr:startAllAppoint
						    ,jump: function(obj){
						    	startAllAppoint=obj.curr;
						      	$.ajax({
					   			type:"post"
					   			,async:false
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:parent.layui.setter.Test_url+"/WMSManage/wms_edgetrimmer/GetDetailed?keyValue="+getquery("edgetrimmerId")
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }	
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_checker'
									     ,cols: [[
									       {checkbox: true,fixed: true}
									      ,{field:'code', title: '检验员代号',  align:'center'}
									      ,{field:'name', title: '检验员名称', align:'center'}
									      ,{field:'class', title:'检验员班别', align:'center'}									      
									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit//每页默认显示的数量									
							  });
					    table.on('checkbox(checker)', function(obj){ 
							 		option.CheckerID = obj.data.id;		
							 		option.EdgetrimmerID= obj.data.id;
							 		var checkedTr = table.checkStatus('testReload').data;
							 		Arr=checkedTr;
							 		if(obj.type == 'all'){
							 			return false;
							 		}else{
							 			if(checkedTr.length == 1){
							 				  option=checkedTr[0];
							 				  statusBtn(false);
							 			}else{
							 				  statusBtn(true);
							 			}
							 			 
							 		}	 
							  });
						//编辑检验员
						$('#edit_checker').click(function (){
								console.log(Arr)
								if(Arr.length==0){
							           layer.msg('未选择编辑项！', {
										 offset: '45px'
										 ,icon: 5
										 ,time: 2000
									 }); 		
								}else{
									layer.closeAll();
									layer.open({
										type: 2,
										title: '编辑检验员',
										content:'edit_checker2.html',
										btnAlign: 'c',
										offset: ['30px', '10%'],
										area: ['500px', '240px'],
										maxmin: true,
										btn: ['提交', '关闭'],
										yes:function(index,layero){
										       var iframeWin = window[layero.find('iframe')[0]['name']];
										       //console.log(body.html()) //得到iframe页的body内容		   
						        	   		   var submited = iframeWin.document.getElementById("submited");        			   
						     			        submited.click();  			           			   
										},
										btn2: function(){
										      layer.closeAll();
										},
										success: function(layero, index) {
											Arr1=JSON.stringify(Arr)
										      var body=layer.getChildFrame('body',index);
										          body.find(".EdgetrimmerID").val(Arr[0].id);
												  body.find("#IsDay").val(Arr[0].class).attr('selected',true);	
												  body.find("#chName").val(Arr[0].checkerid).attr('selected',true);	
											},				
									});			
								}
						
						    }); 	
						//删除检验员
						$('#dele_checker').click(function (){
								console.log(Arr)
								if(Arr.length==0){
							           layer.msg('未选择删除项！', {
										 offset: '45px'
										 ,icon: 5
										 ,time: 2000
									 }); 		
								}else{
							      layer.confirm('真的删除行么', function(index){
							      	$.ajax({
							      		 type:"post"
							      		,url:parent.layui.setter.Test_url+"/WMSManage/wms_edgetrimmer/Delete"
							      		,data:JSON.stringify({
							      		   MapID:Arr[0].id
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


//添加检验员
$('#add_checker').click(function (){
	layer.closeAll();
			layer.open({
				type: 2,
				title: '添加检验员',
				content: 'add_checker1.html',
				btnAlign: 'c',
				offset: ['30px', '10%'],
				area: ['500px', '240px'],
				maxmin: true,
				btn: ['提交', '关闭'],
				yes:function(index,layero){
				       var iframeWin = window[layero.find('iframe')[0]['name']];
				       //console.log(body.html()) //得到iframe页的body内容		   
        	   		   var submited = iframeWin.document.getElementById("submited");        			   
     			        submited.click();  			           			   
				},
				btn2: function(){
				      layer.closeAll();
				},
				success: function(layero, index) {
				      var body=layer.getChildFrame('body',index);
						  body.find(".EdgetrimmerID").val(getquery("edgetrimmerId"));										   
					},				
			});
    });    
   