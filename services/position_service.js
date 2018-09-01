const PositionDao = require("../dao/position_dao.js");
const mongoose = require("mongoose");

const PositionService = {
	// 添加职位
	add(req, res, next) {
		// 从请求主体中解构文本数据
		const {name,remark} = req.body;
		// 保存到数据库
		PositionDao
			.save({name,remark})
			.then(data=>{
				res.json({res_code:1, res_error:"", res_body: data})
			})
			.catch(err=>{
				res.json({res_code:-1, res_error:err, res_body: {}})
			});
	},
	//编辑--update
	update(req, res, next){
		//从请求主体重结构文本数据
		let {id, name, remark} = req.body;
		id = mongoose.Types.ObjectId(id);
		console.log(id);
		//更新
		PositionDao
			.updateOne({_id:id}, {name, remark})
			.then(data=>{
				res.json({res_code:1, res_error:"", res_body: data})
			})
			.catch(err=>{
				res.json({res_code:-1, res_error:err, res_body: {}})
			})
	},
	// 分页查询职位
	listByPage(req, res, next) {
		// 获取待查询的页码
		let {page} = req.query;
		page = page || 1;
		// 调用数据库查询方法
		PositionDao
			.count()
			.then((data)=>{
				PositionDao
					.findByPage(page)
					.then(pageData=>{
						// 总页数
						const totalPages = Math.ceil(data / 15);
						res.json({res_code:1, res_error:"", res_body: {data: pageData, count: data, totalPages}});
					}).catch(err=>{
						res.json({res_code:-1, res_error:err, res_body: {}});
					});
			}).catch(err=>{
				res.json({res_code:-1, res_error:err, res_body: {}});
			});
	}
}

module.exports = PositionService;