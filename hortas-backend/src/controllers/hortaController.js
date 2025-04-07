const Horta = require("../models/Horta");

// Criar uma nova horta
exports.createHorta = async (req, res) => {
  try {
    const { nome, localizacao, descricao, usuario_id } = req.body;
    if (!nome || !usuario_id) {
      return res.status(400).json({ message: "Nome e usuário são obrigatórios!" });
    }

    const id = await Horta.create({ nome, localizacao, descricao, usuario_id });
    res.status(201).json({ message: "Horta criada com sucesso!", id });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar horta", error: error.message });
  }
};

// Buscar todas as hortas
exports.getHortas = async (req, res) => {
  try {
    const hortas = await Horta.getAll();
    res.status(200).json(hortas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar hortas", error: error.message });
  }
};

// Buscar horta por ID
exports.getHortaById = async (req, res) => {
  try {
    const horta = await Horta.getById(req.params.id);
    if (!horta) {
      return res.status(404).json({ message: "Horta não encontrada" });
    }
    res.status(200).json(horta);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar horta", error: error.message });
  }
};

// Atualizar horta
exports.updateHorta = async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, localizacao, descricao } = req.body;

    const sucesso = await Horta.update(id, { nome, localizacao, descricao });
    if (!sucesso) {
      return res.status(404).json({ message: "Horta não encontrada" });
    }

    res.status(200).json({ message: "Horta atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar horta", error: error.message });
  }
};

// Deletar horta
exports.deleteHorta = async (req, res) => {
  try {
    const sucesso = await Horta.delete(req.params.id);
    if (!sucesso) {
      return res.status(404).json({ message: "Horta não encontrada" });
    }

    res.status(200).json({ message: "Horta deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar horta", error: error.message });
  }
};
