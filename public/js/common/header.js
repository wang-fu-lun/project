
/**
 * 头部对象构造函数
 */
function Header() {
	this.createDom();
	this.addListener();
	//this.load();
}

// 头部导航模板字符串
Header.template = `<div class="dvheader">
<div class="dvheadertools">
	<span class="headerspantitle">进销存管理系统</span>
	<ul class="headerultools">
	
		<li class="headerlitools_info headerlitools" style="background-color: #075597">
		欢迎您，<span>xxx</span>
		
		<i style="margin-left: 8px;" class="icon-caret-down"></i>
		
			<ul class="headerlitools_ulinfo">
				<li style="border-top: 1px solid #E4ECF3;">
					<i class="icon-off" style="margin:0 10px;"></i>
					<a style="color: black; text-decoration: none;">退出</a>
				</li>
			</ul>
			
		</li>
		
	</ul>
</div>
</div>
<div class="dvcontent">
<ul class="ulleftmenu" style="border-right: 1px solid #ddd;">
	<li class="limenuitem">
		<i class="icon-cog menuicon"></i>系统菜单<b class="arrow icon-angle-down arrow-down"></b>
		<ul class="ulleftsubitems">
			<a href="/html/type.html" target="right">
				<li>分类管理</li>
			</a>
			<a href="/html/inbound.html" target="right">
				<li>入库管理</li>
			</a>
			<a href="/html/inventory.html" target="right">
				<li>库存管理</li>
			</a>
			<a href="/html/warning.html" target="right">
				<li>预警信息设置</li>
			</a>
			<a href="/html/outBoud.html" target="right">
				<li>出库管理</li>
			</a>
			<a href="/html/user.html" target="right">
				<li>用户管理</li>
			</a>
			<a href="/html/updatePwd.html" target="right"><li >修改密码</li></a>
		</ul>
	</li>
</ul>
<div style="position: absolute; left: 191px; right: 20px; ">
	<iframe src="/html/type.html" scrolling="no"  width="100%" height="1200" name="right" border="none"></iframe>
</div>
</div>`;

/**
 * 原型
 */
$.extend(Header.prototype, {
	// 创建DOM元素并渲染
	createDom() {
		$(Header.template).appendTo("header");
	},
	// 注册事件监听
	addListener() {
		//点击链接
		$(".headerultools").on("click",this.showlogoout)
	},
	//显示注销
	showlogoout(){
		$(".headerlitools_ulinfo").css("display","block");
	},
});

// 创建头部对象实例
new Header();

