const express = require("express");
const router = express.Router();
const tarefaController = require("../controllers/tarefaController");

router.get("/tarefas", tarefaController.getTarefas);
router.post("/tarefas", tarefaController.createTarefa);

module.exports = router;
