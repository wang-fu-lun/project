const express = require('express');
const router = express.Router();
const RepertoryService = require("../services/repertory_service.js");

/* 添加职位 */
// http://localhost:3000/positions/add
router.post("/add", RepertoryService.add);

/* 按页查询 */
// http://localhost:3000/positions/list
router.get("/list", RepertoryService.listByPage);


router.get("/del", RepertoryService.del);

router.post("/update",RepertoryService.update);

module.exports = router;
