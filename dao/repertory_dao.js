const {Repertory}=require("./model.js");
//库存管理的增删改查
const RepertoryDao = {
	// 保存职位信息
	save(repertoryInfo) {
		return new Repertory(repertoryInfo).save();
	},
	// 总记录条数
	count() {
		return Repertory.find().count();
	},
	// 按页查找职位信息
	findByPage(page) {
		// 假定每页显示20条数据
		const pageSize = 20;
		// 查询
		return Repertory.find().skip((page-1)*pageSize).limit(pageSize);
	},
	update() {

	},
	find() {

	},
	delete() {
		
	}
}

module.exports = RepertoryDao;