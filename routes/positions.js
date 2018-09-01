const express = require('express');
const router = express.Router();
const PositionService = require("../services/position_service.js");

/* 添加职位 */
// http://localhost:3000/positions/add
router.post("/add", PositionService.add);

/* 删除职位 */
// http://localhost:3000/positions/add
router.get("/del", PositionService.del);
/* 编辑 */
router.post("/update",PositionService.update);

/* 按页查询 */
// http://localhost:3000/positions/list
router.get("/list", PositionService.listByPage);

module.exports = router;
