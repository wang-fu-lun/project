function Position() {
	this.addListener();
	this.load();
}
$(function() {
	$(".tabs").slide({ trigger: "click" });
});

Position.listInfoTemplate = `
	<% for (var i = 0; i < positions.length; i++) { %> 
		<tr data-id="<%= positions[i]._id %>">
			<td><%= i+1 %></td>
			<td><%= positions[i].name %></td>
			<td><%= positions[i].remark %></td>
			<td class="edit"><button data-toggle="modal" data-target="#addPosModal"><i class="icon-edit bigger-120"></i>编辑</button></td>
			<td class="delete"><button data-toggle="modal"  data-target="#addPosModal1"><i class="icon-trash bigger-120"></i>删除</button></td>
		</tr>
	<% } %>`;

Position.paginationTemplate = `
<% for (var i = 1; i <= totalPages; i++)  {%>
	<li class="<%= currentPage == i ? 'active' : '' %>"><a style="border-radius:4px;margin-left:3px;" href="#"><%= i %></a></li>
<% } %>`;

$.extend(Position.prototype, {
	// 注册事件监听 
	addListener() {
		$(".am-btn-success").on("click", function(){
			const data=$(".am-form-horizontal").serialize();
			$.post("/positions/add",data,(data)=>{
				
			},"json");
		});
		// 翻页
		$(".pagination").on("click", "li", this.loadByPage);
		 //删除数据
		$("tbody").delegate(".delete","click",function(){
			const _id=$(this).parent().data("id");
			$(this).parents("tr").remove();
			$.getJSON("/positions/del?id="+_id,function(data){
				
			})
		})
	},
	// 页面加载
	load() {
		// 让“职位管理”导航选中
		$("#bs-example-navbar-collapse-1 ul:first li:last")
				.addClass("active")
				.siblings("li")
				.removeClass("active");
		// 加载第一页数据
		this.loadByPage(1);
	},
	// 按页加载数据
	loadByPage(event){
		let page;
		if (typeof event === "number") // 直接传递页码
			page = event;
		else { // 获取待加载页码	
			page = $(event.target).text();
		}

		// 读取page页数据
		$.getJSON("/positions/list?page=" + page, data=>{
			// 显示职位数据
			// 待渲染的数据
			const positions = data.res_body.data;
			// EJS渲染模板
			const html = ejs.render(Position.listInfoTemplate, {positions});
			// 显示
			$(".table tbody").html(html);

			// 显示页码数据
			const pagination = ejs.render(Position.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage : page})
			$(".pagination").html(pagination);
		});
	},
});
new Position();