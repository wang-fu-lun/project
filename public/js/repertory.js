function Repertory() {
	this.addListener();
	this.load();
}
$(function() {
	$(".tabs").slide({ trigger: "click" });
	var myDate = new Date();
	var year=myDate.getFullYear();
	var month=myDate.getMonth()+1;
	var day=myDate.getDate();
	$("#datatime").val(year+"/"+month+"/"+day);
});
Repertory.listInfoTemplate = `
	<% for (var i = 0; i < repertory.length; i++) { %> 
		<tr data-id="<%= repertory[i]._id %>">
			<td><%= i+1 %></td>
			<td class="name"><%= repertory[i].name %></td>			
			<td class="assort"><%= repertory[i].assort %></td>
			<td class="amount"><%= repertory[i].amount %></td>
			<td class="datatime"><%= repertory[i].datatime %></td>
			<td class="edit"><button data-toggle="modal" data-target="#editModal"><i class="icon-edit bigger-120"></i>编辑</button></td>
			<td class="delete"><button data-toggle="modal" data-target="#delModal"><i class="icon-trash bigger-120"></i>删除</button></td>
		</tr>
	<% } %>`;
$.extend(Repertory.prototype, {
	// 注册事件监听 
	addListener() {
		$(".am-btn-success").on("click", this.addRepertoryHandler);
		$("tbody").delegate(".delete","click",this.deleteRepertoryHandler);
		//$.proxy(this.loginHandler, this)
		$("tbody").delegate(".edit","click",this.updatePositionHandler);
	},
	// 按页加载数据
	load(){
		$.getJSON("/repertory/list", data=>{
			// 显示职位数据
			//console.log(data);
			// 待渲染的数据
			const repertory = data.res_body.data;
			// EJS渲染模板
			const html = ejs.render(Repertory.listInfoTemplate, {repertory});
			// 显示
			$(".table tbody").html(html);
		});
	},
	// 添加数据
	addRepertoryHandler() {
		var assort = $("#RawMaterialsTypePageId option:selected").text();
		var name = $("#RawMaterialsTypeName option:selected").text();
		var amount = $("#amount").val();
		
		
		var datatime = $("#datatime").val(); 
		console.log(datatime);
		//console.log(year+"/"+month+"/"+day);		
		$.post("/repertory/add",{assort:assort,name:name,amount:amount,datatime:datatime},(data)=>{
			console.log(data);
		},"json");
    },
    //删除数据
    deleteRepertoryHandler() {
		//alert(1);
		const that=this;
		$(".btn-add-del").on("click", function(){
			const _id=$(that).parent().data("id");
			//console.log(_id);
			$(that).parents("tr").remove();
			//console.log(that);
			$.getJSON("/repertory/del?id="+_id,function(data){
				console.log(data);
				location.reload()
			})	
		});
					
	},
	//更新数据
	updatePositionHandler(){
			//获取旧数据
			
			const id = $(this).parent().data('id');
 				oldName = $(this).siblings(".name").text(),
 				oldssort = $(this).siblings(".assort").text(),
                oldAmount= $(this).siblings(".amount").text(),
				oldDatatime= $(this).siblings(".datatime").text(),
			   console.log(id,oldName,oldssort,oldAmount,oldDatatime);
			//设置模态框原始数据
			$("#modassortId").val(oldssort);		
			$("#modnameId").val(oldName);
			$("#modamount").attr("value", oldAmount);
			$("#moddatatime").attr("value", oldDatatime);
			
			//点击取消，将数据修改为原数据
// 			$("#addPosModal .btn-cancel").on("click",function(){
// 				console.log($(this).parent().prev().find(".addPositionName"))
// 				$(this).parent().prev().find("#addPositionName").val(oldName);
// 				$(this).parent().prev().find("#addRemark").val(oldRemark);
			//点击确定，修改数据
			$(".btn-add-updata").on("click", function(){
				//获取用户输入的更新值
 				var newassort = $("#modassortId option:selected").text();
 				var newname = $("#modnameId option:selected").text();
 				var newamount = $("#modamount").val();				
 				var newdatatime = $("#moddatatime").val(); 
				console.log(newassort,newname,newamount,newdatatime);
				$.post("/repertory/update",{id:id,assort:newassort,name:newname,amount:newamount,datatime:newdatatime}, (data)=>{
                     //console.log(data);
					if(data.res_code === 1){
						location.reload();
					}
				},"json");
// 				//判断newInfo是否为空
// 				if(newInfo.split("&")[0].split("=")[1]==="" || newInfo.split("&")[1].split("=")[1]===""){
// 					alert("分类名称或备注不能为空！")
// 				}else{
// 					//将oldname值与newInfo值伪造成一个search数据
// 					const data = "id="+id+"&"+newInfo;
// 					console.log(data)
// 					$.post("/positions/update", data, (data)=>{
// 						if(data.res_code === 1){
// 							location.reload();name,assort,amount,datatime
// 						}
// 					},"json");
// 				}	
			});
// 		});
	},
	
});
new Repertory();