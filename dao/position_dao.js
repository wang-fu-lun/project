const {Position} = require("./model.js");

const PositionDao = {
	// 保存职位信息
	save(positionInfo) {
		return new Position(positionInfo).save();
	},
	// 总记录条数
	count() {
		return Position.find().count();
	},
	// 按页查找职位信息
	findByPage(page) {
		// 假定每页显示20条数据
		const pageSize = 20;
		// 查询
		return Position.find().skip((page-1)*pageSize).limit(pageSize);
	},
	update() {

	},
	find() {

	},
	delete() {
		
	}
}

module.exports = PositionDao;