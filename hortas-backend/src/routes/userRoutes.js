const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");

console.log("userController:", userController); // Depuração

// Rotas de usuários
router.post("/users",
  [
    check("nome").notEmpty().withMessage("O nome é obrigatório."),
    check("email")
      .isEmail()
      .withMessage("O email deve ser válido.")
      .normalizeEmail(),
    check("senha")
      .isLength({ min: 8 })
      .withMessage("A senha deve ter pelo menos 8 caracteres.")
      .matches(/[A-Z]/)
      .withMessage("A senha deve conter pelo menos uma letra maiúscula.")
      .matches(/[a-z]/)
      .withMessage("A senha deve conter pelo menos uma letra minúscula.")
      .matches(/[0-9]/)
      .withMessage("A senha deve conter pelo menos um número.")
      .matches(/[@$!%*?&]/)
      .withMessage("A senha deve conter pelo menos um caractere especial."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.createUser
);
router.put("/users/approve/:id", userController.approveUser);
router.post("/login", userController.loginUser);
router.get("/users", userController.getUsers);
//router.get("/users/:id", userController.getUserById);
//router.put("/users/:id", userController.updateUser);
//router.delete("/users/:id", userController.deleteUser);

module.exports = router;
