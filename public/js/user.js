function User() {
	//this.addListener();
	this.load();
}
$(function() {
	$(".tabs").slide({ trigger: "click" });
});

User.listInfoTemplate = `
	<% for (var i = 0; i < users.length; i++) { %> 
		<tr data-id="<%= users[i]._id %>">
			<td><%= i+1 %></td>
			<td class="positionName"><%= users[i].email %></td>
			<td class = "positionRemark"><img src="../images/upload/<%=users[i].logo %>" style="height: 50px;width:50px"></td>
			<td class="edit"><button data-toggle="modal" data-target="#addPosModal"><i class="icon-edit bigger-120"></i>编辑</button></td>
			<td class="delete"><button data-toggle="modal"  data-target="#addPosModal1"><i class="icon-trash bigger-120"></i>删除</button></td>
		</tr>
	<% } %>`;

User.paginationTemplate = `
	<% for (var i = 1; i <= totalPages; i++)  {%>
		<li class="<%= currentPage == i ? 'active' : '' %>"><a style="border-radius:4px;margin-left:3px;" href="#"><%= i %></a></li>
	<% } %>`;

$.extend(User.prototype, {
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
				if(data.res_code === 1){
					location.reload();
				}
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
		$.getJSON("/users/list?page=" + page, data=>{
			// 显示职位数据
			// 待渲染的数据
			const users = data.res_body.data;
			// EJS渲染模板
			const html = ejs.render(User.listInfoTemplate, {users});
			// 显示
			$(".table tbody").html(html);

			// 显示页码数据
			const pagination = ejs.render(User.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage : page})
			$(".pagination").html(pagination);
		// }).done(function(){this.getOldInfo.call(this);}.bind(this));
		}).done(this.updatePositionHandler);
	},
	updatePositionHandler(){
		$(".edit").on("click",function(){
			//获取旧数据
			const id = $(this).parent().data('id'),
				oldName = $(this).siblings(".positionName").text(),
				oldRemark = $(this).siblings(".positionRemark").text();
			//设置模态框原始数据
			$("#addPositionName").attr("value", oldName);
			$("#addRemark").attr("value", oldRemark);
			//点击取消，将数据修改为原数据
			$("#addPosModal .btn-cancel").on("click",function(){
				console.log($(this).parent().prev().find(".addPositionName"))
				$(this).parent().prev().find("#addPositionName").val(oldName);
				$(this).parent().prev().find("#addRemark").val(oldRemark);
			});
			//点击确定，修改数据
			$("#addPosModal .btn-yes").on("click", function(){
				//获取用户输入的更新值
				const newInfo = $(".add-position-form").serialize();
				//判断newInfo是否为空
				if(newInfo.split("&")[0].split("=")[1]==="" || newInfo.split("&")[1].split("=")[1]===""){
					alert("分类名称或备注不能为空！")
				}else{
					//将oldname值与newInfo值伪造成一个search数据
					const data = "id="+id+"&"+newInfo;
					console.log(data)
					$.post("/positions/update", data, (data)=>{
						if(data.res_code === 1){
							location.reload();
						}
					},"json");
				}	
			});
		});
	}
});
new User();