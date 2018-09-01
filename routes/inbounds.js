const express = require('express');
const router = express.Router();
const InboundService = require("../services/inbound_service.js");

/* 添加职位 */
// http://localhost:3000/positions/add
router.post("/add", InboundService.add);

/* 按页查询 */
// http://localhost:3000/positions/list
router.get("/list", InboundService.listByPage);

module.exports = router;
