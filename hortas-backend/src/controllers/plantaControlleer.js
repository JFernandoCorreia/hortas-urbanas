const Planta = require("../models/Planta");

exports.getPlantas = async (req, res) => {
  try {
    const plantas = await Planta.findAll();
    res.status(200).json(plantas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar plantas", error });
  }
};

exports.createPlanta = async (req, res) => {
  try {
    const planta = await Planta.create(req.body);
    res.status(201).json(planta);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar planta", error });
  }
};
