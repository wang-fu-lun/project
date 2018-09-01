const RepertoryDao = require("../dao/repertory_dao.js");

const RepertoryService = {
	// 添加职位
	add(req, res, next) {
		// 从请求主体中解构文本数据
		const {name,assort,amount,datatime} = req.body;
		
		// 保存到数据库
		RepertoryDao
			.save({name,assort,amount,datatime})
			.then(data=>{
				res.json({res_code:1, res_error:"", res_body: data})
			})
			.catch(err=>{
				res.json({res_code:-1, res_error:err, res_body: {}})
			});
	},
	// 分页查询职位
	listByPage(req, res, next) {
		// 获取待查询的页码
		let {page} = req.query;
		page = page || 1;
		// 调用数据库查询方法
		RepertoryDao
			.count()
			.then((data)=>{
				RepertoryDao
					.findByPage(page)
					.then(pageData=>{
						// 总页数
						const totalPages = Math.ceil(data / 20);
						res.json({res_code:1, res_error:"", res_body: {data: pageData, count: data, totalPages}});
					}).catch(err=>{
						res.json({res_code:-1, res_error:err, res_body: {}});
					});
			}).catch(err=>{
				res.json({res_code:-1, res_error:err, res_body: {}});
			});
	}
}

module.exports = RepertoryService;