const express = require("express");
const router = express.Router();
const plantaController = require("../controllers/plantaController");

router.get("/plantas", plantaController.getPlantas);
router.post("/plantas", plantaController.createPlanta);

module.exports = router;
