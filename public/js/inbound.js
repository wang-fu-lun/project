function Inbound() {
	this.addListener();
	this.load();
}
$(function() {
	$(".tabs").slide({ trigger: "click" });
});

Inbound.listInfoTemplate = `
	<% for (var i = 0; i < inbounds.length; i++) { %> 
		<tr>
            <td><%= i+1 %></td>
            <td><%= inbounds[i].list %></td>
            <td><%= inbounds[i].food %></td>
			<td><%= inbounds[i].name %></td>
			<td><%= inbounds[i].remark %></td>
			<td class="edit"><button data-toggle="modal" data-target="#addPosModal"><i class="icon-edit bigger-120"></i>编辑</button></td>
			<td class="delete"><button data-toggle="modal"  data-target="#addPosModal1"><i class="icon-trash bigger-120"></i>删除</button></td>
		</tr>
	<% } %>`;

Inbound.paginationTemplate = `
<% for (var i = 1; i <= totalPages; i++)  {%>
	<li class="<%= currentPage == i ? 'active' : '' %>"><a style="border-radius:4px;margin-left:3px;" href="#"><%= i %></a></li>
<% } %>`;

$.extend(Inbound.prototype, {
	// 注册事件监听 
	addListener() {
		$(".am-btn-success").on("click", this.addInboundHandler);
		// 翻页
		$(".pagination").on("click", "li", this.loadByPage);

		$(".am-btn-success .delete").on("click", this.deleteInboundHandler);
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
		$.getJSON("/inbounds/list?page=" + page, data=>{
			// 显示职位数据
			// 待渲染的数据
            const inbounds = data.res_body.data;
			// EJS渲染模板
			const html = ejs.render(Inbound.listInfoTemplate, {inbounds});
			// 显示
			$(".table tbody").html(html);

			// 显示页码数据
			const pagination = ejs.render(Inbound.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage : page})
			$(".pagination").html(pagination);
		});
	},
	// 添加数据
	addInboundHandler() {
		const data=$(".am-form-horizontal").serialize();
		$.post("/inbounds/add",data,(data)=>{
			
		},"json");
    },
    //删除数据
	deleteInboundHandler(){
		
	}
});
new Inbound();