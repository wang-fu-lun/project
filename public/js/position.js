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
			<td class="positionName"><%= positions[i].name %></td>
			<td class = "positionRemark"><%= positions[i].remark %></td>
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
		//添加数据
		$(".am-btn-success").on("click", function(){
			const data=$(".am-form-horizontal").serialize();
			$.post("/positions/add",data,(data)=>{
				
			},"json");
		});
		// 翻页
		$(".pagination").on("click", "li", this.loadByPage);
		 //删除数据
		$("tbody").delegate(".delete","click",function(){
			const that=this;
			$(".modal").delegate(".btn-primary","click",function(){
				const _id=$(that).parent().data("id");
				$(that).parents("tr").remove();
				$.getJSON("/positions/del?id="+_id,function(data){
					if(data.res_code === 1){
						location.reload();
					}
				})
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
		// }).done(function(){this.getOldInfo.call(this);}.bind(this));
		}).done(this.updatePositionHandler);
	},
	//更新数据
	updatePositionHandler(){
			$(".edit").on("click",function(){
				//获取旧数据
				const id = $(this).parent().data('id');
				let newInfo = "";
				$("#addPosModal .btn-yes").on("click", function(){
					//获取用户输入的更新值
					newInfo = $(".add-position-form").serialize();
					//将oldname值与newInfo值伪造成一个search数据
					const data = "id="+id+"&"+newInfo;
					$.post("/positions/update", data, (data)=>{
						if(data.res_code === 1){
							location.reload();
						}
					},"json");
				});
			});
		},
	});
new Position();