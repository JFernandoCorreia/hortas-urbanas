const db = require("../config/db");

class Planta {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM plantas");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM plantas WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ nome, especie, tempo_colheita, descricao }) {
    const [result] = await db.query(
      "INSERT INTO plantas (nome, especie, tempo_colheita, descricao) VALUES (?, ?, ?, ?)",
      [nome, especie, tempo_colheita, descricao]
    );
    return result.insertId;
  }

  static async update(id, { nome, especie, tempo_colheita, descricao }) {
    await db.query(
      "UPDATE plantas SET nome = ?, especie = ?, tempo_colheita = ?, descricao = ? WHERE id = ?",
      [nome, especie, tempo_colheita, descricao, id]
    );
  }

  static async delete(id) {
    await db.query("DELETE FROM plantas WHERE id = ?", [id]);
  }
  
  static async getByHorta(horta_id) {
    const [rows] = await db.query("SELECT * FROM plantas WHERE horta_id = ?", [horta_id]);
    return rows;
  }
  
}

module.exports = Planta;
