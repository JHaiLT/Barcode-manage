/**
	仓库管理:货架管理  
 */

	layui.use(['tree', 'layer', 'form'], function() {
		var layer = layui.layer,
			$ = layui.jquery,
			form = layui.form;
			getTreeinfo();			
	  function getTreeinfo(){
				$.ajax({
					type:"post"
// 					url: "./tree.json"
					,data:{
						RoleId: getquery("RoleId")
					}
					,url:parent.layui.setter.Test_url+"/BaseManage/Role/RoleModule"
					,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
					   }
					,dataType: "json"				
					,success: function(data) {
					TreeViewInit(data);
					},
					error: function() {}
				});
		};
		

	//遍历树形结构
	var arry=[];
		function TreeViewInit (d) {
	            // console.log(d)
				$('#treeview').treeview({
		 		    color: "#428bca",
		            expandIcon: 'glyphicon glyphicon-chevron-right',
		            collapseIcon: 'glyphicon glyphicon-chevron-down',
		            nodeIcon: 'glyphicon glyphicon-bookmark',
					showTags: true,
					data: d,
					hierarchicalCheck:true,
					showCheckbox:true,
					onNodeSelected: function(event, node) {
					//	console.log(event)
						console.log(node.state.selected)				
					},
					onNodeUnselected: function(event, node){
						console.log(node.state.selected)
						SelectState=node.state.selected;
					},
					onNodeChecked:function (event, node){
						var selectNodes= getChildNodeIdArr(node);//获取所有节点
                         if(selectNodes){//如果子节点不为空，即存在子节点，则选中所有子节点
                                               //选择指定的节点，接收节点或节点ID
                              $('#treeview').treeview('checkNode',[selectNodes,{silent:true}])
						}
						checkAllParent(node);      
					},
					 onNodeUnchecked:function(event,node){//取消选中节点
                             var selectNodes=getChildNodeIdArr(node);
                             if(selectNodes){//子节点不为空，则取消选中所有子节点
                                 $('#treeview').treeview("uncheckNode",[selectNodes,{silent:true}]);                  
                             }
                             uncheckAllParent(node);
                         }
				});
				
		};
		


 $('#submited').click(function (){
	var arr=$('#treeview').treeview('getChecked');
			//alert(JSON.stringify(arr));
	var ts = []; 		
		for (var key in arr) {
              //  alert(arr[key].id);
                ts.push(arr[key].id);
          }
	 Data2=JSON.stringify(ts).replace(/\"/g,"");
	 Data=JSON.stringify(Data2).replace(/\[/g,"");
	 Data1=JSON.stringify(Data).replace(/\]/g,""); 
	 data1=JSON.parse(Data1).replace(/\"/g,"");
	 console.log(data1)
	 roleID=$("#RoleId").val();
	 console.log(roleID)
	 		$.ajax({
	 			    type:"post"
					,url:parent.layui.setter.Test_url+"/AuthorizeManage/PermissionRole/SaveAuthorizeV2"
					,data:{
						roleId:roleID,
						moduleIds:data1
					}
					,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
					   }
					,dataType: "json"				
					,success: function(data) {
					 var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					 parent.layer.close(index);
					},
					error: function() {}
				});	 
     });

	function getquery(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
			r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
		
       function getChildNodeIdArr(node) {
                     var ts = [];
                          if(node.nodes) {
                             for(x in node.nodes) {
                                  ts.push(node.nodes[x].nodeId);
                                  if(node.nodes[x].nodes) {
                                      var getNodeDieDai = getChildNodeIdArr(node.nodes[x]);//有第二层，第三层子节点的情况
                                      for(j in getNodeDieDai) {
                                         ts.push(getNodeDieDai[j]);
                                     }
                                 }
                            }
                         } else {
                             ts.push(node.nodeId);
                         }
                        return ts;
                    }
   
              function setParentNodeCheck(node) {
                         var parentNode = $("#treeview").treeview("getNode", node.parentId);
                         if(parentNode.nodes) {
                             var checkedCount = 0;
                             for(x in parentNode.nodes) {
                                 if(parentNode.nodes[x].state.checked) {
                                     checkedCount++;
                                 } else {
                                     break;
                                 }
                             }
                             if(checkedCount === parentNode.nodes.length) {
                                 $("#treeview").treeview("checkNode", parentNode.nodeId);
                             setParentNodeCheck(parentNode);
                             }
                         }
                     }

//选择全部父节点
function checkAllParent(node){  
    $('#treeview').treeview('checkNode',node.nodeId,{silent:true});  
    var parentNode = $('#treeview').treeview('getParent',node.nodeId);  
    if(!("nodeId" in parentNode)){  
        return;  
    }else{  
        checkAllParent(parentNode);  
    }  
}  
//取消全部父节点  
function uncheckAllParent(node){  
    $('#treeview').treeview('uncheckNode',node.nodeId,{silent:true});  
    var siblings = $('#treeview').treeview('getSiblings', node.nodeId);  
    var parentNode = $('#streeview').treeview('getParent',node.nodeId);  
    if(!("nodeId" in parentNode)) {  
        return;  
    }  
    var isAllUnchecked = true;  //是否全部没选中  
    for(var i in siblings){  
        if(siblings[i].state.checked){  
            isAllUnchecked=false;  
            break;  
        }  
    }  
    if(isAllUnchecked){  
        uncheckAllParent(parentNode);  
    }  
  
} 
  
	});	
	

