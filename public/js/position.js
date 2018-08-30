function Position() {
	this.addListener();
	this.load();
}
$(function() {
	$(".tabs").slide({ trigger: "click" });
});
Position.listInfoTemplate = `
	<% for (var i = 0; i < positions.length; i++) { %> 
		<tr>
			<td><%= i+1 %></td>
			<td><%= positions[i].name %></td>
			<td></td>
			<td><%= positions[i].remark %></td>
			<td class="edit"><button><i class="icon-edit bigger-120"></i>编辑</button></td>
			<td class="delete"><button><i class="icon-trash bigger-120"></i>删除</button></td>
		</tr>
	<% } %>`;
$.extend(Position.prototype, {
	// 注册事件监听 
	addListener() {
		$(".am-btn-success").on("click", this.addPositionHandler);
		$(".am-btn-success .delete").on("click", this.deletePositionHandler);
	},
	// 按页加载数据
	load(){
		$.getJSON("/positions/list", data=>{
			// 显示职位数据
			// 待渲染的数据
			const positions = data.res_body.data;
			// EJS渲染模板
			const html = ejs.render(Position.listInfoTemplate, {positions});
			// 显示
			$(".table tbody").html(html);
		});
	},
	// 添加数据
	addPositionHandler() {
		const data=$(".am-form-horizontal").serialize();
		$.post("/positions/add",data,(data)=>{
			console.log(data);
		},"json");
    },
    //删除数据
    deletePositionHandler() {
		
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
new Position();