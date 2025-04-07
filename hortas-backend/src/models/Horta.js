const db = require("../config/db");

class Horta {
  static async create({ nome, localizacao, descricao, usuario_id }) {
    const [result] = await db.execute(
      "INSERT INTO hortas (nome, localizacao, descricao, usuario_id) VALUES (?, ?, ?, ?)",
      [nome, localizacao, descricao, usuario_id]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM hortas");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.execute("SELECT * FROM hortas WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async update(id, { nome, localizacao, descricao }) {
    const [result] = await db.execute(
      "UPDATE hortas SET nome = ?, localizacao = ?, descricao = ? WHERE id = ?",
      [nome, localizacao, descricao, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute("DELETE FROM hortas WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Horta;
