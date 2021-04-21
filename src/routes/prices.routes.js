const express = require('express');
const router = express.Router();

const controller = require("./controllers/prices.controller");

router.get("/banreservas", controller.getBRData);
router.get("/scotiabank", controller.getScotiaData);
router.get("/popular", controller.getPopularData);
router.get("/bancoCaribe", controller.getBancoCaribeData);
router.get("/allBanks", controller.getAllBanksData);

module.exports = router;