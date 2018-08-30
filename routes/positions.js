const express = require('express');
const router = express.Router();
const PositionService = require("../services/position_service.js");

/* 添加职位 */
// http://localhost:3000/positions/add
router.post("/add", PositionService.add);

/* 按页查询 */
// http://localhost:3000/positions/list
router.get("/list", PositionService.listByPage);

module.exports = router;
