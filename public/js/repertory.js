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
		<tr>
			<td><%= i+1 %></td>
			<td><%= repertory[i].name %></td>			
			<td><%= repertory[i].assort %></td>
			<td><%= repertory[i].amount %></td>
			<td><%= repertory[i].datatime %></td>
			<td class="edit"><button><i class="icon-edit bigger-120"></i>编辑</button></td>
			<td class="delete"><button><i class="icon-trash bigger-120"></i>删除</button></td>
		</tr>
	<% } %>`;
$.extend(Repertory.prototype, {
	// 注册事件监听 
	addListener() {
		$(".am-btn-success").on("click", this.addRepertoryHandler);
		$(".am-btn-success .delete").on("click", this.deleteRepertoryHandler);
	},
	// 按页加载数据
	load(){
		$.getJSON("/repertory/list", data=>{
			// 显示职位数据
			console.log(data);
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
		
		$.jq_Confirm({
			message: "您确定要删除吗?",
			btnOkClick: function() {
				$.ajax({
					type: "post",
					url: "/positions/add",
					data: { id: id },
					success: function(data) {
						if(data > 0) {
							$.jq_Alert({
								message: "删除成功",
								btnOkClick: function() {
									page1();
								}
							});
						}
					}
				});
			}
		});
		
	},
});
new Repertory();