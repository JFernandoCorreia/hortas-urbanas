const express = require("express");
const router = express.Router();
const hortaController = require("../controllers/hortaController");

// Rotas para hortas
router.get("/hortas", hortaController.getHortas);
router.get("/hortas/:id", hortaController.getHortaById);
router.post("/hortas", hortaController.createHorta);
router.put("/hortas/:id", hortaController.updateHorta);
router.delete("/hortas/:id", hortaController.deleteHorta);

module.exports = router;
