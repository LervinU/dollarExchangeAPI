const express = require('express');
const router = express.Router();

const controller = require("./controllers/history.controller");

router.get("/banreservas", controller.getBRHistory);
router.get("/popular", controller.getPopularHistory);
router.get("/scotiabank", controller.getScotiaBankHistory);
router.get("/bhd", controller.getBHDHistory);
router.get("/apap", controller.getAPAPHistory);
router.get("/bancoCaribe", controller.getBancoCaribeHistory);
router.get("/promerica", controller.getPromericaHistory);

module.exports = router;