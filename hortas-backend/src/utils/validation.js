const Joi = require("joi");

const validateUser = (user) => {
  const schema = Joi.object({
    nome: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    telefone: Joi.string().min(10).required(),
  });

  return schema.validate(user);
};

module.exports = { validateUser };
